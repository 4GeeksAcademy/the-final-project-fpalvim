import os
import json
import requests
from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt, get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import unset_jwt_cookies
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta, timezone
import logging


load_dotenv()
logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__)
# CORS(app, supports_credentials=True, resources={r"/*": {"origin": "*", "allow_headers": ["Authorization", "Content-Type"]}})
cors = CORS(app)
# CORS(app, resources={r"/api/*": {"origin": "https://super-duper-fortnight-7gvwxjxgjj7fr957-5173.app.github.dev"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://avnadmin:AVNS_LLhpu0aHZ0pOlhg5G2r@final-project-felipe-d067.l.aivencloud.com:21737/defaultdb?sslmode=require'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


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
        return response

user_tags = db.Table('user_tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email_address = db.Column(db.String(255), nullable = False)
    username = db.Column(db.String(255), nullable = False)
    password = db.Column(db.String(2083), nullable = False)
    is_active = db.Column(db.String(255), default = True)
    description = db.Column(db.String(5000))
    address = db.Column(db.String(2083), nullable = False)
    phone_number = db.Column(db.String(255))
    profile_picture = db.Column(db.String(30000), nullable = False)
    profile_type = db.Column(db.String(255))
    comments = db.Column(db.String(500))
    spotify_url = db.Column(db.String(2083))
    youtube_url = db.Column(db.String(2083))
    facebook_url = db.Column(db.String(2083))
    instagram_url = db.Column(db.String(2083))
    user_tags = db.relationship('Tag', secondary=user_tags, lazy='subquery',
        backref=db.backref('users', lazy=True))
    def serialize(self):
        return {
            "id": self.id,
            "email_address": self.email_address,
            "username" :self.username,
            "profile_type" : self.profile_type,
            "description" : self.description,
            "address" : self.address,
            "phone_number" : self.phone_number,
            "profile_picture" : self.profile_picture,
            "spotify_url" : self.spotify_url,
            "youtube_url" : self.youtube_url,
            "facebook_url" : self.facebook_url,
            "instagram_url" : self.instagram_url,
            
        }

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    style_tag = db.Column(db.String(255), nullable = False)
    def serialize(self):
        return {
            "id": self.id,
            "style_tag": self.style_tag
        }

class UserAvailability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    def __init__(self, user_id, date):
        self.user_id = user_id
        self.date = date
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'date': self.date.isoformat()
        }
class Media(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(30000), nullable=False)
    user = db.relationship('User', backref=db.backref('media', lazy=True))

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reviewee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # comment_id = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)

    reviewer = db.relationship('User', foreign_keys=[reviewer_id])
    reviewee = db.relationship('User', foreign_keys=[reviewee_id])

with app.app_context():
    db.create_all()

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user_db = User.query.filter_by(username=username).first()
    if not user_db or not bcrypt.check_password_hash(user_db.password, password):
        return jsonify({"message": "Invalid username or password"})
    access_token = create_access_token(identity=user_db.username)
    return jsonify({"access_token": access_token, "user_db": user_db.serialize()}), 200

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(message= f'Hello, {current_user}, this is a protected route.')

@app.route('/tag', methods=['POST'])
def create_style_tag():
    data = request.get_json()
    if not data:
        return "You need to fill the form", 400
    new_style_tag = Tag(style_tag=data['style_tag'])
    db.session.add(new_style_tag)
    db.session.commit()
    return jsonify({"message":"Tag created", "data":data}), 201

@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({"message": "You need to fill the form"}), 400
    email_address = data.get('email_address')
    username = data.get('username')
    password = data.get('password')
    address = data.get('address')
    profile_picture = data.get('profile_picture')
    profile_type = data.get('profile_type')
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User with this username already exists"}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(
        email_address=email_address,
        username=username,
        password=hashed_password,
        address=address,
        profile_picture=profile_picture,
        profile_type=profile_type,
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created", "data": data}), 201

@app.route('/photos/<int:user_id>', methods=['POST'])
def add_photo(user_id):
    data = request.get_json(user_id)
    if not data:
        return "You need to fill the form", 400
    new_photo = Media(user_id=user_id,
                      filename=data['filename'],
                      filepath=data['filepath']
                      )
    db.session.add(new_photo)
    db.session.commit()
    return jsonify({"message":"Photo uploaded", "data":data}), 201

@app.route('/reviews', methods=['POST'])
def post_review():
    data = request.get_json()
    reviewer_id = data.get('reviewer_id')
    reviewee_id = data.get('reviewee_id')
    # comment_id = data.get('comment_id')
    comment = data.get('comment')

    new_review = Review(
        reviewer_id=reviewer_id,
        reviewee_id=reviewee_id,
        # comment_id=comment_id,
        comment=comment
    )
    db.session.add(new_review)
    db.session.commit()
    
    return jsonify({'message': 'Review posted successfully!'}), 201

@app.route('/tags', methods=['GET'])
def tags():
    tag = Tag.query.all()
    return jsonify([{
        'style_tag': tag.style_tag
    } for tag in tag])

