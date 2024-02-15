function currentLocalTime() {
  const timeElement = document.getElementById('time')
  const time = new Date()
  const hours = time.getHours()
  const minutes = time.getMinutes()

  timeElement.innerText = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`
}

currentLocalTime()

setInterval(currentLocalTime, 60000)
