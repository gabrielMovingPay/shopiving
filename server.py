"""Servidor local da página de produto PS5 Pro.

Abre direto em /ps5-pro com o slug, o código do produto e o SKU na URL.
"""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import os
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = 4173
CANON = (
    "/ps5-pro/console-playstation-5-pro-sony-ssd-2tb-com-controle-sem-fio-dualsense-branco-1000046552"
    "/produto/PRD4691722?skuId=SKU5863657"
)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def _route(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/") or "/"
        if path == "/":
            return "notfound"
        if path == "/ps5-pro":
            return "redirect"
        if parsed.path.startswith("/ps5-pro/"):
            self.path = "/404.html"
        return "file"

    def _redirect(self):
        self.send_response(302)
        self.send_header("Location", CANON)
        self.end_headers()

    def _not_found(self):
        page = os.path.join(ROOT, "index.html")
        with open(page, "rb") as handle:
            data = handle.read()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(data)

    def do_GET(self):
        route = self._route()
        if route == "redirect":
            self._redirect()
            return
        if route == "notfound":
            self._not_found()
            return
        return super().do_GET()

    def do_HEAD(self):
        route = self._route()
        if route == "redirect":
            self._redirect()
            return
        if route == "notfound":
            self._not_found()
            return
        return super().do_HEAD()

    def log_message(self, fmt, *args):
        print("[%s] %s" % (self.log_date_time_string(), fmt % args))


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print("Pagina do produto: http://127.0.0.1:%s%s" % (PORT, CANON))
    server.serve_forever()
