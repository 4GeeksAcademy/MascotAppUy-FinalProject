"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Mascota, Color, Especie, Departamento, Localidad, Raza
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta
from werkzeug.security import generate_password_hash, check_password_hash

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

    if user is None:
        return jsonify({"msg": "This email is not registered"}), 404

    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Wrong password"}), 401

    access_token = create_access_token(identity=email, expires_delta=timedelta(hours=12))
    return jsonify({"access_token":access_token, "logged":True})

# ENDPOINT: Obtener mascotas
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

# ENDPOINT: Obtener usuarios
@api.route('/usuarios', methods=['GET'])
def get_all_usuarios():
    results_query = User.query.all()
    if not results_query:
        return jsonify({"error": "User not found"}), 404
    results = list(map(lambda item: item.serialize(),results_query))
    response_body = {
        "msg": "Users List",
        "results": results
    }
    print(results)
    return jsonify(response_body), 200

# ENDPOINT: Agregar mascotas
@api.route('/mascotas', methods=['POST'])
def add_mascota():
    data = request.get_json()
    if not data:
        return jsonify({"error": "no data"}), 404
    
    new_mascota = Mascota(nombre = data["nombre"], edad = data["edad"], sexo = data["sexo"], descripcion = data["descripcion"], estado = data["estado"], fecha_perdido = data["fecha_perdido"], user_id = data["user_id"], especie_id = data["especie_id"], localidad_id = data["localidad_id"], favorito_id = data["favorito_id"])

    # Agregar colores a la mascota por ser Many to Many va diferente
    for color_name in data["colores_mascotas"]:
        color = Color.query.filter_by(name=color_name).first()
        if color:
            new_mascota.colores_mascotas.append(color)
        else:
            return jsonify({"error": f"Color '{color_name}' not found"}), 404

    db.session.add(new_mascota)
    db.session.commit()
    new_mascota_add = new_mascota.serialize()

    return jsonify(new_mascota_add)

# ENDPOINT: Validar token
@api.route("/valid-token", methods=["GET"])
@jwt_required()
def valid_token():

    # Validate the identity of the current user
    current_user = get_jwt_identity()
    user_logged = User.query.filter_by(email = current_user).first()

    if user_logged is None:
        return jsonify(logged=False), 409

    return jsonify(logged=True), 200

# ENDPOINT: Registrar usuario nuevo
@api.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Neither email nor password can be blank"}), 404

    check_email = User.query.filter_by(email = data['email']).first()
    if check_email:
        return jsonify({"error": "Email address already exists"}), 404
    
    hashed_password = generate_password_hash(data["password"])

    new_user = User(
        email=data["email"], 
        is_active=True, 
        password=hashed_password, 
        nombre=data["nombre"], 
        telefono=data["telefono"], 
    )
    print(data)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=data.get("email"), expires_delta=timedelta(hours=12))
    return jsonify({"msg": "New user created", "new user": new_user.serialize(), "access_token":access_token, "logged":True})


# ENDPOINT: Obtener especies
@api.route('/especies', methods=['GET'])
def get_all_especies():
    results_query = Especie.query.all()

    if not results_query:
        return jsonify({"error": "Especies not found"}), 404
    
    results = [especie.serialize() for especie in results_query]

    # print(results)
    response_body = {
        "msg": "Lista especies",
        "results": results
    }
    
    return jsonify(response_body), 200

# ENDPOINT: Obtener departamentos
@api.route('/departamentos', methods=['GET'])
def get_all_departamentos():
    results_query = Departamento.query.all()

    if not results_query:
        return jsonify({"error": "Departamentos not found"}), 404
    
    results = [departamento.serialize() for departamento in results_query]

    # print(results)
    response_body = {
        "msg": "Lista departamentos",
        "results": results
    }
    
    return jsonify(response_body), 200

# ENDPOINT: Obtener localidades
@api.route('/localidades', methods=['GET'])
def get_all_localidades():
    results_query = Localidad.query.all()

    if not results_query:
        return jsonify({"error": "Localidades not found"}), 404
    
    results = [localidad.serialize() for localidad in results_query]

    # print(results)
    response_body = {
        "msg": "Lista localidades",
        "results": results
    }
    
    return jsonify(response_body), 200

#ENDOPOINT: Obtener razas
@api.route('/razas', methods=['GET'])
def get_all_razas():
    results_query = Raza.query.all()

    if not results_query:
        return jsonify({"error": "Raza not found"}), 404
    
    results = [raza.serialize() for raza in results_query]

    # print(results)
    response_body = {
        "msg": "Lista de razas",
        "results": results
    }
    
    return jsonify(response_body), 200

