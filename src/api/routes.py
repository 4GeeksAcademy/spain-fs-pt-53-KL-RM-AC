"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, UserProperties
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from sqlalchemy import and_


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# login
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if not email or not password : 
       return jsonify({"msg": "The email and password are required"}) 
    user = User.query.filter_by(email = email, password=password).first()
    if not user : return jsonify({"msg": "The email and password are incorrect"})
    
    access_token = create_access_token(identity= email)
    return jsonify({"access_token": access_token, "user_id": user.id })

# create user
@api.route('/create/user', methods=['POST'])
def create_user():
    # Obtener los datos del cuerpo de la solicitud
    body = request.json
    
    # Verificar si se proporcionaron los datos necesarios
    if not all(key in body for key in ['email', 'password', 'user_name', 'last_name']):
        return jsonify({'message': 'Faltan datos requeridos'}), 400
    
    # Verificar si el correo electrónico ya está en uso
    existing_user = User.query.filter_by(email=body['email']).first()
    if existing_user:
        return jsonify({'message': 'El correo electrónico ya está en uso'}), 400
    
    # Crear un nuevo usuario
    new_user = User(
        email=body['email'],
        password=body['password'],
        user_name=body['user_name'],
        last_name=body['last_name']
        # Puedes agregar 'profile_img' si también se proporciona en los datos
    )
    
    # Guardar el nuevo usuario en la base de datos
    db.session.add(new_user)
    db.session.commit()
    
    # Retornar una respuesta exitosa
    return jsonify({'message': 'Usuario creado exitosamente', 'user_id': new_user.id}), 201


# filtra a travez de la properties
@api.route('/users-filter', methods=['GET'])
def get_users_filter():
    pet = request.args.get('pet')
    gender = request.args.get('gender')
    budget = request.args.get('budget')
    findroomie = request.args.get('find_roomie')

    users = UserProperties.query.filter_by(
        pet = pet,
        gender = gender,
        budget = budget,
        find_roomie = findroomie,
    )

    filters = []

    if pet is not None:
        filters.append(UserProperties.pet == pet)
    if gender is not None:
        filters.append(UserProperties.gender == gender)
    if budget is not None:
        filters.append(UserProperties.budget == budget)
    if findroomie is not None:
        filters.append(UserProperties.find_roomie == findroomie)

    users = UserProperties.query.filter(and_(*filters)).all()

    serialized_users = list(map(lambda user: user.serialize(), users))
    
    return jsonify(serialized_users), 200

# sube las propiedades de un usuario (Crear perfil)
@api.route('/user/properties', methods=['POST'])
@jwt_required()  # Asegura que el usuario esté autenticado con un token JWT
def create_user_properties():
    # Obtener el ID de usuario del token JWT
    current_user_id = get_jwt_identity()

    # Obtener los datos del cuerpo de la solicitud
    body = request.json
    
    # Verificar si se proporcionaron los datos necesarios
    if not all(key in body for key in ['pet', 'gender', 'budget', 'find_roomie']):
        return jsonify({'message': 'Faltan datos requeridos'}), 400
    
    # Verificar si el usuario existe
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'message': 'El usuario no existe'}), 404
    
    # Crear un nuevo UserProperties y asignarle el usuario
    new_user_properties = UserProperties(
        user_id=current_user_id,
        pet=body['pet'],
        gender=body['gender'],
        budget=body['budget'],
        find_roomie=body['find_roomie']
    )

    # Guardar en la base de datos
    db.session.add(new_user_properties)
    db.session.commit()

    return jsonify({'message': 'Propiedades de usuario creadas exitosamente'}), 201

# Actualiza los datos de perfil (editar perfil)
@api.route('/update/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    # Obtener el ID de usuario del token JWT
    current_user_id = get_jwt_identity()
    
    # Verificar si el usuario que intenta actualizar es el mismo que está autenticado
    if current_user_id != user_id:
        return jsonify({'message': 'No tienes permiso para realizar esta acción'}), 403

    # Obtener los datos del cuerpo de la solicitud
    body = request.json
    
    # Verificar si se proporcionaron los datos necesarios
    if not all(key in body for key in ['email', 'password', 'user_name', 'last_name']):
        return jsonify({'message': 'Faltan datos requeridos'}), 400
    
    # Verificar si el usuario que se intenta actualizar existe
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'El usuario no existe'}), 404
    
    # Actualizar los datos del usuario con los nuevos valores proporcionados
    user.email = body['email']
    user.password = body['password']
    user.user_name = body['user_name']
    user.last_name = body['last_name']
    
    # Guardar los cambios en la base de datos
    db.session.commit()
    
    # Retornar una respuesta exitosa
    return jsonify({'message': 'Datos de usuario actualizados exitosamente'}), 200

# Borra el perfil
@api.route('/user/profile', methods=['DELETE'])
@jwt_required()
def delete_user_profile():
    # Obtener el ID de usuario del token JWT
    current_user_id = get_jwt_identity()

    # Verificar si el usuario existe 
    user = User.query.filter_by(id=current_user_id).first()
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    
    # Eliminar las propiedades del usuario de la base de datos
    UserProperties.query.filter_by(user_id=current_user_id).delete()
    
    # Eliminar el usuario de la base de datos y confirmar los cambios
    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'Perfil de usuario eliminado exitosamente'}), 200

@api.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    # Obtener el usuario de la base de datos
    user = User.query.filter_by(id=user_id).first()
    
    # Verificar si el usuario existe 
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    
    # Serializar los datos del usuario
    serialized_user = user.serialize()
    
    # Obtener las propiedades del usuario
    user_properties = UserProperties.query.filter_by(user_id=user.id).first()
    
    # Verificar si el usuario tiene propiedades
    if user_properties:
        # Serializar las propiedades del usuario
        serialized_properties = user_properties.serialize()
        # Agregar las propiedades al diccionario del usuario serializado
        serialized_user['properties'] = serialized_properties
    
    # Retornar el usuario y sus propiedades en formato JSON
    return jsonify(serialized_user), 200

# obtiene todos los user con sus propiedades
@api.route('/users&properties', methods=['GET'])
@jwt_required()
def get_users_with_properties():
    # Obtener todos los usuarios de la base de datos
    users = User.query.all()
    
    # Lista para almacenar los datos serializados de todos los usuarios con propiedades
    users_with_properties = []
    
    # Iterar sobre todos los usuarios
    for user in users:
        # Serializar los datos del usuario
        serialized_user = user.serialize()
        
        # Obtener las propiedades del usuario
        user_properties = UserProperties.query.filter_by(user_id=user.id).first()
        
        # Verificar si el usuario tiene propiedades
        if user_properties:
            # Serializar las propiedades del usuario
            serialized_properties = user_properties.serialize()
            # Agregar las propiedades al diccionario del usuario serializado
            serialized_user['properties'] = serialized_properties
        
        # Agregar el usuario y sus propiedades (si las tiene) a la lista
        users_with_properties.append(serialized_user)
    
    # Retornar la lista de usuarios con sus propiedades en formato JSON
    return jsonify(users_with_properties), 200




# trae usuarios (sin propiedades) no creo que se use
@api.route('/users', methods=['GET'])
def get_users():
    # Obtener todos los usuarios de la base de datos
    users = User.query.all()
    
    # Serializar los usuarios en un formato JSON
    serialized_users = [user.serialize() for user in users]
    
    # Retornar la lista de usuarios en formato JSON
    return jsonify(serialized_users), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
