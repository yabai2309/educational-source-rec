import certifi
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://hackfest:admin123@educationaldatabase.7ts1s.mongodb.net/?retryWrites=true&w=majority&appName=EducationalDatabase",
    tlsCAFile=certifi.where())
db = client['sample_supplies']

@app.route('/api/submit', methods=['POST'])
def handle_input():
    data = request.get_json()
    user_input = data.get('input', '')

    response_message = f"You've entered:{user_input}"
    return jsonify({"message": response_message})

if __name__ == '__main__':
    app.run(debug=True)