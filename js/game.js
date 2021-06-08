'use strict';
import { Field, itemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

//Builder Pattern
export default class GameBuilder {
  gameDuration(duration) {
    this.gameDuratioin = duration;
    return this;
  }

  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.score = carrotCount;

    this.playButton = document.getElementById('playBtn');
    this.counter = document.querySelector('.counter');
    this.timer = document.querySelector('.timer');
    this.timerText = document.querySelector('.timerText');

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListner(this.onItemClick);
    this.started = false;

    this.timerCounter = {};

    this.playButton.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }

      // Toggle Play Button
      this.togglePlayButton();
    });
  }

  setGameStopListner(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === itemType.carrot) {
      --this.score;
      this.checkCarrotsCount();
      if (this.score === 0) {
        this.stop(Reason.win);
      }
    } else if (item === itemType.bug) {
      this.stop(Reason.lose);
    }
  };

  //게임시작
  start() {
    this.started = true;
    this.score = this.carrotCount;
    //타이머 시작
    this.startTimer();

    //당근, 벌레 포지션
    // initGame();
    this.gameField.init();

    //타이머, 점수 노출
    this.showTimerAndScore();

    //벌레 카운터
    this.checkCarrotsCount();

    sound.playBackground();
  }

  stop(reason) {
    this.started = false;
    this.showPlayButton();
    clearInterval(this.timerCounter);
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  //타이머 시작
  startTimer() {
    this.gameDuration = 10;
    this.updateTimerText(this.gameDuration);

    //Timer Setting
    this.timerCounter = setInterval(() => {
      this.updateTimerText(--this.gameDuration);

      if (this.gameDuration <= 0) {
        if (this.score > 0) {
          this.stop(Reason.lose);
        } else {
          this.stop(Reason.win);
        }
      }
    }, 1000);
  }

  //타이머 표기
  updateTimerText(remainingTime) {
    const min = parseInt(remainingTime / 60);
    const sec = remainingTime % 60;
    this.timerText.innerText = `${min}:${sec}`;
  }

  //play button toggle
  togglePlayButton() {
    if (this.started) {
      this.playButton.classList.add('on');
      this.playButton.innerText = 'STOP';
    } else {
      this.playButton.classList.remove('on');
      this.playButton.innerText = 'Go!';
    }
  }

  //타이머, 점수 노출
  showTimerAndScore() {
    this.counter.style.visibility = 'visible';
    this.timer.style.visibility = 'visible';
  }

  showPlayButton() {
    this.started
      ? (this.playButton.style.visibility = 'visible')
      : (this.playButton.style.visibility = 'hidden');
  }

  //당근갯수 카운터
  checkCarrotsCount() {
    this.counter.textContent = this.score;
  }
}
