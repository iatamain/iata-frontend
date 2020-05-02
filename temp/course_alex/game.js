let canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//INSTRUMENTAL SIDE//
let isIconNameActive_ = false;
let isIconColorActive_ = false;

let mouse = new Image();
let backgroud = new Image();
backgroud.src = './image/Interer/Fon.jpg';
backgroud.onload = () => {
    ctx.drawImage(backgroud,0,0,canvas.width,canvas.height);
}


//Player
let player = {
    imgPlayer : new Image(), //Инициализация изображения персонажа
   
    x: canvas.width / 2.5 ,
    y: canvas.height -500,
    lastX: 50,
    lastY: 50,
    dx: 500,
    dy: 0,
    ddy: 300,
    size: 500,

    speed : 50, //Скорость перемещения
    
    name : '',
    color : '',
    url : '',
}
//MAPS

let maps = {
    map_Spalnia_base: './image/Comnat/Spalnya.png',
    map_Kuhnya: './image/Comnat/Kuhnya.png',
    map_Vanna: './image/Comnat/Vanna.png',
    _Spalnia: true,
    _Kuhnya: false,
    _Vanna: false
}

let interior = {
    apple: './image/Interer/apple.png',
    collander: './image/Interer/Colander.png',
    toilet: './image/Interer/Toilet.png',
    bed: './image/Interer/Bed.png',
    table: './image/Interer/Table.png',
    lamp: './image/Interer/lamp.png'
}


//Mouse pictures
let mousePictures = [
    'null',
    {name: 'Красный' , url: './image/Mause/Mause1.png'},
    {name: 'Оранжевый' , url: './image/Mause/Mause2.png'},
    {name: 'Желтый' , url: './image/Mause/Mause3.png'},
    {name: 'Зеленый' , url: './image/Mause/Mause4.png'},
    {name: 'Голубой' , url: './image/Mause/Mause5.png'},
    {name: 'Синий' , url: './image/Mause/Mause6.png'},
    {name: 'Фиолетовый' , url: './image/Mause/Mause7.png'},
    {name: 'Белый' , url: './image/Mause/Mause8.png'},
    {name: 'Серый' , url: './image/Mause/Mause9.png'},
    {name: 'Бежевый' , url: './image/Mause/Mause10.png'},

]


//KEYS-EVENTS

addEventListener('keydown', (event) => {
    if(event.keyCode == 13 && isIconNameActive_) {   
        isIconNameActive_ = false;   
        player.name = document.querySelector('.inputName').value; 
        chooseColor();
    }
})


//GAME SIDE//

window.onload = () => {
    if(localStorage.length == 0) { //GAME START
        //START ICONS
        let parrentElement = document.querySelector('#icon');

        let chooseName = document.createElement('div');     //CHOOSE NAME ICON
        chooseName.innerHTML = 'Выберите имя вашего мышонка';

        let inputName = document.createElement('input');    //NAME INPUT
        inputName.className = 'inputName';
        inputName.type = 'text';

        parrentElement.className='gameIcons';
        parrentElement.appendChild(chooseName);
        parrentElement.appendChild(inputName);

        isIconNameActive_ = true;

        console.log('local = 0');
    } else {    //GAME CONTINUE
        console.log('local > 0');

        player.name = localStorage.name;
        player.color = localStorage.color;
        player.imgPlayer.src = localStorage.url;

        start();
    }
};


function chooseColor() {
    isIconColorActive_ = true;

    let parrentElement = document.querySelector('.gameIcons');
    parrentElement.innerHTML = '';
    
    let chooseColorText = document.createElement('div')
    chooseColorText.innerHTML = 'Выберите цвет вашего мышонка'
    
    parrentElement.appendChild(chooseColorText);
    
    let selectMenu = document.createElement('select');
    
    for(let i = 1; i < 11; i++) {
        let optionMenu = document.createElement('option')
        optionMenu.text = mousePictures[i].name;
        selectMenu.appendChild(optionMenu);
    }

    parrentElement.appendChild(selectMenu);

    let buttonSelectColor = document.createElement('input');
    buttonSelectColor.type = 'button';
    buttonSelectColor.value = 'Играть!';
    buttonSelectColor.onclick = () => {

        isIconColorActive_ = false;
        player.color = document.querySelector('select').value;

        for(let i = 1; i < 11; i++) {
            if(mousePictures[i].name == player.color){
                player.imgPlayer.src = mousePictures[i].url;
                player.url = mousePictures[i].url;
                break;
            }
        }
        
        setStorage();
        start();

    };

    parrentElement.appendChild(buttonSelectColor);
}

function setStorage() {
    localStorage.setItem('name',player.name);
    localStorage.setItem('color',player.color); 
    localStorage.setItem('url', player.url);  
}


// GAME STARTS

function start() {
    document.querySelector('#icon').remove(); 

    // let photo = document.createElement('img');
    // photo.id = 'photo';
    // photo.src = localStorage.url;
    // let parrent = document.querySelector('body');
    // parrent.appendChild(photo);



    mouse.src = localStorage.url;

    playGame();
}

// ********************* //
function playGame() {
    let last = Date.now();

    var isDown = [];
    document.addEventListener("keydown", (e)=>{
        isDown[e.key.toLowerCase()] = true;
    });
    document.addEventListener("keyup", (e)=>{
        isDown[e.key.toLowerCase()] = false;
    });
    
    function play() {
        let now = Date.now();
        let dt = (now - last)/1000;
        update(dt);
        render();
        requestAnimationFrame(play);
        last = now;
    }
    
    function update(dt){
        player.lastX = player.x;
        player.lastY = player.y;
        if(isDown['a'] || isDown['ф']){
            player.x -= player.dx * dt;
        }
        if(isDown['d'] || isDown['в']){
            player.x += player.dx * dt;
        }
        player.dy += player.ddy * dt;
        if(player.dy > 900){
            player.dy = 900;
        }
    }
    
    function render(){     
       // console.log('Start render');

        // let photo = document.querySelector('#photo');
        let map_now = new Image();

        if(maps._Spalnia) {
            map_now.src = maps.map_Spalnia_base;
            let bed = new Image();
            let table = new Image();
            let lamp = new Image();

            lamp.src = interior.lamp;
            table.src = interior.table;
            bed.src = interior.bed;

            ctx.drawImage(map_now, 0, 0, canvas.width, canvas.height);

            ctx.drawImage(bed, 100 , player.y - 95, 350, 350);
            ctx.drawImage(table, 450 , player.y - 50, 350, 350);
            ctx.drawImage(lamp, 550 , player.y, 150, 150);
        } else if(maps._Vanna) {
            map_now.src = maps.map_Vanna;
            let collander = new Image();
            let toilet = new Image();

            collander.src = interior.collander;
            toilet.src = interior.toilet;

            ctx.drawImage(map_now, 0, 0, canvas.width, canvas.height);

            ctx.drawImage(collander, 100 , player.y - 250, 200, 200);
            ctx.drawImage(toilet, canvas.width - 300 , player.y - 75, 350, 350);
        } else if(maps._Kuhnya) {
            map_now.src = maps.map_Kuhnya;
            let table = new Image();
            let food = new Image();

            table.src = interior.table;
            food.src = interior.apple;

            ctx.drawImage(map_now, 0, 0, canvas.width, canvas.height);

            ctx.drawImage(food, canvas.width - 400 , player.y + 40, 100, 100);
            ctx.drawImage(table, canvas.width - 500 , player.y - 50, 350, 350);

        }

        
        ctx.drawImage(mouse, player.x, player.y, player.size, player.size);



        //console.log('End render');
    }
    play();
}
