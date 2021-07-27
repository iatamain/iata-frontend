//by yazmeyaa
function rand(mn, mx) {
    return Math.floor(mn + Math.random() * (mx - mn + 1));
};
function percent(value, percent) {
    return (value / 100) * percent;
};
function vect(Ax, Bx) {
    return Ax - Bx;
};
function vectLength(a, b) {
    return Math.sqrt(a ** 2 + b ** 2);
};
function arrPop(arr, i) {
    [arr[arr.length - 1], arr[i]] = [arr[i], arr[arr.length - 1]];
    arr.pop();
}
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Tophead



let mouse = {
    x: 0,
    y: 0,
};
const score = {
    points: 0,
    render: function () {
        ctx.fillStyle = 'white';
        ctx.font = '24px Gouranga';
        ctx.fillText(`SCORE IS: ${this.points}.`, canvas.width / 2, percent(canvas.height, 10));
    },

}
const _ENEMIES = [];
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    render: function () {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.stroke();
    },
    update: function (dt) {
        if (keys['KeyA'] && this.x > 11) {
            this.x -= 400 * dt;
        };
        if (keys['KeyD'] && this.x < canvas.width - 11) {
            this.x += 400 * dt;
        }
        if (keys['KeyW'] && this.y > 11) {
            this.y -= 400 * dt;
        }
        if (keys['KeyS'] && this.y < canvas.height - 11) {
            this.y += 400 * dt;
        }
    }
};
let EnemyTimer = 0;
const _BULLETS = [];
let keys = [];
let startGame = false;
let startBullet = false;
let BulletTimer = 0;
let last = Date.now();
let isOver = false;


function restart() {
    isOver = false;
    score.points = 0;
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    play();
    _ENEMIES.splice(0, _ENEMIES.length);
    _BULLETS.splice(0, _BULLETS.length);
}

addEventListener('keydown', function (event) {
    keys[event.code] = true;
    if (keys['KeyR']) {
        restart();
    };
});


addEventListener('keyup', function (event) {
    keys[event.code] = false;
});


addEventListener('pointerdown', function (event) {
    mouse.x = event.layerX;
    mouse.y = event.layerY;
    if (BulletTimer == 0) {
        startBullet = true;
        _BULLETS.push(new Bullet);
    };

});

addEventListener('pointerpressed', function (event) {
    mouse.x = event.layerX;
    mouse.y = event.layerY;
    if (BulletTimer == 0) {
        startBullet = true;
        _BULLETS.push(new Bullet);
    };

});

class Bullet {
    constructor() {
        this.x = player.x;
        this.y = player.y;
        this.vectX = vect(this.x, mouse.x);
        this.vectY = vect(this.y, mouse.y);
        this.vectLength = vectLength(this.vectX, this.vectY);
        this.vectNormalX = this.vectX / this.vectLength;
        this.vectNormalY = this.vectY / this.vectLength;
        this.radius = 2;
    };
    render() {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
    };
    update(dt) {
        this.x -= this.vectNormalX * (dt * 1800);
        this.y -= this.vectNormalY * (dt * 1800);
    };
};

class Enemy {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.x1;
        this.y1;
        this.speed = rand(100, 150);
        this.vectX;
        this.vectY;
        this.vectLength;
        this.radius = 10;
    };

    render() {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    };

    update(dt) {
        this.vectX = vect(this.x, player.x);
        this.vectY = vect(this.y, player.y);
        this.vectLength = vectLength(this.vectX, this.vectY);
        this.x -= (this.speed * dt) * (this.vectX / this.vectLength);
        this.y -= (this.speed * dt) * (this.vectY / this.vectLength);
    };


    randomSpawn(temp) {
        temp = rand(0, 3);
        switch (temp) {
            case 0:
                //LEFT
                this.x = 0;
                this.y = rand(0, canvas.height);
                break;
            case 1:
                //TOP
                this.x = rand(0, canvas.width);
                this.y = 0;
                break;
            case 2:
                //RIGHT
                this.x = canvas.width;
                this.y = rand(0, canvas.height);
                break;
            case 3:
                //BOTTOM
                this.x = rand(0, canvas.width);
                this.y = canvas.height;
                break;
        };

    }
};


function preloader() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '24px Gouranga';
    ctx.fillText('Press "R" to start...', canvas.width / 2, canvas.height / 2);
}

function gameOver() {
    for (i = 0; i < _ENEMIES.length; i++) {
        if (vectLength(vect(player.x, _ENEMIES[i].x), vect(player.y, _ENEMIES[i].y)) <= player.radius + _ENEMIES[i].radius) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            isOver = true;
            console.log(isOver);
        }
    }
}

function clear() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};



function endScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '24px Gouranga';
    ctx.fillText(`Your score is: ${score.points}`, canvas.width / 2, canvas.height / 2);
};

function destroy() {
    for(j = 0; j < _ENEMIES.length; j++){
        for(i = 0; i < _BULLETS.length; i++){
            if (vectLength(vect(_ENEMIES[j].x, _BULLETS[i].x), vect(_ENEMIES[j].y, _BULLETS[i].y)) <= _ENEMIES[j].radius + _BULLETS[i].radius) {
            arrPop(_BULLETS, i);
            arrPop(_ENEMIES, j);
            console.log("WORK");
            break;
            }
        }
    }        
    
}

function timers(delta) {



    if (EnemyTimer >= 0.5 && _ENEMIES.length < 5) {
        _ENEMIES.push(new Enemy);
        EnemyTimer = 0;
        _ENEMIES[_ENEMIES.length - 1].randomSpawn();
    };
    EnemyTimer += delta;

    if (startBullet) {
        BulletTimer += delta;
        if (BulletTimer >= 0.1) {
            BulletTimer = 0;
            startBullet = false;
        };
    };

};

function BGplay() {
    let audio = new Audio('source/sounds/main.mp3');
audio.volume = 0.05;
setTimeout(function () {
    audio.play();
}, 2000);
}

function update(dt) {
    destroy();
    timers(dt);
    for (i = 0; i < _ENEMIES.length; i++) {
        _ENEMIES[i].update(dt);
    };
    player.update(dt);
    for (i = 0; i < _BULLETS.length; i++) {
            _BULLETS[i].update(dt);
            if (_BULLETS[i].x < 0 ||
                _BULLETS[i].x > canvas.width ||
                _BULLETS[i].y < 0 ||
                _BULLETS[i].y > canvas.height) {
                    arrPop(_BULLETS, i);
            };
    };
    gameOver();
};

function render() {
    if(!isOver){
    clear();
    player.render();
    for (i = 0; i < _ENEMIES.length; i++) {
        _ENEMIES[i].render();
    }

    for (i = 0; i < _BULLETS.length; i++) {
        if (_BULLETS[i]) {
            _BULLETS[i].render();
        };
    };

    score.render();
} else{
    endScreen();
}

};

function play() {
    if(!isOver){
    let now = Date.now();
    update((now - last) / 1000);
    render();
    last = now;
    requestAnimationFrame(play);
    }
};

BGplay();
/*
Один кадр:
1. Обновление всех переменных. update();
2. Проверка на попадание пули.
3. Проверка на смерть игрока.
4. Рендер.
*/

/*
Считывание попадание пули:
1.  Циклом проверить расстояние от пули до противника.
2.  Если пуля расстояние от пули до противника меньше или 
равно сумме радиусов, то удалить из массива объект пули
 и противника.
*/