export const metadata = {
  title: 'HRIS - User Management',
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/')
  const todos: any = await res.json()
  return todos
}

async function TodoList() {
  const todos = await fetchTodos();
  return <>
  </>
}


export default TodoList;