from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
from pymongo import MongoClient
import os
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash


client = MongoClient("mongodb://localhost:27017")
db = client["happiness"]
collection = db["happiness_survey_data"]

app = Flask(__name__)
CORS(app)

# Configure MySQL connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'happydb'

# Initialize MySQL
mysql = MySQL(app)


@app.route("/login", methods=["GET", "POST"])
def login(): 
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    
    # Create a MySQL cursor
    cur = mysql.connection.cursor()

    # Execute a SQL query
    cur.execute("SELECT * FROM users WHERE username = %s", (username,))

    # Fetch one record
    user = cur.fetchone()

    # Close the connection
    cur.close()

    # Check if the user exists
    if user:
        if check_password_hash(user[3], password):
            return jsonify({"message": "Login successful"})
        else:
            return jsonify({"message": "Invalid password"}), 401
    else:
        return jsonify({"message": "Invalid username"}), 401


@app.route("/signup", methods=["GET", "POST"])
def signup():  
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    name = data["name"]

    # Hash the password
    hased_password = generate_password_hash(password)

    # Create a MySQL cursor
    cur = mysql.connection.cursor()

    # Execute a SQL query
    cur.execute("SELECT * FROM users WHERE username = %s", (username,))

    # Fetch one record
    user = cur.fetchone()

    # Check if the user exists
    if user:
        return jsonify({"message": "Username already exists"}), 400
    else:
        print(hased_password)

        # Execute a SQL query
        cur.execute("INSERT INTO users (username, name, password) VALUES (%s, %s, %s)", (username, name, hased_password))

        # Commit the changes
        mysql.connection.commit()

        # Close the connection
        cur.close()

        return jsonify({"message": "Sign Up successfully"})



def get_random_integer(minimum, maximum):
    return random.randint(minimum, maximum)

# save one response per json file to the database
# @app.route("/survey", methods=["POST"])
# def save_survey_data():
#     survey_data = request.get_json()
#
#     # Save survey data to a JSON file
#     with open("data/survey_data.json", "w") as file:
#         json.dump(survey_data, file)
#
#     return jsonify({"message": "Survey data created successfully"})

# save multiple responses per json file to the database
# how to use: open mongoDBcompass, connection: mongodb://localhost:27017
@app.route("/survey", methods=["POST"])
def save_survey_data():
    survey_data = request.get_json()

    # Create a list to store the survey responses
    responses = []

    # Check if the JSON file exists
    if os.path.exists("data/survey_data.json"):
        # Load existing survey responses from the JSON file
        with open("data/survey_data.json", "r") as file:
            responses = json.load(file)

    # Append the new survey response to the list
    responses.append(survey_data)

    # Save survey data to a JSON file
    with open("data/survey_data.json", "w") as file:
        json.dump(responses, file, indent=4)

    return jsonify({"message": "Survey data created successfully"})


@app.route("/users", methods=["GET"])
def get_users():
    with open("data/users.json", "r") as file:
        users = json.load(file)
    return jsonify(users)


@app.route("/users", methods=["POST"])
def create_user():
    user_data = request.get_json()
    user_id = get_random_integer(1, 1000)
    user = {"id": user_id, **user_data}
    print(user)
    return jsonify(user)


@app.route("/users/<int:id>", methods=["PUT"])
def update_user(id):
    user_data = request.get_json()
    print({"id": id, **user_data})
    return jsonify({"message": "User updated successfully"})


@app.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    print(id)
    return jsonify({"message": "User deleted successfully"})


@app.route("/survey", methods=["GET"])
def get_survey_data():
    with open("data/collected_data.json", "r") as file:
        survey_data = json.load(file)
    return jsonify(survey_data)


@app.route("/survey", methods=["POST"])
def create_survey_data():
    survey_data = request.get_json()
    print(survey_data)
    return jsonify({"message": "Survey data created successfully"})


@app.route("/survey", methods=["DELETE"])
def delete_survey_data():
    survey_data = request.get_json()
    print(survey_data)
    return jsonify({"message": "Survey data deleted successfully"})


@app.route("/survey_questions", methods=["GET"])
def get_survey_questions():
    with open("data/survey_questions.json", "r") as file:
        survey_questions = json.load(file)
    return jsonify(survey_questions)


@app.route("/survey_questions", methods=["POST"])
def create_survey_question():
    question_id = get_random_integer(1, 1000)
    question_data = request.get_json()
    print("Creating question -", question_id)
    return jsonify({"message": "Question created successfully"})


@app.route("/survey_questions/<int:id>", methods=["DELETE"])
def delete_survey_question(id):
    print("Deleting question with ID:", id)
    return jsonify({"message": "Question deleted successfully"})


@app.route("/survey_questions/<int:id>", methods=["PUT"])
def update_survey_question(id):
    question_data = request.get_json()
    print("Updating question with ID:", id)
    return jsonify({"message": "Question updated successfully"})


@app.route("/byGDP", methods=["GET"])
def get_happiness_by_gdp():
    with open("data/HS_vs_GDP.json", "r") as file:
        happiness_data = json.load(file)
    sorted_data = sorted(happiness_data, key=lambda x: x["Economy (GDP per Capita)"])
    return jsonify(sorted_data)


@app.route("/byRegion", methods=["GET"])
def get_happiness_by_region():
    with open("data/HPLvlByRegion.json", "r") as file:
        happiness_data = json.load(file)
    return jsonify(happiness_data)


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    print(data)
    return jsonify({"message": "Registration successful"})


@app.route("/editsurvey", methods=["POST"])
def edit_survey():
    data = request.get_json()
    print(data)
    return jsonify({"message": "Survey edited successfully"})


if __name__ == "__main__":
    app.run()


