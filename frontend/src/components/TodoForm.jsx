import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addTodo } from "../features/todos/todoSilce"


function TodoForm() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const dispatch  = useDispatch()

  const onSubmit = e => {
    e.preventDefault()
    dispatch(addTodo({ title, description })) // <-- Only pass todo data
    setTitle("")
    setDescription("")
  }
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name='Title' id='title' 
          value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-textarea" type="text" name='description' id='description' 
          value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">Add Todo</button>
        </div>
      </form>
    </section>
  )
}

export default TodoForm