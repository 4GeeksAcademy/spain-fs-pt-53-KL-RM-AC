"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, UserProperties, FavoriteProfile
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from sqlalchemy import and_
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
from werkzeug.utils import secure_filename
import re
import os




api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

upload_folder = r'C:\rutaatucarpeta\uploads' 

# login
# FUNCIONA 
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if not email or not password: 
       return jsonify({"message": "Email and password are required"}), 400
    
    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"message": "Email or password are incorrect"}), 401
    
    access_token = create_access_token(identity=user.id)  # Aquí se utiliza el ID del usuario como identidad
    return jsonify({"access_token": access_token, "user_id": user.id})


# create user (registro)
# FUNCIONA 

@api.route('/signup', methods=['POST'])
def create_user():
    # Obtener los datos del cuerpo de la solicitud
    body = request.json
    
    # Verificar si se proporcionaron los datos necesarios
    if not all(key in body for key in ['email', 'password', 'user_name', 'last_name']):
        return jsonify({'message': 'Required data is missing'}), 400

    # Verificar si el correo electrónico ya está en uso
    existing_user = User.query.filter_by(email=body['email']).first()
    if existing_user:
        return jsonify({'message': 'The email is already in use'}), 400
    
    # Crear un nuevo usuario
    new_user = User(
        email=body['email'],
        password=body['password'],
        user_name=body['user_name'],
        last_name=body['last_name']
    )
    
    # Guardar el nuevo usuario en la base de datos
    db.session.add(new_user)
    
    # Retornar una respuesta exitosa
    try:
     db.session.commit()
     return jsonify({'message': 'User created successfully', 'user_id': new_user.id}), 201
    except Exception as e:
     db.session.rollback()
     return jsonify({'msg': f'Error creating user: {str(e)}'}), 500


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user_details():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404
    return jsonify(user.serialize()), 200

# Cambio contrasena
#FUNCIONA   
@api.route('/user/change-password', methods=['PUT'])
@jwt_required()
def change_user_password():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    data = request.json
    new_password = data.get('new_password')

    if not new_password:
        return jsonify({'error': 'Se requiere una nueva contraseña'}), 400

    
    # Actualizar la contraseña del usuario
    user.password = new_password
    db.session.commit()

    return jsonify({'message': 'Contraseña cambiada exitosamente'}), 200

# crea por primera vez los filtros de los user (crear perfil)
# FUNCIONA
@api.route('/user/properties', methods=['POST'])
@jwt_required()  # Asegura que el endpoint esté protegido por autenticación JWT
def create_user_properties():
    # Obtener el ID del usuario del token JWT
    current_user_id = get_jwt_identity()

    # Obtener los datos del cuerpo de la solicitud
    body = request.json
    
    # Extraer los datos del cuerpo de la solicitud
    pet = body.get('pet')
    gender = body.get('gender')
    budget = body.get('budget')
    find_roomie = body.get('find_roomie')
    text_box = body.get('text_box')
    profile_img = body.get('profile_img')

    # Verificar si falta algún dato necesario
    if not all([pet, gender, budget, find_roomie, text_box,profile_img]):
        return jsonify({'error': 'Missing data'}), 400

    # Crear una nueva instancia de UserProperties con el ID del usuario autenticado
    new_user_properties = UserProperties(
        user_id=current_user_id,
        pet=pet,
        gender=gender,
        budget=budget,
        find_roomie=find_roomie,
        text_box=text_box,
        profile_img =profile_img
    )

    # Agregar la nueva instancia a la base de datos
    db.session.add(new_user_properties)
    db.session.commit()

    return jsonify({'message': 'User properties created successfully'}), 201

