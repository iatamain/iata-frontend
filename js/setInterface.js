let AVAimg = document.createElement("img");//Создаем и устанавливаем аву
img.setAttribute("src", snsPlayerInf.avatar); 
img.setAttribute("width", "90px"); 
document.querySelector(".portrait-crop").appendChild(img);

let nickName = document.querySelector("#nickName-text").innerHTML = mainPlayerInf.nickName;
let clan = document.querySelector("#clan-text").innerHTML = "Клан: " + mainPlayerInf.clan;
let lvl = document.querySelector("#lvl-text").innerHTML = "Уровень: " + mainPlayerInf.lvl;
let element = document.querySelector("#element").innerHTML = "Стихия: " + mainPlayerInf.element;
