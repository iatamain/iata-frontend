const canvas = document.createElement('canvas')
canvas.style.display = 'block'
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let last = Date.now()

const mouse = {
    xPos: 0,
    yPos: 0
}

document.addEventListener('pointermove', event => {
    const { clientX, clientY } = event
    mouse.xPos = clientX
    mouse.yPos = clientY

    console.log(mouse)
})

function getRandomInt(min = 0, max = 1) {
    return Math.floor(min + Math.random() * (max - min + 1))
}

const ctx = canvas.getContext('2d')
if (!ctx) throw new Error('NO CONTEXT')

document.querySelector('body')?.appendChild(canvas)


//* Classes

class Car {
    #coordinates = {
        x: getRandomInt(-2000, 0),
        y: getRandomInt(0, canvas.height)
    }
    #speed
    #color = 'red'
    #width
    #height
    constructor(options = { speed: 10, color: 'red', width: 48, height: 48 }) {
        this.#speed = options.speed
        this.#color = options.color
        this.#width = options.width
        this.#height = options.height
    }

    render() {
        if (!ctx) throw new Error('NO CONTEXT');
        ctx.fillStyle = this.#color
        ctx.fillRect(this.#coordinates.x, this.#coordinates.y, this.#width, this.#height)
    }

    update(dt = 0) {
        this.#coordinates.x += this.#speed * dt
        if (this.#coordinates.x >= canvas.width) {
            this.#coordinates.x = -this.#width
            this.#coordinates.y = getRandomInt(0, canvas.height)
        }
        if (Math.abs(this.#coordinates.y - mouse.yPos) < 100 && Math.abs(this.#coordinates.x - mouse.xPos) < 100) {
            this.#coordinates.y += (this.#coordinates.y < mouse.yPos ? -this.#speed : this.#speed) * dt
            this.#coordinates.x -= 100 * dt
        }
    }
}

//* OBJECTS

const cars = []
const colors = ['#F5B7B1','#FADBD8',  '#F9E79F', '#ABEBC6', '#FBFCFC', '#FADBD8', '#FADBD8']
const darkColors = ['#641E16', '#7D6608', '#145A32', '#626567']

function generateCars(count = 5) {
    const size = getRandomInt(32, 64)
    const options = {
        color: size <= 48 ? darkColors[getRandomInt(0, darkColors.length - 1)] : colors[getRandomInt(0, colors.length - 1)],
        width: size,
        height: size,
        speed: size <= 48 ? getRandomInt(300, 500) : getRandomInt(400, 700)
    }

    if (cars.length < count) {
        cars.push(new Car(options))
    }
}

//* Render items

function drawBackground() {
    if (!ctx) return
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

//* Cars methods

function renderCars() {
    cars.forEach(car => car.render())
}

function updateCars(dt = 10) {
    cars.sort((a, b) => a - b)
    cars.forEach(car => car.update(dt))
}


//* GAME ENGINE

function render() {
    drawBackground()
    renderCars()
}

function update(dt = 0) {
    dt = dt > 2 ? 0.5 : dt
    generateCars(75)
    updateCars(dt)
}

function play() {
    const now = Date.now()
    const dt = (now - last) / 1000
    last = Date.now()
    render()
    update(dt)
    requestAnimationFrame(play)
}

play()