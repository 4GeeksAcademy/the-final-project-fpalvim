import json
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///people.db'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://avnadmin:AVNS_LPQSoqkafyy8CM9p8cY@curima-curima-ed7c.i.aivencloud.com:23519/defaultdb?sslmode=require'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Band(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email_address = db.Column(db.String(80), nullable = False)
    username = db.Column(db.String(80), nullable = False)
    password = db.Column(db.String(80), nullable = False)
    is_active = db.Column(db.Boolean(), unique=False)
    picture_id = db.Column(db.Integer)
    video_id = db.Column(db.Integer)
    description = db.Column(db.String(5000))
    tags = db.Column(db.String(80))
    address = db.Column(db.String(1000), nullable = False)
    phone_number = db.Column(db.String(80), nullable = False)

class Venue(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email_address = db.Column(db.String(80), nullable = False)
    username = db.Column(db.String(80), nullable = False)
    password = db.Column(db.String(80), nullable = False)
    is_active = db.Column(db.Boolean(), unique=False)
    picture_id = db.Column(db.Integer)
    video_id = db.Column(db.Integer)
    description = db.Column(db.String(5000))
    tags = db.Column(db.String(80))
    address = db.Column(db.String(1000), nullable = False)
    phone_number = db.Column(db.String(80), nullable = False)

# class Availability(db.model):
#     is_booked = db.Column(db.Boolean(), nullable=False)
#     band_id = db.Column(db.Integer, db.ForeignKey('band.id'), nullable=False)
#     band = db.relationship('Band')
#     venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'), nullable=False)
#     venue = db.relationship('Venue')

# class Media(db.model):
#     id = db.Column(db.Integer, primary_key = True)
#     band_id = db.Column(db.Integer, db.ForeignKey('band.id'), nullable=False)
#     band = db.relationship('Band')
#     venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'), nullable=False)
#     venue = db.relationship('Venue')


with app.app_context():
    db.create_all()

@app.route('/')
@app.route('/home')
def greeting():
    print("test")

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
                    is_active=data['is_active'],
                    picture_id=data['picture_id'])
    db.session.add(new_band)
    db.session.commit()
    
    return jsonify({"message":"Band created", "data":data}), 201

app.run(host='0.0.0.0', port=8787)