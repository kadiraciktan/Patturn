import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.patturn.app",
  appName: "patturn",
  webDir: "dist",

  server: {
    androidScheme: "https",
    url: "http://192.168.1.106:5173",
    cleartext: true,
  },
};

export default config;
