import csv
import random
from faker import Faker

headers = [
           ['userId', 'username', 'password'], # user
           ['surveyId', 'question1', 'question2','question3','question4','question5','question6','question7','question8','question9','question10','rating','userId'] # survey response
]


#Fake customer
# Create a faker object
fake = Faker()

# Define the number of customers to generate
num_of_user = 10

# Generate random username and passwords
username = [fake.user_name() for _ in range(num_of_user)]
password = [fake.password() for _ in range(num_of_user)]

# Generate fake accounts
user_counter = 0
userId = 1
with open('users.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(headers[0])
    for i in range(num_of_user):
        random_user = username[user_counter]
        row = [userId, random_user, password[user_counter]]
        writer.writerow(row)
        user_counter += 1
        userId += 1


# Generate fake survey response 3 surveys per user
surveyId = 1
survey_counter = 0
num_of_surveys_per_user = 3  # Number of surveys per user

with open('survey_response.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(headers[1])

    for i in range(num_of_user):
        for j in range(num_of_surveys_per_user):
            questions = [random.randint(1, 5) for k in
                         range(10)]  # Generate a list of 10 random responses for each question

            average_rating = sum(questions) / len(questions)  # Calculate the average rating for the questions

            row = [surveyId] + questions + [average_rating, i]
            writer.writerow(row)
            survey_counter += 1
            surveyId += 1



