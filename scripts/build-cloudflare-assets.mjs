import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "dist", "cloudflare");
const entries = ["index.html", "favicon.svg", "works", "digital-archive-movie-jp"];

function assertInsideRoot(targetPath) {
  const relative = path.relative(root, targetPath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Refusing to write outside repo: ${targetPath}`);
  }
}

assertInsideRoot(outputDir);
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const entry of entries) {
  const source = path.join(root, entry);
  const destination = path.join(outputDir, entry);
  assertInsideRoot(destination);
  await cp(source, destination, { recursive: true });
}

console.log(`Cloudflare assets built at ${path.relative(root, outputDir)}`);
