from __future__ import annotations

import json
import logging
import sys
from pathlib import Path

# Add the backend directory to the Python path so we can import app
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.main import app

logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)


def main() -> None:
    schema = app.openapi()
    out = Path(__file__).resolve().parents[2] / "frontend" / "openapi.json"  # frontend/openapi.json
    out.write_text(json.dumps(schema, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    logger.info("Wrote %s", out)


if __name__ == "__main__":
    main()
