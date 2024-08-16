from flask_sqlalchemy import SQLAlchemy
from datetime import date
from enum import Enum, auto
from sqlalchemy.orm import validates

db = SQLAlchemy()

def format_date(date):
    return date.strftime('%d/%m/%Y') if date else None

colores_mascotas = db.Table('colores_mascotas',
    db.Column('mascota_id', db.Integer, db.ForeignKey('mascota.id'), primary_key=True, nullable=False),
    db.Column('color_id', db.Integer, db.ForeignKey('color.id'), primary_key=True, nullable=False)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    fecha_registro = db.Column(db.Date, default=date.today())
    telefono = db.Column(db.String(25))
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    mascotas = db.relationship('Mascota', backref='user', lazy=True)
    # localidad_id = db.Column(db.Integer, db.ForeignKey('localidad.id'))
    favorito_id = db.Column(db.Integer, db.ForeignKey('favorito.id'))
    
    @validates('nombre')
    def validate_nombre(self, key, nombre):
        if len(nombre) < 3:
            raise ValueError("Nombre debe tener al menos 3 caracteres")
        return nombre

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre,
            "fecha_registro": format_date(self.fecha_registro),
            "telefono": self.telefono,
            "is_active": self.is_active,
            "mascotas": [mascota.serialize() for mascota in self.mascotas],
            # "localidad_id": self.localidad_id,
            # "localidad_name": self.localidad.name,
            "favorito_id": self.favorito_id
        }

class Estado(Enum):
    PERDIDO = 'perdido'
    ENCONTRADO = 'encontrado'
    ADOPCION = 'adopcion'
    REUNIDO = 'reunido'

class Sexo(Enum):
    MACHO = 'macho'
    HEMBRA = 'hembra'
    INDEFINIDO = 'indefinido'

class Mascota(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    edad = db.Column(db.String(120), nullable=False)
    sexo = db.Column(db.Enum(Sexo), nullable=False)
    descripcion = db.Column(db.String(250), nullable=False)
    estado = db.Column(db.Enum(Estado), nullable=False)
    fecha_registro = db.Column(db.Date, default=date.today())
    fecha_perdido = db.Column(db.Date, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    especie_id = db.Column(db.Integer, db.ForeignKey('especie.id'), nullable=False)
    localidad_id = db.Column(db.Integer, db.ForeignKey('localidad.id'), nullable=False)
    colores_mascotas = db.relationship('Color', secondary = colores_mascotas, lazy = 'subquery', backref=db.backref('mascota', lazy=True))
    raza_id = db.Column(db.Integer, db.ForeignKey('raza.id'), nullable=False)
    departamento_id = db.Column(db.Integer, db.ForeignKey('departamento.id'), nullable=False)
    favorito_id = db.Column(db.Integer, db.ForeignKey('favorito.id'))
    url_image = db.Column(db.String(250))

    def __repr__(self):
        return f'<Mascota {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "fecha_registro": format_date(self.fecha_registro),
            "edad": self.edad,
            "estado": self.estado.name,
            "descripcion": self.descripcion,
            "sexo": self.sexo.name,
            "fecha_perdido": format_date(self.fecha_perdido),
            "is_active": self.is_active,
            "user_id": self.user_id,
            "user_name": self.user.nombre,
            "especie_id": self.especie_id,
            "especie_name": self.especie.name,
            "localidad_id": self.localidad_id,
            "localidad_name": self.localidad.name,
            "colores_mascotas": [color.serialize() for color in self.colores_mascotas],
            "favorito_id": self.favorito_id,
            "raza_id": self.raza_id,
            "raza_name": self.raza.name,
            "departamento_id": self.departamento_id,
            "departamento_name": self.departamento.name,
            "url_image": self.url_image
        }

class Especie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    mascotas = db.relationship('Mascota', backref='especie', lazy=True)
    razas = db.relationship('Raza', backref='especie', lazy=True)

    def __repr__(self):
        return '<Especie %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }   

class Raza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    especie_id = db.Column(db.Integer, db.ForeignKey('especie.id'),
        nullable=False)
    razas = db.relationship('Mascota', backref='raza', lazy=True)

    def __repr__(self):
        return '<Raza %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "especie_id": self.especie_id
        }

class Departamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    localidades = db.relationship('Localidad', backref='departamento', lazy=True)
    departamentos = db.relationship('Mascota', backref='departamento', lazy=True)

    def __repr__(self):
        return '<Departamento %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
    
class Localidad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    departamento_id = db.Column(db.Integer, db.ForeignKey('departamento.id'), nullable=False)
    # users = db.relationship('User', backref='localidad', lazy=True)
    mascotas = db.relationship('Mascota', backref='localidad', lazy=True)

    def __repr__(self):
        return '<Localidad %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "departamento_id": self.departamento_id
        }
    
class Color(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)

    def __repr__(self):
        return '<Color %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class Favorito(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    users = db.relationship('User', backref='favorito', lazy=True)
    mascotas = db.relationship('Mascota', backref='favorito', lazy=True)
    
    def __repr__(self):
        return '<Favoritos %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "users": [user.serialize() for user in self.users],
            "mascotas": [mascota.serialize() for mascota in self.mascotas]
        }