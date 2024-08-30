import click
import json
from api.models import db, User, Departamento, Localidad, Especie, Raza, Mascota
from werkzeug.security import generate_password_hash

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass

    @app.cli.command("seed-departments")
    def seed_departments():
        # Cargar los departamentos desde el JSON
        with open('src/api/jsons/departamentos.json') as f:
            departamentos_json = json.load(f)
        
        # Obtener los nombres de los departamentos en la base de datos
        departamentos_db = {d.name for d in Departamento.query.all()}
        
        # Identificar departamentos faltantes
        missing_departments = [
            d for d in departamentos_json if d["departamentos"] not in departamentos_db
        ]

        if not missing_departments:
            print("All departments are already present in the database.")
            return
        
        # Agregar los departamentos faltantes
        for dept in missing_departments:
            new_departamento = Departamento(
                name=dept["departamentos"],
                coord_x=dept["coord_x"],
                coord_y=dept["coord_y"])
            db.session.add(new_departamento)

        db.session.commit()
        print("Missing departments have been added to the database.")

    @app.cli.command("seed-localities")
    def seed_localities():
        # Cargar las localidades desde el JSON
        with open('src/api/jsons/localidades_deptos.json') as f:
            localidades_json = json.load(f)
        
        # Ordenar el JSON primero por departamento y luego por localidad
        localidades_json.sort(key=lambda x: (x["departamento"], x["localidad"]))

        # Obtener las localidades en la base de datos
        localidades_db = {(l.name, l.departamento_id) for l in Localidad.query.all()}

        # Identificar localidades faltantes
        missing_localities = [
            loc for loc in localidades_json 
            if (loc["localidad"], Departamento.query.filter_by(name=loc["departamento"]).first().id) not in localidades_db
        ]

        if not missing_localities:
            print("All localities are already present in the database.")
            return

        # Agregar las localidades faltantes
        for loc in missing_localities:
            departamento = Departamento.query.filter_by(name=loc["departamento"]).first()
            new_localidad = Localidad(
                name=loc["localidad"],
                departamento_id=departamento.id,
                coord_x=loc["coord_x"],
                coord_y=loc["coord_y"]
                )
            db.session.add(new_localidad)

        db.session.commit()
        print("Missing localities have been added to the database.")

    @app.cli.command("seed-species-and-breeds")
    def seed_species_and_breeds():
        # Cargar el archivo JSON de especies y razas
        with open('src/api/jsons/razas_especies.json') as file:
            razas_especies_json = json.load(file)
        
        # Ordenar el JSON primero por nombre de especie y luego por nombre de raza
        razas_especies_json.sort(key=lambda x: (x["Especie"], x["Raza"]))

        # Crear un diccionario de especies existentes en la base de datos
        especies_db = {e.name: e.id for e in Especie.query.all()}
        razas_agregadas = set()

        for entry in razas_especies_json:
            especie_nombre = entry["Especie"]
            raza_nombre = entry["Raza"]

            # Verificar si la especie ya existe
            if especie_nombre not in especies_db:
                # Agregar la nueva especie a la lista
                nueva_especie = Especie(name=especie_nombre)
                db.session.add(nueva_especie)
                db.session.commit()
                # Actualizar el diccionario de especies_db con el nuevo ID
                especies_db[especie_nombre] = nueva_especie.id

            # Verificar si la raza ya existe para la especie correspondiente
            especie_id = especies_db[especie_nombre]
            raza_existente = Raza.query.filter_by(name=raza_nombre, especie_id=especie_id).first()
            
            if raza_existente:
                continue
            # Agregar la nueva raza si no existe
            nueva_raza = Raza(name=raza_nombre, especie_id=especie_id)
            db.session.add(nueva_raza)
            razas_agregadas.add(raza_nombre)

        db.session.commit()
        if razas_agregadas:
            print("Razas nuevas agregadas a la base de datos.")
        else:
            print("No se agregaron nuevas razas.")
    
        print("Especies y razas verificadas e insertadas si era necesario.")

    @app.cli.command("seed-mascotas")
    def seed_mascotas():
        """Carga datos de mascotas desde un archivo JSON en la base de datos."""
        # Lee el archivo JSON
        with open('src/api/jsons/mascotas.json') as file:
            mascotas_data = json.load(file)
        
        # Procesa cada mascota en el archivo
        for data in mascotas_data:
            # Busca el usuario por nombre
            user = User.query.filter_by(nombre=data['user_name']).first()
            if not user:
                print(f"Usuario con nombre {data['user_name']} no encontrado. Saltando esta mascota.")
                continue

            # Busca la especie, raza, localidad y departamento por nombre
            especie = Especie.query.filter_by(name=data['especie_name']).first()
            raza = Raza.query.filter_by(name=data['raza_name']).first()
            localidad = Localidad.query.filter_by(name=data['localidad_name']).first()
            departamento = Departamento.query.filter_by(name=data['departamento_name']).first()

            if not especie or not raza or not localidad or not departamento:
                print(f"Algún dato relacionado con la mascota '{data['nombre']}' no fue encontrado. Saltando esta mascota.")
                continue

            # Crea la mascota
            mascota = Mascota(
                nombre=data['nombre'],
                descripcion=data['descripcion'],
                edad=data['edad'],
                sexo=data['sexo'],
                estado=data['estado'],
                fecha_perdido=data['fecha_perdido'],
                coord_x=data['coord_x'],
                coord_y=data['coord_y'],
                especie_id=especie.id,
                raza_id=raza.id,
                localidad_id=localidad.id,
                departamento_id=departamento.id,
                url_image=data['url_image'],
                user_id=user.id
            )
            
            # Añade y guarda la mascota en la base de datos
            mascota.validate()
            db.session.add(mascota)
            db.session.commit()
            print("Datos de mascotas insertados exitosamente.")

    @app.cli.command("seed-users")
    def seed_users():
        """Inserta usuarios con contraseñas en texto claro."""
        with open('src/api/jsons/usuarios.json') as file:
            usuarios_data = json.load(file)
        
        for data in usuarios_data:
            existing_user = User.query.filter_by(email=data['email']).first()
            if existing_user:
                # print(f"Usuario con ID {data['id']} ya existe. Skipping...")
                continue
            
            user = User(
                email=data['email'],
                nombre=data['nombre'],
                password=data['password'],  # Contraseña en texto claro
                telefono=data['telefono'],
                is_active=data['is_active']
            )
            db.session.add(user)
        
        db.session.commit()
        print("Usuarios con contraseñas no hasheads insertados exitosamente.")

    @app.cli.command("hash-passwords")
    def hash_passwords():
        """Actualiza las contraseñas de los usuarios para que estén hasheadas."""
        users = User.query.all()
        for user in users:
            if not user.password.startswith('$2b$'):  # Verifica si la contraseña ya está hasheada
                hashed_password = generate_password_hash(user.password)
                user.password = hashed_password
                db.session.add(user)
        
        db.session.commit()
        print("Contraseñas de usuarios actualizadas y hasheadas exitosamente.")