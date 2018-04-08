const selectors = {
  usernames: '#sidebar .username',
  gameInfo: '.game-info-item',
  playerDetails: '.about-player',
};

const regexes = {
  gameUrl: /www.chess.com\/live\/\game\/\d+/,
  winner: /(.*) won by /,
};


const gameInfo = document.querySelectorAll(selectors.gameInfo);
const winnerEl = Array.from(gameInfo).find(el => regexes.winner.test(el.innerText));

function colourResult() {
  let winner;
  if (winnerEl) {
    const result = winnerEl.innerText.match(regexes.winner);
    [, winner] = result;
  } else {
    console.log('Could not find winner');
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