# obtiene el user (mi perfil) 
@api.route('/user/profile', methods=['GET'])
@jwt_required()  # Asegura que el endpoint esté protegido por autenticación JWT
def get_user_profile():
    # Obtener el ID del usuario del token JWT
    current_user_id = get_jwt_identity()

    # Realizar una operación de unión (join) para obtener tanto los datos del usuario como sus propiedades
    user_data = db.session.query(User, UserProperties).\
        filter(User.id == current_user_id).\
        outerjoin(UserProperties, User.id == UserProperties.user_id).\
        first()

    # Verificar si el usuario existe
    if not user_data:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    # Extraer los datos del usuario y sus propiedades de la tupla obtenida
    user, user_properties = user_data

    # Serializar los datos del usuario
    serialized_user = user.serialize()

    # Verificar si el usuario tiene propiedades
    if user_properties:
        # Serializar las propiedades del usuario
        serialized_properties = user_properties.serialize()
        # Agregar las propiedades al diccionario del usuario serializado
        serialized_user['properties'] = serialized_properties

    return jsonify(serialized_user), 200

# actualiza propiedades
# FUNCIONA
@api.route('/user/properties', methods=['PUT'])
@jwt_required()
def update_user_properties():
    # Obtener el ID del usuario del token JWT
    current_user_id = get_jwt_identity()
    # Verificar si se encontró al usuario
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404
    # Obtener el ID de usuario del usuario encontrado
    user_id = user.id
    # Obtener los datos del cuerpo de la solicitud
    body = request.json
    # Obtener las propiedades actuales del usuario
    user_properties = UserProperties.query.filter_by(user_id=user_id).first()
    # Si el usuario no tiene propiedades aún, crear un nuevo registro
    if not user_properties:
        user_properties = UserProperties(user_id=user_id)
    # Actualizar las propiedades del usuario con los datos proporcionados en la solicitud
    user_properties.pet = body.get('pet', user_properties.pet)
    user_properties.gender = body.get('gender', user_properties.gender)
    user_properties.budget = body.get('budget', user_properties.budget)
    user_properties.find_roomie = body.get('find_roomie', user_properties.find_roomie)
    user_properties.text_box = body.get('text_box', user_properties.text_box)
    user_properties.profile_img= body.get('profile_img', user.properties.profile_img)

    # Guardar los cambios en la base de datos
    db.session.add(user_properties)
    db.session.commit()

    return jsonify({'message': 'Propiedades del usuario actualizadas exitosamente'}), 200

# Borra los filtros del user (propiedades)
# FUNCIONA
@api.route('/user/properties', methods=['DELETE'])
@jwt_required()  # Asegura que el endpoint esté protegido por autenticación JWT
def delete_user_properties():
    # Obtener el ID del usuario del token JWT
    current_user_id = get_jwt_identity()

    # Buscar las propiedades del usuario actual
    user_properties = UserProperties.query.filter_by(user_id=current_user_id).first()
    if not user_properties:
        return jsonify({'error': 'User properties not found'}), 404

    try:
        # Eliminar las propiedades del usuario
        db.session.delete(user_properties)
        db.session.commit()
        return jsonify({'message': 'User properties deleted successfully'}), 200
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'IntegrityError occurred'}), 500


# filtra a travez de la properties
# Funciona 
@api.route('/users-filter', methods=['GET'])
@jwt_required()  # Asegura que el endpoint esté protegido por autenticación JWT
def get_users_filter():
    # Obtener el ID del usuario del token JWT
    current_user_id = get_jwt_identity()

    # Filtrar las propiedades de usuario según los criterios proporcionados
    filters = []
    pet = request.args.get('pet')
    gender = request.args.get('gender')
    budget = request.args.get('budget')
    findroomie = request.args.get('find_roomie')

    if pet is not None:
        filters.append(UserProperties.pet == pet)
    if gender is not None:
        filters.append(UserProperties.gender == gender)
    if budget is not None:
        filters.append(UserProperties.budget == budget)
    if findroomie is not None:
        filters.append(UserProperties.find_roomie == findroomie)

    # Realizar una operación de unión (join) para obtener los nombres y apellidos de los usuarios
    users_properties = db.session.query(UserProperties, User.user_name, User.last_name).\
        join(User, User.id == UserProperties.user_id).\
        filter(and_(*filters)).all()

    # Serializar las propiedades de los usuarios y obtener los nombres y apellidos de los usuarios correspondientes
    serialized_users = []
    for user_property, user_name, last_name in users_properties:
        serialized_user = user_property.serialize()
        serialized_user['user_name'] = user_name
        serialized_user['last_name'] = last_name
        serialized_users.append(serialized_user)

    return jsonify(serialized_users), 200

