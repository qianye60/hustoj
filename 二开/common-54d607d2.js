var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { b as browserPolyfillExports } from "./browser-polyfill-1bf53692.js";
import { _ as _global } from "./shim-5b326084.js";
var freeGlobal = typeof _global == "object" && _global && _global.Object === Object && _global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$7 = Object.prototype;
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
var nativeObjectToString$1 = objectProto$7.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$5.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$6 = Object.prototype;
var nativeObjectToString = objectProto$6.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isArray = Array.isArray;
const isArray$1 = isArray;
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
function identity(value) {
  return value;
}
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$5 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$4).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
const defineProperty$1 = defineProperty;
var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
  return defineProperty$1(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
const baseSetToString$1 = baseSetToString;
var setToString = shortOut(baseSetToString$1);
const setToString$1 = setToString;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
function baseRest(func, start) {
  return setToString$1(overRest(func, start, identity), func + "");
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
var objectProto$4 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$4;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$1 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$1;
}
var objectProto$3 = Object.prototype;
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$3.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var Buffer2 = moduleExports$1 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule && freeModule.require && freeModule.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$2.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$1.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var defaults = baseRest(function(object, sources) {
  object = Object(object);
  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : void 0;
  if (guard && isIterateeCall(sources[0], sources[1], guard)) {
    length = 1;
  }
  while (++index < length) {
    var source = sources[index];
    var props = keysIn(source);
    var propsIndex = -1;
    var propsLength = props.length;
    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];
      if (value === void 0 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
        object[key] = source[key];
      }
    }
  }
  return object;
});
const defaults$1 = defaults;
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
const defaultConfig = {
  userId: "",
  language: "zh-CN",
  engine: "youdao",
  retries: 2,
  highLightStyle: 0,
  str: "",
  installTime: "",
  inlineTranslate: true,
  aiLabel: true,
  mode: "dual",
  domain: 0,
  rated: false
};
const localDefaultConfig = {
  configUpdateTime: 0,
  config: {},
  strategy: {},
  subtitles: {},
  inputStrategy: { "reddit.com": 1, "stackoverflow.com": 1, "twitter.com": 1 }
};
async function getUserConfig() {
  const config = await browserPolyfillExports.storage.sync.get(defaultConfig);
  const localConfig = await browserPolyfillExports.storage.local.get(localDefaultConfig);
  const configDefaults = defaults$1(config, defaultConfig);
  const localConfigDefaults = defaults$1(localConfig, localDefaultConfig);
  return {
    ...configDefaults,
    ...localConfigDefaults
  };
}
async function updateUserConfig(config) {
  const syncConfig = {
    userId: config.userId,
    language: config.language,
    engine: config.engine,
    retries: config.retries,
    highLightStyle: config.highLightStyle,
    str: config.str,
    installTime: config.installTime,
    inlineTranslate: config.inlineTranslate,
    aiLabel: config.aiLabel,
    mode: config.mode,
    domain: config.domain,
    rated: config.rated
  };
  const localConfig = {
    strategy: config.strategy,
    subtitles: config.subtitles,
    inputStrategy: config.inputStrategy,
    configUpdateTime: config.configUpdateTime,
    config: config.config
  };
  await browserPolyfillExports.storage.sync.set(syncConfig);
  await browserPolyfillExports.storage.local.set(localConfig);
}
const betterOpen = async (url) => {
  var _a;
  const currentTab = await browserPolyfillExports.tabs.query({ active: true, currentWindow: true });
  const index = ((_a = currentTab[0]) == null ? void 0 : _a.index) + 1 || 0;
  const tabs = await browserPolyfillExports.tabs.query({
    url,
    discarded: false,
    status: "complete"
  });
  if (tabs.length) {
    await browserPolyfillExports.tabs.reload(tabs[0].id);
    await browserPolyfillExports.tabs.update(tabs[0].id, { active: true });
    return;
  }
  await browserPolyfillExports.tabs.create({ url, active: true, index });
};
const getUUID = () => {
  return v4().replace(/-/g, "");
};
const getRootDomain = (url) => {
  if (typeof url === "string")
    url = new URL(url);
  const domain = url.hostname;
  const elems = domain.split(".");
  const iMax = elems.length - 1;
  const elem1 = elems[iMax - 1];
  const elem2 = elems[iMax];
  const isSecondLevelDomain = iMax >= 3 && (elem1 + elem2).length <= 5;
  return (isSecondLevelDomain ? elems[iMax - 2] + "." : "") + elem1 + "." + elem2;
};
function inViewport(element) {
  if (!element)
    return true;
  if (1 !== element.nodeType)
    return false;
  var html = document.documentElement;
  var rect = element.getBoundingClientRect();
  return !!rect && rect.bottom >= 0 && rect.right >= 0 && rect.left <= html.clientWidth && rect.top <= html.clientHeight;
}
function getExtensionUrl(path) {
  return browserPolyfillExports.runtime.getURL(path);
}
function getAltKeyText() {
  if (navigator.platform.indexOf("Win") !== -1) {
    return "Alt";
  } else if (navigator.platform.indexOf("Mac") !== -1) {
    return "⌥";
  } else {
    return "";
  }
}
const isForbiddenUrl = async () => {
  const tabs = await browserPolyfillExports.tabs.query({ active: true, currentWindow: true });
  const url = tabs[0].url || "http";
  const forbiddenUrls = [
    "chrome://",
    "about:",
    "chrome-extension://",
    "safari-extension://",
    "https://chromewebstore.google.com/"
  ];
  for (let forbiddenUrl of forbiddenUrls) {
    if (url.startsWith(forbiddenUrl)) {
      return true;
    }
  }
  return false;
};
const getUrlWithoutQuery = () => {
  const urlObj = new URL(window.location.href);
  return urlObj.origin + urlObj.pathname;
};
const track = async (window2, action, params, withUrl = true) => {
  try {
    const sendRlog = (action2, params2) => {
      if (typeof window2 !== "undefined") {
        if (params2) {
          Object.keys(params2).forEach((k) => window2._rlog.push(["_addPost", k, params2[k]]));
          window2._rlog.push(["_trackEvent", action2]);
          Object.keys(params2).forEach((k) => window2._rlog.push(["_removePost", k]));
        } else {
          window2._rlog.push(["_trackEvent", action2]);
        }
      }
    };
    window2._rlog.push(["_setAccount", 118]);
    window2._rlog.push(["_setSecret", "95fd3ae41a0547d89c2ed953c9fb6d10"]);
    const manifestData = browserPolyfillExports.runtime.getManifest();
    const config = await getUserConfig();
    sendRlog(action, withUrl ? {
      ...params,
      url: window2.location.href,
      domain: getRootDomain(window2.location.href),
      hostname: window2.location.hostname,
      mgVersion: manifestData.version,
      isntallTime: config.installTime
    } : params);
  } catch (error) {
    console.error(action, error);
  }
};
const trackWithAciveTab = async (action, params, withUrl = true) => {
  try {
    const tabs = await browserPolyfillExports.tabs.query({ active: true, currentWindow: true });
    await browserPolyfillExports.tabs.sendMessage(tabs[0].id, { action: "track", event: action, params, withUrl });
  } catch (error) {
    console.error(action, error);
  }
};
class UuidMap {
  constructor() {
    __publicField(this, "objToUuid");
    __publicField(this, "uuidToValue");
    this.objToUuid = /* @__PURE__ */ new Map();
    this.uuidToValue = /* @__PURE__ */ new Map();
  }
  generateUuid() {
    return v4();
  }
  set(obj, value) {
    let uuid;
    if (!this.objToUuid.has(obj)) {
      uuid = this.generateUuid();
      this.objToUuid.set(obj, uuid);
      this.uuidToValue.set(uuid, [value]);
    } else {
      uuid = this.objToUuid.get(obj);
      let values = this.uuidToValue.get(uuid);
      values.push(value);
    }
    return uuid;
  }
  get(obj) {
    const uuid = this.objToUuid.get(obj);
    return uuid ? this.uuidToValue.get(uuid) : void 0;
  }
  has(obj) {
    const uuid = this.objToUuid.get(obj);
    return uuid ? this.uuidToValue.has(uuid) : false;
  }
  getById(uuid) {
    return this.uuidToValue.get(uuid);
  }
  hasById(uuid) {
    return this.uuidToValue.has(uuid);
  }
  forEachValue(callback) {
    this.uuidToValue.forEach((value, uuid) => {
      callback(value, uuid);
    });
  }
}
export {
  isArguments$1 as A,
  setToString$1 as B,
  overRest as C,
  keysIn as D,
  toSource as E,
  nodeUtil$1 as F,
  baseUnary as G,
  isBuffer$1 as H,
  isTypedArray$1 as I,
  isLength as J,
  isIndex as K,
  identity as L,
  isFunction as M,
  Symbol$2 as S,
  UuidMap as U,
  getAltKeyText as a,
  getUUID as b,
  getRootDomain as c,
  trackWithAciveTab as d,
  betterOpen as e,
  getExtensionUrl as f,
  getUserConfig as g,
  inViewport as h,
  isForbiddenUrl as i,
  getUrlWithoutQuery as j,
  isObjectLike as k,
  baseGetTag as l,
  isArray$1 as m,
  isObject as n,
  getNative as o,
  defineProperty$1 as p,
  eq as q,
  root$1 as r,
  baseRest as s,
  track as t,
  updateUserConfig as u,
  v4 as v,
  isIterateeCall as w,
  isPrototype as x,
  isArrayLike as y,
  arrayLikeKeys as z
};
