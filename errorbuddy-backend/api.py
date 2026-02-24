# api.py
from dataclasses import asdict
from flask import Flask, request, jsonify
from flask_cors import CORS   # ← add this

from mvp2 import translate_error

app = Flask(__name__)
CORS(app)  # ← add this

@app.post("/translate")
def translate():
    raw_text = request.json.get("error_text", "")
    explanation = translate_error(raw_text)
    return jsonify(asdict(explanation))

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)