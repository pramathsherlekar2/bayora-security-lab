import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our 
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    preview: {
      allowedHosts: ['bayora-security-lab.onrender.com']
    }
  }
});