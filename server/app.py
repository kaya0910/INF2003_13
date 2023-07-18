from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
import pymongo
from pymongo import MongoClient, InsertOne, DeleteOne, ReplaceOne  #insertMany
from pymongo.errors import BulkWriteError
from bson.objectid import ObjectId

import os
client = MongoClient("mongodb://localhost:27017")
db = client["happiness"]
collection = db["survey_data"]
requesting = []

app = Flask(__name__)
CORS(app)

# check if mongodb database exists
dblist = client.list_database_names()
if "happiness" in dblist:
  print("The database exists.")
else:
    print("The database does not exist.")

collectionlist = db.list_collection_names()
if "survey_data" in collectionlist:
  print("The collection exists.")
else:
    print("The collection does not exist.")


def get_random_integer(minimum, maximum):
    return random.randint(minimum, maximum)

@app.route("/survey", methods=["POST"])
def save_survey_data():
    survey_data = request.get_json()

    # Save survey data to MongoDB
    save_to_mongoDB(survey_data)

    # Check if the JSON file exists
    if os.path.exists("data/survey_data.json"):
        # Load existing survey responses from the JSON file
        with open("data/collected_data.json", "r") as file:
            responses = json.load(file)
    else:
        responses = []

    # Generate the ID for the new survey response
    if responses:
        last_id = responses[-1]["id"]
        survey_id = last_id + 1
    else:
        survey_id = 1

    # Create the survey response dictionary
    response = {
        "id": survey_id,
        "Survey": survey_data["Survey"]
    }

    # Append the new survey response to the list
    responses.append(response)

    # Save survey data to a JSON file
    with open("data/collected_data.json", "w") as file:
        json.dump(responses, file, indent=4)

    print("Data saved successfully.")

    return jsonify({"message": "Survey data created successfully"})


def save_to_mongoDB(survey_data):
    # Generate the ID for the new survey response in MongoDB
    last_id = collection.count_documents({})
    survey_id = last_id + 1

    # Create the survey response document
    response = {
        "_id": survey_id,
        "Survey": survey_data["Survey"]
    }

    # Insert the document into the MongoDB collection
    try:
        result = collection.insert_one(response)
        print("Data saved to MongoDB successfully.")
    except Exception as e:
        print("Error saving data to MongoDB:", str(e))




# Read the survey_data.json file and return the data
# @app.route("/survey_data", methods=["GET"])
# def retrieve_survey_data():
#     # Retrieve survey data from MongoDB
#     survey_data = list(collection.find({}, {"_id": 1, "id": 1, "Survey": 1}))
#
#     return jsonify(survey_data)

@app.route("/survey_data", methods=["GET"])
def retrieve_survey_data():
    # Retrieve survey data from MongoDB
    survey_data = list(collection.find({}, {"_id": 0}))

    return jsonify(survey_data)

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


@app.route("/login", methods=["POST"])
def login():
    user = request.get_json()
    print(user)
    return jsonify({"message": "Login successful"})


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

@app.route("/byCountry", methods=["GET"])
def get_happiness_by_country():
    with open("data/HS_vs_Country.json", "r") as file:
        happiness_data = json.load(file)
    sorted_data = sorted(happiness_data, key=lambda x: x["Country"])
    return jsonify(sorted_data)

@app.route("/byRegion", methods=["GET"])
def get_happiness_by_region():
    with open("data/HPLvlByRegion.json", "r") as file:
        happiness_data = json.load(file)
    return jsonify(happiness_data)

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
    # Convert the question counts into a JSON object
    # question_counts_survey = json.dumps(question_counts, indent=4)
        
    return jsonify(question_counts)


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
    app.run(debug=True)
