import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import TodoForm from "../components/TodoForm"
import TodoItem from "../components/TodoItem"
import Spinner from "../components/Spinner"
import { getTodos, reset } from "../features/todos/todoSilce"



function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {todos, loading} = useSelector((state) => state.todos)
  console.log(todos)
  useEffect(() => {

    if(!user){
      navigate('/login')
    }

    dispatch(getTodos())

    return () => {
      dispatch(reset())
    }
  }, [user,  navigate, dispatch]) 

  if(loading) {
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
      <h1>Welcome, <strong>{user && user.name}!</strong> </h1>
      <p>Todo Dashboard</p>
    </section>

    <TodoForm />

     <section className='content'>
        {todos.length > 0 ? (
          <div className='todos'>
            {todos.map((todo) => (
              <TodoItem todo={todo} />
            ))}
          </div>
        ) : (
          <h3>You have not set any Todo</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard