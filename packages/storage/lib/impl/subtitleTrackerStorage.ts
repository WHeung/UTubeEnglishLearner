import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

type TrackingEnabled = 'true' | 'false';

type TrackingEnabledStorage = BaseStorage<TrackingEnabled> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<TrackingEnabled>('tracking-enabled', 'false', {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

// You can extend it with your own methods
export const subtitleTrackerStorage: TrackingEnabledStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(current => {
      const toggled = current === 'false' ? 'true' : 'false';
      return toggled;
    });
  },
};
