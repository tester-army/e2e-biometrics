import type { E2EConfig } from 'e2e';
import { mobile } from '@e2e-dev/mobile';
import { gateway } from 'ai';

try {
  process.loadEnvFile(new URL('.env.local', import.meta.url));
} catch {}

// e2e refuses a secret under 6 characters, so an unset PIN isn't registered.
const pin = process.env.EXPO_PUBLIC_PIN ?? '';
const secrets: Record<string, string> = /^\d{6}$/.test(pin) ? { pin } : {};

// iOS has Metro's port compiled in, so a launch argument moves it. Android takes it at build time (`expo run:android --port`).
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
  agents: {
    default: {
      model: gateway('openai/gpt-6-luna-fast'),
      system: 'You are a thorough QA agent. Verify every outcome.',
    },
  },
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
