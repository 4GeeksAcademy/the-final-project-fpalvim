import os
import json
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt, get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import unset_jwt_cookies
from datetime import datetime, timedelta, timezone

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://avnadmin:AVNS_LLhpu0aHZ0pOlhg5G2r@final-project-felipe-d067.l.aivencloud.com:21737/defaultdb?sslmode=require'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

db = SQLAlchemy(app)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@app.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@app.route("/profile")
@jwt_required()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response



class Band(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email_address = db.Column(db.String(255), nullable = False)
    username = db.Column(db.String(255), nullable = False)
    password = db.Column(db.String(255), nullable = False)
    is_active = db.Column(db.String(255), default = True)
    picture_id = db.Column(db.Integer)
    video_id = db.Column(db.Integer)
    description = db.Column(db.String(5000))
    tags = db.Column(db.String(80))
    address = db.Column(db.String(1000), nullable = False)
    phone_number = db.Column(db.String(80))
    profile_picture = db.Column(db.String(2083), nullable = False)
    is_available = db.relationship('Available', backref='band', lazy=True)

class Venue(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email_address = db.Column(db.String(255), nullable = False)
    username = db.Column(db.String(255), nullable = False)
    password = db.Column(db.String(255), nullable = False)
    is_active = db.Column(db.String(255), default = True)
    picture_id = db.Column(db.Integer)
    video_id = db.Column(db.Integer)
    description = db.Column(db.String(5000))
    tags = db.Column(db.String(80))
    address = db.Column(db.String(1000), nullable = False)
    phone_number = db.Column(db.String(80))
    profile_picture = db.Column(db.String(2083), nullable = False)
    is_available = db.relationship('Available', backref='venue', lazy=True)

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email_address = db.Column(db.String(255), nullable = False)
    username = db.Column(db.String(255), nullable = False)
    password = db.Column(db.String(255), nullable = False)
    is_active = db.Column(db.String(255), default = True)
    description = db.Column(db.String(5000))
    tags = db.Column(db.String(255))
    address = db.Column(db.String(1000), nullable = False)
    phone_number = db.Column(db.String(255))
    profile_picture = db.Column(db.String(2083), nullable = False)
    profile_type = db.Column(db.String(255))
    # is_available = db.relationship('Available', backref='venue', lazy=True)

class Available(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.String(255), nullable = False)
    band_id = db.Column(db.Integer, db.ForeignKey('band.id'),nullable=False)
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'),nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('venue.id'),nullable=False)

class Media(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    url = db.Column(db.String(255), nullable = False)
    band_id = db.Column(db.Integer, db.ForeignKey('band.id'),nullable=False)
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'),nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('venue.id'),nullable=False)


with app.app_context():
    db.create_all()

@app.route('/')
@app.route('/home')
def greeting():
    return jsonify("test")

@app.route('/testpage')
def test():
    return jsonify("This is a test page!")


@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data:
        return "You need to fill the form", 400
    
    new_user = User(email_address=data['email_address'],
                    username=data['username'],
                    password=data['password'],
                    address=data['address'],
                    profile_picture=data['profile_picture'],
                    profile_type=data['profile_type'])
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message":"User created", "data":data}), 201

@app.route('/band', methods=['POST'])
def create_band():
    data = request.get_json()
    if not data:
        return "You need to fill the form", 400
    
    new_band = Band(email_address=data['email_address'],
                    username=data['username'],
                    password=data['password'],
                    address=data['address'],
                    profile_picture=data['profile_picture'],
                    phone_number=data['phone_number'])
    db.session.add(new_band)
    db.session.commit()
    
    return jsonify({"message":"Band created", "data":data}), 201

@app.route('/venue', methods=['POST'])
def create_venue():
    data = request.get_json()
    if not data:
        return "You need to fill the form", 400
    
    new_venue = Venue(email_address=data['email_address'],
                    username=data['username'],
                    password=data['password'],
                    address=data['address'],
                    profile_picture=data['profile_picture'],
                    phone_number=data['phone_number'])
    db.session.add(new_venue)
    db.session.commit()
    
    return jsonify({"message":"Venue created", "data":data}), 201

@app.route('/users', methods=['GET'])

def users():
    user = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'description': user.description,
        'tags': user.tags,
        'address': user.address,
        'phone_number': user.phone_number,
        'profile_picture': user.profile_picture,
        'profile_type': user.profile_type
    } for user in user])


@app.route('/bands', methods=['GET'])

def get_bands():
    band = Band.query.all()
    return jsonify([{
        'id': band.id,
        'username': band.username,
        'description': band.description,
        'tags': band.tags,
        'address': band.address,
        'phone_number': band.phone_number,
        'profile_picture': band.profile_picture
    } for band in band])

@app.route('/venues', methods=['GET'])
def get_venues():
    venue = Venue.query.all()
    return jsonify([{
        'id': venue.id,
        'username': venue.username,
        'description': venue.description,
        'tags': venue.tags,
        'address': venue.address,
        'phone_number': venue.phone_number,
        'profile_picture': venue.profile_picture
    } for venue in venue])


@app.route("/user/<id>", methods=["PUT"])
def band_update(id):
    user = User.query.get(id)
    profile_type = request.json['profile_type']
    
    user.profile_type = profile_type

    response_body = {
        "profile_type" : profile_type
    }

    db.session.commit()
    return jsonify({"message":"User updated", "data":response_body}), 201


app.run(host='0.0.0.0', port=8787)