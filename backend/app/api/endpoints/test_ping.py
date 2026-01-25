from http import HTTPStatus

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

def test_ping() -> None:
    response = client.get("/api/ping")
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {"message": "pong"}
