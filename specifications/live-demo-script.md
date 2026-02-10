# Live Demo Script: Add `priority` to Todo

## Goal

Add an optional integer `priority` field to todos and propagate it through backend API contracts and generated frontend types.

## Step 1: Update SQLAlchemy model

File: `backend/app/models.py`

Add `priority` to `TodoItem`:

```python
...
priority: Mapped[int | None] = mapped_column(Integer, nullable=True)
```

## Step 2: Update request/response models and endpoint mapping

File: `backend/app/api/endpoints/todos.py`

### 2.1 Update `TodoItemCreate` and `TodoItemResponse`

```python
class TodoItemCreate(BaseModel):
    ...
    priority: int | None = Field(default=None, ge=1, le=5)


class TodoItemResponse(BaseModel):
    ...
    priority: int | None
    ...
```

### 2.2 Update Endpoints

* `get_todos()`
* `create_todo()`
* `mark_todo_done()`

## Step 3: Update tests

File: `backend/app/api/endpoints/test_todos.py`

### 3.1 Extend create test

```python
def test_create_todo() -> None:
    ...
    response = client.post("/api/todos", json={"title": "Test Todo", "priority": 3})
    ...
    assert data["priority"] == 3
    ...
```

### 3.2 Add validation test for priority range

```python
def test_create_todo_invalid_priority() -> None:
    """Test creating a todo with invalid priority."""
    response = client.post("/api/todos", json={"title": "Invalid Priority", "priority": 9})
    assert response.status_code == 422  # noqa: PLR2004
```

## Step 4: Create and apply migration

From `backend/`:

```bash
uv run alembic revision --autogenerate -m "add priority to todo item"
```

Edit generated file in `backend/alembic/versions/` to ensure SQLite batch mode is used.

Expected migration pattern:

```python
def upgrade() -> None:
    with op.batch_alter_table("todo_items", schema=None) as batch_op:
        batch_op.add_column(sa.Column("priority", sa.Integer(), nullable=True))

def downgrade() -> None:
    with op.batch_alter_table("todo_items", schema=None) as batch_op:
        batch_op.drop_column("priority")
```

Recreate local DB and apply migrations:

```bash
rm app.db
uv run alembic upgrade head
```

## Step 5: Run quality gates

From `backend/`:

```bash
uv run ruff check
uv run pyright
uv run pytest
```

## Step 6: Regenerate OpenAPI and frontend TypeScript types

### 6.1 Export OpenAPI spec (from `backend/`)

```bash
uv run python scripts/export_openapi.py
```

### 6.2 Generate TS types (from `frontend/`)

```bash
npm run generate-types
```

## Step 7: Update UI

### 7.1: TypeScript

```ts
...
interface Todo {
  ...
  priority: number | null;
  ...
}

export function TodoPage() {
  ...
  const [newTodoPriority, setNewTodoPriority] = useState(0);
  ...

  const handleAddTodo = async (e: FormEvent) => {
    ...
    try {
      const { data, error: createError } = await client.POST('/api/todos', {
        body: { title: newTodoTitle, priority: newTodoPriority },
      });
      ...
      if (data) {
        ...
        setNewTodoPriority(0);
      }
    }
    ...
  };

  return (
        ...
        <input
          type="number"
          value={newTodoPriority}
          onChange={(e) => setNewTodoPriority(Number(e.target.value))}
          placeholder="Enter a priority (1-5)"
          className={styles.priorityInput}
          disabled={loading}
        />
        ...
                      {todo.title} ({todo.priority})
```

### 7.2: CSS

```css
.priorityInput {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
}
```
