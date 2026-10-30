import { test as base } from '@e2e-dev/mobile';
import { expect } from 'e2e';

export const BUNDLE_ID = 'dev.e2e.biometrics';
export const WRONG_PIN = '000000';

const pin = process.env.EXPO_PUBLIC_PIN ?? '';
export const skipWithoutPin =
  /^\d{6}$/.test(pin) && pin !== WRONG_PIN ? false : 'set EXPO_PUBLIC_PIN in .env.local to 6 digits other than 000000';
export const skipWithoutModel =
  process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN
    ? false
    : 'set AI_GATEWAY_API_KEY to run the agent steps';

const withLockScreen = base.extend<{
  lockScreen: void;
  sensor: 'faceid' | 'fingerprint';
  waitForPrompt: () => Promise<void>;
}>({
  lockScreen: async ({ app, device, platform, screen }, use) => {
    if (platform === 'ios') await device.enrollBiometrics('faceid', true);
    await app.open();
    // The first launch waits for Metro to bundle the app.
    await expect(screen.getByTestId('unlock')).toBeVisible({ timeout: 60_000 });
    await use();
    if (platform === 'ios') await device.enrollBiometrics('faceid', true);
  },

  sensor: async ({ platform }, use) => {
    await use(platform === 'ios' ? 'faceid' : 'fingerprint');
  },

  // A face or finger sent before the prompt listens is lost. The Face ID HUD isn't in the tree, but the app knows
  // it's up. Android's Use PIN button shows before the sensor listens; its text means it's ready.
  waitForPrompt: async ({ platform, screen }, use) => {
    await use(async () => {
      if (platform === 'ios') await expect(screen.getByTestId('unlock')).toHaveText(/waiting for face id/i);
      else await expect(screen.getByText('Touch the fingerprint sensor')).toBeVisible();
    });
  },
});

export const test = withLockScreen.extend<{ unlockWithBiometrics: () => Promise<void> }>({
  unlockWithBiometrics: async ({ device, screen, sensor, waitForPrompt }, use) => {
    await use(async () => {
      await screen.getByTestId('unlock').tap();
      await waitForPrompt();
      await device.setBiometrics(sensor, 'match');
      await expect(screen.getByTestId('unlocked')).toBeVisible();
    });
  },
});
