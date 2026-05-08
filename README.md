# HerHealth AI

HerHealth AI is an AI-powered PCOS prediction and women’s health analysis system built using Machine Learning, Flask, and React.js.

The application predicts PCOS risk based on symptoms and provides confidence score, risk analysis, and health recommendations.

## Features

- PCOS prediction using Machine Learning
- Confidence score & risk analysis
- Health recommendations
- Automatic BMI calculation
- Flask backend API
- Responsive React frontend

## Tech Stack

- Python
- Flask
- React.js
- Scikit-learn
- TensorFlow/Keras
- Pandas
- NumPy
- Git & GitHub

## Model Accuracy

85% accuracy using Random Forest Classifier.

## Note

“The confidence score represents the probability estimated by the Random Forest classifier and should not be considered a medical diagnosis.”

## How to Run the Project

First, clone the repository:

git clone https://github.com/Byreddytejaswini/HerHealthAI

cd HerHealthAI

Run the backend server:

cd backend

venv\Scripts\activate

pip install -r requirements.txt

python app.py

The backend will run on:
http://127.0.0.1:5000

Now run the frontend application:

cd frontend

npm install

npm start

The frontend will run on:
http://localhost:3000
