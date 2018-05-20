/** Colours the player divs of past live/daily games according to whether they won or lost. */
import { selectors, regexes } from '../lib/constants';
import { gamePage } from '../lib/pages';

function colourResult({ observer }) {
  let winner;

  const gameResult = document.querySelector(selectors.gameResult);
  if (!gameResult) return;

  const result = gameResult.innerText.match(regexes.winner);
  if (result) {
    [, winner] = result;
    observer.disconnect();
  } else {
    observer.observe(gameResult, { subtree: true, childList: true, characterData: true });
    return;
  }

  const userEls = document.querySelectorAll(selectors.usernames);
  const winnerColour = 'rgba(2, 165, 2, 0.20)';
  const loserColour = 'rgba(165, 2, 2, 0.20)';

  userEls.forEach((el) => {
    const username = el.getAttribute('data-username');
    const playerDetailsEl = el.closest(selectors.playerDetails);
    playerDetailsEl.style.backgroundColor = username === winner ? winnerColour : loserColour;
  });
}

export default {
  fn: colourResult,
  withObserver: true,
  pages: [gamePage],
  settings: {
    id: 'colour-result',
    name: 'Colour result',
    description: 'Colour the winner of previous games to make it easier to see the result',
  },
};
