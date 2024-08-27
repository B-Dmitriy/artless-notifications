const DEFAULT_LIMIT = 3
const DEFAULT_POSITION = 'bottom-left'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// TODO: options object types
// #instanse = {
//     root: null,
//     container: null,
//     notesLimit: 3,
//     closing: true,
//     defaultTitle: null,
//     hideLatency: null,// ms
//     position: 'bottom-left' // 'bottom-left', 'bottom-center' ...how many?
// }
export class Notificator {
    #instanse = null

    constructor(options) {
        // TODO: options validation
        const { root, position, hideLatency, closing, defaultTitle } = options

        if (this.#instanse) return this.#instanse;

        this.#instanse = {}
        this.#instanse.notesLimit = DEFAULT_LIMIT
        this.#instanse.closing = closing || true
        this.#instanse.defaultTitle = defaultTitle || null
        this.#instanse.root = document.querySelector(root) || document.body
        this.#instanse.position = position || DEFAULT_POSITION
        this.#instanse.hideLatency = hideLatency || null

        const container = document.createElement('div')
        container.classList.add('artless-notificator__container')

        if (root) {
            this.#instanse.root.style.position = 'relative'
        }

        this.#instanse.root.style.position = 'relative'
        this.#instanse.root.appendChild(container)
        this.#instanse.container = container
    }

    pushMessage(type, text, title) {
        const notification = new NotificationNodeCreator(type, text, title || this.#instanse.defaultTitle)

        function closeHandler() {
            notification.classList.add('artless-notificator__hide_left')
            sleep(300).then(() => notification.remove())
        }

        this.#instanse.container.appendChild(notification)

        if (this.#instanse.closing) {
            const closeIcon = document.createElement('button')
            closeIcon.innerText = "X"
            closeIcon.addEventListener('click', closeHandler.bind(this))

            notification.firstChild.appendChild(closeIcon)
        }

        if (this.#instanse.container.children.length > this.#instanse.notesLimit) {
            this.#instanse.container.removeChild(this.#instanse.container.firstChild)
        }

        if (!this.#instanse.hideLatency) return;

        const timeoutID = setTimeout(closeHandler, this.#instanse.hideLatency)
        window.onbeforeunload = () => clearInterval(timeoutID)
    }

    info(text, title) {
        this.pushMessage('info', text, title)
    }

    error(text, title) {
        this.pushMessage('error', text, title)
    }

    warning(text, title) {
        this.pushMessage('warning', text, title)
    }

    success(text, title) {
        this.pushMessage('success', text, title)
    }
}

class NotificationNodeCreator {
    constructor(type, text, title) {
        const notification = document.createElement('div')
        const notificationHeader = document.createElement('header')
        const notificationTitle = document.createElement('h3')
        const notificationText = document.createElement('p')

        notificationHeader.appendChild(notificationTitle)
        notification.appendChild(notificationHeader)
        notification.appendChild(notificationText)

        notificationTitle.innerText = title || 'Artless notificator'
        notificationText.innerText = text

        notification.classList.add('artless-notificator__item', `artless-notificator__${type}-item`)

        return notification
    }
}