#####################################################
# OBTIENE EL USUARIO CON SUS PROPIEDADES A TRAVEZ DE SU ID. LEARN MORE  
# FUNCIONA
@api.route('/user/<int:user_id>', methods=['GET'])
@jwt_required() 
def get_user(user_id):
    # Realizar una operación de unión (join) para obtener tanto los datos del usuario como sus propiedades
    user_data = db.session.query(User, UserProperties).\
        filter(User.id == user_id).\
        outerjoin(UserProperties, User.id == UserProperties.user_id).\
        first()

    # Verificar si el usuario existe
    if not user_data:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    # Extraer los datos del usuario y sus propiedades de la tupla obtenida
    user, user_properties = user_data

    # Serializar los datos del usuario
    serialized_user = user.serialize()

    # Verificar si el usuario tiene propiedades
    if user_properties:
        # Serializar las propiedades del usuario
        serialized_properties = user_properties.serialize()
        # Agregar las propiedades al diccionario del usuario serializado
        serialized_user['properties'] = serialized_properties

    return jsonify(serialized_user), 200

##########################################

##########################################
# obtiene todos los user con sus propiedades LO USO EN EL FLUX, ACTIONS, GETALLUSERS 
# FUNCIONA
@api.route('/users/properties', methods=['GET'])
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
# FUNCIONA
 

##########################
#Favoritos
@api.route('/user/favorite-profiles', methods=['POST'])
@jwt_required()
def add_favorite_profile():
    # Obtener el ID del usuario actual del token JWT
    current_user_id = get_jwt_identity()

    # Obtener el perfil a agregar a favoritos del cuerpo de la solicitud
    profile_id = request.json.get('profile_id')

    if not profile_id:
        return jsonify({'error': 'Se requiere el ID del perfil'}), 400

    # Verificar si el perfil ya está en favoritos del usuario
    existing_favorite = FavoriteProfile.query.filter_by(user_id=current_user_id, profile_id=profile_id).first()
    if existing_favorite:
        return jsonify({'error': 'El perfil ya está en favoritos'}), 400

    # Crear una nueva entrada en la tabla de perfiles favoritos
    new_favorite = FavoriteProfile(user_id=current_user_id, profile_id=profile_id)
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify({'message': 'Perfil agregado a favoritos exitosamente'}), 201

# Obtener todos los favoritos
@api.route('/user/favorite-profiles', methods=['GET'])
@jwt_required()
def get_favorite_profiles():
    # Obtener el ID del usuario actual del token JWT
    current_user_id = get_jwt_identity()

    # Consultar la lista de perfiles favoritos del usuario actual
    favorite_profiles = FavoriteProfile.query.filter_by(user_id=current_user_id).all()

    # Serializar los perfiles favoritos
    serialized_profiles = []
    for favorite in favorite_profiles:
        profile = User.query.get(favorite.profile_id)
        if profile:
            serialized_profiles.append(profile.serialize())

    return jsonify(serialized_profiles), 200

# borrar fav
@api.route('/user/favorite-profiles/<int:profile_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite_profile(profile_id):
    # Obtener el ID del usuario actual del token JWT
    current_user_id = get_jwt_identity()

    # Buscar el perfil favorito del usuario actual
    favorite = FavoriteProfile.query.filter_by(user_id=current_user_id, profile_id=profile_id).first()

    # Verificar si el perfil favorito existe
    if not favorite:
        return jsonify({'error': 'El perfil no está en la lista de favoritos'}), 404

    # Eliminar el perfil favorito de la lista de favoritos del usuario
    db.session.delete(favorite)
    db.session.commit()

    return jsonify({'message': 'Perfil eliminado de favoritos exitosamente'}), 200

