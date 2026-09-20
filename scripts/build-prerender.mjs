import { build } from "esbuild";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync, writeFileSync, rmSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const bundlePath = path.resolve(__dirname, ".prerender-bundle.mjs");

await build({
  entryPoints: [path.resolve(__dirname, "prerender.tsx")],
  outfile: bundlePath,
  bundle: true,
  platform: "node",
  format: "esm",
  jsx: "automatic",
  packages: "external",
  alias: {
    "@": path.resolve(root, "client/src"),
    "@shared": path.resolve(root, "shared"),
  },
  loader: { ".tsx": "tsx", ".ts": "ts" },
  define: { "import.meta.env": "{}" },
});

await import(bundlePath);

rmSync(bundlePath);
