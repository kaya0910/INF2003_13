from flask import Flask, request, jsonify, session
from flask_cors import CORS
import json
import random
from pymongo import MongoClient
from flask_pymongo import PyMongo
import mysql.connector
import os
from flask_bcrypt import Bcrypt
from flask_session import Session

app = Flask(__name__)

# ------------------------------------------------- CORS -------------------------------------------------------------------------

CORS(
    app,
    origins=["http://localhost:3000"],
    methods=["POST", "GET", "PUT", "DELETE"],
    supports_credentials=True,
)


# Configure Flask-Session to use the filesystem for session storage
app.config["SESSION_TYPE"] = "filesystem"

app.secret_key = "dsdfsefsdfdsfdsfsdfdsbvgregrhethtdgdg"
Session(app)


# ------------------------------------------------- MongoDB -------------------------------------------------------------------------

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017")
mongodb = client["happydb"]
# collection = db["happiness_survey_data"]


# Add world_data to mongoDB (It will skip if collection already exited)
collection_name = "world_data"
collection_names_list = mongodb.list_collection_names()

if collection_name not in collection_names_list:
    collection = mongodb[collection_name]
    with open("data/world_data.json") as f:
        data = json.load(f)
        collection.insert_many(data)
else:
    print(f"Collection '{collection_name}' already exists. Skipping data insertion.")


# Check if 'surveys' collection already exists
collections = mongodb.list_collection_names()
if "surveys" in collections:
    print("Collection 'surveys' already exists. Skipping collection creation.")
else:
    # Create the 'surveys' collection with a validation schema
    mongodb.create_collection(
        "surveys",
        validator={
            "$jsonSchema": {
                "bsonType": "object",
                "required": [
                    "q1",
                    "q2",
                    "q3",
                    "q4",
                    "q5",
                    "q6",
                    "q7",
                    "q8",
                    "q9",
                    "q10",
                    "rating",
                ],
                "properties": {
                    "q1": {"bsonType": "int", "minimum": 1, "maximum": 5},
                    "q2": {"bsonType": "int", "minimum": 1, "maximum": 5},
                    "q3": {"bsonType": "int", "minimum": 1, "maximum": 5},
                    "q4": {"bsonType": "int", "minimum": 1, "maximum": 5},
                    "q5": {"bsonType": "int", "minimum": 1, "maximum": 5},
                    "q6": {"bsonType": "int", "minimum": 1, "maximum": 5},
                    "q7": {"bsonType": "int", "minimum": 1, "maximum": 5},
                    "q8": {"bsonType": "int", "minimum": 1, "maximum": 5},
                    "q9": {"bsonType": "int", "minimum": 1, "maximum": 5},
                    "q10": {"bsonType": "int", "minimum": 1, "maximum": 5},
                    "rating": {"bsonType": "double", "minimum": 1, "maximum": 5},
                },
            }
        },
    )


# Create a data model for the survey
class SurveyData:
    def __init__(self, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, rating):
        self.q1 = q1
        self.q2 = q2
        self.q3 = q3
        self.q4 = q4
        self.q5 = q5
        self.q6 = q6
        self.q7 = q7
        self.q8 = q8
        self.q9 = q9
        self.q10 = q10
        self.rating = rating


# ------------------------------------------------- MySQL Setup, Session & Bcrypt-------------------------------------------------------------------------

# Brycrpt Password
bcrypt = Bcrypt(app)

# MySQL Connection
db = mysql.connector.connect(
    user="root", host="localhost", password="", database="happydb"
)

# ------------------------------------------------- Sign In, Sign Up & Sign Out  -----------------------------------------------------------------------------------


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
        # cursor.close()
        # db.close()
        return jsonify({"loggedIn": False, "error": "Username already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    cursor.execute(
        "INSERT INTO users (username, password, name) VALUES (%s, %s, %s)",
        (username, hashed_password, name),
    )
    db.commit()

    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    result = cursor.fetchone()

    # Close the database connection
    # cursor.close()
    # db.close()

    # Create key-value session with username
    session["username"] = username

    return (
        jsonify(
            {
                "loggedIn": True,
                "message": "Registration successful",
                "userID": result[0],
                "user": session["username"],
            }
        ),
        200,
    )


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
                    "userID": result[0],
                    "username": session["username"],
                }
            )
        else:
            return jsonify({"loggedIn": False, "message": "Wrong username/Password"})
    else:
        return jsonify({"loggedIn": False, "message": "User doesn't exist"})


@app.route("/signout", methods=["POST"])
def logout():
    # Clear the session data to log out the user
    session.clear()
    return jsonify({"message": "Logged out successfully"})


