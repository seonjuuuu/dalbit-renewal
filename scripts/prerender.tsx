import "./ssr-polyfills.mjs";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderToString } from "react-dom/server";
import App from "../client/src/App";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.resolve(__dirname, "..", "dist", "public", "index.html");

const html = readFileSync(indexPath, "utf-8");
const appHtml = renderToString(<App />);

const injected = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

if (injected === html) {
  throw new Error("Prerender: could not find <div id=\"root\"></div> in built index.html");
}

writeFileSync(indexPath, injected);
console.log("Prerendered markup injected into dist/public/index.html");
