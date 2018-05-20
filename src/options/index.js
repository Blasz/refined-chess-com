import * as features from '../features';
import * as fixes from '../fixes';

function showMsg(msg) {
  // Update status to let user know options were saved.
  const status = document.querySelector('#save-msg');
  status.textContent = msg;
  setTimeout(() => {
    status.textContent = '';
  }, 750);
}

function updateInput(input, config, storedOption) {
  input.id = config.id;
  Object.assign(input, config.inputAttrs);
  input.type = config.type || 'checkbox';

  if (input.type === 'checkbox') {
    input.checked = storedOption ? storedOption.enabled : config.default.enabled;
  } else if (input.type === 'range') {
    input.value = storedOption ? storedOption.value : config.default.value;
  }
}

function createOrUpdateOption(config, storedOption) {
  const existingInput = document.querySelector(`#${config.id}`);
  if (existingInput) {
    // Update
    updateInput(existingInput, config, storedOption);
  } else {
    // Create
    const featuresEl = document.querySelector('#features-container');
    const fixesEl = document.querySelector('#fixes-container');
    const label = document.createElement('label');
    const input = document.createElement('input');
    updateInput(input, config, storedOption);
    if (input.type === 'range') {
      label.classList.add('range');
    }
    label.appendChild(input);
    label.appendChild(document.createTextNode(config.name));
    const containerEl = config.featureType === 'feature' ? featuresEl : fixesEl;
    containerEl.appendChild(label);
  }
}

// Saves options to chrome.storage
function saveOptions() {
  const storedFeatures = {};
  document.querySelectorAll('input')
    .forEach((input) => {
      if (input.type === 'checkbox') {
        storedFeatures[input.id] = {
          enabled: input.checked,
        };
      } else if (input.type === 'range') {
        storedFeatures[input.id] = {
          value: input.value,
        };
      }
    });
  chrome.storage.sync.set(storedFeatures, () => {
    showMsg('Options saved.');
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function loadOptions(callback) {
  const options = {
    ...features,
    ...fixes,
  };
  const settings = Object.keys(options)
    .map((f) => {
      const s = options[f].settings;
      if (!s) return null;

      s.featureType = features[f] != null ? 'feature' : 'fix';
      return s;
    })
    .filter(f => f != null);

  chrome.storage.sync.get(settings.map(f => f.id), (storedOptions) => {
    settings.forEach((f) => {
      createOrUpdateOption(f, storedOptions[f.id]);
    });

    if (typeof callback === 'function') {
      callback();
    }
  });
}

function resetOptions() {
  chrome.storage.sync.clear(() => {
    loadOptions(() => {
      showMsg('Options reset.');
    });
  });
}

function main() {
  document.addEventListener('DOMContentLoaded', loadOptions);
  document.getElementById('save').addEventListener(
    'click',
    saveOptions,
  );
  document.getElementById('reset').addEventListener(
    'click',
    resetOptions,
  );
}

main();

