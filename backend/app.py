from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Load trained model
model = pickle.load(open("../models/model.pkl", "rb"))

# Home route
@app.route("/")
def home():
    return "HerHealth AI Backend Running Successfully!"

# Prediction route
@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    features = np.array(data["features"]).reshape(1, -1)

    prediction = model.predict(features)

    probability = model.predict_proba(features)

    confidence = round(max(probability[0]) * 100, 2)

    result = int(prediction[0])

    return jsonify({
        "prediction": result,
        "confidence": confidence
    })

# Run app
if __name__ == "__main__":
    app.run(debug=True)