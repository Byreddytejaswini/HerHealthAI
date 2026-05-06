import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pickle

# Load dataset
df = pd.read_csv("../dataset/PCOS_data.csv")

# Remove unnecessary columns
df = df.drop(columns=["Sl. No", "Patient File No."])

# Replace '.' with NaN
df = df.replace(".", pd.NA)

# Convert all columns to numeric
df = df.apply(pd.to_numeric, errors='coerce')

# Fill missing values with column mean
df = df.fillna(df.mean())

# Features and target
X = df.drop("PCOS (Y/N)", axis=1)
y = df["PCOS (Y/N)"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier()

model.fit(X_train, y_train)

# Prediction
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print("Model Accuracy:", accuracy)

# Save model
pickle.dump(model, open("../models/model.pkl", "wb"))

print("Model saved successfully!")