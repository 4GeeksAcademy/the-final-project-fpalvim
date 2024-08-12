import json
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://avnadmin:AVNS_LLhpu0aHZ0pOlhg5G2r@final-project-felipe-d067.l.aivencloud.com:21737/defaultdb?sslmode=require'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

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
    phone_number = db.Column(db.String(80), nullable = False)
    profile_picture = db.Column(db.String(2083), nullable = False)
    # is_available = db.relationship('Available', backref='band', lazy=True)

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
    phone_number = db.Column(db.String(80), nullable = False)
    # is_available = db.relationship('Available', backref='venue', lazy=True)

# class Available(db.model):
#     is_booked = db.Column(db.String(255), unique=False)
#     band_id = db.Column(db.Integer, db.ForeignKey('band.id'),nullable=False)
#     venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'),nullable=False)

# class Media(db.model):
#     id = db.Column(db.Integer, primary_key = True)
#     url = username = db.Column(db.String(255), nullable = False)
#     band_id = db.Column(db.Integer, db.ForeignKey('band.id'),nullable=False)
#     venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'),nullable=False)



with app.app_context():
    db.create_all()

@app.route('/')
@app.route('/home')
def greeting():
    return jsonify("test")

@app.route('/testpage')
def test():
    return jsonify("This is a test page!")


@app.route('/band', methods=['POST'])
def create_band():
    data = request.get_json()
    if not data:
        return "You need to fill the form", 400
    
    new_band = Band(email_address=data['email_address'],
                    username=data['username'],
                    password=data['password'],
                    picture_id=data['picture_id'],
                    phone_number=data['phone_number'],
                    address=data['address'],
                    profile_picture=data['profile_picture'])
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
                    picture_id=data['picture_id'],
                    phone_number=data['phone_number'],
                    address=data['address'])
    db.session.add(new_venue)
    db.session.commit()
    
    return jsonify({"message":"Venue created", "data":data}), 201

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
        'phone_number': venue.phone_number
    } for venue in venue])


@app.route("/band/<id>", methods=["PUT"])
def band_update(id):
    band = Band.query.get(id)
    tags = request.json['tags']
    
    band.tags = tags

    response_body = {
        "band tags" : tags
    }

    db.session.commit()
    return jsonify({"message":"Band updated", "data":response_body}), 201


app.run(host='0.0.0.0', port=8787)