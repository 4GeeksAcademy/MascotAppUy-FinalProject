"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Mascota, Color, Especie, Departamento, Localidad, Raza
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta, datetime
from werkzeug.security import generate_password_hash, check_password_hash
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Cloudinary Config       
cloudinary.config( 
    cloud_name = "dnfyyzvzw", 
    api_key = "819588665853269", 
    api_secret = "Oyq-jtbcAQYj_ySpyo-brsHZHCg", # Click 'View API Keys' above to copy your API secret
    secure=True
)

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
    return jsonify({"access_token":access_token, "user":user.serialize()})

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
    return jsonify(response_body), 200

# ENDPOINT: Agregar mascotas
@api.route('/mascotas', methods=['POST'])
def add_mascota():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No se recibió ningún dato"}), 400
        
        # Validación de campos obligatorios
        required_fields = ["nombre", "edad", "sexo", "descripcion", "estado", "fecha_perdido", 
                           "user_id", "especie_id", "raza_id", "localidad_id", "departamento_id", "url_image"]
        
        for field in required_fields:
            if field not in data or data[field] is None:
                return jsonify({"error": f"El campo {field} es obligatorio"}), 400
            
        # try:
        #     fecha_perdido = datetime.strptime(data["fecha_perdido"], "%d/%m/%Y").date()
        # except ValueError:
        #     return jsonify({"error": "El formato de fecha_perdido es incorrecto, debe ser 'DD/MM/YYYY'"}), 400
        
        # Crear nueva mascota
        new_mascota = Mascota(
            nombre = data.get("nombre"), 
            edad = data.get("edad"), 
            sexo = data.get("sexo"), 
            descripcion = data.get("descripcion"), 
            estado = data.get("estado"), 
            fecha_perdido = data.get("fecha_perdido"), 
            user_id = data.get("user_id"), 
            especie_id = data.get("especie_id"),
            raza_id = data.get("raza_id"), 
            localidad_id = data.get("localidad_id"),
            departamento_id = data.get("departamento_id"),
            url_image = data.get("url_image"),
            coord_x = data.get("coord_x"),  # Puede ser None
            coord_y = data.get("coord_y")   # Puede ser None
            # favorito_id = data["favorito_id"]
        )
        # Agregar colores a la mascota por ser Many to Many va diferente
        # for color_name in data["colores_mascotas"]:
        #     color = Color.query.filter_by(name=color_name).first()
        #     if color:
        #         new_mascota.colores_mascotas.append(color)
        #     else:
        #         return jsonify({"error": f"Color '{color_name}' not found"}), 404
        
        db.session.add(new_mascota)
        db.session.commit()
        
        return jsonify(new_mascota.serialize()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Ocurrió un error al agregar la mascota", "message": str(e)}), 500



# ENDPOINT: Validar token
@api.route("/valid-token", methods=["GET"])
@jwt_required()
def valid_token():

    # Validate the identity of the current user
    current_user = get_jwt_identity()
    user = User.query.filter_by(email = current_user).first()

    if user is None:
        return jsonify(user=None), 409

    return jsonify(user.serialize()), 200

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

    user = User(
        email=data["email"], 
        is_active=True, 
        password=hashed_password, 
        nombre=data["nombre"], 
        telefono=data["telefono"], 
    )
    print(data)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=data.get("email"), expires_delta=timedelta(hours=12))
    return jsonify({"msg": "New user created", "user": user.serialize(), "access_token":access_token})

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

# ENDPOINT: Editar datos de usuario existente
@api.route("/usuarios/<int:user_id>", methods=["PUT"])
def edit_user(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"error": "Usuario no se encuentra en la base"}), 404

    # Actualizar los campos proporcionados
    if data.get("email"):
        # Verificar si el nuevo email ya está en uso por otro usuario
        check_email = User.query.filter_by(email=data["email"]).first()
        if check_email and check_email.id != user_id:
            return jsonify({"error": "Email ya existe en la base"}), 404
        user.email = data["email"]

    if data.get("password"):
        hashed_password = generate_password_hash(data["password"])
        user.password = hashed_password

    if data.get("nombre"):
        user.nombre = data["nombre"]

    if data.get("telefono"):
        user.telefono = data["telefono"]

    if "is_active" in data:
        user.is_active = data["is_active"]

    db.session.commit()

    return jsonify({"msg": "Datos de usuario actualizados exitosamente", "user": user.serialize()})

# ENDPOINT: Editar datos de mascota existente
@api.route("/mascotas/<int:mascota_id>", methods=["PUT"])
def edit_mascota(mascota_id):
    data = request.get_json()
    mascota = Mascota.query.get(mascota_id)
    
    if not mascota:
        return jsonify({"error": "Mascota no se encuentra en la base"}), 404

    # Actualizar los campos proporcionados
    if data.get("nombre"):
        mascota.nombre = data["nombre"]

    if data.get("edad"):
        mascota.edad = data["edad"]

    if data.get("sexo"):
        mascota.sexo = data["sexo"]

    if data.get("descripcion"):
        mascota.descripcion = data["descripcion"]

    if data.get("estado"):
        mascota.estado = data["estado"]

    if data.get("fecha_perdido"):
        mascota.fecha_perdido = data["fecha_perdido"]

    if data.get("especie_id"):
        mascota.especie_id = data["especie_id"]

    if data.get("raza_id"):
        mascota.raza_id = data["raza_id"]

    if data.get("localidad_id"):
        mascota.localidad_id = data["localidad_id"]

    if data.get("departamento_id"):
        mascota.departamento_id = data["departamento_id"]
    
    if data.get("url_image"):
        mascota.url_image = data["url_image"]

    if data.get("coord_x"):
        mascota.coord_x = data["coord_x"]

    if data.get("coord_y"):
        mascota.coord_y = data["coord_y"]

    if "is_active" in data:
        mascota.is_active = data["is_active"]

    db.session.commit()

    return jsonify({"msg": "Datos de mascota actualizados exitosamente", "mascota": mascota.serialize()})

@api.route('/upload-file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "not file found"}), 404
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "no selected file"})
    
    try:
        result = cloudinary.uploader.upload(file, folder='mascotas')
        return jsonify({"url": result['secure_url']})
    except Exception as e:
        return jsonify({"error": str(e)})

