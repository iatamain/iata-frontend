var fpsCounter = 0
var fps = 0
var onesecond = 0
var lastTime = 0
function frame(){
	let now = performance.now()
	let dt = Math.min(100,now - lastTime)/1000
	onesecond += dt
	if(onesecond>1){
		onesecond -= 1
		fps = fpsCounter
		fpsCounter = 0
    console.log(fps)
	}else{
		fpsCounter++;
	}

	if(dt>0.0001){
		update(dt)
		rm_render()

		lastTime = now
	}
	requestAnimationFrame(frame)
}

function start_game(){
	console.log("Start frame loop.")
	requestAnimationFrame(frame)
}

document.addEventListener("DOMContentLoaded", ()=>{
		console.log("Initial WebGL...")
		let canvas = document.getElementById("viewport")
		rm_initialWebGL(canvas, start_game)
		game_event_listener_init(canvas)
})
