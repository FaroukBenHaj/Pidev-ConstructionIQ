from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Charger le modèle entraîné
model = joblib.load('urgence_model.pkl')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])  # Une seule réclamation à la fois

        prediction = model.predict(df)
        proba = model.predict_proba(df)

        return jsonify({
            'predicted_urgence': prediction[0],
            'probabilities': {str(i): float(prob) for i, prob in enumerate(proba[0])}
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
