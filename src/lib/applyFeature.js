import withObserver from './withObserver';

export default function applyFeature(feature) {
  const shouldApply = typeof feature.pages === 'undefined' || feature.pages.some(p => p.test(window.location.href));

  if (!shouldApply) return;

  if (feature.withObserver) {
    withObserver(feature.fn);
  } else {
    feature.fn();
  }
}
