// P0B2-A — self-host the open-source runtime libraries that Merywood pages loaded live.
// Every entry is byte-identical to the file merywood.com served (verified 2026-11-08/10):
// only the URL changes; tag id, position, attributes and load order stay as in the source.
// Bytes come from the official npm packages (package-lock integrity) or from the WordPress
// 7.1.2 release (vendor/wordpress-7.1.2, GPL-2.0-or-later); SHA-256 is checked fail-closed.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const sha256 = b => createHash("sha256").update(b).digest("hex");
const THEME = "https://merywood.com/wp-content/themes/mery-wood/assets/";

export const VENDOR_LIBS = [
  { name: "jquery", version: "3.7.1", license: "MIT", from: "node_modules/jquery/dist/jquery.js", licenseFile: "node_modules/jquery/LICENSE.txt",
    live: THEME + "js/jquery.js", out: "assets/vendor/jquery-3.7.1/jquery.js",
    sha256: "78a85aca2f0b110c29e0d2b137e09f0a1fb7a8e554b499f740d6744dc8962cfe" },
  { name: "swiper", version: "11.1.4", license: "MIT", from: "node_modules/swiper/swiper-bundle.min.js", licenseFile: "node_modules/swiper/LICENSE",
    live: THEME + "swiper/swiper-bundle.min.js", out: "assets/vendor/swiper-11.1.4/swiper-bundle.min.js",
    sha256: "ac20020d60a9fd5cc8874aec07e8a940233d5c1bcef0735ed1f35239ae2ccacd" },
  { name: "swiper", version: "11.1.4", license: "MIT", from: "node_modules/swiper/swiper-bundle.min.css", licenseFile: "node_modules/swiper/LICENSE",
    live: THEME + "swiper/swiper-bundle.min.css", out: "assets/vendor/swiper-11.1.4/swiper-bundle.min.css",
    sha256: "e6792bc2356c88d7cacf7351d64da1e7eaade694b9485daef7f4c84f5844968c" },
  { name: "smooth-scrollbar", version: "8.8.4", license: "MIT", from: "node_modules/smooth-scrollbar/dist/smooth-scrollbar.js", licenseFile: "node_modules/smooth-scrollbar/LICENSE",
    live: THEME + "smooth-scrollbar/smooth-scrollbar.js", out: "assets/vendor/smooth-scrollbar-8.8.4/smooth-scrollbar.js",
    sha256: "72db24a58aec3a5eaea41daa7b25ab1320a653085c63ee023239484000b75757" },
  { name: "wordpress hooks", version: "7.1.2", license: "GPL-2.0-or-later", from: "vendor/wordpress-7.1.2/hooks.min.js", licenseFile: "vendor/wordpress-7.1.2/license.txt",
    live: "https://merywood.com/wp-includes/js/dist/hooks.min.js", out: "assets/vendor/wordpress-7.1.2/hooks.min.js",
    sha256: "fc774906082b59dedcfc55b8ef127783b6d056578ff4586a8ebbdb81bbe286f1" },
  { name: "wordpress i18n", version: "7.1.2", license: "GPL-2.0-or-later", from: "vendor/wordpress-7.1.2/i18n.min.js", licenseFile: "vendor/wordpress-7.1.2/license.txt",
    live: "https://merywood.com/wp-includes/js/dist/i18n.min.js", out: "assets/vendor/wordpress-7.1.2/i18n.min.js",
    sha256: "5083905862c2b7aa8a84c4f2313d359d2288fb25fbe1ff577fa7325eff2ed2d9" }
];

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function vendorFiles(){
  const files = VENDOR_LIBS.map(lib => {
    const body = readFileSync(path.join(root, lib.from));
    const got = sha256(body);
    if (got !== lib.sha256) throw new Error(`VENDOR PIN: ${lib.from} sha256 ${got} != expected ${lib.sha256}`);
    return { ...lib, body, url: "/" + lib.out + "?v=" + got.slice(0, 12) };
  });
  const seen = new Set(), notices = [];
  for (const lib of VENDOR_LIBS){
    if (seen.has(lib.licenseFile)) continue;
    seen.add(lib.licenseFile);
    notices.push(`==== ${lib.name} ${lib.version} (${lib.license}) — ${lib.licenseFile} ====\n` + readFileSync(path.join(root, lib.licenseFile), "utf8").trim() + "\n");
  }
  notices.unshift("Third-party open-source files served under /assets/vendor/ (unmodified upstream bytes).\n" +
    "WordPress source: https://core.svn.wordpress.org/tags/7.1.2/wp-includes/js/dist/ (hooks.js, i18n.js).\n");
  files.push({ out: "assets/vendor/THIRD_PARTY_LICENSES.txt", body: notices.join("\n") });
  return files;
}

// Replace the src/href of each live library tag (any ?ver= query) with the self-hosted URL.
export function pinVendor(html, files, label){
  let out = html;
  for (const f of files){
    if (!f.live) continue;
    const re = new RegExp('((?:src|href)=")' + esc(f.live) + '(?:\\?[^"]*)?(")', "g");
    if (!re.test(out)) throw new Error("VENDOR PIN: " + f.live + " not referenced in " + label);
    out = out.replace(re, "$1" + f.url + "$2");
  }
  for (const f of files) if (f.live && out.includes(f.live)) throw new Error("VENDOR PIN: live " + f.live + " still referenced in " + label);
  return out;
}
