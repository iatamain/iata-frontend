const canvas = document.getElementById('canvas')
const snowFlakesCountValue = document.getElementById('snowFlakesCountPicker')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const mouse = {
    XPos: 0,
    YPos: 0,
}

window.addEventListener('pointermove', (event)=>{
    mouse.XPos = event.clientX
    mouse.YPos = event.clientY
})

function randomInt(min, max){
    return Math.floor(min + Math.random() * (max - min + 1));
}

class snowFlake{
    constructor(x, y, size, speed, xOffset, sizeBorder){
        this.xPos = x,
        this.yPos = y,
        this.size = size,
        this.speed = speed,
        this.xOffset = xOffset,
        this.sizeBorder = sizeBorder
    }

    render(){
        ctx.fillStyle = this.size <= this.sizeBorder ? 'gray' : 'white'
        ctx.strokeStyle = 'black'
        ctx.beginPath()
        ctx.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI, false)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
    }
    update(dt){
        this.yPos += this.size <= this.sizeBorder ? ( this.speed * dt ) * .5 : this.speed * dt 
        this.xPos += ( ( ( ( canvas.width / 2 )- mouse.XPos ) * dt ) * .4 ) + this.xOffset * dt
        if(this.yPos > canvas.height + 500){
            this.yPos = 0
            this.xPos = randomInt(-600, canvas.width + 600)
            this.speed = randomInt(180,240)
            this.size = randomInt(2,6)
        }
    }
}

const snowFlakes = new Array()

function drawBackground(){
    ctx.fillStyle = '#09172e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function snowFlakeGenerator(SFCount){

        while(snowFlakes.length < SFCount){
            snowFlakes.push(new snowFlake(
                x = randomInt(-600, canvas.width + 600),
                y = randomInt(-600, canvas.height + 600),
                size = randomInt(2,6),
                speed = randomInt(180,240),
                xOffset = randomInt(-20, 20),
                sizeBorder = 3
            ))
        }

        while(snowFlakes.length > SFCount){
            snowFlakes.pop()
        }

        snowFlakes.sort((a, b) => {
            if(a.size > b.size){
                return 1
            }
            if(a.size < b.size){
                return -1
            }
            return 0
        })
}

function timeUntilNewYear(){
    const NewYear2022 = new Date(2022, 0, 1)
    ctx.textAlign = "center"
    ctx.font = `${( (canvas.width - 320) / (1280 - 320) * (38 - 18) + 18 )}px Verdana`
    ctx.fillStyle = 'white'
    let now = new Date
    ctx.fillText(`До нового года осталось:`, canvas.width / 2, canvas.height / 2)
    ctx.font = `${( (canvas.width - 320) / (1280 - 320) * (38 - 20) + 20 )}px Verdana`
    ctx.fillText(`${ Math.floor( ( NewYear2022 - Date.now() ) / 1000 / 60 / 60 / 24 ) } д, ${ 23 - now.getHours() } ч., ${60 - now.getMinutes()} мин., ${ 60 - now.getSeconds()} сек.`, canvas.width / 2, (canvas.height / 2) + 60)
    ctx.stroke()
}

function update(dt){
    snowFlakeGenerator(snowFlakesCountValue.value)
    snowFlakes.map((item)=>{
        item.update(dt)
    })
}

function render(){
    drawBackground()
    snowFlakes.map((item)=>{
        item.render()
    })
    timeUntilNewYear()
}

let last = Date.now()
function play(){
    let now = Date.now()
    update( (now - last) / 1000 )
    render()
    requestAnimationFrame(play)
    last = now 
}
play()