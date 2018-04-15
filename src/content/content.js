// import 'babel-polyfill';

const selectors = {
  usernames: '#sidebar .username',
  gameResult: '.game-info-item[ng-bind="vm.model.game.result_message"]',
  playerDetails: '.about-player',
};

const regexes = {
  gameUrl: /www.chess.com\/(live|daily)\/game\/\d+/,
  winner: /(.*) won /,
};

function colourResult() {
  let winner;

  const observer = new MutationObserver(colourResult);

  const gameResult = document.querySelector(selectors.gameResult);
  if (!gameResult) return;

  const result = gameResult.innerText.match(regexes.winner);
  if (result) {
    [, winner] = result;
    observer.disconnect();
  } else {
    observer.observe(gameResult, { childList: true });
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

function main() {
  if (regexes.gameUrl.test(window.location.href)) {
    colourResult();
  }
}

main();
