import * as features from '../features';
import * as fixes from '../fixes';

// Saves options to chrome.storage
function saveOptions() {
  const storedFeatures = {};
  document.querySelectorAll('input')
    .forEach((input) => {
      storedFeatures[input.id] = input.checked;
    });
  chrome.storage.sync.set(storedFeatures, () => {
    // Update status to let user know options were saved.
    const status = document.querySelector('#save-msg');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function loadOptions() {
  const options = {
    ...features,
    ...fixes,
  };
  const settings = Object.keys(options)
    .map((f) => {
      const s = options[f].settings;
      if (!s) return null;

      s.type = features[f] != null ? 'feature' : 'fix';
      return s;
    })
    .filter(f => f != null);

  chrome.storage.sync.get(settings.map(f => f.id), (storedOptions) => {
    const featuresEl = document.querySelector('#features-container');
    const fixesEl = document.querySelector('#fixes-container');

    settings.forEach((f) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.id = f.id;
      input.type = 'checkbox';
      input.checked = !(storedOptions[f.id] === false);
      label.appendChild(input);
      label.appendChild(document.createTextNode(f.name));
      const containerEl = f.type === 'feature' ? featuresEl : fixesEl;
      containerEl.appendChild(label);
    });
  });
}

function main() {
  document.addEventListener('DOMContentLoaded', loadOptions);
  document.getElementById('save').addEventListener(
    'click',
    saveOptions,
  );
}

main();

