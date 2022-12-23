class CardProject {
    name
    description
    previewImage
    href
    container
    nameElement
    imageElement
    descriptionElement

    constructor(options = {
        name: 'default name',
        description: 'description',
        previewImage: 'https://i.picsum.photos/id/4/200/300.jpg',
        href: 'index.html'
    }) {
        this.name = options.name
        this.description = options.description
        this.previewImage = options.previewImage
        this.href = options.href

        this.container = document.createElement('section')  // Добавление тела карточки
        this.container.classList.add('card')

        this.imageElement = document.createElement('picture')   // Добавление изображения в карточку
        this.imageElement.classList.add('card_image')
        const imageSource = document.createElement('img')
        imageSource.srcset = this.previewImage
        fetch(this.previewImage)
            .then(response => response.blob())
            .then(buffer => buffer.arrayBuffer())
            .then(img => {
                const bytes = new Uint8Array(img)
                const blob = new Blob([bytes.buffer])

                const reader = new FileReader()
                reader.onload = (event) => {
                    if (!event.target) return;
                    if (typeof event.target.result !== 'string') return;
                    imageSource.srcset = event.target.result
                }
                reader.readAsDataURL(blob)
                console.log(blob)
            })
        this.imageElement.appendChild(imageSource)
        this.container.appendChild(this.imageElement)

        this.nameElement = document.createElement('h2') // Добавление название карточки
        this.nameElement.classList.add('card_name')
        this.nameElement.innerText = this.name
        this.container.appendChild(this.nameElement)

        this.descriptionElement = document.createElement('small')
        this.descriptionElement.classList.add('card_description')
        this.descriptionElement.innerText = this.description
        this.container.appendChild(this.descriptionElement)

        this.container.addEventListener('click', () => {
            this.buttonOnClick(this.href)
        })
    }

    buttonOnClick(href = '') {
        window.open(href, '_blank')
    }

}

const cards = [
    new CardProject({
        name: 'Скринер',
        description: 'Получение случайных изображений с интервалом',
        href: 'https://itracers.xyz/temp/yazmeyaa/screens/',
        previewImage: 'https://picsum.photos/200'
    }),
    new CardProject({
        name: 'Погода',
        description: 'Получение текущей погоды и прогноза с использованием ReactJS и ExpressJS',
        href: 'https://itracers.xyz/temp/yazmeyaa/weatherapp/',
        previewImage: 'https://picsum.photos/200'
    }),
    new CardProject({
        name: 'Звёзды',
        description: 'Симуляция полёта через звёзды на canvasAPI',
        href: 'https://itracers.xyz/temp/yazmeyaa/stars/',
        previewImage: 'https://picsum.photos/200'
    }),
    new CardProject({
        name: 'Кубики',
        description: 'Летящие кубики, которые избегают курсор',
        href: 'https://itracers.xyz/temp/yazmeyaa/cubes/',
        previewImage: './assets/img/cubes.png'
    }),
    new CardProject({
        name: 'Таймер до Нового года',
        description: 'Небольшая сцена на canvasAPI с отсчётом времени до Нового года',
        href: 'https://itracers.xyz/temp/yazmeyaa/snowflake/',
        previewImage: 'https://picsum.photos/200'
    })
]

export { cards }