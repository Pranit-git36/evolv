# api.py
from dataclasses import asdict
from flask import Flask, request, jsonify
from flask_cors import CORS   # ← add this

from mvp2 import translate_error

app = Flask(__name__)
CORS(app)


@app.post("/translate")
def translate():
    """
    Accept JSON payloads of the shape { "error_text": "<raw traceback>" }
    and return a structured explanation.
    """
    data = request.get_json(silent=True) or {}
    raw_text = data.get("error_text", "") or ""

    explanation = translate_error(raw_text)
    return jsonify(asdict(explanation)), 200

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)