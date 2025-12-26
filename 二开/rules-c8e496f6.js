var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { r as rules, O as OldQueueSetting } from "./config-b5aec82c.js";
import { g as getUserConfig } from "./common-54d607d2.js";
class Rule {
  constructor() {
    __publicField(this, "rules", rules);
    __publicField(this, "queueSetting", OldQueueSetting);
  }
  async checkRules() {
    try {
      const rules$1 = await getUserConfig();
      if (rules$1.config && rules$1.config.rules && true) {
        this.rules = rules$1.config.rules;
      } else {
        if (false)
          ;
        this.rules = rules;
      }
    } catch (error) {
      console.error(error);
      this.rules = rules;
    }
  }
  async checkQueueSetting() {
    try {
      const rules2 = await getUserConfig();
      if (rules2.config && rules2.config.queueSetting) {
        this.queueSetting = rules2.config.queueSetting;
      } else {
        this.queueSetting = OldQueueSetting;
      }
    } catch (error) {
      console.error(error);
      this.queueSetting = OldQueueSetting;
    }
  }
  async getQueueSetting() {
    await this.checkQueueSetting();
    return this.queueSetting;
  }
  async getRule() {
    await this.checkRules();
    const currentWebsite = window.location.href;
    const webSiteConfig = this.rules.specificRules;
    const generalRule = this.rules.globalRules;
    let rules2 = webSiteConfig.filter((obj) => {
      return obj.pattern.some((pattern) => {
        const result = new RegExp(pattern).test(currentWebsite);
        return result;
      });
    });
    const rule = rules2[0] || {
      injectStyles: {},
      containerSelector: [],
      inlineSelectors: [],
      blockSelectors: [],
      forceBlockSelectors: [],
      forceInlineSelectors: [],
      noIncludeSelectors: [],
      noTranslateSelectors: [],
      textCount: 4,
      wordCount: 2
    };
    return {
      textCount: 4,
      wordCount: 2,
      blackList: [...generalRule.blackList ?? [], ...rule.blackList ?? []],
      injectStyles: { ...generalRule.injectStyles ?? {}, ...rule.injectStyles ?? {} },
      containerSelector: [...generalRule.containerSelector ?? [], ...rule.containerSelector ?? []],
      inlineSelectors: [...(generalRule == null ? void 0 : generalRule.inlineSelectors) ?? [], ...rule.inlineSelectors ?? []],
      blockSelectors: [...generalRule.blockSelectors ?? [], ...rule.blockSelectors ?? []],
      noIncludeSelectors: [...generalRule.noIncludeSelectors ?? [], ...rule.noIncludeSelectors ?? []],
      noTranslateSelectors: [...generalRule.noTranslateSelectors ?? [], ...rule.noTranslateSelectors ?? []],
      forceBlockSelectors: [...rule.forceBlockSelectors ?? []],
      forceInlineSelectors: [...rule.forceInlineSelectors ?? []],
      ignoreImageSize: rule.ignoreImageSize,
      removeInnerNewlinesAndMultipleSpaces: rule.removeInnerNewlinesAndMultipleSpaces ?? false,
      justContainer: rule.justContainer ?? false,
      shouldTranslateBlock: [...rule.shouldTranslateBlock ?? []],
      shouldTranslateInline: [...rule.shouldTranslateInline ?? []]
    };
  }
}
export {
  Rule as R
};
