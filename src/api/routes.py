"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# ENDPOINT: Login
@api.route('/login', methods=['POST'])
def login():
    
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email = email).first()

    # print(user.serialize())

    if user is None:
        return jsonify({"msg": "This email is not registered"})

    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email, expires_delta=timedelta(hours=12))
    return jsonify({"access_token":access_token, "logged":True})
