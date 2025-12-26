import { b as browserPolyfillExports } from "./browser-polyfill-1bf53692.js";
import "./_commonjsHelpers-7a77ea84.js";
const mainWorld = "/assets/main-world.ts-4ed993c7.js";
const script = document.createElement("script");
script.src = browserPolyfillExports.runtime.getURL(mainWorld);
script.type = "module";
document.head.prepend(script);
