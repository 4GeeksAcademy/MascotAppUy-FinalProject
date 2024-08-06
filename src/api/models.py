from flask_sqlalchemy import SQLAlchemy
from datetime import date
from enum import Enum, auto

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    fecha_registro = db.Column(db.Date, default=date.today())
    telefono = db.Column(db.String, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    mascotas = db.relationship('Mascota', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre,
            "fecha_registro": self.fecha_registro,
            "telefono": self.telefono,
            "is_active": self.is_active
        }

class Estado(Enum):
    perdido = auto()
    encontrado = auto()
    adopcion = auto()
    reunido = auto()

class Mascota(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    edad = db.Column(db.String(120), nullable=False)
    descripcion = db.Column(db.String(250), nullable=False)
    estado = db.Column(db.Enum(Estado), nullable=False)
    fecha_registro = db.Column(db.Date, default=date.today())
    fecha_perdido = db.Column(db.Date, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    def __repr__(self):
        return f'<User {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "fecha_registro": self.fecha_registro,
            "edad": self.edad,
            "estado": self.estado,
            "descripcion": self.descripcion
        }

class Especie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)

    def __repr__(self):
        return '<Characters %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }   

class Raza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)

    def __repr__(self):
        return '<Characters %r>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class Departamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)

    def __repr__(self):
        return '<Characters %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
    
class Localidad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)

    def __repr__(self):
        return '<Characters %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
    
class Color(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)

    def __repr__(self):
        return '<Characters %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        } 