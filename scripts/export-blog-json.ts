/**
 * Run: npx tsx scripts/export-blog-json.ts
 * Parses client/src/pages/blog.tsx and writes client/public/blog-posts.json.
 * Deploy only blog: run this, then scp client/public/blog-posts.json to EC2 dist/public/
 */
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const blogPath = path.join(root, "client", "src", "pages", "blog.tsx");
const raw = readFileSync(blogPath, "utf-8");

const startMarker = "export const blogPosts = [";
const start = raw.indexOf(startMarker);
if (start === -1) throw new Error("blogPosts array not found");
let tail = raw.slice(start + startMarker.length);

// Find matching closing bracket for the array
let depth = 1;
let i = 0;
while (depth > 0 && i < tail.length) {
  const c = tail[i];
  if (c === "[") depth++;
  else if (c === "]") depth--;
  i++;
}
const arrayContent = tail.slice(0, i - 1);

// Split into post blocks: "  { ... }," or "  { ... }\n]"
const postBlocks: string[] = [];
let pos = 0;
while (pos < arrayContent.length) {
  const trim = arrayContent.slice(pos).replace(/^\s*,?\s*/, "");
  pos = arrayContent.length - trim.length;
  if (trim.startsWith("{")) {
    let braceDepth = 0;
    let j = 0;
    while (j < trim.length) {
      const c = trim[j];
      if (c === "{" || c === "(") braceDepth++;
      else if (c === "}" || c === ")") {
        braceDepth--;
        if (c === "}" && braceDepth === 0) {
          j++;
          break;
        }
      } else if ((c === '"' || c === "`") && trim[j - 1] !== "\\") {
        const quote = c;
        j++;
        while (j < trim.length) {
          if (trim[j] === "\\") {
            j += 2;
            continue;
          }
          if (trim[j] === quote) {
            j++;
            break;
          }
          j++;
        }
        continue;
      }
      j++;
    }
    postBlocks.push(trim.slice(0, j));
    pos += j;
  } else break;
}

const iconMap: Record<string, string> = {
  Sparkles: "Sparkles",
  Users: "Users",
  BookOpen: "BookOpen",
  TrendingUp: "TrendingUp",
};

const posts = postBlocks.map((block) => {
  const id = block.match(/id:\s*"([^"]+)"/)?.[1] ?? "";
  const title = block.match(/title:\s*"((?:[^"\\]|\\.)*)"/)?.[1] ?? "";
  const excerpt = block.match(/excerpt:\s*"((?:[^"\\]|\\.)*)"/)?.[1] ?? "";
  const category = block.match(/category:\s*"([^"]+)"/)?.[1] ?? "";
  const author = block.match(/author:\s*"([^"]+)"/)?.[1] ?? "";
  const date = block.match(/date:\s*"([^"]+)"/)?.[1] ?? "";
  const readTime = block.match(/readTime:\s*"([^"]+)"/)?.[1] ?? "";
  const iconName = block.match(/icon:\s*(\w+)/)?.[1] ?? "BookOpen";
  const icon = iconMap[iconName] ?? "BookOpen";
  const contentMatch = block.match(/content:\s*`([\s\S]*?)`\s*(?:\n|$)/);
  const content = contentMatch
    ? contentMatch[1].replace(/^\s+|\s+$/g, "").trim()
    : "";

  return {
    id,
    title,
    excerpt,
    category,
    author,
    date,
    readTime,
    icon,
    content,
  };
});

const outPath = path.join(root, "client", "public", "blog-posts.json");
writeFileSync(outPath, JSON.stringify(posts, null, 2), "utf-8");
console.log("Wrote", outPath, "(" + posts.length + " posts)");
