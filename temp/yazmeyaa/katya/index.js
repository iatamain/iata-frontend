const button = document.getElementById('button')
if (button instanceof HTMLButtonElement === false) {
    throw new Error('button is not a button')
}
const text = document.getElementById('text')
const stringToWrite = String('Катюша, я тебя люблю сильно-сильно <3 Ты самая-самая лучшая :3')
let runningIntervalFlag = Boolean(false)

if (!button || !text) {
    throw new Error('Required elements not found')
}

function writeTextWithInterval(
    string = String(''),
    timer = Number(75),
) {
    if (typeof string !== 'string' || !text) throw new Error('Wrong function arguments')
    if (runningIntervalFlag === true) return undefined


    let currentIndex = 0
    const interval = setInterval(() => {
        text.innerHTML += string[currentIndex]
        currentIndex += 1
        if (text.innerHTML.length >= string.length) {
            clearInterval(interval)
            runningIntervalFlag = false
            if (button instanceof HTMLButtonElement) button.disabled = false
        }
    }, timer)
}

function buttonEvent() {
    if (!text) {
        throw new Error('TEXT element is not defined')
    }
    if (!runningIntervalFlag) {
        text.innerHTML = ''
        writeTextWithInterval(stringToWrite, 75)
        runningIntervalFlag = true
    }
    if (button instanceof HTMLButtonElement) {
        button.disabled = runningIntervalFlag
    }
}

button.onclick = buttonEvent
