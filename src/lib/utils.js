
// eslint-disable-next-line import/prefer-default-export
export function injectGlobal(css, appendtoBody = true) {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  if (appendtoBody) {
    document.body.appendChild(style);
  } else {
    document.head.appendChild(style);
  }
}

export function injectScript(scriptName, onload) {
  const script = document.createElement('script');
  script.src = chrome.extension.getURL(scriptName);
  // eslint-disable-next-line func-names
  script.onload = function () {
    this.parentNode.removeChild(this);
    if (typeof onload === 'function') {
      onload.call(this);
    }
  };
  document.body.appendChild(script);
}
