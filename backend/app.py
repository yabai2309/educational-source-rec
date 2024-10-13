import certifi
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

#Initiate app
app = Flask(__name__)
CORS(app)

#Connect to MongoDB database with the connection string
client = MongoClient(
    "mongodb+srv://hackfest:admin123@educationaldatabase.7ts1s.mongodb.net/?retryWrites=true&w=majority&appName=EducationalDatabase",
    tlsCAFile=certifi.where()
)
db_courses = client['courseDB']
courses_collection = db_courses['courses']

#Retrieve data from React LandingPage and return a string to confirm
@app.route('/api/submit', methods=['POST'])
def handle_input():
    data = request.json
    
    topic =None
    complexity = None
    style = None
    
    if 'input' in data:
        if 'topic' in data:
            topic = data['input']
            print(f"Received topic:{topic}")
        elif 'complexity' in data:
            complexity = data['input']
            print(f"Received complexity:{complexity}")
        elif 'learningStyle' in data:
            style = data['input']
            print(f"Received learning style:{style}") 
        else: 
            return jsonify({'error': 'Invalid data'}), 400  
    
    query = {}
    if topic:
        query['categories'] = topic  # Assuming MongoDB field is 'course_name'
    if complexity:
        query['level'] = complexity  # Assuming MongoDB field is 'complexity_level'
    print(f"The query is :{query}")
    result = courses_collection.find_one(query)
    print(f"The result is: {result}")
    if result:
        # Convert ObjectId to string to make it JSON serializable
        result['_id'] = str(result['_id'])
        return jsonify(result), 200
    else:
        return jsonify({"error": "No matching course found"}), 404

    

if __name__ == '__main__':
    app.run(debug=True)