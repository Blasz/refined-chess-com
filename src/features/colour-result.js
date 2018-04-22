/** Colours the player divs of past live/daily games according to whether they won or lost. */
import { selectors, regexes } from '../lib/constants';

export default function colourResult({ observer }) {
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
