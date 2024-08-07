"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Mascota
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    print(jsonify(response_body))
    return jsonify(response_body), 200

# obtener todas las mascotas

@api.route('/mascotas', methods=['GET'])
def get_all_mascotas():
    results_query = Mascota.query.all()
    if not results_query:
        return jsonify({"error": "Mascotas not found"}), 404
    results = list(map(lambda item: item.serialize(),results_query))
    response_body = {
        "msg": "Mascotas List",
        "results": results
    }
    print(results)
    return jsonify(response_body), 200