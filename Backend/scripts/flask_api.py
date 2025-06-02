from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Health check endpoint
@app.route('/health')
def health_check():
    return jsonify({"status": "ok"})

# Add your other API routes here
@app.route('/api/example')
def example():
    return jsonify({"message": "Flask API is working!"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port) 