import { injectGlobal } from '../lib/utils';

function chatWindowOverflow() {
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

export default {
  fn: chatWindowOverflow,
  withObserver: false,
  settings: {
    id: 'chat-window-overflow',
    name: 'Fix chat window overflow',
    description: 'Fix overflowing chat box in live games for screen widths 700 - 960px',
  },
};
