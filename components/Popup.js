class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  open() {
    if (this._popupElement) {
      this._popupElement.classList.add("popup_visible");
      document.addEventListener("keydown", this._handleEscapeClose);
    }
  }

  close() {
    if (this._popupElement) {
      this._popupElement.classList.remove("popup_visible");
      document.removeEventListener("keydown", this._handleEscapeClose);
    }
  }

  setEventListeners() {
    this.popupCloseBtn.addEventListener("mousedown", (evt) => {
      evt.preventDefault();
      this.close();
    });

    this._popupElement.addEventListener("mousedown", this._handleOverlayClose);
  }
}
export default Popup;
