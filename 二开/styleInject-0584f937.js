var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { g as getUserConfig } from "./common-54d607d2.js";
class StyleInjector {
  constructor(intialStyle, hightlightStyle) {
    __publicField(this, "styleSheet");
    __publicField(this, "hightlightStyle", []);
    __publicField(this, "intialStyle", "");
    this.styleSheet = null;
    this.intialStyle = intialStyle;
    this.hightlightStyle = hightlightStyle;
  }
  async injectStyle(root, style) {
    let styleElement = document.createElement("style");
    root.appendChild(styleElement);
    const config = await getUserConfig();
    if (typeof this.hightlightStyle[config.highLightStyle] === "string") {
      styleElement.innerHTML = this.intialStyle + `.yd-highlight ${this.hightlightStyle[config.highLightStyle]}`;
    } else {
      styleElement.innerHTML = this.intialStyle + `.yd-highlight ${this.hightlightStyle[config.highLightStyle].original}.yd-highlight:hover ${this.hightlightStyle[config.highLightStyle].hover}.yd-highlight:active ${this.hightlightStyle[config.highLightStyle].active}`;
    }
    this.styleSheet = styleElement.sheet;
    if (style) {
      for (let key in style) {
        const selector = key;
        const rule = style[key];
        this.addRule(`${selector} {${rule}}`);
      }
    }
  }
  removeAllStyles() {
    if (this.styleSheet) {
      while (this.styleSheet.cssRules.length > 0) {
        this.styleSheet.deleteRule(0);
      }
    }
  }
  modifyStyle(newCss) {
    if (this.styleSheet) {
      while (this.styleSheet.cssRules.length > 0) {
        this.styleSheet.deleteRule(0);
      }
      this.addRule(newCss);
    }
  }
  addRule(rule) {
    if (this.styleSheet) {
      this.styleSheet.insertRule(rule, this.styleSheet.cssRules.length);
    }
  }
  addClass(className, css) {
    this.addRule(`.${className}  ${css} `);
  }
  modifyClass(className, newCss) {
    if (this.styleSheet) {
      for (let i = 0; i < this.styleSheet.cssRules.length; i++) {
        let rule = this.styleSheet.cssRules[i];
        if (rule instanceof CSSStyleRule && rule.selectorText === "." + className) {
          this.styleSheet.deleteRule(i);
          this.addClass(className, newCss);
          break;
        }
      }
    }
  }
  removeClass(className) {
    if (this.styleSheet) {
      for (let i = this.styleSheet.cssRules.length - 1; i >= 0; i--) {
        let rule = this.styleSheet.cssRules[i];
        if (rule instanceof CSSStyleRule && rule.selectorText === "." + className) {
          this.styleSheet.deleteRule(i);
        }
      }
    }
  }
}
export {
  StyleInjector as S
};
