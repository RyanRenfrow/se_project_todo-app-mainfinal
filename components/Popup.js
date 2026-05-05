class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_visible");
  }

  close() {
    this._popup.classList.remove("popup_visible");
  }
}

export default Popup;
