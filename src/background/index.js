import { messageTypes } from '../lib/constants';

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message && message.type === messageTypes.showPage) {
    chrome.pageAction.show(sender.tab.id);
  }
});
