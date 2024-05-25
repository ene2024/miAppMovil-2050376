import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Bazar.Bazar',
  appName: 'Bazar',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Camera: {
      permissions: {
        camera: 'Allow $(PRODUCT_NAME) to access your camera.',
        photos: 'Allow $(PRODUCT_NAME) to access your photos.'
      }
    }
  }
};

export default config;
