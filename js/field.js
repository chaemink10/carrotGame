'use strict';
import * as sound from './sound.js';

export const itemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.BUG_CLASS_NAME = 'bug';
    this.CARROT_CLASS_NAME = 'carrot';
    this.IMG_SIZE = 60;
    this.field = document.getElementById('zone');
    this.fieldRect = this.field.getBoundingClientRect();

    this.field.addEventListener('click', this.onClick);
  }

  init() {
    //bug, carrot 초기화
    if (this.field.hasChildNodes()) {
      while (this.field.hasChildNodes()) {
        this.field.removeChild(this.field.firstChild);
      }
    }

    this._addItem(this.BUG_CLASS_NAME, this.bugCount, '../img/bug.png');
    this._addItem(
      this.CARROT_CLASS_NAME,
      this.carrotCount,
      '../img/carrot.png'
    );
  }

  _addItem(className, count, imgSource) {
    for (let i = 0; i < count; i++) {
      const imgElement = document.createElement('img');
      imgElement.setAttribute('class', `${className} ${className}_${i}`);
      imgElement.setAttribute('src', imgSource);

      let x = getRandomInt(0, this.fieldRect.width - this.IMG_SIZE);
      let y = getRandomInt(0, this.fieldRect.height - this.IMG_SIZE);

      imgElement.style.transform = `translate(${x}px, ${y}px)`;
      this.field.appendChild(imgElement);
    }
  }

  setClickListner(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(itemType.carrot);
    } else if (target.matches('.bug')) {
      sound.playBug();
      this.onItemClick && this.onItemClick(itemType.bug);
    }
  };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
