// @ts-ignore
const navigationLinks = document.querySelectorAll('.link')
navigationLinks.forEach(link => link.addEventListener('click', handleLinkClick))
window.location.hash = 'projects'
const root = document.getElementById('root')

function handleLinkClick(event) {
    event.preventDefault()
    const path = this.getAttribute('href')
    window.location.hash = path
}

import('./route_projects.js')
                .then(item => item.cards.forEach(card => root?.appendChild(card.container)))