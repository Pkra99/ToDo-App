import { useDispatch } from "react-redux"
import { deleteTodo} from "../features/todos/todoSilce"


function TodoItem({todo}) {
  const dispatch = useDispatch()

  return (
    <div className='todo'>
      
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <div>{new Date(todo.timestamp).toLocaleString('en-US')}</div>
      <button onClick={() => dispatch(deleteTodo(todo._id))} className='close'>
        X
      </button>
    </div>
  )
}
export default TodoItem