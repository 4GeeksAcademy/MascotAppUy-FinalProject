
import click
import json
from api.models import db, User, Departamento, Localidad, Especie, Raza

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
            new_departamento = Departamento(name=dept["departamentos"])
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
            new_localidad = Localidad(name=loc["localidad"], departamento_id=departamento.id)
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
                print(f"Especie '{especie_nombre}' agregada a la base de datos.")

            # Verificar si la raza ya existe para la especie correspondiente
            especie_id = especies_db[especie_nombre]
            raza_existente = Raza.query.filter_by(name=raza_nombre, especie_id=especie_id).first()
            
            if raza_existente:
                # print(f"Raza '{raza_nombre}' ya existe para la especie '{especie_nombre}'.")
                continue
            # Agregar la nueva raza si no existe
            nueva_raza = Raza(name=raza_nombre, especie_id=especie_id)
            db.session.add(nueva_raza)
            razas_agregadas.add(raza_nombre)

        db.session.commit()
        if razas_agregadas:
            print("Razas agregadas a la base de datos:", ", ".join(razas_agregadas))
        else:
            print("No se agregaron nuevas razas.")
    
        print("Especies y razas verificadas e insertadas si era necesario.")