@app.route('/user_tags', methods=['GET'])
def get_tags():
    users_tags = db.session.query(user_tags).all()
    return jsonify([{
        'user_id': users_tags.user_id,
        'tag_id': users_tags.tag_id,
    } for users_tags in users_tags])

@app.route('/user/<int:user_id>/tags', methods=['GET'])
def get_user_tags(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "user not found"}), 404
        tag_names = [tag.style_tag for tag in user.user_tags]
        return jsonify(tag_names)
    except Exception as e:
        print(f'error fetching tags: {e}')
        return jsonify({"error": "Internal server error"})

@app.route('/users', methods=['GET'])
def users():
    user = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'description': user.description,
        'address': user.address,
        'phone_number': user.phone_number,
        'profile_picture': user.profile_picture,
        'profile_type': user.profile_type,
        'email_address': user.email_address,
        'comments': user.comments,
        'spotify_url': user.spotify_url,
        'youtube_url': user.youtube_url,
        'facebook_url': user.facebook_url,
        'instagram_url': user.instagram_url
    } for user in user])

@app.route('/dates/availability/<int:user_id>', methods=['GET'])
def get_user_availability(user_id):
    try:
        availabilities = UserAvailability.query.filter_by(user_id=user_id).all()
        availability_list = [availability.to_dict() for availability in availabilities]
        return jsonify(availability_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/user/<int:user_id>/photos', methods=['GET'])
def get_photos(user_id):
    photos = Media.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': photos.id,
        'filename': photos.filename,
        'filepath': photos.filepath
    } for photos in photos])


@app.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    result = []
    for review in reviews:
        result.append({
            'id': review.id,
            'reviewer_id': review.reviewer_id,
            'reviewee_id': review.reviewee_id,
            # 'comment_id': review.comment_id,
            'comment': review.comment
        })
    return jsonify(result)

@app.route("/user/<id>", methods=["PUT"])
def band_update(id):
    user = User.query.get(id)
    # profile_type = request.json['profile_type']
    username =  request.json['username']
    description =  request.json['description']
    tags =  request.json['tags']
    address =  request.json['address']
    phone_number =  request.json['phone_number']
    profile_picture =  request.json['profile_picture']
    email_address =  request.json['email_address']
    spotify_url = request.json['spotify_url']
    youtube_url = request.json['youtube_url']
    facebook_url = request.json['facebook_url']
    instagram_url = request.json['instagram_url']
    # comments = request.json['comments']
    # user.profile_type = profile_type
    user.username = username
    user.description = description
    user.user_tags.clear()
    tag_styles = []
    for tag in tags:
        tag = Tag.query.filter_by(style_tag = tag).first()
        tag_styles.append(tag)
    user.user_tags.extend(tag_styles)
    user.address = address
    user.phone_number = phone_number
    user.profile_picture = profile_picture
    user.email_address = email_address
    user.spotify_url = spotify_url
    user.youtube_url = youtube_url
    user.facebook_url = facebook_url
    user.instagram_url = instagram_url
    # user.comments = comments
    response_body = {
        # "profile_type" : profile_type,
        "username" : username,
        "description" : description,
        "tags" : tags,
        "address" : address,
        "phone_number" : phone_number,
        "profile_picture" : profile_picture,
        "email_address" : email_address,
        "spotify_url" : spotify_url,
        "youtube_url" : youtube_url,
        "facebook_url" : facebook_url,
        "instagram_url" : instagram_url
        # "comments" : comments
    }
    db.session.commit()
    return jsonify({"message":"User updated", "data":response_body}), 201
@app.route('/dates/availability/<int:user_id>', methods=['PUT'])

def save_user_availability(user_id):
    try:
        data = request.json
        new_dates = data.get('dates', [])
        remove_dates = data.get('remove_dates', [])
        new_date_objects = set(datetime.strptime(date_str, '%Y-%m-%d').date() for date_str in new_dates)
        remove_date_objects = set(datetime.strptime(date_str, '%Y-%m-%d').date() for date_str in remove_dates)
        UserAvailability.query.filter(UserAvailability.user_id == user_id, UserAvailability.date.in_(remove_date_objects)).delete(synchronize_session=False)
        for date in new_date_objects:
            if not UserAvailability.query.filter_by(user_id=user_id, date=date).first():
                new_availability = UserAvailability(user_id=user_id, date=date)
                db.session.add(new_availability)
        db.session.commit()
        return jsonify({"message": "Availability dates updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/photos/<int:user_id>/<int:photo_id>', methods=['DELETE'])
def delete_photo(user_id, photo_id):
    photo = Media.query.filter_by(user_id=user_id, id=photo_id).first()
    if not photo:
        return jsonify({"message": "Photo not found"}), 404
    try:
        db.session.delete(photo)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to delete the photo from the database", "error": str(e)}), 500
    return jsonify({"message": "Photo deleted successfully"}), 200
app.run(host='0.0.0.0', port=8787)