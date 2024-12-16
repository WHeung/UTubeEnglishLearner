import { subtitleTrackerStorage } from '@extension/storage';

// Function to toggle the tracking state
export const toggleTracker = async () => {
  try {
    const currentState = await subtitleTrackerStorage.get();
    console.log('Initial tracker state:', currentState);
    await subtitleTrackerStorage.toggle();
    const newState = await subtitleTrackerStorage.get();
    console.log('Toggled tracker state:', newState);
  } catch (error) {
    console.error('Error toggling tracker state:', error);
  }
};

// MutationObserver instance
let observer: MutationObserver | null = null;

// Function to inject custom subtitles into the DOM
const injectCustomSubtitles = () => {
  const captionElement = document.querySelector('.ytp-caption-segment');
  if (captionElement) {
    const subtitleText = captionElement.textContent || '';
    const words = subtitleText.split(' ').map(word => `<span>${word}</span>`);
    captionElement.innerHTML = words.join(' ');
  }
};

// Function to start observing subtitle changes
const startObservingSubtitles = () => {
  stopObservingSubtitles(); // Ensure no multiple observers are running
  const container = document.querySelector('.ytp-caption-window-container');
  if (container) {
    observer = new MutationObserver(() => injectCustomSubtitles());
    observer.observe(container, { childList: true, subtree: true });
    console.log('Started observing subtitles.');
  } else {
    console.warn('Subtitle container not found.');
  }
};

// Function to stop observing subtitle changes
const stopObservingSubtitles = () => {
  if (observer) {
    observer.disconnect();
    observer = null;
    console.log('Stopped observing subtitles.');
  }
};

// Function to subscribe to tracking state changes
export const subscribeTracker = () => {
  subtitleTrackerStorage.subscribe(status => {
    console.log('Storage updated:', status);
    if (status === 'true') {
      startObservingSubtitles();
    } else {
      stopObservingSubtitles();
    }
  });
};
