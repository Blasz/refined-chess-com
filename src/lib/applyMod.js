import withObserver from './withObserver';

export default function applyMod(feature, settings) {
  const validPage = typeof feature.pages === 'undefined' ||
    feature.pages.some(p => p.test(window.location.href));

  const isEnabled = !feature.settings || settings[feature.settings.id];

  if (!validPage || !isEnabled) return;

  if (feature.withObserver) {
    withObserver(feature.fn);
  } else {
    feature.fn();
  }
}
