import withObserver from './withObserver';

export default function applyMod(feature, settings) {
  const validPage = typeof feature.pages === 'undefined' ||
    feature.pages.some(p => p.test(window.location.href));

  const hasSettings = !!feature.settings;
  const featureSettings = hasSettings
    ? settings[feature.settings.id] || feature.settings.default
    : null;
  const isEnabled = !hasSettings || featureSettings.enabled !== false;

  if (!validPage || !isEnabled) return;

  if (feature.withObserver) {
    withObserver(feature.fn);
  } else {
    feature.fn(featureSettings);
  }
}
