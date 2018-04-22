import withObserver from '../lib/withObserver';
import { regexes } from '../lib/constants';
import { homePage, dailyPage } from '../lib/pages';

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

export default {
  fn: preventTitleFlash,
  withObserver: false,
  pages: [homePage, dailyPage],
};
