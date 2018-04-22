// import 'babel-polyfill';
import applyFeature from '../lib/applyFeature';
import { messageTypes } from '../lib/constants';
import colourResult from '../features/colour-result';
import preventTitleFlash from '../features/prevent-title-flash';
import piecePlaceholders from '../features/piece-placeholders';

import chatWindowOverflow from '../fixes/chat-window-overflow';

function main() {
  chrome.runtime.sendMessage({ type: messageTypes.showPage });
  applyFeature(colourResult);
  applyFeature(preventTitleFlash);
  applyFeature(piecePlaceholders);
  chatWindowOverflow();
}

main();
