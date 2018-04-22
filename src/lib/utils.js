
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
