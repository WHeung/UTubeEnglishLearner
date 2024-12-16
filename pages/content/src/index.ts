import { toggleTheme } from '@src/toggleTheme';
import { subscribeTracker } from '@src/toggleTracker';

console.log('content script loaded');

void toggleTheme();

void subscribeTracker();
