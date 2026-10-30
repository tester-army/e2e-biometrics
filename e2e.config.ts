import type { E2EConfig } from 'e2e';
import { mobile } from '@e2e-dev/mobile';

// e2e loads no .env file itself.
try {
  process.loadEnvFile(new URL('.env.local', import.meta.url));
} catch {}

// A secret shorter than 6 characters fails config load, so the PIN is registered only when it's set right.
const pin = process.env.EXPO_PUBLIC_PIN ?? '';
const secrets: Record<string, string> = /^\d{6}$/.test(pin) ? { pin } : {};

// The Debug builds load their JavaScript from Metro. iOS has port 8081 compiled in, so a launch argument moves it;
// an Android build takes its port from `npx expo run:android --port`.
const port = process.env.METRO_PORT ?? '8081';
const app = {
  bundleId: 'dev.e2e.biometrics',
  command: {
    executable: 'npx',
    args: ['expo', 'start', '--port', port],
    reuseExisting: true,
    log: '.e2e/logs/metro.log',
  },
  readyUrl: `http://localhost:${port}/status`,
};

export default {
  secrets,
  targets: [
    {
      name: 'ios',
      engine: mobile({ platform: 'ios', device: process.env.IOS_DEVICE, session: 'e2e-biometrics-ios' }),
      app: {
        ...app,
        launchArguments: ['-AppleLocale', 'en_US', '-AppleLanguages', '(en)', '-RCT_jsLocation', `localhost:${port}`],
      },
    },
    {
      name: 'android',
      engine: mobile({ platform: 'android', device: process.env.ANDROID_DEVICE, session: 'e2e-biometrics-android' }),
      app,
    },
  ],
  workers: 1,
} satisfies E2EConfig;
