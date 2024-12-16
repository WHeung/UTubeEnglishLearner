import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

// Define the type for tracking state
type TrackingEnabled = 'true' | 'false';

// Extend BaseStorage to include a toggle method
type TrackingEnabledStorage = BaseStorage<TrackingEnabled> & {
  toggle: () => Promise<void>;
};

// Initialize storage with default value 'false' and live updates enabled
const storage = createStorage<TrackingEnabled>('tracking-enabled', 'false', {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

// Implement the subtitleTrackerStorage with a toggle method
export const subtitleTrackerStorage: TrackingEnabledStorage = {
  ...storage,
  toggle: async () => {
    try {
      // Toggle the current state between 'true' and 'false'
      await storage.set(current => (current === 'false' ? 'true' : 'false'));
    } catch (error) {
      console.error('Error toggling tracking state:', error);
    }
  },
};
