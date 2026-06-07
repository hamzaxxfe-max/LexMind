import json
import logging
import time
import uuid

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger("lexmind")


class RequestLogMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        req_id = str(uuid.uuid4())[:8]
        request.state.req_id = req_id
        method = request.method
        path = request.url.path
        client = request.client.host if request.client else "unknown"
        logger.info(json.dumps({"event": "request", "req_id": req_id, "method": method, "path": path, "client": client}))

        start = time.time()
        response = await call_next(request)
        duration = round((time.time() - start) * 1000)

        logger.info(json.dumps({"event": "response", "req_id": req_id, "status": response.status_code, "ms": duration}))
        response.headers["X-Request-ID"] = req_id
        return response
