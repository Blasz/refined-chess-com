// import 'babel-polyfill';
import applyMod from '../lib/applyMod';
import { messageTypes } from '../lib/constants';
import * as features from '../features';
import * as fixes from '../fixes';

function main() {
  chrome.runtime.sendMessage({ type: messageTypes.showPage });
  chrome.storage.sync.get(null, (settings) => {
    Object.keys(features).forEach((f) => { applyMod(features[f], settings); });
    Object.keys(fixes).forEach((f) => { applyMod(fixes[f], settings); });
  });
}

main();
