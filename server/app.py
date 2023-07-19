from flask import Flask, request, jsonify, session
from flask_cors import CORS
import json
import random
from pymongo import MongoClient
import mysql.connector
import os
from flask_bcrypt import Bcrypt
from flask_session import Session

app = Flask(__name__)

sess = Session()

# ------------------------------------------------- CORS -------------------------------------------------------------------------
CORS(
    app,
    origins=["http://localhost:3000"],
    methods=["POST", "GET"],
    supports_credentials=True,
)

# ------------------------------------------------- MongoDB -------------------------------------------------------------------------

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017")
db = client["happydb"]
# collection = db["happiness_survey_data"]


# Add world_data to mongoDB (It will skip if collection already exited)

collection_name = "world_data"
collection_names_list = db.list_collection_names()


if collection_name not in collection_names_list:
    collection = db[collection_name]
    with open("data/world_data.json") as f:
        data = json.load(f)
        collection.insert_many(data)
else:
    print(f"Collection '{collection_name}' already exists. Skipping data insertion.")


# ------------------------------------------------- MySQL Setup, Session & Bcrypt-------------------------------------------------------------------------
server_session = Session(app)

# Brycrpt Password
bcrypt = Bcrypt(app)

# MySQL Connection
db = mysql.connector.connect(
    user="zaw", host="localhost", password="pw", database="happydb"
)

# ------------------------------------------------- Sign In & Sign Up  -----------------------------------------------------------------------------------


@app.route("/signup", methods=["POST"])
def register():
    username = request.json["username"]
    password = request.json["password"]
    name = request.json["name"]

    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        # Close the database connection
        cursor.close()
        db.close()
        return jsonify({"loggedIn": False, "error": "Username already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    cursor.execute(
        "INSERT INTO users (username, password, name) VALUES (%s, %s, %s)",
        (username, hashed_password, name),
    )
    db.commit()

    # Close the database connection
    # cursor.close()
    # db.close()

    return jsonify({"loggedIn": True, "message": "Registration successful"}), 200


@app.route("/signin", methods=["POST"])
def login_post():
    username = request.json["username"]
    password = request.json["password"]

    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    result = cursor.fetchone()

    if result:
        if bcrypt.check_password_hash(result[2], password):
            # Create key-value session with username
            session["username"] = username

            return jsonify(
                {
                    "loggedIn": True,
                    "message": "/signin",
                    "username": session["username"],
                }
            )
        else:
            return jsonify(
                {"loggedIn": False, "message": "Wrong username/password combination!"}
            )
    else:
        return jsonify({"loggedIn": False, "message": "User doesn't exist"})


# --------------------------------------------- Authorization & Authentication -------------------------------------------------------------------------------------


@app.route("/auth/dashboard", methods=["GET"])
def user_dashboard():
    if "username" in session:
        return jsonify({"loggedIn": True, "result": session["username"]})
    else:
        session_data = dict(session)
        print(session_data)
        return jsonify({"loggedIn": False, "session": session_data})


# --------------------------------------------- Survey Data -------------------------------------------------------------------------------------


@app.route("/survey", methods=["POST"])
def create_survey_data():
    # Parse data from the POST request
    survey_data = request.json
    q1 = survey_data["Q1"]
    q2 = survey_data["Q2"]
    q3 = survey_data["Q3"]
    q4 = survey_data["Q4"]
    q5 = survey_data["Q5"]
    q6 = survey_data["Q6"]
    q7 = survey_data["Q7"]
    q8 = survey_data["Q8"]
    q9 = survey_data["Q9"]
    q10 = survey_data["Q10"]

    survey_id = survey_data["survey_id"]
    userID = survey_data["userID"]

    rating = (q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10) / 10

    cursor = db.cursor()
    # Execute the INSERT statement to save the survey data
    insert_query = """
        INSERT INTO surveys (Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, rating, survey_id, userID)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(
        insert_query,
        (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, rating, survey_id, userID),
    )
    db.commit()

    # Close the database connection
    cursor.close()
    db.close()

    return "Survey data saved successfully!", 201


# ------------------------------------------------------ Aggregation ---------------------------------------------------------------------------------
@app.route("/byData", methods=["GET"])
def get_happiness_by_data():
    with open("data/collected_data.json", "r") as file:
        surveys = json.load(file)
        question_counts = {}
        for survey in surveys:
            survey_data = survey["Survey"]
            for question, answer in survey_data.items():
                if question in question_counts:
                    if answer in question_counts[question]:
                        question_counts[question][answer] += 1
                    else:
                        question_counts[question][answer] = 1
                else:
                    question_counts[question] = {answer: 1}
    return jsonify(question_counts)


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


# ------------------------------------------------------ ---------------------------------------------------------------------------------


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


@app.route("/editsurvey", methods=["POST"])
def edit_survey():
    data = request.get_json()
    print(data)
    return jsonify({"message": "Survey edited successfully"})


if __name__ == "__main__":
    app.secret_key = "super secret key"
    app.config["SESSION_TYPE"] = "filesystem"
    sess.init_app(app)
    app.debug = True
    app.run()
