from flask_sqlalchemy import SQLAlchemy
import enum 
from sqlalchemy import Enum


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    user_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    profile_img = db.Column(db.String(100))

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
    user = db.relationship(User) 

    def __repr__(self):
        return f'<UserProperties {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "pet": self.pet.value,
            "gender": self.gender.value,
            "amount": self.budget,
            "find_roomie": self.find_roomie.value
        }
