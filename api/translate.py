"""
Vercel serverless function: POST /api/translate
Uses the same translate_error logic as errorbuddy-backend (mvp2).
"""
import json
import os
import sys
from dataclasses import asdict
from http.server import BaseHTTPRequestHandler

# Allow importing mvp2 from errorbuddy-backend (project root is CWD on Vercel)
_backend_dir = os.path.join(os.path.dirname(__file__), "..", "errorbuddy-backend")
sys.path.insert(0, os.path.abspath(_backend_dir))

from mvp2 import translate_error


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors()
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length) if content_length else b""
            data = json.loads(body.decode("utf-8")) if body else {}
            raw_text = (data.get("error_text") or "").strip()
        except (json.JSONDecodeError, ValueError) as e:
            self.send_response(400)
            self._send_cors()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(
                json.dumps({"error": "Invalid JSON or missing error_text"}).encode("utf-8")
            )
            return

        explanation = translate_error(raw_text)
        payload = json.dumps(asdict(explanation), ensure_ascii=False)

        self.send_response(200)
        self._send_cors()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(payload.encode("utf-8"))

    def _send_cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
