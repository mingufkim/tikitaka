document.querySelector('#app').innerHTML = `
  <div id="container">
    <a class="sign-in" href="sign-in.html">Sign in</a>

    <h1 id="clock"></h1>

    <form id="hello">
      <label for="username">Hello, what's your name?</label>
      <input required id="username" minlength="5" maxlength="20" type="text" />
    </form>

    <h3 id="advice"></h3>

    <div id="todos">
      <form id="todo">
        <label for="todo-input">Todo</label>
        <input required id="todo-input" type="text"  />
      </form>
      <ul id="todo-list"></ul>
    </div>
  </div>
`

const clock = document.querySelector('#clock')
const time = () => {
  const date = new Date()
  let hours = date.getHours()
  hours = hours > 12 ? hours - 12 : hours
  const minutes = date.getMinutes()
  clock.innerHTML = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`
}

time()
setInterval(time, 1000)

const hello = document.querySelector('#hello')
const helloInput = document.querySelector('#hello input')

const hand = (username) => {
  hello.classList.add('hidden')
  hello.innerHTML = `<h2>🖐🏻 ${username}!</h2>`
}

const submit = (e) => {
  e.preventDefault()
  const username = helloInput.value
  localStorage.setItem('username', username)
  hand(username)
}

const getUsername = localStorage.getItem('username')

if (getUsername === null) {
  hello.classList.remove('hidden')
  hello.addEventListener('submit', submit)
} else {
  hand(getUsername)
}

async function fetchAdvice() {
  const res = await fetch('https://api.adviceslip.com/advice')
  const data = await res.json()
  return data.slip.advice
}

async function advise() {
  const savedAdvice = localStorage.getItem('advice')
  const savedTime = localStorage.getItem('time')

  if (!savedTime || new Date().getTime() - savedTime > 60 * 60 * 1000) {
    const advice = await fetchAdvice()
    document.querySelector('#advice').innerHTML = advice
    localStorage.setItem('advice', advice)
    localStorage.setItem('time', new Date().getTime())
  } else {
    document.querySelector('#advice').innerHTML = savedAdvice
  }
}

advise()

const todoForm = document.querySelector('#todo')
const todoList = document.querySelector('#todo-list')

let todos = []

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const deleteTodo = (e) => {
  const li = e.target.parentElement
  li.remove()
  todos = todos.filter((todo) => todo.id !== parseInt(li.id))
  saveTodos()
}

const completedTodo = (e) => {
  const li = e.target.parentElement
  const span = li.querySelector('span')
  const todo = todos.find((todo) => todo.id === parseInt(li.id))

  if (todo) {
    todo.completed = !todo.completed
    if (todo.completed) {
      span.classList.add('completed')
    } else {
      span.classList.remove('completed')
    }
  }

  saveTodos()
}

const showTodo = (todo) => {
  const li = document.createElement('li')
  li.id = todo.id

  const span = document.createElement('span')
  span.innerText = todo.text
  span.addEventListener('click', completedTodo)

  if (todo.completed) {
    span.classList.add('completed')
  }

  const button = document.createElement('button')
  button.classList.add('delete')
  button.innerText = '🗑️'
  button.addEventListener('click', deleteTodo)

  li.appendChild(span)
  li.appendChild(button)
  todoList.appendChild(li)
}

const addTodo = (e) => {
  e.preventDefault()
  const todo = {
    id: Date.now(),
    text: todoForm[0].value,
    completed: false,
  }
  todoForm[0].value = ''
  todos.push(todo)
  showTodo(todo)
  saveTodos()
}

todoForm.addEventListener('submit', addTodo)

const loadTodos = () => {
  const savedTodos = localStorage.getItem('todos')

  if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos)
    todos = parsedTodos
    parsedTodos.forEach(showTodo)
  }
}

loadTodos()
