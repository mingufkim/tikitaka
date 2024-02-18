document.querySelector('#app').innerHTML = `
  <div id="container">
    <a class="sign-in" href="sign-in.html">Sign in</a>

    <h1 id="clock"></h1>

    <form id="hello">
      <label for="hello">Hello, what's your name?</label>
      <input required minlength="5" maxlength="20" type="text" />
      <input class="hidden" type="submit" />
    </form>
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
