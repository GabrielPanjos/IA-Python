from http.server import BaseHTTPRequestHandler
import json


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        models = [
            {'id': 'llama-3.3-70b-versatile', 'name': 'Llama 3.3 70B Versatile'},
            {'id': 'llama-3.1-8b-instant',    'name': 'Llama 3.1 8B Instant'},
            {'id': 'llama3-70b-8192',          'name': 'Llama 3 70B'},
            {'id': 'llama3-8b-8192',           'name': 'Llama 3 8B'},
            {'id': 'mixtral-8x7b-32768',       'name': 'Mixtral 8x7B'},
            {'id': 'gemma2-9b-it',             'name': 'Gemma 2 9B'},
        ]
        self._send_json({'models': models})

    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _send_json(self, data, status=200):
        self.send_response(status)
        self._send_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
