import { describe } from '@e2e-dev/mobile';
import { expect, secrets } from 'e2e';

import { BUNDLE_ID, skipWithoutModel, skipWithoutPin, test, WRONG_PIN } from './fixtures';

const UNLOCKED_WITH = { faceid: 'Unlocked with Face ID', fingerprint: 'Unlocked with your fingerprint' };

describe('biometric unlock', { skip: skipWithoutPin, retries: 2, timeout: 120_000 }, () => {
  test('a matching face or finger unlocks the app', async ({ device, screen, sensor, waitForPrompt }) => {
    await screen.getByTestId('unlock').tap();
    await waitForPrompt();
    await device.setBiometrics(sensor, 'match');

    await expect(screen.getByTestId('unlock-method')).toHaveText(UNLOCKED_WITH[sensor]);
  });

  test(
    'a failed match offers the PIN',
    { skip: skipWithoutModel },
    async ({ agent, device, screen, sensor, waitForPrompt }) => {
      await screen.getByTestId('unlock').tap();
      await waitForPrompt();
      await device.setBiometrics(sensor, 'nonmatch');

      // The prompt is the system's, worded differently on each platform. Android's message lasts 2 to 3 seconds.
      await agent.waitFor('the system says the face or fingerprint was not recognized', { interval: 500 });
      await agent.act('choose to use the PIN instead');
      await expect(screen.getByTestId('pin-notice')).toHaveText(/didn't unlock the app\. Enter your PIN\.$/);

      await screen.getByTestId('pin').fill(WRONG_PIN);
      await screen.getByTestId('submit-pin').tap();
      await expect(screen.getByTestId('pin-error')).toHaveText('Wrong PIN. Try again.');

      await screen.getByTestId('pin').fill(secrets.get('pin'));
      await screen.getByTestId('submit-pin').tap();
      await expect(screen.getByTestId('unlock-method')).toHaveText('Unlocked with PIN');
    },
  );

  test('with nothing enrolled, Unlock goes straight to the PIN', { platforms: ['ios'] }, async ({ device, screen }) => {
    await device.enrollBiometrics('faceid', false);
    await screen.getByTestId('unlock').tap();

    await expect(screen.getByTestId('pin-notice')).toHaveText("Face ID isn't set up on this device. Enter your PIN.");
    await screen.getByTestId('pin').fill(secrets.get('pin'));
    await screen.getByTestId('submit-pin').tap();
    await expect(screen.getByTestId('unlock-method')).toHaveText('Unlocked with PIN');
  });

  test('the app locks again after going to the background', async ({
    device,
    platform,
    screen,
    unlockWithBiometrics,
  }) => {
    await unlockWithBiometrics();

    await device.home();
    // iOS answers from the session, so it would still name the app here.
    if (platform === 'android') expect((await device.foregroundApp()).bundleId).not.toBe(BUNDLE_ID);

    await device.openApp(BUNDLE_ID);
    // A relaunch would show the lock screen too, but never this notice.
    await expect(screen.getByTestId('lock-notice')).toHaveText('Locked when the app went to the background.');
    expect((await device.foregroundApp()).bundleId).toBe(BUNDLE_ID);
  });
});
