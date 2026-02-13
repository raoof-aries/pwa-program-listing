import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/attendance/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "icons/*"],
      workbox: {
        // Exclude config.json from precache so it's always fetched fresh
        globIgnores: ["**/config.json"],
        runtimeCaching: [
          {
            urlPattern: /\/config\.json$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "app-config",
              expiration: { maxEntries: 1, maxAgeSeconds: 60 * 5 },
            },
          },
        ],
      },
      manifest: {
        name: "Program Listing",
        short_name: "Programs",
        description: "Today's program listing — attendees and details",
        theme_color: "#0ea5a4",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/attendance/",
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
  },
});