# --------------------------------------------- Authorization & Authentication -------------------------------------------------------------------------------------


@app.route("/auth/dashboard", methods=["GET"])
def user_dashboard():
    if "username" in session:
        return jsonify({"loggedIn": True, "username": session["username"]})
    else:
        session_data = dict(session)
        return jsonify({"loggedIn": False, "username": session})


# --------------------------------------------- Anonymous Survey Data (MongoDB) -------------------------------------------------------------------------------------
@app.route("/anonymous/survey", methods=["POST"])
def create_anonymous_survey_data():
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

    # Calculate the rating
    rating = (q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10) / 10

    # Create a SurveyData instance with the rating
    survey = SurveyData(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, rating)

    # Save the survey data into the MongoDB collection
    mongodb.surveys.insert_one(survey.__dict__)

    return "Survey data with rating added to MongoDB successfully!"


# --------------------------------------------- User Survey Data (MySQL) -------------------------------------------------------------------------------------


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

    userID = survey_data["userID"]

    rating = (q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10) / 10

    cursor = db.cursor()
    # Execute the INSERT statement to save the survey data
    insert_query = """
        INSERT INTO surveys (Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, rating, userID)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(
        insert_query,
        (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, rating, userID),
    )
    db.commit()

    # Close the database connection
    # cursor.close()
    # db.close()

    return "Survey data saved successfully!", 201


# ------------------------------------------------------ Aggregation - World Data ---------------------------------------------------------------------------------
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


# Top economies
@app.route("/aggregate/top_economies", methods=["GET"])
def get_top_economies():
    pipeline = [
        {"$sort": {"Economy (GDP per Capita)": -1}},
        {"$limit": 5},
        {"$project": {"_id": 0, "Country": 1, "Economy (GDP per Capita)": 1}},
    ]

    # Execute the aggregation query
    result = list(mongodb["world_data"].aggregate(pipeline))

    # Return the data as a JSON response
    return jsonify(result)


# Happiness score for each region
@app.route("/aggregate/average_happiness_by_region", methods=["GET"])
def get_average_happiness_by_region():
    # MongoDB aggregation pipeline
    pipeline = [
        {
            "$group": {
                "_id": "$Region",
                "averageHappinessScore": {"$avg": "$Happiness Score"},
            }
        }
    ]

    # Execute the aggregation query
    result = list(mongodb["world_data"].aggregate(pipeline))

    # Return the data as a JSON response
    return jsonify(result)


# Average trust higher than 7 (also can be used to compare with happiness score maybe?)
@app.route("/aggregate/average_trust", methods=["GET"])
def get_average_trust():
    pipeline = [
        {"$match": {"Happiness Score": {"$gt": 7}}},
        {
            "$group": {
                "_id": None,
                "averageTrust": {"$avg": "$Trust (Government Corruption)"},
            }
        },
    ]

    # Execute the aggregation query
    result = list(mongodb["world_data"].aggregate(pipeline))

    # Return the data as a JSON response
    return jsonify(result)


# Life Expectancy highest and lowest for each region
@app.route("/aggregate/highest_lowest_region", methods=["GET"])
def get_health_data():
    # MongoDB aggregation pipeline
    pipeline = [
        {"$sort": {"Health (Life Expectancy)": -1}},
        {
            "$group": {
                "_id": "$Region",
                "highestHealthCountry": {"$first": "$Country"},
                "highestHealthScore": {"$first": "$Health (Life Expectancy)"},
                "lowestHealthCountry": {"$last": "$Country"},
                "lowestHealthScore": {"$last": "$Health (Life Expectancy)"},
            }
        },
    ]

    # Execute the aggregation query
    result = list(mongodb["world_data"].aggregate(pipeline))

    # Return the data as a JSON response
    return jsonify(result)


# Average health score for each region
@app.route("/aggregate/health_score_region", methods=["GET"])
def aggregate_health_score_region():
    pipeline = [
        {"$sort": {"Health (Life Expectancy)": -1}},
        {
            "$group": {
                "_id": "$Region",
                "highestHealthCountry": {"$first": "$Country"},
                "highestHealthScore": {"$first": "$Health (Life Expectancy)"},
                "lowestHealthCountry": {"$last": "$Country"},
                "lowestHealthScore": {"$last": "$Health (Life Expectancy)"},
            }
        },
    ]
    result = list(mongodb["world_data"].aggregate(pipeline))
    return jsonify(result)


# ------------------------------------------------------ ---------------------------------------------------------------------------------


# ------------------------------------------------------ Junks ---------------------------------------------------------------------------------
def get_random_integer(minimum, maximum):
    return random.randint(minimum, maximum)


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
    app.debug = True
    app.run()
