import { g as getUserConfig, b as getUUID, u as updateUserConfig, v as v4 } from "./common-54d607d2.js";
import "./browser-polyfill-1bf53692.js";
import "./_commonjsHelpers-7a77ea84.js";
import "./shim-5b326084.js";
const name = "youdao-magic-translator";
const version = "1.0.4";
const type = "module";
const scripts = {
  dev: "VITE_TARGET=OTHER VITE_BETA=0 VITE_DEV=1 VITE_CHANNEL=CHROME vite --config vite.config.chrome.ts",
  "fast-build": "npm run chrome-build && npm run edge-build && npm run zip-build",
  build: "vue-tsc && vite build",
  "chrome-build": "VITE_TARGET=OTHER VITE_BETA=0 VITE_DEV=0 VITE_CHANNEL=CHROME vite build --config vite.config.chrome.ts",
  "edge-build": "VITE_TARGET=OTHER VITE_BETA=0 VITE_DEV=0 VITE_CHANNEL=EDGE vite build --config vite.config.edge.ts",
  "zip-build": "VITE_TARGET=OTHER VITE_BETA=0 VITE_DEV=0  VITE_CHANNEL=ZIP vite build --config vite.config.zip.ts",
  "ios-build": "VITE_TARGET=IOS VITE_BETA=0 VITE_DEV=0 vite build",
  "convert-ios": "xcrun safari-web-extension-converter ~/company/aitranslationextension/dist",
  test: "jest",
  "setup-broswer": "sh debug.sh"
};
const dependencies = {
  "@element-plus/icons-vue": "^2.1.0",
  "@mozilla/readability": "^0.4.4",
  "@types/webextension-polyfill": "^0.10.0",
  "@vespaiach/axios-fetch-adapter": "^0.3.1",
  "@webfront-components-vue/sign-utils": "^1.1.2",
  "auto-typer-vue3": "^1.2.2",
  axios: "^0.27.2",
  "browser-tool": "^1.1.0",
  "crypto-js": "^4.1.1",
  "d3-polygon": "^3.0.1",
  "element-plus": "^2.3.7",
  "floating-vue": "^2.0.0-beta.24",
  "franc-min": "^6.1.0",
  idb: "^7.1.1",
  "js-clipper": "^1.0.1",
  localforage: "^1.10.0",
  lodash: "^4.17.21",
  "lodash-es": "^4.17.21",
  md5: "^2.3.0",
  minimatch: "^9.0.2",
  "murmurhash-js": "^1.0.0",
  "node-stdlib-browser": "^1.2.0",
  "number-precision": "^1.6.0",
  "onnxruntime-web": "^1.16.3",
  "opencv-ts": "^1.3.6",
  "p-queue": "^7.3.4",
  "p-timeout": "^6.1.2",
  polygon: "^1.0.2",
  psl: "^1.9.0",
  "puppeteer-core": "^21.1.0",
  retry: "^0.13.1",
  semver: "^7.5.4",
  terser: "^5.19.2",
  "url-changed": "^4.1.0",
  uuid: "^9.0.0",
  "vite-plugin-zip-file": "^2.1.1",
  vue: "^3.2.47",
  "vue-router": "^4.2.4",
  "vue3-carousel": "^0.3.1",
  "vue3-popper": "^1.5.0",
  "vue3-typer": "^1.0.0"
};
const devDependencies = {
  "@crxjs/vite-plugin": "^2.0.0-beta.26",
  "@playwright/test": "^1.37.1",
  "@rollup/plugin-babel": "^6.0.3",
  "@types/md5": "^2.3.2",
  "@types/node": "^20.3.1",
  "@types/psl": "^1.1.0",
  "@types/retry": "^0.12.2",
  "@types/semver": "^7.5.1",
  "@types/uuid": "^9.0.2",
  "@vitejs/plugin-legacy": "^4.1.1",
  "@vitejs/plugin-vue": "^4.1.0",
  "@webcomponents/webcomponentsjs": "^2.8.0",
  "expect-puppeteer": "^9.0.0",
  jest: "^29.6.3",
  "jest-puppeteer": "^9.0.0",
  puppeteer: "^19.2.2",
  sass: "^1.64.2",
  "ts-node": "^10.9.1",
  typescript: "^5.0.2",
  vite: "~4.2.2",
  "vite-plugin-favicon": "^1.0.8",
  "vite-plugin-imagemin": "^0.6.1",
  "vite-plugin-node-stdlib-browser": "^0.2.1",
  "vite-plugin-static-copy": "^0.17.0",
  "vue-tsc": "^1.4.2",
  "webextension-polyfill": "^0.10.0"
};
const pkg = {
  name,
  "private": true,
  version,
  type,
  scripts,
  dependencies,
  devDependencies
};
var md5Exports = {};
var md5 = {
  get exports() {
    return md5Exports;
  },
  set exports(v) {
    md5Exports = v;
  }
};
var cryptExports = {};
var crypt = {
  get exports() {
    return cryptExports;
  },
  set exports(v) {
    cryptExports = v;
  }
};
(function() {
  var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", crypt$1 = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return n << b | n >>> 32 - b;
    },
    // Bit-wise rotation right
    rotr: function(n, b) {
      return n << 32 - b | n >>> b;
    },
    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      if (n.constructor == Number) {
        return crypt$1.rotl(n, 8) & 16711935 | crypt$1.rotl(n, 24) & 4278255360;
      }
      for (var i = 0; i < n.length; i++)
        n[i] = crypt$1.endian(n[i]);
      return n;
    },
    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },
    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << 24 - b % 32;
      return words;
    },
    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push(words[b >>> 5] >>> 24 - b % 32 & 255);
      return bytes;
    },
    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 15).toString(16));
      }
      return hex.join("");
    },
    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },
    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 63));
          else
            base64.push("=");
      }
      return base64.join("");
    },
    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
      for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
        if (imod4 == 0)
          continue;
        bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
      }
      return bytes;
    }
  };
  crypt.exports = crypt$1;
})();
var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },
    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },
  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 255);
      return bytes;
    },
    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join("");
    }
  }
};
var charenc_1 = charenc;
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var isBuffer_1 = function(obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};
function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
}
(function() {
  var crypt2 = cryptExports, utf8 = charenc_1.utf8, isBuffer2 = isBuffer_1, bin = charenc_1.bin, md5$1 = function(message, options) {
    if (message.constructor == String)
      if (options && options.encoding === "binary")
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer2(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
      message = message.toString();
    var m = crypt2.bytesToWords(message), l = message.length * 8, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (var i = 0; i < m.length; i++) {
      m[i] = (m[i] << 8 | m[i] >>> 24) & 16711935 | (m[i] << 24 | m[i] >>> 8) & 4278255360;
    }
    m[l >>> 5] |= 128 << l % 32;
    m[(l + 64 >>> 9 << 4) + 14] = l;
    var FF = md5$1._ff, GG = md5$1._gg, HH = md5$1._hh, II = md5$1._ii;
    for (var i = 0; i < m.length; i += 16) {
      var aa = a, bb = b, cc = c, dd = d;
      a = FF(a, b, c, d, m[i + 0], 7, -680876936);
      d = FF(d, a, b, c, m[i + 1], 12, -389564586);
      c = FF(c, d, a, b, m[i + 2], 17, 606105819);
      b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i + 4], 7, -176418897);
      d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
      c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i + 7], 22, -45705983);
      a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
      d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i + 10], 17, -42063);
      b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
      a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
      d = FF(d, a, b, c, m[i + 13], 12, -40341101);
      c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
      b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
      a = GG(a, b, c, d, m[i + 1], 5, -165796510);
      d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
      c = GG(c, d, a, b, m[i + 11], 14, 643717713);
      b = GG(b, c, d, a, m[i + 0], 20, -373897302);
      a = GG(a, b, c, d, m[i + 5], 5, -701558691);
      d = GG(d, a, b, c, m[i + 10], 9, 38016083);
      c = GG(c, d, a, b, m[i + 15], 14, -660478335);
      b = GG(b, c, d, a, m[i + 4], 20, -405537848);
      a = GG(a, b, c, d, m[i + 9], 5, 568446438);
      d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
      c = GG(c, d, a, b, m[i + 3], 14, -187363961);
      b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
      a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
      d = GG(d, a, b, c, m[i + 2], 9, -51403784);
      c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
      b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
      a = HH(a, b, c, d, m[i + 5], 4, -378558);
      d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
      b = HH(b, c, d, a, m[i + 14], 23, -35309556);
      a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
      d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
      c = HH(c, d, a, b, m[i + 7], 16, -155497632);
      b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
      a = HH(a, b, c, d, m[i + 13], 4, 681279174);
      d = HH(d, a, b, c, m[i + 0], 11, -358537222);
      c = HH(c, d, a, b, m[i + 3], 16, -722521979);
      b = HH(b, c, d, a, m[i + 6], 23, 76029189);
      a = HH(a, b, c, d, m[i + 9], 4, -640364487);
      d = HH(d, a, b, c, m[i + 12], 11, -421815835);
      c = HH(c, d, a, b, m[i + 15], 16, 530742520);
      b = HH(b, c, d, a, m[i + 2], 23, -995338651);
      a = II(a, b, c, d, m[i + 0], 6, -198630844);
      d = II(d, a, b, c, m[i + 7], 10, 1126891415);
      c = II(c, d, a, b, m[i + 14], 15, -1416354905);
      b = II(b, c, d, a, m[i + 5], 21, -57434055);
      a = II(a, b, c, d, m[i + 12], 6, 1700485571);
      d = II(d, a, b, c, m[i + 3], 10, -1894986606);
      c = II(c, d, a, b, m[i + 10], 15, -1051523);
      b = II(b, c, d, a, m[i + 1], 21, -2054922799);
      a = II(a, b, c, d, m[i + 8], 6, 1873313359);
      d = II(d, a, b, c, m[i + 15], 10, -30611744);
      c = II(c, d, a, b, m[i + 6], 15, -1560198380);
      b = II(b, c, d, a, m[i + 13], 21, 1309151649);
      a = II(a, b, c, d, m[i + 4], 6, -145523070);
      d = II(d, a, b, c, m[i + 11], 10, -1120210379);
      c = II(c, d, a, b, m[i + 2], 15, 718787259);
      b = II(b, c, d, a, m[i + 9], 21, -343485551);
      a = a + aa >>> 0;
      b = b + bb >>> 0;
      c = c + cc >>> 0;
      d = d + dd >>> 0;
    }
    return crypt2.endian([a, b, c, d]);
  };
  md5$1._ff = function(a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };
  md5$1._gg = function(a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };
  md5$1._hh = function(a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };
  md5$1._ii = function(a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };
  md5$1._blocksize = 16;
  md5$1._digestsize = 16;
  md5.exports = function(message, options) {
    if (message === void 0 || message === null)
      throw new Error("Illegal argument " + message);
    var digestbytes = crypt2.wordsToBytes(md5$1(message, options));
    return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt2.bytesToHex(digestbytes);
  };
})();
function getLogHost() {
  var hn = window.location.hostname;
  if (hn.endsWith("ydshengxue.com"))
    return "https://ikki.ydshengxue.com/log/single";
  else
    return "https://ikki.youdao.com/log/single";
}
function init(imei) {
  (function(win, doc, loc, ec, dec) {
    var ua = navigator.userAgent.toLowerCase();
    var isMobile = /(mobile|iphone|ipod|blackberry)/.test(ua);
    var single_log_host = getLogHost(), req_retry_deferred = 1e3, cctx = createAContext(), exports = {};
    var queue = win._rlog, _rlog2 = win._rlog = {};
    _rlog2.push = function(arr) {
      var ns = arr[0].split("."), fn = ns.pop();
      var func = exports[fn];
      func && func.apply(this, arr.slice(1));
    };
    exports._setAccount = function(a) {
      a && (cctx.clientId = a);
    };
    exports._setSecret = function(a) {
      a && (cctx.secret = a);
    };
    exports._addPost = function(k, v) {
      exports._removePost(k);
      cctx.post[k] = v;
    };
    exports._trackEvent = function(value, callback) {
      if (!cctx.clientId || !cctx.secret) {
        console.warn("请检查是否调用_setAccount与_setSecret设置终端ID&秘钥");
        return;
      }
      _single_log_request({ action: value }, callback);
    };
    exports._removePost = function(k) {
      if (!k) {
        cctx.post = {};
        return;
      }
      delete cctx.post[k];
    };
    var search_params = function() {
      var search = loc.search.replace(/^\?/, "").split("&"), params = {}, i = 0, t;
      for (i = 0; i < search.length; i++) {
        t = search[i];
        if (t) {
          t = t.split("=");
          params[t[0]] = t[1] === void 0 ? null : dec(t[1]);
        }
      }
      return params;
    }();
    search_params.Pdt && exports._addPost("Pdt", search_params.Pdt);
    search_params.inLoc && exports._addPost("inLoc", search_params.inLoc);
    search_params.outVendor && exports._addPost("outVendor", search_params.outVendor);
    (function() {
      try {
        if (!queue)
          return;
        for (var i = 1, len = queue.length; i < len; i++) {
          if (/_setAccount$/.test(queue[i][0])) {
            var obj = queue[i];
            queue.splice(i, 1);
            queue.splice(0, 0, obj);
          }
        }
        ;
        for (var i = 0, len = queue.length; i < len; i++) {
          _rlog2.push(queue[i]);
        }
        ;
        queue = null;
      } catch (e) {
      }
    })();
    addEvent("mousedown", monitorClick);
    function _single_log_request(obj, callback) {
      var default_params = _get_common_default_params();
      var reqTS = +/* @__PURE__ */ new Date();
      var p = {
        version: "v1",
        clientId: cctx.clientId,
        sign: md5Exports(cctx.secret + reqTS),
        timestamp: reqTS,
        getUserIdWay: "ydCompId",
        // 天马平台额外获取userid
        params: Object.assign(
          default_params,
          cctx.post,
          obj,
          { pegasus_event_id: md5Exports(obj.action + default_params.op_time).substring(0, 8) + "-" + v4() }
        )
      };
      _sendRequest(single_log_host, p, callback);
    }
    function _sendRequest(url, params, callback) {
      var retries = 3;
      runRequest();
      function runRequest() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            try {
              var res = JSON.parse(xhr.responseText);
              if (res.code === 0 && callback)
                callback();
            } catch (error) {
              console.error(error);
            }
          }
        };
        xhr.onerror = function() {
          setTimeout(() => {
            if (retries-- > 0)
              runRequest();
          }, req_retry_deferred);
        };
        xhr.open("POST", url, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(params));
      }
    }
    function _get_cookie(e) {
      var c = document.cookie, g = e + "=", d = c.length, a = 0;
      while (a < d) {
        var f = a + g.length;
        if (c.substring(a, f) == g) {
          var b = c.indexOf(";", f);
          if (b == -1) {
            b = d;
          }
          return unescape(c.substring(f, b));
        }
        a = c.indexOf(" ", a) + 1;
        if (a == 0) {
          break;
        }
      }
      return -1;
    }
    function monitorClick(e) {
      e = e || win.event;
      var target = e.target ? e.target : e.srcElement, body = doc.body;
      for (; target != body; target = target.parentNode || body) {
        if (target.nodeType === 1 && target.disabled !== true) {
          var value = target.getAttribute("data-rlog");
          if (value) {
            _rlog2.push(["_trackEvent", value]);
          }
        }
      }
    }
    function createAContext() {
      return {
        // 终端id(在天马平台注册获得)
        "clientId": "",
        // 终端秘钥(在天马平台注册获得，和终端id一一对应)
        "secret": "",
        // 每次日志发送都会带上的公参
        "post": {}
      };
    }
    function addEvent(type2, fun) {
      if (isMobile && type2 == "mousedown") {
        doc.addEventListener("touchstart", fun, false);
        return;
      }
      doc.addEventListener ? doc.addEventListener(type2, fun, false) : doc.attachEvent("on" + type2, fun);
    }
    function getCookieAccount() {
      var account = _get_cookie("P_INFO");
      if (account == -1) {
        account = "";
      } else {
        account = account.substr(0, account.indexOf("|"));
      }
      return account;
    }
    function _get_common_default_params() {
      var params = {
        imei,
        version: pkg.version,
        referrer: document.referrer,
        op_time: +/* @__PURE__ */ new Date(),
        ne_account: getCookieAccount(),
        path: loc.hash ? loc.hash.indexOf("?") > -1 ? loc.hash.slice(1, loc.hash.indexOf("?")) : loc.hash.slice(1) : loc.pathname,
        current_url: loc.href,
        current_uri: loc.href.indexOf("?") > -1 ? loc.href.slice(0, loc.href.indexOf("?")) : loc.href.slice(0)
      };
      return params;
    }
  })(window, document, location, encodeURIComponent, decodeURIComponent);
}
(async () => {
  try {
    const config = await getUserConfig();
    if (config.userId === "") {
      config.userId = getUUID();
      await updateUserConfig(config);
      console.debug("userId", config.userId);
    }
    init(config.userId);
  } catch (error) {
    console.error(error);
  }
})();
