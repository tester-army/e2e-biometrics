import { test } from '@e2e-dev/mobile';
import { expect } from 'e2e';

test('the app opens locked and asks for nothing', async ({ app, screen }) => {
  await app.open();
  // The first launch waits for Metro to bundle the app.
  await expect(screen.getByTestId('unlock')).toHaveText(/^unlock$/i, { timeout: 60_000 });
  await expect(screen.getByTestId('unlocked')).toBeHidden();
  await expect(screen.getByText(/fingerprint sensor/i)).toBeHidden();
});
