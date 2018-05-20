import { injectScript } from '../lib/utils';

function dispatchVolumeEvent(volume) {
  if (volume) {
    const event = new CustomEvent('adjustVolume', {
      bubbles: true,
      detail: {
        volume,
      },
    });
    document.documentElement.dispatchEvent(event);
  }
}

function adjustVolume(settings) {
  injectScript('scripts/adjustVolume.js', () => {
    chrome.storage.onChanged.addListener((changes) => {
      const volumeChange = changes['adjust-volume'];
      if (volumeChange && volumeChange.newValue) {
        dispatchVolumeEvent(volumeChange.newValue.value);
      }
    });
    dispatchVolumeEvent(settings && settings.value);
  });
}

export default {
  fn: adjustVolume,
  withObserver: false,
  settings: {
    id: 'adjust-volume',
    name: 'Volume level',
    description: 'Adjust the volume of sounds played on the chessboard',
    type: 'range',
    inputAttrs: {
      min: 0,
      max: 1,
      step: 0.01,
    },
    default: {
      value: '1',
    },
  },
};
