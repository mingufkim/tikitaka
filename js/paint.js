const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const lineWidth = document.querySelector('#line-width')
const colorPicker = document.querySelector('#color-picker')
const colorName = document.querySelector('#color-name')
const coty = Array.from(document.querySelectorAll('.color-of-the-year'))
const fill = document.querySelector('#fill')
const erase = document.querySelector('#erase')
const clear = document.querySelector('#clear')
const file = document.querySelector('#file')
const save = document.querySelector('#save')

canvas.width = 800
canvas.height = 800

ctx.lineWidth = lineWidth.value
ctx.lineCap = 'round'

let painting = false
let filling = false

const startPainting = () => {
  painting = true
  lineWidth.addEventListener('change', function (e) {
    ctx.lineWidth = e.target.value
  })
}

const stopPainting = () => {
  painting = false
  ctx.beginPath()
}

canvas.addEventListener('mousemove', function (e) {
  if (painting) {
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
  }
  ctx.moveTo(e.offsetX, e.offsetY)
})

canvas.addEventListener('mousedown', startPainting)

canvas.addEventListener('mouseup', stopPainting)

canvas.addEventListener('mouseleave', stopPainting)

colorPicker.addEventListener('change', function (e) {
  ctx.strokeStyle = e.target.value
  ctx.fillStyle = e.target.value
  coty.forEach((color) => {
    color.classList.remove('active')
  })
  colorName.innerText = 'Custom'
  colorName.style.color = e.target.value
})

coty.forEach((color) => {
  color.addEventListener('click', function (e) {
    const dataColor = e.target.dataset.color
    ctx.strokeStyle = dataColor
    ctx.fillStyle = dataColor
    colorPicker.value = dataColor
    coty.forEach((color) => {
      color.classList.remove('active')
    })
    e.target.classList.add('active')
    colorName.innerText = e.target.dataset.name
    colorName.style.color = dataColor
  })
})

fill.addEventListener('click', function () {
  if (filling) {
    filling = false
    fill.innerText = '🖌️'
  } else {
    filling = true
    fill.innerText = '🪣'
  }
})

canvas.addEventListener('click', function () {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
})

erase.addEventListener('click', function () {
  ctx.strokeStyle = '#fff'
  filling = false
  fill.innerText = '🖌️'
})

clear.addEventListener('click', function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})

file.addEventListener('change', function (e) {
  const f = e.target.files[0]
  const url = URL.createObjectURL(f)
  const img = new Image()
  img.src = url
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  }
})

canvas.addEventListener('dblclick', function (e) {
  const textPrompt = prompt('Enter your text')
  ctx.font = '2rem system-ui'
  ctx.fillText(textPrompt, e.offsetX, e.offsetY)
})

save.addEventListener('click', function () {
  const url = canvas.toDataURL()
  const a = document.createElement('a')
  a.href = url
  a.download = 'Painting'
  a.click()
})
