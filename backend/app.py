import certifi
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://hackfest:admin123@educationaldatabase.7ts1s.mongodb.net/?retryWrites=true&w=majority&appName=EducationalDatabase",
    tlsCAFile=certifi.where())
db = client['sample_supplies']

@app.route('/')
def home():
    db.test_collection.insert_one({"message": "Hello, MongoDB!"})
    return "Data inserted into MongoDB!"

if __name__ == '__main__':
    app.run(debug=True)