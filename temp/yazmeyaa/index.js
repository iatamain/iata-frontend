// @ts-ignore
import { cards } from './route_projects.js'
const navigationLinks = document.querySelectorAll('.link')
navigationLinks.forEach(link => link.addEventListener('click', handleLinkClick))
const root = document.getElementById('root')

function handleLinkClick(event) {
    event.preventDefault()
    const path = this.getAttribute('href')
    window.location.hash = path
}

window.addEventListener('hashchange', (event) => {
    switch(window.location.hash) {
        case('#projects'): {
            return cards.forEach(card => root?.appendChild(card.container))
        }
    }
})