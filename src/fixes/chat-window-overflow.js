import { injectGlobal } from '../lib/utils';

export default function chatWindowOverflow() {
  const horizontalMenuHeight = '44px';
  injectGlobal(`
    @media only screen and (min-width: 700px) {
      /* Fix chat window overflowing viewport */
      .live-app {
        height: calc(100% - ${horizontalMenuHeight});
      }
    }
  `);
}
