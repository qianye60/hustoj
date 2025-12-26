import { b as browserPolyfillExports } from "./browser-polyfill-1bf53692.js";
const ping = async () => {
  const result = await browserPolyfillExports.runtime.sendMessage({
    action: "updateStr"
  });
  return result;
};
const youdao = async (text, to = "zh-CHS", domain = 0) => {
  const result = await browserPolyfillExports.runtime.sendMessage({
    action: "ydTranslate",
    text,
    to,
    domain
  });
  return result;
};
const youdaollm = async (text) => {
  const result = await browserPolyfillExports.runtime.sendMessage({
    action: "ydTranslateLLM",
    text
  });
  return result;
};
const updateBadge = async (status) => {
  try {
    const result = await browserPolyfillExports.runtime.sendMessage({
      action: "updateBadge",
      status
    });
    return result;
  } catch (error) {
    console.error("updateBadge, error", error);
  }
};
const shouldUpdate = async (time) => {
  const result = await browserPolyfillExports.runtime.sendMessage({
    action: "shouldUpdate",
    time
  });
  return result;
};
const addImgTranslateJob = async (referrer, src) => {
  const result = await browserPolyfillExports.runtime.sendMessage({
    action: "ocr",
    referrer,
    imageUrl: src
  });
  return result;
};
const setOffscreen = async (status) => {
  const result = await browserPolyfillExports.runtime.sendMessage({
    action: "setOffscreen",
    status
  });
  return result;
};
const prefetchModel = async (type) => {
  const result = await browserPolyfillExports.runtime.sendMessage({
    action: "prefetchModel",
    type
  });
  return result;
};
export {
  shouldUpdate as a,
  youdaollm as b,
  addImgTranslateJob as c,
  ping as d,
  prefetchModel as p,
  setOffscreen as s,
  updateBadge as u,
  youdao as y
};
