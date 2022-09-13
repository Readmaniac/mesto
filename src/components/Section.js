export class Section {
    constructor(containerSelector, renderer){
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    addItem(cardElement){
        this._container.prepend(cardElement)
    }

    renderItems(cardList){
        cardList.forEach( card => {
            this._renderer(card)
        });
    }
}