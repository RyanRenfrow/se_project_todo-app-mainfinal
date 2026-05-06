class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.popupcloseBtn = this._popupElement.querySelector(".popup__close");
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleoverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  open() {
    if (this._popupElement) {
      this._popupElement.classList.add("popup_visible");
      document.addEventListener("keydown", this._handleEscapeClose.bind(this));
    }
  }

  close() {
    if (this._popupElement) {
      this._popupElement.classList.remove("popup_visible");
      document.removeEventListener(
        "keydown",
        this._handleEscapeClose.bind(this),
      );
    }
  }

  setEventListeners() {
    this.popupcloseBtn.addEventListener("mousedown", (evt) => {
      evt.preventDefault();
      this.close();
    });
    this._popupElement.addEventListener(
      "mousedown",
      this._handleoverlayClose.bind(this),
    );
  }
}
export default Popup;
