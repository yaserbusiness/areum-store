import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * خادم تشغيل نسخة الإنتاج (Vite build) — بدون أي إطار خادم.
 * يخدم ملفات dist مع دعم التنقل من جهة العميل، ونقطة /api/health للفحص.
 */
const root = resolve(fileURLToPath(new URL("./dist", import.meta.url)));
const port = Number(process.env.PORT || 3000);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": MIME[".json"] });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  const requested = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(root, requested);

  try {
    const info = await stat(filePath);
    if (info.isDirectory()) filePath = join(filePath, "index.html");
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": MIME[extname(filePath).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  } catch {
    // تنقّل من جهة العميل: نُرجع index.html للمسارات غير الموجودة كملفات
    const data = await readFile(join(root, "index.html"));
    res.writeHead(200, { "Content-Type": MIME[".html"] });
    res.end(data);
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`AREUM storefront running on http://localhost:${port}`);
});
