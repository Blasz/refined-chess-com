document.addEventListener('adjustVolume', (e) => {
  if (typeof window.Howler === 'undefined' || !window.Howler.masterGain
    || !window.Howler.masterGain.gain) {
    console.log('Howler object not available');
    return;
  }
  window.Howler.masterGain.gain.value = e.detail.volume;
});
