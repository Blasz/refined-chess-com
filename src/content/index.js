// import 'babel-polyfill';
import withObserver from '../lib/withObserver';
import { messageTypes, regexes } from '../lib/constants';
import colourResult from '../features/colour-result';
import preventTitleFlash from '../features/prevent-title-flash';
import piecePlaceholders from '../features/piece-placeholders';

function main() {
  chrome.runtime.sendMessage({ type: messageTypes.showPage });
  if (regexes.gameUrl.test(window.location.href)) {
    withObserver(colourResult);
  }
  if (regexes.homeUrl.test(window.location.href) ||
      regexes.dailyUrl.test(window.location.href)) {
    preventTitleFlash();
  }
  withObserver(piecePlaceholders);
}

main();
