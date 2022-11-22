export class Section {
    constructor(containerSelector, renderer){
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    addItem(element){
        this._container.prepend(element)
    }

    renderItem(card){
        this._renderer(card)
    }
}