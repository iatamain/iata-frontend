//const insertContent = '<div> <span> Место #1 </span> <button class="button-submit" value="Забронировать"> Забронировать </button> </div>'

window.onload = () => {
    for(let i = 1; i <= 30; i++) {
        let root = document.querySelector('.content-0');

        let insertContent = document.createElement('div');
        
        let position = document.createElement('span');
        position.id = "pos"
        position.innerText = "Место #" + i;

        insertContent.appendChild(position);

        let button = document.createElement('button');
        button.className = "button-submit"
        button.value = i;
        button.innerText = "Забронировать"

        button.onclick = () => {
            button.parentNode.querySelector('#pos').innerText = "Забронированно";
            button.remove();
        }

        insertContent.appendChild(button);

        root.appendChild(insertContent);
        root.appendChild(document.createElement('br'))
    }

    for(let i = 1; i <= 30; i++) {
        let root = document.querySelector('.content-1');

        let insertContent = document.createElement('div');
        
        let position = document.createElement('span');
        position.id = "pos"
        position.innerText = "Место #" + i;

        insertContent.appendChild(position);

        let button = document.createElement('button');
        button.className = "button-submit"
        button.value = i;
        button.innerText = "Забронировать"

        button.onclick = () => {
            button.parentNode.querySelector('#pos').innerText = "Забронированно";
            button.remove();
        }

        insertContent.appendChild(button);

        root.appendChild(insertContent);
        root.appendChild(document.createElement('br'))
    }

    for(let i = 1; i <= 30; i++) {
        let root = document.querySelector('.content-2');

        let insertContent = document.createElement('div');
        
        let position = document.createElement('span');
        position.id = "pos"
        position.innerText = "Место #" + i;

        insertContent.appendChild(position);

        let button = document.createElement('button');
        button.className = "button-submit"
        button.value = i;
        button.innerText = "Забронировать"

        button.onclick = () => {
            button.parentNode.querySelector('#pos').innerText = "Забронированно";
            button.remove();
        }

        insertContent.appendChild(button);

        root.appendChild(insertContent);
        root.appendChild(document.createElement('br'))
    }

    for(let i = 1; i <= 30; i++) {
        let root = document.querySelector('.content-3');

        let insertContent = document.createElement('div');
        
        let position = document.createElement('span');
        position.id = "pos"
        position.innerText = "Место #" + i;

        insertContent.appendChild(position);

        let button = document.createElement('button');
        button.className = "button-submit"
        button.value = i;
        button.innerText = "Забронировать"

        button.onclick = () => {
            button.parentNode.querySelector('#pos').innerText = "Забронированно";
            button.remove();
        }

        insertContent.appendChild(button);

        root.appendChild(insertContent);
        root.appendChild(document.createElement('br'))
    }
}

function buttonReserved() {
    
}