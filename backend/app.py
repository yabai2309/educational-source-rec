import certifi
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

#Initiate app
app = Flask(__name__)
CORS(app)

#Connect to MongoDB database with the connection string
client = MongoClient("mongodb+srv://hackfest:admin123@educationaldatabase.7ts1s.mongodb.net/?retryWrites=true&w=majority&appName=EducationalDatabase",
    tlsCAFile=certifi.where())
db = client['sample_supplies']

#Retrieve data from React LandingPage and return a string to confirm
@app.route('/api/submit', methods=['POST'])
def handle_input():
    data = request.json
    
    if 'input' in data:
        if 'topic' in data:
            topic = data['input']
            print(f"Received topic:{topic}")
        elif 'complexity' in data:
            complexity = data['input']
            print(f"Received topic:{complexity}")
        elif 'learningStyle' in data:
            style = data['input']
            print(f"Received topic:{style}")    

    return jsonify({'error': 'Invalid data'}), 400

if __name__ == '__main__':
    app.run(debug=True)