
import click
import json
from api.models import db, User, Departamento

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