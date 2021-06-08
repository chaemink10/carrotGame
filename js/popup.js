'use strict';

export default class PopUp {
  constructor() {
    this.popup = document.querySelector('.starter');
    this.popupBtn = document.querySelector('.starterBtn');
    this.popupText = document.querySelector('.starterText');

    //팝업클릭 : 다시시작
    this.popupBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListner(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popup.classList.add('hide');
  }

  show(text) {
    this.popup.classList.remove('hide');
    this.popupText.innerText = text;
  }
}
