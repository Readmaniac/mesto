export class Api {
    #onResponce(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject({message: 'Ошибка на стороне сервера', res})
    }

    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
    }

// Добавить карточку
    addCard(data){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this.#onResponce)
    }

// Забрать с сервера все карточки
    getAllCards(){
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this.#onResponce)
    }

// Удалить карточку
    removeCard(cardId){
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.#onResponce)
    }

// Забрать с сервера инфо юзера
    getUsersInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
          .then(res => this.#onResponce(res));
      }

// Редактирование информации о пользователе через попап
    editUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: data.name,
            about: data.link
        })
        })
        .then(res => this.#onResponce(res));
    }

// Редактирование информации об аватаре пользователя через попап
    editUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar: data.link
        })
        })
        .then(res => this.#onResponce(res));
    }

// Редактирование постановки лайка
    setLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
        })
        .then(res => this.#onResponce(res));
    }

    removeLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
        })
        .then(res => this.#onResponce(res));
    }
}