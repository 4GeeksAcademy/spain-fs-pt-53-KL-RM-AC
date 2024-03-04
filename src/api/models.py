from flask_sqlalchemy import SQLAlchemy
import enum 

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    user_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    profile_img = db.Column(db.String(100))
    user_properties = db.relationship('UserProperties', back_populates='user', uselist=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "user_name": self.user_name,
            "last_name": self.last_name,
            "profile_img": self.profile_img
        }

class GenderChoices(enum.Enum):
    Male = 'Male'
    Female = 'Female'

class PetChoice(enum.Enum):
    Yes = 'Yes'
    No = 'No'

class FindRoomieChoice(enum.Enum):
    Apartment = 'Apartment'
    NoApartment = 'NoApartment'

class UserProperties(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    pet = db.Column(db.Enum(PetChoice), nullable=False)
    gender = db.Column(db.Enum(GenderChoices), nullable=False)
    budget = db.Column(db.Integer(), nullable=False)
    find_roomie = db.Column(db.Enum(FindRoomieChoice), nullable=False)
    text_box = db.Column (db.Text(), nullable=False)
    user = db.relationship('User', back_populates='user_properties')
    

    def __repr__(self):
        return f'<UserProperties {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "pet": self.pet.name,
            "gender": self.gender.name,
            "amount": self.budget,
            "find_roomie": self.find_roomie.name,
            "text_box": self.text_box
        }

class FavoriteProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    profile_id = db.Column(db.Integer, nullable=False)

    # Definir la relación con la tabla de usuarios
    user = db.relationship('User', backref='favorite_profiles')

    def __repr__(self):
        return f'<FavoriteProfile {self.id}>'