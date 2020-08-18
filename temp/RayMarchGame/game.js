const PRESSED_KEYS = new Int32Array(256)
const ONCE_PRESSED_KEYS = new Set()
//keycodes
const KEY_ESCAPE = 27
const KEY_BACKSPACE = 8
const KEY_TAB = 9
const KEY_SPACE = 32
const KEY_ENTER = 13
const KEY_SHIFT = 16
const KEY_CTRL = 17
const KEY_ALT = 18

const KEY_LEFT = 37
const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_DOWN = 40

const KEY_PLUS = 187
const KEY_EQUAL = 187
const KEY_MINUS = 189

const KEY_A = 65
const KEY_B = 66
const KEY_C = 67
const KEY_D = 68
const KEY_E = 69
const KEY_F = 70
const KEY_G = 71
const KEY_H = 72
const KEY_I = 73
const KEY_J = 74
const KEY_K = 75
const KEY_L = 76
const KEY_M = 77
const KEY_N = 78
const KEY_O = 79
const KEY_P = 80
const KEY_Q = 81
const KEY_R = 82
const KEY_S = 83
const KEY_T = 84
const KEY_U = 85
const KEY_V = 86
const KEY_W = 87
const KEY_X = 88
const KEY_Y = 89
const KEY_Z = 90

const KEY_ZERO = 48
const KEY_ONE = 49
const KEY_TWO = 50
const KEY_THREE = 51
const KEY_FOUR = 52
const KEY_FIVE = 53
const KEY_SIX = 54
const KEY_SEVEN = 55
const KEY_EIGHT = 56
const KEY_NINE = 57

var moveSpeed = 1
var rotateSpeed = 0.005

var mouseIsLock = false
var mouseIsDown = false

function game_event_listener_init(game_window){
    game_window.addEventListener("click",(event)=>{
        game_window.requestPointerLock()
    })
    document.addEventListener("pointerlockchange",(event)=>{
        if(document.pointerLockElement === game_window){
            mouseIsLock = true
        }else{
            mouseIsLock = false
        }
    })
    document.addEventListener("pointerlockerror",(event)=>{
        mouseIsLock = false
        alert("PointerAPI is not aviable in this browser!")
    })
    game_window.addEventListener("mousedown",(event)=>{
        mouseIsDown = true
    })
    game_window.addEventListener("mouseup",(event)=>{
        mouseIsDown = false
    })
    game_window.addEventListener("mousemove",(event)=>{

        if(mouseIsLock){
            let dx = -(event.movementX)*rotateSpeed
            let dy = -(event.movementY)*rotateSpeed
            RM_CAMERA_DIR[0] = RM_CAMERA_DIR[0]*Math.cos(dx) - RM_CAMERA_DIR[2]*Math.sin(dx)
            RM_CAMERA_DIR[2] = RM_CAMERA_DIR[0]*Math.sin(dx) + RM_CAMERA_DIR[2]*Math.cos(dx)

            RM_CAMERA_DIR[1] = RM_CAMERA_DIR[1]*Math.cos(dy) + (1-RM_CAMERA_DIR[1])*Math.sin(dy)
        }

    })
    document.addEventListener('keydown', function(event) {
        PRESSED_KEYS[event.keyCode] = true
        ONCE_PRESSED_KEYS.add(event.keyCode)
    });
    document.addEventListener('keyup', function(event) {
        PRESSED_KEYS[event.keyCode] = false
    });
}

function update(dt){
    if(PRESSED_KEYS[ KEY_W ]){
        RM_CAMERA_POS[0] += RM_CAMERA_DIR[0]*moveSpeed
        RM_CAMERA_POS[2] += RM_CAMERA_DIR[2]*moveSpeed
    }else if(PRESSED_KEYS[ KEY_S ]){
        RM_CAMERA_POS[0] -= RM_CAMERA_DIR[0]*moveSpeed
        RM_CAMERA_POS[2] -= RM_CAMERA_DIR[2]*moveSpeed
    }

    if(PRESSED_KEYS[ KEY_A ]){
        RM_CAMERA_POS[0] += -RM_CAMERA_DIR[2]*moveSpeed
        RM_CAMERA_POS[2] += RM_CAMERA_DIR[0]*moveSpeed
    }
    if(PRESSED_KEYS[ KEY_D ]){
        RM_CAMERA_POS[0] -= -RM_CAMERA_DIR[2]*moveSpeed
        RM_CAMERA_POS[2] -= RM_CAMERA_DIR[0]*moveSpeed
    }

    if(PRESSED_KEYS[KEY_SPACE]){
        RM_CAMERA_POS[1] += moveSpeed
    }else if(PRESSED_KEYS[KEY_SHIFT]){
        RM_CAMERA_POS[1] -= moveSpeed
    }


    if(ONCE_PRESSED_KEYS.has(KEY_ONE)){
        rm_debugMode = 1
        console.log(rm_debugMode)
    }
    if(ONCE_PRESSED_KEYS.has(KEY_TWO)){
        rm_debugMode = 2
        console.log(rm_debugMode)
    }
    if(ONCE_PRESSED_KEYS.has(KEY_THREE)){
        rm_debugMode = 3
        console.log(rm_debugMode)
    }
    if(ONCE_PRESSED_KEYS.has(KEY_ZERO)){
        rm_debugMode = 0
        console.log(rm_debugMode)
    }

    ONCE_PRESSED_KEYS.clear()
}
