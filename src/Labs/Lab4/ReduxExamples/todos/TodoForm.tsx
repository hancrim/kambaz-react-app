import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroup>
      <ListGroupItem className="d-flex">
        <FormControl
          className="ms-2"
          defaultValue={todo.title}
          onChange={(e) =>
            dispatch(setTodo({ ...todo, title: e.target.value }))
          }
        />

        <Button
          onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click"
          className="btn-warning ms-2"
        >
          {" "}
          Update{" "}
        </Button>
        <Button
          onClick={() => dispatch(addTodo(todo))}
          id="wd-add-todo-click"
          className="btn-success ms-2"
        >
          {" "}
          Add{" "}
        </Button>
      </ListGroupItem>
    </ListGroup>
  );
}
