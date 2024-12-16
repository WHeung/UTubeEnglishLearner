import { subtitleTrackerStorage } from '@extension/storage';

export async function toggleTracker() {
  console.log('initial tracker:', await subtitleTrackerStorage.get());
  await subtitleTrackerStorage.toggle();
  console.log('toggled tracker:', await subtitleTrackerStorage.get());
}

// content.ts (or content.js, depending on your setup)

const injectCustomSubtitles = () => {
  const captionElement = document.querySelector('.ytp-caption-segment');
  if (captionElement) {
    const subtitleText = captionElement.textContent;
    if (subtitleText) {
      const words = subtitleText.split(' ');

      // Replace each word with a styled span for interaction
      const styledWords = words.map(word => {
        const isKnown = checkIfKnown(word); // You need to implement this function
        return `<span class="word ${isKnown ? 'known' : 'unknown'}">${word}</span>`;
      });

      // Join all words back together with spaces
      const customSubtitle = styledWords.join(' ');

      // Replace the original subtitle text with the custom one
      captionElement.innerHTML = customSubtitle;
    }
  }
};

// Example of adding a style for the words
const addStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .word.known { color: green; font-weight: bold; }
    .word.unknown { color: red; font-style: italic; }
  `;
  document.head.appendChild(style);
};

// Define the functions to start and stop observing subtitles
let observer: MutationObserver | null = null;

// Observe subtitle changes on YouTube
const startObserveSubtitles = () => {
  stopObservingSubtitles();
  console.log('startObserveSubtitles');
  const subtitleContainer = document.querySelector('.ytp-caption-window-container');
  console.log('observeSubtitles subtitleContainer', subtitleContainer);

  if (subtitleContainer) {
    const config = { childList: true, subtree: true };

    // Create the observer to track changes in the subtitles
    observer = new MutationObserver(mutations => {
      console.log('observeSubtitles MutationObserver', mutations);
      mutations.forEach(() => {
        injectCustomSubtitles();
      });
    });

    observer.observe(subtitleContainer, config);
  }
};

const stopObservingSubtitles = () => {
  if (observer) {
    observer.disconnect();
    observer = null;
    console.log('Stopped observing subtitles.');
  }
};

// Start observing as soon as the content script loads
// addStyles();
// observeSubtitles();

// content.js

const checkIfKnown = (word: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // chrome.storage.local.get('knownWords', data => {
    //   const knownWords = data.knownWords || [];
    //   resolve(knownWords.includes(word));
    // });
    resolve(true);
  });
};

// To use checkIfKnown:
checkIfKnown('hello').then(isKnown => {
  console.log(isKnown ? 'Known' : 'Unknown');
});

export async function subscribeTracker() {
  subtitleTrackerStorage.subscribe(async () => {
    console.log('subscribe', subtitleTrackerStorage, status);
    if (status) {
      startObserveSubtitles();
    } else {
      stopObservingSubtitles();
    }
  });
}
