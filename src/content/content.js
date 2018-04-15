// import 'babel-polyfill';
import withObserver from '../lib/withObserver';

const classes = {
  placeholder: 'refined-chess-placeholder',
};

const selectors = {
  usernames: '#sidebar .username',
  gameResult: '.game-info-item[ng-bind="vm.model.game.result_message"]',
  playerDetails: '.about-player',
  chessboard: '.chess_viewer',
  placeholder: `.${classes.placeholder}`,
};

const regexes = {
  gameUrl: /www.chess.com\/(live|daily)\/game\/\d+/,
  homeUrl: /www.chess.com$/,
  dailyHomeUrl: /www.chess.com\/daily$/,
  winner: /(.*) won /,
  yourMove: /^(YOUR MOVE)|(_{3,})/,
};

/** Colours the player divs of past live/daily games according to whether they won or lost. */
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

function onTitleChange(origTitle, { records, observer }) {
  const titleEl = document.querySelector('title');
  observer.observe(titleEl, { childList: true, characterData: true, subtree: true });

  if (records.length > 0) {
    const currentTitle = records[0].type === 'childList' ? records[0].target.innerText : records[0].target.nodeValue;
    if (regexes.yourMove.test(currentTitle)) {
      titleEl.innerText = origTitle;
    }
  }
}

/** Prevents the title from flashing when it's your move in a daily game. */
function preventTitleFlash() {
  const origTitle = document.querySelector('title').innerText;

  withObserver(onTitleChange, origTitle);
}

function piecePlaceholders({ records, observer }) {
  const chessboard = document.querySelector(selectors.chessboard);
  const dragging = 'chess_com_dragging';
  if (!chessboard) {
    observer.disconnect();
    return;
  }
  observer.observe(chessboard, { subtree: true, attributes: true, attributeOldValue: true,  attributeFilter: ['class'] });

  if (records.length > 0) {
    records.forEach((record) => {
      const node = record.target;
      if (node.classList.contains(dragging)) {
        const placeholderNode = node.cloneNode();
        placeholderNode.classList.add(classes.placeholder);
        placeholderNode.style.opacity = 0.3;
        // Insert placeholder after original piece
        node.parentNode.insertBefore(placeholderNode, node.nextSibling);
      } else if (typeof record.oldValue === 'string' && record.oldValue.indexOf(dragging) >= 0) {
        const placeholderNode = record.target.parentNode.querySelector(selectors.placeholder);

        if (placeholderNode) {
          placeholderNode.remove();
        }
      }
    });
  }
}

function main() {
  if (regexes.gameUrl.test(window.location.href)) {
    withObserver(colourResult);
  }
  if (regexes.homeUrl.test(window.location.href) ||
      regexes.dailyHomeUrl.test(window.location.href)) {
    preventTitleFlash();
  }
  withObserver(piecePlaceholders);
}

main();
