from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for local development

# Updated SNP-to-risk map with slash-separated genotypes
SNP_RISK_MAP = {
    'rs10010131': {'A/G': {'HeartDisease': 15}, 'A/A': {'HeartDisease': 8}},
    'rs10033464': {'T/G': {'Diabetes': 12}, 'T/T': {'Diabetes': 6}},
    'rs1004467': {'A/C': {'Alzheimers': 18}, 'A/A': {'Alzheimers': 9}},
}

@app.route('/')
def home():
    return "Welcome to the Genetic Analysis API"

def parse_genetic_file(file_stream):
    disease_scores = {
        'HeartDisease': 0,
        'Diabetes': 0,
        'Alzheimers': 0
    }
    
    for line in file_stream:
        # Skip comments and empty lines
        if line.startswith(b'#') or line.strip() == b'':
            continue
        
        parts = line.decode('utf-8').strip().split('\t')
        if len(parts) < 5:
            continue
        
        snp_id, _, _, allele1, allele2 = parts
        genotype = f"{allele1}/{allele2}"
        
        if snp_id in SNP_RISK_MAP:
            if genotype in SNP_RISK_MAP[snp_id]:
                for disease, score in SNP_RISK_MAP[snp_id][genotype].items():
                    disease_scores[disease] += score

    # Cap scores at 100%
    for disease in disease_scores:
        disease_scores[disease] = min(100, disease_scores[disease])
    
    return disease_scores

@app.route('/analyze-gene', methods=['POST'])

def analyze_gene():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    print(f"Received file: {file.filename}")  # Debug log
    
    results = parse_genetic_file(file.stream)
    return jsonify(results), 200

import os
import joblib
import numpy as np

# Load the Random Forest model once at startup
MODEL_PATH = os.path.join("model", "random_forest_meal_plan_modell.pkl")
meal_model = joblib.load(MODEL_PATH)
@app.route('/predict-meal', methods=['POST'])
def predict_meal():
    data = request.get_json()
    
    # Check if the input data is provided
    if not data or "input" not in data:
        return jsonify({'error': 'Missing input data'}), 400
    
    try:
        # Convert input data to numpy array for prediction
        input_array = np.array(data["input"]).reshape(1, -1)
        
        # Predict meal plan based on the model
        prediction = meal_model.predict(input_array)[0]  # Assuming the model returns a 1D array with meal recommendations
        
        # Return the prediction as a JSON response
        return jsonify({
            "calories": round(prediction[0]),
            "protein": round(prediction[1]),
            "carbs": round(prediction[2]),
            "fats": round(prediction[3]),
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
