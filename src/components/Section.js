export class Section {
    constructor(containerSelector, renderer){
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    addItem(cardElement){
        this._container.append(cardElement)
    }

    renderItem(card){
        this._renderer(card)
    }
}