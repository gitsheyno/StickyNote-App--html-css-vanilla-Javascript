const button = document.querySelector('.first button')
const container = document.querySelector('.container')
const div = document.querySelector('.first')



class Card {
    constructor(text) {
        this.text = text;

    }
}

class UI {
    static display() {
        const cards = Store.getCard()

        cards.forEach(card => {
            UI.addToList(card)
        })
    }

    static addToList(card) {
        const textArea = document.createElement('textArea')
        textArea.setAttribute('placeholder', 'write Your Text')
        textArea.classList.add('card')
        textArea.innerHTML = card.text
        container.insertBefore(textArea, div)
    }
}


button.addEventListener('click', (e) => {
    const textArea = document.createElement('textArea')
    textArea.setAttribute('placeholder', 'write Your Text')
    textArea.classList.add('card')
    container.insertBefore(textArea, div)
})

class Store {
    static getCard() {
        let cards;
        if (localStorage.getItem('cards') == null) {
            cards = []
        }
        else {
            cards = JSON.parse(localStorage.getItem('cards'))
        }
        return cards
    }

    static saveCard(card) {
        const cards = Store.getCard()

        cards.push(card)

        localStorage.setItem('cards', JSON.stringify(cards))
    }
}


container.addEventListener('click', (e) => {

    if (e.target.classList.contains('card')) {
        let text = e.target.value
        console.log(text)
        if (text == '') {
            console.log('hello')
            e.target.addEventListener('blur', (e) => {
                const card = new Card(e.target.value)
                Store.saveCard(card)
            })
        }
        else {
            e.target.addEventListener('blur', (e) => {
                const lists = Store.getCard()

                lists.forEach((list, index) => {
                    if (list.text == text) {

                        list.text = e.target.value
                    }
                })
                localStorage.setItem('cards', JSON.stringify(lists))
            })
        }

    }
})

document.addEventListener('DOMContentLoaded', UI.display())