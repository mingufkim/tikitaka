document.querySelector('#app').innerHTML = `
  <div id="container">
    <a class="sign-in" href="sign-in.html">Sign in</a>

    <form id="hello">
      <label for="hello">Hello, what's your name?</label>
      <input required minlength="5" maxlength="20" type="text" />
      <input class="hidden" type="submit" />
    </form>
  </div>
`

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
