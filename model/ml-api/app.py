from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
model = joblib.load('best_random_forest_model.joblib')
CORS(app)
@app.route('/')
def home():
    return 'ML Prediction API is running! Use POST /predict'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])
    prediction = model.predict(df)
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
