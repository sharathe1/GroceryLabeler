#!/usr/bin/env python3
"""Serve the Stride dashboard for local and workspace preview access."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

HOST = "0.0.0.0"
PORT = 4173


class StrideHandler(SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), StrideHandler)
    print(f"Stride is available on http://localhost:{PORT}", flush=True)
    print(f"Workspace preview is listening on {HOST}:{PORT}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
