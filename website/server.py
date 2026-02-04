#!/usr/bin/env python3
"""
Simple HTTP server for Kamalyan Consulting website
Serves on port 9999
"""

import http.server
import socketserver
import os
import sys

PORT = 9999
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers for testing
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom log format
        print(f"[{self.log_date_time_string()}] {args[0]}")

def run_server():
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"=" * 50)
        print(f"🌿 Kamalyan Consulting Website Server")
        print(f"=" * 50)
        print(f"Serving at: http://localhost:{PORT}")
        print(f"Directory: {DIRECTORY}")
        print(f"=" * 50)
        print(f"Press Ctrl+C to stop")
        print(f"=" * 50)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nShutting down server...")
            httpd.shutdown()
            sys.exit(0)

if __name__ == "__main__":
    run_server()
