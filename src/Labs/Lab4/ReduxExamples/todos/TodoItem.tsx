import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
interface Todo {
  id: number;
  title: string;
}

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();
  return (
    <ListGroup>
      <ListGroupItem
        key={todo.id}
        className="d-flex justify-content-between align-items-center"
      >
        {todo.title}
        <div className="ml-auto">
          <Button
            onClick={() => dispatch(setTodo(todo))}
            id="wd-set-todo-click"
            className="ms-2"
          >
            {" "}
            Edit{" "}
          </Button>
          <Button
            className="btn-danger ms-2"
            onClick={() => dispatch(deleteTodo(todo.id))}
            id="wd-delete-todo-click"
          >
            {" "}
            Delete{" "}
          </Button>
        </div>
      </ListGroupItem>
    </ListGroup>
  );
}
