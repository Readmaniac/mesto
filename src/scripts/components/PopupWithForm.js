import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.form__input');
    this._submitBtn = this._popupForm.querySelector('.form__submit');
    this._submitBtnText = this._submitBtn.textContent;
  }

  // Получаем данные из формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }

  // Устанавливаем слушатели формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  // Закрытие попапа + сброс инпутов
  close() {
  super.close();
  this._popupForm.reset();
  }

  // Изменяем состояние кнопки во время загрузки
  loading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...'
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
}
