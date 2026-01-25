# Coding with AI - Sample Project

## Prerequisites

- Python 3.14
- Node.JS >= LTS
- [uv](https://docs.astral.sh/uv/)

## Installing Dependencies

```bash
cd backend
uv sync
```

```bash
cd frontend
npm install
```

## Testing the Code

```bash
cd backend
uv run ruff check # Linting the code
uv run mypy # Type checking the code
uv run pytest # Running the tests
```

```bash
cd frontend
npm run lint # Linting the code
npm run typecheck # Type checking the code
npm run test # Running the tests
```

## Open API Specification

Generate the Open API specification file:

```bash
cd backend
uv run python scripts/export_openapi.py
```

Generate the API schema types:

```bash
cd frontend
npm run generate-types
```

## Running the Project

To run the project, you must start the backend and the frontend in the background:

```bash
cd backend
uv run uvicorn app.main:app --reload
```

```bash
cd frontend
npm start
```

Note that the frontend (vite) contains a proxy to the backend API (see [`vite.config.ts`](./frontend/vite.config.ts)).
