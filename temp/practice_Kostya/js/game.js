let createAndAppennd = ({className, parentElement, value}, tag = "div") => {
    let element = document.createElement(tag)
    element.className = className
    if(value) {
        element.innerHTML = value || ""
    }
    parentElement.appendChild(element)

    return element;
}

class Game {
    constructor(parentElement, size = 4) {
        let gameFieldElement = createAndAppennd({
            className: "game",
            parentElement
        })
       
        let headerElement = createAndAppennd({
            className: "header",
            parentElement : gameFieldElement
        });

        this.score = 0;
        headerElement.innerHTML = "Счет " + this.score;

        let fieldElement = createAndAppennd({
            className: "field",
            parentElement: gameFieldElement
        });

        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                let cellElement = createAndAppennd({
                    className: "cell",
                    parentElement: fieldElement
                })
                if(Math.random() > 0.8) {
                    cellElement.innerHTML = Math.random() > 0.5 ? 4 : 2;
                }

            }
        }
    }
}