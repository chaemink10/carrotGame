import PopUp from './popup.js';
import GameBuilder, { Reason } from './game.js';
import * as sound from './sound.js';

//팝업 Class
const gameFinishPopUp = new PopUp();
const game = new GameBuilder()
  .gameDuration(5)
  .carrotCount(3)
  .bugCount(3)
  .build();

game.setGameStopListner((reason) => {
  let message;
  switch (reason) {
    case Reason.lose:
      message = 'You Lost 🤭';
      sound.playBug();
      break;
    case Reason.win:
      message = 'You Won 🎉';
      sound.playWin();
      break;
    case Reason.cancel:
      message = 'Replay❓';
      sound.playAlert();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishPopUp.show(message);
});

gameFinishPopUp.setClickListner(() => {
  game.start();
  game.showPlayButton();
});
