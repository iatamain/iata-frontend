/*
Procedural library for rendering with ray marching
*/
const SHADER_PATH = "shaders/"
const SCREEN_COORDS = new Float32Array([
  -1,-1,
  -1,1,
  1,-1,
  1,1
])

const SHADER_PROGRAMS = {
  "main": undefined,
}

//low functions
function rm_compileShader(vertexShaderSource,fragmentShaderSource){
  function createShader( type, source){
		let shader = gl.createShader(type)
		gl.shaderSource(shader, source)
		gl.compileShader(shader)
		let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
		if(success){
			return shader
		}
		console.log(gl.getShaderInfoLog(shader))
    console.log(source)
		gl.deleteShader(shader)
	}

	function createProgram( vertexShader, fragmentShader){
		let program = gl.createProgram()
		gl.attachShader(program, vertexShader)
		gl.attachShader(program, fragmentShader)
		gl.linkProgram(program)
		let success = gl.getProgramParameter(program, gl.LINK_STATUS)
		if(success){
			return program
		}
		console.log(gl.getProgramInfo)

	}

	let vertexShader = createShader( gl.VERTEX_SHADER, vertexShaderSource)
	let fragmentShader = createShader( gl.FRAGMENT_SHADER, fragmentShaderSource)

  if(vertexShader==undefined || fragmentShader==undefined){
    console.log(vertexShaderSource)
    console.log(fragmentShaderSource)
  }
	let program = createProgram( vertexShader, fragmentShader)
  if(program==undefined){
    console.log(vertexShaderSource)
    console.log(fragmentShaderSource)
  }
	return program
}

function rm_getShaderTo(name,shaderClass = undefined){
    if(!shaderClass)shaderClass = name
    let urlVert = SHADER_PATH + name+".vert"
    let urlFrag = SHADER_PATH + name+".frag"

    return loadTextResources(urlVert)
    .then(function(result){
        vertexShaderSource = result
        return loadTextResources(urlFrag)
    })
    .then(function(result){
        let fragmentShaderSource = result
        console.log("Resources shader(",name,") downloaded. Compiling...")
        SHADER_PROGRAMS[shaderClass] = rm_compileShader(vertexShaderSource,fragmentShaderSource)
        console.log("Resources shader(",name,") compiled successfull.")
        return true
    })
    .catch(function(error){
      console.log("Error on downloading resources shader(",name,"):"+error)
    })
}

function rm_getAllShader(){
  let promise = new Promise((resolve, reject)=>{resolve()})
  for(let key in SHADER_PROGRAMS){
      promise = promise.then((result)=>{
        return rm_getShaderTo(key)
      })
  }
  return promise
}



function rm_initialWebGL(then_function){
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
	gl.clearColor(0.2 , 0.2, 0.2, 1)
	gl.enable(gl.DEPTH_TEST)

  rm_getAllShader.then(then_function())
}

function rm_render(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    let shader_programm = SHADER_PROGRAMS["main"]

    //const u_camera_matrix_loc = gl.getUniformLocation(shader_programm,"u_cameraMatrix")
    const a_position_loc = gl.getAttribLocation( shader_programm, "a_position")
    const positionsBuffer = gl.createBuffer()


    gl.useProgram(shader_programm)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, SCREEN_COORDS, gl.STREAM_DRAW)

    gl.enableVertexAttribArray(a_position_loc)
    gl.vertexAttribPointer(
      a_position_loc, 2,
      gl.FLOAT, false, 0, 0
    )

    //gl.uniformMatrix4fv(u_camera_matrix_loc, false, CAMERA_MATRIX.getLow())
    gl.drawArrays(primitive, 0, vertexArray.length/3)
    gl.deleteBuffer(positionsBuffer)
}
