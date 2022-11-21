const body = document.querySelector('body')
if (!body) throw new Error('no body? wha?')
body.style.cssText = 'padding: 0px; margin: 0px; box-sizing: border-box; overflow: hidden;'

const image = document.createElement('img')
image.style.cssText = 'width: 100%; height: auto; box-sizing: border-box;'

const changeImage = (width = 0, height = 0) => {
    fetch(`https://picsum.photos/${width}/${height}`)
        .then(response => response.blob())
        .then(buffer => buffer.arrayBuffer())
        .then(img => {
            const bytes = new Uint8Array(img)
            const blob = new Blob([bytes.buffer])


            const reader = new FileReader()
            reader.onload = (event) => {
                if (!event.target) return;
                if (typeof event.target.result !== 'string') return;
                image.src = event.target.result
            }
            reader.readAsDataURL(blob)
            body.appendChild(image)
        })
}
changeImage(window.innerWidth, window.innerHeight)

setInterval(() => changeImage(window.innerWidth, window.innerHeight), 4000);