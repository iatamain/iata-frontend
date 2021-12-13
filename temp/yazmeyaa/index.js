const canvas = document.getElementById('canvas')
const snowFlakesCountValue = document.getElementById('snowFlakesCountPicker')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight


if(typeof document.hidden !== 'undefined'){
    hidden = 'hidden'
    visibilityChange = 'visibilitychange'
} else if (typeof document.msHidden !== 'undefined'){
    hidden = 'msHidden'
    visibilityChange = 'msvisibilitychange'
} else if (typeof document.webkitHidden !== 'undefined'){
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange'
}

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
        dt = Math.min(1, dt)
            this.yPos += this.size <= this.sizeBorder ? ( this.speed * dt ) * .5 : this.speed * dt 
            this.xPos += ( ( ( ( ( canvas.width / 2 ) - mouse.XPos ) * dt ) + this.xOffset * dt) * .4 )
            if(this.yPos > canvas.height + 400){
                this.yPos = randomInt(-400, 0)
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

    function drawCurve(x1, y1, x2, y2, x3, y3){
        let cX, cY, x, y
        for(let t = 0; t < 1; t += 0.01){

            cX =( Math.pow( 1 - t , 2 ) * x1 ) + ( 2 * (1 - t ) * t * x2 ) + (Math.pow(t, 2) * x3)

            cY = ( Math.pow( 1 - t , 2 ) * y1 ) + ( 2 * (1 - t ) * t * y2 ) + (Math.pow(t, 2) * y3) 

            ctx.beginPath()
            ctx.moveTo
            ctx.fillStyle = 'red'
            ctx.fillRect(cX, cY, 5, 5)
        }
    }

    function drawColumns(xStart, size, height, padding){

        for(let xPos = xStart; xPos < canvas.width; xPos += canvas.width * ( padding / 100 ) ){

            ctx.fillStyle = 'black'
            ctx.fillRect(xPos, canvas.height, size, -height )
            
        }
    }

    drawColumns(0, 8, 400, 20)
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
    function calculateNextYear(currentTime){
        let currentYear = new Date(currentTime)
        return new Date(currentYear.getFullYear() + 1, 0, 0 )
    }
    const NewYear2022 = calculateNextYear(Date.now())
    ctx.textAlign = "center"
    ctx.font = `${( (canvas.width - 320) / (1280 - 320) * (48 - 20) + 20 )}px Verdana`
    ctx.fillStyle = 'white'
    let now = new Date(Date.now())
    const gradient = ctx.createLinearGradient(canvas.width  / 2 - 100, canvas.height / 2 - 200, canvas.width / 2 + 200, canvas.height / 2 + 200)
    gradient.addColorStop(0, 'red')
    gradient.addColorStop(0.5, 'green')
    gradient.addColorStop(1, 'red')
    ctx.fillStyle = gradient 
    ctx.fillText('До нового года осталось:', canvas.width / 2, canvas.height / 2)
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