import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "dist", "cloudflare");

const requiredFiles = [
  "index.html",
  "favicon.svg",
  "works/index.html",
  "digital-archive-movie-jp/index.html",
  "digital-archive-movie-jp/privacy/index.html",
  "digital-archive-movie-jp/terms/index.html"
];

const expectedText = new Map([
  ["digital-archive-movie-jp/privacy/index.html", "DigitalArchiveMovieJP"],
  ["digital-archive-movie-jp/terms/index.html", "YouTube API Services"],
  ["works/index.html", "Verdafly"]
]);

for (const relativePath of requiredFiles) {
  const fullPath = path.join(outputDir, relativePath);
  const info = await stat(fullPath);
  if (!info.isFile() || info.size === 0) {
    throw new Error(`Missing or empty asset: ${relativePath}`);
  }

  const marker = expectedText.get(relativePath);
  if (marker) {
    const content = await readFile(fullPath, "utf8");
    if (!content.includes(marker)) {
      throw new Error(`Expected marker not found in ${relativePath}: ${marker}`);
    }
  }
}

console.log(`Verified ${requiredFiles.length} Cloudflare asset files.`);
