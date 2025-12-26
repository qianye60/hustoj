var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { P as PQueue } from "./index-4c0d8093.js";
import { b as browserPolyfillExports } from "./browser-polyfill-1bf53692.js";
import { c as getRootDomain, g as getUserConfig, u as updateUserConfig, t as track, U as UuidMap, h as inViewport, j as getUrlWithoutQuery } from "./common-54d607d2.js";
import { c as commonjsGlobal } from "./_commonjsHelpers-7a77ea84.js";
import { R as Rule } from "./rules-c8e496f6.js";
import { h as hightlightStyle } from "./config-b5aec82c.js";
import { S as StyleInjector } from "./styleInject-0584f937.js";
import { y as youdao, b as youdaollm, s as setOffscreen, p as prefetchModel, c as addImgTranslateJob, d as ping, u as updateBadge, a as shouldUpdate } from "./service-ba894d8a.js";
import { A as r$1, B as s$1, p as pushScopeId, n as popScopeId, d as defineComponent, L as L$2, C as b$2, O as O$1, D as A$1, E as g$2, G as C$1, H as nextTick, a as openBlock, i as createBlock, I as withScopeId, g as resolveComponent, c as createElementBlock, b as createBaseVNode, F as Fragment, s as renderSlot, j as createCommentVNode, J as normalizeStyle, q as normalizeClass, K as withKeys, w as withCtx, m as createVNode, M as normalizeProps, N as guardReactiveProps, y as useCssVars, r as ref, P as reactive, x as computed, o as onMounted, e as createTextVNode, Q as withModifiers, u as unref, _ as _export_sfc, R as defineCustomElement, S as watch, v as watchEffect, t as toDisplayString, l as renderList, T as onUnmounted, U as createStaticVNode } from "./_plugin-vue_export-helper-2f49cf34.js";
import "./shim-5b326084.js";
nGram(2);
const trigram = nGram(3);
function nGram(n2) {
  if (typeof n2 !== "number" || Number.isNaN(n2) || n2 < 1 || n2 === Number.POSITIVE_INFINITY) {
    throw new Error("`" + n2 + "` is not a valid argument for `n-gram`");
  }
  return grams;
  function grams(value) {
    const nGrams = [];
    if (value === null || value === void 0) {
      return nGrams;
    }
    const source = typeof value.slice === "function" ? value : String(value);
    let index = source.length - n2 + 1;
    if (index < 1) {
      return nGrams;
    }
    while (index--) {
      nGrams[index] = source.slice(index, index + n2);
    }
    return nGrams;
  }
}
const js = /\s+/g;
const html = /[\t\n\v\f\r ]+/g;
function collapseWhiteSpace(value, options) {
  if (!options) {
    options = {};
  } else if (typeof options === "string") {
    options = { style: options };
  }
  const replace = options.preserveLineEndings ? replaceLineEnding : replaceSpace;
  return String(value).replace(
    options.style === "html" ? html : js,
    options.trim ? trimFactory(replace) : replace
  );
}
function replaceLineEnding(value) {
  const match = /\r?\n|\r/.exec(value);
  return match ? match[0] : " ";
}
function replaceSpace() {
  return " ";
}
function trimFactory(replace) {
  return dropOrReplace;
  function dropOrReplace(value, index, all) {
    return index === 0 || index + value.length === all.length ? "" : replace(value);
  }
}
const own$1 = {}.hasOwnProperty;
function clean(value) {
  if (value === null || value === void 0) {
    return "";
  }
  return collapseWhiteSpace(String(value).replace(/[\u0021-\u0040]+/g, " ")).trim().toLowerCase();
}
function trigrams(value) {
  return trigram(" " + clean(value) + " ");
}
function asDictionary(value) {
  const values = trigrams(value);
  const dictionary = {};
  let index = -1;
  while (++index < values.length) {
    if (own$1.call(dictionary, values[index])) {
      dictionary[values[index]]++;
    } else {
      dictionary[values[index]] = 1;
    }
  }
  return dictionary;
}
function asTuples(value) {
  const dictionary = asDictionary(value);
  const tuples = [];
  let trigram2;
  for (trigram2 in dictionary) {
    if (own$1.call(dictionary, trigram2)) {
      tuples.push([trigram2, dictionary[trigram2]]);
    }
  }
  tuples.sort(sort$1);
  return tuples;
}
function sort$1(a2, b2) {
  return a2[1] - b2[1];
}
const expressions = {
  cmn: /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFE2\uDFE3\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF]/g,
  Latin: /[A-Za-z\u00AA\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uAB66-\uAB69\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A]|\uD801[\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]/g,
  Cyrillic: /[\u0400-\u0484\u0487-\u052F\u1C80-\u1C88\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69F\uFE2E\uFE2F]|\uD838[\uDC30-\uDC6D\uDC8F]/g,
  Arabic: /[\u0600-\u0604\u0606-\u060B\u060D-\u061A\u061C-\u061E\u0620-\u063F\u0641-\u064A\u0656-\u066F\u0671-\u06DC\u06DE-\u06FF\u0750-\u077F\u0870-\u088E\u0890\u0891\u0898-\u08E1\u08E3-\u08FF\uFB50-\uFBC2\uFBD3-\uFD3D\uFD40-\uFD8F\uFD92-\uFDC7\uFDCF\uFDF0-\uFDFF\uFE70-\uFE74\uFE76-\uFEFC]|\uD803[\uDE60-\uDE7E\uDEFD-\uDEFF]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB\uDEF0\uDEF1]/g,
  ben: /[\u0980-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FE]/g,
  Devanagari: /[\u0900-\u0950\u0955-\u0963\u0966-\u097F\uA8E0-\uA8FF]|\uD806[\uDF00-\uDF09]/g,
  jpn: /[\u3041-\u3096\u309D-\u309F]|\uD82C[\uDC01-\uDD1F\uDD32\uDD50-\uDD52]|\uD83C\uDE00|[\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00\uDD20-\uDD22\uDD55\uDD64-\uDD67]|[㐀-䶵一-龯]/g,
  jav: /[\uA980-\uA9CD\uA9D0-\uA9D9\uA9DE\uA9DF]/g,
  kor: /[\u1100-\u11FF\u302E\u302F\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/g,
  tel: /[\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3C-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C5D\u0C60-\u0C63\u0C66-\u0C6F\u0C77-\u0C7F]/g,
  tam: /[\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA]|\uD807[\uDFC0-\uDFF1\uDFFF]/g,
  guj: /[\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AF1\u0AF9-\u0AFF]/g,
  kan: /[\u0C80-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1-\u0CF3]/g,
  mal: /[\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4F\u0D54-\u0D63\u0D66-\u0D7F]/g,
  mya: /[\u1000-\u109F\uA9E0-\uA9FE\uAA60-\uAA7F]/g,
  pan: /[\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A76]/g,
  amh: /[\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u137C\u1380-\u1399\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]/g,
  tha: /[\u0E01-\u0E3A\u0E40-\u0E5B]/g,
  sin: /[\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4]|\uD804[\uDDE1-\uDDF4]/g,
  ell: /[\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65]|\uD800[\uDD40-\uDD8E\uDDA0]|\uD834[\uDE00-\uDE45]/g
};
const data = {
  Latin: {
    spa: " de|de |os | la| a |la | y |ón |ión|es |ere|rec|ien|o a|der|ció|a p|cho|ech|en |ent|a l|aci|e d|el |ona|na | co|as |al |da | to|ene|e l| en| el| pe|nte|tod|ho | su|per|ad | ti|a t|ers|tie| se|rso| pr|son|e s|te |oda|cia|n d|o d|dad|ida| in|ne | es|ion|cio|s d|con|est|a e| po|men| li|res|nci|su |to |tra| re|n e| lo|tad| na|los|a s| o |ia |que| pa|rá |pro| un|s y|ual|s e|lib|nac|do |ra |er |nal|ue | qu|e e|a d|ar |nes|ica|a c|sta|ser|or |ter|se |por|cci|io |des|ado|les|one|a a|del|l d|ndi| so| cu|s p|ale|s n|ame|par|ici|oci|una|ber|s t|rta|com| di|e a|imi|o s|e c|ert|o e|dos|las|o p|ant|dic|nto| al|ara|ibe|enc|cas| as|e p|ten|ali|o t|soc|y l|n c|s l|l t|pre|nta|so |tos|y a|ria|n t|die|a u| fu|no |l p|ial|qui|dis|s o|hos|gua|igu| ig| ca|sar| ma|l e| ac|tiv|s a|re |nad|vid|era| tr|ier|cua|n p|cla|ade|bre|s s|esa|ntr|ecc|a i| le|lid|das|d d|ido|ari|ind|ada|nda|fun|mie|ca |tic|eli|ta |y d|nid|e i|n l|ios|o y|esp|iva|y e|mat|bli|r a|drá|tri|cti|tal|rim|ont|erá|us |sus|end|pen|tor|ito|ond|ori|uie|lig|n a|ist|rac|lar|rse|tar|mo |omo|ibr|odo|edi|med| me|nio|a y|eda|isf|lo |aso|l m|ias|ico|lic|ple|ste|act|tec|ote|rot|ele|ura| ni|ie |adi|u p|seg|s i|un |und|a n|lqu|alq|o i|inc|sti| si|n s|ern",
    eng: "the| th| an|he |nd |ion|and| to|to |tio| of|on |of | in|al |ati|or |ght|igh|rig| ri|ne |ent|one|ll |is |as |ver|ed | be|e r|in |t t|all|eve|ht | or|ery|s t|ty | ev|e h|yon| ha|ryo|e a|be |his| fr|ng |d t|has| sh|ing| hi|sha| pr| co| re|hal|nal|y a|s a|n t|ce |men|ree|fre|e s|l b|nat|for|ts |nt |n a|ity|ry |her|nce|ect|d i| pe|pro|n o|cti| fo|e e|ly |es | no|ona|ny |any|er |re |f t|e o| de|s o| wi|ter|nte|e i|ons| en| ar|res|ers|y t|per|d f| a | on|ith|l a|e t|oci|soc|lit| as| se|dom|edo|eed|nti|s e|t o|oth|wit| di|equ|t a|ted|st |y o|int|e p| ma| so| na|l o|e c|ch |d a|enc|th |are|ns |ic | un| fu|tat|ial|cia| ac|hts|nit|qua| eq| al|om |e w|d o|f h|ali|ote|n e| wh|r t|sta|ge |thi|o a|tit|ual|an |te |ess| ch|le |ary|e f|by | by|y i|tec|uni|o t|o o| li|no | la|s r| su|inc|led|rot|con| pu| he|ere|imi|r a|ntr| st| ot|eli|age|dis|s d|tle|itl|hou|son|duc|edu| wo|ate|ble|ces|at | at| fa|com|ive|o s|eme|o e|aw |law|tra|und|pen|nde|unt|oun|n s|s f|f a|tho|ms | is|act|cie|cat|uca| ed|anc|wor|ral|t i| me|o f|ily|pri|ren|ose|s c|en |d n|l c|ful|rar|nta|nst| ag|l p|min|din|sec|y e| tr|rso|ich|hic|whi|cou|ern|uri|r o|tic|iti|igi|lig|rat|rth|t f|oms|rit|d r|ee |e b|era|rou|se |ay |rs | ho|abl|e u",
    por: "de | de| se|ão |os |to |em | e |do |o d| di|er |ito|eit|ser|ent|ção| a |dir|ire|rei|o s|ade|dad|uma|as |no |e d| to|nte| co|o t|tod| ou|men|que|s e|man| pr| in| qu|es | te|hum|odo|e a|da | hu|ano|te |al |tem|o e|s d|ida|m d| pe| re|o a|ou |r h|e s|cia|a e| li|o p| es|res| do| da| à |ual| em| su|açã|dos|a p|tra|est|ia |con|pro|ar |e p|is | na|rá |qua|a d| pa|com|ais|o c|ame|erá| po|uer|sta|ber|ter| o |ess|ra |e e|das|o à|nto|nal|o o|a c|ido|rda|erd| as|nci|sua|ona|des|ibe|lib|e t|ado|s n|ua |s t|ue | so|ica|ma |lqu|alq|tos|m s|a l|per|ada|oci|soc|cio|a n|par|aci|s a|pre|ont|m o|ura|a s| um|ion|e o|or |e r|pel|nta|ntr|a i|io |nac|ênc|str|ali|ria|nst| tr|a q|int|o n|a o|ca |ela|uçã|lid|e l| at|sen|ese|r d|s p|egu|seg|vid|pri|sso|ém |ime|tic|dis|raç|eci|ara| ca|nid|tru|ões|ass|seu|por|a a|m p| ex|so |r i|eçã|teç|ote|rot| le| ma|ing|a t|ran|era|rio|l d|eli|ça |sti| ne|cid|ern|utr|out|r e|e c|tad|gua|igu| ig| os|s o|ruç|ins|çõe|ios| fa|e n|sse| no|re |art|r p|rar|u p|inc|lei|cas|ico|uém|gué|ngu|nin| ni|gur|la |pen|nça|na |içã|ião|cie|ist|sem|ta |ele|e f|om |tro| ao|rel|m a|s s|tar|eda|ied|uni|e m|s i|a f|ias| cu| ac|r a|á a|rem|ei |omo|rec|for|s f|esc|ant|à s| vi|o q|ver|a u|nda|und|fun",
    ind: "an |ang|ng | da|ak | pe|ata| se| ke| me|dan| di| be|ber|kan|ran|hak|per|yan| ya|nga|nya|gan| at|ara| ha|eng|asa|ora|men|n p|n k|erh|rha|n d|ya |ap |at |as |tan|n b|ala|a d| or|a s|san|tas|eti|uk |pen|g b|set|ntu|n y|tia|iap|k m|eba|aan| un|n s|tuk|k a|p o|am |lam| ma|unt| de|ter|bas|beb|dak|end|i d|pun|mem|tau|dal|ama|keb|aka|ika|n m| ba|di |ma | sa|den|au |nda|n h|eri| ti|ela|k d|un |n a|ebe|ana|ah |ra |ida|uka| te|al |ada|ri |ole|tid|ngg|lak|leh|dap|a p|dil|g d|ena|eh |gar|na |ert|apa|um |tu |atu|a m|sam|ila|har|n t|asi|ban|erl|t d|bat|uat|ta |lan|adi|h d|neg| ne|kum|mas|nan|pat|aha| in|l d|emp|sem|rus|sua|ser|uan|era|ari|erb|kat|man|a b|g s|rta|ai |nny|n u|ung|ndi|han|uku|huk| hu|sa |ers|in | la|ka | su|ann|car|kes|aku|dip|i s|a a|erk|n i|lai|rga|aru|k h|i m|rka|a u|us |nak|emb|gga|nta|iba| pu|ind|s p|ent|mel|ina|min|ian|dar|ni |rma|lua|rik|ndu|lin|sia|rbu|g p|k s|da |aya|ese|u d|ega|nas|ar |ipe|yar|sya|ik |aga| ta|ain|ua |arg|uar|iny|pem|ut |si |dun|eor|seo|rak|ngs|ami|kel|ini|g t|dik|mer|emu|aks|rat|uru|ewa|il |enu|any|kep|pel|asu|rli|ia |dir|jam|mba|mat|pan|g m|ses|sar|das|kuk|bol|ili|u k|gsa|u p|a k|ern|ant|raa|t p|ema|mua|idi|did|t s|i k|rin|erm|esu|ger|elu|nja|enj|ga |dit",
    fra: " de|es |de |ion|nt |tio|et |ne |on | et|ent|le |oit|e d| la|e p|la |it | à |t d|roi|dro| dr| le|té |e s|ati|te |re | to|s d|men|tou|e l|ns | pe| co|son|que| au| so|e a|onn|out| un| qu| sa| pr|ute|eme| l’|t à| a |e e|con|des| pa|ue |ers|e c| li|a d|per|ont|s e|t l|les|ts |tre|s l|ant| ou|cti|rso|ou |ce |ux |à l|nne|ons|ité|en |un | en|er |une|n d|sa |lle| in|nte|e t| se|lib|res|a l|ire| d’| re|é d|nat|iqu|ur |r l|t a|s s|aux|par|nal|a p|ans|dan|qui|t p| dé|pro|s p|air| ne| fo|ert|s a|nce|au |ui |ect|du |ond|ale|lit| po|san| ch|és | na|us |com|our|ali|tra| ce|al |e o|e n|rté|ber|ibe|tes|r d|e r|its| di|êtr|pou|été|s c|à u|ell|int|fon|oci|soc|ut |ter| da|aut|ien|rai| do|iss|s n| ma|bli|ge |est|s o| du|ona|n p|pri|rs |éga| êt|ous|ens|ar |age|s t| su|cia|u d|cun|rat| es|ir |n c|e m| ét|t ê|a c| ac|ote|n t|ein| tr|a s|ndi|e q|sur|ée |ser|l n| pl|anc|lig|t s|n e|s i|t e| ég|ain|omm|act|ntr|tec|gal|ul | nu| vi|me |nda|ind|soi|st | te|pay|tat|era|il |rel|n a|dis|n s|pré|peu|rit|é e|t é|bre|sen|ill|l’a|d’a| mo|ass|lic|art| pu|abl|nta|t c|rot| on| lo|ure|l’e|ava|ten|nul|ivi|t i|ess|ys |ays| fa|ine|eur|rés|cla|tés|oir|eut|e f|utr|doi|ibr|ais|ins|éra|’en|iét|l e|s é|nté| ré|ssi| as|nse|ces|é a",
    deu: "en |er |der|ein| un|nd |und|ung|cht|ich| de|sch|ng | ge|ine|ech|gen|rec|che|ie | re|eit| au|ht |die| di| ha|ch | da|ver| zu|lic|t d|in |auf| ei| in| be|hen|nde|n d|uf |ede| ve|it |ten|n s|sei|at |jed| je| se|and|rei|s r|den|ter|ne |hat|t a|r h|zu |das|ode| od|as |es | an|fre|nge| we|n u|run| fr|ere|e u|lle|ner|nte|hei|ese| so|rde|wer|ige| al|ers|n g|hte|d d| st|n j|lei|all|n a|nen|ege|ent|bei|g d|erd|t u|ren|nsc|chu| gr|kei|ens|le |ben|aft|haf|cha|tli|ges|e s| si|men| vo|lun|em |r s|ion|te |len|gru|gun|tig|unt|uch|spr|n e|ft |ei |e f| wi| sc|r d|n n|geh|r g|dar|sta|erk| er|r e|sen|eic|gle| gl|lie|e e|tz |fen|n i|nie|f g|t w|des|chl|ite|ihe|eih|ies|ruc|st |ist|n w|h a|n z|e a| ni|ang|rf |arf|gem|ale|ati|on |he |t s|ach| na|end|n o|pru|ans|sse|ern|aat|taa|ehe|e d|hli|hre|int|tio|her|nsp|de |mei| ar|r a|ffe|e b|wie|erf|abe|hab|ndl|n v|sic|t i|han|ema|nat|ber|ied|geg|d s|nun|d f|ind| me|gke|igk|ieß| fa|igu|hul|r v|dig|rch|urc|dur| du|utz|hut|tra|aus|alt|bes|str|ell|ste|ger|r o|esc|e g|rbe|arb|ohn|r b|mit|d g|r w|ntl|sow|n h|nne|etz|raf|dlu| ih|lte|man|iem|erh|eru| is|dem|lan|rt |son|isc|eli|rel|n r|e i|rli|r i| mi|e m|ild|bil| bi|eme| en|ins|für| fü|gel|öff| öf|owi|ill|wil|e v|ric|f e",
    jav: "ng |an | ka|ang|ing|kan| sa|ak |lan| la|hak| pa| ha|ara|ne |abe| in|n k|ngg|ong|ane|nga|ant|won|uwo| an| uw|nin|ata|n u|en |ra |tan| da|ran|ana| ma|nth|ake|ben|beb|hi |ke |sab|nda| ng|adi|thi|nan|a k| ba|san|asa|ni |e h|e k|g k| ut|pan|awa| be|eba|gan|g p|dan| wa|bas|aka|dha|yan|sa |arb|man| di|wa |g d| na|g n|ban| tu|n s|ung|wen|g s|rbe|dar|dak|di |g u|ora|aya|be |ah |a s|eni| or|han|as | pr|a n|na |iya|a a|kar|at |a l|mar|uwe|duw|uta|und|n p|asi|pa | si|ala|n n| un|kab|oni|ya |i h|gar|g b|yat|tum|ta |n m|i k|apa|taw| li|ani| ke|al |ka |kal|ngk|ega| ne|nal|n i|g a|ggo|ina|we |ena|dad|iba|awi|aga|a p| ta|sar|adh|awe|and|uju|ind|min|sin|ndu|uwa|gge|n l|ggu|ngs|n b|a b|pra|iji|n a|ha | bi|kat|go | ku|e p|ron|kak|ngu|a u|gsa|war|nya|g t|pad|bis|k b|i w|ae |wae| nd|ali|a m|er |sak|e s|ku |liy|ama|i l|eh |isa|arg|n t|a d|kap|i s|ayo|gay| pe|ndh|bad|pri|neg|tow|uto|eda|bed|il |ih | ik|ur |k k|rta|art|i p|rga|lak|ami|ro |aro|yom|r k|e d|a w|kon|rib|eng|ger|g l|ras|dil| ti|k l|rap|mra|uma| pi|k h|n d|gaw|wat|ga |k n|ar |per| we|oma|k p|jro|ajr|saj|ase|ini|ken|saw|ona|nas|kas|h k|i t| um|tin|wo | me|aba|rak|pag|yar|sya|t k| te| mu|ngl| ni|i b|men|ate|a i|aku|ebu|a t| du|g m|owo|mat| lu|amp",
    vie: "ng |̣c |́c | qu|à | th|nh | ng|̣i |̀n |và| va| nh|uyê| ph|quy| ca|ền|yề|̀nh|̀i |̣t | ch|ó | tr|ngư|i n| gi|gươ|ời|ườ|́t | co|ượ| cu|ác|ự |ợc| kh| đư|đươ| tư|có| ha|ông|c t| đê|n t|i đ|ìn|̀u |cá|gia|́i |ọi|mọ| mo|ều|iệ|đề|u c|như|pha| ba| bi|ất|̉a |ủa|củ|hôn| đô|g t|́ q|̃ng| ti|tự|t c|̣n | la|n đ|n c|n n|hiê|ch |ay |hay| vi|ân | đi| na|bả| ho|do | do| tô| hi|ội|há|ị |nà|̀ t|ới|hân| mô|́p |àn|̣ d|́ch|̣p |̀o |ào|khô|́n |ột|mộ| hô|ia |ốc|c h|hữ|i v|g n|́ng|uố|quô|h t|ôn |ên |n v|nhâ|̣ t| bâ|i c|g v|̉ng|iế|c c|ật|thư|hư |ướ|̉n | vơ| cô|c đ| đo| sư|t t|ộc|ữn|vớ| vê|ả |̣ng|g đ|̉o |ảo|uậ| đa|bị|là|sự|bấ|hà|hộ|i t|ản|hươ|̀ng|tro|̉m |o v| mi|ể |ục|i h|ức|áp|g c|̃ h|iá|n b|̉i |a m|h c|côn|ện|ớc|hạ|độ| du| cư|a c|n h|tha|ã | xa|́o |áo|ín|̀y |g b| hư|g h|ong|ron|̀ c|cho|̀ n|mì|ực|h v|c b| lu|i b|ệ |ai |ế |̣ c|xã|kha|c q|iể|tộ|ối|đố|á |hoa|o h|h đ|cả|n l|họ|tiê|y t|̉ c|ại|án|̀ đ|oà|y đ|chi|̉ n|phâ|ề |thu|iên|dụ|o c|i m|luâ|c p|ốn|c l|́ c|ũn|cũ|c g|c n|qua|n g|c m|o n|ải|hả|́ t|ho |về| tâ| hơ|o t|ở |hứ|hì|viê|̀m |̉ t|đó|thô|ứ |cứ|hí|́nh|ày|ởn|ưở| bă|tri| ta|m v|c v|ợp|hợ|h m| nư|ết|thi|ặc|ngh|uy ",
    ita: " di|to | in|ion|la | de|di |re |e d|ne | e |zio|rit|a d|one|o d|ni |le |lla|itt|ess| al|iri|dir|tto|ent|ell|i i|del|ndi|ere|ind|o a| co|te |tà |ti |a s|uo |e e|gni|azi| pr|idu|ivi|duo|vid|div|ogn| og| es|i e| ha|all|ale|nte|e a|men|ser| su| ne|e l|za |i d|per|a p|ha | pe| un|con|no |sse|li |e i| o | so| li| la|pro|ia |o i|e p|o s|i s|in |ato|o h|na |e s|a l|e o|nza|ali|tti|o p|ta |so |ber|ibe|lib|o e|un | a | ri|ua |il | il|nto|pri|el | po|una|are|ame| qu|a c|ro |oni|nel|e n| ad|ual|gli|sua|ond| re|a a|i c|ri |o o|sta|ita|i o| le|ad |i a|ers|enz|ssi|à e|ità|gua|i p|e c|io | pa|ter|soc|nal|ona|naz|ist|cia|rso|ver|a e|i r|tat|lle|sia| si|rio|tra|che| se|rtà|ert|anz|eri|tut|à d|he | da|al |ant|qua|on |ari|o c| st|oci|er |dis|tri|si |ed | ed|ono| tu|ei |dei|uzi|com|att|a n|opr|rop|par|nes|i l|zza|ese|res|ien|son| eg|n c|ont|nti|pos|int|ico|rà |sun|ial|lit|sen|pre|tta|dev|nit|era|eve|ll |l i| l |nda|ina|non| no|o n|ria|str|d a|art|se |ssu|ica|raz|ett|sci|gio|ati|egu| na|i u|utt|ve | ma|do |e r|ssa|sa |a f|n p|fon| ch|d u|rim| fo|a t| sc|trà|otr|pot|n i| cu|l p|ra |ezz|a o|ini|sso|dic|ltr|uni|cie| ra|i n|ruz|tru|ste| is|der|l m|a r|pie|lia|est|dal|nta| at|tal|ntr| pu|nno|ann|ten|vit|a v",
    tur: " ve| ha|ve |ir |ler|hak| he|her|in |lar|r h|bir|ya |er |ak |kkı|akk|eti| ka| bi|eya|an |eri|iye|yet|ara|ek | ol|de |vey|ın |ır |nda|arı|esi|ını|dır| ta|tle|e h|ası|etl|e k| va|ı v|sın|ile|ne |rke|erk|ard|ine| sa|ınd|ini|k h|kın|ama|le |tin|rdı|var|a v| me|e m|na |sin|ere|k v| şa| bu|lan|kes|dir|rin|dan| ma|kı |mak|şah|da | te|mek| ge|nı | hi|nin|en |n h| se|lik|rle|ana|lma|e a|ı h|r ş|ill|si | de|aya|zdi|izd|aiz|hai|ret|hiç|ına| iş|e b| ba|kla|et | hü|rın|n k|ola|nma|e t| ya|eme|riy|n v|e i|a h|li |mil|eli|ket|ik |kar|irl|hür|im |evl|mes|e d|ahs|ma |rak|ala|let|lle|un | ed|rri|ürr|bu | mi|i v|dil| il| eş|n i|la |el |mal| mü| ko|e g|se | ki|mas|lek|mle|mem|n b|ili|e e|ser| iç|n s|din| di|es |mel|eke|tir|şit|eşi|r b|akl|yla|n m|len| ke|edi|oru|nde|re |ele|ni |tür|a k|eye|ık |ken|uğu| uy|eml|erd|ede|ame| gö|e s|i m|tim|i b|rde|rşı|arş|a s|it |t v|siy|ar |rme|est|bes|rbe|erb|te |alı| an|ndi|end|hsı|unm|rı |kor|nın| ce|maz|mse|ims|kim|iç | ay|a m|lam|ri |sız|a b|ade|n t|nam|lme|ilm|k g|il |tme|etm|r v|e v|n e|ğre|öğr| öğ|al |ıyl|olm|vle|şma|i s|ger|me | da|ind|lem|i o|may|cak|çin|içi|nun|kan|ye |e y|r t|az |ç k|ece|sı |eni| mu|ulu|und|den|lun| fa|şı |ahi|l v|r a|san|kat| so|enm| ev|iş ",
    pol: " pr|nie|pra| i |nia|ie |go |ani|raw|ia | po|ego| do|wie|iek|awo| ni|owi|ch |ek |do | ma|wo |a p|ści|ci |ej | cz| za| w |ych|ośc|rze|prz| ka|wa |eni| na| je|ażd|każ|ma |zło|czł|noś|o d|łow|y c|dy |żdy|i p|wol| lu|ny |oln| wy|stw| wo|ub |lub|lno|rod|k m|twa|dzi|na | sw|rzy|ają|ecz|czn|sta| sp|owa|o p|spo|i w|kie|a w|zys|obo|est|neg|ać |mi |cze|e w|nyc|nic|jak| ja|wsz| z |jeg|wan|ńst|o s|a i|awa|e p|yst|pos|pow| ró|o o|jąc|ony|nej|owo|dow|ów | ko|kol|aki|bez|rac|sze|iej| in|zen|pod|i i|ni | ro|cy |o w|zan|eńs|no |zne|a s|lwi|olw|ez |odn|rów|odz|o u|ne |i n|i k|czy| be|acj|wob|inn| ob|ówn|zie| ws|aln|orz|nik|o n|icz|zyn|łec|ołe|poł|aro|nar|a j|i z|tęp|stę|ien|cza|o z|ym |zec|ron|i l|ami| os|kra| kr|owe| od|ji |cji|mie|a z|bod|swo|dni|zes|ełn|peł|iu |edn|iko|a n|raj| st|odo|zna|wyc|em |lni|szy|wia|nym|ą p|ją |zeń|iec|pie|st |jes| to|sob|któ|ale|y w|ieg|och|du |ini|war|zaw|nny|roz|i o|wej|ię |się| si|nau| or|o r|kor|e s|pop|zas|niu|z p|owy|w k|ywa| ta|ymi|hro|chr| oc|jed|ki |o t|ogo|oby|ran|any|oso|a o|tór| kt|w z|dne|to |tan|h i|nan|ejs|ada|a k|iem|aw |h p|wni|ucz|ora|a d| wł|ian| dz| mo|e m|awi|ć s|gan|zez|mu |taw|dst|wią|w c|y p|kow|o j|i m|y s|bow|kog|by |j o|ier|mow|sza|b o|ju |yna",
    swh: "a k| ya|na |wa |ya | ku|a m| na| ha|i y| wa|a h|a n|ana|aki|ki |la |hak| ka|kwa|tu | kw| ma|li |a a|ila|i k| ki|ni |a w|ali|a u| an| mt|ke |mtu|a y|ake|ati|kil|ka |ika|kat|ili|te |ote|we |a s|e k|ia |zi |u a|za |azi|ifa|ma |yak|yo |i n|ama| yo|au | au|e a|kut|amb|o y|ha |asi|fa |u w|hal|ara|sha|ish|ata|ayo| as|tik|u k| za|i z|ina|u n|mba|uhu|hi |hur|cha|yot|ru |uru|wat| ch|eri|ngi|e y|u y|i a|aif|tai| sh|nay|chi|ra |ani| bi| uh|sa | hi|i h|awa|iwa|a j|ti |mu |o k|ja |kan|uli|iwe|any|i w| am|e n|end|atu|kaz|o h|ria|her|she|shi|nch| nc|uta|ye |wak|ii |ele|ami|adh|eza| wo|iki|oja|moj|jam| ja|aka|bu |kam|kul|mat|fan|a l|agu|ind|ne |iri|lim|wen|da |kup|uto|i m|a b|ini|wan|bil| ta|sta|dha| sa| ni|ao | hu|e w|wot| zi|rik|kuf|aji|ta |wez|nya|har| ye|e m|si |lin| ut|ine|gin|ing| la|a t|zim|imu|ima|tak|e b|uni|ibu|azo|kos|yan|nye|uba|ari|ahi|nde|asa|ri |ham|dhi|eli|hir|ush|pat| nd|kus|maa|di |nda|oa |bar|bo |mbo|oka|tok|ndw|ala|wal| si|uzi|hii|tah|i s|o n|liw| el|upa|zin|hag|a c|ndi|ais|mai|eny|mwe|aa |ewe| al|ndo|e h|lo |umi|kuh|jib|osa|mam|a z|ufu|dwa|u i| in|iyo|nyi| ny|u m|sil|ang|o w|guz|zwa|uwa|kuw|hil|saw|uch|ufa|laz|und|aha|ua | mw|bal| lo|o l|a i|del|nun|anu|nji| ba|lik|le |uku|i i",
    sun: "an |na |eun|ng | ka|ana| sa| di|ang|ung|un |nga|ak | ha|keu| ba|a b| an|nu |hak| bo|anu|ata|nan|a h|ina| je|aha|ga |ah |awa|jeu| na|ara|ing|oga|bog|gan| ng|asa|kan|a s|ha |ae |bae|n k|a k| pa|a p|sah|g s|sar| si|sin|a n|din|n s|ma | at|aga|a a|tan| ku| ma|n a|san|man|wa |lah|pan|taw|u d|ra |ari|eu | pi|gar| pe|kat| te|n p|sa |per|a d|a m|e b|aan|ban|ran|ala|ike|n n|kum| ti|ama|a j|pik|ima|n d|al |at | ja|ila|ta |nda|bas|rim|teu|n b|eba|beb|udu|aya|ika|ngg|nag|kab|rta|art| me|ola|k n|uma|atu|aba|g k|adi|aca| po|ngt|nar|una|ate|oh |boh|awe|di |tin|asi|uku|n h|dan|aka|iba|car|sac|gaw|are|ent|um |jen|abe|u s|dil|pol|ar |ku |kud|u m|upa|han| hu|ake|bar|ur |hna|aru|h s|a t|sak|wat|kaw| so|n t|pa |mpa|du |ngk|g d|ena|huk| mi|mas|ngs|ti |n j|ka |aku|ren|n m| ta|law|isa| tu|und|a u|h a|tay|ula|aja|ali|nte|gsa|en |gam| wa|ieu|ere|k h|jal|h b|il |dit|ngu|lan|asu|yun|ayu|gta|k d|a r|g n|mah|uda|dip|kas|rup|geu| be|ter|sej|min|ri |ern|u p|k k|amp|ura|kal|e a|k a|ut |g b|nak|bis| bi|k p|tes|end|we |h k|tun|uan| un| de|u n|h t|ksa|u k|ian|wil|u b|ona|nas|uka|rak|eje| se|ami| ke|war| ra| ie|k j|eh |ya |lma|alm|pen|tur|wan|lak|h j|g a|ean|up |rga|arg|r k|u t| ne|deu|gal|gke|e t|h p| ge|g t| da|i n",
    ron: " de|re | în|și |are|de | și|te |ul | sa|rep|e d|ea |ept|dre|tul|e a| dr|ie |în |ptu|le |ate|la |e p| la| pe|ori| pr|ce |e s| or|au |tat| ar|ice|ii |or |a s| fi| a |ric|ale|per| co|nă |ă a|rea|ers|i s| li|sau| ca|rso|ent|lor|ați|al |a d|e o|men|l l|ei |e c|pri|ană| ac| re|uri|ber|ibe|lib|a p|oan|soa| in|i l|ter| al| să|tea|lă |car|tăț|să |tur|i a|i d|nal| ni|ri |ita|e î|e ș|se |ilo|in |ia |ție|pre|fie|ții|ăți|con|ere|e f|a o|eni|nte| nu| se|ace|ire|ici| cu|i î|a c|i n|a l|pen|ui |nu |ări|ală|ona|l d|ră |ert|ril| su|ntr|n c|rin| as|ni |i o|eri|tă |că |ile|ă d|i c|e n|ele|sa | mo|i p|fi |sal|tor|va |oci|soc|nic|pro| un| tr|est|inț|a î|uni|n m|a a| di|ecu|lui|sta|lit| po|tre|gal|ega|oat|ra |act|ă î|leg|u d|e l|nde|int|a f|n a| so|naț|ara|i f|uie|iun| to|tar|ste|ces|rar|at | ce|eme|i ș|rec|dep| că| o | îm|bui|ebu|reb| eg| na|mân|ntu|ili|văț|ând|iei|r ș|bil|pli|od |mod|res|din|e e|cți| au|ali|ă p|ă f|împ|ial|cia|ion|ă c|dec|nta| om|ită| fa|ță |cu |tra|ăță|nvă|înv|ât |ite|i i|lic| pu| ex|riv|tri|rot|ța |ți |l c|rta|imi|ulu|țio|ică|lig|rel|ta |cla|t î|nt |nit|e m|ânt|ămâ|țăm|ger|nța|ru |tru|gur|u c|bli|abi|ată|art|par|ar |rim|iva|l ș| sc|ime|nim|era|sup|ind|u a|dic|ic | st| va|ini|igi|e r",
    hau: "da | da|in |a k|ya |a d| ya|an |a a| ko| wa|na | a |sa | ha|kin|wan|ta | ba|a s| ta|a y|a h|wa |ko | na|n d|a t|ba |ma |n a| ma|iya|hak|asa| sa|ar |ata|yan| za|akk|a w|ama| ka|i d|iki|a m|owa|a b| ci| mu| sh|anc|nci|kow|a z|ai |nsa|a c|shi| ƙa|cik|ne |ana|i k|ci |kki|e d|a ƙ| ku|su |n y|uma|ka |uwa|kum|hi |a n|utu| yi|ani| ga| ra|aka|ali|mut|‘ya|tar| do|ɗan|ars| ‘y|sam|ƙas|nda|ane|man|tum|i a|yi |ni | du|ada| su|and|a g|cin| ad|a i|ke | ɗa|n k|yin|um |e m| ab|ins|nan|ki |mi |ami|yar|min|oka|re |i b|kam|mas|i y|mat|za |ann|en |aɗa| ja|m n|li |duk|dai|e s|n s|ra |n w|n h|aik| ai|ida|ga |san|rsa|aba|sar|ce |nin| la|o n|ban|nna|kan|abi|una|dam|me |ara|i m|hal|a r|add|are|n j|abu| ne|zai|a ɗ|wat|ari| ƙu|on |ans|waɗ|ame|ake|kar|din|zam| fa|a l|ƙun|buw|r d| hu|oki|kok|a ‘|u d|n t|abb|aur| id|rin|yak|dok|kiy|ray|jam|n b|ubu|bub|n m|i s| an|am |ili|bba|omi|dan|gam|ayu|ash|nce|tsa|ayi|har|yya|ika|bin|han|kko|rsu|aif|imi|fa | am|i i|dom| ki|yuw|dun|o a|fan|n ƙ|aya|fi |n r|she|uni|bay|riy|n ‘|sab| iy|bat|tab|aga| ir|mar|o w|i w|sha|awa| ak|uns|unc|tun|u k| il|ɗin|mfa|amf|aci|ewa|kas|lin|n n|don|n i|ure|ifi|lai|dda| ts|iri|aye|un |tan|wad|gwa|afi| ay|ace|mba|amb|aid|nta|ant|war|lim|kya| al|aɗi",
    fuv: "de | e |e n| ha|nde|la | wa|ina| ka|akk| nd|ɗo |na | in|e e|hak|al |di |i h|kke|ii |um |ko |ala|ndi| mu| ne|lla| jo|wal|eɗɗ|neɗ|all|mum| fo|kal|jog|ke |aaw|taa| ko|eed|ɗɗo|aa | le|ji |ade|aad|laa|o k| ng|e h| ta|re |ogi|a j|e w|e m|nnd|gii|e l|ley|awa|aag|ede|waa|e k|gu |e d| go|gal|ɓe |ti |fot|aan|eyd|ydi|ɗe |ee | re|ol |oto|i e|oti|m e|taw|nga|a i|kee|to |ann|eji|am |ni | wo|een|goo|eej|e f| he|enn|gol|agu|pot| po|dee|ay | fa|ka |a k|ond|oot| de|a f|o f|a n|wa |maa|ota|le |hay|i k|o n|ngo|e j|o t| ja|ñaa|hee|nka|i w|awi|a w|ngu|der| to|e t|dim|i n|fof|i f|e g|tee|naa|aak| do|too|a e|ndo|ren|dii|oor|er |o e|i m|of | sa| so|gaa|ani|kam| ma| ña|o w|i l|u m|kaa|ima|dir| ba|igg|lig| li|aar| ɓe|o i|e s| o |e r|so |ooj| nj| la|won|awo|dow|woo|faw|and|e i|ore|nge|nan|are|a t|tin|aam| mo|ɗee|ita|ira|aaɗ|e p|nng|ma |ank|yan|nda|oo |e ɓ|njo|ude|nee|e y|e a|je | ya|en |ine|iin| di|ral| na|ɗi |und| hu|inn|ŋde|aŋd|jaŋ|a d|den| fe| te|go | su|a h|haa|tal|eɗe|e b|y g|baa|tde| yi|ɗɗa|o h|iiɗ|ow | da|do |l n|alt| ho|l e|aga|mii| aa|a a|ama|nna|m t| ke|edd|oga|m w|l m|o j|aɗe|ree|oje|yee| no|ele|ne |ago| pa| al|guu|wi |ge |aaɓ|daa|ind|dew|i j|jey| je|ent|tan|o ɗ|geɗ| ge|ñee|a l| ɗu|kko|mak|a s| ga",
    bos: " pr| i |je |rav|na |ma |pra| na|ima| sv|a s|da |a p|vo |nje|ko |ako|anj|o i| po|avo|ja |e s|a i|ti | im| da| u |sva|no |ju | za|o n|va |i p|ili|vak|li | ko|ne | il|koj| ne|nja| dr|ost| sl|van|im |i s|u s|i i|a n|ava|ije|a u| bi|stv|se |a d|om |jed|bod|obo|lob|slo| se| ra|ih |sti| ob| je|pri|enj|dru|u i|o d|iti|voj|raz|ova|dje| os|e i|lo |e p| nj|uje|i d|bra|tre| tr| su|jeg|i n|u z|a k|og |u p|oje|cij|reb|a o|a b|lju|i u|ran|mij|ni |nos|jen|ba |edn|svo| iz|jel|pro|e d|žav|bit| ni|i o|sta|a z|avn|vje| ka|bil|ovo|a j|aju|ist|nih|tu |red|gov| od|e o|oji| sm|lje|o k|ilo|ji |aci|e u|e n|pre|o p|eba|u o|su |vim|ičn| sa|u n| dj|a t|ija|čno|jem|rža|drž|elj|stu|dna|odn|eni|za |iva|olj|šti|nom|em |du |vno|smi|jer|e b|de |pos|m i| do|u d|nak|a r|obr| mo|lja|nim|ego| kr|tit|kri|ve |nju|an |iko|nik|nu |i m|nog|eno|sno| st|e k|tup|rug|ka |oda|riv|vol|aln|m s|itu|ašt|zaš|ani|sam|akv|ovi|osn|rod|aro| mi|tva|dno|nst|jan|ak |ite|vič|rad|u m| ta|dst|tiv|nac|rim|kon|ku |odu|živ|amo|tvo|tel|pod|g p|nov|ina|nar| vj|o s|i b|oj | ov|ave|vu |ans|oja|zov|azo|ude|bud| bu|e t|i v|din|edi|nic|tan|nap|mje| is|jal|slu|pun|eds|o o|zak|jav|i k|m p|tno|ivo|ere|nič|m n|jim|kak|ada|vni|ugi| ro|mov|ven|pol|to |te | vr",
    hrv: " pr| i |ma |rav|ima|pra|je |na | sv|ti | na|a p|vo |vat|ko |a s|nje| po|anj|avo|o i|tko| im|a i|sva|no |i p|e s|ja |o n| za|ju |ili| u |va |li | bi|ne |i s|atk| il|iti|da | ne| ko| dr| sl|van|nja|koj|ije| ra|ova| os|u s|i i|ost|bod|obo|lob|slo|pri|a n|om |jed|ati|ih |im |voj|ava| ob|stv|se | mo|i u|bit|dru| je| se|dje|i o|enj| ka|i n|sti|lo |u i|svo|mij|ni |e i|raz|a o|e n|bra|o p| su|a b|u p|ran|a k|og |i d|bil|ako|e p|a d|edn|aju|mor|eni| nj|iva|jel|žav| ni|a z|avn|ovi|eno|ra |oje|a j| da|a u|ora|jeg| iz|nih|rža|drž|oji|sno|nit|jen|vje|ilo|cij|oda|nim| dj|pro|tit|u z|e d|red|nom|jem| od|nos|sta|nov|osn| sm|lje|o s|ji |ovo|stu|pos|vim| do|odn|rad|ist| sa|e o|tu |nju|em |gov|o d|rod|i m|jer|aci|oj |pre|m i|nak|dna|a r|lju|uje|e m|obr|za |olj|ve |o o|m s|an |nu |du |aro|vno|smi|aln|e k|o k|i b|e u|tva|u u|tup|rug|dno|u o|su |u d|ka |vol| ta|ija|itu|šti|ašt|zaš|itk|živ|ani|sam|elj| st|sob|oso|nar|akv|ada| mi|te |ona|nst|jan|lja|i v|ite|ego|elo|rim|ku |odu|amo|tvo|tel|jim|pod|nog|vi |ina| vj|to |e b|ans|zov|azo|ak | sk|edi|tan|oju|pun|pot|oti|kon|zak|i k|m p|tno|ivo|ere|nič|kak|vni|ugi| ro|mov|ven|štv| be|ara|kla|ave|u b|avi|oja|jal|u m|dni|mje|rak|din|ći |juč|klj|nic|u k|nap|obi|atn",
    nld: "en |an |de | de| he|ing|cht| en|der|van| va|ng |een|et |ech| ge| ee|n e|rec| re|n v|n d|nde|ver| be|er |ede|den| op|het|n i| te|lij|gen|zij| zi|ht |ijk|eli| in|t o| ve|op |and|ten|ke |ijn|e v|jn |ied| on|eft| ie|sch|n z|n o|aan|ft |eid|te |oor| we|ond|eef|ere|hee|id |in |rde|n w|t r|aar|rij|ord|wor|ens|of | of|hei|n g| vr| vo| aa|r h|hte| wo|n h|al |nd |vri|e o|ren|le |or |n a|jke|lle|eni|n b|ij |e e|g v| st|ige|die|e g|men|nge|t h|e b| za|e s|om |t e|ati|wel|erk|sta|ers| al| om|n t|zal|dig| me|ste|voo|ter|gin|re |ege|ge |g e|bes|nat| na|eke|che|ig |gel|nie|nst|e a|nig|est|e w|erw|r d|end|ona|d v|jhe|ijh|d e|ele| di|ie | do|del|n n|at |it | da|tie|e r|elk|ich|jk |vol|ijd|tel|min|len|str|lin|n s|per|t d|han| zo|hap|cha|wet| to|ven| ni|aat|ion|tio|taa|lke|eze|met|ard|waa|uit|sti|e n|doo|pen|eve|el |toe|ale|ien|ach|st |ns | wa|eme|nin|e d|bij| gr|n m|p v|esc|t w|ont|ite|man|ema| ma|nal|g o|rin|hed|t a|t v|beg|all|ijs|wij|rwi|e h| bi|gro|p d|rmi|erm|her|oon| pe|eit|kin|t z|iet|iem|e i|gem|igi| an|d o|r e|ete|e m|js | hu|oep|g z|edi|arb|zen|tin|ron|daa|teg|g t|raf|tra|eri|soo|nsc|t b| er|lan| la|ern|ar |lit|zon|d z|ze |dez|eho|d m|tig|loo|mee|ger|ali|gev|ije|ezi|gez|nli|l v|tij|eer| ar",
    srp: " pr| i |rav|na |pra| na|ma | sv|ima|da |ja |a p|vo |je |ko |ti |avo| po|a i|ako|a s| za| u |ju |o i| im|nje|i p|va |sva|anj|vak| da|o n|nja|e s|ost| ko|a n|li |ili|ne |om | ne|i s| sl| il| dr|no |koj|u s|ava| ra|og |slo|im |enj|sti|bod|obo|lob|iti|a o|stv|i u|a d|ni |jed|u p|pri|edn| bi|i i|a k|o d|sta|ih |dru|a u| je| os| ni|nos|pro|aju|i o|ran| de| su|u i|se |van|ova|i d|cij| ob|uje|red|žav|e i|i n|voj|e p|a j|dna| se| od|ve | ka|eni|rža|drž|a z|avn|aci|ovo|u u|m i|oja| iz|lja| nj|ija|u z|e o|rod|jen|lje|e b|raz|jan|lju|svo|za |gov|ičn| st|nov|sno|osn|du |ji |pre| tr|su |vu |odn|a b|jeg|nim|nih|tu |tit|šti|ku |nom|bit|e d|me |iko|čno|oji|lo |vno|nik|e n|đen|ika|bez|ara|de |u o|vim|nak| sa|u n|riv|ave|an |olj|vol| kr|o p|sme|e k|nog| ov|e u|tva|bra|rug|reb|tre|u d|oda| mo| vr|vlj|avl|ego|jav|del|m s|kri|o k|ašt|zaš|nju| sm|ani| li|dno|eđu|aln|la |akv|oj |šen|kom|stu|ugi|avi|a r|ka |rad|oju|tan|odi|vič|tav|itu|ude|bud| bu|pot|odu|živ|ere|m n|tvo|ilo|bil|aro|ovi|por|eno|štv|nac|ove|m p|tup|pos|rem|dni|ba |nst|a t|ast|iva|e m|vre|nu |beđ|ist|pun|en |te |dst|rot|zak|ao |kao|i k|juć|o s|st |sam|ter|nar| me|i m|kol|e r|ušt|ruš|ver|kak| be|i b|kla|ada|eba|ena|ona| on|tvu|ans| do|rak|slu",
    ckb: " he| û |ên | bi| ma|na |in |maf| di|an |xwe| xw|ku | ku|kes| de| ji|her|kir|iya|ya |rin|iri|ji |bi |es | ne|ye |yên|e b|er |afê|tin|ke | an|iyê|eye|rke|erk|we | be|e h|de | we|hey|fê |i b|yê |ina| bê| li|diy|ber|li |re |î û|nê |ê d| se| ci|eke|di |wî | na|î y|af |ete|hem| wî|sti| ki|rî |kî |î a|yek|n d|kar| te|ne |yî |i h|e k|tî |tê |a w|e d|î b|s m|ast|n b|be |yan|ser|tew|net| tu| ew|hev|aza|ara|û b|n k|adi|ev |zad| az|ras|est|anê| ya|n h|n û|wed| tê|wek|bat|bo | bo| yê|st |n n|ê k|dan|ê h|ema|ê b|iye|î h|din|bûn|r k|ekî| me|par|ûna|ta |wle|ewl|î m| ke|nav|ewe|man|ê t|dî |û m|mû |emû|a m|ika|e û|n w|a x|ê m|e n| ta|ela|n j|eyê|n x|civ|wey|ana| re|khe|ekh|bik|kê |jî |f h|erî| pa|îna|bin|erb|vak|iva|a s| ni|cih|vê |e j|ari| pê|î d|nên|ike|e t|a k|ê x| ye|n a|eyî|n e|ama|bê |ar |ewa|atê|bes|rbe|av |ibe|ist|mî |tem|awa|are|hî |geh|nge|ing|nek|nûn|anû|qan| qa|vî |rti|uke|tuk| şe|eza| da|u d|û a|f û|edi| ra|tu |tiy|tên| mi|xeb| ge|hîn| hî|etê|î j|stî|mal|bib|ra |i d|e m|mam|i a|nik|i m|î k| wi|ûn | ko|a ş|ê j|riy|lat|wel|e e|ine|ane|û h|în |a d|siy|end|aye| za|ija|a n|î n|ek |tek|yet|mbe|emb|û d|rov|iro|mir|eba| xe|mên| ên| hu|nîn|anî|t û|ten|n m|dem|ê û|enê|te |art|i r| jî|u j|ekê|dew",
    yor: " ní|ti |ọ́ |ní | lá| ẹ̀|àn |ẹ́ |kan|tí | tí|an |ẹ̀ |tọ́|ọ̀ | ẹn|ọn |wọn|í ẹ|bí |áti|lát|̀tọ|ẹ̀t| gb| àt| àw|n l|àti| a |lẹ̀|ẹnì| ó |kọ̀| ló|ì k|sí |ọ̀k| kọ|ra |ni |àbí|tàb| tà|nì | sí|̀ka|ọ̀ọ|n ẹ|àwọ|n t|ó n|̀ọ̀|ílẹ|orí|ló | wọ|tó |dè |ìyà|ún | tó| or|í ì|èdè|kò |‐èd|̀‐è|ẹ̀‐|ríl|í ó|rẹ̀|í à| sì|yàn|gbo|ṣe | kò|í a| rẹ| jẹ|sì | bá|ràn| ṣe|wọ́|nìy|fún| fú|n à|ba |n n|gbà|gbọ|jẹ́|un |ìí | kí|gba|ènì| èn|bá |́ l|a k| ka|dọ̀|kí | òm|in | fi|bò |fi |bẹ́|ọdọ|bọd|́ s|hun|nú |nín|wà |ira|nir|òmì|ìgb| ìg|́ t|ẹni|ínú|i l|ìni|mìn|bà |áà |i ì|ohu| oh|í i|ara| ti|bo |ò l| pé|rú |írà| ọ̀|í ò|ogb|kọ́|pọ̀|ó b|à t|i n|lọ́|ẹ́n| ìb|yìí|gbé|gẹ́|bog|óò |yóò| yó|n k|pé |dá |́wọ|ọ́w|à l|í k| wà|n o|jọ | ir|ọ̀r|ú ì|́ à|ó s|i t|ṣẹ́|̀kọ|í t|yé |lè | lè|fin|àbò| lọ|à n|ùjọ|wùj|irú|ó j| ar|í w|a w| ìm|ú à|̀ t|òfi| òf| àà|fẹ́|àwù|́ni|wù |ìír|mìí| mì|láì| yì|í g|ọ́n|n s|i ẹ|ẹ̀k|àgb|ígb|níg|a n| kú|láà|í o|náà| ná|kẹ́|ípa|níp|ìn | ìk|bé |i g|ọmọ| ọm|i à|iṣẹ|̀ à|ìmọ|n a|n f|jẹ |yí |́ ọ|ó d|́ ò| dá| mú|ààb|ábẹ|láb|ìbá|ò g|jú |i o|lú | èt|̀ ẹ|tọ̀|de |̀ n|i ò| ìy|kàn|́n | bí| iṣ|mọ̀|e ẹ|̀ l| fà|èyí| èy| ìd|mọ́|dé |̀ k|́ p|ò t|mú | fẹ| ìj|rí |ìkẹ|nìk|ìní|n ì|n è|sìn|è ẹ| i |rọ̀| àn|́ b|ùn |́gb|ọ́g|dọ́| dọ|í n|rin|̀ j",
    uzn: "ish|an |lar|ga |ir | bi|ar | va|da |iga| hu|va |bir|sh |uqu|quq|huq| ha|shi| bo|r b|gan|a e|ida| ta|ini|lis|adi|ng |dir|lik|iy |ili|oʻl|har|ari| oʻ|uqi|ins|lan|hi |ing|dan|nin|kin| yo|son|nso| in| mu|on |qig| ma|ega|r i|boʻ| eg|oʻz|ni |gad|ash|i b|ki |oki|ila|yok|a b|n b|osh|ala|at |in |r h|erk| er|lga| qa|rki|h h| sh|i h|ara|n m| ba|nis|ik |igi|lig|bos|ri |qil|a t|bil|las|eti| et|n o|ani|nli|kla|i v|a q|a h|a o|yat| qo|im |a s|i m|iya|atl|oli|osi|siy|qla|cha|til| ol|ati|a y|mas|qar|inl|lat| qi|taʼ|ham|gi |ib |ʻli|mla|h v|ʻz |hun|n e|mum| da| bu| to|un |mki|umk|sha|tla|ris|iro|ha |rch|bar|iri|oya|ali| be|i o|asi|aro| ke|i t|rla| te|arc|hda|shu|tis|n h|tga| sa| xa|rak|lin|ada|ola|imo|hqa|shq|li | tu|aml|lla|sid| as|nid|a i| ki|ch |n t|nda|k b|era|siz|or |hla|a m|r v|eng|ten|mat|mda|amd|lim|miy|y t|ayo|i a|ino|ilg|tni| is|ana|as |ema| em|ech|a a|tar|kat|aka|ak |rat| de|aza|ill| si| so|gʻi|uql|n q|oda|ʼli|aʼl|nik| ni|tda|uch|gin|a u|him|uni|sit|ay |qon| ja|atn|kim|h k|hec| he|ʻzi|lak|ker|ikl| ch|liy|lli|chi|ur |zar|shl|rig|irl|dam|koh|iko|a d|am |n v|rti|tib|yot|tal|chu| uc|sla|rin|sos|aso| un|na | ka|muh|dig|asl|lma|ra |bu |ush|xal|ʻlg|i k|ekl|r d|qat|aga|i q|oiy|mil| mi|qa |i s|jin",
    zlm: "an |ang| ke|ng | se| da|ada|ara|dan| pe|ran| be|ak |ber|hak|ata|ala|a s|ah |nya| me|da |per|n s|ya | di|kan|lah|n k|aan|gan|dal|pad|kep|a p|n d|erh|eba|nga|yan|rha| ya|nda|ora|tia|asa| ha|ama|epa| or|iap|ap |a b| at| ma|eti|ra |tau|n a|set|au | ba|pa | ad|n p|tan|p o|eng|a d|men|apa|h b|h d|dak|man|a a|ter| te|k k| sa|n b|ana|g a|end|leh|ole|a k|am |n y|aka|eh |lam|bas|beb|n m| un|pen|sa |keb|sam|n t| ti|ela|san|car|uan|ma |di |han|ega|ban|eri|at |sia|a m|ika|kes|ian|gar|seb|ta |mas|und|neg|nan|ngs|i d|erl|na |epe|emb|bar| la|atu|kla|pem|mem|emu|eca|sec|ngg|nny|any|bol|al |aha|gsa|ebe|ind|akl|n h|erk|ung|ena| bo|a t| ap|ers| de|in |tu |pun|as |agi|ann|g b|bag| ne|ain|hen| he|era|rat|sem| su|adi|lan|g s|dia|mat|ses|iad| ta|iha|g t|tin|k m|k h|i k|gi |i s|ing|uka|enu|den|lai|k d|ert|ti |rka|aja|rga|lua|ker|mel|dun|ndu|lin|rli|nak|ntu|esi|aya|un |uat|jua| in|rma|erm|ai |emp|kem|ri |dil|ua |uk |h m|l d|g m|mba|kat|ese|tik|ni |ini| an|mpu|ka |dar|mar|rja|erj|arg|u k|sua| ol|esa|dap|ar |g u|si |ent|g d| pu|awa|iri|dir|sal|gam|mbe|n i|har|a h|raa|ema|tar|i a|saa|ira|ari|pel|jar|laj|uju|tuj|rak|ura|uar|elu|t d|unt|il |wen|asi|gga|ipa|ksa|tuk|ula|sek|sas|ibu|rta|sep|rsa|nta|ati|ila|mua|yar",
    ibo: "a n|e n|ke | na| ọ |na | bụ|ọ b|nwe|nye|ere|re | n |ya |la | nk|ye | nw| ma|e ọ| ya| ik|a o|a ọ|ma |ụla|bụl|ike| on|nke|e i|a m|ony|ụ n|kik|iki|bụ | a |ka |wer|ta |i n|do |di | nd| ga|a a|e a|a i|he |kwa| ok| ob|e o|hi |any|ga‐|ha |dụ | mm|ndi|ọ n|wa |rụ |e m|che|a e|oke|wu |aka|ite|o n|a g|odo|bod|obo| dị| ez|ara|we | ih|a‐e|hị |ri |n o|zi |mma|chi|dị |ghi|ụta|iri|ihe| an| oh|a y|gba|ụ ọ| ọz| ak| iw|nya|te |iwu| nt|ro |oro|e ị|zọ |ezi|me |e e|u n|her|ohe| si|a‐a|i m|ala|ụ i| ka|akw| in|ghị|kpe|n e|pụt| e |i i|i o|ide|inw|ụ o|hụ |ahụ|weg|ra |o i|kpa|adụ|mad|si |sit|a s| me|sor|i ọ|gid|edo|u o|e y|n a| en|tar|ozu|toz|bi |be |ụ m|ụrụ|ọrụ| ọr|mak|uso|ama|de |ị o| ọn|ọzọ|chị|egh|enw|apụ|ru | to|i a|a ụ|osi|rị |wet|hed|nch| nc| eb| al|nọd|ọnọ|uru|sir| kw|yer|ji |eny| mk|ịrị|eta| us|tu |ọ d|u ọ| o |ba | mb|ọdụ|ịch| ch|a d|pa | ag|kwe| ha|a u|e s|mkp|n u|nta|ebe|n ọ|o m|kwu|nkw|nwa|obi| ịk|esi|i e|nha| nh|le |ile|nil| ni|eme| og|e k|n i|chọ|o y|asị|otu| ot|ram|u m|ịgh|dịg|zu |nọ |mba| gb|e g|ị m|ọch|ich|pe |agb|i ị|uch|zụz|uny|wun|ọrọ| nn|na‐| di|ge |oge|iji| ij|ọha| ọh|ikp|egi|meg|o o|ụhụ|hụh|mah|n ụ|ọ g|ọta|ekọ|ị n|kwụ|agh|ụmụ|ban|kpu|okp| ah|ịkp|a k|ime| im|zụ |ụzụ|ọzụ| ụz|lit|ali|nat",
    ceb: "sa | sa|ng |ang| ka| pa|an |ga |nga| ma|pag| ng|on |a p|od |kat|ay | an|g m|a k|ug |ana| ug|ung|ata|ngo|atu|n s|ala|san|d s|tun|ag |a m|god|g s|a a|a s|g k|g p|yon|n u|ong|tag|usa|pan|ing|una|mat|g u|mga| mg|y k| us|ali|syo| o |aga|tan|iya|kin|dun|nay|man|nan|a i| na|ina|nsa|isa|bis|a b|adu| ad|n n| bi|asy|asa|lay|awa|lan|non|a n|nas|o s|al |agp|lin|nal|wal| wa|ili|was|gaw|han| iy| ki|nah|ban|nag|yan|ahi|n k|gan| gi|him| di|a u| ba| un|ini|ama|ya |kas|asu|n a|g a|gka|agk|kan|ags|agt|l n|a g|kag| ta|imo|uns|sam| su|g n|n o|gal|kal|og |taw|aho|uka|gpa|ipo|ika|o p|a t| og| si|gsa|g t|aba|ano|gla|y s|o a|aki|hat|kau|sud|gpi|a w|g i|aha|ot |ran|i s|n m|bal|lip|gon|ud | ga|li |uba|ig |ara|g d|na |kab|aka|gba|ngl|ayo| la| hu|a h|ati|d a|d n| pu| in|uga|ok |ihi|d u|ma |may|awo|agb|ami|say|apa|pod|uha|t n|agh|buh|ins|ad | ub| bu|at |iin|a d|ip |uta|sal|hon|wo |ho |tra|lak|iko|as |aod|bah|mo |aug|ona|dil|gik|sos|lih|pin| pi|k s|nin|oon|abu|la |rab|hun| ti|mah|tar|t s|ngb|uma|hin|bat|lao|mak|it | at|s s|sno|asn|ni |aan|ahu| hi|agi|n p|inu|ulo|y p| ni|iha|mag|o n|duk|edu| ed|a e|til|ura|tin|kip|agl|gay|g h|g b|ato|ghi|nab|kon|in |ter|o u|o o|yal|sya|osy| so|tik| re| tr|hig|a o|ha |but|pak|aya",
    tgl: "ng |ang| pa|an |sa | ka| sa|at | ma| ng|apa|ala|ata|g p|pan|pag|ay | an| na|ara| at|tan|a p|pat|n a| ba|ga |awa|rap|kar|g k|aya|lan|g m|n n|g b|nga|mga| mg|a k|na |ama|n s|a a|gan|yan|gka| ta|may|tao|agk|asa|man|aka|ao |y m|ana|g a|nan|aha|kan|y k|baw|kal|a m|g n|ing|wat| y |t t|pam|a n|o y|ban| la|ali|san|wal|mag| o |g i|aga|lay|any|g s|in |nya|yon|kas|a s|isa|una|ong|aan|kat|t p| wa|ina|tay|ya |on |o m|ila|ag |nta|t n|aba|ili| ay|o a| ga|no |a i|gal|ant|han|t s|kap|kak|lah|ari|agt|agp|ran|g l|lin|as |lal|gaw|ans|to |ito| it|hay|wa |t m| is|pap|mam|nsa|ahi|nag|bat|lip|gta| di|gay|gpa|pin| si|ngk|ung|aki|y n|iti|tat|ano|yaa|y s|mal|hat|kai|sal|hin|uma|mak|di |agi|pun|ihi|a l|i a|ira|gga|nah|s n|ap | ha|usa|nin|o p|gin|ipu|ika|ngi|i n|lag|la |y p|ini|g t|uka|nap| tu|a g|tas|aru|ipa| ip|li |al |n o|a o|t k|alo| pi|sin|syo|asy|ita|aho|nar|par|o s|pak|t a|uha|sas|gsa|ags|kin|a h|iba|lit|ula|o n|nak|a t| bu|duk|kab|sam|g e|ain|ami|mas|lab|ani|kil|it | al|agb|buh|a b|g g|ba | ib|iyo|ri |yag|ad | da|edu| ed|anl|ma |ais|iga|mba|tun|ipi| ki|od |ayu| li|lih|sar|gi |g w|pah|wir|oob|loo|agg|nli|bay|map|git|mil|ok |hon|ngg|sah|iya|pas|g h|agl|tar|ngu|amb|uku|ayo|s a|p n|n m|rus|i m|l a|abu| aa",
    hun: "en | sz| va| a |és |min|ek | és| mi|jog| jo|an |ind|nek|sze|ság|nde|a v|den|oga|sza|val|ga |mél|ala|emé|gy |n a|van|zem|ele| me|egy|ély| eg|zab|tás| az|n s|bad|aba|ni |az |gye| el|ak | se|meg|sen|ény|ség|k j|yne|lyn| ne|ben|lam|tt |t a|et |agy|oz |hoz|vag|zet| te|n m|ez |nak|int|re |eté|tet|mel|tel|s a|em |ely|let|hez| al|s s| ki|ete|atá|z a| le|yen|es |ra |tés|ell|nt |sem|t s|len|nem|a s|ese|nki|enk|a m|ásá|i m|ban|kin|k m|szt| ál|ame|köz|k a|dsá|ads|ló | kö|ás |ly |on |ébe|tat|a t|n v|áll|mén| vé|nye|kül|lő |a n| cs|i é|ok |ész|ért|lla|lap|ágo|gok|nyi|tek| ke|nd |éte|ami|zés|yes|szo|t m|a a|het|fel|lat|lem|lle|el |z e|s e|k é|mbe|emb|elé|ot |lis|vet|kor|ág |olg| am|szá|ehe|leh|ogo|ott|ül |nte|éle|i v|ogy|hog| ho|kel|n k|tes|nlő|enl|ssá|áza|ház|ég |vel|ába|lek|ége| ha|a h|rés| fe|ány|del|elő|át |alá|art|tar|zto|zás|tő |yil|koz|tko|aló|s k|i e|árs|tár|mze|emz| ny|más|ett|ny |fej|ass|zas| há|d a|t é|is |ésé|ezé|téb| mu|áso|sít|lye|elm|éde|véd|ine|t k|os |it |izt|biz| bi|y a|m l|tot|a j|atk|nél|t n|ti | má|ai |lás|eve|nev|zte| bá|sel|ll |al |ere|n e|unk|mun|t e| ak|ife|kif|ako|s é| ér|ána| es|s t|got|sül| be|vál|csa|se |ése|ad |ges|tos|ja | gy|asz|ten|lmé| tá|eze|árm|bár|ess|l s|üle",
    azj: " və|və |ər |ir | hə| bi| hü| ol|üqu|hüq|quq|na |in |lar|hər|də | şə|bir|lər|lik|mal|r b|lma|r h| tə|əxs|şəx|ən |dir|uqu|una|an |ali|a m| ma|ikd|ini|r ş|dən|ar |ilə|qun|aq |ası| ya|mək|yət| mə| mü|kdi|əsi|ək |ilm|nin|ndə|olm|əti|ə y|sin|xs |nda|lmə|yyə|i v| qa| az|olu|iyy|ya |ind|zad|qla|ün |ni |lə |tin|n m|aza|arı|ət |n t|maq|lun|lıq|ə b|un |nun|q v|n h|dan|ın | et|tmə|ərə| öz|da |ə v| on|ə a|ına|ını|bil|a b|sı |il |əmi|ara|si | di|ə m|əri|rlə| va|ə h|etm|ığı|ama|dlı|adl|rin|bər|rın|n i|müd|nın| he|mas|ik |n a|dil|alı|irl|ələ|üda|sın|ınd|xsi|li |ə d|nə | bə|əya| in|ə i|lət| sə|nı | iş|anı|eç |heç|q h|eyn|ə e|dır| da|asi|rı |iş |ifa|lığ|i s|fiə|afi|daf| ed|məz|u v|kil| ha|ola|n v|əni|ır |uq |unm| bu| as|sia|osi|sos|ili|ıdı|lıd|nma|ıq |inə|əra|sil|xil|axi|dax|adə|man|a h|ə o|onu|a q|əz | ki|seç| se|ı h|min|lan|ədə|bu |raq|lı |ılı|al |ə q|r v|nla|hsi|əhs|təh|öz |ist| is|məs| əs|ina|ə t|ətl|a v|iə |n b|tər| ta| cə|edi|ala|kim|qu |i t|ulm|məh|n o|aya|ı o|ial| so|ill|siy| də|var|ins|mi |ğı |nik|r i|aql|k h|təm|tam|çün|üçü| üç|ğın|sas|əsa|z h|əmə|zam| za|sti|rəf|n e|r a|ild|həm|ıql|yan|may|n ə|mən|mil| mi|əqi|din|n d|tün| dö|miy|kah|ika| ni|fad|tif|l o|sər|yni| ey|ana|lən|am |ril|ayə|aşı",
    ces: " pr|ní | a | ne|prá|ráv|na |ost| po|ho | sv|o n| na|vo |neb|ávo|bo |ebo|nos|má | má|ažd|kaž| ka| ro|ch |dý |ždý|ti |ou |a s| př| za|ání|á p| je| v |svo|ého| st|ý m|sti|ně | by|obo|vob|ter|pro|ení|bod| zá| sp|í a|rod|kte|by |mu |u p|o p| ná|ván|jak| ja|a p|o v|í n|ová|oli|ví |spo|roz| kt|mi |í p|ny | ma|ím |i a|do | so|odn|áro|nár|li |né |tví|at |ých|a z| vy|byl|vol|en |ýt |být| bý|t s|tní|stn|o s|í b|to | do|své|vé |ran|ejn|zák|eho|jeh|nes|pří|mí |čin|kol|ají|sou| vš|ích|it |ným|ým |nu |hra|nou|u s|ému| k |du |žen|pod| ze|kla|a v|stv|pol|dní|eré|m p|stá|je |ci |ečn| ni|néh|a n|aké|áva|maj|em |rov|í m|ké |ole|nýc|ova| ve|ako| ta|i k|chr|och| oc|kon|i p|í v|smí|esm|kdo|st |i n|o z|ave|odu|bez| to|sta|ech|jí |o d|sob|se | se|í s|ými|i s| i |i v| vz|ním|pra|lně|při|tát|ste|a j|aby| ab| s |oln|a o|m n|čen|slu|řís| os|zem|mez| či|lní|áln|oci|jin| ji|y b|í z|y s|va |vše|t v|ovn|chn|děl|níc|leč| pl|vat| vo|vin|rav|vou|lad|inn|é v|anu|tej|u k|stu|est| tr|ky |ikd|nik|ivo|nit|zen|u o|ném|nez|iál|ího|len|ens|ože|oko|kéh|rac|ven|í k|e s|lán|ělá|zdě|vzd|t k|din|odi|tí | od|ré |tup|pov|pln|ště|ákl|nno|tak|erá|řed|o a|a t|res|jíc| mu|u z|rok| ob|čno|u a|y k|i j|é n|luš|ísl|oso|ciá|soc|níh|o j|cké",
    run: "ra |we |wa |e a| mu|a k|se | n | um| ku|ira|ash|tu |ntu|a i|mu |umu|mun|unt|ere|zwa|ege|ye |ora|teg|a n|a a|ing|ko | bi|sho|iri| ar| we|shi|aba|e n|ese|go |a m|o a|gu |uba|ngo|nga|hir| ca|ugu|obo|hob|za |ndi|ish|gih| at|ara|wes| kw|ger|ate|a b| ba| gu|e k|can|ama|ung|bor|u w|mwe|di | ab|nke|ke |kwi|ka |ank|yo |ezw|n u|na |iwe|e m|rez|ri |a g|gir| am|igi|e i|ro |a u|ngi|e b|ban| ak| in|ari|n i|hug|ihu|e u|riz|ang|nta| vy|ata| ub|and|aka|rwa| nt|kur|ta |iki|kan|iza|u b|ran|sha|o n|i n| ig|ivy| iv|ahi|bah|u n|ana| bu| as|aku|ga |uko|o u|ho | ka|ose|ubu|ako|guk|ite|o y|ba |i b|any|kir|o k|aho|iye|kub|amw|nye|aha| ng|o m|nya| it|re | im|o b|izw|kun|hin|e c|vyo|o i|vyi|ngu|uri|imi|imw|gin|ene|u m|zi |ha |kug|bur|uru|jwe| zi|u g|era|aga|ron|abi| y |e y| uk|gek|ani| gi|eye|ind|wo |u a|i a| ib|i i|ras|bat|gan|amb|n a|onk|rik|ne |ihe|agi|kor| ic|ze |tun|ibi|wub|nge|o z|tse|nka|he |rek|twa|gen|eko|mat|ber| ah|ni |ush|umw| bw|mak|bik|ury|yiw|bwo| nk|ma |no |kiz|uro|gis|aro|ika| ya|gus|y i|wir|ugi|uki| ki|a c|ryo|bir| ma| yi|iro|bwa|mur|eng|ukw|hat|tan|utu|wit|w i| mw|y a|mbe| ha|uza|ham|rah| is|irw|o v|umv|ura|eny|him|eka|bak|bun| ny|bo |yig|kuv|wab|key|eke|yer|vye|i y|ita|ya |a r| ko|kwa|o c",
    plt: "ny |na |ana| ny|a n|sy |y f|a a|aha|ra | ma|nan|n n|any|y n|a m|y m|y a| fi|an |tra|han|ara| fa| am|ka | ts| na|in |ami| mi|a t|olo|min|man|iza|lon| iz|fan| ol| ha| sy|aka|a i|reh|ay |ian|tsy|ina| ar|on |o a|etr|het|ona|y o|o h|zan|y t|a h|ala| hi|a f|y h|ehe|ira|a s|zo |y i|ndr|jo | jo|n j| an| az|ran|dia| dr|y s|fah|ena|ire|tan|dre| zo|mba| ka|m p|afa| di|n d|and|azo|zy |amp|ia |ren|iny|rah|y z|ry |ika|oan|ao |amb|lal|ho | ho|isy|ony|tsa|asa|a d|ha |fia|mis|ava|ray| pi|am |dra| to|rin| ta|ant|eo |zay|rai|tsi|itr|sa | fo| ra|van|ova|nen|azy| vo|mpi|ari|o f|tok|a k| ir|kan|oto|mah|ly |sia| la|n i|voa|haf|a r|ito|y k|oka|y r|y l|ano|ita|ene|its|ial|zon|aza|ain| re| as|fot|aro|fit|nat|nin|aly|har| ko|ham| no|fa |ary|atr|ila|ata|iha|nam|kon|oko| sa|elo|nja|anj|ive|isa|oa |dy |y d|o m|nto|ank|o n|otr|pan|fir|air|sir|ty |a v|sam|o s|tov|mit|rak|reo|o t|pia|tao| ao|no |y v|iar|a e|a z|hit|hoa| it|to |za |ton|eha|end|vy |idi|tin|ati|adi|lna|aln|rov|ban| za|nga|hah|oni|osi|sos|vah|ino|ity| at|hia|pir|ifa|omb|ame|era|vel|kar|va |tso|jak|fid|ifi|ais|o i|idy|la |ama|ba | pa|tot|ani|rar|mpa|haz|kam| eo| il|iva|aho|nao|n k|ato|lah|ovy| te|dro|lan|ela| mo| si|fin|miv|san|koa| he|aso| mb|sak|kav",
    qug: "ta | ka|ka |na |una|cha|ash|ari|a k|ana|pak|ish|ach|hka|shk|mi |kta|hay|man| ch|apa|ak |rin|ata|kun|har|akt|ita| ha|ami|lla| pa|ama|pas|shp| ma|tak|ayñ|yñi|in |sh |ina|uku|nka|chi|aka|a c|yta|kuy|all|tap|a h|kan| tu|ñit|tuk| ru|run|chu|an |pay|ayt|ris| ki|aku|hpa|ank|a p|kam| sh|nam|a s|uy |i k|ayp|nak|pi |nta|a m| li|ay |lia|hin|kaw|nap|ant|tam|a t|iri|nat| wa|y r|kay|aws| ya|n t|ypa|wsa|pa |lak|shi|a a|lli|iku|hu |n k|iak|yay|kis| al|shu|a w|ipa| sa| il|api|kas|yku|yac|kat|a r|huk|i c|wan|hik|a i|ill|ush| ti|ayk|hpi| ku|kac|say|hun|uya|ila|ika|yuy|pir|ich|mac|ima|a y|yll|ayl|i p|kin|a l| wi|kus| yu|lan|tan|llu|kpi| ta| pi|aya|la |yan|awa| ni|kak|lat|rik|war|ull|kll|li |ink|nch|un |akp|n s|may| ay|uch|i s|nac|sha|iki|kik|h m|ukt|pip|tin|n p|iya|nal|aki| ri|ura|tik|mak|ypi|i m|i w|n m|his|k i|riy|iwa|y h| hu|han|akl|k t|mas|pik|kap| ña|u t|nmi|nis|k a|i y|k l|kar| im|i i|wil|yma|aym|ksi|iks|uma| su|h k|has| ak|unk|huc|kir|anc|k m|pal|k k|ik |iñi| iñ|ma |n y|mun| mu|mam|tac|a n|i t|k r|sam|ian|asi|k h|was|ywa|iyt|llp|san|sum|ray|si |pan|nki|tar| ii|u k|ñik|uk |iña|kuk|wpa|awp|akk|a u|wat|uri| mi|yar|uyk|ayw|h c|ha |tay|rmi|arm|uta|las|yka|llk|kul|wiñ|ati|ska| ll|kit|n h|uti|kic|mat",
    mad: "an |eng|ng |ban| sa| ka|dha|ren| se| ba|ak | ha|adh|hak| dh|ang|se | pa|aba|a s|na |aga|ha | or|n s|ore|ara| ag|gad|are|ana|n o|ngg|ale|gan|a k|ala|dhu|tab|sar|ota|asa|eba| ot| ke|sab|ba |wi |uwi|abb|i h|huw|aan|n k|a b|bba| ta| ma|pan|hal|bas|ako|dhi|ra |kab|em |beb|ka |lak|gi |lem|g a|eka|n b|ama|nga|san|at |ong|ran|nge|a o|ggu|sa |a d|ane|n p|ken|par|aja|man|gar|ata|nek|apa| na|agi|abe| ga|e e|sal|a a|tan|g s|al |kal|gen|ta |i s|aka|e a|a p|a e| la| pe|nan| an|era|e d| e | be|n a| al|ena|uy |guy|n n|ate| bi|mas|e k|kat|uan|oan|kon|k k|a m|i d|g e|n t|g k|ada|koa|lan|ela| da|bad|ma |ne |as |lab|ega| mo|ar |car|one|i p|bi |kaa|bat|ri |on |pon| so|e b|le |ah |abi|ase|adi|epa| ep|k h|and|pam|te |ok |ste|aon|om |oko|aha|ari|ona|asi|ter| di|di |pad|e s|sad|yar|neg|ton|set|rga|ost|mos|gap|nda|a l|har|i k|ina| a | ng|kom|isa|si |a t|a h| kl|jan|daj|iga|hig|idh|hid|ndh|n m|ngs|tto|ett|arg|la |k b|ler|k d|nna| to|nao|n d|mat| ca|tad|bis|aya|epo|aen| po|bin|nya|kas|k s|n h|sya|nta|gsa|en |ant|n g|kar|i e|das|e t|e p|iba| pr|g p| ho| el|i a|hi |os |sao|uwa|tes| ja|nag|nas|lae|sia|t s|k o|nto|int|yat|arn|m p|duw|adu|eta| ko|i b|ni |g n|kla|rak|ame|mpo|jua|sok|aso|ggi|eja|pel|jam|ele| et|dil",
    nya: "ali|ndi|a m|a k| nd|wa |na | al|yen| ku|nth|ra |di |se |nse| mu|a n|thu|hu |nga| wa|la |mun|u a|unt|iye| ka|ce |ace| lo|a l|ang|e a| la| pa|liy|a u|ens| ma|idw|ons|dwa|e m|i n|ala|kha|lo |li |ira|era|ene|ga |ana|za |o m| mo|yo |o w| ci|we |dzi|ko |o l|and|dan|hal|zik|chi|oyo|pa |ner|ulu|ena|moy| um|a p| da|ape|kap|ka |iko| an|pen|a c|to |ito|hit|nch| nc|iri|lir|wac|umo|e k|lu |a a|aye| dz|kuk|a z|dwe|tha|mal| za|ing|ufu|mu |ro |ful| uf|o c|i d|lin|e l|zo |edw| zo|o a|mwa|u w|iro|o n|lan|amu|ere| mw|nzi|dza|alo|ri | li|fun|lid|gan|so | ca|kul|ofu|nso|o z|ulo|unz|o k|mul|lam|i c|san|a b|kwa| na|a d| a |una|u k|i l|nkh|ant|aku|ca |cit|oli|ipo|dip|ama|lac|wir|han|yan|osa|uli|tsa|i m|pon|kup|u d|ti |gwi|ukh|ung|hun|lon|ank|nda|iki|ina| ko|ao |diz|phu|ati|oma|i a|tsi|pat|iya|siy|kut| ya|zid|eze|ma |i k|mer|ome|mol|u n|u o|aph|ogw|izo|mba|sid|ku |sam|awi|adz| ad|izi|ula|say|e n|khu| kh|rez|vom|bvo|okh|lok|win|akh|o o| am| on|zir|map| zi|eza|ja |go |ngo|ika|its|ats|osi|gwe| co|isa|ya |haw|ani|o p|zi |ndu|kho|ezo|kir|uni|i u| ay|lal|gal|sa |bom| bo|ola|amb|wak|ha |ba |nja|anj|ban| ba|iza| bu|udz|ngw|bun|oye|o d|nal|kus|i p|i o|i y|wi | nt|e p| si|aka|ne |men|jir|nji|sed|ets|end|eka|uma|du ",
    zyb: "bou|iz |aeu|enz|eng|uz | bo|ih |oux|nz | di|ing|z g|ux |uq |dih|ngh| ca|ng |gen|ung|z c| mi|miz|ij |cae|z d| gi| de| ge|euq|you| ci|ngz|ouj|aen|uj | yi|ien|gya| gu|ngj|mbo| mb|zli|dae|gij|cin|ang|j d|nae| se| ba|z y|euz| cu|de |x m|oz |j g|ouz|x b|li |z b|h g| da| yo|nj |xna|oxn|rox| ro|h c|nzl|vei|yau|wz |z m|ix | si|i c|iq |gh |j b| cw|nda|yin| hi| nd|dan|vun|inh| ga|can|ei |cun|yie|q g|hoz|bau| li| gy|wyo|cwy|z h|gue|gz |gun|faz|unz|yen|uh |den|ciz| go|q c|gj | bi|ej |aej| fa|hin|zci| wn|j n|goz|gai|au |z s|q d| vu|h m|gva|hu |auj|ouq|az |h d|ya |uek|ci |nh |u d|ou |sou|jso|gjs|din|awz|enj| do|h s|eve|sev|z r|nq |sin|nhy|g g|g b|liz|kgy|ekg|sen|eix|wng|lij|ngq|bin|i d|ghc| ha|bae|hix|h y|j c|ghg|i b|ouh|en |n d|h f|j s|z v|j y|law|hci|anh|inz|q y|nei|anj|ozc|ez |enh|q s|aiq|uen|zsi|zda|hye|ujc|e c|siz|eiz|anz|g y|i g|q n|bie| ne| ae|giz|u c|hgy|g d|gda|ngd|cou| la|z l|auy|ai |in |iuz|zdi|jhu|ujh|yuz| du|j m| fu|cuz|eiq|g c|gzd| co|uyu|coz|zbi|biu| dw|i s|i n|aw |dun|yun|izy|daw| he|nho| ho|enq|x l|cie|q b|cij|uzl|x d|iuj|awj| ya|eij|dei|nde|sae|izc|wnq|wnh|sei|h b|aih|gzs|bwn|a d|u g|ngg|jca|e b|ran| ra|hcu| me|iet|van| bu|guh|hen|si |wnj| ve|u b|azl|inj|gak|gan|ozg|siu|yaw|i m",
    kin: "ra | ku|se | mu|a k|ntu|tu |nga|umu|ye | um|unt|mun|e n| gu|we |ira|a n| n |wa |ere|mu |ko |gom|a b|e a| ab|li |e k|mba|a a|e b|aba|ga |e u|ba |omb|o k| ba|a u|ose|u b|o a| cy|ash|eng| ag|kwi| bu|za |gih|ren|ndi| ub|ang|yo |aka|gu |igi| ib|a g|a m| nt|uli|o b|ama|ihu|e i|nta| ak|ago|ro |ora| ka|ugu|hug|di |iye|ban| am|cya|ku |ta | bw|and|sha|re | ig|gan|ubu|na | kw|obo| by| bi|a i|yan|ka |sho|kub|era|ese| we|kan|aga|hob|bor|ana|byo|ura|uru|ibi|rwa|wes|u w|no |uko|i m|mo |u a|ure|ili|uba|o n|uha|uga|n a| im|ish|bwa|bwo|wiy|ali|ber|ze |ne |ush|are|o i|u m|ger|bur|ran| ki| no|ane|bye| y |ege|teg|guh| uk|n i|rag|i a|ya |u g|e m|anz|bo |abo|gar|wo |y i|ho |age|ind|o m|eke|a s|ara|zir|ite|kug|kim|aci| as|u n|ani|kir|mbe| gi|yos|kur|ugo|gir|e c|iza|aho|i b|tur|ata|o u| se|u u|zo |i i|aha|nge|mwe|iro|akw|any|eza|uki|imi|o y|ate|u k|iki|atu|bat| in|go |tan|n u|bos| bo| na|hak|iby| at|ihe|ung|ha |bul|kar|eye|eko|gek|nya|o g|shy|e y|awe|ngo|bit|mul|nzi|rer|bag|ge |imw|bah|cir|gac|bak|je |gez|imu|eze|tse|ets|mat| ru|irw|he | ni| ur| yi|ako|ngi| ng|i n|rez|ubi|gus|fit|afi|ugi|uka|amb|o c|utu|ufa|ruk|mug|bas|bis|uku|hin|e g|ige|amo|ing| af|yem|ni | ry|a r|gaz|te |erw|bwe|ubw|hwa|iko| al|ant|zi ",
    zul: "nge|oku| ng|a n|lo |ung|nga|la |le | no|elo|lun| um|e n|wa |we |gel|e u|ele|nel|thi|ke |nom|ezi|ma |ntu|oma|hi |o n|ngo|tu |nke|onk|o l|uth|ni |a u|lek|unt| wo|o e| lo|mun|umu|pha| ku|ang|ho |kwe|ulu| ne|won|une|lul|elu| un|a i|gok|kul|ath|hla|lok|khe|eni|tho|ela|zwe|akh|kel|a k|enz|ana|ban|aka|u u|ing|ule|elw|kho|uku|ala|lwa|gen| uk|wen|ama|na |e k|ko |gan|a e|he |zin|enk|o y| ez|kat| kw|lan|eth|het|o o| ok|okw|i n|nzi|aba|e a|hak|lel|lwe|eko|ane|ka |so |yo |ayo|o a|uhl|nku|nye| na|thu|mph|do |ben|ise|kut|ike|kun| is| im|hol|obu|fan|i k|e w|nhl|nok|ini|and|kuh|ukh|kuk| ak|e i|isi|aph|zi |ile|eki|ekh| ba|eka|the|a a| le| ye|kwa|e e|fut| fu|za |mal| ab|ebe|isa| em|o w|kub|mth|i w|ndl|emp|any|olo|ga | ko|nen|nis|alu|ith|eli|ndo|seb|nda| ya|i i|eke|vik|ake|uba|abe|ezw|yok|ba |ale|zo |olu|ume|ye |esi|kil|khu|yen|emi|nez|hlo|a l|ase|ula|kek|a o|iph|o u|no |azw|kan|mel|uny|ne |ufa|ahl|lin|hul|ant|und|sa |enh|kus|kuv|lak| in|o i|din|kom|amb|zis|ind|ola|uph|wez|eng|yez|phe|phi|mba|nya|han|kuf|nem|isw|ani|iyo| iy|fun| yo|uvi|i a|ene|izi| el|cal|i e|eze|ano|nay|hwe|kup|lal|uyo|ubu|kol|oko|ulo| la|e l|tha|nan|mfu|hon|nza|hin| ey|omp|da |bo |ilu|wak|lon|iso|kug|nka|ink|i l|sek|eku| ek|thw|gez",
    swe: "ar |er |tt |ch |och| oc|ing|ätt|ill|rät|en | ti|til|för|ll | rä|nde| fö|var|et |and| en|ell| ha|om |het|lle|lig|de |nin| de|ng | in| fr|as |ler| el|gen|nva|und|att|env|r h| i |r r|ska|fri| so|har|der| at|ör |ter|all|t t| ut|den|ka |lla|som|av |sam|ghe|ga | sk| vi| av|ete|la |ens|t a| si|r s|iga|igh|tig| va|ig |a s| st|ion|ra |tti|a o| är|ten|ns |t e|na | be|han| un| an| sa|a f| la| gr| må|nge|n s|vis|lan|må |ati|nat| åt|an |nna| li| al|t f|ans|nsk|sni|gru|äll|tio|ad | me|isk|kli|s f|t i|stä|t s|ri |med|sta|h r|lik|da |dig|ta |r o|run|on | re|lag|tta|är |kap|a i|a r|änd|erv|n e|kte|n f|rvi|nom|itt|id | mo|sky|r e|ver|äns|vil|gt |igt| na|tan|uta|dra|t o|ro |isn| fa|kal|ihe|rih|erk|r u|e s|per|l v|vid|one|rel|ber|ran|ot |mot|ndl|d f|ed |ika|män|l s|bet|t b|dd |ydd|kyd|n o|s s|str|n m|tet|sin|r f| om|rna|int|r i|end|nad|l a|ap |ers|nda|t v|ent|rbe|arb| hä|ets|häl|amh|ckl|gar|nga|r m|je |rje|arj|n i|s e|lin|r t|i s|rän| pe|ilk|t l|ern|på | på|täl|d e|dom|ege|g e|tni|r a|lit|ras| så|lln|kil|ski|enn|i o|a d|erä|n a|ara| ge|äro|a m| ar|t d|ilj|els|yck| ve|g o|frå|nas|tra|ess|del|m s|liv|l l|in |v s|g a|ast|e e|val|son|rso|e t|age|nd | eg|ial|cia|oci|soc|upp|igi|eli|g s|rkl|gad|ndr|nte|öra",
    lin: "na | na| ya|ya |a m| mo|to | ko|li |a b| li|o n| bo|i n|a y|a n|ki |a l|kok|la | ma|zal|i y|oki| pe|ngo|ali|pe |so |nso|oto|ons| ba|ala|mot|a k|eng|nyo|eko|o e|nge|yon| ny|kol|lik|iko|a e|o y|ang|ye | ye|oko|ma |o a|go | ek|ko |e m|aza|te |olo|sal|ama|si | az|mak|e b|lo | te|ta |isa|ako|amb|sen|ong|e n|ela|oyo|i k|ani| es|o m|ni |osa| to|ban|bat|a t|mba|ing|yo | oy|eli|a p|mbo|o p|mi | mi| nd|ba |i m|bok|i p|isi|mok|lis|nga|ge |nde|koz|bo |gel|ato|o t|mos|aka|oba|ese|lam|kop| ez|lon|den|omb|o b|ota|sa |ga |e a|e y|eza|kos|lin|esa|e e|kob|e k|sam|kot|kan|bot|ika|ngi|kam|ka | po|gom|oli|ope|yan|elo| lo|ata| el|bon|oka|po |bik|ate| bi|a s|i t|i b|omi|pes|wa | se|oza|lok|bom|oke|som|zwa|mis|i e|bek|iki| at|ola|ti |ozw|lib|o l|osu|oso|e t|nda|ase|ele|kel|omo|bos|su |usu|sus|bal|i l|ami|o o|bak| nz|pon|tel|mob|mu | ep|nza|asi|mbi|ati|kat|le |gi |ana|oti|ndi|tan|a o|wan|obe|kum|nya|mab|bis|nis|opo|tal|mat| ka|bol|and|aye|baz|u y|eta| ta|ne |ene|emb|sem|e l|gis|ben| ak| en|mal|obo|gob|ike|se |ibo|’te| ’t|umb| so|mik|oku|be |mbe|bi |i a|eni|i o| mb|tey|san| et|abo|ebe|geb|eba|yeb|bu | as|ote|sik|ema|eya|ibe|mib|ai |pai|mwa|kes|da |may|boz|amu|a a|kom|mel|ona|ebi|ia |ina|tin| ti|bwa|sol|son",
    som: " ka|ka |ay |uu |an |yo |oo |aan|aha| wa|da | qo| in| u |sha| xa|a i|ada|iyo| iy|ma |ama| ah| la|qof|aa |hay|ga |a a|a w|ah | dh|a s| da|in |xaq| oo|a d|aad|yah|eey| le|isa|lee|u l|q u|aq | si|taa|eya|ast|la |of |iya|sa |y i|u x|sta|kas|xuu|uxu|wux| wu|iis|nuu|inu|ro | am| ma|a q|wax|dha|ala|kal|nay|f k|a k|le |ku | ku| sh|o i|a l|ta |maa|a u|dii|loo| lo|o a|ale|ara|ana|iga|o d| uu|ha |lo |o m|o x|doo|aro|kar|yaa|gu |si |ima|na | xo| fa|adk|do |a x|ad |aas| qa| so|a o| ba|lag| aa| he|dka|adi|soo|o k|aqa| is|ash|u d|had| ga|eed|san|u k|a m|iin|i k| ca|u s|n l|yad|rka|axa|elo|hel|aga|hii|o h|o q| ha|id |n k| mi|baa| xu|har|xor|aar|ax |mad|add|nta|mid|aal|waa|haa|ina|qaa|daa|agu|ark|o w|nka|u h|dad|ihi| bu| ho|naa|n a|ays|haq|a h|o l| gu|o s|aya|saa|lka| ee| sa|dda|ab |nim|quu|gga|ank|kii|rci|arc|n s|a g| ji|gel| ge|eli|ysa|a f|siy|int|laa|uuq|uqu|xuq| mu|i a|uur|mar|ra |iri|o u| ci|riy|ya |ado|alk|dal|ee |al |rri|ayn|asa| di|ooc|aam|ofk|oon|to |ayo|dar| xi|dhi|jee|a c| ay|yih|a j|ban|caa|lad|sho|d k|ida|uqd|agg|sag|ras|bar|ar | ko| ra|o f|gaa|gal|fal|u a| de| ya|o c|ii |xay|eel|aab|sig|aba|orr|hoo|u q|y d|ed |ho |sad|qda|h q|fka|n i|xag|n x|qay|lsh|uls|bul|u w|jin| do|raa| ug|ido|ood",
    hms: "ang|gd |ngd|ib | na|nan|ex | ji|eb |id |d n|b n|ud | li|nl |ad | le|jid|leb|l l| ga|ot | me|x n|anl|aot|mex|d g|b l|d d|ob |gs |ngs|jan| ne|ul | ni|nja| nj|lib|ong|nd | zh|jex| je|b j| sh|ngb| gh|gb | gu|gao|l n|han| ad|gan| da|t n| wu|il |x g|nb |b m| nh|she|is |l j|d l|nha|l g|d j|b g|el |end|wud|nex|gho|d s|d z|oul|hob|ub |nis| ch| ya|it |b y|eib| gi|s g|lie| yo| zi|oud|s j|d b|nx | de|es |d y| hu|uel|gue|ies|aob|you| ba|d m|chu|gia|dao|b d|s n|zib| go|zha|eit|hei|al |hud| do|nt |ol | fa|t g|hen|ut |gx |ngx|ab |fal|x j|b z|ian|d h|don|b w|t j|iad|nen| xi|gou|d c|b h|hao|x z|nib|anx|ant|gua| mi|s z|dan|ox |inl|hib|lil|uan|and| xa|b x| se|x m|uib|hui|d x|anb|enl| we|od |enb| du|at |ix |s m|bao| ho|hub| ng|zhi|jil|l s|yad|t m|t l|yan| ze| ju|heb|had|os |aos|t h|l d|nga| he|b a|xan|b s|sen|xin|dud|jul|d a|lou| lo|dei|d w| bi|b c| di|zhe|gt |ngt|x l|bad|x b| ja|hon|zho|blo| bl|d k| ma|deb|l z|wei| yi| qi|b b|x d|d p|eud| ge|x a|can| ca|t w|lol| si|hol|s w|aod|pao| pa|ren| re|x s|eut|pud| pu|aox|mis|gl |ngl|x w|zei|gon|enx|gha|s a|b f|l y|oub|eab|hea| to|did| ko|unb|ghu|t p|x c|geu|t s|x x|jao|ed |t c|l m|l h|jib|ax |l c|d f|nia| pi|eul|d r| no|min|l t|heu|ux |tou|ns |s y|iel|s l|hun",
    hnj: "it | zh| ni|ab |at |ang| sh|nit| do|uat|os |ax |ox |ol |nx |ob | nd|t d|zhi|nf |x n|if |uax| mu|d n|tab| ta| cu|mua|cua|as |ad |ef |uf |id |dos|gd |ngd|hit|ib |us |enx|f n|she|s d|t l|nb |ux |x z|ed |inf|b n|l n|t n|aob|b z| lo|ong|ix |dol| go|zhe|f g| ho| yi|t z|d z|b d| le|euf|d s|ut |yao| yo| zi|gb |ngb|ndo|enb|len| dr|zha|uab|dro|hox| ge|nen| ne|han| ja|das|x d|x c|x j|f z|shi|f h|il | da|oux|nda|s n|nd |s z|b g| ny|heu| de|gf |ngf| du|od |gox| na|uad| gu|inx|b c| ya|uef| xa| ji|ous| ua| hu|xan|hen|zhu|nil|jai|rou|t g|f d| la|enf|ged|ik | bu|nya|you|f y|lob|af |bua|uk |is |yin|out|of |l m|ud |hua| qi|ot |t s| ba|ait| kh|s s|nad| di|aib|x l|lol| id|dou|ex |aod|bao| re| ga|d d|b y|las|hed|b h|b s|f b|t y|jua| ju| dl|x s|hue|b l| xi|zif|dus|b b|x g|hif|x y|hai| nz|sha| li|x t| be|d j|und|hun|ren|d y|hef|xin| ib|b t|l d|aos|s l| ha|gai|nzh|gx |ngx| ao|s b|s x|el |gt |ngt|hik|aid|s t|x m|f l|f t| pi|aof|t r|eb | gh|s y|d l|gua| bi| za| fu|t h| zu|hou|deu|lb | lb|d g| mo|b k| bo|iao|ros|gon|eut|x h|al |uaf|hab|t t|k n|f x|hix|pin|yua| no|t b|ak | zo|s m| nb| we|d b|gha|f s|mol|euk|dax|l b|nof| ko|lou|guk|end|uas|t k|dis|dan|yol|uan|d t|x b|lan|t m| ch|jix|x x| hl|aox|zis|x i|et | ro",
    ilo: "ti |iti|an |nga|ga | ng| it| pa|en | ma| ka| a | ke| ti|ana|pan|ken|ang|a n|agi|a k|n a|gan|a m|a a|lin|ali|aya|man|int|teg|n t|i p|nte| na|awa|a p|na |kal|ng |dag|git|ega|sa |da |add|way|n i|n n|no |ysa|al |dda|n k|ada|aba|nag|nna|ngg|eys| me|a i|i a|mey|ann|pag|wen|i k|gal|gga| tu|enn| da| sa|nno| we|ung| ad|tun|mai| ba|l m| ag|ya |i s|i n|yan|nan|ata|nak| si|aka|kad|aan|kas|asa|wan|ami|aki|ay |li |i m|apa|yaw|a t|mak| an|i t|g k|a s|ina|eng|ala|ika|ama|ong|ara|ili|dad| aw|gpa|nai|et |yon|ani|aik|on |at |oma|sin|bal|ipa|n d|uma|g i|ket|ag |in |aen|n p|ram|sab|aga|nom|ino|lya|ily|syo|i b| ki|nia|agp|gim|kab|asi|kin|iam|ags|bab|oy |toy|n m|agt| ta|bag|sia|g a|gil|mil| um|o p|ngi|n w|i i|pad|pap|daa|iwa|naa|eg |ias|ed |nat|bae|o k|saa|san|pam|gsa|ta |kit|ma |dum|yto|tan|i e|t n|uka|t k|apu|lan|sta|sal| li|a b|ari|g n|den|mid|ad |o i|y a|ida|ar |aar|y n|dey| de| wa|a d|ak |bia|ao |tao|min|asy|mon|imo| gi|maa|sap|abi|i u|aib|kni|i l|gin|ged|o a| ar|kap|pul|eyt|abs|ibi| am|akn|i g|kip|isu|g t|bas|nay|ing|i d|kar|ban|iba|nib|t i|as |d n|y i|ura|a w|nal|aad|i w|lak|adu|kai|bsa|duk|edu| ed|may|agb|agk|tra|gge|sol|aso|agr|ngs|ian|ila|dde|edd|tal|aip|kua|umi|pay|sas|ita|pak|g d|ulo|inn|aw "
  },
  Cyrillic: {
    rus: " пр| и |рав| на|пра|ств|го |ени|во |ове| ка|на |ть | по|ия |о н| об|ет | в |сво| св|аво|ани|ост|ого|ый |ажд|лов|т п| им|ния| че| со|ело|име| не|льн|ли |чел|каж|ест|век|ать|ова|или| ра|ек |й ч|дый|жды| до|ие |еет|мее|но | ил|ии |ся |его|обо|и п|ние|к и| бы|и с|и и|ми |бод|воб|ван| за|ой |ых |ом |лен|аци|енн|о с|о п|ьно|тва|тво|при|ног|аль|ако|ва |и н|сти|ных|то |бра|олж|дол|сто|и в|ным|ое | ег|нов|их |ель|тел|ти |нос|не |пол|раз| вс|и о| ли|и р|ыть|быт|вле|ред|ию |тор| ос|ься|тьс|оди|щес|я и|как|про|жен|ым |пре|а с|сно|е д|нно|о и|ий | ко|о в| ни| де|сту|лжн|сов|е в|ном|оль|ран|оже|иче|ей |аст|нны| от|туп|м и|одн|зов|рес| мо|осу|ля |осн|а о|вен| то|о б|шен|тве|общ|а и|е м|ьны|обр|вер|чен|я н|жно|чес|ак |лич|нии|е и|все|бще|ват|есп|мож|й и|ное|о д|бес| во|я в|ду | ст|дно|она|нац|ден|ежд|х и| бе|и д|ны |дос|для| дл| та|льс|ате|ции|я п|ую |ите|е о|ной|под|ото|стр|ста| ме|ели| ре|я к|тоя|ами|ен |ь в|ю и|азо|гос|м п|ь п|т б|жет|уча|суд|ьст|дст|щит|ащи|защ|кон|нию|ам |оду|ере|гра|печ|о о|оро|кот|и к|тра|ник|уще|циа|оци|соц|нал|еск|о р|ког|дру| др|ни |ава|нст|ем |авн|ыми|едс|дин|дов| го| вы|в к|ые |обе|му |я е|слу|уда|так|кой|ту |иту|зак|ход|вол|раб|кто|икт|ичн|нич|от |ина| к |тер|род|нар",
    ukr: "на | пр|пра| і |рав| на| по|ня |ння| за|ого|ти |во |го | ко|аво| ма|люд|о н| не| лю|юди|ожн|кож|льн|жна|дин|ати|ає |их |ина|пов|сво| св|анн|є п|має|або|а л| бу|не |енн|бо | аб|а м|ови|ні | ви| ос|аці|вин| та|без|обо| ві| як|ере| до|і п|ува|о п|аль|них|ом |ми |іль|ног|та |ий |при|ою |ть |ста| об|ван|инн|ті |ост| у |ся |ват|бут|ист| мо|езп|ути|нов|пер|ії |и п|бод|воб|ств| в |о в|від| бе|ако|під|тис|кон|но |ва |нні|і с|а п|сті| сп|ний|ду |ьно|она| ін|дно|ним|ій |а з|ну |мож|її | її|ля |соб|му |ої |яко| пе| ра|ід | де|і в|и і|чин|вно|ому|ном|у п|і н|а с| су|а о|нен|ися|ово|нан|одн|у в|і д|ава|ідн|рів| рі|і р|ими|віл|им |ції|о д|а в|сту|оду|буд|ова| пі| ні|я н|е п|нац|и с|нна| од| ро|нос|ьни|ють|и з|ки |і з|а б|спр|чен|же |оже|е м|овн|рим|е б|то |ніх|осо|удь|ві | ре| ст|рац|до | со|роз|лен|вни|івн|род| вс|спі|ков|зпе|ів |для| дл|ї о|хис|ахи|зах|‐як|ь‐я|дь‐|я і|так|зна|заб|сть|ту |ною|а н|тор|сно|о с|жен|ціа|оці|соц|інш|і м|кла|и в|тер| ді|іст|ові|у с|я в|аро|сі |віт|сві|осв|роб|піл|рес|за |печ|абе|ку |лив|ерж|дер|в і|авн|тав|ав |ами|ком|вле|о б|ь п| що|їх |тво|хто|іхт|ког| кр|ано|тан|іал|нал|нь |х п|жно|леж|але|про|тва|рат|о о|х в|нар|льс|цій|кор|час|ржа|ї с|ину|дст|о з|раз|мін|а р|зак",
    bos: " пр| и |рав|на |ма |пра| на|има| св|а с|да |а п|во |је |ко |ако|о и| по|аво|е с|а и|ти | им| да| у |сва|но | за|о н|ва |и п|или|вак|ли | ко|не | ил|кој| не| др|ост| сл|ња |им |и с|у с|и и|ава|ије|а у| би|ств|се |вањ|а д|ом |јед|бод|обо|лоб|сло| се| ра|их |сти|а н|ње | об| је|при|дру|у и|ју |о д|ити|вој|раз|ање|ова|дје| ос|е и|ло |е п|ања|ује|и д|бра|тре| тр| су|у з|а к|ог |у п|оје|циј|реб|а о|а б| ње|и у|миј|ни |нос|ба |едн|сво|њег| из|про|е д|жав|бит| ни|и о|ста|а з|авн|вје| ка|бил|ово|а ј|ају|ист|и н|них|јел|ту |ред|гов| од|е о|оји| см|ја |о к|ило|аци|е у|пре|о п|еба|у о|су |вим|ичн| са| дј|а т|ија|шти|чно|ржа|држ|сту|дна|одн|ени|за |ива|ном|ем |ду |ран|вно|сми|јер|е б|е н|де |пос|м и| до|у д|нак|а р|обр| мо|ним|его| кр|тит|кри|ве |ан |ико|ник|ну |и м|ног|ено|сно|е к|туп|руг|ка |ода|рив|вољ|алн|м с|иту|ашт|заш|ани|сам| ст|акв|ови|осн|род|аро| ми|ји |тва|дно|нст|ак |ите|љу |вич|рад|у н|у м| та|дст|тив|нац|рим|кон|ку |њу |оду|жив|амо|тво|тељ|под|еђу|г п|нов|ина|нар| вј|и б|ој | ов|аве|ву |анс|оја|зов|азо|уде|буд| бу|е т|и в|ења|еди|ниц|нап|мје| ис|слу|едс|о о|зак|и к|м п|тно|иво|ере|нич|как|ада|вни|уги| ро|мов|вен|о с|то |те | вр| бе|ара|кла| бр|у б|у у|и т|она| он|ави|јал|дни| ск",
    srp: " пр| и |рав|на |пра| на|ма | св|има|да |а п|во |ко |ти |аво| по|а и|ако|а с| за| у |о и| им|и п|ва |сва|вак| да|о н|е с|ост| ко|ња |ли |или|не |ом | не|а н| сл| ил|је | др|и с|но |кој|у с|ава| ра|ог |сло|ју |им |сти|бод|обо|лоб|ити|а о|ств|и у|а д|ни |јед|у п|при|едн| би|и и|а к|о д|ста|их |дру|а у| је|ања| ос| ни|нос|про|ају|и о| де| су|у и|се |ње |ја |ова|и д|циј| об|ује|ред|жав|е и|е п|а ј|дна| се| од|ве | ка|ени|ржа|држ|а з|авн|ења|аци|вој|ово|у у|м и|оја|вањ| из|ија|у з|ање|ран|е о|род|и н|е б|раз|за | ње|гов|ичн| ст|нов|сно|осн|ду |пре| тр|су |ву |одн|а б|сво|њег|ним|них|ту |тит|шти|ку |ном|бит|е д|ме |ико|чно|оји|ло |вно|ник|ика|без|ара|де |у о|вим|нак| са|рив|аве|ан |вољ| кр|о п|сме|е к|ног|ји | ов|е у|тва|бра|руг|реб|тре|у д|ода| мо| вр|ављ|у н|его|дел|м с|кри|о к|ашт|заш|њу | см|ани| ли|дно|еђу|алн|ла |акв|ој |ком|сту|уги|ави|а р|ка |рад|оди|вич|тав|иту|уде|буд| бу|пот|оду|жив|ере|тво|ило|бил|аро|е н|ови|пор|ено|штв|нац|ове|м п|туп|пос|рем|дни|ба |нст|а т|оју|аст|ива|е м|вре|вља|ну |беђ|ист|ен |те |дст|рот|зак|ао |као|и к|јућ|о с|ст |сам|м н|тер|нар| ме|и м|кол|е р|ушт|руш|вер|как| бе|и б|кла|ада|еба|ена|она| он|тву|анс| до|рак|слу|и в|ниц|у к|мен|врш|еме|едс|иви|о о|јав",
    uzn: "ан |лар|га |ир | би|ар | ва|да |ига| ҳу|ва |бир|уқу|қуқ|ҳуқ| ҳа|р б|ган|иш |ида| та|а э|ини|ади|нг |дир|иши|лик|лиш|ий |или|ари|уқи|ҳар|лан|инг|ши |дан|нин|инс|кин|сон|нсо| ин| му|қиг| ма|он |р и| бў|эга| эг| ўз|ни |бўл|гад|и б|ки |ила|ёки| ёк|а б|н б|ин |р ҳ|ала|эрк| эр|лга| қа|рки|ш ҳ|и ҳ|н м| бо| ба|ик |ара|иги|лиг|ри |қил|а т|бил| эт|ниш|нли|кла|и в|бош|эти|ани|им |и м|оли|қла|а ҳ|лаш|атл|тил|а қ| ол|оси|мас|қар|инл|лат| қи|таъ|ҳам|ги |иб |мла|ўз |н э|мум| да| бу|ат |ш в|ун |ати|мки|умк|тла|иро|ўли|бар|ири|риш|ият|али| бе| қо|а ш|аро| ке|и т|рла| те|ча |рча|арч|а ў| шу|тиш|н ҳ|тга| са|аси| ха|рак|лин|ола|имо|шқа|ли | ту|амл|лла|сид|н ў| ас|нид|а и| ки|н т|нда|к б|ера|ошқ|сиз|ор |а м|р в|енг|тен|мат|мда|амд|лим|й т|ят |и а|ино|илг| то|тни|ана|ас |эма| эм|а ё| ша|аш |а а|тар|кат|ака|ак | де|аза|илл|сий| си| со|уқл|н қ|ода|ъли|аъл|ник|ада| ни|тда|гин|уни|сит|ай |қон|н о| жа|ким|еч |ҳеч| ҳе|ўзи|лак|кер|икл|лли|ур |зар|шла|риг|ирл|дам|коҳ|ико|а д|ам |н в|рти|тиб|тал| иш|чун|учу| уч|сла|а у|рин|сос|асо| ун|на | ка|муҳ|диг|ч к|асл|лма|ра |бу |хал|ўлг|и к|екл|р д|қат|ага|и қ|оий|мил| ми|қа |и с|жин| жи|син|рор|а в|лад|а о|тли|мия|н и|аб |тир|з м|дав|рга|аги|а к|нла|ақт|вақ|арт|аёт|лаб",
    azj: " вә|вә |әр |ир | һә| би| һү| ол|үгу|һүг|гуг|на |ин |лар|һәр|дә | шә|бир|ләр|лик|мал|р б|лма|р һ| тә|әхс|шәх|ән |дир|угу|уна|ан |али|а м| ма|икд|ини|р ш|дән|ар |илә|гун|аг |асы| ја|мәк|јәт| мә| мү|кди|әси|әк |илм|нин|ндә|олм|әти|ә ј|син|хс |нда|лмә|јјә|и в| га| аз|олу|ијј|ја |инд|зад|гла|үн |ни |лә |тин|н м|аза|ары|әт |н т|маг|лун|лыг|ә б|ун |нун|г в|н һ|дан|ын | ет|тмә|әрә| өз|да |ә в| он|ә а|ына|ыны|бил|а б|сы |ил |әми|ара|си | ди|ә м|әри|рлә| ва|ә һ|етм|ығы|ама|длы|адл|рин|бәр|рын|н и|мүд|нын| һе|мас|ик |н а|дил|алы|ирл|әлә|үда|сын|ынд|хси|ли |ә д|нә | бә|әја| ин|ә и|ләт| сә|ны | иш|аны|еч |һеч|г һ|ејн|ә е|дыр| да|аси|ры |иш |ифа|лығ|и с|фиә|афи|даф| ед|мәз|у в|кил| һа|ола|н в|әни|ыр |уг |унм| бу| ас|сиа|оси|сос|или|ыды|лыд|нма|ыг |инә|әра|сил|хил|ахи|дах|адә|ман|а һ|ә о|ону|а г|әз | ки|сеч| се|ы һ|мин|лан|әдә|бу |раг|лы |ылы|ал |ә г|р в|нла|һси|әһс|тәһ|өз |ист| ис|мәс| әс|ина|ә т|әтл|а в|иә |н б|тәр| та| ҹә|еди|ала|ким|гу |и т|улм|мәһ|н о|аја|ы о|иал| со|илл|сиј| дә|вар|инс|ми |ғы |ник|р и|агл|к һ|тәм|там|чүн|үчү| үч|ғын|сас|әса|з һ|әмә|зам| за|сти|рәф|н е|р а|илд|һәм|ыгл|јан|мај|н ә|мән|мил| ми|әги|дин|н д|түн| дө|миј|каһ|ика| ни|фад|тиф|л о|сәр|јни| еј|ана|лән|ам |рил|ајә|ашы",
    koi: "ны |ӧн | бы|да | пр|лӧн|рав| мо|пра| да|быд| ве|орт|лӧ |ӧй |мор|ӧм |аво| не|во |ыд |ыс |нӧй|ын |м п|д м|ыны|тны| ас|тӧм|льн| эм|вер|сь |ьнӧ|эм |н э|тлӧ| кы|сӧ | по|ерм|сьӧ|ртл|аль| кӧ|эз | ӧт|ӧ в|то |ето|нет|ылӧ| ко|тшӧ| от| и |ы с|бы |ӧ б|ств|кӧр| вӧ|шӧм|кыт|та |на |з в| се| до|вол|ӧс | сы|ы а|ола|рмӧ|ас |оз | оз| сі|а с|тво|с о| вы|ліс|ӧ к|ытш|ӧ д|ис |ісь|ӧтн|ась| ол| на|аци| эт|а в|злӧ|сет| во| чу|лас|лан|мӧ |тыс|рты|ӧрт|ы п|ӧтл|о с|эта|дз |кӧт|ӧдн|вны| мы|н н|удж| уд|выл|ӧ м|рті|орй|ись| со|воэ|ыдӧ|й о|кол| го|с с|сси|сыл|ысл|йын|кин|олӧ|тӧн| сь|ана|ӧр |ция|а д|ӧмӧ| ви|з к| эз|ы б|тӧг|ӧт |мӧд|ест|ост|ӧны|тир|оти|укӧ|чук|н п|онд|пон|слӧ|кер| ке| об|сис|суд|а н|дор|кон|нек|н б|лӧт|с в|ті |ьӧр|тра| ст|нал|она|нац|н к|кӧд|ӧг |скӧ|ть |етӧ|дӧс|быт|рны|ӧ н|тсӧ|рре|а б|нда|с д|асс|ы к|асл| ло|ьны|сьн|ы м|еки|ы д| мӧ|ь м|ы н|ытӧ| ме|рйӧ|иал|й д|итӧ|а к|ӧсь|мӧс|овн|зын|а п|отс| ли|оля|ӧ а|осу|ӧя |нӧя|езл|рез|мед|с м| сэ|ь к|рйы|ако|зак| за|ьын|ннё|мӧл|умӧ| ум|ы у|н в|м д|н с| дз|н о|ран|стр|озь|поз|з п|о д|циа|оци|соц|ион|а м|еск|чес|нӧ |з д|тсь|бӧр| бӧ| ов|вес|кыд|ӧ с|воы|код|тко|ӧтк|оль|дбы|едб|сьы|чын|тчы|ӧтч|тла|мӧн|сла|йӧз| йӧ|т в|ы и|ез |о в|оны|йӧ |анн|ӧль| пы|ан |нӧс|нит| су|м с",
    bel: " пр|пра| і |ава|на |рав| на| па|ны |ва |або|ць | аб|ае | ма|аве|анн|ацы|сва| св|е п|льн| ча|не |ння|ала|а н|ай |лав|чал| ко| ад| не|га |ожн|кож|век|ня | як|жны|ы ч|мае|а п|ага|бо |ек |а а|ца |цца| ў | за|ых |пав|а с|го |він|дна|бод|мі |ваб|ван|ам | вы| са| да|ста|аві|нне|асц|най|цыя|наг|ара|і н|к м|яго| яг|ьна|пры|аць|і п|одн|ств|ама|ных| бы|тва|дзе|аль| ра|ні |і с|і а|ыць|а б|енн|лен|ці |оўн|ым |рац|інн|іх | ас| та|то |нас|які| дз|чын|оль|і д|аво|ад | ні|сці|ымі|ным|быц|я п|ьны|ыя |аро|ана|іна|і і|рад| гр|ля |ўле|о п|а ў|рым|пад|ыі | ін|амі|дзя|рам|цыі|аба|а і|ду |жна|ўна|нал|нац|ры |эта|гэт| гэ|нен|да |ах |гра|кац|ука|а з|кі |адс|ў і|нст|энн|я а|нні|оду|а р|нна|ход|нан|пер|х п| у |адз|і р|мад|м п|е м|аду|дст|для| дл|оў |нае|і м|ако| ка|ы ў|бар|е а|ацц|ую |ыцц|сам|яўл|але|род|раб| пе|што| ўс|адн| су|роў| ро|дук|люб|ь с| шл|раз|нав|зна|вол|удз|ада|жыц|чна|ве |а т|асн|сац|ера| рэ|яко|кла|аны| шт|ь у|аюц|нар| ус|соб|асо|пам|я ў|авя|чэн|воў|так|ну |ю а|ь п|зак|кар|е і|ь а|бес|ія |кія|х і|заб|аса|ім |жав|і з|леж|тан|ахо|яль|ыял|о с|яна|кан|ака|інш|алі|вы | мо|нах|я я|м н|ога| бе|й д|о а| ст|ены|і ў|а д|есп|шлю|цця|ы і|ыст|рыс|люч|клю|тац|уль|ынс|ачы|спр| сп|аў |ыма|ары|кам|е ў|і к|кон",
    bul: " на|на | пр|то | и |рав|да | да|пра|ств|ва |а с|а п|во |но |ите|та |о и|ени| за|не | не| вс|ван|аво|а н|ото|е н|о н|а и|ки |ие |те |ни |има| им|ли |или|ия | по|ове|ане|чов|ма | чо|и ч|а д|ние|ани|и д|ест| ил|век|все| об|ек |еки|сек|ава|тво|сво| св|вот|а в|и с|ост| ра|ова|а о|е и|ват|и н|е п|к и|а б| в |и п|лно|о д| се| бъ|при|раз|ето|ъде|бъд|ата| ко| тр| ос|аци| съ|бод|обо|воб|ат |за |тел| е |о с|де |о п|ен |и в| от|се |ния|ран|алн| де|бра|его|нег| из|от |ята|как|оди|е с|и и|ден|пре|бва|ябв|ряб|тря|нит| ка|ява|про|ст |а з|гов|вен|тве|о о|а р|акв|о в|и з|ред|нос|ият|е д|щес|нов| ни|ция| до|йст|о т|е т|ржа|ърж|дър|ено|пол| с |обр|тва|нот|рес|ейс|и о|е в|кой|общ|лен|она|нац|иче|ез |без| бе|ежд|ува|вит|ри |зак|и к| ли|а е|под|ели|ник|си |е о|а т|и р|т с|ка |оет|елн|нен|ой |гра|жен|дру| ре|а к|сно|осн|лич|зи | та|са |нст|авн|чки|ичк|сич|вси|люч|клю|дно| мо|еме|тъп|а у|изв|тви|дей|я н|кри|ато|о р|й н|ико|ичн|жав| дъ| то|бще| со|лит|т н| си|т и|вни|одн|жда|зов|азо|уча| гр|кое|стъ|вол|лни|сре| ср|ква|кон|тно|ака|и у|ко |ган|ода|чен|лст|елс|стр| къ|ста|род|нар|и м|иал|нал|руг| др|чес|ди | са| те|сто|дос|раж|рез|чре|гат|еоб|а м|о е|ине|аст|ово|чно|аве|му | му|ано|ита|ими|ако|нак|лаг|ови|ан ",
    kaz: "не | құ|ен |ұқы| ба| қа|құқ|ық |ға | жә|әне|жән| не| бо|де |дам|ада|а қ|тар|ына| ад|ылы| әр|ың |ан |ін |қыл|ар |еме|на |р а|лық|уға|ала|ықт| өз|мес|әр | жа|мен|ығы|лы | де|қта|ның|н қ|ған|іне|бас|ары| ме| қо|еке|ын |да |е қ|ды |асы|се |есе|ам |бол|анд|нем| бі|ара|ы б|ста|тан|нды|н б|ің |е б|ілі|тиі| ти|бар|ғы |нде|етт|иіс|қығ|іс |лар|ге |ы т|інд|ік |бір| бе| ке|алу|е а|алы|луы|а ж|ері|олы| те|қық|н к| та|н ж|ғын|тті|іні|тын| ер|нда|ім | са|е ж|аты| ар|рға|еті|ана|ы ә|уын|лға|өзі|ост|егі|тік|қа |сқа|рын|кін|луғ|ң қ|нің|уы |бос|асқ|қар|дық|нан|мыс|мны|амн|ы м|айд|ке | же|зін|рде|рін|е т|ген|ып |ры |ті |сын|қам|ден|і б|гіз|рал|е ө|лан|сы |ама|тта|тық|бер|ді |біл|ркі|өз |зде|кет|қор|дай|уге|ы е|ынд|нег|оны|ей |мет|аны|а т|жас|ауы|лге|аса|еге|дар|ру |ау |ерк|ы ж|рыл| то|н н|е н|тін|ір |сіз|тер|лма|і т|кім| ал|р м|лік| мү|е м|түр| тү|кел|лып|ең |тең|рлы|лім|рды|ард|атт|с б|ыры|сыз|ыс |елг|дал|йда|орғ|рқы|арқ| жү|тал|ылм|а б|ігі|лде|із |қты| еш|дей|ай |жағ|кті|ікт|гін| әл|тты|ұлт| ұл|е д|ыны|лін|р б|еле|кұқ| кұ|амд|м б| ет|оға|құр| кө|аға|тол|шін|айы| қы|қал|жек|і н|ес |ағы|е о|елі| ел|н е|зі |шкі|ешк|олу|ция|мас|ғда|ағд|лтт|імд|ным| да|а д|әсі|с ә|қат|ірі| со|ң б|аза|мда|айл| ас|ғам|қоғ"
  },
  Arabic: {
    arb: " ال|ية |في | في|الح| أو|أو | وا|وال|حق |ة ا|لحق|الت|كل |الم|لكل| لك|لى |ق ف|ته |و ا|ة و|شخص|ة ل|ات |الأ|ي أ|ون | شخ|م ا|أي | أي|ان |أن |مة |ي ا|الا|لا |ها |اء | أن| عل|خص |ن ا| لل|د ا|من |فرد|ما |الع|ت ا|حري|على|ل ف|رد |ل ش| لا|رية| إل|ة أ|ا ا|ن ي| ول|ا ل|ا ي| فر| من|ة م|الق|جتم|ن أ|ق ا|الإ| حر|له |ه ل|اية|لك |ه ا| دو|دة |اً |ين |ه و|لة |ي ح| عن|ماع|ي ت|ذا | حق|قوق|حقو|، و|ن ت|مع |ص ا|ام |د أ| كا|هذا|الو| إن|مل |امة|ع ا|إلى|ة ع|ماي|حما|ن و|لتع| وي|ير |نون|ي و|اسي|الج| هذ|نسا|وق |ترا|عية|ه أ| له|سية| يج| با|دول|انو|قان|لقا|ة ب|ة ت|تما|الد|يات|ع ب|سان|إنس|هم |علي| مت|لمج|ذلك|عمل|لأس|وز |جوز|يجو|بال|غير|ك ا|كان|ساس|أسا|دم |لاد|اعي|الر|تمي|دون|تمت|لتم| يع|ليه|ساو|اجت|ي م|لعا|لجم|تعل|ر و|تمع|مجت| مع|يه |ى أ|فيه|ى ا| كل|لات|ملا|ود |انت|الف|يها|ي إ|تي |الب|لي |قدم|ال |اد |ل ا|يز |ييز|ميي| تم|لحر|تع |متع|ا ب|عام|ا و|ق و|رام|ل ل|لاج|را |الش| وإ|يم |ليم|شتر|ا ح|واج|لزو|ول |ا ف|ولة|لحم|أسر| ذل|ه ف|اته|مسا|لمس| تع|عن |ه ع|وله|يته|ن ل|رة | وس|اة |يد | تح| مس|ي ي|لتي|عة |ولي|لدو| أس| وف|ل و|أية|ني |الس|لان|لإع|ة ف|ريا|ل إ|م ب|امل|كرا|تسا|ميع|جمي| جم|أول|بية|عيش|تحق|ادة|س ا| مم|معي|جما|عات|اعا|ارس|مار|مما|م و|راك|اشت|الط|اج |زوا|الز| وم|حدة|تحد|لمت|مم |لأم|ده |بلا| بل|ار |يار|تيا|ختي|اخت|ن م| مر",
    urd: "ور | او|اور|کے | کے| کی| کا|یں | حق|کی |کا | کو|ئے |ے ک|یا |سے |کو |شخص| شخ|نے | اس| ہے|میں|حق | ہو| می|خص |ے ا| جا|اس | سے| یا|ہر |ی ا| کر| ہر|ے۔ |سی |ہیں|ا ح|ص ک|وں |ے م| ان|ر ش|۔ ہ|ائے|زاد|آزا| آز|ام |ر ا|ق ہ|ادی|جائ|ں ک|ہے۔|م ک| کس|ا ج|ی ک|س ک|کسی| پر|ے گ|ہے |ار |ت ک|دی |پر |و ا| حا| جو| ہی|ان |ی ج|ری | نہ| مع|جو |ل ک|ی ت|ن ک|کرن|ئی |ل ہ|تی |ہو |ہ ا| ای|صل |اصل|حاص|رنے|ی ش|نہ |۔ ا|ں۔ |یں۔|ر ک|ر م| مل|وہ |معا|رے |ں ا|نہی|ے ہ|ے ب|ایس|ے ل| تع| گا|یت |ی ح|ا ا|ی م|اپن| اپ|کیا|می |ی س| جس|ہ ک|نی |اشر|عاش| دو|لئے| لئ|انہ|وق |قوق|حقو|مل | قا|کہ | گی|ر ب|ہ م| وہ| بن|ی ب|ملک|جس |ا۔ |ریق|ر ن|ے ج|اد |ات |گی |د ک|ے ح|دار|ر ہ|گا۔|قوم| قو|ے، |ا س|دوس|ر پ| و | شا|ی آ|ں م|ق ح| پو| با|خلا|انے|یم |لیم|و ت|ون | کہ|ی، |۔ ک|ا پ|ن ا|لک |علا|ا م|ق ک|ائی|وسر|ی ہ|وئی|یر |ا ہ|علی|و گ|وری|دگی|ندگ|و ک|یسے| من|ائد|رائ| مر|پور| طر|ومی|ے خ|سب |نون|انو|قان| سک|وام|ین | رک|تعل|لاق|غیر|دان|، ا| بی| مس|یوں|نا | بھ| بر|رتی|ادا|امل|یہ | یہ|ہ و| عا|ی پ| بچ|اف |لاف| خل|ی۔ |گی۔| دی|ھی |بھی|دہ |جا |پنی|قوا|اقو|رکھ|ے ی| عل|کوئ|، م| چا|ے س|ر ع| پی|برا|ر س|ر ح|سان|م ا|کام|شرت| را|شام|من |زند| زن|ب ک|ت م|اہ |اری|س م|ر ج| مح|ورا|ے پ|طری|ہوں|ال |ں س|ی ن|کرے| مق|ت س|تحف| تح|و۔ |ہو۔|بند| اق|د ہ| ام|امی|الا|لت |شرے|ے ع|ا ک|فری",
    pes: " و | حق| با|ند |رد |دار| دا|که |هر | در| که|در | هر|ر ک|حق |د ه|از |یت | از|یا |کس |ود |ارد| یا| کس|ای |د و| بر| خو|ق د|باش|شد |د ک|ار |د ب| را|ه ب|ان |آزا| آز|را |اشد|ی و|ه ا|ین |ید |زاد|س ح|خود|ی ب| اس|ده |دی |ور |اید|ه د|ری |و ا|تما|ات | نم|ی ک|ادی|نه |رای|د ا| آن|است|ر ا|ر م| اج|مای|ون |قوق|حقو|و م| ان|انه| هم|وق |ایت| شو|ی ا| مو| بی|با | تا|ورد|انو|ست |وان|برا|ام |شود|آن |جتم|ی ی| کن|ر ب|کند| مر|ت م|های|ت ا| مس|ی، |ماع|اجت|توا|یگر|و ب|دان|ت و|ا م| بد|عی |کار| من|مور| مق|ی د| زن|ی م|ن ب|ر خ|اه |ا ب|اری|د آ|مل | به|اعی|د، |دیگ|ت ب|بای|این| می|ن و|ق م| عم| کا|ن ا|و آ| حم|نون|ه و|و د|د ش| ای|شور|کشو| کش|لی |نی |ه م|بعی|ر ش|یه | مل|میت|ی ر|رند| شر|می |وی |ساو|قان| قا|مقا|او | او|د م|گی |نمی| اح| مح|مین|ئی |ادا| آم|خوا|گرد| گر|مند| شد|ائی| دی|ز ح|هیچ| هی|اده| مت|نما|ت ک|ران| بم|ن ح|ر ت|حما|ارن|مسا|دگی|ومی|ن ت|ملل|بر |هد |واه|بهر| اع|‌ها|ق و|، ا|عیت|یتو|ا ر|ن م| عق|همه|ا ه|زش |وزش|موز|آمو|انت|تی |جام|موم|عمو|تخا| فر|طور|د د|ه ح|ردا|اوی|نوا|انی|رار| مج|ی ن|حدی|احد|ندگ|زند|شخص| شخ|‌من|ه‌م|ره‌|هره|شده|ع ا|و ه|اسی|هٔ |یده|عقی|ا ا|مه | بش|اد |دیه|ا د|دوا|ی ح|ابع|ی ت|خاب|نتخ|رور|و ر|شرا| خا|ٔمی|أم|تأ|اً |امل|له |د ر|اسا|خور|بل |ابل|قاب|یک |سان|قرا|ا ن|خصی| ام| بو|یر |الم|بین|اهد|تبع| تب",
    zlm: " دا|ان |دان| بر| او|ن س|رڠ |دال| ڤر|له |كن | كڤ|ن ا|ن ك|ن د|يڠ | يڠ|ڤد |حق |ورڠ|تيا|ياڤ|ارا|كڤد|اور|رحق|برح|اله|أن |ولي| ات|اتا|ڠن |تاو|اڤ |ستي|ليه|او | ست|ڤ ا|يه |را |ه ب|ه د|عدا| عد|ن ڤ|ن ب|ين | تر|ق ك|ن ي|يبس|بيب| تي| سو| كب| سا|ن م|ن ت|لم |الم|د س|ڠ ع| من|چار|د ڤ|رن |سام| ما|ڽ س|ن، | بو| اي|ندق| حق|ڬار|نڬا|بول|سبا| سب|اتو|ا س|قله| ڤم| مم|وان|سچا| سچ| كس|ا ب|سن | سم|ڤرل|اون|نڽ |تن | با|هن |سيا|ا ڤ|ارڠ|بار|ڤا |بسن|كبي|ام |يند|ي د|اڬي|ڠ ب|باڬ|ي ا|مان| لا| د |دقل|هند| هن|ت د|ادي|وين|يكن| نڬ|، ك|ن٢ | ڤو|بڠس|ق٢ |ات |اول|اكن|اڽ | سس|ون |اد | كو|اين|دڠن| دڠ|ائن|تو |تي |ن ه|ڬي |سي |ق م|وڠن|دوڠ|ندو|لين|رلي|نتو|ڤون|وات|ياد|تيك|ڠسا|ڤمب|ترم|٢ د|حق٢|وا |لوا|ماس|وق |ه م|ل د| مل|وند| ڤڠ|ا، |، ت|لائ|اي |مڤو|يك |ي ك|رات|مرا| بي|سمو|و ك|، د|سوا|ڠ م|ڠ س|ڠ٢ |ڤري|يري|دير|ا ا|اسا|ڤ٢ |تا |سوس|، س|جوا|ڠ ت|رأن| ان|سأن|ريك|يأن|ري | در|امر|كرج| ڤل|ا د|جرن|اجر|ارك|لاج|د ك|وار|برس|ونت|منو|سال|ينڠ|دڠ٢|ندڠ| مڠ|اڤا|سسي|ساس|نن |ڤول|اڬا| بڠ| سڤ|مبي| اڤ|ڠ ا|ارأ|ڤرا|ي س|بس | دل|ا م|موا|ڤلا|ملا|ڤرك|كور|وبو| كأ|وكن|أنڽ|كسا|ڠڬو|ادڤ|هاد|رها|تره|كوم|توق|م س|ڠ د|دي | دي|٢ س|ندي|اس |ادا|بوا| دب|ڠ ڤ|ڽ، |اڤ٢|رتا|ال |يال|وسي| كت|أن،|نڤا|تنڤ| تن|م ڤ|رسا|ممڤ| مر|ن ح| كم|نسي|جأن|ؤي |لؤي|الؤ|لال|كڤر|كت |ركت|شار|مشا| مش|جاد|رڬا",
    skr: "تے |اں |دی |دے | ۔ |وں | تے| دا| کو|کوں| حق|دا | دی|یاں| دے|یں |ے ا|شخص| شخ|ہر |ے ۔|اصل| حا|حق |خص | ہر|صل |حاص|ہے | ہے|ال |ق ح|ل ہ| نا| کی| وچ|۔ ہ|یا |سی |ے م| او|وچ |اتے|کیت|ا ح|ادی|نال|ص ک| ات|ر ش|ہیں| یا|ں د| ای|یسی| مل|وند|کہی| کہ|ی ت|زاد|ازا| از|ندے|ں ک|ار | وی|ے ک|ئے | ان|ڻ د|نہ | کر|اون|ے و|دیا|ی د|ں ا|ے ب|ویس|وڻ |ی ن| ہو|تی |ی ۔| نہ|ی ا|یند|و ڄ|آپڻ| آپ|ا و|ے ج| کن|ے ن|ندی|ت د|ے ح|ی ک|ئی |ملک|یتے|ن ۔|تھی| تھ|ون |ں م| بچ|۔ ا|نوں|کنو|ڻے |اری|ا ا|ے ہ|ل ت| ڄئ|وق |قوق|حقو|ل ک|خلا| جی|لک |دار|یت |کرڻ|انہ|کو |ہکو| ہک|ن ا|مل | وس|ں و|پڻے| تع|ی م|اف |ے خ|نون|قنو| قن| لو|۔ ک|ری |لے |تا |یتا| قو| چا|ہاں|ڄئے|ق ت|ایہ|رڻ |ے د|ر ک| و |لاف| خل| جو|ی و|او |ہو |ئو |چئو|بچئ|یر |ہوو|ا م|ی ج|الا|ین | جا|می |نہا|ان |ات |سڱد| سڱ|یب |سیب|وسی| شا|ب د|یوڻ|ام |اوڻ|ے ت|ڻ ک| مط|ں ت| ون| کم|ن د|رکھ| رک|ڻی |ں آ|ریا|ی ہ|اد |یاد|علا|ر ہ|ں س|ی ح|جھی|ائد|ہی |لوک| ڋو| سم| سا| من| مع|بق |ابق|طاب|مطا|ھیو|ں ف|ہن | ہن|جو |و ک|ں ش|ر ت|کار|م د|ھیا| ٻا|غیر|و ل|وئی|جیا|وام|قوا|ی س| جھ|ل ا|قوم| سی|ذہب|مذہ| مذ|اے | اے|دن |ا ت|سان|نسا|انس|رے |لیم|علی|تعل|امل|ہ د|ے ر|د ا|کم |یہو|فائ|چ ا| کھ|م ت|را |ورا|پور|ں ب|ق د|ے ق|وکو|کھی|ا ک|و د|ے ذ|پڻی|بند| فر|کوئ|امی|ی ی|ائی|لاق|ایں|ہ ا| نظ|سما|ومی|ی، |ے س|ت و|ھین|ے ع|یم |سہو| سہ",
    pbu: " د | او|او |په | په|ي۔ | حق|چې | چې|ره |ي ا|ې د| هر|نه |هر |حق | څو|وک |څوک|و ا|ه د|ه ا|۔ ه|ه و| شي| لر|ي چ|و د|ري |لري|ق ل| کښ|وي |ښې |کښې|ه ک|غه |لو |ر څ|سره| سر|ه پ| ټو|و پ|له |يت |ټول|يا |کړي| کو|خه |ي، |دي | له| از|د م| هي| وا| يا| څخ|ازا|د ا|ولو|ه ت|څخه| کړ|ول |هغه|ه ش|ي د| هغ|کول|زاد|نو | وي|و ي|ه ب|شي۔|دې |يو | دي|ته |خپل| پر|اد |د د|ک ح| تو|ه م|ګه |ه ه|قوق|حقو|و م|ه ح|د ه| تر| مس|شي | نه|ړي۔|ني |د پ|واد|ې پ|ادي|ولن| يو|د ت|ونو|وګه|ي و|لي | دا|يد | با|تون| خپ|ي پ|توګ|ار |اند|يوا|ې و|دان| بر|ړي | عم|انه| ده|يڅ |هيڅ|امي|لني|بعي|ډول| ډو|ه ل|ايد|باي|اتو|ه ګ| تا|پل | مل|ايت|وم |ون | لا|هيو| شو| دغ|م د|ده |ې ا|ان | ته|کار|تو |مي |اره|اوي|ساو|مسا|نون|دهغ|و ت|ي ش|انو| مح|ين |اخل| ګټ|شوي|دغه|و ح|وي،|نيز|سي |اسي|وند|قو |وقو|و ک|ونه|ومي| وک|ي ت| ان|قان|ندې|و ر|ک د|ه ي|مين|پر |ټه |لام|غو |هغو|د ټ|و ه|ل ت|لے |ولے|وون|کي |رو |ن ک|موم|وکړ|پار|ن ش|من | نو| وړ| قا|ې چ| وس|څ څ|شخص| شخ|ژون| ژو|تر |ګټه|و څ|هم |عقي|رته| ور|بل | بل|و ب|ه س|ښوو| ښو| کا|ې ک|و س|اده|ونک| غو|دو |و ن|ت ک|مل |عمو|ل ه| پي|وسي|ړان|وړا|يز |خصي|ي م|ا ب|ادا|ه ن|خلي|واخ|ديو|، د|د ق| هم|ا د| بي|تبع| تب|ه چ| عق|پلو|و ل| را|د ب|راي| دخ|نې |نکي|ت د|ابع| مق|د خ|وره|شرا| شر|ر م|رسر|تام|ه ټ| من|طه |سطه|اسط|واس|لې | اس|۔ د|برخ|ې ن"
  },
  Devanagari: {
    hin: "के |प्र| प्| का| के| । |और | और|का | को|कार|ार |ति |या |को |ने |ों |िका|्रत| है| कि|ं क|है |धिक|व्य|अधि| अध|्ति| सम|्यक|ि क|क्त|ा अ|की |ा क| व्|ें | हो|यक्|सी |से |े क| या| की|में|न्त| मे|त्य|ै ।|ता |रत्|क्ष|ेक |येक|्ये|िक |र ह|भी |किस| जा| स्|क व|ा ज|िसी|मान| वि|र स|त्र|ी स|। प| कर|्रा|गा |ित | अप| पर|स्व|ी क| से|ा स|्य | अन|्त्|िया|ा ह| सा|ना |्त |प्त|समा|ान |र क|ाप्|तन्| भी| उस|राप|वतन|्वत|रों|वार|े स|था |हो |े अ|ा ।|न क| न |देश| रा|षा |अन्|त ह|्षा|्वा|जाए|ी प|करन|ा प|अपन|ष्ट| सं|े व|होग|िवा|ट्र|्ट्|ाष्|राष|सके| मा|ओं |ाओं|री |क स|े प| नि|ीय |रक्|ो स|ाएग|रने| इस|व क|पर |रता|र अ| सभ|तथा| तथ| ऐस|रा |पने|्री|िक्|किय|ा व|माज|ं औ|र उ|द्ध|सभी|श्य| जि|ाने|ार्|ारा|द्व| द्|एगा|सम्|ेश |िए |ाव |र प| दे|्तर|ा औ|ारो|यों|परा|पूर|चित|्ध |रूप| रू| सु| लि|त क|ो प|ं स|े ल|शिक| शि|वाह|े औ|जो |राध|जिस|ूर्|ी भ|ूप |ोगा|स्थ|रीय|तिक|्र |। इ|इस | उन|ले |े म|लिए|म क|कता|े य| जो|न म|अपर| पू|ो क|ा उ|ाह |नून|ानू|गी |दी |ारी|ं म|। क|तर्|ी र|श क|परि|स्त|ोई |कोई|र्य|ी अ|हित|भाव| भा|ताओ|ास |साम|विक|विव|म्म| सक|कर |ाना|ध क|निक|य क|उसक|कृत| क़ा|न स|जीव|्या|रका|्रक|ाज |न्य|्म |र्ण|क़ ह|हक़ | हक़|ी म|जिक|ाजि|ामा|क औ|मिल|ेने|लेन| ले|ये |ो अ|े ज|रिव|मय |समय|वश्|आवश| आव|ऐसी|ाध |र द|र्व|सार|प स|बन्| सह|िधा|विध|ी न|ून |क़ान",
    mar: "्या|या |त्य|याच|चा |ण्य|ाचा| व |कार|प्र| प्|िका|धिक|ार | अध|अधि|च्य|आहे| आह|ा अ|हे |ा क|ास |वा |्ये|्रत| स्|ता |ा स| अस| कर|स्व| का|ल्य|रत्|ाहि|कोण| को|िक |येक|्वा|ा व| त्|र आ|्य |त्र|ेका|क्ष|ा न| सं|ामा|ाच्|ंवा|िंव|किं| कि|ात |ष्ट|कास| या|यां|ांच|र्य|मिळ| मि| सा|व्य|ोणत|ने |े प|काम| सम|ंत्|ये | रा|समा|तंत|करण|ा आ|े क|हि |े स|ना |िळण|ून |ा प|ट्र|्ट्|ाष्|राष|ीय |व स|क्त|मान|र्व| आप|ळण्|्र्|ातं|वात|चे | वि|्षण|रण्| दे| व्|आपल|ही |ार्|नये| नय|मा |यास| जा|लेल| नि|े अ| पा|ा म|ले |ाही|बंध|े व|्यक| मा|शिक| शि|देश|ा द|माज|्री|ली |ान |ांन|पल्| हो|ा ह|षण |जे |िजे|हिज|पाह|ारा|यात|सर्| सर|रां|असल|ंबं|संब|िक्|ी प|ंच्|रक्|णत्| आण|ला |स्थ|रीय|ीत |ंना|त व|्व |क व|णे |ाचे|न क|त क|रता|्रा|याह|्त |ची |य क|द्ध|्वत|यक्|णि |आणि|स स|ंधा|क स|च्छ|य अ|त स|ीने|ोणा|करत|त्व|ील |ी अ|सार|र व|भाव|व त|थवा|अथव| अथ|े त|े ज|याय|ंचा|ेल्|ाने|ेण्|क आ|क्क|हक्| हक|ण म|ंरक|संर|न्य|ायद|ा त|त आ| उप|वस्|िवा|ेशा|साम|े य|े आ|ी व|व म|तीन|व आ|ध्य| अश|धात|कृत|्क |द्य|ित |सले|ेश |तो |ेल |ती |्ती|असे|इतर| इत|स्त|र्ण|ा ब|ेले| के|हीर|जाह|ा ज|ेत |ूर्|पूर|ेच | वा|ाजा|ी स|शा |य व| न्|याव|द्द|्ध |रून|यद्|काय|ा श|गण्|क क|राध| शा|यत्|ल अ|्यव|ी क|ाव |ा य|त्त|जिक|ाजि|रणा| धर|ा ध|भेद| बा|रका|्रक|केल|ि व|िष्|तील|योग|साध|ांत|विव|श्र| धे| मु|वतः",
    mai: "ाक |प्र|कार| प्|ार |िका|्यक|धिक|क अ|्रत|्ति|व्य| अध|ेँ |अधि|िक | व्|आʼ | आʼ|क्त|यक्|तिक|केँ|क व|बाक|क स|छैक| छै|त्य|मे |ेक | सम|क्ष|हि |रत्|र छ|येक|्ये|न्त|वा |िके|क। |ैक।|। प| अप| स्| वि| जा|ित |सँ | हो|कोन| को|त्र|स्व| वा|क आ|ष्ट| कर|अपन|मान| का| अन|ति |्त्|नो |नहि| पर|ट्र|्य | एह|ि क|्ट्|ाष्|राष| रा|समा|ोनो|ल ज| नह|ताक|ार्|पन |तन्|वतन|्वत|्षा| कए| सा|्री| नि|ा आ|िवा| सं| दे|जाए|ीय |करब|था |एबा|ा प|ना |्वा|देश|त। |रक |क ह|ँ अ| सभ| आ |त क|चित|्त |वार|ता |ारक|माज|ा स|रीय|न्य|रता|ान |्रा|्या|रक्|ारण|परि|एल |कएल|अन्|रबा|क प|ओर |आओर| आओ|अछि| अछ|िर्|ान्|नक |होए|कर |धार|स्थ|ा अ|िमे|र आ|एहि| एक|े स|तथा| तथ| मा|िक्|शिक| शि|प्त|र्व|निर|च्छ|र्य|ँ स|क क|हो |ाहि|एत।|र प|ामा|साम|षा |ʼ स|ँ ए|ैक |द्ध|र अ|क ज|स्त|ाप्|ँ क| सक|यक |कान|हन |एहन|ेल |ोएत|त आ|ा व|। क|्तर|ाएत|्रक|हु |क उ|पूर|विव|ʼ अ|छि | ले|न प|ास |राप|धक |पएब| पए|रा |यता|रूप|न व| के|षाक|य प|त ह|जाह| ओ |भाव|पर |थवा|अथव| अथ|सम्|जिक|ाजि|ूर्|रति| दो|सभक|। स| जन|सभ |बाध|अनु|िसँ| सह|ँ व|ए स|रिव|तु |ेतु|हेत| हे|ाध |ेबा|न स|िष्|राध| अव|ित्|वास|चार| उच|ारा|न क|वक |ा क|नून|ानू|एत |री |ेओ |केओ|रण |्रस|ि द|ओ व| भे|नहु|ोनह|्थि|पत्|म्प|राज| भा|हिम| हक|ामे|्ण |र्ण|हार|ि स|क द|न अ|त अ|लेब| अभ|िश्|जक |ाजक|न आ|वाह|काज|श्य|वस्|ओहि| ओह|योग|। ए|कए |े ओ|अपर",
    bho: " के|के |े क|ार |कार|िका|धिक|अधि| अध|ओर |आओर| आओ|े अ|े स|ा क| सं|िक |र ह|ा स| हो|र स|ें |में| मे| कर| से|नो |क्ष|से | का|। स|खे |ा। |रा | सम| सब|्रा| सक|र क|न क|वे |ौनो|कौन| कौ|चाह| चा| बा|प्र| प्|था |ि क|ति | जा| सा|े आ|पन |करे|ता |होख|त क|े। |े ब|तथा| तथ| आप|केल|सके| स्|रे |सबह|कर |आपन|े ओ|जा | पर|ष्ट| रा|ना |हवे| हव|ला |ेला|बहि| ओक|ोखे|र ब|ह। | ह।|न स|ाष्|राष|्त | और|े च|। क|संग|र आ|ट्र|्ट्|षा |मान|ा आ|ं क|ा प|्षा|रक्|हे |ाहे|ाति|ावे| जे|ही |ओकर|मिल|ित |ो स|ल ज|इखे|नइख| नइ|त्र|माज| बि|वे।|े ज|क स|िं |हिं|करा|और |े म|समा|हु | ओ |पर |े न|स्थ|रीय|्री|ला।|ाज |ान |कान|े त|िर |तिर|खात| खा|े उ|नून|ानू|ाम | सु| दे|ी क| मा|र म|प्त|िया|ाही|बा।|योग|ी स|ल ह|ून |व्य|ु क|ए क|े व|ंत्|स्व|केह|ीय |खल |साम|यता|तिक|े ह|ाप्|राप|र प|र अ| लो| सह|जे |ोग |म क|ले | नि|ेकर|ा ह|पूर|र न|ेहु|्य |या | या|देश|दी |ा म|ाव | दो|े द| पा|हि |िक्|शिक| शि|बा |िल | उप|्रत| वि| ही| ले|रो |े ख|ठन |गठन|ंगठ| मि|षण |्षण|ंरक|संर| आद| एक|ने | अप|तंत|वतं|्वत|्तर|्या|ेश |ादी|्ति|जिक|ाजि|क आ|्म |चार| उच| शा|री |ाह |याह|बिय|चित|क्त|पयो|उपय|रता|र व|न म|लोग|ह क|न प|काम| पू| इ |आदि|ईल | कई| व्|मी |ुरक|सुर| जी|धार|य स|तर्|भे |सभे| सभ|भाव|्थि|ामा|सर |र्म| को| बे|ोसर|दोस|ण क|ास |े प|जाद|आजा| आज|उचि|ग क|ारी| जर|गे |ज क|ी ब|सन |हो |ा त",
    npi: "को |ने | र |ार |क्त|कार|प्र| प्|्यक|व्य| गर|िका| व्|्रत|धिक|्ति|यक्|अधि| अध|ाई |मा |लाई|त्य|िक | । | सम|वा | वा|क व|्ने|र्न|गर्|न्त|छ ।|तिल|रत्|त्र|ेक |येक|्ये|िला|र स|ो स| स्|मान|क्ष| वि|हुन|ा स| हु| छ |र छ|्त्|समा|स्व|। प| सं|नेछ|ुने|हरु|तन्|वतन|े अ|िने|ो अ|्वत| का|े छ|गरि| रा|्र |ति |ाको| कु|ष्ट|ना |स्त|क स|ुनै|कुन|ट्र|ले | नि|ान |छैन| छै|्ट्|ाष्|राष|तिक|छ। |ार्|ता |ित |नै |ा अ| सा|ा व|रु | मा| अन|ा र|रता|र र|हरू|ेछ |ा प|रक्|्त | पर|था | ला|परि|देश|सको| यस|माज|ामा|्रा|िवा|ाहर|ो प|्य |वार|न स|। क|नि |्षा| त्|द्ध|र ह|तथा| तथ|यस्|्यस|री |र व|पनि|रिन|ंरक|संर|भाव|ै व|सबै| सब| शि| सह|ताक|े र|त र|लाग| सु|्षण|द्द| अप|ैन |ो व|िक्|ाव |धार|्या|्रि|ा भ|एको|र म|न अ|ो ल| उस|शिक|ात्|स्थ|वाह|ूर्|श्य|ित्|रको|ारक|ुद्|तो |्तो|ाउन|कान|िएक|ा न| पन|न। |ैन।|का |ेछ।| भे|र्य|सम्|त्प|साम|रिय|चार|निज|ुन |गि |ागि|उसक| मत| अभ|पूर|र त| सक|सार|राध|परा|अपर|ुक्|जको| उप|रा |ारा|्वा|विध|्न |ा त|न ग|णको| पा| दि|क र|र प|अन्|भेद|ारम|ो आ| अर|जिक|ाजि|िय |षा |ाट |बाट| बा|ि र| छ।|त्व|त स|रू |छ र|रका|विक|र उ|ोग |्दे|रिव|सकि|ै प|रति|अनु| आव|युक|ा ग|नमा|योग|ग ग|क अ|द्व|्ध |रुद| बि|। स|उने|ान्|ा म|िको|र्द|ारी|्तर|ो ह|हित| दे|रिक|ा क| आध|राज|र्म|्ण |र्ण|ि व|्यव|विच|बै |सहि|रोज|र्स|ई उ|्प |रात|निक|मिक|च्छ|्था|विव|कता|अभि|्धा",
    mag: " के|के |ार | हई|कार|ई। |हई।|िका|े अ|धिक|अधि| अध|र ह|े क|और | और|ा क|े स|सब | सब| कर|ें |था |में| मे|तथा| तथ|िक | हो| सम|क्ष|ना |ब क|र स| सं|ा स|कर | भी|। स| सा| से| का| अप|्रा|प्र| प्|से |भी | को|त क| पर|रा |क ह|पन |अपन| सक|या |ति |र क|ी क| या|करे| जा|रे | ओक|्त |सक |नो |ान |मान|ओकर|ा प|न क|ेल | ना|। क|रक्| स्|ही |होए| एक|पर |दी |ट्र|ता |व्य|हई | शा|े उ| दे|त्र|ादी| रा| ही|कान|ित |म क|ल ज|ाम |ी स|े भ|न स|माज|ष्ट|षा | ले|क स|बे |वे |ावे|मिल|र म|्य |ा ह|ला |प्त|नून|ानू|जा |ेकर|्षा|्रत|ंत्|र औ|ोई |कोई|्ट्|ाष्|राष| मा|रो | जे|करा|ोए |ाप्|राप|समा|ून |ो स|स्व|्ति|साम|ोनो|कोन| व्|र अ|्म | वि| सह|े म|क्त|योग|र व|काम|ल ह| नि|देश|पूर|वार| इ |ंरक|संर|ए क|र प| सु|तंत|वतं|्वत|ा म|व क|े व|ाथ |साथ| दो|होब| पा|ो क|े ब|ोग | उप|स्त|परि|न प|े त|्तर|लेल|े ओ|चाह| चा|य क|वा |ेश |य स|न ह|षण |ा ब|। त|एक |एल |ीय |केक|े ह|र आ|ि क|स्थ|जिक|ाजि|ामा|रीय|्री|तिक|ाति| बि|चार|े आ|ास | उच|ा त|यक्|्यक|िल |मय |समय|शाद|पयो|उपय|े ख|रिव| पू|े ल|े च|ौनो|कौन| कौ|ं क|संग|न द|ं स|ण प|्षण|र न|े न|ो भ|करो|ा औ|रता|ाव |भाव|क औ|र्म|ोसर|दोस|ण क|े प|न औ|ब ह|िक्|शिक| शि|ाबे|निय|चित|उचि|ित्|ग क|े। |त स|ी श|ं श|एकर|। ए|तन | ओ |री |्र |जे |क क| सी|सन |िवा| अन|ूरा| बच|ए। | बे|त ह| तक| मि|धार|थवा|अथव| अथ|िला|्वा|ि म| आद|ने |कएल| कए|्या"
  }
};
const MAX_LENGTH = 2048;
const MIN_LENGTH = 10;
const MAX_DIFFERENCE = 300;
const own = {}.hasOwnProperty;
let script;
const numericData = {};
for (script in data) {
  if (own.call(data, script)) {
    const languages = data[script];
    let name;
    numericData[script] = {};
    for (name in languages) {
      if (own.call(languages, name)) {
        const model = languages[name].split("|");
        const trigrams2 = {};
        let weight = model.length;
        while (weight--) {
          trigrams2[model[weight]] = weight;
        }
        numericData[script][name] = trigrams2;
      }
    }
  }
}
function franc(value, options) {
  return francAll(value, options)[0][0];
}
function francAll(value, options = {}) {
  const only = [...options.whitelist || [], ...options.only || []];
  const ignore = [...options.blacklist || [], ...options.ignore || []];
  const minLength = options.minLength !== null && options.minLength !== void 0 ? options.minLength : MIN_LENGTH;
  if (!value || value.length < minLength) {
    return und();
  }
  value = value.slice(0, MAX_LENGTH);
  const script2 = getTopScript(value, expressions);
  if (!script2[0] || !(script2[0] in numericData)) {
    if (!script2[0] || script2[1] === 0 || !allow(script2[0], only, ignore)) {
      return und();
    }
    return singleLanguageTuples(script2[0]);
  }
  return normalize(
    value,
    getDistances(asTuples(value), numericData[script2[0]], only, ignore)
  );
}
function normalize(value, distances) {
  const min = distances[0][1];
  const max = value.length * MAX_DIFFERENCE - min;
  let index = -1;
  while (++index < distances.length) {
    distances[index][1] = 1 - (distances[index][1] - min) / max || 0;
  }
  return distances;
}
function getTopScript(value, scripts) {
  let topCount = -1;
  let topScript;
  let script2;
  for (script2 in scripts) {
    if (own.call(scripts, script2)) {
      const count = getOccurrence(value, scripts[script2]);
      if (count > topCount) {
        topCount = count;
        topScript = script2;
      }
    }
  }
  return [topScript, topCount];
}
function getOccurrence(value, expression) {
  const count = value.match(expression);
  return (count ? count.length : 0) / value.length || 0;
}
function getDistances(trigrams2, languages, only, ignore) {
  languages = filterLanguages(languages, only, ignore);
  const distances = [];
  let language;
  if (languages) {
    for (language in languages) {
      if (own.call(languages, language)) {
        distances.push([language, getDistance(trigrams2, languages[language])]);
      }
    }
  }
  return distances.length === 0 ? und() : distances.sort(sort);
}
function getDistance(trigrams2, model) {
  let distance = 0;
  let index = -1;
  while (++index < trigrams2.length) {
    const trigram2 = trigrams2[index];
    let difference = MAX_DIFFERENCE;
    if (trigram2[0] in model) {
      difference = trigram2[1] - model[trigram2[0]] - 1;
      if (difference < 0) {
        difference = -difference;
      }
    }
    distance += difference;
  }
  return distance;
}
function filterLanguages(languages, only, ignore) {
  if (only.length === 0 && ignore.length === 0) {
    return languages;
  }
  const filteredLanguages = {};
  let language;
  for (language in languages) {
    if (allow(language, only, ignore)) {
      filteredLanguages[language] = languages[language];
    }
  }
  return filteredLanguages;
}
function allow(language, only, ignore) {
  if (only.length === 0 && ignore.length === 0) {
    return true;
  }
  return (only.length === 0 || only.includes(language)) && !ignore.includes(language);
}
function und() {
  return singleLanguageTuples("und");
}
function singleLanguageTuples(language) {
  return [[language, 1]];
}
function sort(a2, b2) {
  return a2[1] - b2[1];
}
var lodashExports = {};
var lodash = {
  get exports() {
    return lodashExports;
  },
  set exports(v2) {
    lodashExports = v2;
  }
};
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
(function(module, exports) {
  (function() {
    var undefined$1;
    var VERSION = "4.17.21";
    var LARGE_ARRAY_SIZE = 200;
    var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_MEMOIZE_SIZE = 500;
    var PLACEHOLDER = "__lodash_placeholder__";
    var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
    var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
    var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
    var HOT_COUNT = 800, HOT_SPAN = 16;
    var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
    var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
    var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    var wrapFlags = [
      ["ary", WRAP_ARY_FLAG],
      ["bind", WRAP_BIND_FLAG],
      ["bindKey", WRAP_BIND_KEY_FLAG],
      ["curry", WRAP_CURRY_FLAG],
      ["curryRight", WRAP_CURRY_RIGHT_FLAG],
      ["flip", WRAP_FLIP_FLAG],
      ["partial", WRAP_PARTIAL_FLAG],
      ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
      ["rearg", WRAP_REARG_FLAG]
    ];
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
    var reTrimStart = /^\s+/;
    var reWhitespace = /\s/;
    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
    var reEscapeChar = /\\(\\)?/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var reNoMatch = /($^)/;
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
    var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reApos = RegExp(rsApos, "g");
    var reComboMark = RegExp(rsCombo, "g");
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    var reUnicodeWord = RegExp([
      rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
      rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
      rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
      rsUpper + "+" + rsOptContrUpper,
      rsOrdUpper,
      rsOrdLower,
      rsDigits,
      rsEmoji
    ].join("|"), "g");
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var contextProps = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ];
    var templateCounter = -1;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var deburredLetters = {
      // Latin-1 Supplement block.
      "À": "A",
      "Á": "A",
      "Â": "A",
      "Ã": "A",
      "Ä": "A",
      "Å": "A",
      "à": "a",
      "á": "a",
      "â": "a",
      "ã": "a",
      "ä": "a",
      "å": "a",
      "Ç": "C",
      "ç": "c",
      "Ð": "D",
      "ð": "d",
      "È": "E",
      "É": "E",
      "Ê": "E",
      "Ë": "E",
      "è": "e",
      "é": "e",
      "ê": "e",
      "ë": "e",
      "Ì": "I",
      "Í": "I",
      "Î": "I",
      "Ï": "I",
      "ì": "i",
      "í": "i",
      "î": "i",
      "ï": "i",
      "Ñ": "N",
      "ñ": "n",
      "Ò": "O",
      "Ó": "O",
      "Ô": "O",
      "Õ": "O",
      "Ö": "O",
      "Ø": "O",
      "ò": "o",
      "ó": "o",
      "ô": "o",
      "õ": "o",
      "ö": "o",
      "ø": "o",
      "Ù": "U",
      "Ú": "U",
      "Û": "U",
      "Ü": "U",
      "ù": "u",
      "ú": "u",
      "û": "u",
      "ü": "u",
      "Ý": "Y",
      "ý": "y",
      "ÿ": "y",
      "Æ": "Ae",
      "æ": "ae",
      "Þ": "Th",
      "þ": "th",
      "ß": "ss",
      // Latin Extended-A block.
      "Ā": "A",
      "Ă": "A",
      "Ą": "A",
      "ā": "a",
      "ă": "a",
      "ą": "a",
      "Ć": "C",
      "Ĉ": "C",
      "Ċ": "C",
      "Č": "C",
      "ć": "c",
      "ĉ": "c",
      "ċ": "c",
      "č": "c",
      "Ď": "D",
      "Đ": "D",
      "ď": "d",
      "đ": "d",
      "Ē": "E",
      "Ĕ": "E",
      "Ė": "E",
      "Ę": "E",
      "Ě": "E",
      "ē": "e",
      "ĕ": "e",
      "ė": "e",
      "ę": "e",
      "ě": "e",
      "Ĝ": "G",
      "Ğ": "G",
      "Ġ": "G",
      "Ģ": "G",
      "ĝ": "g",
      "ğ": "g",
      "ġ": "g",
      "ģ": "g",
      "Ĥ": "H",
      "Ħ": "H",
      "ĥ": "h",
      "ħ": "h",
      "Ĩ": "I",
      "Ī": "I",
      "Ĭ": "I",
      "Į": "I",
      "İ": "I",
      "ĩ": "i",
      "ī": "i",
      "ĭ": "i",
      "į": "i",
      "ı": "i",
      "Ĵ": "J",
      "ĵ": "j",
      "Ķ": "K",
      "ķ": "k",
      "ĸ": "k",
      "Ĺ": "L",
      "Ļ": "L",
      "Ľ": "L",
      "Ŀ": "L",
      "Ł": "L",
      "ĺ": "l",
      "ļ": "l",
      "ľ": "l",
      "ŀ": "l",
      "ł": "l",
      "Ń": "N",
      "Ņ": "N",
      "Ň": "N",
      "Ŋ": "N",
      "ń": "n",
      "ņ": "n",
      "ň": "n",
      "ŋ": "n",
      "Ō": "O",
      "Ŏ": "O",
      "Ő": "O",
      "ō": "o",
      "ŏ": "o",
      "ő": "o",
      "Ŕ": "R",
      "Ŗ": "R",
      "Ř": "R",
      "ŕ": "r",
      "ŗ": "r",
      "ř": "r",
      "Ś": "S",
      "Ŝ": "S",
      "Ş": "S",
      "Š": "S",
      "ś": "s",
      "ŝ": "s",
      "ş": "s",
      "š": "s",
      "Ţ": "T",
      "Ť": "T",
      "Ŧ": "T",
      "ţ": "t",
      "ť": "t",
      "ŧ": "t",
      "Ũ": "U",
      "Ū": "U",
      "Ŭ": "U",
      "Ů": "U",
      "Ű": "U",
      "Ų": "U",
      "ũ": "u",
      "ū": "u",
      "ŭ": "u",
      "ů": "u",
      "ű": "u",
      "ų": "u",
      "Ŵ": "W",
      "ŵ": "w",
      "Ŷ": "Y",
      "ŷ": "y",
      "Ÿ": "Y",
      "Ź": "Z",
      "Ż": "Z",
      "Ž": "Z",
      "ź": "z",
      "ż": "z",
      "ž": "z",
      "Ĳ": "IJ",
      "ĳ": "ij",
      "Œ": "Oe",
      "œ": "oe",
      "ŉ": "'n",
      "ſ": "s"
    };
    var htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    var htmlUnescapes = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    };
    var stringEscapes = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    };
    var freeParseFloat = parseFloat, freeParseInt = parseInt;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
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
    var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
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
    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }
      return accumulator;
    }
    function arrayEach(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEachRight(array, iteratee) {
      var length = array == null ? 0 : array.length;
      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEvery(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }
    function arrayFilter(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    function arrayIncludesWith(array, value, comparator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function arrayReduceRight(array, iteratee, accumulator, initAccum) {
      var length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }
    function arraySome(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    var asciiSize = baseProperty("length");
    function asciiToArray(string) {
      return string.split("");
    }
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }
    function baseFindKey(collection, predicate, eachFunc) {
      var result;
      eachFunc(collection, function(value, key, collection2) {
        if (predicate(value, key, collection2)) {
          result = key;
          return false;
        }
      });
      return result;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseMean(array, iteratee) {
      var length = array == null ? 0 : array.length;
      return length ? baseSum(array, iteratee) / length : NAN;
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined$1 : object[key];
      };
    }
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined$1 : object[key];
      };
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index, collection2) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
      });
      return accumulator;
    }
    function baseSortBy(array, comparer) {
      var length = array.length;
      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }
    function baseSum(array, iteratee) {
      var result, index = -1, length = array.length;
      while (++index < length) {
        var current = iteratee(array[index]);
        if (current !== undefined$1) {
          result = result === undefined$1 ? current : result + current;
        }
      }
      return result;
    }
    function baseTimes(n2, iteratee) {
      var index = -1, result = Array(n2);
      while (++index < n2) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseToPairs(object, props) {
      return arrayMap(props, function(key) {
        return [key, object[key]];
      });
    }
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1, length = strSymbols.length;
      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function countHolders(array, placeholder) {
      var length = array.length, result = 0;
      while (length--) {
        if (array[length] === placeholder) {
          ++result;
        }
      }
      return result;
    }
    var deburrLetter = basePropertyOf(deburredLetters);
    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    function escapeStringChar(chr) {
      return "\\" + stringEscapes[chr];
    }
    function getValue(object, key) {
      return object == null ? undefined$1 : object[key];
    }
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }
    function iteratorToArray(iterator) {
      var data2, result = [];
      while (!(data2 = iterator.next()).done) {
        result.push(data2.value);
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function replaceHolders(array, placeholder) {
      var index = -1, length = array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (value === placeholder || value === PLACEHOLDER) {
          array[index] = PLACEHOLDER;
          result[resIndex++] = index;
        }
      }
      return result;
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    function setToPairs(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = [value, value];
      });
      return result;
    }
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function strictLastIndexOf(array, value, fromIndex) {
      var index = fromIndex + 1;
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return index;
    }
    function stringSize(string) {
      return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
    }
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {
      }
      return index;
    }
    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    function unicodeSize(string) {
      var result = reUnicode.lastIndex = 0;
      while (reUnicode.test(string)) {
        ++result;
      }
      return result;
    }
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }
    var runInContext = function runInContext2(context) {
      context = context == null ? root : _2.defaults(root.Object(), context, _2.pick(root, contextProps));
      var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
      var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
      var coreJsData = context["__core-js_shared__"];
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var idCounter = 0;
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var nativeObjectToString = objectProto.toString;
      var objectCtorString = funcToString.call(Object2);
      var oldDash = root._;
      var reIsNative = RegExp2(
        "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      var Buffer2 = moduleExports ? context.Buffer : undefined$1, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined$1, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$1, symIterator = Symbol2 ? Symbol2.iterator : undefined$1, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined$1;
      var defineProperty = function() {
        try {
          var func = getNative(Object2, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      }();
      var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
      var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
      var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
      var metaMap = WeakMap && new WeakMap();
      var realNames = {};
      var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
      var symbolProto = Symbol2 ? Symbol2.prototype : undefined$1, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1, symbolToString = symbolProto ? symbolProto.toString : undefined$1;
      function lodash2(value) {
        if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
          if (value instanceof LodashWrapper) {
            return value;
          }
          if (hasOwnProperty.call(value, "__wrapped__")) {
            return wrapperClone(value);
          }
        }
        return new LodashWrapper(value);
      }
      var baseCreate = function() {
        function object() {
        }
        return function(proto) {
          if (!isObject(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result2 = new object();
          object.prototype = undefined$1;
          return result2;
        };
      }();
      function baseLodash() {
      }
      function LodashWrapper(value, chainAll) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__chain__ = !!chainAll;
        this.__index__ = 0;
        this.__values__ = undefined$1;
      }
      lodash2.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "escape": reEscape,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "evaluate": reEvaluate,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "interpolate": reInterpolate,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        "variable": "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        "imports": {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          "_": lodash2
        }
      };
      lodash2.prototype = baseLodash.prototype;
      lodash2.prototype.constructor = lodash2;
      LodashWrapper.prototype = baseCreate(baseLodash.prototype);
      LodashWrapper.prototype.constructor = LodashWrapper;
      function LazyWrapper(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered__ = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
      }
      function lazyClone() {
        var result2 = new LazyWrapper(this.__wrapped__);
        result2.__actions__ = copyArray(this.__actions__);
        result2.__dir__ = this.__dir__;
        result2.__filtered__ = this.__filtered__;
        result2.__iteratees__ = copyArray(this.__iteratees__);
        result2.__takeCount__ = this.__takeCount__;
        result2.__views__ = copyArray(this.__views__);
        return result2;
      }
      function lazyReverse() {
        if (this.__filtered__) {
          var result2 = new LazyWrapper(this);
          result2.__dir__ = -1;
          result2.__filtered__ = true;
        } else {
          result2 = this.clone();
          result2.__dir__ *= -1;
        }
        return result2;
      }
      function lazyValue() {
        var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
        if (!isArr || !isRight && arrLength == length && takeCount == length) {
          return baseWrapperValue(array, this.__actions__);
        }
        var result2 = [];
        outer:
          while (length-- && resIndex < takeCount) {
            index += dir;
            var iterIndex = -1, value = array[index];
            while (++iterIndex < iterLength) {
              var data2 = iteratees[iterIndex], iteratee2 = data2.iteratee, type = data2.type, computed2 = iteratee2(value);
              if (type == LAZY_MAP_FLAG) {
                value = computed2;
              } else if (!computed2) {
                if (type == LAZY_FILTER_FLAG) {
                  continue outer;
                } else {
                  break outer;
                }
              }
            }
            result2[resIndex++] = value;
          }
        return result2;
      }
      LazyWrapper.prototype = baseCreate(baseLodash.prototype);
      LazyWrapper.prototype.constructor = LazyWrapper;
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      function hashDelete(key) {
        var result2 = this.has(key) && delete this.__data__[key];
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function hashGet(key) {
        var data2 = this.__data__;
        if (nativeCreate) {
          var result2 = data2[key];
          return result2 === HASH_UNDEFINED ? undefined$1 : result2;
        }
        return hasOwnProperty.call(data2, key) ? data2[key] : undefined$1;
      }
      function hashHas(key) {
        var data2 = this.__data__;
        return nativeCreate ? data2[key] !== undefined$1 : hasOwnProperty.call(data2, key);
      }
      function hashSet(key, value) {
        var data2 = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data2[key] = nativeCreate && value === undefined$1 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      function listCacheDelete(key) {
        var data2 = this.__data__, index = assocIndexOf(data2, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data2.length - 1;
        if (index == lastIndex) {
          data2.pop();
        } else {
          splice.call(data2, index, 1);
        }
        --this.size;
        return true;
      }
      function listCacheGet(key) {
        var data2 = this.__data__, index = assocIndexOf(data2, key);
        return index < 0 ? undefined$1 : data2[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data2 = this.__data__, index = assocIndexOf(data2, key);
        if (index < 0) {
          ++this.size;
          data2.push([key, value]);
        } else {
          data2[index][1] = value;
        }
        return this;
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map2 || ListCache)(),
          "string": new Hash()
        };
      }
      function mapCacheDelete(key) {
        var result2 = getMapData(this, key)["delete"](key);
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        var data2 = getMapData(this, key), size2 = data2.size;
        data2.set(key, value);
        this.size += data2.size == size2 ? 0 : 1;
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function SetCache(values2) {
        var index = -1, length = values2 == null ? 0 : values2.length;
        this.__data__ = new MapCache();
        while (++index < length) {
          this.add(values2[index]);
        }
      }
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function Stack(entries) {
        var data2 = this.__data__ = new ListCache(entries);
        this.size = data2.size;
      }
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      function stackDelete(key) {
        var data2 = this.__data__, result2 = data2["delete"](key);
        this.size = data2.size;
        return result2;
      }
      function stackGet(key) {
        return this.__data__.get(key);
      }
      function stackHas(key) {
        return this.__data__.has(key);
      }
      function stackSet(key, value) {
        var data2 = this.__data__;
        if (data2 instanceof ListCache) {
          var pairs = data2.__data__;
          if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data2.size;
            return this;
          }
          data2 = this.__data__ = new MapCache(pairs);
        }
        data2.set(key, value);
        this.size = data2.size;
        return this;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function arraySample(array) {
        var length = array.length;
        return length ? array[baseRandom(0, length - 1)] : undefined$1;
      }
      function arraySampleSize(array, n2) {
        return shuffleSelf(copyArray(array), baseClamp(n2, 0, array.length));
      }
      function arrayShuffle(array) {
        return shuffleSelf(copyArray(array));
      }
      function assignMergeValue(object, key, value) {
        if (value !== undefined$1 && !eq(object[key], value) || value === undefined$1 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined$1 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      function baseAggregator(collection, setter, iteratee2, accumulator) {
        baseEach(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee2(value), collection2);
        });
        return accumulator;
      }
      function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
      }
      function baseAssignIn(object, source) {
        return object && copyObject(source, keysIn(source), object);
      }
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      function baseAt(object, paths) {
        var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
        while (++index < length) {
          result2[index] = skip ? undefined$1 : get(object, paths[index]);
        }
        return result2;
      }
      function baseClamp(number, lower, upper) {
        if (number === number) {
          if (upper !== undefined$1) {
            number = number <= upper ? number : upper;
          }
          if (lower !== undefined$1) {
            number = number >= lower ? number : lower;
          }
        }
        return number;
      }
      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result2 = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result2 !== undefined$1) {
          return result2;
        }
        if (!isObject(value)) {
          return value;
        }
        var isArr = isArray(value);
        if (isArr) {
          result2 = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result2);
          }
        } else {
          var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
          if (isBuffer(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag || tag == argsTag || isFunc && !object) {
            result2 = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object ? value : {};
            }
            result2 = initCloneByTag(value, tag, isDeep);
          }
        }
        stack || (stack = new Stack());
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result2);
        if (isSet(value)) {
          value.forEach(function(subValue) {
            result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function(subValue, key2) {
            result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
        var props = isArr ? undefined$1 : keysFunc(value);
        arrayEach(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
        return result2;
      }
      function baseConforms(source) {
        var props = keys(source);
        return function(object) {
          return baseConformsTo(object, source, props);
        };
      }
      function baseConformsTo(object, source, props) {
        var length = props.length;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (length--) {
          var key = props[length], predicate = source[key], value = object[key];
          if (value === undefined$1 && !(key in object) || !predicate(value)) {
            return false;
          }
        }
        return true;
      }
      function baseDelay(func, wait, args) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        return setTimeout2(function() {
          func.apply(undefined$1, args);
        }, wait);
      }
      function baseDifference(array, values2, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
        if (!length) {
          return result2;
        }
        if (iteratee2) {
          values2 = arrayMap(values2, baseUnary(iteratee2));
        }
        if (comparator) {
          includes2 = arrayIncludesWith;
          isCommon = false;
        } else if (values2.length >= LARGE_ARRAY_SIZE) {
          includes2 = cacheHas;
          isCommon = false;
          values2 = new SetCache(values2);
        }
        outer:
          while (++index < length) {
            var value = array[index], computed2 = iteratee2 == null ? value : iteratee2(value);
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed2 === computed2) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values2[valuesIndex] === computed2) {
                  continue outer;
                }
              }
              result2.push(value);
            } else if (!includes2(values2, computed2, comparator)) {
              result2.push(value);
            }
          }
        return result2;
      }
      var baseEach = createBaseEach(baseForOwn);
      var baseEachRight = createBaseEach(baseForOwnRight, true);
      function baseEvery(collection, predicate) {
        var result2 = true;
        baseEach(collection, function(value, index, collection2) {
          result2 = !!predicate(value, index, collection2);
          return result2;
        });
        return result2;
      }
      function baseExtremum(array, iteratee2, comparator) {
        var index = -1, length = array.length;
        while (++index < length) {
          var value = array[index], current = iteratee2(value);
          if (current != null && (computed2 === undefined$1 ? current === current && !isSymbol(current) : comparator(current, computed2))) {
            var computed2 = current, result2 = value;
          }
        }
        return result2;
      }
      function baseFill(array, value, start, end) {
        var length = array.length;
        start = toInteger(start);
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end === undefined$1 || end > length ? length : toInteger(end);
        if (end < 0) {
          end += length;
        }
        end = start > end ? 0 : toLength(end);
        while (start < end) {
          array[start++] = value;
        }
        return array;
      }
      function baseFilter(collection, predicate) {
        var result2 = [];
        baseEach(collection, function(value, index, collection2) {
          if (predicate(value, index, collection2)) {
            result2.push(value);
          }
        });
        return result2;
      }
      function baseFlatten(array, depth, predicate, isStrict, result2) {
        var index = -1, length = array.length;
        predicate || (predicate = isFlattenable);
        result2 || (result2 = []);
        while (++index < length) {
          var value = array[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result2);
            } else {
              arrayPush(result2, value);
            }
          } else if (!isStrict) {
            result2[result2.length] = value;
          }
        }
        return result2;
      }
      var baseFor = createBaseFor();
      var baseForRight = createBaseFor(true);
      function baseForOwn(object, iteratee2) {
        return object && baseFor(object, iteratee2, keys);
      }
      function baseForOwnRight(object, iteratee2) {
        return object && baseForRight(object, iteratee2, keys);
      }
      function baseFunctions(object, props) {
        return arrayFilter(props, function(key) {
          return isFunction(object[key]);
        });
      }
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : undefined$1;
      }
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result2 = keysFunc(object);
        return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
      }
      function baseGetTag(value) {
        if (value == null) {
          return value === undefined$1 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
      }
      function baseGt(value, other) {
        return value > other;
      }
      function baseHas(object, key) {
        return object != null && hasOwnProperty.call(object, key);
      }
      function baseHasIn(object, key) {
        return object != null && key in Object2(object);
      }
      function baseInRange(number, start, end) {
        return number >= nativeMin(start, end) && number < nativeMax(start, end);
      }
      function baseIntersection(arrays, iteratee2, comparator) {
        var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
        while (othIndex--) {
          var array = arrays[othIndex];
          if (othIndex && iteratee2) {
            array = arrayMap(array, baseUnary(iteratee2));
          }
          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$1;
        }
        array = arrays[0];
        var index = -1, seen = caches[0];
        outer:
          while (++index < length && result2.length < maxLength) {
            var value = array[index], computed2 = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (!(seen ? cacheHas(seen, computed2) : includes2(result2, computed2, comparator))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache = caches[othIndex];
                if (!(cache ? cacheHas(cache, computed2) : includes2(arrays[othIndex], computed2, comparator))) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(computed2);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseInverter(object, setter, iteratee2, accumulator) {
        baseForOwn(object, function(value, key, object2) {
          setter(accumulator, iteratee2(value), key, object2);
        });
        return accumulator;
      }
      function baseInvoke(object, path, args) {
        path = castPath(path, object);
        object = parent(object, path);
        var func = object == null ? object : object[toKey(last(path))];
        return func == null ? undefined$1 : apply(func, object, args);
      }
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      function baseIsArrayBuffer(value) {
        return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
      }
      function baseIsDate(value) {
        return isObjectLike(value) && baseGetTag(value) == dateTag;
      }
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack());
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }
      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index, noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (index--) {
          var data2 = matchData[index];
          if (noCustomizer && data2[2] ? data2[1] !== object[data2[0]] : !(data2[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data2 = matchData[index];
          var key = data2[0], objValue = object[key], srcValue = data2[1];
          if (noCustomizer && data2[2]) {
            if (objValue === undefined$1 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack();
            if (customizer) {
              var result2 = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result2 === undefined$1 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
              return false;
            }
          }
        }
        return true;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseIsRegExp(value) {
        return isObjectLike(value) && baseGetTag(value) == regexpTag;
      }
      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == "object") {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result2 = [];
        for (var key in Object2(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result2 = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseLt(value, other) {
        return value < other;
      }
      function baseMap(collection, iteratee2) {
        var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result2[++index] = iteratee2(value, key, collection2);
        });
        return result2;
      }
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get(object, path);
          return objValue === undefined$1 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      function baseMerge(object, source, srcIndex, customizer, stack) {
        if (object === source) {
          return;
        }
        baseFor(source, function(srcValue, key) {
          stack || (stack = new Stack());
          if (isObject(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined$1;
            if (newValue === undefined$1) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }
      function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined$1;
        var isCommon = newValue === undefined$1;
        if (isCommon) {
          var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            } else {
              newValue = [];
            }
          } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) {
              newValue = toPlainObject(objValue);
            } else if (!isObject(objValue) || isFunction(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }
        if (isCommon) {
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack["delete"](srcValue);
        }
        assignMergeValue(object, key, newValue);
      }
      function baseNth(array, n2) {
        var length = array.length;
        if (!length) {
          return;
        }
        n2 += n2 < 0 ? length : 0;
        return isIndex(n2, length) ? array[n2] : undefined$1;
      }
      function baseOrderBy(collection, iteratees, orders) {
        if (iteratees.length) {
          iteratees = arrayMap(iteratees, function(iteratee2) {
            if (isArray(iteratee2)) {
              return function(value) {
                return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
              };
            }
            return iteratee2;
          });
        } else {
          iteratees = [identity];
        }
        var index = -1;
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        var result2 = baseMap(collection, function(value, key, collection2) {
          var criteria = arrayMap(iteratees, function(iteratee2) {
            return iteratee2(value);
          });
          return { "criteria": criteria, "index": ++index, "value": value };
        });
        return baseSortBy(result2, function(object, other) {
          return compareMultiple(object, other, orders);
        });
      }
      function basePick(object, paths) {
        return basePickBy(object, paths, function(value, path) {
          return hasIn(object, path);
        });
      }
      function basePickBy(object, paths, predicate) {
        var index = -1, length = paths.length, result2 = {};
        while (++index < length) {
          var path = paths[index], value = baseGet(object, path);
          if (predicate(value, path)) {
            baseSet(result2, castPath(path, object), value);
          }
        }
        return result2;
      }
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }
      function basePullAll(array, values2, iteratee2, comparator) {
        var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
        if (array === values2) {
          values2 = copyArray(values2);
        }
        if (iteratee2) {
          seen = arrayMap(array, baseUnary(iteratee2));
        }
        while (++index < length) {
          var fromIndex = 0, value = values2[index], computed2 = iteratee2 ? iteratee2(value) : value;
          while ((fromIndex = indexOf2(seen, computed2, fromIndex, comparator)) > -1) {
            if (seen !== array) {
              splice.call(seen, fromIndex, 1);
            }
            splice.call(array, fromIndex, 1);
          }
        }
        return array;
      }
      function basePullAt(array, indexes) {
        var length = array ? indexes.length : 0, lastIndex = length - 1;
        while (length--) {
          var index = indexes[length];
          if (length == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex(index)) {
              splice.call(array, index, 1);
            } else {
              baseUnset(array, index);
            }
          }
        }
        return array;
      }
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      function baseRange(start, end, step, fromRight) {
        var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
        while (length--) {
          result2[fromRight ? length : ++index] = start;
          start += step;
        }
        return result2;
      }
      function baseRepeat(string, n2) {
        var result2 = "";
        if (!string || n2 < 1 || n2 > MAX_SAFE_INTEGER) {
          return result2;
        }
        do {
          if (n2 % 2) {
            result2 += string;
          }
          n2 = nativeFloor(n2 / 2);
          if (n2) {
            string += string;
          }
        } while (n2);
        return result2;
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      function baseSample(collection) {
        return arraySample(values(collection));
      }
      function baseSampleSize(collection, n2) {
        var array = values(collection);
        return shuffleSelf(array, baseClamp(n2, 0, array.length));
      }
      function baseSet(object, path, value, customizer) {
        if (!isObject(object)) {
          return object;
        }
        path = castPath(path, object);
        var index = -1, length = path.length, lastIndex = length - 1, nested = object;
        while (nested != null && ++index < length) {
          var key = toKey(path[index]), newValue = value;
          if (key === "__proto__" || key === "constructor" || key === "prototype") {
            return object;
          }
          if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
            if (newValue === undefined$1) {
              newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object;
      }
      var baseSetData = !metaMap ? identity : function(func, data2) {
        metaMap.set(func, data2);
        return func;
      };
      var baseSetToString = !defineProperty ? identity : function(func, string) {
        return defineProperty(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string),
          "writable": true
        });
      };
      function baseShuffle(collection) {
        return shuffleSelf(values(collection));
      }
      function baseSlice(array, start, end) {
        var index = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result2 = Array2(length);
        while (++index < length) {
          result2[index] = array[index + start];
        }
        return result2;
      }
      function baseSome(collection, predicate) {
        var result2;
        baseEach(collection, function(value, index, collection2) {
          result2 = predicate(value, index, collection2);
          return !result2;
        });
        return !!result2;
      }
      function baseSortedIndex(array, value, retHighest) {
        var low = 0, high = array == null ? low : array.length;
        if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
          while (low < high) {
            var mid = low + high >>> 1, computed2 = array[mid];
            if (computed2 !== null && !isSymbol(computed2) && (retHighest ? computed2 <= value : computed2 < value)) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return high;
        }
        return baseSortedIndexBy(array, value, identity, retHighest);
      }
      function baseSortedIndexBy(array, value, iteratee2, retHighest) {
        var low = 0, high = array == null ? 0 : array.length;
        if (high === 0) {
          return 0;
        }
        value = iteratee2(value);
        var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined$1;
        while (low < high) {
          var mid = nativeFloor((low + high) / 2), computed2 = iteratee2(array[mid]), othIsDefined = computed2 !== undefined$1, othIsNull = computed2 === null, othIsReflexive = computed2 === computed2, othIsSymbol = isSymbol(computed2);
          if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
          } else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
          } else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
          } else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
          } else if (othIsNull || othIsSymbol) {
            setLow = false;
          } else {
            setLow = retHighest ? computed2 <= value : computed2 < value;
          }
          if (setLow) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return nativeMin(high, MAX_ARRAY_INDEX);
      }
      function baseSortedUniq(array, iteratee2) {
        var index = -1, length = array.length, resIndex = 0, result2 = [];
        while (++index < length) {
          var value = array[index], computed2 = iteratee2 ? iteratee2(value) : value;
          if (!index || !eq(computed2, seen)) {
            var seen = computed2;
            result2[resIndex++] = value === 0 ? 0 : value;
          }
        }
        return result2;
      }
      function baseToNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        return +value;
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      function baseUniq(array, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
        if (comparator) {
          isCommon = false;
          includes2 = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set2 = iteratee2 ? null : createSet(array);
          if (set2) {
            return setToArray(set2);
          }
          isCommon = false;
          includes2 = cacheHas;
          seen = new SetCache();
        } else {
          seen = iteratee2 ? [] : result2;
        }
        outer:
          while (++index < length) {
            var value = array[index], computed2 = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed2 === computed2) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed2) {
                  continue outer;
                }
              }
              if (iteratee2) {
                seen.push(computed2);
              }
              result2.push(value);
            } else if (!includes2(seen, computed2, comparator)) {
              if (seen !== result2) {
                seen.push(computed2);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseUnset(object, path) {
        path = castPath(path, object);
        object = parent(object, path);
        return object == null || delete object[toKey(last(path))];
      }
      function baseUpdate(object, path, updater, customizer) {
        return baseSet(object, path, updater(baseGet(object, path)), customizer);
      }
      function baseWhile(array, predicate, isDrop, fromRight) {
        var length = array.length, index = fromRight ? length : -1;
        while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
        }
        return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
      }
      function baseWrapperValue(value, actions) {
        var result2 = value;
        if (result2 instanceof LazyWrapper) {
          result2 = result2.value();
        }
        return arrayReduce(actions, function(result3, action) {
          return action.func.apply(action.thisArg, arrayPush([result3], action.args));
        }, result2);
      }
      function baseXor(arrays, iteratee2, comparator) {
        var length = arrays.length;
        if (length < 2) {
          return length ? baseUniq(arrays[0]) : [];
        }
        var index = -1, result2 = Array2(length);
        while (++index < length) {
          var array = arrays[index], othIndex = -1;
          while (++othIndex < length) {
            if (othIndex != index) {
              result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
            }
          }
        }
        return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
      }
      function baseZipObject(props, values2, assignFunc) {
        var index = -1, length = props.length, valsLength = values2.length, result2 = {};
        while (++index < length) {
          var value = index < valsLength ? values2[index] : undefined$1;
          assignFunc(result2, props[index], value);
        }
        return result2;
      }
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      function castFunction(value) {
        return typeof value == "function" ? value : identity;
      }
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      var castRest = baseRest;
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === undefined$1 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      var clearTimeout2 = ctxClearTimeout || function(id) {
        return root.clearTimeout(id);
      };
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result2);
        return result2;
      }
      function cloneArrayBuffer(arrayBuffer) {
        var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
        return result2;
      }
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      function cloneRegExp(regexp) {
        var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result2.lastIndex = regexp.lastIndex;
        return result2;
      }
      function cloneSymbol(symbol) {
        return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
      }
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
          var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
          if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
          }
          if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
          }
        }
        return 0;
      }
      function compareMultiple(object, other, orders) {
        var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
        while (++index < length) {
          var result2 = compareAscending(objCriteria[index], othCriteria[index]);
          if (result2) {
            if (index >= ordersLength) {
              return result2;
            }
            var order = orders[index];
            return result2 * (order == "desc" ? -1 : 1);
          }
        }
        return object.index - other.index;
      }
      function composeArgs(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
        while (++leftIndex < leftLength) {
          result2[leftIndex] = partials[leftIndex];
        }
        while (++argsIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[holders[argsIndex]] = args[argsIndex];
          }
        }
        while (rangeLength--) {
          result2[leftIndex++] = args[argsIndex++];
        }
        return result2;
      }
      function composeArgsRight(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
        while (++argsIndex < rangeLength) {
          result2[argsIndex] = args[argsIndex];
        }
        var offset = argsIndex;
        while (++rightIndex < rightLength) {
          result2[offset + rightIndex] = partials[rightIndex];
        }
        while (++holdersIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[offset + holders[holdersIndex]] = args[argsIndex++];
          }
        }
        return result2;
      }
      function copyArray(source, array) {
        var index = -1, length = source.length;
        array || (array = Array2(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined$1;
          if (newValue === undefined$1) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
      }
      function copySymbolsIn(source, object) {
        return copyObject(source, getSymbolsIn(source), object);
      }
      function createAggregator(setter, initializer) {
        return function(collection, iteratee2) {
          var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
          return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
        };
      }
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$1, guard = length > 2 ? sources[2] : undefined$1;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$1;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined$1 : customizer;
            length = 1;
          }
          object = Object2(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee2) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee2);
          }
          var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
          while (fromRight ? index-- : ++index < length) {
            if (iteratee2(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee2, keysFunc) {
          var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee2(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      function createBind(func, bitmask, thisArg) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return fn.apply(isBind ? thisArg : this, arguments);
        }
        return wrapper;
      }
      function createCaseFirst(methodName) {
        return function(string) {
          string = toString(string);
          var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined$1;
          var chr = strSymbols ? strSymbols[0] : string.charAt(0);
          var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      function createCompounder(callback) {
        return function(string) {
          return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
        };
      }
      function createCtor(Ctor) {
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return new Ctor();
            case 1:
              return new Ctor(args[0]);
            case 2:
              return new Ctor(args[0], args[1]);
            case 3:
              return new Ctor(args[0], args[1], args[2]);
            case 4:
              return new Ctor(args[0], args[1], args[2], args[3]);
            case 5:
              return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          }
          var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
          return isObject(result2) ? result2 : thisBinding;
        };
      }
      function createCurry(func, bitmask, arity) {
        var Ctor = createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
          while (index--) {
            args[index] = arguments[index];
          }
          var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
          length -= holders.length;
          if (length < arity) {
            return createRecurry(
              func,
              bitmask,
              createHybrid,
              wrapper.placeholder,
              undefined$1,
              args,
              holders,
              undefined$1,
              undefined$1,
              arity - length
            );
          }
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return apply(fn, this, args);
        }
        return wrapper;
      }
      function createFind(findIndexFunc) {
        return function(collection, predicate, fromIndex) {
          var iterable = Object2(collection);
          if (!isArrayLike(collection)) {
            var iteratee2 = getIteratee(predicate, 3);
            collection = keys(collection);
            predicate = function(key) {
              return iteratee2(iterable[key], key, iterable);
            };
          }
          var index = findIndexFunc(collection, predicate, fromIndex);
          return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined$1;
        };
      }
      function createFlow(fromRight) {
        return flatRest(function(funcs) {
          var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
          if (fromRight) {
            funcs.reverse();
          }
          while (index--) {
            var func = funcs[index];
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (prereq && !wrapper && getFuncName(func) == "wrapper") {
              var wrapper = new LodashWrapper([], true);
            }
          }
          index = wrapper ? index : length;
          while (++index < length) {
            func = funcs[index];
            var funcName = getFuncName(func), data2 = funcName == "wrapper" ? getData(func) : undefined$1;
            if (data2 && isLaziable(data2[0]) && data2[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data2[4].length && data2[9] == 1) {
              wrapper = wrapper[getFuncName(data2[0])].apply(wrapper, data2[3]);
            } else {
              wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
            }
          }
          return function() {
            var args = arguments, value = args[0];
            if (wrapper && args.length == 1 && isArray(value)) {
              return wrapper.plant(value).value();
            }
            var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
            while (++index2 < length) {
              result2 = funcs[index2].call(this, result2);
            }
            return result2;
          };
        });
      }
      function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
        var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length;
          while (index--) {
            args[index] = arguments[index];
          }
          if (isCurried) {
            var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
          }
          if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
          }
          if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
          }
          length -= holdersCount;
          if (isCurried && length < arity) {
            var newHolders = replaceHolders(args, placeholder);
            return createRecurry(
              func,
              bitmask,
              createHybrid,
              wrapper.placeholder,
              thisArg,
              args,
              newHolders,
              argPos,
              ary2,
              arity - length
            );
          }
          var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
          length = args.length;
          if (argPos) {
            args = reorder(args, argPos);
          } else if (isFlip && length > 1) {
            args.reverse();
          }
          if (isAry && ary2 < length) {
            args.length = ary2;
          }
          if (this && this !== root && this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
          }
          return fn.apply(thisBinding, args);
        }
        return wrapper;
      }
      function createInverter(setter, toIteratee) {
        return function(object, iteratee2) {
          return baseInverter(object, setter, toIteratee(iteratee2), {});
        };
      }
      function createMathOperation(operator, defaultValue) {
        return function(value, other) {
          var result2;
          if (value === undefined$1 && other === undefined$1) {
            return defaultValue;
          }
          if (value !== undefined$1) {
            result2 = value;
          }
          if (other !== undefined$1) {
            if (result2 === undefined$1) {
              return other;
            }
            if (typeof value == "string" || typeof other == "string") {
              value = baseToString(value);
              other = baseToString(other);
            } else {
              value = baseToNumber(value);
              other = baseToNumber(other);
            }
            result2 = operator(value, other);
          }
          return result2;
        };
      }
      function createOver(arrayFunc) {
        return flatRest(function(iteratees) {
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          return baseRest(function(args) {
            var thisArg = this;
            return arrayFunc(iteratees, function(iteratee2) {
              return apply(iteratee2, thisArg, args);
            });
          });
        });
      }
      function createPadding(length, chars) {
        chars = chars === undefined$1 ? " " : baseToString(chars);
        var charsLength = chars.length;
        if (charsLength < 2) {
          return charsLength ? baseRepeat(chars, length) : chars;
        }
        var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
        return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
      }
      function createPartial(func, bitmask, thisArg, partials) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
          }
          while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
          }
          return apply(fn, isBind ? thisArg : this, args);
        }
        return wrapper;
      }
      function createRange(fromRight) {
        return function(start, end, step) {
          if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
            end = step = undefined$1;
          }
          start = toFinite(start);
          if (end === undefined$1) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }
      function createRelationalOperation(operator) {
        return function(value, other) {
          if (!(typeof value == "string" && typeof other == "string")) {
            value = toNumber(value);
            other = toNumber(other);
          }
          return operator(value, other);
        };
      }
      function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
        var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
        bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
        bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
        if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
          bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
        }
        var newData = [
          func,
          bitmask,
          thisArg,
          newPartials,
          newHolders,
          newPartialsRight,
          newHoldersRight,
          argPos,
          ary2,
          arity
        ];
        var result2 = wrapFunc.apply(undefined$1, newData);
        if (isLaziable(func)) {
          setData(result2, newData);
        }
        result2.placeholder = placeholder;
        return setWrapToString(result2, func, bitmask);
      }
      function createRound(methodName) {
        var func = Math2[methodName];
        return function(number, precision) {
          number = toNumber(number);
          precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
          if (precision && nativeIsFinite(number)) {
            var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
            pair = (toString(value) + "e").split("e");
            return +(pair[0] + "e" + (+pair[1] - precision));
          }
          return func(number);
        };
      }
      var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
        return new Set2(values2);
      };
      function createToPairs(keysFunc) {
        return function(object) {
          var tag = getTag(object);
          if (tag == mapTag) {
            return mapToArray(object);
          }
          if (tag == setTag) {
            return setToPairs(object);
          }
          return baseToPairs(object, keysFunc(object));
        };
      }
      function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
        if (!isBindKey && typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        var length = partials ? partials.length : 0;
        if (!length) {
          bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
          partials = holders = undefined$1;
        }
        ary2 = ary2 === undefined$1 ? ary2 : nativeMax(toInteger(ary2), 0);
        arity = arity === undefined$1 ? arity : toInteger(arity);
        length -= holders ? holders.length : 0;
        if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
          var partialsRight = partials, holdersRight = holders;
          partials = holders = undefined$1;
        }
        var data2 = isBindKey ? undefined$1 : getData(func);
        var newData = [
          func,
          bitmask,
          thisArg,
          partials,
          holders,
          partialsRight,
          holdersRight,
          argPos,
          ary2,
          arity
        ];
        if (data2) {
          mergeData(newData, data2);
        }
        func = newData[0];
        bitmask = newData[1];
        thisArg = newData[2];
        partials = newData[3];
        holders = newData[4];
        arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
        if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
          bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
        }
        if (!bitmask || bitmask == WRAP_BIND_FLAG) {
          var result2 = createBind(func, bitmask, thisArg);
        } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
          result2 = createCurry(func, bitmask, arity);
        } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
          result2 = createPartial(func, bitmask, thisArg, partials);
        } else {
          result2 = createHybrid.apply(undefined$1, newData);
        }
        var setter = data2 ? baseSetData : setData;
        return setWrapToString(setter(result2, newData), func, bitmask);
      }
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === undefined$1 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          return srcValue;
        }
        return objValue;
      }
      function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
        if (isObject(objValue) && isObject(srcValue)) {
          stack.set(srcValue, objValue);
          baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
          stack["delete"](srcValue);
        }
        return objValue;
      }
      function customOmitClone(value) {
        return isPlainObject(value) ? undefined$1 : value;
      }
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$1;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== undefined$1) {
            if (compared) {
              continue;
            }
            result2 = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result2 = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result2 = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result2;
      }
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + "";
          case mapTag:
            var convert = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result2;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result2 = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result2 = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result2 && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result2 = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result2;
      }
      function flatRest(func) {
        return setToString(overRest(func, undefined$1, flatten), func + "");
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }
      var getData = !metaMap ? noop : function(func) {
        return metaMap.get(func);
      };
      function getFuncName(func) {
        var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
        while (length--) {
          var data2 = array[length], otherFunc = data2.func;
          if (otherFunc == null || otherFunc == func) {
            return data2.name;
          }
        }
        return result2;
      }
      function getHolder(func) {
        var object = hasOwnProperty.call(lodash2, "placeholder") ? lodash2 : func;
        return object.placeholder;
      }
      function getIteratee() {
        var result2 = lodash2.iteratee || iteratee;
        result2 = result2 === iteratee ? baseIteratee : result2;
        return arguments.length ? result2(arguments[0], arguments[1]) : result2;
      }
      function getMapData(map2, key) {
        var data2 = map2.__data__;
        return isKeyable(key) ? data2[typeof key == "string" ? "string" : "hash"] : data2.map;
      }
      function getMatchData(object) {
        var result2 = keys(object), length = result2.length;
        while (length--) {
          var key = result2[length], value = object[key];
          result2[length] = [key, value, isStrictComparable(value)];
        }
        return result2;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : undefined$1;
      }
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = undefined$1;
          var unmasked = true;
        } catch (e) {
        }
        var result2 = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result2;
      }
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object2(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
        var result2 = [];
        while (object) {
          arrayPush(result2, getSymbols(object));
          object = getPrototype(object);
        }
        return result2;
      };
      var getTag = baseGetTag;
      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
        getTag = function(value) {
          var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined$1, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;
              case mapCtorString:
                return mapTag;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result2;
        };
      }
      function getView(start, end, transforms) {
        var index = -1, length = transforms.length;
        while (++index < length) {
          var data2 = transforms[index], size2 = data2.size;
          switch (data2.type) {
            case "drop":
              start += size2;
              break;
            case "dropRight":
              end -= size2;
              break;
            case "take":
              end = nativeMin(end, start + size2);
              break;
            case "takeRight":
              start = nativeMax(start, end - size2);
              break;
          }
        }
        return { "start": start, "end": end };
      }
      function getWrapDetails(source) {
        var match = source.match(reWrapDetails);
        return match ? match[1].split(reSplitDetails) : [];
      }
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index = -1, length = path.length, result2 = false;
        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result2 = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result2 || ++index != length) {
          return result2;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      function initCloneArray(array) {
        var length = array.length, result2 = new array.constructor(length);
        if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
          result2.index = array.index;
          result2.input = array.input;
        }
        return result2;
      }
      function initCloneObject(object) {
        return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag:
            return cloneArrayBuffer(object);
          case boolTag:
          case dateTag:
            return new Ctor(+object);
          case dataViewTag:
            return cloneDataView(object, isDeep);
          case float32Tag:
          case float64Tag:
          case int8Tag:
          case int16Tag:
          case int32Tag:
          case uint8Tag:
          case uint8ClampedTag:
          case uint16Tag:
          case uint32Tag:
            return cloneTypedArray(object, isDeep);
          case mapTag:
            return new Ctor();
          case numberTag:
          case stringTag:
            return new Ctor(object);
          case regexpTag:
            return cloneRegExp(object);
          case setTag:
            return new Ctor();
          case symbolTag:
            return cloneSymbol(object);
        }
      }
      function insertWrapDetails(source, details) {
        var length = details.length;
        if (!length) {
          return source;
        }
        var lastIndex = length - 1;
        details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
        details = details.join(length > 2 ? ", " : " ");
        return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
      }
      function isFlattenable(value) {
        return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
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
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isLaziable(func) {
        var funcName = getFuncName(func), other = lodash2[funcName];
        if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
          return false;
        }
        if (func === other) {
          return true;
        }
        var data2 = getData(other);
        return !!data2 && func === data2[0];
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var isMaskable = coreJsData ? isFunction : stubFalse;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== undefined$1 || key in Object2(object));
        };
      }
      function memoizeCapped(func) {
        var result2 = memoize(func, function(key) {
          if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
          }
          return key;
        });
        var cache = result2.cache;
        return result2;
      }
      function mergeData(data2, source) {
        var bitmask = data2[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
        var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data2[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
        if (!(isCommon || isCombo)) {
          return data2;
        }
        if (srcBitmask & WRAP_BIND_FLAG) {
          data2[2] = source[2];
          newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
        }
        var value = source[3];
        if (value) {
          var partials = data2[3];
          data2[3] = partials ? composeArgs(partials, value, source[4]) : value;
          data2[4] = partials ? replaceHolders(data2[3], PLACEHOLDER) : source[4];
        }
        value = source[5];
        if (value) {
          partials = data2[5];
          data2[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
          data2[6] = partials ? replaceHolders(data2[5], PLACEHOLDER) : source[6];
        }
        value = source[7];
        if (value) {
          data2[7] = value;
        }
        if (srcBitmask & WRAP_ARY_FLAG) {
          data2[8] = data2[8] == null ? source[8] : nativeMin(data2[8], source[8]);
        }
        if (data2[9] == null) {
          data2[9] = source[9];
        }
        data2[0] = source[0];
        data2[1] = newBitmask;
        return data2;
      }
      function nativeKeysIn(object) {
        var result2 = [];
        if (object != null) {
          for (var key in Object2(object)) {
            result2.push(key);
          }
        }
        return result2;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      function overRest(func, start, transform2) {
        start = nativeMax(start === undefined$1 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array2(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform2(array);
          return apply(func, this, otherArgs);
        };
      }
      function parent(object, path) {
        return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
      }
      function reorder(array, indexes) {
        var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
        while (length--) {
          var index = indexes[length];
          array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
        }
        return array;
      }
      function safeGet(object, key) {
        if (key === "constructor" && typeof object[key] === "function") {
          return;
        }
        if (key == "__proto__") {
          return;
        }
        return object[key];
      }
      var setData = shortOut(baseSetData);
      var setTimeout2 = ctxSetTimeout || function(func, wait) {
        return root.setTimeout(func, wait);
      };
      var setToString = shortOut(baseSetToString);
      function setWrapToString(wrapper, reference, bitmask) {
        var source = reference + "";
        return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
      }
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
          return func.apply(undefined$1, arguments);
        };
      }
      function shuffleSelf(array, size2) {
        var index = -1, length = array.length, lastIndex = length - 1;
        size2 = size2 === undefined$1 ? length : size2;
        while (++index < size2) {
          var rand = baseRandom(index, lastIndex), value = array[rand];
          array[rand] = array[index];
          array[index] = value;
        }
        array.length = size2;
        return array;
      }
      var stringToPath = memoizeCapped(function(string) {
        var result2 = [];
        if (string.charCodeAt(0) === 46) {
          result2.push("");
        }
        string.replace(rePropName, function(match, number, quote, subString) {
          result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
        });
        return result2;
      });
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      function updateWrapDetails(details, bitmask) {
        arrayEach(wrapFlags, function(pair) {
          var value = "_." + pair[0];
          if (bitmask & pair[1] && !arrayIncludes(details, value)) {
            details.push(value);
          }
        });
        return details.sort();
      }
      function wrapperClone(wrapper) {
        if (wrapper instanceof LazyWrapper) {
          return wrapper.clone();
        }
        var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
        result2.__actions__ = copyArray(wrapper.__actions__);
        result2.__index__ = wrapper.__index__;
        result2.__values__ = wrapper.__values__;
        return result2;
      }
      function chunk(array, size2, guard) {
        if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined$1) {
          size2 = 1;
        } else {
          size2 = nativeMax(toInteger(size2), 0);
        }
        var length = array == null ? 0 : array.length;
        if (!length || size2 < 1) {
          return [];
        }
        var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
        while (index < length) {
          result2[resIndex++] = baseSlice(array, index, index += size2);
        }
        return result2;
      }
      function compact(array) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
        while (++index < length) {
          var value = array[index];
          if (value) {
            result2[resIndex++] = value;
          }
        }
        return result2;
      }
      function concat() {
        var length = arguments.length;
        if (!length) {
          return [];
        }
        var args = Array2(length - 1), array = arguments[0], index = length;
        while (index--) {
          args[index - 1] = arguments[index];
        }
        return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
      }
      var difference = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
      });
      var differenceBy = baseRest(function(array, values2) {
        var iteratee2 = last(values2);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
      });
      var differenceWith = baseRest(function(array, values2) {
        var comparator = last(values2);
        if (isArrayLikeObject(comparator)) {
          comparator = undefined$1;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
      });
      function drop(array, n2, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
        return baseSlice(array, n2 < 0 ? 0 : n2, length);
      }
      function dropRight(array, n2, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
        n2 = length - n2;
        return baseSlice(array, 0, n2 < 0 ? 0 : n2);
      }
      function dropRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
      }
      function dropWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
      }
      function fill(array, value, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
          start = 0;
          end = length;
        }
        return baseFill(array, value, start, end);
      }
      function findIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index);
      }
      function findLastIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length - 1;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index, true);
      }
      function flatten(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }
      function flattenDeep(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, INFINITY) : [];
      }
      function flattenDepth(array, depth) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(array, depth);
      }
      function fromPairs(pairs) {
        var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
        while (++index < length) {
          var pair = pairs[index];
          result2[pair[0]] = pair[1];
        }
        return result2;
      }
      function head(array) {
        return array && array.length ? array[0] : undefined$1;
      }
      function indexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseIndexOf(array, value, index);
      }
      function initial(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 0, -1) : [];
      }
      var intersection = baseRest(function(arrays) {
        var mapped = arrayMap(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      var intersectionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        if (iteratee2 === last(mapped)) {
          iteratee2 = undefined$1;
        } else {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
      });
      var intersectionWith = baseRest(function(arrays) {
        var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        if (comparator) {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
      });
      function join(array, separator) {
        return array == null ? "" : nativeJoin.call(array, separator);
      }
      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : undefined$1;
      }
      function lastIndexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
      }
      function nth(array, n2) {
        return array && array.length ? baseNth(array, toInteger(n2)) : undefined$1;
      }
      var pull = baseRest(pullAll);
      function pullAll(array, values2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
      }
      function pullAllBy(array, values2, iteratee2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
      }
      function pullAllWith(array, values2, comparator) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined$1, comparator) : array;
      }
      var pullAt = flatRest(function(array, indexes) {
        var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
        basePullAt(array, arrayMap(indexes, function(index) {
          return isIndex(index, length) ? +index : index;
        }).sort(compareAscending));
        return result2;
      });
      function remove(array, predicate) {
        var result2 = [];
        if (!(array && array.length)) {
          return result2;
        }
        var index = -1, indexes = [], length = array.length;
        predicate = getIteratee(predicate, 3);
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result2.push(value);
            indexes.push(index);
          }
        }
        basePullAt(array, indexes);
        return result2;
      }
      function reverse(array) {
        return array == null ? array : nativeReverse.call(array);
      }
      function slice(array, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
          start = 0;
          end = length;
        } else {
          start = start == null ? 0 : toInteger(start);
          end = end === undefined$1 ? length : toInteger(end);
        }
        return baseSlice(array, start, end);
      }
      function sortedIndex(array, value) {
        return baseSortedIndex(array, value);
      }
      function sortedIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
      }
      function sortedIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value);
          if (index < length && eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedLastIndex(array, value) {
        return baseSortedIndex(array, value, true);
      }
      function sortedLastIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
      }
      function sortedLastIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value, true) - 1;
          if (eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedUniq(array) {
        return array && array.length ? baseSortedUniq(array) : [];
      }
      function sortedUniqBy(array, iteratee2) {
        return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function tail(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 1, length) : [];
      }
      function take(array, n2, guard) {
        if (!(array && array.length)) {
          return [];
        }
        n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
        return baseSlice(array, 0, n2 < 0 ? 0 : n2);
      }
      function takeRight(array, n2, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
        n2 = length - n2;
        return baseSlice(array, n2 < 0 ? 0 : n2, length);
      }
      function takeRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
      }
      function takeWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
      }
      var union = baseRest(function(arrays) {
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
      });
      var unionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
      });
      var unionWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
      });
      function uniq(array) {
        return array && array.length ? baseUniq(array) : [];
      }
      function uniqBy(array, iteratee2) {
        return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function uniqWith(array, comparator) {
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return array && array.length ? baseUniq(array, undefined$1, comparator) : [];
      }
      function unzip(array) {
        if (!(array && array.length)) {
          return [];
        }
        var length = 0;
        array = arrayFilter(array, function(group) {
          if (isArrayLikeObject(group)) {
            length = nativeMax(group.length, length);
            return true;
          }
        });
        return baseTimes(length, function(index) {
          return arrayMap(array, baseProperty(index));
        });
      }
      function unzipWith(array, iteratee2) {
        if (!(array && array.length)) {
          return [];
        }
        var result2 = unzip(array);
        if (iteratee2 == null) {
          return result2;
        }
        return arrayMap(result2, function(group) {
          return apply(iteratee2, undefined$1, group);
        });
      }
      var without = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
      });
      var xor = baseRest(function(arrays) {
        return baseXor(arrayFilter(arrays, isArrayLikeObject));
      });
      var xorBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
      });
      var xorWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
      });
      var zip = baseRest(unzip);
      function zipObject(props, values2) {
        return baseZipObject(props || [], values2 || [], assignValue);
      }
      function zipObjectDeep(props, values2) {
        return baseZipObject(props || [], values2 || [], baseSet);
      }
      var zipWith = baseRest(function(arrays) {
        var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined$1;
        iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$1;
        return unzipWith(arrays, iteratee2);
      });
      function chain(value) {
        var result2 = lodash2(value);
        result2.__chain__ = true;
        return result2;
      }
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }
      function thru(value, interceptor) {
        return interceptor(value);
      }
      var wrapperAt = flatRest(function(paths) {
        var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
          return baseAt(object, paths);
        };
        if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
          return this.thru(interceptor);
        }
        value = value.slice(start, +start + (length ? 1 : 0));
        value.__actions__.push({
          "func": thru,
          "args": [interceptor],
          "thisArg": undefined$1
        });
        return new LodashWrapper(value, this.__chain__).thru(function(array) {
          if (length && !array.length) {
            array.push(undefined$1);
          }
          return array;
        });
      });
      function wrapperChain() {
        return chain(this);
      }
      function wrapperCommit() {
        return new LodashWrapper(this.value(), this.__chain__);
      }
      function wrapperNext() {
        if (this.__values__ === undefined$1) {
          this.__values__ = toArray(this.value());
        }
        var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
        return { "done": done, "value": value };
      }
      function wrapperToIterator() {
        return this;
      }
      function wrapperPlant(value) {
        var result2, parent2 = this;
        while (parent2 instanceof baseLodash) {
          var clone2 = wrapperClone(parent2);
          clone2.__index__ = 0;
          clone2.__values__ = undefined$1;
          if (result2) {
            previous.__wrapped__ = clone2;
          } else {
            result2 = clone2;
          }
          var previous = clone2;
          parent2 = parent2.__wrapped__;
        }
        previous.__wrapped__ = value;
        return result2;
      }
      function wrapperReverse() {
        var value = this.__wrapped__;
        if (value instanceof LazyWrapper) {
          var wrapped = value;
          if (this.__actions__.length) {
            wrapped = new LazyWrapper(this);
          }
          wrapped = wrapped.reverse();
          wrapped.__actions__.push({
            "func": thru,
            "args": [reverse],
            "thisArg": undefined$1
          });
          return new LodashWrapper(wrapped, this.__chain__);
        }
        return this.thru(reverse);
      }
      function wrapperValue() {
        return baseWrapperValue(this.__wrapped__, this.__actions__);
      }
      var countBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty.call(result2, key)) {
          ++result2[key];
        } else {
          baseAssignValue(result2, key, 1);
        }
      });
      function every(collection, predicate, guard) {
        var func = isArray(collection) ? arrayEvery : baseEvery;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      function filter(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, getIteratee(predicate, 3));
      }
      var find = createFind(findIndex);
      var findLast = createFind(findLastIndex);
      function flatMap(collection, iteratee2) {
        return baseFlatten(map(collection, iteratee2), 1);
      }
      function flatMapDeep(collection, iteratee2) {
        return baseFlatten(map(collection, iteratee2), INFINITY);
      }
      function flatMapDepth(collection, iteratee2, depth) {
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(map(collection, iteratee2), depth);
      }
      function forEach(collection, iteratee2) {
        var func = isArray(collection) ? arrayEach : baseEach;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function forEachRight(collection, iteratee2) {
        var func = isArray(collection) ? arrayEachRight : baseEachRight;
        return func(collection, getIteratee(iteratee2, 3));
      }
      var groupBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty.call(result2, key)) {
          result2[key].push(value);
        } else {
          baseAssignValue(result2, key, [value]);
        }
      });
      function includes(collection, value, fromIndex, guard) {
        collection = isArrayLike(collection) ? collection : values(collection);
        fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
        var length = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length + fromIndex, 0);
        }
        return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
      }
      var invokeMap = baseRest(function(collection, path, args) {
        var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value) {
          result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
        });
        return result2;
      });
      var keyBy = createAggregator(function(result2, value, key) {
        baseAssignValue(result2, key, value);
      });
      function map(collection, iteratee2) {
        var func = isArray(collection) ? arrayMap : baseMap;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function orderBy(collection, iteratees, orders, guard) {
        if (collection == null) {
          return [];
        }
        if (!isArray(iteratees)) {
          iteratees = iteratees == null ? [] : [iteratees];
        }
        orders = guard ? undefined$1 : orders;
        if (!isArray(orders)) {
          orders = orders == null ? [] : [orders];
        }
        return baseOrderBy(collection, iteratees, orders);
      }
      var partition = createAggregator(function(result2, value, key) {
        result2[key ? 0 : 1].push(value);
      }, function() {
        return [[], []];
      });
      function reduce(collection, iteratee2, accumulator) {
        var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
      }
      function reduceRight(collection, iteratee2, accumulator) {
        var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
      }
      function reject(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, negate(getIteratee(predicate, 3)));
      }
      function sample(collection) {
        var func = isArray(collection) ? arraySample : baseSample;
        return func(collection);
      }
      function sampleSize(collection, n2, guard) {
        if (guard ? isIterateeCall(collection, n2, guard) : n2 === undefined$1) {
          n2 = 1;
        } else {
          n2 = toInteger(n2);
        }
        var func = isArray(collection) ? arraySampleSize : baseSampleSize;
        return func(collection, n2);
      }
      function shuffle(collection) {
        var func = isArray(collection) ? arrayShuffle : baseShuffle;
        return func(collection);
      }
      function size(collection) {
        if (collection == null) {
          return 0;
        }
        if (isArrayLike(collection)) {
          return isString(collection) ? stringSize(collection) : collection.length;
        }
        var tag = getTag(collection);
        if (tag == mapTag || tag == setTag) {
          return collection.size;
        }
        return baseKeys(collection).length;
      }
      function some(collection, predicate, guard) {
        var func = isArray(collection) ? arraySome : baseSome;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      var sortBy = baseRest(function(collection, iteratees) {
        if (collection == null) {
          return [];
        }
        var length = iteratees.length;
        if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }
        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });
      var now = ctxNow || function() {
        return root.Date.now();
      };
      function after(n2, func) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        n2 = toInteger(n2);
        return function() {
          if (--n2 < 1) {
            return func.apply(this, arguments);
          }
        };
      }
      function ary(func, n2, guard) {
        n2 = guard ? undefined$1 : n2;
        n2 = func && n2 == null ? func.length : n2;
        return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n2);
      }
      function before(n2, func) {
        var result2;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        n2 = toInteger(n2);
        return function() {
          if (--n2 > 0) {
            result2 = func.apply(this, arguments);
          }
          if (n2 <= 1) {
            func = undefined$1;
          }
          return result2;
        };
      }
      var bind = baseRest(function(func, thisArg, partials) {
        var bitmask = WRAP_BIND_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bind));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(func, bitmask, thisArg, partials, holders);
      });
      var bindKey = baseRest(function(object, key, partials) {
        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bindKey));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(key, bitmask, object, partials, holders);
      });
      function curry(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result2.placeholder = curry.placeholder;
        return result2;
      }
      function curryRight(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result2.placeholder = curryRight.placeholder;
        return result2;
      }
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = undefined$1;
          lastInvokeTime = time;
          result2 = func.apply(thisArg, args);
          return result2;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout2(timerExpired, wait);
          return leading ? invokeFunc(time) : result2;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout2(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = undefined$1;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = undefined$1;
          return result2;
        }
        function cancel() {
          if (timerId !== undefined$1) {
            clearTimeout2(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = undefined$1;
        }
        function flush() {
          return timerId === undefined$1 ? result2 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === undefined$1) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout2(timerId);
              timerId = setTimeout2(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === undefined$1) {
            timerId = setTimeout2(timerExpired, wait);
          }
          return result2;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      var defer = baseRest(function(func, args) {
        return baseDelay(func, 1, args);
      });
      var delay = baseRest(function(func, wait, args) {
        return baseDelay(func, toNumber(wait) || 0, args);
      });
      function flip(func) {
        return createWrap(func, WRAP_FLIP_FLAG);
      }
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result2 = func.apply(this, args);
          memoized.cache = cache.set(key, result2) || cache;
          return result2;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      function negate(predicate) {
        if (typeof predicate != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return !predicate.call(this);
            case 1:
              return !predicate.call(this, args[0]);
            case 2:
              return !predicate.call(this, args[0], args[1]);
            case 3:
              return !predicate.call(this, args[0], args[1], args[2]);
          }
          return !predicate.apply(this, args);
        };
      }
      function once(func) {
        return before(2, func);
      }
      var overArgs = castRest(function(func, transforms) {
        transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
        var funcsLength = transforms.length;
        return baseRest(function(args) {
          var index = -1, length = nativeMin(args.length, funcsLength);
          while (++index < length) {
            args[index] = transforms[index].call(this, args[index]);
          }
          return apply(func, this, args);
        });
      });
      var partial = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partial));
        return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
      });
      var partialRight = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partialRight));
        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
      });
      var rearg = flatRest(function(func, indexes) {
        return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
      });
      function rest(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        start = start === undefined$1 ? start : toInteger(start);
        return baseRest(func, start);
      }
      function spread(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        start = start == null ? 0 : nativeMax(toInteger(start), 0);
        return baseRest(function(args) {
          var array = args[start], otherArgs = castSlice(args, 0, start);
          if (array) {
            arrayPush(otherArgs, array);
          }
          return apply(func, this, otherArgs);
        });
      }
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      function unary(func) {
        return ary(func, 1);
      }
      function wrap(value, wrapper) {
        return partial(castFunction(wrapper), value);
      }
      function castArray() {
        if (!arguments.length) {
          return [];
        }
        var value = arguments[0];
        return isArray(value) ? value : [value];
      }
      function clone(value) {
        return baseClone(value, CLONE_SYMBOLS_FLAG);
      }
      function cloneWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
      }
      function cloneDeep(value) {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      function cloneDeepWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
      }
      function conformsTo(object, source) {
        return source == null || baseConformsTo(object, source, keys(source));
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var gt2 = createRelationalOperation(baseGt);
      var gte = createRelationalOperation(function(value, other) {
        return value >= other;
      });
      var isArguments = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      var isArray = Array2.isArray;
      var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function isBoolean(value) {
        return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
      }
      var isBuffer = nativeIsBuffer || stubFalse;
      var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
      function isElement(value) {
        return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
      }
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
          return !value.length;
        }
        var tag = getTag(value);
        if (tag == mapTag || tag == setTag) {
          return !value.size;
        }
        if (isPrototype(value)) {
          return !baseKeys(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty.call(value, key)) {
            return false;
          }
        }
        return true;
      }
      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }
      function isEqualWith(value, other, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        var result2 = customizer ? customizer(value, other) : undefined$1;
        return result2 === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result2;
      }
      function isError(value) {
        if (!isObjectLike(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
      }
      function isFinite(value) {
        return typeof value == "number" && nativeIsFinite(value);
      }
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      function isInteger(value) {
        return typeof value == "number" && value == toInteger(value);
      }
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
      function isMatch(object, source) {
        return object === source || baseIsMatch(object, source, getMatchData(source));
      }
      function isMatchWith(object, source, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseIsMatch(object, source, getMatchData(source), customizer);
      }
      function isNaN2(value) {
        return isNumber(value) && value != +value;
      }
      function isNative(value) {
        if (isMaskable(value)) {
          throw new Error2(CORE_ERROR_TEXT);
        }
        return baseIsNative(value);
      }
      function isNull(value) {
        return value === null;
      }
      function isNil(value) {
        return value == null;
      }
      function isNumber(value) {
        return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
      }
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
      function isSafeInteger(value) {
        return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
      }
      var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
      function isString(value) {
        return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      function isUndefined(value) {
        return value === undefined$1;
      }
      function isWeakMap(value) {
        return isObjectLike(value) && getTag(value) == weakMapTag;
      }
      function isWeakSet(value) {
        return isObjectLike(value) && baseGetTag(value) == weakSetTag;
      }
      var lt2 = createRelationalOperation(baseLt);
      var lte = createRelationalOperation(function(value, other) {
        return value <= other;
      });
      function toArray(value) {
        if (!value) {
          return [];
        }
        if (isArrayLike(value)) {
          return isString(value) ? stringToArray(value) : copyArray(value);
        }
        if (symIterator && value[symIterator]) {
          return iteratorToArray(value[symIterator]());
        }
        var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
        return func(value);
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result2 = toFinite(value), remainder = result2 % 1;
        return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
      }
      function toLength(value) {
        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      function toSafeInteger(value) {
        return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      var assign = createAssigner(function(object, source) {
        if (isPrototype(source) || isArrayLike(source)) {
          copyObject(source, keys(source), object);
          return;
        }
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            assignValue(object, key, source[key]);
          }
        }
      });
      var assignIn = createAssigner(function(object, source) {
        copyObject(source, keysIn(source), object);
      });
      var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      });
      var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keys(source), object, customizer);
      });
      var at2 = flatRest(baseAt);
      function create(prototype, properties) {
        var result2 = baseCreate(prototype);
        return properties == null ? result2 : baseAssign(result2, properties);
      }
      var defaults = baseRest(function(object, sources) {
        object = Object2(object);
        var index = -1;
        var length = sources.length;
        var guard = length > 2 ? sources[2] : undefined$1;
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
            if (value === undefined$1 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              object[key] = source[key];
            }
          }
        }
        return object;
      });
      var defaultsDeep = baseRest(function(args) {
        args.push(undefined$1, customDefaultsMerge);
        return apply(mergeWith, undefined$1, args);
      });
      function findKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
      }
      function findLastKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
      }
      function forIn(object, iteratee2) {
        return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forInRight(object, iteratee2) {
        return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forOwn(object, iteratee2) {
        return object && baseForOwn(object, getIteratee(iteratee2, 3));
      }
      function forOwnRight(object, iteratee2) {
        return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
      }
      function functions(object) {
        return object == null ? [] : baseFunctions(object, keys(object));
      }
      function functionsIn(object) {
        return object == null ? [] : baseFunctions(object, keysIn(object));
      }
      function get(object, path, defaultValue) {
        var result2 = object == null ? undefined$1 : baseGet(object, path);
        return result2 === undefined$1 ? defaultValue : result2;
      }
      function has(object, path) {
        return object != null && hasPath(object, path, baseHas);
      }
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      var invert = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        result2[value] = key;
      }, constant(identity));
      var invertBy = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        if (hasOwnProperty.call(result2, value)) {
          result2[value].push(key);
        } else {
          result2[value] = [key];
        }
      }, getIteratee);
      var invoke = baseRest(baseInvoke);
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      function mapKeys(object, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result2, iteratee2(value, key, object2), value);
        });
        return result2;
      }
      function mapValues(object, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result2, key, iteratee2(value, key, object2));
        });
        return result2;
      }
      var merge = createAssigner(function(object, source, srcIndex) {
        baseMerge(object, source, srcIndex);
      });
      var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
        baseMerge(object, source, srcIndex, customizer);
      });
      var omit = flatRest(function(object, paths) {
        var result2 = {};
        if (object == null) {
          return result2;
        }
        var isDeep = false;
        paths = arrayMap(paths, function(path) {
          path = castPath(path, object);
          isDeep || (isDeep = path.length > 1);
          return path;
        });
        copyObject(object, getAllKeysIn(object), result2);
        if (isDeep) {
          result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }
        var length = paths.length;
        while (length--) {
          baseUnset(result2, paths[length]);
        }
        return result2;
      });
      function omitBy(object, predicate) {
        return pickBy(object, negate(getIteratee(predicate)));
      }
      var pick = flatRest(function(object, paths) {
        return object == null ? {} : basePick(object, paths);
      });
      function pickBy(object, predicate) {
        if (object == null) {
          return {};
        }
        var props = arrayMap(getAllKeysIn(object), function(prop) {
          return [prop];
        });
        predicate = getIteratee(predicate);
        return basePickBy(object, props, function(value, path) {
          return predicate(value, path[0]);
        });
      }
      function result(object, path, defaultValue) {
        path = castPath(path, object);
        var index = -1, length = path.length;
        if (!length) {
          length = 1;
          object = undefined$1;
        }
        while (++index < length) {
          var value = object == null ? undefined$1 : object[toKey(path[index])];
          if (value === undefined$1) {
            index = length;
            value = defaultValue;
          }
          object = isFunction(value) ? value.call(object) : value;
        }
        return object;
      }
      function set(object, path, value) {
        return object == null ? object : baseSet(object, path, value);
      }
      function setWith(object, path, value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return object == null ? object : baseSet(object, path, value, customizer);
      }
      var toPairs = createToPairs(keys);
      var toPairsIn = createToPairs(keysIn);
      function transform(object, iteratee2, accumulator) {
        var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
        iteratee2 = getIteratee(iteratee2, 4);
        if (accumulator == null) {
          var Ctor = object && object.constructor;
          if (isArrLike) {
            accumulator = isArr ? new Ctor() : [];
          } else if (isObject(object)) {
            accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
          } else {
            accumulator = {};
          }
        }
        (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
          return iteratee2(accumulator, value, index, object2);
        });
        return accumulator;
      }
      function unset(object, path) {
        return object == null ? true : baseUnset(object, path);
      }
      function update(object, path, updater) {
        return object == null ? object : baseUpdate(object, path, castFunction(updater));
      }
      function updateWith(object, path, updater, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
      }
      function values(object) {
        return object == null ? [] : baseValues(object, keys(object));
      }
      function valuesIn(object) {
        return object == null ? [] : baseValues(object, keysIn(object));
      }
      function clamp(number, lower, upper) {
        if (upper === undefined$1) {
          upper = lower;
          lower = undefined$1;
        }
        if (upper !== undefined$1) {
          upper = toNumber(upper);
          upper = upper === upper ? upper : 0;
        }
        if (lower !== undefined$1) {
          lower = toNumber(lower);
          lower = lower === lower ? lower : 0;
        }
        return baseClamp(toNumber(number), lower, upper);
      }
      function inRange(number, start, end) {
        start = toFinite(start);
        if (end === undefined$1) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        number = toNumber(number);
        return baseInRange(number, start, end);
      }
      function random(lower, upper, floating) {
        if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
          upper = floating = undefined$1;
        }
        if (floating === undefined$1) {
          if (typeof upper == "boolean") {
            floating = upper;
            upper = undefined$1;
          } else if (typeof lower == "boolean") {
            floating = lower;
            lower = undefined$1;
          }
        }
        if (lower === undefined$1 && upper === undefined$1) {
          lower = 0;
          upper = 1;
        } else {
          lower = toFinite(lower);
          if (upper === undefined$1) {
            upper = lower;
            lower = 0;
          } else {
            upper = toFinite(upper);
          }
        }
        if (lower > upper) {
          var temp = lower;
          lower = upper;
          upper = temp;
        }
        if (floating || lower % 1 || upper % 1) {
          var rand = nativeRandom();
          return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
        }
        return baseRandom(lower, upper);
      }
      var camelCase = createCompounder(function(result2, word, index) {
        word = word.toLowerCase();
        return result2 + (index ? capitalize(word) : word);
      });
      function capitalize(string) {
        return upperFirst(toString(string).toLowerCase());
      }
      function deburr(string) {
        string = toString(string);
        return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
      }
      function endsWith(string, target, position) {
        string = toString(string);
        target = baseToString(target);
        var length = string.length;
        position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
        var end = position;
        position -= target.length;
        return position >= 0 && string.slice(position, end) == target;
      }
      function escape(string) {
        string = toString(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      function escapeRegExp(string) {
        string = toString(string);
        return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
      }
      var kebabCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? "-" : "") + word.toLowerCase();
      });
      var lowerCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toLowerCase();
      });
      var lowerFirst = createCaseFirst("toLowerCase");
      function pad(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        if (!length || strLength >= length) {
          return string;
        }
        var mid = (length - strLength) / 2;
        return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
      }
      function padEnd(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
      }
      function padStart(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
      }
      function parseInt2(string, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
      }
      function repeat(string, n2, guard) {
        if (guard ? isIterateeCall(string, n2, guard) : n2 === undefined$1) {
          n2 = 1;
        } else {
          n2 = toInteger(n2);
        }
        return baseRepeat(toString(string), n2);
      }
      function replace() {
        var args = arguments, string = toString(args[0]);
        return args.length < 3 ? string : string.replace(args[1], args[2]);
      }
      var snakeCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? "_" : "") + word.toLowerCase();
      });
      function split(string, separator, limit) {
        if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
          separator = limit = undefined$1;
        }
        limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
        if (!limit) {
          return [];
        }
        string = toString(string);
        if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
          separator = baseToString(separator);
          if (!separator && hasUnicode(string)) {
            return castSlice(stringToArray(string), 0, limit);
          }
        }
        return string.split(separator, limit);
      }
      var startCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + upperFirst(word);
      });
      function startsWith(string, target, position) {
        string = toString(string);
        position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
        target = baseToString(target);
        return string.slice(position, position + target.length) == target;
      }
      function template(string, options, guard) {
        var settings = lodash2.templateSettings;
        if (guard && isIterateeCall(string, options, guard)) {
          options = undefined$1;
        }
        string = toString(string);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
        var reDelimiters = RegExp2(
          (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
          "g"
        );
        var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
        string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            isEscaping = true;
            source += "' +\n__e(" + escapeValue + ") +\n'";
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
          }
          if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }
          index = offset + match.length;
          return match;
        });
        source += "';\n";
        var variable = hasOwnProperty.call(options, "variable") && options.variable;
        if (!variable) {
          source = "with (obj) {\n" + source + "\n}\n";
        } else if (reForbiddenIdentifierChars.test(variable)) {
          throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
        }
        source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
        source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
        var result2 = attempt(function() {
          return Function2(importsKeys, sourceURL + "return " + source).apply(undefined$1, importsValues);
        });
        result2.source = source;
        if (isError(result2)) {
          throw result2;
        }
        return result2;
      }
      function toLower(value) {
        return toString(value).toLowerCase();
      }
      function toUpper(value) {
        return toString(value).toUpperCase();
      }
      function trim(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined$1)) {
          return baseTrim(string);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join("");
      }
      function trimEnd(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined$1)) {
          return string.slice(0, trimmedEndIndex(string) + 1);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
        return castSlice(strSymbols, 0, end).join("");
      }
      function trimStart(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined$1)) {
          return string.replace(reTrimStart, "");
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
        return castSlice(strSymbols, start).join("");
      }
      function truncate(string, options) {
        var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
        if (isObject(options)) {
          var separator = "separator" in options ? options.separator : separator;
          length = "length" in options ? toInteger(options.length) : length;
          omission = "omission" in options ? baseToString(options.omission) : omission;
        }
        string = toString(string);
        var strLength = string.length;
        if (hasUnicode(string)) {
          var strSymbols = stringToArray(string);
          strLength = strSymbols.length;
        }
        if (length >= strLength) {
          return string;
        }
        var end = length - stringSize(omission);
        if (end < 1) {
          return omission;
        }
        var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
        if (separator === undefined$1) {
          return result2 + omission;
        }
        if (strSymbols) {
          end += result2.length - end;
        }
        if (isRegExp(separator)) {
          if (string.slice(end).search(separator)) {
            var match, substring = result2;
            if (!separator.global) {
              separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
            }
            separator.lastIndex = 0;
            while (match = separator.exec(substring)) {
              var newEnd = match.index;
            }
            result2 = result2.slice(0, newEnd === undefined$1 ? end : newEnd);
          }
        } else if (string.indexOf(baseToString(separator), end) != end) {
          var index = result2.lastIndexOf(separator);
          if (index > -1) {
            result2 = result2.slice(0, index);
          }
        }
        return result2 + omission;
      }
      function unescape(string) {
        string = toString(string);
        return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
      }
      var upperCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toUpperCase();
      });
      var upperFirst = createCaseFirst("toUpperCase");
      function words(string, pattern, guard) {
        string = toString(string);
        pattern = guard ? undefined$1 : pattern;
        if (pattern === undefined$1) {
          return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
        }
        return string.match(pattern) || [];
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, undefined$1, args);
        } catch (e) {
          return isError(e) ? e : new Error2(e);
        }
      });
      var bindAll = flatRest(function(object, methodNames) {
        arrayEach(methodNames, function(key) {
          key = toKey(key);
          baseAssignValue(object, key, bind(object[key], object));
        });
        return object;
      });
      function cond(pairs) {
        var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
        pairs = !length ? [] : arrayMap(pairs, function(pair) {
          if (typeof pair[1] != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return [toIteratee(pair[0]), pair[1]];
        });
        return baseRest(function(args) {
          var index = -1;
          while (++index < length) {
            var pair = pairs[index];
            if (apply(pair[0], this, args)) {
              return apply(pair[1], this, args);
            }
          }
        });
      }
      function conforms(source) {
        return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
      }
      function constant(value) {
        return function() {
          return value;
        };
      }
      function defaultTo(value, defaultValue) {
        return value == null || value !== value ? defaultValue : value;
      }
      var flow = createFlow();
      var flowRight = createFlow(true);
      function identity(value) {
        return value;
      }
      function iteratee(func) {
        return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
      }
      function matches(source) {
        return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
      }
      function matchesProperty(path, srcValue) {
        return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
      }
      var method = baseRest(function(path, args) {
        return function(object) {
          return baseInvoke(object, path, args);
        };
      });
      var methodOf = baseRest(function(object, args) {
        return function(path) {
          return baseInvoke(object, path, args);
        };
      });
      function mixin(object, source, options) {
        var props = keys(source), methodNames = baseFunctions(source, props);
        if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
          options = source;
          source = object;
          object = this;
          methodNames = baseFunctions(source, keys(source));
        }
        var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
        arrayEach(methodNames, function(methodName) {
          var func = source[methodName];
          object[methodName] = func;
          if (isFunc) {
            object.prototype[methodName] = function() {
              var chainAll = this.__chain__;
              if (chain2 || chainAll) {
                var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                actions.push({ "func": func, "args": arguments, "thisArg": object });
                result2.__chain__ = chainAll;
                return result2;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }
        });
        return object;
      }
      function noConflict() {
        if (root._ === this) {
          root._ = oldDash;
        }
        return this;
      }
      function noop() {
      }
      function nthArg(n2) {
        n2 = toInteger(n2);
        return baseRest(function(args) {
          return baseNth(args, n2);
        });
      }
      var over = createOver(arrayMap);
      var overEvery = createOver(arrayEvery);
      var overSome = createOver(arraySome);
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      function propertyOf(object) {
        return function(path) {
          return object == null ? undefined$1 : baseGet(object, path);
        };
      }
      var range = createRange();
      var rangeRight = createRange(true);
      function stubArray() {
        return [];
      }
      function stubFalse() {
        return false;
      }
      function stubObject() {
        return {};
      }
      function stubString() {
        return "";
      }
      function stubTrue() {
        return true;
      }
      function times(n2, iteratee2) {
        n2 = toInteger(n2);
        if (n2 < 1 || n2 > MAX_SAFE_INTEGER) {
          return [];
        }
        var index = MAX_ARRAY_LENGTH, length = nativeMin(n2, MAX_ARRAY_LENGTH);
        iteratee2 = getIteratee(iteratee2);
        n2 -= MAX_ARRAY_LENGTH;
        var result2 = baseTimes(length, iteratee2);
        while (++index < n2) {
          iteratee2(index);
        }
        return result2;
      }
      function toPath(value) {
        if (isArray(value)) {
          return arrayMap(value, toKey);
        }
        return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
      }
      function uniqueId(prefix) {
        var id = ++idCounter;
        return toString(prefix) + id;
      }
      var add = createMathOperation(function(augend, addend) {
        return augend + addend;
      }, 0);
      var ceil = createRound("ceil");
      var divide = createMathOperation(function(dividend, divisor) {
        return dividend / divisor;
      }, 1);
      var floor = createRound("floor");
      function max(array) {
        return array && array.length ? baseExtremum(array, identity, baseGt) : undefined$1;
      }
      function maxBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined$1;
      }
      function mean(array) {
        return baseMean(array, identity);
      }
      function meanBy(array, iteratee2) {
        return baseMean(array, getIteratee(iteratee2, 2));
      }
      function min(array) {
        return array && array.length ? baseExtremum(array, identity, baseLt) : undefined$1;
      }
      function minBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined$1;
      }
      var multiply = createMathOperation(function(multiplier, multiplicand) {
        return multiplier * multiplicand;
      }, 1);
      var round = createRound("round");
      var subtract = createMathOperation(function(minuend, subtrahend) {
        return minuend - subtrahend;
      }, 0);
      function sum(array) {
        return array && array.length ? baseSum(array, identity) : 0;
      }
      function sumBy(array, iteratee2) {
        return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
      }
      lodash2.after = after;
      lodash2.ary = ary;
      lodash2.assign = assign;
      lodash2.assignIn = assignIn;
      lodash2.assignInWith = assignInWith;
      lodash2.assignWith = assignWith;
      lodash2.at = at2;
      lodash2.before = before;
      lodash2.bind = bind;
      lodash2.bindAll = bindAll;
      lodash2.bindKey = bindKey;
      lodash2.castArray = castArray;
      lodash2.chain = chain;
      lodash2.chunk = chunk;
      lodash2.compact = compact;
      lodash2.concat = concat;
      lodash2.cond = cond;
      lodash2.conforms = conforms;
      lodash2.constant = constant;
      lodash2.countBy = countBy;
      lodash2.create = create;
      lodash2.curry = curry;
      lodash2.curryRight = curryRight;
      lodash2.debounce = debounce;
      lodash2.defaults = defaults;
      lodash2.defaultsDeep = defaultsDeep;
      lodash2.defer = defer;
      lodash2.delay = delay;
      lodash2.difference = difference;
      lodash2.differenceBy = differenceBy;
      lodash2.differenceWith = differenceWith;
      lodash2.drop = drop;
      lodash2.dropRight = dropRight;
      lodash2.dropRightWhile = dropRightWhile;
      lodash2.dropWhile = dropWhile;
      lodash2.fill = fill;
      lodash2.filter = filter;
      lodash2.flatMap = flatMap;
      lodash2.flatMapDeep = flatMapDeep;
      lodash2.flatMapDepth = flatMapDepth;
      lodash2.flatten = flatten;
      lodash2.flattenDeep = flattenDeep;
      lodash2.flattenDepth = flattenDepth;
      lodash2.flip = flip;
      lodash2.flow = flow;
      lodash2.flowRight = flowRight;
      lodash2.fromPairs = fromPairs;
      lodash2.functions = functions;
      lodash2.functionsIn = functionsIn;
      lodash2.groupBy = groupBy;
      lodash2.initial = initial;
      lodash2.intersection = intersection;
      lodash2.intersectionBy = intersectionBy;
      lodash2.intersectionWith = intersectionWith;
      lodash2.invert = invert;
      lodash2.invertBy = invertBy;
      lodash2.invokeMap = invokeMap;
      lodash2.iteratee = iteratee;
      lodash2.keyBy = keyBy;
      lodash2.keys = keys;
      lodash2.keysIn = keysIn;
      lodash2.map = map;
      lodash2.mapKeys = mapKeys;
      lodash2.mapValues = mapValues;
      lodash2.matches = matches;
      lodash2.matchesProperty = matchesProperty;
      lodash2.memoize = memoize;
      lodash2.merge = merge;
      lodash2.mergeWith = mergeWith;
      lodash2.method = method;
      lodash2.methodOf = methodOf;
      lodash2.mixin = mixin;
      lodash2.negate = negate;
      lodash2.nthArg = nthArg;
      lodash2.omit = omit;
      lodash2.omitBy = omitBy;
      lodash2.once = once;
      lodash2.orderBy = orderBy;
      lodash2.over = over;
      lodash2.overArgs = overArgs;
      lodash2.overEvery = overEvery;
      lodash2.overSome = overSome;
      lodash2.partial = partial;
      lodash2.partialRight = partialRight;
      lodash2.partition = partition;
      lodash2.pick = pick;
      lodash2.pickBy = pickBy;
      lodash2.property = property;
      lodash2.propertyOf = propertyOf;
      lodash2.pull = pull;
      lodash2.pullAll = pullAll;
      lodash2.pullAllBy = pullAllBy;
      lodash2.pullAllWith = pullAllWith;
      lodash2.pullAt = pullAt;
      lodash2.range = range;
      lodash2.rangeRight = rangeRight;
      lodash2.rearg = rearg;
      lodash2.reject = reject;
      lodash2.remove = remove;
      lodash2.rest = rest;
      lodash2.reverse = reverse;
      lodash2.sampleSize = sampleSize;
      lodash2.set = set;
      lodash2.setWith = setWith;
      lodash2.shuffle = shuffle;
      lodash2.slice = slice;
      lodash2.sortBy = sortBy;
      lodash2.sortedUniq = sortedUniq;
      lodash2.sortedUniqBy = sortedUniqBy;
      lodash2.split = split;
      lodash2.spread = spread;
      lodash2.tail = tail;
      lodash2.take = take;
      lodash2.takeRight = takeRight;
      lodash2.takeRightWhile = takeRightWhile;
      lodash2.takeWhile = takeWhile;
      lodash2.tap = tap;
      lodash2.throttle = throttle;
      lodash2.thru = thru;
      lodash2.toArray = toArray;
      lodash2.toPairs = toPairs;
      lodash2.toPairsIn = toPairsIn;
      lodash2.toPath = toPath;
      lodash2.toPlainObject = toPlainObject;
      lodash2.transform = transform;
      lodash2.unary = unary;
      lodash2.union = union;
      lodash2.unionBy = unionBy;
      lodash2.unionWith = unionWith;
      lodash2.uniq = uniq;
      lodash2.uniqBy = uniqBy;
      lodash2.uniqWith = uniqWith;
      lodash2.unset = unset;
      lodash2.unzip = unzip;
      lodash2.unzipWith = unzipWith;
      lodash2.update = update;
      lodash2.updateWith = updateWith;
      lodash2.values = values;
      lodash2.valuesIn = valuesIn;
      lodash2.without = without;
      lodash2.words = words;
      lodash2.wrap = wrap;
      lodash2.xor = xor;
      lodash2.xorBy = xorBy;
      lodash2.xorWith = xorWith;
      lodash2.zip = zip;
      lodash2.zipObject = zipObject;
      lodash2.zipObjectDeep = zipObjectDeep;
      lodash2.zipWith = zipWith;
      lodash2.entries = toPairs;
      lodash2.entriesIn = toPairsIn;
      lodash2.extend = assignIn;
      lodash2.extendWith = assignInWith;
      mixin(lodash2, lodash2);
      lodash2.add = add;
      lodash2.attempt = attempt;
      lodash2.camelCase = camelCase;
      lodash2.capitalize = capitalize;
      lodash2.ceil = ceil;
      lodash2.clamp = clamp;
      lodash2.clone = clone;
      lodash2.cloneDeep = cloneDeep;
      lodash2.cloneDeepWith = cloneDeepWith;
      lodash2.cloneWith = cloneWith;
      lodash2.conformsTo = conformsTo;
      lodash2.deburr = deburr;
      lodash2.defaultTo = defaultTo;
      lodash2.divide = divide;
      lodash2.endsWith = endsWith;
      lodash2.eq = eq;
      lodash2.escape = escape;
      lodash2.escapeRegExp = escapeRegExp;
      lodash2.every = every;
      lodash2.find = find;
      lodash2.findIndex = findIndex;
      lodash2.findKey = findKey;
      lodash2.findLast = findLast;
      lodash2.findLastIndex = findLastIndex;
      lodash2.findLastKey = findLastKey;
      lodash2.floor = floor;
      lodash2.forEach = forEach;
      lodash2.forEachRight = forEachRight;
      lodash2.forIn = forIn;
      lodash2.forInRight = forInRight;
      lodash2.forOwn = forOwn;
      lodash2.forOwnRight = forOwnRight;
      lodash2.get = get;
      lodash2.gt = gt2;
      lodash2.gte = gte;
      lodash2.has = has;
      lodash2.hasIn = hasIn;
      lodash2.head = head;
      lodash2.identity = identity;
      lodash2.includes = includes;
      lodash2.indexOf = indexOf;
      lodash2.inRange = inRange;
      lodash2.invoke = invoke;
      lodash2.isArguments = isArguments;
      lodash2.isArray = isArray;
      lodash2.isArrayBuffer = isArrayBuffer;
      lodash2.isArrayLike = isArrayLike;
      lodash2.isArrayLikeObject = isArrayLikeObject;
      lodash2.isBoolean = isBoolean;
      lodash2.isBuffer = isBuffer;
      lodash2.isDate = isDate;
      lodash2.isElement = isElement;
      lodash2.isEmpty = isEmpty;
      lodash2.isEqual = isEqual;
      lodash2.isEqualWith = isEqualWith;
      lodash2.isError = isError;
      lodash2.isFinite = isFinite;
      lodash2.isFunction = isFunction;
      lodash2.isInteger = isInteger;
      lodash2.isLength = isLength;
      lodash2.isMap = isMap;
      lodash2.isMatch = isMatch;
      lodash2.isMatchWith = isMatchWith;
      lodash2.isNaN = isNaN2;
      lodash2.isNative = isNative;
      lodash2.isNil = isNil;
      lodash2.isNull = isNull;
      lodash2.isNumber = isNumber;
      lodash2.isObject = isObject;
      lodash2.isObjectLike = isObjectLike;
      lodash2.isPlainObject = isPlainObject;
      lodash2.isRegExp = isRegExp;
      lodash2.isSafeInteger = isSafeInteger;
      lodash2.isSet = isSet;
      lodash2.isString = isString;
      lodash2.isSymbol = isSymbol;
      lodash2.isTypedArray = isTypedArray;
      lodash2.isUndefined = isUndefined;
      lodash2.isWeakMap = isWeakMap;
      lodash2.isWeakSet = isWeakSet;
      lodash2.join = join;
      lodash2.kebabCase = kebabCase;
      lodash2.last = last;
      lodash2.lastIndexOf = lastIndexOf;
      lodash2.lowerCase = lowerCase;
      lodash2.lowerFirst = lowerFirst;
      lodash2.lt = lt2;
      lodash2.lte = lte;
      lodash2.max = max;
      lodash2.maxBy = maxBy;
      lodash2.mean = mean;
      lodash2.meanBy = meanBy;
      lodash2.min = min;
      lodash2.minBy = minBy;
      lodash2.stubArray = stubArray;
      lodash2.stubFalse = stubFalse;
      lodash2.stubObject = stubObject;
      lodash2.stubString = stubString;
      lodash2.stubTrue = stubTrue;
      lodash2.multiply = multiply;
      lodash2.nth = nth;
      lodash2.noConflict = noConflict;
      lodash2.noop = noop;
      lodash2.now = now;
      lodash2.pad = pad;
      lodash2.padEnd = padEnd;
      lodash2.padStart = padStart;
      lodash2.parseInt = parseInt2;
      lodash2.random = random;
      lodash2.reduce = reduce;
      lodash2.reduceRight = reduceRight;
      lodash2.repeat = repeat;
      lodash2.replace = replace;
      lodash2.result = result;
      lodash2.round = round;
      lodash2.runInContext = runInContext2;
      lodash2.sample = sample;
      lodash2.size = size;
      lodash2.snakeCase = snakeCase;
      lodash2.some = some;
      lodash2.sortedIndex = sortedIndex;
      lodash2.sortedIndexBy = sortedIndexBy;
      lodash2.sortedIndexOf = sortedIndexOf;
      lodash2.sortedLastIndex = sortedLastIndex;
      lodash2.sortedLastIndexBy = sortedLastIndexBy;
      lodash2.sortedLastIndexOf = sortedLastIndexOf;
      lodash2.startCase = startCase;
      lodash2.startsWith = startsWith;
      lodash2.subtract = subtract;
      lodash2.sum = sum;
      lodash2.sumBy = sumBy;
      lodash2.template = template;
      lodash2.times = times;
      lodash2.toFinite = toFinite;
      lodash2.toInteger = toInteger;
      lodash2.toLength = toLength;
      lodash2.toLower = toLower;
      lodash2.toNumber = toNumber;
      lodash2.toSafeInteger = toSafeInteger;
      lodash2.toString = toString;
      lodash2.toUpper = toUpper;
      lodash2.trim = trim;
      lodash2.trimEnd = trimEnd;
      lodash2.trimStart = trimStart;
      lodash2.truncate = truncate;
      lodash2.unescape = unescape;
      lodash2.uniqueId = uniqueId;
      lodash2.upperCase = upperCase;
      lodash2.upperFirst = upperFirst;
      lodash2.each = forEach;
      lodash2.eachRight = forEachRight;
      lodash2.first = head;
      mixin(lodash2, function() {
        var source = {};
        baseForOwn(lodash2, function(func, methodName) {
          if (!hasOwnProperty.call(lodash2.prototype, methodName)) {
            source[methodName] = func;
          }
        });
        return source;
      }(), { "chain": false });
      lodash2.VERSION = VERSION;
      arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
        lodash2[methodName].placeholder = lodash2;
      });
      arrayEach(["drop", "take"], function(methodName, index) {
        LazyWrapper.prototype[methodName] = function(n2) {
          n2 = n2 === undefined$1 ? 1 : nativeMax(toInteger(n2), 0);
          var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
          if (result2.__filtered__) {
            result2.__takeCount__ = nativeMin(n2, result2.__takeCount__);
          } else {
            result2.__views__.push({
              "size": nativeMin(n2, MAX_ARRAY_LENGTH),
              "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
            });
          }
          return result2;
        };
        LazyWrapper.prototype[methodName + "Right"] = function(n2) {
          return this.reverse()[methodName](n2).reverse();
        };
      });
      arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
        var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
        LazyWrapper.prototype[methodName] = function(iteratee2) {
          var result2 = this.clone();
          result2.__iteratees__.push({
            "iteratee": getIteratee(iteratee2, 3),
            "type": type
          });
          result2.__filtered__ = result2.__filtered__ || isFilter;
          return result2;
        };
      });
      arrayEach(["head", "last"], function(methodName, index) {
        var takeName = "take" + (index ? "Right" : "");
        LazyWrapper.prototype[methodName] = function() {
          return this[takeName](1).value()[0];
        };
      });
      arrayEach(["initial", "tail"], function(methodName, index) {
        var dropName = "drop" + (index ? "" : "Right");
        LazyWrapper.prototype[methodName] = function() {
          return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
        };
      });
      LazyWrapper.prototype.compact = function() {
        return this.filter(identity);
      };
      LazyWrapper.prototype.find = function(predicate) {
        return this.filter(predicate).head();
      };
      LazyWrapper.prototype.findLast = function(predicate) {
        return this.reverse().find(predicate);
      };
      LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
        if (typeof path == "function") {
          return new LazyWrapper(this);
        }
        return this.map(function(value) {
          return baseInvoke(value, path, args);
        });
      });
      LazyWrapper.prototype.reject = function(predicate) {
        return this.filter(negate(getIteratee(predicate)));
      };
      LazyWrapper.prototype.slice = function(start, end) {
        start = toInteger(start);
        var result2 = this;
        if (result2.__filtered__ && (start > 0 || end < 0)) {
          return new LazyWrapper(result2);
        }
        if (start < 0) {
          result2 = result2.takeRight(-start);
        } else if (start) {
          result2 = result2.drop(start);
        }
        if (end !== undefined$1) {
          end = toInteger(end);
          result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
        }
        return result2;
      };
      LazyWrapper.prototype.takeRightWhile = function(predicate) {
        return this.reverse().takeWhile(predicate).reverse();
      };
      LazyWrapper.prototype.toArray = function() {
        return this.take(MAX_ARRAY_LENGTH);
      };
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
        if (!lodashFunc) {
          return;
        }
        lodash2.prototype[methodName] = function() {
          var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
          var interceptor = function(value2) {
            var result3 = lodashFunc.apply(lodash2, arrayPush([value2], args));
            return isTaker && chainAll ? result3[0] : result3;
          };
          if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
            isLazy = useLazy = false;
          }
          var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
          if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result2 = func.apply(value, args);
            result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$1 });
            return new LodashWrapper(result2, chainAll);
          }
          if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
          }
          result2 = this.thru(interceptor);
          return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
        };
      });
      arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
        var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
        lodash2.prototype[methodName] = function() {
          var args = arguments;
          if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray(value) ? value : [], args);
          }
          return this[chainName](function(value2) {
            return func.apply(isArray(value2) ? value2 : [], args);
          });
        };
      });
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var lodashFunc = lodash2[methodName];
        if (lodashFunc) {
          var key = lodashFunc.name + "";
          if (!hasOwnProperty.call(realNames, key)) {
            realNames[key] = [];
          }
          realNames[key].push({ "name": methodName, "func": lodashFunc });
        }
      });
      realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
        "name": "wrapper",
        "func": undefined$1
      }];
      LazyWrapper.prototype.clone = lazyClone;
      LazyWrapper.prototype.reverse = lazyReverse;
      LazyWrapper.prototype.value = lazyValue;
      lodash2.prototype.at = wrapperAt;
      lodash2.prototype.chain = wrapperChain;
      lodash2.prototype.commit = wrapperCommit;
      lodash2.prototype.next = wrapperNext;
      lodash2.prototype.plant = wrapperPlant;
      lodash2.prototype.reverse = wrapperReverse;
      lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
      lodash2.prototype.first = lodash2.prototype.head;
      if (symIterator) {
        lodash2.prototype[symIterator] = wrapperToIterator;
      }
      return lodash2;
    };
    var _2 = runInContext();
    if (freeModule) {
      (freeModule.exports = _2)._ = _2;
      freeExports._ = _2;
    } else {
      root._ = _2;
    }
  }).call(commonjsGlobal);
})(lodash, lodashExports);
const style = "";
function n$1(t) {
  var e;
  return (null == (e = t.ownerDocument) ? void 0 : e.defaultView) || window;
}
function o(t) {
  return n$1(t).getComputedStyle(t);
}
const i = Math.min, r = Math.max, l = Math.round;
function c(t) {
  const e = o(t);
  let n2 = parseFloat(e.width), i2 = parseFloat(e.height);
  const r2 = t.offsetWidth, c2 = t.offsetHeight, s2 = l(n2) !== r2 || l(i2) !== c2;
  return s2 && (n2 = r2, i2 = c2), { width: n2, height: i2, fallback: s2 };
}
function s(t) {
  return h(t) ? (t.nodeName || "").toLowerCase() : "";
}
let f$1;
function u$1() {
  if (f$1)
    return f$1;
  const t = navigator.userAgentData;
  return t && Array.isArray(t.brands) ? (f$1 = t.brands.map((t2) => t2.brand + "/" + t2.version).join(" "), f$1) : navigator.userAgent;
}
function a(t) {
  return t instanceof n$1(t).HTMLElement;
}
function d$1(t) {
  return t instanceof n$1(t).Element;
}
function h(t) {
  return t instanceof n$1(t).Node;
}
function p(t) {
  if ("undefined" == typeof ShadowRoot)
    return false;
  return t instanceof n$1(t).ShadowRoot || t instanceof ShadowRoot;
}
function g$1(t) {
  const { overflow: e, overflowX: n2, overflowY: i2, display: r2 } = o(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + i2 + n2) && !["inline", "contents"].includes(r2);
}
function m$1(t) {
  return ["table", "td", "th"].includes(s(t));
}
function y$1(t) {
  const e = /firefox/i.test(u$1()), n2 = o(t), i2 = n2.backdropFilter || n2.WebkitBackdropFilter;
  return "none" !== n2.transform || "none" !== n2.perspective || !!i2 && "none" !== i2 || e && "filter" === n2.willChange || e && !!n2.filter && "none" !== n2.filter || ["transform", "perspective"].some((t2) => n2.willChange.includes(t2)) || ["paint", "layout", "strict", "content"].some((t2) => {
    const e2 = n2.contain;
    return null != e2 && e2.includes(t2);
  });
}
function x() {
  return !/^((?!chrome|android).)*safari/i.test(u$1());
}
function w(t) {
  return ["html", "body", "#document"].includes(s(t));
}
function v$1(t) {
  return d$1(t) ? t : t.contextElement;
}
const b$1 = { x: 1, y: 1 };
function L$1(t) {
  const e = v$1(t);
  if (!a(e))
    return b$1;
  const n2 = e.getBoundingClientRect(), { width: o2, height: i2, fallback: r2 } = c(e);
  let s2 = (r2 ? l(n2.width) : n2.width) / o2, f2 = (r2 ? l(n2.height) : n2.height) / i2;
  return s2 && Number.isFinite(s2) || (s2 = 1), f2 && Number.isFinite(f2) || (f2 = 1), { x: s2, y: f2 };
}
function E$1(t, e, o2, i2) {
  var r2, l2;
  void 0 === e && (e = false), void 0 === o2 && (o2 = false);
  const c2 = t.getBoundingClientRect(), s2 = v$1(t);
  let f2 = b$1;
  e && (i2 ? d$1(i2) && (f2 = L$1(i2)) : f2 = L$1(t));
  const u2 = s2 ? n$1(s2) : window, a2 = !x() && o2;
  let h2 = (c2.left + (a2 && (null == (r2 = u2.visualViewport) ? void 0 : r2.offsetLeft) || 0)) / f2.x, p2 = (c2.top + (a2 && (null == (l2 = u2.visualViewport) ? void 0 : l2.offsetTop) || 0)) / f2.y, g2 = c2.width / f2.x, m2 = c2.height / f2.y;
  if (s2) {
    const t2 = n$1(s2), e2 = i2 && d$1(i2) ? n$1(i2) : i2;
    let o3 = t2.frameElement;
    for (; o3 && i2 && e2 !== t2; ) {
      const t3 = L$1(o3), e3 = o3.getBoundingClientRect(), i3 = getComputedStyle(o3);
      e3.x += (o3.clientLeft + parseFloat(i3.paddingLeft)) * t3.x, e3.y += (o3.clientTop + parseFloat(i3.paddingTop)) * t3.y, h2 *= t3.x, p2 *= t3.y, g2 *= t3.x, m2 *= t3.y, h2 += e3.x, p2 += e3.y, o3 = n$1(o3).frameElement;
    }
  }
  return { width: g2, height: m2, top: p2, right: h2 + g2, bottom: p2 + m2, left: h2, x: h2, y: p2 };
}
function R(t) {
  return ((h(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function T(t) {
  return d$1(t) ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop } : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
}
function C(t) {
  return E$1(R(t)).left + T(t).scrollLeft;
}
function F(t) {
  if ("html" === s(t))
    return t;
  const e = t.assignedSlot || t.parentNode || p(t) && t.host || R(t);
  return p(e) ? e.host : e;
}
function W$1(t) {
  const e = F(t);
  return w(e) ? e.ownerDocument.body : a(e) && g$1(e) ? e : W$1(e);
}
function D(t, e) {
  var o2;
  void 0 === e && (e = []);
  const i2 = W$1(t), r2 = i2 === (null == (o2 = t.ownerDocument) ? void 0 : o2.body), l2 = n$1(i2);
  return r2 ? e.concat(l2, l2.visualViewport || [], g$1(i2) ? i2 : []) : e.concat(i2, D(i2));
}
function S$1(e, i2, l2) {
  return "viewport" === i2 ? s$1(function(t, e2) {
    const o2 = n$1(t), i3 = R(t), r2 = o2.visualViewport;
    let l3 = i3.clientWidth, c2 = i3.clientHeight, s2 = 0, f2 = 0;
    if (r2) {
      l3 = r2.width, c2 = r2.height;
      const t2 = x();
      (t2 || !t2 && "fixed" === e2) && (s2 = r2.offsetLeft, f2 = r2.offsetTop);
    }
    return { width: l3, height: c2, x: s2, y: f2 };
  }(e, l2)) : d$1(i2) ? s$1(function(t, e2) {
    const n2 = E$1(t, true, "fixed" === e2), o2 = n2.top + t.clientTop, i3 = n2.left + t.clientLeft, r2 = a(t) ? L$1(t) : { x: 1, y: 1 };
    return { width: t.clientWidth * r2.x, height: t.clientHeight * r2.y, x: i3 * r2.x, y: o2 * r2.y };
  }(i2, l2)) : s$1(function(t) {
    const e2 = R(t), n2 = T(t), i3 = t.ownerDocument.body, l3 = r(e2.scrollWidth, e2.clientWidth, i3.scrollWidth, i3.clientWidth), c2 = r(e2.scrollHeight, e2.clientHeight, i3.scrollHeight, i3.clientHeight);
    let s2 = -n2.scrollLeft + C(t);
    const f2 = -n2.scrollTop;
    return "rtl" === o(i3).direction && (s2 += r(e2.clientWidth, i3.clientWidth) - l3), { width: l3, height: c2, x: s2, y: f2 };
  }(R(e)));
}
function A(t) {
  return a(t) && "fixed" !== o(t).position ? t.offsetParent : null;
}
function H(t) {
  const e = n$1(t);
  let i2 = A(t);
  for (; i2 && m$1(i2) && "static" === o(i2).position; )
    i2 = A(i2);
  return i2 && ("html" === s(i2) || "body" === s(i2) && "static" === o(i2).position && !y$1(i2)) ? e : i2 || function(t2) {
    let e2 = F(t2);
    for (; a(e2) && !w(e2); ) {
      if (y$1(e2))
        return e2;
      e2 = F(e2);
    }
    return null;
  }(t) || e;
}
function O(t, e, n2) {
  const o2 = a(e), i2 = R(e), r2 = E$1(t, true, "fixed" === n2, e);
  let l2 = { scrollLeft: 0, scrollTop: 0 };
  const c2 = { x: 0, y: 0 };
  if (o2 || !o2 && "fixed" !== n2)
    if (("body" !== s(e) || g$1(i2)) && (l2 = T(e)), a(e)) {
      const t2 = E$1(e, true);
      c2.x = t2.x + e.clientLeft, c2.y = t2.y + e.clientTop;
    } else
      i2 && (c2.x = C(i2));
  return { x: r2.left + l2.scrollLeft - c2.x, y: r2.top + l2.scrollTop - c2.y, width: r2.width, height: r2.height };
}
const P = { getClippingRect: function(t) {
  let { element: e, boundary: n2, rootBoundary: l2, strategy: c2 } = t;
  const f2 = "clippingAncestors" === n2 ? function(t2, e2) {
    const n3 = e2.get(t2);
    if (n3)
      return n3;
    let i2 = D(t2).filter((t3) => d$1(t3) && "body" !== s(t3)), r2 = null;
    const l3 = "fixed" === o(t2).position;
    let c3 = l3 ? F(t2) : t2;
    for (; d$1(c3) && !w(c3); ) {
      const t3 = o(c3), e3 = y$1(c3);
      (l3 ? e3 || r2 : e3 || "static" !== t3.position || !r2 || !["absolute", "fixed"].includes(r2.position)) ? r2 = t3 : i2 = i2.filter((t4) => t4 !== c3), c3 = F(c3);
    }
    return e2.set(t2, i2), i2;
  }(e, this._c) : [].concat(n2), u2 = [...f2, l2], a2 = u2[0], h2 = u2.reduce((t2, n3) => {
    const o2 = S$1(e, n3, c2);
    return t2.top = r(o2.top, t2.top), t2.right = i(o2.right, t2.right), t2.bottom = i(o2.bottom, t2.bottom), t2.left = r(o2.left, t2.left), t2;
  }, S$1(e, a2, c2));
  return { width: h2.right - h2.left, height: h2.bottom - h2.top, x: h2.left, y: h2.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t) {
  let { rect: e, offsetParent: n2, strategy: o2 } = t;
  const i2 = a(n2), r2 = R(n2);
  if (n2 === r2)
    return e;
  let l2 = { scrollLeft: 0, scrollTop: 0 }, c2 = { x: 1, y: 1 };
  const f2 = { x: 0, y: 0 };
  if ((i2 || !i2 && "fixed" !== o2) && (("body" !== s(n2) || g$1(r2)) && (l2 = T(n2)), a(n2))) {
    const t2 = E$1(n2);
    c2 = L$1(n2), f2.x = t2.x + n2.clientLeft, f2.y = t2.y + n2.clientTop;
  }
  return { width: e.width * c2.x, height: e.height * c2.y, x: e.x * c2.x - l2.scrollLeft * c2.x + f2.x, y: e.y * c2.y - l2.scrollTop * c2.y + f2.y };
}, isElement: d$1, getDimensions: function(t) {
  return a(t) ? c(t) : t.getBoundingClientRect();
}, getOffsetParent: H, getDocumentElement: R, getScale: L$1, async getElementRects(t) {
  let { reference: e, floating: n2, strategy: o2 } = t;
  const i2 = this.getOffsetParent || H, r2 = this.getDimensions;
  return { reference: O(e, await i2(n2), o2), floating: { x: 0, y: 0, ...await r2(n2) } };
}, getClientRects: (t) => Array.from(t.getClientRects()), isRTL: (t) => "rtl" === o(t).direction };
const B = (t, n2, o2) => {
  const i2 = /* @__PURE__ */ new Map(), r2 = { platform: P, ...o2 }, l2 = { ...r2.platform, _c: i2 };
  return r$1(t, n2, { ...r2, platform: l2 });
};
const u = {
  // Disable popper components
  disabled: false,
  // Default position offset along main axis (px)
  distance: 5,
  // Default position offset along cross axis (px)
  skidding: 0,
  // Default container where the tooltip will be appended
  container: "body",
  // Element used to compute position and size boundaries
  boundary: void 0,
  // Skip delay & CSS transitions when another popper is shown, so that the popper appear to instanly move to the new position.
  instantMove: false,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 5e3,
  // Triggers on the popper itself
  popperTriggers: [],
  // Positioning strategy
  strategy: "absolute",
  // Prevent overflow
  preventOverflow: true,
  // Flip to the opposite placement if needed
  flip: true,
  // Shift on the cross axis to prevent the popper from overflowing
  shift: true,
  // Overflow padding (px)
  overflowPadding: 0,
  // Arrow padding (px)
  arrowPadding: 0,
  // Compute arrow overflow (useful to hide it)
  arrowOverflow: true,
  // Themes
  themes: {
    tooltip: {
      // Default tooltip placement relative to target element
      placement: "top",
      // Default events that trigger the tooltip
      triggers: ["hover", "focus", "touch"],
      // Close tooltip on click on tooltip target
      hideTriggers: (e) => [...e, "click"],
      // Delay (ms)
      delay: {
        show: 200,
        hide: 0
      },
      // Update popper on content resize
      handleResize: false,
      // Enable HTML content in directive
      html: false,
      // Displayed when tooltip content is loading
      loadingContent: "..."
    },
    dropdown: {
      // Default dropdown placement relative to target element
      placement: "bottom",
      // Default events that trigger the dropdown
      triggers: ["click"],
      // Delay (ms)
      delay: 0,
      // Update popper on content resize
      handleResize: true,
      // Hide on clock outside
      autoHide: true
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover", "focus"],
      delay: {
        show: 0,
        hide: 400
      }
    }
  }
};
function b(e, t) {
  let o2 = u.themes[e] || {}, i2;
  do
    i2 = o2[t], typeof i2 > "u" ? o2.$extend ? o2 = u.themes[o2.$extend] || {} : (o2 = null, i2 = u[t]) : o2 = null;
  while (o2);
  return i2;
}
function Je(e) {
  const t = [e];
  let o2 = u.themes[e] || {};
  do
    o2.$extend && !o2.$resetCss ? (t.push(o2.$extend), o2 = u.themes[o2.$extend] || {}) : o2 = null;
  while (o2);
  return t.map((i2) => `v-popper--theme-${i2}`);
}
function oe(e) {
  const t = [e];
  let o2 = u.themes[e] || {};
  do
    o2.$extend ? (t.push(o2.$extend), o2 = u.themes[o2.$extend] || {}) : o2 = null;
  while (o2);
  return t;
}
let _ = false;
if (typeof window < "u") {
  _ = false;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        _ = true;
      }
    });
    window.addEventListener("test", null, e);
  } catch {
  }
}
let me = false;
typeof window < "u" && typeof navigator < "u" && (me = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const ge = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), ie = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, se = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function ne(e, t) {
  const o2 = e.indexOf(t);
  o2 !== -1 && e.splice(o2, 1);
}
function W() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const d = [];
let g = null;
const re = {};
function pe(e) {
  let t = re[e];
  return t || (t = re[e] = []), t;
}
let X = function() {
};
typeof window < "u" && (X = window.Element);
function n(e) {
  return function(t) {
    return b(t.theme, e);
  };
}
const G = "__floating-vue__popper", K = () => defineComponent({
  name: "VPopper",
  provide() {
    return {
      [G]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [G]: { default: null }
  },
  props: {
    theme: {
      type: String,
      required: true
    },
    targetNodes: {
      type: Function,
      required: true
    },
    referenceNode: {
      type: Function,
      default: null
    },
    popperNode: {
      type: Function,
      required: true
    },
    shown: {
      type: Boolean,
      default: false
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: n("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: n("positioningDisabled")
    },
    placement: {
      type: String,
      default: n("placement"),
      validator: (e) => ge.includes(e)
    },
    delay: {
      type: [String, Number, Object],
      default: n("delay")
    },
    distance: {
      type: [Number, String],
      default: n("distance")
    },
    skidding: {
      type: [Number, String],
      default: n("skidding")
    },
    triggers: {
      type: Array,
      default: n("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: n("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: n("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: n("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: n("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: n("popperHideTriggers")
    },
    container: {
      type: [String, Object, X, Boolean],
      default: n("container")
    },
    boundary: {
      type: [String, X],
      default: n("boundary")
    },
    strategy: {
      type: String,
      validator: (e) => ["absolute", "fixed"].includes(e),
      default: n("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: n("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: n("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: n("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: n("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: n("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: n("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: n("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: n("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: n("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: n("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: n("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: n("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: n("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: n("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: n("flip")
    },
    shift: {
      type: Boolean,
      default: n("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: n("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: n("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: n("disposeTimeout")
    }
  },
  emits: [
    "show",
    "hide",
    "update:shown",
    "apply-show",
    "apply-hide",
    "close-group",
    "close-directive",
    "auto-hide",
    "resize",
    "dispose"
  ],
  data() {
    return {
      isShown: false,
      isMounted: false,
      skipTransition: false,
      classes: {
        showFrom: false,
        showTo: false,
        hideFrom: false,
        hideTo: true
      },
      result: {
        x: 0,
        y: 0,
        placement: "",
        strategy: this.strategy,
        arrow: {
          x: 0,
          y: 0,
          centerOffset: 0
        },
        transformOrigin: null
      },
      shownChildren: /* @__PURE__ */ new Set(),
      lastAutoHide: true
    };
  },
  computed: {
    popperId() {
      return this.ariaId != null ? this.ariaId : this.randomId;
    },
    shouldMountContent() {
      return this.eagerMount || this.isMounted;
    },
    slotData() {
      return {
        popperId: this.popperId,
        isShown: this.isShown,
        shouldMountContent: this.shouldMountContent,
        skipTransition: this.skipTransition,
        autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide,
        show: this.show,
        hide: this.hide,
        handleResize: this.handleResize,
        onResize: this.onResize,
        classes: {
          ...this.classes,
          popperClass: this.popperClass
        },
        result: this.positioningDisabled ? null : this.result,
        attrs: this.$attrs
      };
    },
    parentPopper() {
      var e;
      return (e = this[G]) == null ? void 0 : e.parentPopper;
    },
    hasPopperShowTriggerHover() {
      var e, t;
      return ((e = this.popperTriggers) == null ? void 0 : e.includes("hover")) || ((t = this.popperShowTriggers) == null ? void 0 : t.includes("hover"));
    }
  },
  watch: {
    shown: "$_autoShowHide",
    disabled(e) {
      e ? this.dispose() : this.init();
    },
    async container() {
      this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
    },
    ...[
      "triggers",
      "positioningDisabled"
    ].reduce((e, t) => (e[t] = "$_refreshListeners", e), {}),
    ...[
      "placement",
      "distance",
      "skidding",
      "boundary",
      "strategy",
      "overflowPadding",
      "arrowPadding",
      "preventOverflow",
      "shift",
      "shiftCrossAxis",
      "flip"
    ].reduce((e, t) => (e[t] = "$_computePosition", e), {})
  },
  created() {
    this.$_isDisposed = true, this.randomId = `popper_${[Math.random(), Date.now()].map((e) => e.toString(36).substring(2, 10)).join("_")}`, this.autoMinSize && console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
  },
  mounted() {
    this.init(), this.$_detachPopperNode();
  },
  activated() {
    this.$_autoShowHide();
  },
  deactivated() {
    this.hide();
  },
  beforeUnmount() {
    this.dispose();
  },
  methods: {
    show({ event: e = null, skipDelay: t = false, force: o2 = false } = {}) {
      var i2, s2;
      (i2 = this.parentPopper) != null && i2.lockedChild && this.parentPopper.lockedChild !== this || (this.$_pendingHide = false, (o2 || !this.disabled) && (((s2 = this.parentPopper) == null ? void 0 : s2.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = true, requestAnimationFrame(() => {
        this.$_showFrameLocked = false;
      })), this.$emit("update:shown", true));
    },
    hide({ event: e = null, skipDelay: t = false } = {}) {
      var o2;
      if (!this.$_hideInProgress) {
        if (this.shownChildren.size > 0) {
          this.$_pendingHide = true;
          return;
        }
        if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
          this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
            this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t }), this.parentPopper.lockedChild = null);
          }, 1e3));
          return;
        }
        ((o2 = this.parentPopper) == null ? void 0 : o2.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_pendingHide = false, this.$_scheduleHide(e, t), this.$emit("hide"), this.$emit("update:shown", false);
      }
    },
    init() {
      var e;
      this.$_isDisposed && (this.$_isDisposed = false, this.isMounted = false, this.$_events = [], this.$_preventShow = false, this.$_referenceNode = ((e = this.referenceNode) == null ? void 0 : e.call(this)) ?? this.$el, this.$_targetNodes = this.targetNodes().filter((t) => t.nodeType === t.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
    },
    dispose() {
      this.$_isDisposed || (this.$_isDisposed = true, this.$_removeEventListeners(), this.hide({ skipDelay: true }), this.$_detachPopperNode(), this.isMounted = false, this.isShown = false, this.$_updateParentShownChildren(false), this.$_swapTargetAttrs("data-original-title", "title"), this.$emit("dispose"));
    },
    async onResize() {
      this.isShown && (await this.$_computePosition(), this.$emit("resize"));
    },
    async $_computePosition() {
      if (this.$_isDisposed || this.positioningDisabled)
        return;
      const e = {
        strategy: this.strategy,
        middleware: []
      };
      (this.distance || this.skidding) && e.middleware.push(L$2({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(b$2({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(O$1({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(A$1({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(g$2({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      })), this.arrowOverflow && e.middleware.push({
        name: "arrowOverflow",
        fn: ({ placement: i2, rects: s2, middlewareData: r2 }) => {
          let p2;
          const { centerOffset: a2 } = r2.arrow;
          return i2.startsWith("top") || i2.startsWith("bottom") ? p2 = Math.abs(a2) > s2.reference.width / 2 : p2 = Math.abs(a2) > s2.reference.height / 2, {
            data: {
              overflow: p2
            }
          };
        }
      }), this.autoMinSize || this.autoSize) {
        const i2 = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        e.middleware.push({
          name: "autoSize",
          fn: ({ rects: s2, placement: r2, middlewareData: p2 }) => {
            var h2;
            if ((h2 = p2.autoSize) != null && h2.skip)
              return {};
            let a2, l2;
            return r2.startsWith("top") || r2.startsWith("bottom") ? a2 = s2.reference.width : l2 = s2.reference.height, this.$_innerNode.style[i2 === "min" ? "minWidth" : i2 === "max" ? "maxWidth" : "width"] = a2 != null ? `${a2}px` : null, this.$_innerNode.style[i2 === "min" ? "minHeight" : i2 === "max" ? "maxHeight" : "height"] = l2 != null ? `${l2}px` : null, {
              data: {
                skip: true
              },
              reset: {
                rects: true
              }
            };
          }
        });
      }
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(C$1({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: i2, availableHeight: s2 }) => {
          this.$_innerNode.style.maxWidth = i2 != null ? `${i2}px` : null, this.$_innerNode.style.maxHeight = s2 != null ? `${s2}px` : null;
        }
      })));
      const o2 = await B(this.$_referenceNode, this.$_popperNode, e);
      Object.assign(this.result, {
        x: o2.x,
        y: o2.y,
        placement: o2.placement,
        strategy: o2.strategy,
        arrow: {
          ...o2.middlewareData.arrow,
          ...o2.middlewareData.arrowOverflow
        }
      });
    },
    $_scheduleShow(e = null, t = false) {
      if (this.$_updateParentShownChildren(true), this.$_hideInProgress = false, clearTimeout(this.$_scheduleTimer), g && this.instantMove && g.instantMove && g !== this.parentPopper) {
        g.$_applyHide(true), this.$_applyShow(true);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e = null, t = false) {
      if (this.shownChildren.size > 0) {
        this.$_pendingHide = true;
        return;
      }
      this.$_updateParentShownChildren(false), this.$_hideInProgress = true, clearTimeout(this.$_scheduleTimer), this.isShown && (g = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = false) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await W(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...D(this.$_referenceNode),
        ...D(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t = this.$_referenceNode.getBoundingClientRect(), o2 = this.$_popperNode.querySelector(".v-popper__wrapper"), i2 = o2.parentNode.getBoundingClientRect(), s2 = t.x + t.width / 2 - (i2.left + o2.offsetLeft), r2 = t.y + t.height / 2 - (i2.top + o2.offsetTop);
        this.result.transformOrigin = `${s2}px ${r2}px`;
      }
      this.isShown = true, this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const e = this.showGroup;
      if (e) {
        let t;
        for (let o2 = 0; o2 < d.length; o2++)
          t = d[o2], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
      }
      d.push(this), document.body.classList.add("v-popper--some-open");
      for (const t of oe(this.theme))
        pe(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = true, this.classes.showTo = false, this.classes.hideFrom = false, this.classes.hideTo = false, await W(), this.classes.showFrom = false, this.classes.showTo = true, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = false) {
      if (this.shownChildren.size > 0) {
        this.$_pendingHide = true, this.$_hideInProgress = false;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, ne(d, this), d.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const o2 of oe(this.theme)) {
        const i2 = pe(o2);
        ne(i2, this), i2.length === 0 && document.body.classList.remove(`v-popper--some-open--${o2}`);
      }
      g === this && (g = null), this.isShown = false, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = false);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = false, this.classes.showTo = false, this.classes.hideFrom = true, this.classes.hideTo = false, await W(), this.classes.hideFrom = false, this.classes.hideTo = true;
    },
    $_autoShowHide() {
      this.shown ? this.show() : this.hide();
    },
    $_ensureTeleport() {
      if (this.$_isDisposed)
        return;
      let e = this.container;
      if (typeof e == "string" ? e = window.document.querySelector(e) : e === false && (e = this.$_targetNodes[0].parentNode), !e)
        throw new Error("No container for popover: " + this.container);
      e.appendChild(this.$_popperNode), this.isMounted = true;
    },
    $_addEventListeners() {
      const e = (o2) => {
        this.isShown && !this.$_hideInProgress || (o2.usedByTooltip = true, !this.$_preventShow && this.show({ event: o2 }));
      };
      this.$_registerTriggerListeners(this.$_targetNodes, ie, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], ie, this.popperTriggers, this.popperShowTriggers, e);
      const t = (o2) => {
        o2.usedByTooltip || this.hide({ event: o2 });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, se, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], se, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, o2) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: o2 }), e.forEach((i2) => i2.addEventListener(t, o2, _ ? {
        passive: true
      } : void 0));
    },
    $_registerTriggerListeners(e, t, o2, i2, s2) {
      let r2 = o2;
      i2 != null && (r2 = typeof i2 == "function" ? i2(r2) : i2), r2.forEach((p2) => {
        const a2 = t[p2];
        a2 && this.$_registerEventListeners(e, a2, s2);
      });
    },
    $_removeEventListeners(e) {
      const t = [];
      this.$_events.forEach((o2) => {
        const { targetNodes: i2, eventType: s2, handler: r2 } = o2;
        !e || e === s2 ? i2.forEach((p2) => p2.removeEventListener(s2, r2)) : t.push(o2);
      }), this.$_events = t;
    },
    $_refreshListeners() {
      this.$_isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
    },
    $_handleGlobalClose(e, t = false) {
      this.$_showFrameLocked || (this.hide({ event: e }), e.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t && (this.$_preventShow = true, setTimeout(() => {
        this.$_preventShow = false;
      }, 300)));
    },
    $_detachPopperNode() {
      this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
    },
    $_swapTargetAttrs(e, t) {
      for (const o2 of this.$_targetNodes) {
        const i2 = o2.getAttribute(e);
        i2 && (o2.removeAttribute(e), o2.setAttribute(t, i2));
      }
    },
    $_applyAttrsToTarget(e) {
      for (const t of this.$_targetNodes)
        for (const o2 in e) {
          const i2 = e[o2];
          i2 == null ? t.removeAttribute(o2) : t.setAttribute(o2, i2);
        }
    },
    $_updateParentShownChildren(e) {
      let t = this.parentPopper;
      for (; t; )
        e ? t.shownChildren.add(this.randomId) : (t.shownChildren.delete(this.randomId), t.$_pendingHide && t.hide()), t = t.parentPopper;
    },
    $_isAimingPopper() {
      const e = this.$_referenceNode.getBoundingClientRect();
      if (v >= e.left && v <= e.right && y >= e.top && y <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), o2 = v - f, i2 = y - m, r2 = t.left + t.width / 2 - f + (t.top + t.height / 2) - m + t.width + t.height, p2 = f + o2 * r2, a2 = m + i2 * r2;
        return S(f, m, p2, a2, t.left, t.top, t.left, t.bottom) || // Left edge
        S(f, m, p2, a2, t.left, t.top, t.right, t.top) || // Top edge
        S(f, m, p2, a2, t.right, t.top, t.right, t.bottom) || // Right edge
        S(f, m, p2, a2, t.left, t.bottom, t.right, t.bottom);
      }
      return false;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
typeof document < "u" && typeof window < "u" && (me ? (document.addEventListener("touchstart", ae, _ ? {
  passive: true,
  capture: true
} : true), document.addEventListener("touchend", Ze, _ ? {
  passive: true,
  capture: true
} : true)) : (window.addEventListener("mousedown", ae, true), window.addEventListener("click", Qe, true)), window.addEventListener("resize", ot));
function ae(e) {
  for (let t = 0; t < d.length; t++) {
    const o2 = d[t];
    try {
      const i2 = o2.popperNode();
      o2.$_mouseDownContains = i2.contains(e.target);
    } catch {
    }
  }
}
function Qe(e) {
  $e(e);
}
function Ze(e) {
  $e(e, true);
}
function $e(e, t = false) {
  const o2 = {};
  for (let i2 = d.length - 1; i2 >= 0; i2--) {
    const s2 = d[i2];
    try {
      const r2 = s2.$_containsGlobalTarget = et(s2, e);
      s2.$_pendingHide = false, requestAnimationFrame(() => {
        if (s2.$_pendingHide = false, !o2[s2.randomId] && de(s2, r2, e)) {
          if (s2.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && r2) {
            let a2 = s2.parentPopper;
            for (; a2; )
              o2[a2.randomId] = true, a2 = a2.parentPopper;
            return;
          }
          let p2 = s2.parentPopper;
          for (; p2 && de(p2, p2.$_containsGlobalTarget, e); ) {
            p2.$_handleGlobalClose(e, t);
            p2 = p2.parentPopper;
          }
        }
      });
    } catch {
    }
  }
}
function et(e, t) {
  const o2 = e.popperNode();
  return e.$_mouseDownContains || o2.contains(t.target);
}
function de(e, t, o2) {
  return o2.closeAllPopover || o2.closePopover && t || tt(e, o2) && !t;
}
function tt(e, t) {
  if (typeof e.autoHide == "function") {
    const o2 = e.autoHide(t);
    return e.lastAutoHide = o2, o2;
  }
  return e.autoHide;
}
function ot(e) {
  for (let t = 0; t < d.length; t++)
    d[t].$_computePosition(e);
}
let f = 0, m = 0, v = 0, y = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  f = v, m = y, v = e.clientX, y = e.clientY;
}, _ ? {
  passive: true
} : void 0);
function S(e, t, o2, i2, s2, r2, p2, a2) {
  const l2 = ((p2 - s2) * (t - r2) - (a2 - r2) * (e - s2)) / ((a2 - r2) * (o2 - e) - (p2 - s2) * (i2 - t)), h2 = ((o2 - e) * (t - r2) - (i2 - t) * (e - s2)) / ((a2 - r2) * (o2 - e) - (p2 - s2) * (i2 - t));
  return l2 >= 0 && l2 <= 1 && h2 >= 0 && h2 <= 1;
}
const it = {
  extends: K()
}, k = (e, t) => {
  const o2 = e.__vccOpts || e;
  for (const [i2, s2] of t)
    o2[i2] = s2;
  return o2;
};
function st(e, t, o2, i2, s2, r2) {
  return openBlock(), createElementBlock("div", {
    ref: "reference",
    class: normalizeClass(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    renderSlot(e.$slots, "default", normalizeProps(guardReactiveProps(e.slotData)))
  ], 2);
}
const nt = /* @__PURE__ */ k(it, [["render", st]]);
function rt() {
  var e = window.navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var o2 = e.indexOf("Trident/");
  if (o2 > 0) {
    var i2 = e.indexOf("rv:");
    return parseInt(e.substring(i2 + 3, e.indexOf(".", i2)), 10);
  }
  var s2 = e.indexOf("Edge/");
  return s2 > 0 ? parseInt(e.substring(s2 + 5, e.indexOf(".", s2)), 10) : -1;
}
let z;
function U() {
  U.init || (U.init = true, z = rt() !== -1);
}
var E = {
  name: "ResizeObserver",
  props: {
    emitOnMount: {
      type: Boolean,
      default: false
    },
    ignoreWidth: {
      type: Boolean,
      default: false
    },
    ignoreHeight: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "notify"
  ],
  mounted() {
    U(), nextTick(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", z && this.$el.appendChild(e), e.data = "about:blank", z || this.$el.appendChild(e);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize());
    },
    emitSize() {
      this.$emit("notify", {
        width: this._w,
        height: this._h
      });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject && this._resizeObject.onload && (!z && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const pt = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-b329ee4c");
const at = {
  class: "resize-observer",
  tabindex: "-1"
};
popScopeId();
const dt = /* @__PURE__ */ pt((e, t, o2, i2, s2, r2) => (openBlock(), createBlock("div", at)));
E.render = dt;
E.__scopeId = "data-v-b329ee4c";
E.__file = "src/components/ResizeObserver.vue";
const J = (e = "theme") => ({
  computed: {
    themeClass() {
      return Je(this[e]);
    }
  }
}), ht = defineComponent({
  name: "VPopperContent",
  components: {
    ResizeObserver: E
  },
  mixins: [
    J()
  ],
  props: {
    popperId: String,
    theme: String,
    shown: Boolean,
    mounted: Boolean,
    skipTransition: Boolean,
    autoHide: Boolean,
    handleResize: Boolean,
    classes: Object,
    result: Object
  },
  emits: [
    "hide",
    "resize"
  ],
  methods: {
    toPx(e) {
      return e != null && !isNaN(e) ? `${e}px` : null;
    }
  }
});
const lt = ["id", "aria-hidden", "tabindex", "data-popper-placement"], ut = {
  ref: "inner",
  class: "v-popper__inner"
}, ct = /* @__PURE__ */ createBaseVNode("div", { class: "v-popper__arrow-outer" }, null, -1), ft = /* @__PURE__ */ createBaseVNode("div", { class: "v-popper__arrow-inner" }, null, -1), mt = [
  ct,
  ft
];
function gt(e, t, o2, i2, s2, r2) {
  const p2 = resolveComponent("ResizeObserver");
  return openBlock(), createElementBlock("div", {
    id: e.popperId,
    ref: "popover",
    class: normalizeClass(["v-popper__popper", [
      e.themeClass,
      e.classes.popperClass,
      {
        "v-popper__popper--shown": e.shown,
        "v-popper__popper--hidden": !e.shown,
        "v-popper__popper--show-from": e.classes.showFrom,
        "v-popper__popper--show-to": e.classes.showTo,
        "v-popper__popper--hide-from": e.classes.hideFrom,
        "v-popper__popper--hide-to": e.classes.hideTo,
        "v-popper__popper--skip-transition": e.skipTransition,
        "v-popper__popper--arrow-overflow": e.result && e.result.arrow.overflow,
        "v-popper__popper--no-positioning": !e.result
      }
    ]]),
    style: normalizeStyle(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = withKeys((a2) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    createBaseVNode("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (a2) => e.autoHide && e.$emit("hide"))
    }),
    createBaseVNode("div", {
      class: "v-popper__wrapper",
      style: normalizeStyle(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      createBaseVNode("div", ut, [
        e.mounted ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createBaseVNode("div", null, [
            renderSlot(e.$slots, "default")
          ]),
          e.handleResize ? (openBlock(), createBlock(p2, {
            key: 0,
            onNotify: t[1] || (t[1] = (a2) => e.$emit("resize", a2))
          })) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ], 512),
      createBaseVNode("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: normalizeStyle(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, mt, 4)
    ], 4)
  ], 46, lt);
}
const Q = /* @__PURE__ */ k(ht, [["render", gt]]), Z = {
  methods: {
    show(...e) {
      return this.$refs.popper.show(...e);
    },
    hide(...e) {
      return this.$refs.popper.hide(...e);
    },
    dispose(...e) {
      return this.$refs.popper.dispose(...e);
    },
    onResize(...e) {
      return this.$refs.popper.onResize(...e);
    }
  }
}, $t = defineComponent({
  name: "VPopperWrapper",
  components: {
    Popper: nt,
    PopperContent: Q
  },
  mixins: [
    Z,
    J("finalTheme")
  ],
  props: {
    theme: {
      type: String,
      default: null
    }
  },
  computed: {
    finalTheme() {
      return this.theme ?? this.$options.vPopperTheme;
    }
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter((e) => e !== this.$refs.popperContent.$el);
    }
  }
});
function _t(e, t, o2, i2, s2, r2) {
  const p2 = resolveComponent("PopperContent"), a2 = resolveComponent("Popper");
  return openBlock(), createBlock(a2, {
    ref: "popper",
    theme: e.finalTheme,
    "target-nodes": e.getTargetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    class: normalizeClass([
      e.themeClass
    ])
  }, {
    default: withCtx(({
      popperId: l2,
      isShown: h2,
      shouldMountContent: B2,
      skipTransition: D2,
      autoHide: I,
      show: R2,
      hide: w2,
      handleResize: F2,
      onResize: V,
      classes: j,
      result: Oe
    }) => [
      renderSlot(e.$slots, "default", {
        shown: h2,
        show: R2,
        hide: w2
      }),
      createVNode(p2, {
        ref: "popperContent",
        "popper-id": l2,
        theme: e.finalTheme,
        shown: h2,
        mounted: B2,
        "skip-transition": D2,
        "auto-hide": I,
        "handle-resize": F2,
        classes: j,
        result: Oe,
        onHide: w2,
        onResize: V
      }, {
        default: withCtx(() => [
          renderSlot(e.$slots, "popper", {
            shown: h2,
            hide: w2
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 8, ["theme", "target-nodes", "popper-node", "class"]);
}
const L = /* @__PURE__ */ k($t, [["render", _t]]);
({
  ...L,
  name: "VDropdown",
  vPopperTheme: "dropdown"
});
({
  ...L,
  name: "VMenu",
  vPopperTheme: "menu"
});
const ve = {
  ...L,
  name: "VTooltip",
  vPopperTheme: "tooltip"
};
defineComponent({
  name: "VTooltipDirective",
  components: {
    Popper: K(),
    PopperContent: Q
  },
  mixins: [
    Z
  ],
  inheritAttrs: false,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => b(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => b(e.theme, "loadingContent")
    },
    targetNodes: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      asyncContent: null
    };
  },
  computed: {
    isContentAsync() {
      return typeof this.content == "function";
    },
    loading() {
      return this.isContentAsync && this.asyncContent == null;
    },
    finalContent() {
      return this.isContentAsync ? this.loading ? this.loadingContent : this.asyncContent : this.content;
    }
  },
  watch: {
    content: {
      handler() {
        this.fetchContent(true);
      },
      immediate: true
    },
    async finalContent() {
      await this.$nextTick(), this.$refs.popper.onResize();
    }
  },
  created() {
    this.$_fetchId = 0;
  },
  methods: {
    fetchContent(e) {
      if (typeof this.content == "function" && this.$_isShown && (e || !this.$_loading && this.asyncContent == null)) {
        this.asyncContent = null, this.$_loading = true;
        const t = ++this.$_fetchId, o2 = this.content(this);
        o2.then ? o2.then((i2) => this.onResult(t, i2)) : this.onResult(t, o2);
      }
    },
    onResult(e, t) {
      e === this.$_fetchId && (this.$_loading = false, this.asyncContent = t);
    },
    onShow() {
      this.$_isShown = true, this.fetchContent();
    },
    onHide() {
      this.$_isShown = false;
    }
  }
});
const Vt = ve;
const _hoisted_1$3 = ["onClick", "src"];
const _hoisted_2$3 = {
  key: 1,
  class: "yd-translate-loader"
};
const _hoisted_3$3 = ["onClick", "src"];
const _hoisted_4$3 = ["onClick", "src"];
const initSize = 26;
const minSize = 24;
const doubleCheckTimeout = 500;
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "inputTranslatorIcon.ce",
  setup(__props) {
    useCssVars((_ctx) => ({
      "131b0bc3": size.value.iconWidth,
      "367772ca": size.value.iconHeight,
      "8b7ed71a": position.top,
      "2c4e45ba": position.right,
      "b2ad46e2": size.value.containerWidth,
      "14b33b7e": size.value.containerHeight,
      "e55f886a": size.value.halfContainerHeight,
      "301156d1": size.value.containerExpendWidth
    }));
    function nearestEven(n2) {
      if (n2 % 2 === 0) {
        return n2;
      } else if (n2 % 2 > 0) {
        return n2 + 1;
      } else {
        return n2 - 1;
      }
    }
    const visible = ref(false);
    const container = ref(null);
    const loading = ref(false);
    const unlock = ref(false);
    const all = ref(null);
    const close = async () => {
      unlock.value = false;
      const host = getRootDomain(window.location.href);
      const config = await getUserConfig();
      if (config.inputStrategy === void 0)
        config.inputStrategy = {};
      config.inputStrategy[host] = 0;
      await updateUserConfig(config);
    };
    const closeAll = async () => {
      unlock.value = false;
      const config = await getUserConfig();
      config.inlineTranslate = false;
      await updateUserConfig(config);
    };
    const containerSize = reactive({
      width: initSize,
      height: initSize
    });
    const size = computed(() => {
      return {
        iconWidth: `${containerSize.width - 4}px`,
        iconHeight: `${containerSize.height - 4}px`,
        containerWidth: `${containerSize.width}px`,
        containerHeight: `${containerSize.height}px`,
        containerExpendWidth: `${containerSize.width * 3}px`,
        halfContainerHeight: `${containerSize.height / 2}px`
      };
    });
    const position = reactive({
      top: "0px",
      right: "0px"
    });
    let currentElement = null;
    const rePosition = (element) => {
      const rect = element.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(element);
      const paddingRightString = computedStyle.getPropertyValue("padding-right");
      const borderRightWidthString = computedStyle.getPropertyValue("border-right-width");
      const paddingRight = Math.ceil(parseFloat(paddingRightString));
      const borderRightWidth = Math.ceil(parseFloat(borderRightWidthString));
      const padding = paddingRight + borderRightWidth;
      containerSize.width = initSize;
      containerSize.height = initSize;
      if (rect.height >= initSize * 3) {
        const top = rect.top + rect.height - initSize - padding;
        const right = window.document.body.clientWidth - rect.right + padding;
        return {
          top,
          right
        };
      } else if (rect.height >= initSize * 1.3) {
        const top = rect.top + (rect.height / 2 + initSize / 2) - initSize;
        const right = window.document.body.clientWidth - rect.right + padding;
        return {
          top,
          right
        };
      } else {
        containerSize.width = Math.max(nearestEven(rect.height * 0.8), minSize);
        containerSize.height = Math.max(nearestEven(rect.height * 0.8), minSize);
        const top = rect.top + rect.height / 2 - containerSize.height / 2;
        const right = window.document.body.clientWidth - rect.right + padding;
        return {
          top,
          right
        };
      }
    };
    const handleRepositonChange = async () => {
      await checkUnlockSetting();
      if (!currentElement || !document.body.contains(currentElement)) {
        visible.value = false;
        return;
      }
      visible.value = true;
      const { top, right } = rePosition(currentElement);
      position.top = `${top}px`;
      position.right = `${right}px`;
    };
    const isEditable = (element) => {
      function isElementEditable(element2) {
        if (!(element2 instanceof HTMLElement)) {
          return true;
        }
        const isNotReadonly = !element2.readOnly;
        const isNotDisabled = !element2.disabled;
        return isNotDisabled && isNotReadonly;
      }
      const goodInputType = element.type === "text" || element.type === "search" || element.type === "";
      const goodInput = isElementEditable(element) && element.nodeName == "INPUT" && goodInputType;
      const goodTextarea = isElementEditable(element) && element.nodeName == "TEXTAREA";
      return element.isContentEditable || goodTextarea || goodInput;
    };
    const isNormalCase = (nodeName) => {
      return nodeName === "TEXTAREA" || nodeName === "INPUT";
    };
    let observer;
    let resizeObserver;
    const noInclude = (e) => {
      return currentElement && !currentElement.contains(e) && e.nodeName !== "YD-MG-ICON";
    };
    const findTarget = (e) => {
      const element = e.target;
      if (noInclude(element)) {
        currentElement = null;
        visible.value = false;
      }
      if (isEditable(element) || isEditable(document.activeElement)) {
        visible.value = true;
        currentElement = isEditable(document.activeElement) ? document.activeElement : isNormalCase(element.nodeName) ? element : findLargestEditableAncestor(element) || element;
        if (observer) {
          observer.disconnect();
        }
        const b2 = lodashExports.throttle(handleRepositonChange, 100);
        observer = new MutationObserver((mutations) => {
          b2();
        });
        const config = {
          attributes: true,
          // Observe changes to attributes
          childList: true,
          // Observe changes to child nodes
          characterData: true,
          // Observe changes to text content
          subtree: true
          // Include child elements in the observation
        };
        observer.observe(currentElement, config);
        currentElement == null ? void 0 : currentElement.addEventListener("blur", (e2) => {
          const element2 = e2.target;
          if (noInclude(element2)) {
            currentElement = null;
            visible.value = false;
            return;
          }
        });
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        resizeObserver = new ResizeObserver((entries) => {
          handleRepositonChange();
        });
        resizeObserver.observe(currentElement);
        handleRepositonChange();
        setTimeout(() => {
          handleRepositonChange();
        }, doubleCheckTimeout);
      }
    };
    const listenPositionChange = () => {
      window.addEventListener("resize", handleRepositonChange.bind(this), true);
      window.addEventListener("scroll", handleRepositonChange.bind(this), true);
    };
    const getContent = () => {
      return currentElement && (currentElement.innerText || currentElement.value || currentElement.text);
    };
    const setContent = (text) => {
      if (isNormalCase(currentElement.nodeName)) {
        currentElement.value = text;
        currentElement.dispatchEvent(new Event("input", {
          bubbles: true
        }));
      } else {
        const methods = [
          () => {
            const clipboardData = new DataTransfer();
            clipboardData.setData("text/plain", text);
            currentElement.dispatchEvent(new ClipboardEvent("paste", {
              clipboardData,
              bubbles: true,
              cancelable: true
            }));
            clipboardData.clearData();
          },
          () => {
            let n2 = document.createEvent("TextEvent");
            if (n2.initTextEvent) {
              n2.initTextEvent("textInput", true, true, window, text);
              currentElement.dispatchEvent(n2);
            }
          }
        ];
        const done = () => {
          var _a;
          return (currentElement == null ? void 0 : currentElement.innerHTML.includes(text)) || (currentElement == null ? void 0 : currentElement.innerText.includes(text)) || (currentElement == null ? void 0 : currentElement.value.includes(text)) || ((_a = currentElement == null ? void 0 : currentElement.textContent) == null ? void 0 : _a.includes(text));
        };
        for (let m2 of methods) {
          try {
            m2();
            if (done()) {
              break;
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    };
    const selectContent = () => {
      currentElement.focus();
      const range = document.createRange();
      range.selectNodeContents(currentElement);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    };
    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const translate = async () => {
      try {
        loading.value = true;
        const text = getContent();
        let translatedText = text ? await youdao(text, "en") : "";
        selectContent();
        await sleep(300);
        setContent(translatedText);
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    };
    const checkUnlockSetting = async () => {
      const domain = getRootDomain(window.location.href);
      const config = await getUserConfig();
      const unlockSetting = typeof config.inputStrategy[domain] !== "undefined" ? parseInt(config.inputStrategy[domain]) === 1 : false;
      if (config.inlineTranslate && unlockSetting) {
        unlock.value = true;
      } else {
        unlock.value = false;
      }
    };
    onMounted(async () => {
      await checkUnlockSetting();
      document.addEventListener("click", findTarget.bind(this), true);
      document.addEventListener("focusin", findTarget.bind(this), true);
      listenPositionChange();
      browserPolyfillExports.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "setUnlock") {
          unlock.value = request.unlock === "1" ? true : false;
          return Promise.resolve(true);
        }
        if (request.action === "inputTrans") {
          if (visible.value && unlock.value) {
            translate();
          }
        }
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "all",
        ref_key: "all",
        ref: all
      }, [
        visible.value && unlock.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["container", { popup: visible.value }]),
          ref_key: "container",
          ref: container
        }, [
          createVNode(unref(Vt), { class: "item" }, {
            popper: withCtx(() => [
              createTextVNode(" 翻译 ")
            ]),
            default: withCtx(() => [
              !loading.value ? (openBlock(), createElementBlock("img", {
                key: 0,
                class: "icon",
                id: "logo",
                onClick: withModifiers(translate, ["stop"]),
                src: unref(browserPolyfillExports).runtime.getURL("logo.svg")
              }, null, 8, _hoisted_1$3)) : (openBlock(), createElementBlock("div", _hoisted_2$3))
            ]),
            _: 1
          }),
          createVNode(unref(Vt), { class: "item hidden" }, {
            popper: withCtx(() => [
              createTextVNode(" 关闭当前 ")
            ]),
            default: withCtx(() => [
              createBaseVNode("img", {
                class: "hidden icon",
                id: "remove",
                onClick: withModifiers(close, ["stop"]),
                src: unref(browserPolyfillExports).runtime.getURL("remove.svg")
              }, null, 8, _hoisted_3$3)
            ]),
            _: 1
          }),
          createVNode(unref(Vt), { class: "item hidden" }, {
            popper: withCtx(() => [
              createTextVNode(" 全局关闭 ")
            ]),
            default: withCtx(() => [
              createBaseVNode("img", {
                class: "hidden icon",
                id: "close",
                onClick: withModifiers(closeAll, ["stop"]),
                src: unref(browserPolyfillExports).runtime.getURL("close.svg")
              }, null, 8, _hoisted_4$3)
            ]),
            _: 1
          })
        ], 2)) : createCommentVNode("", true)
      ], 512);
    };
  }
});
const _style_0$3 = "\n.item {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.all {\n    direction: ltr;\n}\n.all > * {\n    direction: rtl;\n}\n.hidden {\n    display: none;\n    transition: width 0.3s linear;\n}\n.container:hover .hidden {\n    width: var(--131b0bc3);\n    height: var(--367772ca);\n    display: flex;\n}\n.container {\n    position: fixed;\n    top:var(--8b7ed71a);\n    right:var(--2c4e45ba);\n    width: var(--b2ad46e2);\n    height: var(--14b33b7e);\n    background-color: #fff;\n    border-radius: var(--e55f886a);\n    box-shadow: 0 0 10px #b3b5b8;\n    transition: width 0.3s linear;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.container:hover {\n    width: var(--301156d1);\n    border-radius: var(--e55f886a);\n    justify-content: space-around;\n}\n.icon {\n    width: var(--131b0bc3);\n    height: var(--367772ca);\n    cursor: pointer;\n    user-select: none;\n}\n.icon:hover {\n}\n.yd-translate-loader {\n    border: 2px solid #f3f3f3;\n    border-top: 2px solid #3498db;\n    border-radius: 50%;\n    height: var(--367772ca);\n    width:  var(--131b0bc3);\n    animation: spin 0.5s linear infinite;\n}\n@keyframes spin {\n0% { transform: rotate(0deg);\n}\n100% { transform: rotate(360deg);\n}\n}\n@keyframes append-animate {\nfrom {\n        opacity: 0;\n}\nto {\n        opacity: 1;\n}\n}\n.popup {\n  animation: popup 0.3s forwards;\n}\n@keyframes popup {\n0% {\n    opacity: 0;\n    transform: scale(0);\n}\n100% {\n    opacity: 1;\n    transform: scale(1);\n}\n}\n";
const Icon$2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["styles", [_style_0$3]]]);
const ydMgIcon$1 = defineCustomElement(Icon$2);
window.customElements.define("yd-mg-icon", ydMgIcon$1);
const IconCreator = () => {
  const icon = document.createElement("yd-mg-icon");
  icon.style.position = "fixed";
  icon.style.zIndex = `2147483647`;
  document.body.appendChild(icon);
};
const _withScopeId = (n2) => (pushScopeId("data-v-d3135d60"), n2 = n2(), popScopeId(), n2);
const _hoisted_1$2 = {
  key: 0,
  class: "container",
  ref: "container"
};
const _hoisted_2$2 = { class: "yd-line" };
const _hoisted_3$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "orignal" }, null, -1));
const _hoisted_4$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "yd" }, null, -1));
const _hoisted_5$2 = {
  key: 0,
  class: "llm"
};
const _hoisted_6$2 = {
  key: 0,
  class: "tooltip-container"
};
const _hoisted_7$2 = ["onClick"];
const _hoisted_8$2 = {
  key: 0,
  class: "tooltip"
};
const _hoisted_9$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { style: { "position": "relative", "width": "24px", "height": "24px" } }, null, -1));
const _hoisted_10$1 = {
  key: 0,
  class: "llmTooltip"
};
const _hoisted_11$1 = {
  key: 1,
  class: "yd-translate-loader-block"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "blockTranslatorIcon.ce",
  props: {
    show: {
      type: Boolean,
      default: false
      // Set default value for width
    },
    loading: {
      type: Boolean,
      default: false
      // Set default value for width
    },
    llm: {
      type: Boolean,
      default: false
    },
    id: String,
    width: {
      type: Number,
      default: 24
      // Set default value for width
    },
    height: {
      type: Number,
      default: 24
      // Set default value for height
    }
  },
  emits: [event],
  setup(__props, { emit }) {
    const props = __props;
    useCssVars((_ctx) => ({
      "5a3ced10": size.value.iconWidth,
      "58dc89c6": size.value.iconHeight,
      "c03ec7f0": lineStyle.value.height,
      "7808ebd8": lineStyle.value.top,
      "891c21b0": lineStyle.value.left,
      "5934d8d6": lineStyle.value.oheight,
      "4d327ada": lineStyle.value.ydheight,
      "18678bd3": lineStyle.value.llmheight,
      "147b79a2": iconStyle.value.top,
      "7afb4d26": iconStyle.value.left,
      "4a440a69": icon.value,
      "4809e853": iconHover.value,
      "11da4116": llmIcon.value,
      "523390c5": tooltipStyle.value.top,
      "178a82d2": tooltipStyle.value.left,
      "3fa19693": iconLoading.value
    }));
    const isTooltipVisible = ref(false);
    const logo = ref();
    const size = computed(() => {
      return {
        iconWidth: `${props.width}px`,
        iconHeight: `${props.height}px`
      };
    });
    computed(() => {
      return `${props.width}px`;
    });
    computed(() => {
      return `${props.height}px`;
    });
    const icon = ref(`url(${browserPolyfillExports.runtime.getURL("block.svg")})`);
    const llmIcon = ref(`url(${browserPolyfillExports.runtime.getURL("block-h-llm.svg")})`);
    const iconHover = ref(`url(${browserPolyfillExports.runtime.getURL("block-h.svg")})`);
    const iconLoading = ref(`url(${browserPolyfillExports.runtime.getURL("block-l.gif")})`);
    const isMouseOver = ref(false);
    const handleMouseEnter = () => {
      isMouseOver.value = true;
    };
    const handleMouseLeave = () => {
      isMouseOver.value = false;
    };
    const heights = ref({
      totalHeight: 0,
      ydHeight: 0,
      llmHeight: 0
    });
    const translate = () => {
      if (heights.value.llmHeight > 0) {
        return 0;
      }
      const event2 = "try-llm";
      emit(event2);
    };
    const close = async () => {
      const config = await getUserConfig();
      config.aiLabel = false;
      await updateUserConfig(config);
      const event2 = "close";
      emit(event2);
    };
    const tooltipStyle = ref({});
    const showTooltip = () => {
      const triggerRect = {
        left: 0,
        top: props.llm ? 24 : 0
      };
      const iconWidth = 24;
      const tooltipWidth = props.llm ? 200 : 150;
      const tooltipHeight = 40;
      const gap = 8;
      let tooltipX = triggerRect.left - (tooltipWidth - iconWidth) / 2;
      let tooltipY = props.llm ? triggerRect.top + iconWidth + gap : triggerRect.top - (tooltipHeight + gap);
      tooltipStyle.value = {
        left: `${tooltipX}px`,
        top: `${tooltipY}px`
      };
      isTooltipVisible.value = true;
    };
    const hideTooltip = () => {
      isTooltipVisible.value = false;
    };
    function getPosition(e) {
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const clientBound = e.getBoundingClientRect();
      let top = clientBound.top + scrollY;
      let left = clientBound.left + scrollX;
      return { top, left, height: clientBound.height };
    }
    watch([() => props.loading, () => props.id], () => {
      const element = document.querySelector(`[yd-root-id="${props.id}"]`);
      if (!element) {
        heights.value = {
          totalHeight: 0,
          ydHeight: 0,
          llmHeight: 0
        };
        return;
      }
      const containers = element.querySelectorAll(".yd-translate-container");
      const elements = Array.from(containers);
      const { height: height2 } = getPosition(element);
      const { height: cheight } = getPosition(elements[0]);
      if (containers.length > 1) {
        const { height: llmheight } = getPosition(elements[1]);
        heights.value = {
          totalHeight: height2,
          ydHeight: cheight,
          llmHeight: llmheight + 16
        };
      } else {
        heights.value = {
          totalHeight: height2,
          ydHeight: cheight,
          llmHeight: 0
        };
      }
    });
    const lineStyle = computed(() => {
      if (props.id) {
        if (props.llm) {
          return {
            top: `-${heights.value.totalHeight + 16}px`,
            left: `-10px`,
            height: `${heights.value.totalHeight}px`,
            oheight: `${heights.value.totalHeight - (heights.value.ydHeight + heights.value.llmHeight)}px`,
            ydheight: `${heights.value.ydHeight}px`,
            llmheight: `${heights.value.llmHeight}px`
          };
        } else {
          return {
            top: `-${heights.value.totalHeight - (heights.value.llmHeight - 16)}px`,
            left: `-10px`,
            height: `${heights.value.totalHeight}px`,
            oheight: `${heights.value.totalHeight - (heights.value.ydHeight + heights.value.llmHeight)}px`,
            ydheight: `${heights.value.ydHeight}px`,
            llmheight: `${heights.value.llmHeight}px`
          };
        }
      }
      return {
        top: `0px`,
        left: `0px`,
        height: `0px`,
        oheight: `0px`,
        ydheight: `0px`,
        llmheight: `0px`
      };
    });
    const iconStyle = computed(() => {
      return {
        top: `-${heights.value.ydHeight + 16}px`,
        left: "-44px"
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "all notranslate",
        ref: "all",
        onMouseenter: handleMouseEnter,
        onMouseleave: handleMouseLeave
      }, [
        __props.show || isMouseOver.value ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
          createBaseVNode("div", _hoisted_2$2, [
            _hoisted_3$2,
            _hoisted_4$2,
            heights.value.llmHeight ? (openBlock(), createElementBlock("div", _hoisted_5$2)) : createCommentVNode("", true)
          ]),
          !__props.loading ? (openBlock(), createElementBlock("div", _hoisted_6$2, [
            !__props.llm ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createBaseVNode("div", {
                class: "icon",
                id: "logo",
                ref_key: "logo",
                ref: logo,
                onMouseenter: showTooltip,
                onMouseleave: hideTooltip,
                onClick: withModifiers(translate, ["stop"])
              }, null, 40, _hoisted_7$2),
              isTooltipVisible.value && (__props.show || isMouseOver.value) ? (openBlock(), createElementBlock("div", _hoisted_8$2, "追加AI大模型翻译")) : createCommentVNode("", true)
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("div", {
                class: "llmIcon",
                id: "logo",
                ref_key: "logo",
                ref: logo
              }, [
                _hoisted_9$2,
                createBaseVNode("div", {
                  onClick: close,
                  style: { "position": "relative", "width": "24px", "height": "24px", "cursor": "pointer" },
                  onMouseenter: showTooltip,
                  onMouseleave: hideTooltip
                }, null, 32)
              ], 512),
              isTooltipVisible.value && (__props.show || isMouseOver.value) ? (openBlock(), createElementBlock("div", _hoisted_10$1, "关闭追加AI大模型翻译")) : createCommentVNode("", true)
            ], 64))
          ])) : (openBlock(), createElementBlock("div", _hoisted_11$1))
        ], 512)) : createCommentVNode("", true)
      ], 544);
    };
  }
});
const _style_0$2 = '@charset "UTF-8";\n.disabled-element[data-v-d3135d60] {\n  cursor: not-allowed;\n}\n.all[data-v-d3135d60] {\n  position: absolute;\n  z-index: 1;\n}\n.all .container[data-v-d3135d60] {\n  width: var(--5a3ced10);\n  height: var(--58dc89c6);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.all .container .yd-line[data-v-d3135d60] {\n  display: block;\n  position: absolute;\n  height: var(--c03ec7f0);\n  top: var(--7808ebd8);\n  left: var(--891c21b0);\n}\n.all .container .yd-line .orignal[data-v-d3135d60] {\n  padding: 1px;\n  background-color: #E4E7F3;\n  height: var(--5934d8d6);\n}\n.all .container .yd-line .yd[data-v-d3135d60] {\n  padding: 1px;\n  background-color: #FF939E;\n  height: var(--4d327ada);\n}\n.all .container .yd-line .llm[data-v-d3135d60] {\n  padding: 1px;\n  background-color: #2485FF;\n  height: var(--18678bd3);\n}\n.all .container .tooltip-container[data-v-d3135d60] {\n  display: inline-block;\n  position: absolute;\n  top: var(--147b79a2);\n  left: var(--7afb4d26);\n}\n.all .container .tooltip-container .icon[data-v-d3135d60] {\n  width: var(--5a3ced10);\n  height: var(--58dc89c6);\n  background-image: var(--4a440a69);\n  border-radius: 5px;\n  cursor: pointer;\n}\n.all .container .tooltip-container .icon[data-v-d3135d60]::before {\n  content: var(--4809e853);\n  display: none;\n}\n.all .container .tooltip-container .icon[data-v-d3135d60]:hover {\n  box-shadow: 0px 4px 10px rgba(56, 112, 200, 0.16);\n  transition: width 0.3s linear;\n  background-image: var(--4809e853);\n  cursor: pointer;\n}\n.all .container .tooltip-container .llmIcon[data-v-d3135d60] {\n  width: var(--5a3ced10);\n  height: var(--58dc89c6);\n  background-image: var(--4a440a69);\n  border-radius: 5px;\n}\n.all .container .tooltip-container .llmIcon[data-v-d3135d60]:hover {\n  width: var(--5a3ced10);\n  height: 48px;\n  background-image: var(--11da4116);\n  border-radius: 5px;\n}\n.all .container .tooltip-container .tooltip[data-v-d3135d60] {\n  position: absolute;\n  top: var(--523390c5);\n  /* 放在元素的上方 */\n  left: var(--178a82d2);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  background-color: #F9FBFF;\n  padding: 8px;\n  width: 150px;\n  height: 40px;\n  border-radius: 8px;\n  box-sizing: border-box;\n  border: 1px solid rgba(216, 217, 219, 0.5);\n  box-shadow: 0px 1.2px 3.6px 0px rgba(0, 0, 0, 0.1), 0px 2px 20px 0px rgba(27, 19, 98, 0.08);\n  font-family: PingFang SC;\n  font-size: 16px;\n  font-weight: normal;\n  line-height: 150%;\n  text-align: center;\n  letter-spacing: 0em;\n  user-select: none;\n  color: #2A2B2E;\n}\n.all .container .tooltip-container .llmTooltip[data-v-d3135d60] {\n  position: absolute;\n  top: var(--523390c5);\n  /* 放在元素的上方 */\n  left: var(--178a82d2);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  background-color: #F9FBFF;\n  padding: 8px;\n  width: 200px;\n  height: 40px;\n  border-radius: 8px;\n  box-sizing: border-box;\n  border: 1px solid rgba(216, 217, 219, 0.5);\n  box-shadow: 0px 1.2px 3.6px 0px rgba(0, 0, 0, 0.1), 0px 2px 20px 0px rgba(27, 19, 98, 0.08);\n  font-family: PingFang SC;\n  font-size: 16px;\n  font-weight: normal;\n  line-height: 150%;\n  text-align: center;\n  letter-spacing: 0em;\n  user-select: none;\n  color: #2A2B2E;\n}\n.all .container .yd-translate-loader-block[data-v-d3135d60] {\n  position: absolute;\n  top: var(--147b79a2);\n  left: var(--7afb4d26);\n  width: var(--5a3ced10);\n  height: var(--5a3ced10);\n  background-image: var(--3fa19693);\n  /* 确保这里是正确的图片路径 */\n  background-repeat: no-repeat;\n  background-size: cover;\n  box-shadow: 0px 4px 10px rgba(56, 112, 200, 0.16);\n  overflow: hidden;\n  /* 保持子元素的圆角效果 */\n}\n.all .container .yd-translate-loader-block[data-v-d3135d60]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  border-radius: 5px;\n  border: 1px solid transparent;\n  background: linear-gradient(to left bottom, rgba(38, 132, 255, 0.6), rgba(120, 85, 250, 0.6));\n  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);\n  -webkit-mask-composite: xor;\n  mask-composite: exclude;\n}\n.all .container .tip[data-v-d3135d60] {\n  background-color: #F9FBFF;\n  padding: 8px;\n  border-radius: 8px;\n  height: 400px;\n  border: 1px solid #D8D9DB;\n}';
const Icon$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["styles", [_style_0$2]], ["__scopeId", "data-v-d3135d60"]]);
const ydMgIcon = defineCustomElement(Icon$1);
window.customElements.define("yd-mg-block-icon", ydMgIcon);
const IconBlockCreator = () => {
  const icon = document.createElement("yd-mg-block-icon");
  document.body.appendChild(icon);
};
class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
}
class AbortError extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
}
const getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage);
const getAbortedReason = (signal) => {
  const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
};
function pTimeout(promise, options) {
  const {
    milliseconds,
    fallback,
    message,
    customTimers = { setTimeout, clearTimeout }
  } = options;
  let timer;
  const wrappedPromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      signal.addEventListener("abort", () => {
        reject(getAbortedReason(signal));
      });
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      promise.then(resolve, reject);
      return;
    }
    const timeoutError = new TimeoutError();
    timer = customTimers.setTimeout.call(void 0, () => {
      if (fallback) {
        try {
          resolve(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      if (message === false) {
        resolve();
      } else if (message instanceof Error) {
        reject(message);
      } else {
        timeoutError.message = message ?? `Promise timed out after ${milliseconds} milliseconds`;
        reject(timeoutError);
      }
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise);
      } catch (error) {
        reject(error);
      }
    })();
  });
  const cancelablePromise = wrappedPromise.finally(() => {
    cancelablePromise.clear();
  });
  cancelablePromise.clear = () => {
    customTimers.clearTimeout.call(void 0, timer);
    timer = void 0;
  };
  return cancelablePromise;
}
const _hoisted_1$1 = {
  key: 0,
  class: "message"
};
const _hoisted_2$1 = {
  key: 1,
  class: "loading-indicator"
};
const _hoisted_3$1 = {
  key: 0,
  class: "loader"
};
const _hoisted_4$1 = {
  key: 2,
  class: "modal-body notranslate"
};
const _hoisted_5$1 = { class: "imageContainer" };
const _hoisted_6$1 = { class: "text-content" };
const _hoisted_7$1 = { class: "text" };
const _hoisted_8$1 = ["onMouseenter"];
const _hoisted_9$1 = { class: "toolbar" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ImageOcr.ce",
  emits: ["close"],
  setup(__props, { emit }) {
    const message = ref("");
    const showMessage = ref(false);
    const show = ref(false);
    const isOriginal = ref(true);
    const index = ref(-1);
    const ready = ref(false);
    const url = ref("");
    const splitResult = ref([]);
    function mergeTextline(input) {
      const textBlocks = input.map((x2) => ({
        text: x2.text,
        points: x2.box
      }));
      const parameters = {
        mllhX: 1,
        mllhY: 0.1,
        mllhH: 0.05,
        mllvX: 0.1,
        mllvY: 0.22,
        mllvH: 0.2,
        maxLineSpacingForNear: 0.01
      };
      const { mllhX, mllhY, mllhH, mllvX, mllvY, mllvH, maxLineSpacingForNear } = parameters;
      function isSameLine(A2, B2) {
        const Ax = A2[1][0];
        const Ay = A2[1][1];
        const Ah = A2[3][1] - A2[0][1];
        const Bx = B2[0][0];
        const By = B2[0][1];
        const Bh = B2[3][1] - B2[0][1];
        const lx = Ah * mllhX;
        const ly = Ah * mllhY;
        const lh = Ah * mllhH;
        return Math.abs(Bx - Ax) < lx && Math.abs(By - Ay) < ly && Math.abs(Bh - Ah) < lh;
      }
      function merge2tb(textBlocks2, i1, i2, separator) {
        const tb1 = textBlocks2[i1];
        const tb2 = textBlocks2[i2];
        const b1 = tb1.points;
        const b2 = tb2.points;
        const yTop = Math.min(b1[0][1], b1[1][1], b2[0][1], b2[1][1]);
        const yBottom = Math.max(b1[2][1], b1[3][1], b2[2][1], b2[3][1]);
        const xLeft = Math.min(b1[0][0], b1[3][0], b2[0][0], b2[3][0]);
        const xRight = Math.max(b1[1][0], b1[2][0], b2[1][0], b2[2][0]);
        b1[0] = [xLeft, yTop];
        b1[1] = [xRight, yTop];
        b1[2] = [xRight, yBottom];
        b1[3] = [xLeft, yBottom];
        tb1.text = tb1.text + separator + tb2.text;
        textBlocks2[i2] = null;
      }
      function mergeLine(textBlocks2) {
        textBlocks2.sort((a2, b2) => a2.points[0][0] - b2.points[0][0]);
        const resList2 = [];
        for (let i1 = 0; i1 < textBlocks2.length; i1++) {
          const tb1 = textBlocks2[i1];
          if (!tb1)
            continue;
          for (let i2 = i1 + 1; i2 < textBlocks2.length; i2++) {
            const tb2 = textBlocks2[i2];
            if (!tb2)
              continue;
            if (isSameLine(tb1.points, tb2.points)) {
              merge2tb(textBlocks2, i1, i2, " ");
            }
          }
          resList2.push(tb1);
        }
        return resList2;
      }
      function isSameColumn(A2, B2) {
        if (!A2.lineHeight) {
          A2.lineHeight = A2.points[3][1] - A2.points[0][1];
          A2.lineCount = 1;
        }
        let Ah = A2.lineHeight;
        let Bh = B2.points[3][1] - B2.points[0][1];
        if (Math.abs(Bh - Ah) > Ah * mllvH)
          return false;
        let [ax1, ax2] = [A2.points[0][0], A2.points[1][0]];
        let [bx1, bx2] = [B2.points[0][0], B2.points[1][0]];
        if (ax2 < bx1 || ax1 > bx2)
          return false;
        return true;
      }
      function isSamePara(A2, B2) {
        let aLineHeight = A2.lineHeight;
        let maxYDiff = aLineHeight * mllvY;
        let maxXDiff = aLineHeight * mllvX;
        let ay = A2.points[3][1];
        let by = B2.points[0][1];
        if (by > ay + maxYDiff) {
          return false;
        }
        let [ax, bx] = [A2.points[0][0], B2.points[0][0]];
        if (Math.abs(ax - bx) > maxXDiff) {
          return true;
        }
        if (A2["lineCount"] == 1) {
          if (ax - aLineHeight * 2.5 - maxXDiff <= bx && bx <= ax + maxXDiff) {
            return true;
          }
        }
        let aMidX = (A2.points[0][0] + A2.points[1][0]) / 2;
        let bMidX = (B2.points[0][0] + B2.points[1][0]) / 2;
        if (Math.abs(aMidX - bMidX) < maxXDiff) {
          return true;
        }
        if (by <= ay + maxLineSpacingForNear * aLineHeight) {
          if (A2.points[1][0] > B2.points[1][0] && A2.points[0][0] < B2.points[0][0]) {
            return true;
          } else if (A2.points[1][0] < B2.points[1][0] && A2.points[0][0] > B2.points[0][0]) {
            return true;
          }
        }
        return false;
      }
      function merge2line(textBlocks2, i1, i2) {
        const ranges = [
          [19968, 40959],
          [12352, 12543],
          [44032, 55215],
          [65281, 65374]
        ];
        let separator = " ";
        let ta = textBlocks2[i1].text.slice(-1);
        let tb = textBlocks2[i2].text.charAt(0);
        let fa = false, fb = false;
        for (let [l2, r2] of ranges) {
          if (l2 <= ta.charCodeAt(0) && ta.charCodeAt(0) <= r2)
            fa = true;
          if (l2 <= tb.charCodeAt(0) && tb.charCodeAt(0) <= r2)
            fb = true;
        }
        if (fa && fb)
          separator = "";
        merge2tb(textBlocks2, i1, i2, separator);
        textBlocks2[i1]["lineCount"]++;
      }
      let hList = mergeLine(textBlocks);
      hList.sort((a2, b2) => a2.points[0][1] - b2.points[0][1]);
      let resList = [];
      for (let i1 = 0; i1 < hList.length; i1++) {
        let tb1 = hList[i1];
        if (!tb1)
          continue;
        for (let i2 = i1 + 1; i2 < hList.length; i2++) {
          let tb2 = hList[i2];
          if (!tb2)
            continue;
          if (isSameColumn(tb1, tb2)) {
            if (isSamePara(tb1, tb2)) {
              merge2line(hList, i1, i2);
            } else {
              break;
            }
          }
        }
        resList.push(tb1);
      }
      return resList.map((x2) => ({
        text: x2.text,
        box: x2.points
      }));
    }
    const copy = async () => {
      try {
        let text = "";
        if (isOriginal.value) {
          text = wordsObj.value.map((x2) => {
            return x2.text;
          }).join("\n");
        } else {
          text = wordsObj.value.map((x2) => {
            return x2.tr;
          }).join("\n");
        }
        await navigator.clipboard.writeText(text);
        showTip("复制成功");
        try {
          track(window, "imgTextCopy", {
            status: true
          });
        } catch (error) {
          console.error(error);
        }
        console.log("Text successfully copied to clipboard");
      } catch (err) {
        showTip("复制失败");
        try {
          track(window, "imgTextCopy", {
            status: false
          });
        } catch (error) {
          console.error(error);
        }
        console.error("Failed to copy text to clipboard", err);
      }
    };
    function showTip(msg) {
      message.value = msg;
      showMessage.value = true;
      setTimeout(() => {
        showMessage.value = false;
      }, 3e3);
    }
    const tr = () => {
      isOriginal.value = !isOriginal.value;
      try {
        track(window, "imgOriginal", {
          status: isOriginal.value
        });
      } catch (error) {
        console.error(error);
      }
    };
    const handleMouseEnter = (i2) => {
      index.value = i2;
      draw();
      console.log("index", index);
    };
    const handleMouseLeave = () => {
      draw();
      index.value = -1;
    };
    const wordsObj = ref([]);
    const mergeMode = ref(false);
    const changeMergeMode = async () => {
      mergeMode.value = !mergeMode.value;
      try {
        track(window, "changeMergeMode", {
          status: mergeMode.value
        });
      } catch (error) {
        console.error(error);
      }
      let result = JSON.parse(JSON.stringify(splitResult.value));
      if (mergeMode.value) {
        result = mergeTextline(JSON.parse(JSON.stringify(splitResult.value)));
      }
      const translatePromises = result.map((x2) => {
        return youdaollm(x2.text).then((tr2) => ({
          text: x2.text,
          box: x2.box,
          tr: tr2
        })).catch((error) => {
          console.error(error);
          return {
            text: x2.text,
            box: x2.box,
            tr: ""
          };
        });
      });
      const translatedResults = await Promise.all(translatePromises);
      ready.value = true;
      await nextTick();
      draw();
      wordsObj.value = translatedResults;
    };
    const canvas = ref();
    const imageCache = {};
    function loadImage(src) {
      if (imageCache[src]) {
        return imageCache[src];
      }
      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image at ${src}`));
        img.src = src;
      });
      imageCache[src] = promise;
      return promise;
    }
    let boxesCoordinates = [];
    const drawBox = (points, image, targetCanvas) => {
      const canvas2 = targetCanvas;
      const ctx = canvas2.getContext("2d");
      ctx.clearRect(0, 0, canvas2.width, canvas2.height);
      const scaleX = canvas2.width / image.naturalWidth;
      const scaleY = canvas2.height / image.naturalHeight;
      const scale = Math.min(scaleX, scaleY);
      const x2 = canvas2.width / 2 - image.naturalWidth * scale / 2;
      const y2 = canvas2.height / 2 - image.naturalHeight * scale / 2;
      ctx.drawImage(image, x2, y2, image.naturalWidth * scale, image.naturalHeight * scale);
      boxesCoordinates = [];
      points.forEach((point, idx) => {
        ctx.beginPath();
        ctx.strokeStyle = idx === index.value ? "#FF0000" : "#000";
        ctx.lineWidth = idx === index.value ? 2 : 1;
        ctx.fillStyle = "transparent";
        point.forEach(([px, py], pIndex) => {
          const scaledX = px * scale + x2;
          const scaledY = py * scale + y2;
          if (pIndex === 0) {
            ctx.moveTo(scaledX, scaledY);
          } else {
            ctx.lineTo(scaledX, scaledY);
          }
        });
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        boxesCoordinates.push({ idx, point: point.map(([px, py]) => [px * scale + x2, py * scale + y2]) });
      });
    };
    const draw = async () => {
      if (url.value) {
        const image = await loadImage(url.value);
        drawBox(wordsObj.value.map((x2) => x2.box), image, canvas.value);
      }
    };
    function closeModal() {
      wordsObj.value = [];
      show.value = false;
      if (canvas.value) {
        const ctx = canvas.value.getContext("2d");
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      }
    }
    function isPointInRectangle(point, rectangle) {
      if (rectangle.length !== 4) {
        throw new Error("Rectangle must be defined by 4 points");
      }
      let minX = Math.min(rectangle[0][0], rectangle[1][0], rectangle[2][0], rectangle[3][0]);
      let maxX = Math.max(rectangle[0][0], rectangle[1][0], rectangle[2][0], rectangle[3][0]);
      let minY = Math.min(rectangle[0][1], rectangle[1][1], rectangle[2][1], rectangle[3][1]);
      let maxY = Math.max(rectangle[0][1], rectangle[1][1], rectangle[2][1], rectangle[3][1]);
      return point[0] >= minX && point[0] <= maxX && point[1] >= minY && point[1] <= maxY;
    }
    watchEffect(() => {
      const targetCanvas = canvas.value;
      const handle = (event2) => {
        const rect = targetCanvas.getBoundingClientRect();
        const x2 = event2.clientX - rect.left;
        const y2 = event2.clientY - rect.top;
        for (const box of boxesCoordinates) {
          if (isPointInRectangle([x2, y2], box.point)) {
            console.log("Mouse is over box:", box.idx);
            index.value = box.idx;
            draw();
            return 0;
          }
        }
        index.value = -1;
      };
      if (canvas.value) {
        if (ready.value) {
          targetCanvas.addEventListener("mousemove", handle);
        } else {
          targetCanvas.removeEventListener("mousemove", handle);
        }
      }
    });
    const loadingMessage = ref("");
    const handleImgTranslate = async (imageUrl) => {
      try {
        track(window, "imgTr", {
          url: imageUrl
        });
      } catch (error) {
        console.error(error);
      }
      show.value = true;
      ready.value = false;
      let check = await setOffscreen(true);
      if (check) {
        try {
          loadingMessage.value = "首次下载资源比较慢，请耐心等待⌛️";
          await Promise.all([prefetchModel("ocrDet"), prefetchModel("ocrRec")]);
          loadingMessage.value = "下载资源成功⌛️";
          loadingMessage.value = "开始识别";
          let result = await pTimeout(addImgTranslateJob(document.referrer, imageUrl), { milliseconds: 1e3 * 30 });
          if (!result) {
            loadingMessage.value = "发生错误, 在更多功能中进行反馈";
            try {
              track(window, "imgError", {
                message: 0
              });
            } catch (error) {
              console.error(error);
            }
            return true;
          }
          url.value = imageUrl;
          splitResult.value = result;
          loadingMessage.value = "识别结束";
          if (mergeMode.value) {
            result = mergeTextline(JSON.parse(JSON.stringify(splitResult.value)));
          }
          loadingMessage.value = "开始翻译";
          const translatePromises = result.map((x2) => {
            return youdaollm(x2.text).then((tr2) => ({
              text: x2.text,
              box: x2.box,
              tr: tr2
            })).catch((error) => {
              console.error(error);
              return {
                text: x2.text,
                box: x2.box,
                tr: ""
              };
            });
          });
          const translatedResults = await Promise.all(translatePromises);
          loadingMessage.value = "翻译结束";
          ready.value = true;
          await nextTick();
          draw();
          wordsObj.value = translatedResults;
        } catch (error) {
          loadingMessage.value = "发生错误, 在更多功能中进行反馈";
          track(window, "imgError", {
            message: 1,
            content: error.message
          });
        }
      } else {
        loadingMessage.value = "浏览器版本过旧，无法使用本功能，请升级最新的Chrome或者edge";
        track(window, "imgError", {
          message: 2
        });
      }
    };
    browserPolyfillExports.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action === "translateImg") {
        return handleImgTranslate(request.info.srcUrl);
      }
    });
    return (_ctx, _cache) => {
      return show.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "modal-overlay",
        onClick: closeModal
      }, [
        createBaseVNode("div", {
          class: "modal-content",
          onClick: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"]))
        }, [
          showMessage.value ? (openBlock(), createElementBlock("div", _hoisted_1$1, toDisplayString(message.value), 1)) : createCommentVNode("", true),
          !ready.value ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
            !ready.value ? (openBlock(), createElementBlock("div", _hoisted_3$1)) : createCommentVNode("", true),
            createTextVNode(" " + toDisplayString(loadingMessage.value), 1)
          ])) : (openBlock(), createElementBlock("div", _hoisted_4$1, [
            createBaseVNode("div", _hoisted_5$1, [
              createBaseVNode("canvas", {
                ref_key: "canvas",
                ref: canvas,
                height: "500",
                width: "500"
              }, null, 512)
            ]),
            createBaseVNode("div", _hoisted_6$1, [
              createBaseVNode("div", _hoisted_7$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(wordsObj.value, (item2, i2) => {
                  return openBlock(), createElementBlock("div", {
                    key: index.value,
                    class: normalizeClass(`${index.value !== i2 ? "line" : "redline"}`),
                    onMouseenter: ($event) => handleMouseEnter(i2),
                    onMouseleave: handleMouseLeave
                  }, toDisplayString(isOriginal.value ? item2.text : item2.tr), 43, _hoisted_8$1);
                }), 128))
              ]),
              createBaseVNode("div", _hoisted_9$1, [
                createBaseVNode("div", {
                  class: "button",
                  onClick: tr
                }, toDisplayString(isOriginal.value ? "译文" : "原文"), 1),
                createBaseVNode("div", {
                  class: "button",
                  style: { "width": "95px" },
                  onClick: changeMergeMode
                }, toDisplayString(mergeMode.value ? "拆分句子" : "智能合并句子"), 1),
                createBaseVNode("div", {
                  class: "button",
                  onClick: copy
                }, "复制全文")
              ])
            ])
          ]))
        ])
      ])) : createCommentVNode("", true);
    };
  }
});
const _style_0$1 = '@charset "UTF-8";\n.modal-overlay[data-v-04ce0a75] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.modal-content[data-v-04ce0a75] {\n  background-color: white;\n  padding: 20px;\n  border-radius: 10px;\n  display: flex;\n  gap: 20px;\n  width: 800px;\n  height: 500px;\n  flex-direction: column;\n  position: relative;\n}\n.modal-header[data-v-04ce0a75] {\n  display: flex;\n  justify-content: flex-end;\n  height: 24px;\n}\n.modal-body[data-v-04ce0a75] {\n  display: flex;\n  flex-grow: 1;\n  flex-direction: row;\n}\n.modal-body .imageContainer[data-v-04ce0a75] {\n  flex: 2;\n  justify-content: center;\n}\n.modal-body .img[data-v-04ce0a75] {\n  position: relative;\n  background-size: contain;\n  background-position: center;\n  height: 600px;\n  background-repeat: no-repeat;\n}\n.modal-body .img .box[data-v-04ce0a75] {\n  position: absolute;\n  border: #333 3px solid;\n}\n.modal-body .text-content[data-v-04ce0a75] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  /* 根据需要调整文本内容的样式 */\n}\n.modal-body .text-content .text[data-v-04ce0a75] {\n  overflow-y: auto;\n  height: 450px;\n}\n.modal-body .text-content .toolbar[data-v-04ce0a75] {\n  height: 36px;\n  display: flex;\n  justify-content: space-around;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n.close-button[data-v-04ce0a75] {\n  background-color: transparent;\n  /* 透明背景 */\n  border: none;\n  /* 去除边框 */\n  cursor: pointer;\n  /* 鼠标悬停时显示指针 */\n  outline: none;\n  /* 去除焦点轮廓 */\n  position: absolute;\n  /* 绝对定位 */\n  top: 10px;\n  /* 距顶部的距离 */\n  right: 10px;\n  /* 距右边的距离 */\n  font-size: 24px;\n  /* 字体大小 */\n  line-height: 24px;\n  /* 行高，以确保垂直居中 */\n  color: #333;\n  /* 字体颜色 */\n  font-weight: bold;\n  /* 字体加粗 */\n}\n.close-button[data-v-04ce0a75]:hover {\n  color: #666;\n  /* 鼠标悬停时的颜色变化 */\n}\n.line[data-v-04ce0a75], .redline[data-v-04ce0a75] {\n  font-family: Arial, Helvetica, sans-serif;\n  /* 使用无衬线字体 */\n  font-size: 16px;\n  /* 设置合适的字体大小 */\n  line-height: 24px;\n  color: #333;\n  /* 文字颜色 */\n  padding: 3px 3px 3px 6px;\n  /* 内边距 */\n  margin-top: 5px;\n  cursor: pointer;\n  transition: background-color 0.3s, border-left-color 0.3s;\n  /* 背景色和边框颜色变化的过渡效果 */\n  border-left: 3px solid #ddd;\n  /* 设置灰色的左边框 */\n}\n.redline[data-v-04ce0a75] {\n  border-left-color: #e53935;\n  /* 鼠标悬停时边框颜色变为红色 */\n  background-color: #f5f5f5;\n}\n.button[data-v-04ce0a75] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  background-color: #FB4A3E;\n  /* 一个明亮但不饱和的红色 */\n  color: white;\n  /* 文本颜色为白色 */\n  padding: 5px 10px;\n  /* 按钮内边距 */\n  border: none;\n  /* 无边框 */\n  border-radius: 5px;\n  /* 轻微的圆角 */\n  font-size: 10px;\n  text-transform: uppercase;\n  /* 文本大写 */\n  cursor: pointer;\n  /* 鼠标悬停时的指针样式 */\n  transition: background-color 0.3s;\n  /* 背景颜色变化的过渡效果 */\n}\n.button[data-v-04ce0a75]:hover {\n  background-color: #d32f2f;\n  /* 鼠标悬停时的背景颜色稍暗 */\n}\n.button[data-v-04ce0a75]:active {\n  background-color: #c62828;\n  /* 鼠标点击时的背景颜色更暗 */\n}\n.button[data-v-04ce0a75]:disabled {\n  background-color: #ef9a9a;\n  /* 禁用状态的按钮颜色更亮，更少饱和度 */\n  cursor: default;\n  /* 禁用状态的鼠标样式 */\n}\n.loading-indicator[data-v-04ce0a75] {\n  /* 添加你的样式，比如居中显示、动画等 */\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-size: 1.5em;\n  /* ...其他样式 */\n}\n.message[data-v-04ce0a75] {\n  position: absolute;\n  top: 50%;\n  /* 定位到父元素的中间 */\n  left: 50%;\n  /* 定位到父元素的中间 */\n  transform: translate(-50%, -50%);\n  /* 使用 transform 实现精确居中 */\n  padding: 10px;\n  background-color: white;\n  /* 设置背景颜色为白色 */\n  border: 1px solid blue;\n  border-radius: 5px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  /* 添加阴影效果 */\n  text-align: center;\n  z-index: 100;\n  /* 确保提示信息在其他元素上方 */\n}\n.loader[data-v-04ce0a75] {\n  border: 5px solid #f3f3f3;\n  /* 浅灰色边框 */\n  border-top: 5px solid #3498db;\n  /* 蓝色边框 */\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: spin-04ce0a75 2s linear infinite;\n  margin-bottom: 20px;\n}\n@keyframes spin-04ce0a75 {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}';
const ImageOcr = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["styles", [_style_0$1]], ["__scopeId", "data-v-04ce0a75"]]);
const ImageOcrModel = defineCustomElement(ImageOcr);
window.customElements.define("yd-image-ocr", ImageOcrModel);
const ImageOcrCreator = () => {
  const icon = document.createElement("yd-image-ocr");
  icon.style.zIndex = `2147483647`;
  document.body.appendChild(icon);
};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "title" }, "您对灵动翻译插件满意吗?", -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "closeLeft close" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "closeRight close" }, null, -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
const _hoisted_5 = { class: "feedback" };
const _hoisted_6 = { class: "rating" };
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("input", {
  type: "radio",
  name: "rating",
  id: "rating-5"
}, null, -1);
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("input", {
  type: "radio",
  name: "rating",
  id: "rating-4"
}, null, -1);
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("input", {
  type: "radio",
  name: "rating",
  id: "rating-3"
}, null, -1);
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("input", {
  type: "radio",
  name: "rating",
  id: "rating-2"
}, null, -1);
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("input", {
  type: "radio",
  name: "rating",
  id: "rating-1"
}, null, -1);
const _hoisted_12 = { class: "emoji-wrapper" };
const _hoisted_13 = { class: "emoji" };
const _hoisted_14 = {
  key: 0,
  class: "rating-0",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
const _hoisted_15 = /* @__PURE__ */ createStaticVNode('<circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M512 256c0 141.44-114.64 256-256 256-80.48 0-152.32-37.12-199.28-95.28 43.92 35.52 99.84 56.72 160.72 56.72 141.36 0 256-114.56 256-256 0-60.88-21.2-116.8-56.72-160.72C474.8 103.68 512 175.52 512 256z" fill="#f4c534"></path><ellipse transform="scale(-1) rotate(31.21 715.433 -595.455)" cx="166.318" cy="199.829" rx="56.146" ry="56.13" fill="#fff"></ellipse><ellipse transform="rotate(-148.804 180.87 175.82)" cx="180.871" cy="175.822" rx="28.048" ry="28.08" fill="#3e4347"></ellipse><ellipse transform="rotate(-113.778 194.434 165.995)" cx="194.433" cy="165.993" rx="8.016" ry="5.296" fill="#5a5f63"></ellipse><ellipse transform="scale(-1) rotate(31.21 715.397 -1237.664)" cx="345.695" cy="199.819" rx="56.146" ry="56.13" fill="#fff"></ellipse><ellipse transform="rotate(-148.804 360.25 175.837)" cx="360.252" cy="175.84" rx="28.048" ry="28.08" fill="#3e4347"></ellipse><ellipse transform="scale(-1) rotate(66.227 254.508 -573.138)" cx="373.794" cy="165.987" rx="8.016" ry="5.296" fill="#5a5f63"></ellipse><path d="M370.56 344.4c0 7.696-6.224 13.92-13.92 13.92H155.36c-7.616 0-13.92-6.224-13.92-13.92s6.304-13.92 13.92-13.92h201.296c7.696.016 13.904 6.224 13.904 13.92z" fill="#3e4347"></path>', 9);
const _hoisted_24 = [
  _hoisted_15
];
const _hoisted_25 = {
  key: 1,
  class: "rating-1",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
const _hoisted_26 = /* @__PURE__ */ createStaticVNode('<circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"></path><path d="M328.4 428a92.8 92.8 0 0 0-145-.1 6.8 6.8 0 0 1-12-5.8 86.6 86.6 0 0 1 84.5-69 86.6 86.6 0 0 1 84.7 69.8c1.3 6.9-7.7 10.6-12.2 5.1z" fill="#3e4347"></path><path d="M269.2 222.3c5.3 62.8 52 113.9 104.8 113.9 52.3 0 90.8-51.1 85.6-113.9-2-25-10.8-47.9-23.7-66.7-4.1-6.1-12.2-8-18.5-4.2a111.8 111.8 0 0 1-60.1 16.2c-22.8 0-42.1-5.6-57.8-14.8-6.8-4-15.4-1.5-18.9 5.4-9 18.2-13.2 40.3-11.4 64.1z" fill="#f4c534"></path><path d="M357 189.5c25.8 0 47-7.1 63.7-18.7 10 14.6 17 32.1 18.7 51.6 4 49.6-26.1 89.7-67.5 89.7-41.6 0-78.4-40.1-82.5-89.7A95 95 0 0 1 298 174c16 9.7 35.6 15.5 59 15.5z" fill="#fff"></path><path d="M396.2 246.1a38.5 38.5 0 0 1-38.7 38.6 38.5 38.5 0 0 1-38.6-38.6 38.6 38.6 0 1 1 77.3 0z" fill="#3e4347"></path><path d="M380.4 241.1c-3.2 3.2-9.9 1.7-14.9-3.2-4.8-4.8-6.2-11.5-3-14.7 3.3-3.4 10-2 14.9 2.9 4.9 5 6.4 11.7 3 15z" fill="#fff"></path><path d="M242.8 222.3c-5.3 62.8-52 113.9-104.8 113.9-52.3 0-90.8-51.1-85.6-113.9 2-25 10.8-47.9 23.7-66.7 4.1-6.1 12.2-8 18.5-4.2 16.2 10.1 36.2 16.2 60.1 16.2 22.8 0 42.1-5.6 57.8-14.8 6.8-4 15.4-1.5 18.9 5.4 9 18.2 13.2 40.3 11.4 64.1z" fill="#f4c534"></path><path d="M155 189.5c-25.8 0-47-7.1-63.7-18.7-10 14.6-17 32.1-18.7 51.6-4 49.6 26.1 89.7 67.5 89.7 41.6 0 78.4-40.1 82.5-89.7A95 95 0 0 0 214 174c-16 9.7-35.6 15.5-59 15.5z" fill="#fff"></path><path d="M115.8 246.1a38.5 38.5 0 0 0 38.7 38.6 38.5 38.5 0 0 0 38.6-38.6 38.6 38.6 0 1 0-77.3 0z" fill="#3e4347"></path><path d="M131.6 241.1c3.2 3.2 9.9 1.7 14.9-3.2 4.8-4.8 6.2-11.5 3-14.7-3.3-3.4-10-2-14.9 2.9-4.9 5-6.4 11.7-3 15z" fill="#fff"></path>', 11);
const _hoisted_37 = [
  _hoisted_26
];
const _hoisted_38 = {
  key: 2,
  class: "rating-2",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
const _hoisted_39 = /* @__PURE__ */ createStaticVNode('<circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"></path><path d="M336.6 403.2c-6.5 8-16 10-25.5 5.2a117.6 117.6 0 0 0-110.2 0c-9.4 4.9-19 3.3-25.6-4.6-6.5-7.7-4.7-21.1 8.4-28 45.1-24 99.5-24 144.6 0 13 7 14.8 19.7 8.3 27.4z" fill="#3e4347"></path><path d="M276.6 244.3a79.3 79.3 0 1 1 158.8 0 79.5 79.5 0 1 1-158.8 0z" fill="#fff"></path><circle cx="340" cy="260.4" r="36.2" fill="#3e4347"></circle><g fill="#fff"><ellipse transform="rotate(-135 326.4 246.6)" cx="326.4" cy="246.6" rx="6.5" ry="10"></ellipse><path d="M231.9 244.3a79.3 79.3 0 1 0-158.8 0 79.5 79.5 0 1 0 158.8 0z"></path></g><circle cx="168.5" cy="260.4" r="36.2" fill="#3e4347"></circle><ellipse transform="rotate(-135 182.1 246.7)" cx="182.1" cy="246.7" rx="10" ry="6.5" fill="#fff"></ellipse>', 8);
const _hoisted_47 = [
  _hoisted_39
];
const _hoisted_48 = {
  key: 3,
  class: "rating-3",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
const _hoisted_49 = /* @__PURE__ */ createStaticVNode('<circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M407.7 352.8a163.9 163.9 0 0 1-303.5 0c-2.3-5.5 1.5-12 7.5-13.2a780.8 780.8 0 0 1 288.4 0c6 1.2 9.9 7.7 7.6 13.2z" fill="#3e4347"></path><path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"></path><g fill="#fff"><path d="M115.3 339c18.2 29.6 75.1 32.8 143.1 32.8 67.1 0 124.2-3.2 143.2-31.6l-1.5-.6a780.6 780.6 0 0 0-284.8-.6z"></path><ellipse cx="356.4" cy="205.3" rx="81.1" ry="81"></ellipse></g><ellipse cx="356.4" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347"></ellipse><g fill="#fff"><ellipse transform="scale(-1) rotate(45 454 -906)" cx="375.3" cy="188.1" rx="12" ry="8.1"></ellipse><ellipse cx="155.6" cy="205.3" rx="81.1" ry="81"></ellipse></g><ellipse cx="155.6" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347"></ellipse><ellipse transform="scale(-1) rotate(45 454 -421.3)" cx="174.5" cy="188" rx="12" ry="8.1" fill="#fff"></ellipse>', 8);
const _hoisted_57 = [
  _hoisted_49
];
const _hoisted_58 = {
  key: 4,
  class: "rating-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
const _hoisted_59 = /* @__PURE__ */ createStaticVNode('<circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"></path><path d="M232.3 201.3c0 49.2-74.3 94.2-74.3 94.2s-74.4-45-74.4-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z" fill="#e24b4b"></path><path d="M96.1 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2C80.2 229.8 95.6 175.2 96 173.3z" fill="#d03f3f"></path><path d="M215.2 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z" fill="#fff"></path><path d="M428.4 201.3c0 49.2-74.4 94.2-74.4 94.2s-74.3-45-74.3-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z" fill="#e24b4b"></path><path d="M292.2 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2-77.8-65.7-62.4-120.3-61.9-122.2z" fill="#d03f3f"></path><path d="M411.3 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z" fill="#fff"></path><path d="M381.7 374.1c-30.2 35.9-75.3 64.4-125.7 64.4s-95.4-28.5-125.8-64.2a17.6 17.6 0 0 1 16.5-28.7 627.7 627.7 0 0 0 218.7-.1c16.2-2.7 27 16.1 16.3 28.6z" fill="#3e4347"></path><path d="M256 438.5c25.7 0 50-7.5 71.7-19.5-9-33.7-40.7-43.3-62.6-31.7-29.7 15.8-62.8-4.7-75.6 34.3 20.3 10.4 42.8 17 66.5 17z" fill="#e24b4b"></path>', 10);
const _hoisted_69 = [
  _hoisted_59
];
const _hoisted_70 = {
  key: 5,
  class: "rating-5",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
const _hoisted_71 = /* @__PURE__ */ createStaticVNode('<g fill="#ffd93b"><circle cx="256" cy="256" r="256"></circle><path d="M512 256A256 256 0 0 1 56.8 416.7a256 256 0 0 0 360-360c58 47 95.2 118.8 95.2 199.3z"></path></g><path d="M512 99.4v165.1c0 11-8.9 19.9-19.7 19.9h-187c-13 0-23.5-10.5-23.5-23.5v-21.3c0-12.9-8.9-24.8-21.6-26.7-16.2-2.5-30 10-30 25.5V261c0 13-10.5 23.5-23.5 23.5h-187A19.7 19.7 0 0 1 0 264.7V99.4c0-10.9 8.8-19.7 19.7-19.7h472.6c10.8 0 19.7 8.7 19.7 19.7z" fill="#e9eff4"></path><path d="M204.6 138v88.2a23 23 0 0 1-23 23H58.2a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z" fill="#45cbea"></path><path d="M476.9 138v88.2a23 23 0 0 1-23 23H330.3a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z" fill="#e84d88"></path><g fill="#38c0dc"><path d="M95.2 114.9l-60 60v15.2l75.2-75.2zM123.3 114.9L35.1 203v23.2c0 1.8.3 3.7.7 5.4l116.8-116.7h-29.3z"></path></g><g fill="#d23f77"><path d="M373.3 114.9l-66 66V196l81.3-81.2zM401.5 114.9l-94.1 94v17.3c0 3.5.8 6.8 2.2 9.8l121.1-121.1h-29.2z"></path></g><path d="M329.5 395.2c0 44.7-33 81-73.4 81-40.7 0-73.5-36.3-73.5-81s32.8-81 73.5-81c40.5 0 73.4 36.3 73.4 81z" fill="#3e4347"></path><path d="M256 476.2a70 70 0 0 0 53.3-25.5 34.6 34.6 0 0 0-58-25 34.4 34.4 0 0 0-47.8 26 69.9 69.9 0 0 0 52.6 24.5z" fill="#e24b4b"></path><path d="M290.3 434.8c-1 3.4-5.8 5.2-11 3.9s-8.4-5.1-7.4-8.7c.8-3.3 5.7-5 10.7-3.8 5.1 1.4 8.5 5.3 7.7 8.6z" fill="#fff" opacity=".2"></path>', 9);
const _hoisted_80 = [
  _hoisted_71
];
const _hoisted_81 = { class: "text" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UserRate.ce",
  setup(__props) {
    const show = ref(true);
    const hoverDiv = ref(false);
    const hoveredRating = ref(0);
    const quiz = async () => {
      const config = await getUserConfig();
      const id = config.userId;
      const url = config.config.feelback_url;
      const website = "https://magicfanyi.youdao.com/#/";
      const feedbackUrl = `${website}catch?ss=${id}&url=${url}&type=feedback`;
      await browserPolyfillExports.runtime.sendMessage({ action: "openNewTab", url: feedbackUrl });
    };
    const handleHover = (rating) => {
      hoveredRating.value = rating;
    };
    const handleClick = async (rating) => {
      try {
        const config = await getUserConfig();
        config.rated = true;
        await updateUserConfig(config);
        const id = config.userId;
        track(window, "rating", {
          id,
          rating
        });
      } catch (error) {
        console.error();
      }
      console.log("点击评分: ", rating);
      if (rating === 5 || rating === 4) {
        const channel = "EDGE";
        const sites = {
          CHROME: "https://chromewebstore.google.com/detail/%E6%9C%89%E9%81%93%E7%81%B5%E5%8A%A8%E7%BF%BB%E8%AF%91/jlpcnoohcpfgpbalhlggdhjocgnlgafn",
          EDGE: "https://microsoftedge.microsoft.com/addons/detail/%E6%9C%89%E9%81%93%E7%81%B5%E5%8A%A8%E7%BF%BB%E8%AF%91/memhacajcfhmibggbgilihlmiiddeggo",
          ZIP: "https://microsoftedge.microsoft.com/addons/detail/%E6%9C%89%E9%81%93%E7%81%B5%E5%8A%A8%E7%BF%BB%E8%AF%91/memhacajcfhmibggbgilihlmiiddeggo"
        };
        await browserPolyfillExports.runtime.sendMessage({ action: "openNewTab", url: sites[channel] });
      } else if (rating === 3) {
        await quiz();
      }
      close();
    };
    const texts = ["十分抱歉给你来不好的体验", "可以写下你的反馈吗?", "可以去商店给我们一个好评吗？"];
    const message = computed(() => {
      if (hoveredRating.value === 5 || hoveredRating.value === 4) {
        return texts[2];
      } else if (hoveredRating.value === 1 || hoveredRating.value === 2) {
        return texts[0];
      } else {
        return texts[1];
      }
    });
    let setTimeoutHandle = 0;
    const mouseEnter = () => {
      clearTimeout(setTimeoutHandle);
      hoverDiv.value = true;
    };
    const mouseLeave = () => {
      hoverDiv.value = false;
    };
    const close = async () => {
      show.value = false;
      hoverDiv.value = false;
      try {
        const config = await getUserConfig();
        config.rated = true;
        await updateUserConfig(config);
      } catch (error) {
        console.error(error);
      }
    };
    const closeAction = async () => {
      try {
        track(window, "closeRate");
      } catch (error) {
        console.error(error);
      }
      close();
    };
    onMounted(async () => {
      try {
        const config = await getUserConfig();
        config.rated = true;
        await updateUserConfig(config);
      } catch (error) {
        console.error(error);
      }
    });
    onUnmounted(() => {
    });
    return (_ctx, _cache) => {
      return show.value || hoverDiv.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "container feedback",
        onMouseenter: mouseEnter,
        onMouseleave: mouseLeave
      }, [
        createBaseVNode("div", { class: "bar" }, [
          _hoisted_1,
          createBaseVNode("div", {
            class: "close-button",
            onClick: closeAction
          }, _hoisted_4)
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            _hoisted_7,
            createBaseVNode("label", {
              onMouseover: _cache[0] || (_cache[0] = ($event) => handleHover(5)),
              onClick: _cache[1] || (_cache[1] = ($event) => handleClick(5))
            }, null, 32),
            _hoisted_8,
            createBaseVNode("label", {
              onMouseover: _cache[2] || (_cache[2] = ($event) => handleHover(4)),
              onClick: _cache[3] || (_cache[3] = ($event) => handleClick(4))
            }, null, 32),
            _hoisted_9,
            createBaseVNode("label", {
              onMouseover: _cache[4] || (_cache[4] = ($event) => handleHover(3)),
              onClick: _cache[5] || (_cache[5] = ($event) => handleClick(3))
            }, null, 32),
            _hoisted_10,
            createBaseVNode("label", {
              onMouseover: _cache[6] || (_cache[6] = ($event) => handleHover(2)),
              onClick: _cache[7] || (_cache[7] = ($event) => handleClick(2))
            }, null, 32),
            _hoisted_11,
            createBaseVNode("label", {
              onMouseover: _cache[8] || (_cache[8] = ($event) => handleHover(1)),
              onClick: _cache[9] || (_cache[9] = ($event) => handleClick(1))
            }, null, 32),
            createBaseVNode("div", _hoisted_12, [
              createBaseVNode("div", _hoisted_13, [
                hoveredRating.value === 0 ? (openBlock(), createElementBlock("svg", _hoisted_14, _hoisted_24)) : createCommentVNode("", true),
                hoveredRating.value === 1 ? (openBlock(), createElementBlock("svg", _hoisted_25, _hoisted_37)) : createCommentVNode("", true),
                hoveredRating.value === 2 ? (openBlock(), createElementBlock("svg", _hoisted_38, _hoisted_47)) : createCommentVNode("", true),
                hoveredRating.value === 3 ? (openBlock(), createElementBlock("svg", _hoisted_48, _hoisted_57)) : createCommentVNode("", true),
                hoveredRating.value === 4 ? (openBlock(), createElementBlock("svg", _hoisted_58, _hoisted_69)) : createCommentVNode("", true),
                hoveredRating.value === 5 ? (openBlock(), createElementBlock("svg", _hoisted_70, _hoisted_80)) : createCommentVNode("", true)
              ])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_81, toDisplayString(message.value), 1)
      ], 32)) : createCommentVNode("", true);
    };
  }
});
const _style_0 = `
* {
    box-sizing: border-box;
}
.bar {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}
.title {
    font-size: 18px;
    font-weight: bolder;
    user-select: none;
}
.text {
}
.container {
    top: 10px;
    right: 10px;
    display: flex;
    height: 250px;
    width: 300px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 20px;
    padding: 0 20px;
    background-color: #fff;
    justify-content: space-around;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* 添加阴影 */
}
.rating {
    display: flex;
    width: 100%;
    justify-content: center;
    overflow: hidden;
    flex-direction: row-reverse;
    height: 150px;
    position: relative;
}
.rating-0 {
    filter: grayscale(100%);
}
.rating>input {
    display: none;
}
.rating>label {
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-top: auto;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23e3e3e3' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 76%;
    transition: .3s;
}
.rating>input:checked~label,
.rating>input:checked~label~label {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23fcd93a' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
}
.rating>input:not(:checked)~label:hover,
.rating>input:not(:checked)~label:hover~label {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23d8b11e' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
}
.emoji-wrapper {
    width: 100%;
    text-align: center;
    height: 100px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
}
.emoji-wrapper:before,
.emoji-wrapper:after {
    content: "";
    height: 15px;
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 1;
}
.emoji-wrapper:before {
    top: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 35%, rgba(255, 255, 255, 0) 100%);
}
.emoji-wrapper:after {
    bottom: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 35%, rgba(255, 255, 255, 0) 100%);
}
.emoji {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: .3s;
}
.emoji>svg {
    margin: 15px 0;
    width: 70px;
    height: 70px;
    flex-shrink: 0;
}
.close-button {
    position: relative;
    width: 20px;
    height: 20px;
    opacity: 0.8;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
}
.close-button:hover {
    opacity: 1;
    background-color: grey;
}
.close {
    position: absolute;
    left: 9px;
    top:3px;
    content: ' ';
    height: 16px;
    width: 2px;
    background-color: #333;
}
.closeLeft {
    transform: rotate(45deg);
}
.closeRight {
    transform: rotate(-45deg);
}


`;
const Icon = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]]]);
const ydUserRate = defineCustomElement(Icon);
window.customElements.define("yd-user-rate", ydUserRate);
const UserRateCreator = () => {
  const icon = document.createElement("yd-user-rate");
  icon.style.position = "fixed";
  icon.style.zIndex = `2147483647`;
  document.body.appendChild(icon);
};
var ReadabilityExports = {};
var Readability$1 = {
  get exports() {
    return ReadabilityExports;
  },
  set exports(v2) {
    ReadabilityExports = v2;
  }
};
(function(module) {
  function Readability2(doc, options) {
    if (options && options.documentElement) {
      doc = options;
      options = arguments[2];
    } else if (!doc || !doc.documentElement) {
      throw new Error("First argument to Readability constructor should be a document object.");
    }
    options = options || {};
    this._doc = doc;
    this._docJSDOMParser = this._doc.firstChild.__JSDOMParser__;
    this._articleTitle = null;
    this._articleByline = null;
    this._articleDir = null;
    this._articleSiteName = null;
    this._attempts = [];
    this._debug = !!options.debug;
    this._maxElemsToParse = options.maxElemsToParse || this.DEFAULT_MAX_ELEMS_TO_PARSE;
    this._nbTopCandidates = options.nbTopCandidates || this.DEFAULT_N_TOP_CANDIDATES;
    this._charThreshold = options.charThreshold || this.DEFAULT_CHAR_THRESHOLD;
    this._classesToPreserve = this.CLASSES_TO_PRESERVE.concat(options.classesToPreserve || []);
    this._keepClasses = !!options.keepClasses;
    this._serializer = options.serializer || function(el) {
      return el.innerHTML;
    };
    this._disableJSONLD = !!options.disableJSONLD;
    this._allowedVideoRegex = options.allowedVideoRegex || this.REGEXPS.videos;
    this._flags = this.FLAG_STRIP_UNLIKELYS | this.FLAG_WEIGHT_CLASSES | this.FLAG_CLEAN_CONDITIONALLY;
    if (this._debug) {
      let logNode = function(node) {
        if (node.nodeType == node.TEXT_NODE) {
          return `${node.nodeName} ("${node.textContent}")`;
        }
        let attrPairs = Array.from(node.attributes || [], function(attr) {
          return `${attr.name}="${attr.value}"`;
        }).join(" ");
        return `<${node.localName} ${attrPairs}>`;
      };
      this.log = function() {
        if (typeof console !== "undefined") {
          let args = Array.from(arguments, (arg) => {
            if (arg && arg.nodeType == this.ELEMENT_NODE) {
              return logNode(arg);
            }
            return arg;
          });
          args.unshift("Reader: (Readability)");
          console.log.apply(console, args);
        } else if (typeof dump !== "undefined") {
          var msg = Array.prototype.map.call(arguments, function(x2) {
            return x2 && x2.nodeName ? logNode(x2) : x2;
          }).join(" ");
          dump("Reader: (Readability) " + msg + "\n");
        }
      };
    } else {
      this.log = function() {
      };
    }
  }
  Readability2.prototype = {
    FLAG_STRIP_UNLIKELYS: 1,
    FLAG_WEIGHT_CLASSES: 2,
    FLAG_CLEAN_CONDITIONALLY: 4,
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    // Max number of nodes supported by this parser. Default: 0 (no limit)
    DEFAULT_MAX_ELEMS_TO_PARSE: 0,
    // The number of top candidates to consider when analysing how
    // tight the competition is among candidates.
    DEFAULT_N_TOP_CANDIDATES: 5,
    // Element tags to score by default.
    DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre".toUpperCase().split(","),
    // The default number of chars an article must have in order to return a result
    DEFAULT_CHAR_THRESHOLD: 500,
    // All of the regular expressions in use within readability.
    // Defined up here so we don't instantiate them repeatedly in loops.
    REGEXPS: {
      // NOTE: These two regular expressions are duplicated in
      // Readability-readerable.js. Please keep both copies in sync.
      unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
      okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,
      positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
      negative: /-ad-|hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
      extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
      byline: /byline|author|dateline|writtenby|p-author/i,
      replaceFonts: /<(\/?)font[^>]*>/gi,
      normalize: /\s{2,}/g,
      videos: /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
      shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,
      nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
      prevLink: /(prev|earl|old|new|<|«)/i,
      tokenize: /\W+/g,
      whitespace: /^\s*$/,
      hasContent: /\S$/,
      hashUrl: /^#.+/,
      srcsetUrl: /(\S+)(\s+[\d.]+[xw])?(\s*(?:,|$))/g,
      b64DataUrl: /^data:\s*([^\s;,]+)\s*;\s*base64\s*,/i,
      // See: https://schema.org/Article
      jsonLdArticleTypes: /^Article|AdvertiserContentArticle|NewsArticle|AnalysisNewsArticle|AskPublicNewsArticle|BackgroundNewsArticle|OpinionNewsArticle|ReportageNewsArticle|ReviewNewsArticle|Report|SatiricalArticle|ScholarlyArticle|MedicalScholarlyArticle|SocialMediaPosting|BlogPosting|LiveBlogPosting|DiscussionForumPosting|TechArticle|APIReference$/
    },
    UNLIKELY_ROLES: ["menu", "menubar", "complementary", "navigation", "alert", "alertdialog", "dialog"],
    DIV_TO_P_ELEMS: /* @__PURE__ */ new Set(["BLOCKQUOTE", "DL", "DIV", "IMG", "OL", "P", "PRE", "TABLE", "UL"]),
    ALTER_TO_DIV_EXCEPTIONS: ["DIV", "ARTICLE", "SECTION", "P"],
    PRESENTATIONAL_ATTRIBUTES: ["align", "background", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "hspace", "rules", "style", "valign", "vspace"],
    DEPRECATED_SIZE_ATTRIBUTE_ELEMS: ["TABLE", "TH", "TD", "HR", "PRE"],
    // The commented out elements qualify as phrasing content but tend to be
    // removed by readability when put into paragraphs, so we ignore them here.
    PHRASING_ELEMS: [
      // "CANVAS", "IFRAME", "SVG", "VIDEO",
      "ABBR",
      "AUDIO",
      "B",
      "BDO",
      "BR",
      "BUTTON",
      "CITE",
      "CODE",
      "DATA",
      "DATALIST",
      "DFN",
      "EM",
      "EMBED",
      "I",
      "IMG",
      "INPUT",
      "KBD",
      "LABEL",
      "MARK",
      "MATH",
      "METER",
      "NOSCRIPT",
      "OBJECT",
      "OUTPUT",
      "PROGRESS",
      "Q",
      "RUBY",
      "SAMP",
      "SCRIPT",
      "SELECT",
      "SMALL",
      "SPAN",
      "STRONG",
      "SUB",
      "SUP",
      "TEXTAREA",
      "TIME",
      "VAR",
      "WBR"
    ],
    // These are the classes that readability sets itself.
    CLASSES_TO_PRESERVE: ["page"],
    // These are the list of HTML entities that need to be escaped.
    HTML_ESCAPE_MAP: {
      "lt": "<",
      "gt": ">",
      "amp": "&",
      "quot": '"',
      "apos": "'"
    },
    /**
     * Run any post-process modifications to article content as necessary.
     *
     * @param Element
     * @return void
    **/
    _postProcessContent: function(articleContent) {
      this._fixRelativeUris(articleContent);
      this._simplifyNestedElements(articleContent);
      if (!this._keepClasses) {
        this._cleanClasses(articleContent);
      }
    },
    /**
     * Iterates over a NodeList, calls `filterFn` for each node and removes node
     * if function returned `true`.
     *
     * If function is not passed, removes all the nodes in node list.
     *
     * @param NodeList nodeList The nodes to operate on
     * @param Function filterFn the function to use as a filter
     * @return void
     */
    _removeNodes: function(nodeList, filterFn) {
      if (this._docJSDOMParser && nodeList._isLiveNodeList) {
        throw new Error("Do not pass live node lists to _removeNodes");
      }
      for (var i2 = nodeList.length - 1; i2 >= 0; i2--) {
        var node = nodeList[i2];
        var parentNode = node.parentNode;
        if (parentNode) {
          if (!filterFn || filterFn.call(this, node, i2, nodeList)) {
            parentNode.removeChild(node);
          }
        }
      }
    },
    /**
     * Iterates over a NodeList, and calls _setNodeTag for each node.
     *
     * @param NodeList nodeList The nodes to operate on
     * @param String newTagName the new tag name to use
     * @return void
     */
    _replaceNodeTags: function(nodeList, newTagName) {
      if (this._docJSDOMParser && nodeList._isLiveNodeList) {
        throw new Error("Do not pass live node lists to _replaceNodeTags");
      }
      for (const node of nodeList) {
        this._setNodeTag(node, newTagName);
      }
    },
    /**
     * Iterate over a NodeList, which doesn't natively fully implement the Array
     * interface.
     *
     * For convenience, the current object context is applied to the provided
     * iterate function.
     *
     * @param  NodeList nodeList The NodeList.
     * @param  Function fn       The iterate function.
     * @return void
     */
    _forEachNode: function(nodeList, fn) {
      Array.prototype.forEach.call(nodeList, fn, this);
    },
    /**
     * Iterate over a NodeList, and return the first node that passes
     * the supplied test function
     *
     * For convenience, the current object context is applied to the provided
     * test function.
     *
     * @param  NodeList nodeList The NodeList.
     * @param  Function fn       The test function.
     * @return void
     */
    _findNode: function(nodeList, fn) {
      return Array.prototype.find.call(nodeList, fn, this);
    },
    /**
     * Iterate over a NodeList, return true if any of the provided iterate
     * function calls returns true, false otherwise.
     *
     * For convenience, the current object context is applied to the
     * provided iterate function.
     *
     * @param  NodeList nodeList The NodeList.
     * @param  Function fn       The iterate function.
     * @return Boolean
     */
    _someNode: function(nodeList, fn) {
      return Array.prototype.some.call(nodeList, fn, this);
    },
    /**
     * Iterate over a NodeList, return true if all of the provided iterate
     * function calls return true, false otherwise.
     *
     * For convenience, the current object context is applied to the
     * provided iterate function.
     *
     * @param  NodeList nodeList The NodeList.
     * @param  Function fn       The iterate function.
     * @return Boolean
     */
    _everyNode: function(nodeList, fn) {
      return Array.prototype.every.call(nodeList, fn, this);
    },
    /**
     * Concat all nodelists passed as arguments.
     *
     * @return ...NodeList
     * @return Array
     */
    _concatNodeLists: function() {
      var slice = Array.prototype.slice;
      var args = slice.call(arguments);
      var nodeLists = args.map(function(list) {
        return slice.call(list);
      });
      return Array.prototype.concat.apply([], nodeLists);
    },
    _getAllNodesWithTag: function(node, tagNames) {
      if (node.querySelectorAll) {
        return node.querySelectorAll(tagNames.join(","));
      }
      return [].concat.apply([], tagNames.map(function(tag) {
        var collection = node.getElementsByTagName(tag);
        return Array.isArray(collection) ? collection : Array.from(collection);
      }));
    },
    /**
     * Removes the class="" attribute from every element in the given
     * subtree, except those that match CLASSES_TO_PRESERVE and
     * the classesToPreserve array from the options object.
     *
     * @param Element
     * @return void
     */
    _cleanClasses: function(node) {
      var classesToPreserve = this._classesToPreserve;
      var className = (node.getAttribute("class") || "").split(/\s+/).filter(function(cls) {
        return classesToPreserve.indexOf(cls) != -1;
      }).join(" ");
      if (className) {
        node.setAttribute("class", className);
      } else {
        node.removeAttribute("class");
      }
      for (node = node.firstElementChild; node; node = node.nextElementSibling) {
        this._cleanClasses(node);
      }
    },
    /**
     * Converts each <a> and <img> uri in the given element to an absolute URI,
     * ignoring #ref URIs.
     *
     * @param Element
     * @return void
     */
    _fixRelativeUris: function(articleContent) {
      var baseURI = this._doc.baseURI;
      var documentURI = this._doc.documentURI;
      function toAbsoluteURI(uri) {
        if (baseURI == documentURI && uri.charAt(0) == "#") {
          return uri;
        }
        try {
          return new URL(uri, baseURI).href;
        } catch (ex) {
        }
        return uri;
      }
      var links = this._getAllNodesWithTag(articleContent, ["a"]);
      this._forEachNode(links, function(link) {
        var href = link.getAttribute("href");
        if (href) {
          if (href.indexOf("javascript:") === 0) {
            if (link.childNodes.length === 1 && link.childNodes[0].nodeType === this.TEXT_NODE) {
              var text = this._doc.createTextNode(link.textContent);
              link.parentNode.replaceChild(text, link);
            } else {
              var container = this._doc.createElement("span");
              while (link.firstChild) {
                container.appendChild(link.firstChild);
              }
              link.parentNode.replaceChild(container, link);
            }
          } else {
            link.setAttribute("href", toAbsoluteURI(href));
          }
        }
      });
      var medias = this._getAllNodesWithTag(articleContent, [
        "img",
        "picture",
        "figure",
        "video",
        "audio",
        "source"
      ]);
      this._forEachNode(medias, function(media) {
        var src = media.getAttribute("src");
        var poster = media.getAttribute("poster");
        var srcset = media.getAttribute("srcset");
        if (src) {
          media.setAttribute("src", toAbsoluteURI(src));
        }
        if (poster) {
          media.setAttribute("poster", toAbsoluteURI(poster));
        }
        if (srcset) {
          var newSrcset = srcset.replace(this.REGEXPS.srcsetUrl, function(_2, p1, p2, p3) {
            return toAbsoluteURI(p1) + (p2 || "") + p3;
          });
          media.setAttribute("srcset", newSrcset);
        }
      });
    },
    _simplifyNestedElements: function(articleContent) {
      var node = articleContent;
      while (node) {
        if (node.parentNode && ["DIV", "SECTION"].includes(node.tagName) && !(node.id && node.id.startsWith("readability"))) {
          if (this._isElementWithoutContent(node)) {
            node = this._removeAndGetNext(node);
            continue;
          } else if (this._hasSingleTagInsideElement(node, "DIV") || this._hasSingleTagInsideElement(node, "SECTION")) {
            var child = node.children[0];
            for (var i2 = 0; i2 < node.attributes.length; i2++) {
              child.setAttribute(node.attributes[i2].name, node.attributes[i2].value);
            }
            node.parentNode.replaceChild(child, node);
            node = child;
            continue;
          }
        }
        node = this._getNextNode(node);
      }
    },
    /**
     * Get the article title as an H1.
     *
     * @return string
     **/
    _getArticleTitle: function() {
      var doc = this._doc;
      var curTitle = "";
      var origTitle = "";
      try {
        curTitle = origTitle = doc.title.trim();
        if (typeof curTitle !== "string")
          curTitle = origTitle = this._getInnerText(doc.getElementsByTagName("title")[0]);
      } catch (e) {
      }
      var titleHadHierarchicalSeparators = false;
      function wordCount(str) {
        return str.split(/\s+/).length;
      }
      if (/ [\|\-\\\/>»] /.test(curTitle)) {
        titleHadHierarchicalSeparators = / [\\\/>»] /.test(curTitle);
        curTitle = origTitle.replace(/(.*)[\|\-\\\/>»] .*/gi, "$1");
        if (wordCount(curTitle) < 3)
          curTitle = origTitle.replace(/[^\|\-\\\/>»]*[\|\-\\\/>»](.*)/gi, "$1");
      } else if (curTitle.indexOf(": ") !== -1) {
        var headings = this._concatNodeLists(
          doc.getElementsByTagName("h1"),
          doc.getElementsByTagName("h2")
        );
        var trimmedTitle = curTitle.trim();
        var match = this._someNode(headings, function(heading) {
          return heading.textContent.trim() === trimmedTitle;
        });
        if (!match) {
          curTitle = origTitle.substring(origTitle.lastIndexOf(":") + 1);
          if (wordCount(curTitle) < 3) {
            curTitle = origTitle.substring(origTitle.indexOf(":") + 1);
          } else if (wordCount(origTitle.substr(0, origTitle.indexOf(":"))) > 5) {
            curTitle = origTitle;
          }
        }
      } else if (curTitle.length > 150 || curTitle.length < 15) {
        var hOnes = doc.getElementsByTagName("h1");
        if (hOnes.length === 1)
          curTitle = this._getInnerText(hOnes[0]);
      }
      curTitle = curTitle.trim().replace(this.REGEXPS.normalize, " ");
      var curTitleWordCount = wordCount(curTitle);
      if (curTitleWordCount <= 4 && (!titleHadHierarchicalSeparators || curTitleWordCount != wordCount(origTitle.replace(/[\|\-\\\/>»]+/g, "")) - 1)) {
        curTitle = origTitle;
      }
      return curTitle;
    },
    /**
     * Prepare the HTML document for readability to scrape it.
     * This includes things like stripping javascript, CSS, and handling terrible markup.
     *
     * @return void
     **/
    _prepDocument: function() {
      var doc = this._doc;
      this._removeNodes(this._getAllNodesWithTag(doc, ["style"]));
      if (doc.body) {
        this._replaceBrs(doc.body);
      }
      this._replaceNodeTags(this._getAllNodesWithTag(doc, ["font"]), "SPAN");
    },
    /**
     * Finds the next node, starting from the given node, and ignoring
     * whitespace in between. If the given node is an element, the same node is
     * returned.
     */
    _nextNode: function(node) {
      var next = node;
      while (next && next.nodeType != this.ELEMENT_NODE && this.REGEXPS.whitespace.test(next.textContent)) {
        next = next.nextSibling;
      }
      return next;
    },
    /**
     * Replaces 2 or more successive <br> elements with a single <p>.
     * Whitespace between <br> elements are ignored. For example:
     *   <div>foo<br>bar<br> <br><br>abc</div>
     * will become:
     *   <div>foo<br>bar<p>abc</p></div>
     */
    _replaceBrs: function(elem) {
      this._forEachNode(this._getAllNodesWithTag(elem, ["br"]), function(br) {
        var next = br.nextSibling;
        var replaced = false;
        while ((next = this._nextNode(next)) && next.tagName == "BR") {
          replaced = true;
          var brSibling = next.nextSibling;
          next.parentNode.removeChild(next);
          next = brSibling;
        }
        if (replaced) {
          var p2 = this._doc.createElement("p");
          br.parentNode.replaceChild(p2, br);
          next = p2.nextSibling;
          while (next) {
            if (next.tagName == "BR") {
              var nextElem = this._nextNode(next.nextSibling);
              if (nextElem && nextElem.tagName == "BR")
                break;
            }
            if (!this._isPhrasingContent(next))
              break;
            var sibling = next.nextSibling;
            p2.appendChild(next);
            next = sibling;
          }
          while (p2.lastChild && this._isWhitespace(p2.lastChild)) {
            p2.removeChild(p2.lastChild);
          }
          if (p2.parentNode.tagName === "P")
            this._setNodeTag(p2.parentNode, "DIV");
        }
      });
    },
    _setNodeTag: function(node, tag) {
      this.log("_setNodeTag", node, tag);
      if (this._docJSDOMParser) {
        node.localName = tag.toLowerCase();
        node.tagName = tag.toUpperCase();
        return node;
      }
      var replacement = node.ownerDocument.createElement(tag);
      while (node.firstChild) {
        replacement.appendChild(node.firstChild);
      }
      node.parentNode.replaceChild(replacement, node);
      if (node.readability)
        replacement.readability = node.readability;
      for (var i2 = 0; i2 < node.attributes.length; i2++) {
        try {
          replacement.setAttribute(node.attributes[i2].name, node.attributes[i2].value);
        } catch (ex) {
        }
      }
      return replacement;
    },
    /**
     * Prepare the article node for display. Clean out any inline styles,
     * iframes, forms, strip extraneous <p> tags, etc.
     *
     * @param Element
     * @return void
     **/
    _prepArticle: function(articleContent) {
      this._cleanStyles(articleContent);
      this._markDataTables(articleContent);
      this._fixLazyImages(articleContent);
      this._cleanConditionally(articleContent, "form");
      this._cleanConditionally(articleContent, "fieldset");
      this._clean(articleContent, "object");
      this._clean(articleContent, "embed");
      this._clean(articleContent, "footer");
      this._clean(articleContent, "link");
      this._clean(articleContent, "aside");
      var shareElementThreshold = this.DEFAULT_CHAR_THRESHOLD;
      this._forEachNode(articleContent.children, function(topCandidate) {
        this._cleanMatchedNodes(topCandidate, function(node, matchString) {
          return this.REGEXPS.shareElements.test(matchString) && node.textContent.length < shareElementThreshold;
        });
      });
      this._clean(articleContent, "iframe");
      this._clean(articleContent, "input");
      this._clean(articleContent, "textarea");
      this._clean(articleContent, "select");
      this._clean(articleContent, "button");
      this._cleanHeaders(articleContent);
      this._cleanConditionally(articleContent, "table");
      this._cleanConditionally(articleContent, "ul");
      this._cleanConditionally(articleContent, "div");
      this._replaceNodeTags(this._getAllNodesWithTag(articleContent, ["h1"]), "h2");
      this._removeNodes(this._getAllNodesWithTag(articleContent, ["p"]), function(paragraph) {
        var imgCount = paragraph.getElementsByTagName("img").length;
        var embedCount = paragraph.getElementsByTagName("embed").length;
        var objectCount = paragraph.getElementsByTagName("object").length;
        var iframeCount = paragraph.getElementsByTagName("iframe").length;
        var totalCount = imgCount + embedCount + objectCount + iframeCount;
        return totalCount === 0 && !this._getInnerText(paragraph, false);
      });
      this._forEachNode(this._getAllNodesWithTag(articleContent, ["br"]), function(br) {
        var next = this._nextNode(br.nextSibling);
        if (next && next.tagName == "P")
          br.parentNode.removeChild(br);
      });
      this._forEachNode(this._getAllNodesWithTag(articleContent, ["table"]), function(table) {
        var tbody = this._hasSingleTagInsideElement(table, "TBODY") ? table.firstElementChild : table;
        if (this._hasSingleTagInsideElement(tbody, "TR")) {
          var row = tbody.firstElementChild;
          if (this._hasSingleTagInsideElement(row, "TD")) {
            var cell = row.firstElementChild;
            cell = this._setNodeTag(cell, this._everyNode(cell.childNodes, this._isPhrasingContent) ? "P" : "DIV");
            table.parentNode.replaceChild(cell, table);
          }
        }
      });
    },
    /**
     * Initialize a node with the readability object. Also checks the
     * className/id for special names to add to its score.
     *
     * @param Element
     * @return void
    **/
    _initializeNode: function(node) {
      node.readability = { "contentScore": 0 };
      switch (node.tagName) {
        case "DIV":
          node.readability.contentScore += 5;
          break;
        case "PRE":
        case "TD":
        case "BLOCKQUOTE":
          node.readability.contentScore += 3;
          break;
        case "ADDRESS":
        case "OL":
        case "UL":
        case "DL":
        case "DD":
        case "DT":
        case "LI":
        case "FORM":
          node.readability.contentScore -= 3;
          break;
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
        case "TH":
          node.readability.contentScore -= 5;
          break;
      }
      node.readability.contentScore += this._getClassWeight(node);
    },
    _removeAndGetNext: function(node) {
      var nextNode = this._getNextNode(node, true);
      node.parentNode.removeChild(node);
      return nextNode;
    },
    /**
     * Traverse the DOM from node to node, starting at the node passed in.
     * Pass true for the second parameter to indicate this node itself
     * (and its kids) are going away, and we want the next node over.
     *
     * Calling this in a loop will traverse the DOM depth-first.
     */
    _getNextNode: function(node, ignoreSelfAndKids) {
      if (!ignoreSelfAndKids && node.firstElementChild) {
        return node.firstElementChild;
      }
      if (node.nextElementSibling) {
        return node.nextElementSibling;
      }
      do {
        node = node.parentNode;
      } while (node && !node.nextElementSibling);
      return node && node.nextElementSibling;
    },
    // compares second text to first one
    // 1 = same text, 0 = completely different text
    // works the way that it splits both texts into words and then finds words that are unique in second text
    // the result is given by the lower length of unique parts
    _textSimilarity: function(textA, textB) {
      var tokensA = textA.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
      var tokensB = textB.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
      if (!tokensA.length || !tokensB.length) {
        return 0;
      }
      var uniqTokensB = tokensB.filter((token) => !tokensA.includes(token));
      var distanceB = uniqTokensB.join(" ").length / tokensB.join(" ").length;
      return 1 - distanceB;
    },
    _checkByline: function(node, matchString) {
      if (this._articleByline) {
        return false;
      }
      if (node.getAttribute !== void 0) {
        var rel = node.getAttribute("rel");
        var itemprop = node.getAttribute("itemprop");
      }
      if ((rel === "author" || itemprop && itemprop.indexOf("author") !== -1 || this.REGEXPS.byline.test(matchString)) && this._isValidByline(node.textContent)) {
        this._articleByline = node.textContent.trim();
        return true;
      }
      return false;
    },
    _getNodeAncestors: function(node, maxDepth) {
      maxDepth = maxDepth || 0;
      var i2 = 0, ancestors = [];
      while (node.parentNode) {
        ancestors.push(node.parentNode);
        if (maxDepth && ++i2 === maxDepth)
          break;
        node = node.parentNode;
      }
      return ancestors;
    },
    /***
     * grabArticle - Using a variety of metrics (content score, classname, element types), find the content that is
     *         most likely to be the stuff a user wants to read. Then return it wrapped up in a div.
     *
     * @param page a document to run upon. Needs to be a full document, complete with body.
     * @return Element
    **/
    _grabArticle: function(page) {
      this.log("**** grabArticle ****");
      var doc = this._doc;
      var isPaging = page !== null;
      page = page ? page : this._doc.body;
      if (!page) {
        this.log("No body found in document. Abort.");
        return null;
      }
      var pageCacheHtml = page.innerHTML;
      while (true) {
        this.log("Starting grabArticle loop");
        var stripUnlikelyCandidates = this._flagIsActive(this.FLAG_STRIP_UNLIKELYS);
        var elementsToScore = [];
        var node = this._doc.documentElement;
        let shouldRemoveTitleHeader = true;
        while (node) {
          if (node.tagName === "HTML") {
            this._articleLang = node.getAttribute("lang");
          }
          var matchString = node.className + " " + node.id;
          if (!this._isProbablyVisible(node)) {
            this.log("Removing hidden node - " + matchString);
            node = this._removeAndGetNext(node);
            continue;
          }
          if (node.getAttribute("aria-modal") == "true" && node.getAttribute("role") == "dialog") {
            node = this._removeAndGetNext(node);
            continue;
          }
          if (this._checkByline(node, matchString)) {
            node = this._removeAndGetNext(node);
            continue;
          }
          if (shouldRemoveTitleHeader && this._headerDuplicatesTitle(node)) {
            this.log("Removing header: ", node.textContent.trim(), this._articleTitle.trim());
            shouldRemoveTitleHeader = false;
            node = this._removeAndGetNext(node);
            continue;
          }
          if (stripUnlikelyCandidates) {
            if (this.REGEXPS.unlikelyCandidates.test(matchString) && !this.REGEXPS.okMaybeItsACandidate.test(matchString) && !this._hasAncestorTag(node, "table") && !this._hasAncestorTag(node, "code") && node.tagName !== "BODY" && node.tagName !== "A") {
              this.log("Removing unlikely candidate - " + matchString);
              node = this._removeAndGetNext(node);
              continue;
            }
            if (this.UNLIKELY_ROLES.includes(node.getAttribute("role"))) {
              this.log("Removing content with role " + node.getAttribute("role") + " - " + matchString);
              node = this._removeAndGetNext(node);
              continue;
            }
          }
          if ((node.tagName === "DIV" || node.tagName === "SECTION" || node.tagName === "HEADER" || node.tagName === "H1" || node.tagName === "H2" || node.tagName === "H3" || node.tagName === "H4" || node.tagName === "H5" || node.tagName === "H6") && this._isElementWithoutContent(node)) {
            node = this._removeAndGetNext(node);
            continue;
          }
          if (this.DEFAULT_TAGS_TO_SCORE.indexOf(node.tagName) !== -1) {
            elementsToScore.push(node);
          }
          if (node.tagName === "DIV") {
            var p2 = null;
            var childNode = node.firstChild;
            while (childNode) {
              var nextSibling = childNode.nextSibling;
              if (this._isPhrasingContent(childNode)) {
                if (p2 !== null) {
                  p2.appendChild(childNode);
                } else if (!this._isWhitespace(childNode)) {
                  p2 = doc.createElement("p");
                  node.replaceChild(p2, childNode);
                  p2.appendChild(childNode);
                }
              } else if (p2 !== null) {
                while (p2.lastChild && this._isWhitespace(p2.lastChild)) {
                  p2.removeChild(p2.lastChild);
                }
                p2 = null;
              }
              childNode = nextSibling;
            }
            if (this._hasSingleTagInsideElement(node, "P") && this._getLinkDensity(node) < 0.25) {
              var newNode = node.children[0];
              node.parentNode.replaceChild(newNode, node);
              node = newNode;
              elementsToScore.push(node);
            } else if (!this._hasChildBlockElement(node)) {
              node = this._setNodeTag(node, "P");
              elementsToScore.push(node);
            }
          }
          node = this._getNextNode(node);
        }
        var candidates = [];
        this._forEachNode(elementsToScore, function(elementToScore) {
          if (!elementToScore.parentNode || typeof elementToScore.parentNode.tagName === "undefined")
            return;
          var innerText = this._getInnerText(elementToScore);
          if (innerText.length < 25)
            return;
          var ancestors2 = this._getNodeAncestors(elementToScore, 5);
          if (ancestors2.length === 0)
            return;
          var contentScore = 0;
          contentScore += 1;
          contentScore += innerText.split(",").length;
          contentScore += Math.min(Math.floor(innerText.length / 100), 3);
          this._forEachNode(ancestors2, function(ancestor, level) {
            if (!ancestor.tagName || !ancestor.parentNode || typeof ancestor.parentNode.tagName === "undefined")
              return;
            if (typeof ancestor.readability === "undefined") {
              this._initializeNode(ancestor);
              candidates.push(ancestor);
            }
            if (level === 0)
              var scoreDivider = 1;
            else if (level === 1)
              scoreDivider = 2;
            else
              scoreDivider = level * 3;
            ancestor.readability.contentScore += contentScore / scoreDivider;
          });
        });
        var topCandidates = [];
        for (var c2 = 0, cl = candidates.length; c2 < cl; c2 += 1) {
          var candidate = candidates[c2];
          var candidateScore = candidate.readability.contentScore * (1 - this._getLinkDensity(candidate));
          candidate.readability.contentScore = candidateScore;
          this.log("Candidate:", candidate, "with score " + candidateScore);
          for (var t = 0; t < this._nbTopCandidates; t++) {
            var aTopCandidate = topCandidates[t];
            if (!aTopCandidate || candidateScore > aTopCandidate.readability.contentScore) {
              topCandidates.splice(t, 0, candidate);
              if (topCandidates.length > this._nbTopCandidates)
                topCandidates.pop();
              break;
            }
          }
        }
        var topCandidate = topCandidates[0] || null;
        var neededToCreateTopCandidate = false;
        var parentOfTopCandidate;
        if (topCandidate === null || topCandidate.tagName === "BODY") {
          topCandidate = doc.createElement("DIV");
          neededToCreateTopCandidate = true;
          while (page.firstChild) {
            this.log("Moving child out:", page.firstChild);
            topCandidate.appendChild(page.firstChild);
          }
          page.appendChild(topCandidate);
          this._initializeNode(topCandidate);
        } else if (topCandidate) {
          var alternativeCandidateAncestors = [];
          for (var i2 = 1; i2 < topCandidates.length; i2++) {
            if (topCandidates[i2].readability.contentScore / topCandidate.readability.contentScore >= 0.75) {
              alternativeCandidateAncestors.push(this._getNodeAncestors(topCandidates[i2]));
            }
          }
          var MINIMUM_TOPCANDIDATES = 3;
          if (alternativeCandidateAncestors.length >= MINIMUM_TOPCANDIDATES) {
            parentOfTopCandidate = topCandidate.parentNode;
            while (parentOfTopCandidate.tagName !== "BODY") {
              var listsContainingThisAncestor = 0;
              for (var ancestorIndex = 0; ancestorIndex < alternativeCandidateAncestors.length && listsContainingThisAncestor < MINIMUM_TOPCANDIDATES; ancestorIndex++) {
                listsContainingThisAncestor += Number(alternativeCandidateAncestors[ancestorIndex].includes(parentOfTopCandidate));
              }
              if (listsContainingThisAncestor >= MINIMUM_TOPCANDIDATES) {
                topCandidate = parentOfTopCandidate;
                break;
              }
              parentOfTopCandidate = parentOfTopCandidate.parentNode;
            }
          }
          if (!topCandidate.readability) {
            this._initializeNode(topCandidate);
          }
          parentOfTopCandidate = topCandidate.parentNode;
          var lastScore = topCandidate.readability.contentScore;
          var scoreThreshold = lastScore / 3;
          while (parentOfTopCandidate.tagName !== "BODY") {
            if (!parentOfTopCandidate.readability) {
              parentOfTopCandidate = parentOfTopCandidate.parentNode;
              continue;
            }
            var parentScore = parentOfTopCandidate.readability.contentScore;
            if (parentScore < scoreThreshold)
              break;
            if (parentScore > lastScore) {
              topCandidate = parentOfTopCandidate;
              break;
            }
            lastScore = parentOfTopCandidate.readability.contentScore;
            parentOfTopCandidate = parentOfTopCandidate.parentNode;
          }
          parentOfTopCandidate = topCandidate.parentNode;
          while (parentOfTopCandidate.tagName != "BODY" && parentOfTopCandidate.children.length == 1) {
            topCandidate = parentOfTopCandidate;
            parentOfTopCandidate = topCandidate.parentNode;
          }
          if (!topCandidate.readability) {
            this._initializeNode(topCandidate);
          }
        }
        var articleContent = doc.createElement("DIV");
        if (isPaging)
          articleContent.id = "readability-content";
        var siblingScoreThreshold = Math.max(10, topCandidate.readability.contentScore * 0.2);
        parentOfTopCandidate = topCandidate.parentNode;
        var siblings = parentOfTopCandidate.children;
        for (var s2 = 0, sl = siblings.length; s2 < sl; s2++) {
          var sibling = siblings[s2];
          var append = false;
          this.log("Looking at sibling node:", sibling, sibling.readability ? "with score " + sibling.readability.contentScore : "");
          this.log("Sibling has score", sibling.readability ? sibling.readability.contentScore : "Unknown");
          if (sibling === topCandidate) {
            append = true;
          } else {
            var contentBonus = 0;
            if (sibling.className === topCandidate.className && topCandidate.className !== "")
              contentBonus += topCandidate.readability.contentScore * 0.2;
            if (sibling.readability && sibling.readability.contentScore + contentBonus >= siblingScoreThreshold) {
              append = true;
            } else if (sibling.nodeName === "P") {
              var linkDensity = this._getLinkDensity(sibling);
              var nodeContent = this._getInnerText(sibling);
              var nodeLength = nodeContent.length;
              if (nodeLength > 80 && linkDensity < 0.25) {
                append = true;
              } else if (nodeLength < 80 && nodeLength > 0 && linkDensity === 0 && nodeContent.search(/\.( |$)/) !== -1) {
                append = true;
              }
            }
          }
          if (append) {
            this.log("Appending node:", sibling);
            if (this.ALTER_TO_DIV_EXCEPTIONS.indexOf(sibling.nodeName) === -1) {
              this.log("Altering sibling:", sibling, "to div.");
              sibling = this._setNodeTag(sibling, "DIV");
            }
            articleContent.appendChild(sibling);
            siblings = parentOfTopCandidate.children;
            s2 -= 1;
            sl -= 1;
          }
        }
        if (this._debug)
          this.log("Article content pre-prep: " + articleContent.innerHTML);
        this._prepArticle(articleContent);
        if (this._debug)
          this.log("Article content post-prep: " + articleContent.innerHTML);
        if (neededToCreateTopCandidate) {
          topCandidate.id = "readability-page-1";
          topCandidate.className = "page";
        } else {
          var div = doc.createElement("DIV");
          div.id = "readability-page-1";
          div.className = "page";
          while (articleContent.firstChild) {
            div.appendChild(articleContent.firstChild);
          }
          articleContent.appendChild(div);
        }
        if (this._debug)
          this.log("Article content after paging: " + articleContent.innerHTML);
        var parseSuccessful = true;
        var textLength = this._getInnerText(articleContent, true).length;
        if (textLength < this._charThreshold) {
          parseSuccessful = false;
          page.innerHTML = pageCacheHtml;
          if (this._flagIsActive(this.FLAG_STRIP_UNLIKELYS)) {
            this._removeFlag(this.FLAG_STRIP_UNLIKELYS);
            this._attempts.push({ articleContent, textLength });
          } else if (this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) {
            this._removeFlag(this.FLAG_WEIGHT_CLASSES);
            this._attempts.push({ articleContent, textLength });
          } else if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) {
            this._removeFlag(this.FLAG_CLEAN_CONDITIONALLY);
            this._attempts.push({ articleContent, textLength });
          } else {
            this._attempts.push({ articleContent, textLength });
            this._attempts.sort(function(a2, b2) {
              return b2.textLength - a2.textLength;
            });
            if (!this._attempts[0].textLength) {
              return null;
            }
            articleContent = this._attempts[0].articleContent;
            parseSuccessful = true;
          }
        }
        if (parseSuccessful) {
          var ancestors = [parentOfTopCandidate, topCandidate].concat(this._getNodeAncestors(parentOfTopCandidate));
          this._someNode(ancestors, function(ancestor) {
            if (!ancestor.tagName)
              return false;
            var articleDir = ancestor.getAttribute("dir");
            if (articleDir) {
              this._articleDir = articleDir;
              return true;
            }
            return false;
          });
          return articleContent;
        }
      }
    },
    /**
     * Check whether the input string could be a byline.
     * This verifies that the input is a string, and that the length
     * is less than 100 chars.
     *
     * @param possibleByline {string} - a string to check whether its a byline.
     * @return Boolean - whether the input string is a byline.
     */
    _isValidByline: function(byline) {
      if (typeof byline == "string" || byline instanceof String) {
        byline = byline.trim();
        return byline.length > 0 && byline.length < 100;
      }
      return false;
    },
    /**
     * Converts some of the common HTML entities in string to their corresponding characters.
     *
     * @param str {string} - a string to unescape.
     * @return string without HTML entity.
     */
    _unescapeHtmlEntities: function(str) {
      if (!str) {
        return str;
      }
      var htmlEscapeMap = this.HTML_ESCAPE_MAP;
      return str.replace(/&(quot|amp|apos|lt|gt);/g, function(_2, tag) {
        return htmlEscapeMap[tag];
      }).replace(/&#(?:x([0-9a-z]{1,4})|([0-9]{1,4}));/gi, function(_2, hex, numStr) {
        var num = parseInt(hex || numStr, hex ? 16 : 10);
        return String.fromCharCode(num);
      });
    },
    /**
     * Try to extract metadata from JSON-LD object.
     * For now, only Schema.org objects of type Article or its subtypes are supported.
     * @return Object with any metadata that could be extracted (possibly none)
     */
    _getJSONLD: function(doc) {
      var scripts = this._getAllNodesWithTag(doc, ["script"]);
      var metadata;
      this._forEachNode(scripts, function(jsonLdElement) {
        if (!metadata && jsonLdElement.getAttribute("type") === "application/ld+json") {
          try {
            var content = jsonLdElement.textContent.replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "");
            var parsed = JSON.parse(content);
            if (!parsed["@context"] || !parsed["@context"].match(/^https?\:\/\/schema\.org$/)) {
              return;
            }
            if (!parsed["@type"] && Array.isArray(parsed["@graph"])) {
              parsed = parsed["@graph"].find(function(it2) {
                return (it2["@type"] || "").match(
                  this.REGEXPS.jsonLdArticleTypes
                );
              });
            }
            if (!parsed || !parsed["@type"] || !parsed["@type"].match(this.REGEXPS.jsonLdArticleTypes)) {
              return;
            }
            metadata = {};
            if (typeof parsed.name === "string" && typeof parsed.headline === "string" && parsed.name !== parsed.headline) {
              var title = this._getArticleTitle();
              var nameMatches = this._textSimilarity(parsed.name, title) > 0.75;
              var headlineMatches = this._textSimilarity(parsed.headline, title) > 0.75;
              if (headlineMatches && !nameMatches) {
                metadata.title = parsed.headline;
              } else {
                metadata.title = parsed.name;
              }
            } else if (typeof parsed.name === "string") {
              metadata.title = parsed.name.trim();
            } else if (typeof parsed.headline === "string") {
              metadata.title = parsed.headline.trim();
            }
            if (parsed.author) {
              if (typeof parsed.author.name === "string") {
                metadata.byline = parsed.author.name.trim();
              } else if (Array.isArray(parsed.author) && parsed.author[0] && typeof parsed.author[0].name === "string") {
                metadata.byline = parsed.author.filter(function(author) {
                  return author && typeof author.name === "string";
                }).map(function(author) {
                  return author.name.trim();
                }).join(", ");
              }
            }
            if (typeof parsed.description === "string") {
              metadata.excerpt = parsed.description.trim();
            }
            if (parsed.publisher && typeof parsed.publisher.name === "string") {
              metadata.siteName = parsed.publisher.name.trim();
            }
            return;
          } catch (err) {
            this.log(err.message);
          }
        }
      });
      return metadata ? metadata : {};
    },
    /**
     * Attempts to get excerpt and byline metadata for the article.
     *
     * @param {Object} jsonld — object containing any metadata that
     * could be extracted from JSON-LD object.
     *
     * @return Object with optional "excerpt" and "byline" properties
     */
    _getArticleMetadata: function(jsonld) {
      var metadata = {};
      var values = {};
      var metaElements = this._doc.getElementsByTagName("meta");
      var propertyPattern = /\s*(dc|dcterm|og|twitter)\s*:\s*(author|creator|description|title|site_name)\s*/gi;
      var namePattern = /^\s*(?:(dc|dcterm|og|twitter|weibo:(article|webpage))\s*[\.:]\s*)?(author|creator|description|title|site_name)\s*$/i;
      this._forEachNode(metaElements, function(element) {
        var elementName = element.getAttribute("name");
        var elementProperty = element.getAttribute("property");
        var content = element.getAttribute("content");
        if (!content) {
          return;
        }
        var matches = null;
        var name = null;
        if (elementProperty) {
          matches = elementProperty.match(propertyPattern);
          if (matches) {
            name = matches[0].toLowerCase().replace(/\s/g, "");
            values[name] = content.trim();
          }
        }
        if (!matches && elementName && namePattern.test(elementName)) {
          name = elementName;
          if (content) {
            name = name.toLowerCase().replace(/\s/g, "").replace(/\./g, ":");
            values[name] = content.trim();
          }
        }
      });
      metadata.title = jsonld.title || values["dc:title"] || values["dcterm:title"] || values["og:title"] || values["weibo:article:title"] || values["weibo:webpage:title"] || values["title"] || values["twitter:title"];
      if (!metadata.title) {
        metadata.title = this._getArticleTitle();
      }
      metadata.byline = jsonld.byline || values["dc:creator"] || values["dcterm:creator"] || values["author"];
      metadata.excerpt = jsonld.excerpt || values["dc:description"] || values["dcterm:description"] || values["og:description"] || values["weibo:article:description"] || values["weibo:webpage:description"] || values["description"] || values["twitter:description"];
      metadata.siteName = jsonld.siteName || values["og:site_name"];
      metadata.title = this._unescapeHtmlEntities(metadata.title);
      metadata.byline = this._unescapeHtmlEntities(metadata.byline);
      metadata.excerpt = this._unescapeHtmlEntities(metadata.excerpt);
      metadata.siteName = this._unescapeHtmlEntities(metadata.siteName);
      return metadata;
    },
    /**
     * Check if node is image, or if node contains exactly only one image
     * whether as a direct child or as its descendants.
     *
     * @param Element
    **/
    _isSingleImage: function(node) {
      if (node.tagName === "IMG") {
        return true;
      }
      if (node.children.length !== 1 || node.textContent.trim() !== "") {
        return false;
      }
      return this._isSingleImage(node.children[0]);
    },
    /**
     * Find all <noscript> that are located after <img> nodes, and which contain only one
     * <img> element. Replace the first image with the image from inside the <noscript> tag,
     * and remove the <noscript> tag. This improves the quality of the images we use on
     * some sites (e.g. Medium).
     *
     * @param Element
    **/
    _unwrapNoscriptImages: function(doc) {
      var imgs = Array.from(doc.getElementsByTagName("img"));
      this._forEachNode(imgs, function(img) {
        for (var i2 = 0; i2 < img.attributes.length; i2++) {
          var attr = img.attributes[i2];
          switch (attr.name) {
            case "src":
            case "srcset":
            case "data-src":
            case "data-srcset":
              return;
          }
          if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
            return;
          }
        }
        img.parentNode.removeChild(img);
      });
      var noscripts = Array.from(doc.getElementsByTagName("noscript"));
      this._forEachNode(noscripts, function(noscript) {
        var tmp = doc.createElement("div");
        tmp.innerHTML = noscript.innerHTML;
        if (!this._isSingleImage(tmp)) {
          return;
        }
        var prevElement = noscript.previousElementSibling;
        if (prevElement && this._isSingleImage(prevElement)) {
          var prevImg = prevElement;
          if (prevImg.tagName !== "IMG") {
            prevImg = prevElement.getElementsByTagName("img")[0];
          }
          var newImg = tmp.getElementsByTagName("img")[0];
          for (var i2 = 0; i2 < prevImg.attributes.length; i2++) {
            var attr = prevImg.attributes[i2];
            if (attr.value === "") {
              continue;
            }
            if (attr.name === "src" || attr.name === "srcset" || /\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
              if (newImg.getAttribute(attr.name) === attr.value) {
                continue;
              }
              var attrName = attr.name;
              if (newImg.hasAttribute(attrName)) {
                attrName = "data-old-" + attrName;
              }
              newImg.setAttribute(attrName, attr.value);
            }
          }
          noscript.parentNode.replaceChild(tmp.firstElementChild, prevElement);
        }
      });
    },
    /**
     * Removes script tags from the document.
     *
     * @param Element
    **/
    _removeScripts: function(doc) {
      this._removeNodes(this._getAllNodesWithTag(doc, ["script", "noscript"]));
    },
    /**
     * Check if this node has only whitespace and a single element with given tag
     * Returns false if the DIV node contains non-empty text nodes
     * or if it contains no element with given tag or more than 1 element.
     *
     * @param Element
     * @param string tag of child element
    **/
    _hasSingleTagInsideElement: function(element, tag) {
      if (element.children.length != 1 || element.children[0].tagName !== tag) {
        return false;
      }
      return !this._someNode(element.childNodes, function(node) {
        return node.nodeType === this.TEXT_NODE && this.REGEXPS.hasContent.test(node.textContent);
      });
    },
    _isElementWithoutContent: function(node) {
      return node.nodeType === this.ELEMENT_NODE && node.textContent.trim().length == 0 && (node.children.length == 0 || node.children.length == node.getElementsByTagName("br").length + node.getElementsByTagName("hr").length);
    },
    /**
     * Determine whether element has any children block level elements.
     *
     * @param Element
     */
    _hasChildBlockElement: function(element) {
      return this._someNode(element.childNodes, function(node) {
        return this.DIV_TO_P_ELEMS.has(node.tagName) || this._hasChildBlockElement(node);
      });
    },
    /***
     * Determine if a node qualifies as phrasing content.
     * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content
    **/
    _isPhrasingContent: function(node) {
      return node.nodeType === this.TEXT_NODE || this.PHRASING_ELEMS.indexOf(node.tagName) !== -1 || (node.tagName === "A" || node.tagName === "DEL" || node.tagName === "INS") && this._everyNode(node.childNodes, this._isPhrasingContent);
    },
    _isWhitespace: function(node) {
      return node.nodeType === this.TEXT_NODE && node.textContent.trim().length === 0 || node.nodeType === this.ELEMENT_NODE && node.tagName === "BR";
    },
    /**
     * Get the inner text of a node - cross browser compatibly.
     * This also strips out any excess whitespace to be found.
     *
     * @param Element
     * @param Boolean normalizeSpaces (default: true)
     * @return string
    **/
    _getInnerText: function(e, normalizeSpaces) {
      normalizeSpaces = typeof normalizeSpaces === "undefined" ? true : normalizeSpaces;
      var textContent = e.textContent.trim();
      if (normalizeSpaces) {
        return textContent.replace(this.REGEXPS.normalize, " ");
      }
      return textContent;
    },
    /**
     * Get the number of times a string s appears in the node e.
     *
     * @param Element
     * @param string - what to split on. Default is ","
     * @return number (integer)
    **/
    _getCharCount: function(e, s2) {
      s2 = s2 || ",";
      return this._getInnerText(e).split(s2).length - 1;
    },
    /**
     * Remove the style attribute on every e and under.
     * TODO: Test if getElementsByTagName(*) is faster.
     *
     * @param Element
     * @return void
    **/
    _cleanStyles: function(e) {
      if (!e || e.tagName.toLowerCase() === "svg")
        return;
      for (var i2 = 0; i2 < this.PRESENTATIONAL_ATTRIBUTES.length; i2++) {
        e.removeAttribute(this.PRESENTATIONAL_ATTRIBUTES[i2]);
      }
      if (this.DEPRECATED_SIZE_ATTRIBUTE_ELEMS.indexOf(e.tagName) !== -1) {
        e.removeAttribute("width");
        e.removeAttribute("height");
      }
      var cur = e.firstElementChild;
      while (cur !== null) {
        this._cleanStyles(cur);
        cur = cur.nextElementSibling;
      }
    },
    /**
     * Get the density of links as a percentage of the content
     * This is the amount of text that is inside a link divided by the total text in the node.
     *
     * @param Element
     * @return number (float)
    **/
    _getLinkDensity: function(element) {
      var textLength = this._getInnerText(element).length;
      if (textLength === 0)
        return 0;
      var linkLength = 0;
      this._forEachNode(element.getElementsByTagName("a"), function(linkNode) {
        var href = linkNode.getAttribute("href");
        var coefficient = href && this.REGEXPS.hashUrl.test(href) ? 0.3 : 1;
        linkLength += this._getInnerText(linkNode).length * coefficient;
      });
      return linkLength / textLength;
    },
    /**
     * Get an elements class/id weight. Uses regular expressions to tell if this
     * element looks good or bad.
     *
     * @param Element
     * @return number (Integer)
    **/
    _getClassWeight: function(e) {
      if (!this._flagIsActive(this.FLAG_WEIGHT_CLASSES))
        return 0;
      var weight = 0;
      if (typeof e.className === "string" && e.className !== "") {
        if (this.REGEXPS.negative.test(e.className))
          weight -= 25;
        if (this.REGEXPS.positive.test(e.className))
          weight += 25;
      }
      if (typeof e.id === "string" && e.id !== "") {
        if (this.REGEXPS.negative.test(e.id))
          weight -= 25;
        if (this.REGEXPS.positive.test(e.id))
          weight += 25;
      }
      return weight;
    },
    /**
     * Clean a node of all elements of type "tag".
     * (Unless it's a youtube/vimeo video. People love movies.)
     *
     * @param Element
     * @param string tag to clean
     * @return void
     **/
    _clean: function(e, tag) {
      var isEmbed = ["object", "embed", "iframe"].indexOf(tag) !== -1;
      this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(element) {
        if (isEmbed) {
          for (var i2 = 0; i2 < element.attributes.length; i2++) {
            if (this._allowedVideoRegex.test(element.attributes[i2].value)) {
              return false;
            }
          }
          if (element.tagName === "object" && this._allowedVideoRegex.test(element.innerHTML)) {
            return false;
          }
        }
        return true;
      });
    },
    /**
     * Check if a given node has one of its ancestor tag name matching the
     * provided one.
     * @param  HTMLElement node
     * @param  String      tagName
     * @param  Number      maxDepth
     * @param  Function    filterFn a filter to invoke to determine whether this node 'counts'
     * @return Boolean
     */
    _hasAncestorTag: function(node, tagName, maxDepth, filterFn) {
      maxDepth = maxDepth || 3;
      tagName = tagName.toUpperCase();
      var depth = 0;
      while (node.parentNode) {
        if (maxDepth > 0 && depth > maxDepth)
          return false;
        if (node.parentNode.tagName === tagName && (!filterFn || filterFn(node.parentNode)))
          return true;
        node = node.parentNode;
        depth++;
      }
      return false;
    },
    /**
     * Return an object indicating how many rows and columns this table has.
     */
    _getRowAndColumnCount: function(table) {
      var rows = 0;
      var columns = 0;
      var trs = table.getElementsByTagName("tr");
      for (var i2 = 0; i2 < trs.length; i2++) {
        var rowspan = trs[i2].getAttribute("rowspan") || 0;
        if (rowspan) {
          rowspan = parseInt(rowspan, 10);
        }
        rows += rowspan || 1;
        var columnsInThisRow = 0;
        var cells = trs[i2].getElementsByTagName("td");
        for (var j = 0; j < cells.length; j++) {
          var colspan = cells[j].getAttribute("colspan") || 0;
          if (colspan) {
            colspan = parseInt(colspan, 10);
          }
          columnsInThisRow += colspan || 1;
        }
        columns = Math.max(columns, columnsInThisRow);
      }
      return { rows, columns };
    },
    /**
     * Look for 'data' (as opposed to 'layout') tables, for which we use
     * similar checks as
     * https://searchfox.org/mozilla-central/rev/f82d5c549f046cb64ce5602bfd894b7ae807c8f8/accessible/generic/TableAccessible.cpp#19
     */
    _markDataTables: function(root) {
      var tables = root.getElementsByTagName("table");
      for (var i2 = 0; i2 < tables.length; i2++) {
        var table = tables[i2];
        var role = table.getAttribute("role");
        if (role == "presentation") {
          table._readabilityDataTable = false;
          continue;
        }
        var datatable = table.getAttribute("datatable");
        if (datatable == "0") {
          table._readabilityDataTable = false;
          continue;
        }
        var summary = table.getAttribute("summary");
        if (summary) {
          table._readabilityDataTable = true;
          continue;
        }
        var caption = table.getElementsByTagName("caption")[0];
        if (caption && caption.childNodes.length > 0) {
          table._readabilityDataTable = true;
          continue;
        }
        var dataTableDescendants = ["col", "colgroup", "tfoot", "thead", "th"];
        var descendantExists = function(tag) {
          return !!table.getElementsByTagName(tag)[0];
        };
        if (dataTableDescendants.some(descendantExists)) {
          this.log("Data table because found data-y descendant");
          table._readabilityDataTable = true;
          continue;
        }
        if (table.getElementsByTagName("table")[0]) {
          table._readabilityDataTable = false;
          continue;
        }
        var sizeInfo = this._getRowAndColumnCount(table);
        if (sizeInfo.rows >= 10 || sizeInfo.columns > 4) {
          table._readabilityDataTable = true;
          continue;
        }
        table._readabilityDataTable = sizeInfo.rows * sizeInfo.columns > 10;
      }
    },
    /* convert images and figures that have properties like data-src into images that can be loaded without JS */
    _fixLazyImages: function(root) {
      this._forEachNode(this._getAllNodesWithTag(root, ["img", "picture", "figure"]), function(elem) {
        if (elem.src && this.REGEXPS.b64DataUrl.test(elem.src)) {
          var parts = this.REGEXPS.b64DataUrl.exec(elem.src);
          if (parts[1] === "image/svg+xml") {
            return;
          }
          var srcCouldBeRemoved = false;
          for (var i2 = 0; i2 < elem.attributes.length; i2++) {
            var attr = elem.attributes[i2];
            if (attr.name === "src") {
              continue;
            }
            if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
              srcCouldBeRemoved = true;
              break;
            }
          }
          if (srcCouldBeRemoved) {
            var b64starts = elem.src.search(/base64\s*/i) + 7;
            var b64length = elem.src.length - b64starts;
            if (b64length < 133) {
              elem.removeAttribute("src");
            }
          }
        }
        if ((elem.src || elem.srcset && elem.srcset != "null") && elem.className.toLowerCase().indexOf("lazy") === -1) {
          return;
        }
        for (var j = 0; j < elem.attributes.length; j++) {
          attr = elem.attributes[j];
          if (attr.name === "src" || attr.name === "srcset" || attr.name === "alt") {
            continue;
          }
          var copyTo = null;
          if (/\.(jpg|jpeg|png|webp)\s+\d/.test(attr.value)) {
            copyTo = "srcset";
          } else if (/^\s*\S+\.(jpg|jpeg|png|webp)\S*\s*$/.test(attr.value)) {
            copyTo = "src";
          }
          if (copyTo) {
            if (elem.tagName === "IMG" || elem.tagName === "PICTURE") {
              elem.setAttribute(copyTo, attr.value);
            } else if (elem.tagName === "FIGURE" && !this._getAllNodesWithTag(elem, ["img", "picture"]).length) {
              var img = this._doc.createElement("img");
              img.setAttribute(copyTo, attr.value);
              elem.appendChild(img);
            }
          }
        }
      });
    },
    _getTextDensity: function(e, tags) {
      var textLength = this._getInnerText(e, true).length;
      if (textLength === 0) {
        return 0;
      }
      var childrenLength = 0;
      var children = this._getAllNodesWithTag(e, tags);
      this._forEachNode(children, (child) => childrenLength += this._getInnerText(child, true).length);
      return childrenLength / textLength;
    },
    /**
     * Clean an element of all tags of type "tag" if they look fishy.
     * "Fishy" is an algorithm based on content length, classnames, link density, number of images & embeds, etc.
     *
     * @return void
     **/
    _cleanConditionally: function(e, tag) {
      if (!this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY))
        return;
      this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(node) {
        var isDataTable = function(t) {
          return t._readabilityDataTable;
        };
        var isList = tag === "ul" || tag === "ol";
        if (!isList) {
          var listLength = 0;
          var listNodes = this._getAllNodesWithTag(node, ["ul", "ol"]);
          this._forEachNode(listNodes, (list) => listLength += this._getInnerText(list).length);
          isList = listLength / this._getInnerText(node).length > 0.9;
        }
        if (tag === "table" && isDataTable(node)) {
          return false;
        }
        if (this._hasAncestorTag(node, "table", -1, isDataTable)) {
          return false;
        }
        if (this._hasAncestorTag(node, "code")) {
          return false;
        }
        var weight = this._getClassWeight(node);
        this.log("Cleaning Conditionally", node);
        var contentScore = 0;
        if (weight + contentScore < 0) {
          return true;
        }
        if (this._getCharCount(node, ",") < 10) {
          var p2 = node.getElementsByTagName("p").length;
          var img = node.getElementsByTagName("img").length;
          var li = node.getElementsByTagName("li").length - 100;
          var input = node.getElementsByTagName("input").length;
          var headingDensity = this._getTextDensity(node, ["h1", "h2", "h3", "h4", "h5", "h6"]);
          var embedCount = 0;
          var embeds = this._getAllNodesWithTag(node, ["object", "embed", "iframe"]);
          for (var i2 = 0; i2 < embeds.length; i2++) {
            for (var j = 0; j < embeds[i2].attributes.length; j++) {
              if (this._allowedVideoRegex.test(embeds[i2].attributes[j].value)) {
                return false;
              }
            }
            if (embeds[i2].tagName === "object" && this._allowedVideoRegex.test(embeds[i2].innerHTML)) {
              return false;
            }
            embedCount++;
          }
          var linkDensity = this._getLinkDensity(node);
          var contentLength = this._getInnerText(node).length;
          var haveToRemove = img > 1 && p2 / img < 0.5 && !this._hasAncestorTag(node, "figure") || !isList && li > p2 || input > Math.floor(p2 / 3) || !isList && headingDensity < 0.9 && contentLength < 25 && (img === 0 || img > 2) && !this._hasAncestorTag(node, "figure") || !isList && weight < 25 && linkDensity > 0.2 || weight >= 25 && linkDensity > 0.5 || (embedCount === 1 && contentLength < 75 || embedCount > 1);
          if (isList && haveToRemove) {
            for (var x2 = 0; x2 < node.children.length; x2++) {
              let child = node.children[x2];
              if (child.children.length > 1) {
                return haveToRemove;
              }
            }
            let li_count = node.getElementsByTagName("li").length;
            if (img == li_count) {
              return false;
            }
          }
          return haveToRemove;
        }
        return false;
      });
    },
    /**
     * Clean out elements that match the specified conditions
     *
     * @param Element
     * @param Function determines whether a node should be removed
     * @return void
     **/
    _cleanMatchedNodes: function(e, filter) {
      var endOfSearchMarkerNode = this._getNextNode(e, true);
      var next = this._getNextNode(e);
      while (next && next != endOfSearchMarkerNode) {
        if (filter.call(this, next, next.className + " " + next.id)) {
          next = this._removeAndGetNext(next);
        } else {
          next = this._getNextNode(next);
        }
      }
    },
    /**
     * Clean out spurious headers from an Element.
     *
     * @param Element
     * @return void
    **/
    _cleanHeaders: function(e) {
      let headingNodes = this._getAllNodesWithTag(e, ["h1", "h2"]);
      this._removeNodes(headingNodes, function(node) {
        let shouldRemove = this._getClassWeight(node) < 0;
        if (shouldRemove) {
          this.log("Removing header with low class weight:", node);
        }
        return shouldRemove;
      });
    },
    /**
     * Check if this node is an H1 or H2 element whose content is mostly
     * the same as the article title.
     *
     * @param Element  the node to check.
     * @return boolean indicating whether this is a title-like header.
     */
    _headerDuplicatesTitle: function(node) {
      if (node.tagName != "H1" && node.tagName != "H2") {
        return false;
      }
      var heading = this._getInnerText(node, false);
      this.log("Evaluating similarity of header:", heading, this._articleTitle);
      return this._textSimilarity(this._articleTitle, heading) > 0.75;
    },
    _flagIsActive: function(flag) {
      return (this._flags & flag) > 0;
    },
    _removeFlag: function(flag) {
      this._flags = this._flags & ~flag;
    },
    _isProbablyVisible: function(node) {
      return (!node.style || node.style.display != "none") && !node.hasAttribute("hidden") && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || node.className && node.className.indexOf && node.className.indexOf("fallback-image") !== -1);
    },
    /**
     * Runs readability.
     *
     * Workflow:
     *  1. Prep the document by removing script tags, css, etc.
     *  2. Build readability's DOM tree.
     *  3. Grab the article content from the current dom tree.
     *  4. Replace the current DOM tree with the new one.
     *  5. Read peacefully.
     *
     * @return void
     **/
    parse: function() {
      if (this._maxElemsToParse > 0) {
        var numTags = this._doc.getElementsByTagName("*").length;
        if (numTags > this._maxElemsToParse) {
          throw new Error("Aborting parsing document; " + numTags + " elements found");
        }
      }
      this._unwrapNoscriptImages(this._doc);
      var jsonLd = this._disableJSONLD ? {} : this._getJSONLD(this._doc);
      this._removeScripts(this._doc);
      this._prepDocument();
      var metadata = this._getArticleMetadata(jsonLd);
      this._articleTitle = metadata.title;
      var articleContent = this._grabArticle();
      if (!articleContent)
        return null;
      this.log("Grabbed: " + articleContent.innerHTML);
      this._postProcessContent(articleContent);
      if (!metadata.excerpt) {
        var paragraphs = articleContent.getElementsByTagName("p");
        if (paragraphs.length > 0) {
          metadata.excerpt = paragraphs[0].textContent.trim();
        }
      }
      var textContent = articleContent.textContent;
      return {
        title: this._articleTitle,
        byline: metadata.byline || this._articleByline,
        dir: this._articleDir,
        lang: this._articleLang,
        content: this._serializer(articleContent),
        textContent,
        length: textContent.length,
        excerpt: metadata.excerpt,
        siteName: metadata.siteName || this._articleSiteName
      };
    }
  };
  {
    module.exports = Readability2;
  }
})(Readability$1);
var ReadabilityReaderableExports = {};
var ReadabilityReaderable = {
  get exports() {
    return ReadabilityReaderableExports;
  },
  set exports(v2) {
    ReadabilityReaderableExports = v2;
  }
};
(function(module) {
  var REGEXPS = {
    // NOTE: These two regular expressions are duplicated in
    // Readability.js. Please keep both copies in sync.
    unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
    okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i
  };
  function isNodeVisible(node) {
    return (!node.style || node.style.display != "none") && !node.hasAttribute("hidden") && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || node.className && node.className.indexOf && node.className.indexOf("fallback-image") !== -1);
  }
  function isProbablyReaderable2(doc, options = {}) {
    if (typeof options == "function") {
      options = { visibilityChecker: options };
    }
    var defaultOptions = { minScore: 20, minContentLength: 140, visibilityChecker: isNodeVisible };
    options = Object.assign(defaultOptions, options);
    var nodes = doc.querySelectorAll("p, pre, article");
    var brNodes = doc.querySelectorAll("div > br");
    if (brNodes.length) {
      var set = new Set(nodes);
      [].forEach.call(brNodes, function(node) {
        set.add(node.parentNode);
      });
      nodes = Array.from(set);
    }
    var score = 0;
    return [].some.call(nodes, function(node) {
      if (!options.visibilityChecker(node)) {
        return false;
      }
      var matchString = node.className + " " + node.id;
      if (REGEXPS.unlikelyCandidates.test(matchString) && !REGEXPS.okMaybeItsACandidate.test(matchString)) {
        return false;
      }
      if (node.matches("li p")) {
        return false;
      }
      var textContentLength = node.textContent.trim().length;
      if (textContentLength < options.minContentLength) {
        return false;
      }
      score += Math.sqrt(textContentLength - options.minContentLength);
      if (score > options.minScore) {
        return true;
      }
      return false;
    });
  }
  {
    module.exports = isProbablyReaderable2;
  }
})(ReadabilityReaderable);
var Readability = ReadabilityExports;
var isProbablyReaderable = ReadabilityReaderableExports;
var readability = {
  Readability,
  isProbablyReaderable
};
function splitSentences(text) {
  const lang = franc(text.length > 30 ? text.slice(0, 30) : text);
  switch (lang) {
    case "eng":
      return text.split(/[.!?,]/);
    case "cmn":
      return text.split(/[。！？，]/);
    case "jpn":
      return text.split(/[。！？，．]/);
    case "kor":
      return text.split(/[.!?，]/);
    default:
      return text.split(/[.!?,]/);
  }
}
function sentenceIntersectionSimilarity(text1, text2) {
  const sentences1 = text1;
  const sentences2 = text2;
  const intersection = new Set([...sentences1].filter((sentence) => sentences2.has(sentence)));
  return intersection.size / sentences1.size;
}
function getElementDepth(element) {
  let depth = 0;
  while (element && element.parentNode) {
    depth++;
    element = element.parentNode;
  }
  return depth;
}
function findMostSimilarDeepestElement(text, container) {
  const allElements = Array.from(container.querySelectorAll("*")).filter((x2) => x2.tagName !== "SCRIPT");
  allElements.push(container);
  const allTexts = allElements.map((el) => (el.textContent ?? "").replace(/\s+/g, ""));
  const textSet = new Set(splitSentences(text.replace(/\s+/g, "")));
  console.log(textSet, "???");
  const scores = allElements.map((element, idx) => {
    const elementText = allTexts[idx];
    const elementTextSet = new Set(splitSentences(elementText));
    return {
      element,
      similarityScore: sentenceIntersectionSimilarity(textSet, elementTextSet),
      deep: getElementDepth(element)
    };
  });
  scores.sort((a2, b2) => {
    if (b2.similarityScore !== a2.similarityScore) {
      return b2.similarityScore - a2.similarityScore;
    }
    return b2.deep - a2.deep;
  });
  console.log(scores, scores.slice(0, 9), "scores");
  const bestElement = scores[0].element;
  return bestElement;
}
const getMainframe = () => {
  console.time("正文");
  let bodyContent = document.body.innerHTML;
  let parser = new DOMParser();
  let newDoc = parser.parseFromString("<!DOCTYPE html><html><head></head><body></body></html>", "text/html");
  newDoc.body.innerHTML = bodyContent;
  const article = new readability.Readability(newDoc).parse();
  console.log(article);
  const result = findMostSimilarDeepestElement(article == null ? void 0 : article.textContent, document.body);
  console.log(result);
  console.timeEnd("正文");
  return {
    main: result,
    reable: readability.isProbablyReaderable(document, {
      minScore: 90
    })
  };
};
IconCreator();
IconBlockCreator();
ImageOcrCreator();
function isChildOrSelfOfAny(element, selectors) {
  for (let selector of selectors) {
    if (element.matches(selector) || element.closest(selector)) {
      return true;
    }
  }
  return false;
}
function matchesAnySelector(element, selectors) {
  try {
    return selectors.map((x2) => {
      if (typeof x2 === "string") {
        return x2;
      } else {
        return x2.s;
      }
    }).some((selector) => element.matches(selector));
  } catch (e) {
    console.error(e);
    return false;
  }
}
const initStyle = `
.yd-more {
    max-height: unset !important;
    -webkit-line-clamp: unset !important;
}
.yd-translate-container {
    position: relative;
    display: inline !important;
    cursor: pointer;
}
@keyframes append-animate {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;	
    }
}
.yd-wrapper-block {
    display: block !important;
    margin: 6px 0 16px 0 !important;
    animation: append-animate .3s cubic-bezier(0.38, 0.97, 0.56, 0.76);
}
.yd-wrapper-inline {
    display: inline !important;
    animation: append-animate .3s cubic-bezier(0.38, 0.97, 0.56, 0.76);
}
.yd-translate-loader {
    margin: 0 5px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    height: 12px !important;
    width: 12px !important;
    animation: spin 0.5s linear infinite;
    display: inline-block !important;
    vertical-align: middle !important;
}
.yd-translate-loader-llm {
    margin: 0 5px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid green;
    border-radius: 50%;
    height: 16px !important;
    width: 16px !important;
    animation: spin 0.5s linear infinite;
    display: inline-block !important;
    vertical-align: middle !important;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.yd-exclamation {
    cursor: pointer;
    position: relative;
    padding: 6px;
    vertical-align: middle !important;
}
`;
class XspaceEnhander {
  constructor() {
    __publicField(this, "findTargetObserver", null);
    __publicField(this, "charObserver", null);
    __publicField(this, "start", false);
    __publicField(this, "handle", null);
    __publicField(this, "currentRoot", null);
    __publicField(this, "translationSeletor", ".yd-subtitle-container");
    __publicField(this, "cache", new Cache());
    __publicField(this, "timeout", 400);
  }
  async shouldTranslate() {
    const config = await getUserConfig();
    const host = "twitter.com";
    return typeof config.subtitles[host] === "undefined" ? false : config.subtitles[host];
  }
  isX() {
    const currentUrl = window.location.href;
    const targetBaseUrl = "https://twitter.com/";
    return currentUrl.startsWith(targetBaseUrl);
  }
  changeAncestorHeight(element, newHeight) {
    while (element) {
      if (element.style.height === "100px") {
        element.style.height = newHeight;
        break;
      }
      element = element.parentElement;
    }
  }
  listenForStart() {
    const startSelector = '[role="listbox"]';
    this.currentRoot = document.querySelector(startSelector);
    if (this.currentRoot) {
      this.changeAncestorHeight(this.currentRoot.parentElement, "400px");
      this.tryTostart(this.currentRoot);
    }
    function isElementOrChildMatches(element, selector) {
      if (element.matches(selector)) {
        return true;
      }
      return element.querySelector(selector) !== null;
    }
    this.findTargetObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLElement && isElementOrChildMatches(node, startSelector)) {
              console.log("目标元素被添加到 DOM 中！");
              const element = document.querySelector(startSelector);
              if (element) {
                this.changeAncestorHeight(element.parentElement, "400px");
                this.tryTostart(element.parentElement);
              }
            }
          }
        }
      });
    });
    this.findTargetObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  debounceTranslation(textNode) {
    if (this.handle) {
      clearTimeout(this.handle);
    }
    this.handle = setTimeout(async () => {
      let parent = textNode.parentElement;
      const text = textNode.textContent;
      if (text) {
        const result = await this.translate(text);
        let ydContainer = parent.querySelector(this.translationSeletor);
        if (!ydContainer) {
          ydContainer = document.createElement("div");
          ydContainer.classList.add(this.translationSeletor.slice(1));
          parent.appendChild(ydContainer);
        }
        if (text !== result)
          ydContainer.textContent = result;
      }
      this.handle = null;
    }, this.timeout);
  }
  async translate(text) {
    const type = "youdao";
    const domain = 0;
    const cache = await this.cache.getCache(text, type, domain);
    if (cache) {
      return cache;
    } else {
      let result = await youdao(text);
      this.cache.setCache(text, result, type, domain);
      return result;
    }
  }
  preTranslate(element) {
    function hasOnlyTextNodes(element2) {
      return Array.from(element2.childNodes).every(
        (node) => node.nodeType === 3 || /^\s*$/.test(node.textContent)
      );
    }
    const items = [...element.querySelectorAll('div[dir="ltr"] > span:only-child')].filter((x2) => hasOnlyTextNodes(x2));
    items.forEach(async (i2) => {
      let parent = i2;
      const text = i2.textContent;
      if (text) {
        const result = await this.translate(text);
        let ydContainer = parent.querySelector(this.translationSeletor);
        if (!ydContainer) {
          ydContainer = document.createElement("div");
          ydContainer.classList.add(this.translationSeletor.slice(1));
          parent.appendChild(ydContainer);
        }
        if (result !== text)
          ydContainer.textContent = result;
      }
    });
    console.log("翻译完成");
  }
  tryTostart(root) {
    if (this.charObserver) {
      this.charObserver.disconnect();
    }
    let isFisrt = true;
    this.charObserver = new MutationObserver((mutations) => {
      mutations.forEach(async (mutation) => {
        if (mutation.type === "characterData") {
          await this.debounceTranslation(mutation.target);
          if (isFisrt) {
            this.preTranslate(root);
            isFisrt = false;
          }
        }
      });
    });
    this.charObserver.observe(root, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }
  async startListen() {
    let start = await this.shouldTranslate();
    if (this.isX() && start) {
      this.listenForStart();
    }
  }
  destory() {
    if (this.charObserver) {
      this.charObserver.disconnect();
      this.charObserver = null;
    }
    if (this.findTargetObserver) {
      this.findTargetObserver.disconnect();
      this.findTargetObserver = null;
    }
    if (this.handle) {
      clearTimeout(this.handle);
      this.handle = null;
    }
    this.start = false;
    document.querySelectorAll(this.translationSeletor).forEach((x2) => x2.remove());
    if (this.currentRoot) {
      const elements = this.currentRoot.querySelectorAll(this.translationSeletor);
      elements.forEach((x2) => x2.remove());
      this.currentRoot = null;
    }
  }
}
class Cache {
  async getCache(key2, type, domain) {
    const newkey = type === "youdao" ? type + key2 + domain : type + key2;
    const result = await browserPolyfillExports.runtime.sendMessage({
      action: "get",
      key: newkey
    });
    return result;
  }
  async setCache(key2, value, type, domain) {
    const newkey = type === "youdao" ? type + key2 + domain : type + key2;
    await browserPolyfillExports.runtime.sendMessage({
      action: "set",
      key: newkey,
      value
    });
  }
}
class Translator {
  constructor() {
    __publicField(this, "rule");
    __publicField(this, "curentPriority", 0);
    __publicField(this, "initTranslationCount", 300);
    __publicField(this, "intervalCap", 20);
    __publicField(this, "interval", 1e3);
    __publicField(this, "concurrency", 20);
    __publicField(this, "retries", 2);
    __publicField(this, "job", new UuidMap());
    __publicField(this, "lastUrl", "");
    __publicField(this, "translationQueue", new PQueue({ concurrency: this.concurrency, intervalCap: this.intervalCap, interval: this.interval }));
    __publicField(this, "smallTranslationQueue", new PQueue({ concurrency: 10, intervalCap: 10, interval: 1e3 }));
    __publicField(this, "lazyTranslateObserver", null);
    __publicField(this, "updateTranslationObservers", /* @__PURE__ */ new Map());
    __publicField(this, "styleInjectors", /* @__PURE__ */ new Map());
    __publicField(this, "mainFraime", null);
    __publicField(this, "reable", false);
    __publicField(this, "aiLabel", false);
    __publicField(this, "domain", 0);
    __publicField(this, "XspaceEnhander", new XspaceEnhander());
    __publicField(this, "Cache", new Cache());
    __publicField(this, "cssClassMap", {
      container: "yd-translate-container",
      highlight: "yd-highlight",
      translate: "yd-translate",
      wrapperInline: "yd-wrapper-inline",
      wrapperBlock: "yd-wrapper-block",
      loading: "yd-translate-loader",
      loadingLlm: "yd-translate-loader-llm",
      fail: "yd-exclamation",
      more: "yd-more"
    });
    __publicField(this, "service", {
      youdao,
      youdaollm
    });
    __publicField(this, "translateSettingMap");
    // 翻译状态，双向绑定同步
    __publicField(this, "translated", false);
    // 是否开启了翻译
    __publicField(this, "mode", "dual");
    // 翻译模式,默认双向翻译
    __publicField(this, "type", "youdao");
  }
  // 翻译引擎
  removeTranslate(e) {
    const containerElements = e.querySelectorAll("." + this.cssClassMap.container);
    containerElements.forEach((element) => element.remove());
    const inlineElements = e.querySelectorAll("." + this.cssClassMap.wrapperInline);
    inlineElements.forEach((element) => element.remove());
    const blockElements = e.querySelectorAll("." + this.cssClassMap.wrapperBlock);
    blockElements.forEach((element) => element.remove());
    const visitedElements = e.querySelectorAll("[dy-tran-visited]");
    visitedElements.forEach((element) => {
      element.removeAttribute("dy-tran-visited");
    });
  }
  async changeTranslateSetting() {
    this.lazyTranslateObserver && this.lazyTranslateObserver.disconnect();
    this.updateTranslationObservers.forEach((observer) => observer.disconnect());
    this.translationQueue.clear();
    this.smallTranslationQueue.clear();
    this.translated = false;
    this.job = new UuidMap();
    await this.getAndApplyUserConfig();
  }
  listenForOptionT(callback) {
  }
  listenRetry() {
    function findAncestorWithClass(element, className) {
      let ancestor = element.parentElement;
      while (ancestor) {
        if (ancestor.classList.contains(className)) {
          return ancestor;
        }
        ancestor = ancestor.parentElement;
      }
      return null;
    }
    const handleExclamationClick = (event2) => {
      const target = event2.target;
      if (target && target.classList.contains(this.cssClassMap.fail)) {
        const container = findAncestorWithClass(target, this.cssClassMap.container);
        if (container) {
          const parent = container.parentElement;
          container.remove();
          const config = {
            document: document.body,
            force: true,
            noCheck: true
          };
          this.handleContainer(parent, config);
        }
      }
    };
    document.addEventListener("click", handleExclamationClick);
  }
  async retry(api) {
    await this.getAndApplyUserConfig();
    this.removeTranslate(document.body);
    this.changeTranslateSetting();
    await this.translatePage({
      document: document.body,
      updateRoot: document,
      styleRoot: document.head || document.body,
      force: true,
      noCheck: true
    });
    this.makeitVisible();
  }
  async updateAilabe() {
    const config = await getUserConfig();
    this.aiLabel = config.aiLabel;
  }
  createInlineListener(e) {
    function calculateElementArea(element) {
      if (!element) {
        return 0;
      }
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      return width * height;
    }
    const body = document.body;
    if (body) {
      let hoverTimeout;
      const target = body.querySelector("yd-mg-block-icon");
      target.addEventListener(
        "try-llm",
        async (e2) => {
          if (window.ydCurrentHoverElement && window.ydCurrentHoverElement.targetElement) {
            const id = window.ydCurrentHoverElement.targetElement.getAttribute("yd-parent-id");
            console.log("parent", this.job.getById(id));
            if (this.job.hasById(id)) {
              const items = this.job.getById(id);
              target.setAttribute("loading", "");
              try {
                track(window, "translateBlock", {
                  text: item == null ? void 0 : item.text
                });
              } catch (error) {
                console.error(error);
              }
              try {
                const item2 = items[0] ?? [];
                const translation = await pTimeout(youdaollm(item2.text), { milliseconds: 1e3 * 30 });
                const originalElement = window.ydCurrentHoverElement.targetElement;
                let copiedElement = originalElement.cloneNode(true);
                copiedElement.classList.add("yd-llm-container");
                const copy = copiedElement.querySelector("yd-mg-block-icon");
                copy.remove();
                originalElement.parentNode.insertBefore(copiedElement, originalElement.nextSibling);
                const textContainer = copiedElement.querySelector("font");
                textContainer.innerHTML = this.getHtml(translation, item2);
              } catch (error) {
                console.error(error);
              } finally {
                target.removeAttribute("loading");
              }
            }
          }
        },
        false
      );
      target.addEventListener(
        "close",
        async (e2) => {
          try {
            track(window, "disableTranslateBlock");
          } catch (error) {
            console.error(error);
          }
          target.remove();
          this.aiLabel = false;
        },
        false
      );
      let shouldOpen = false;
      body.addEventListener("mouseover", async (event2) => {
        let targetElement = event2.target.closest(".yd-translate-container");
        await this.updateAilabe();
        calculateElementArea(targetElement);
        targetElement && targetElement.textContent && targetElement.textContent.length < 40;
        !this.reable;
        const wrongType = this.type === "youdaollm";
        const emptyElement = !targetElement;
        const disableLabel = !this.aiLabel;
        const shouldOpenLabel = (e2) => {
          const rules = [
            {
              url: "https://www.nature.com/articles.*",
              area: [".main-content"]
            },
            {
              url: "https://www.sciencedirect.com/science/article/pii/.*",
              area: ["article"]
            },
            {
              url: "https://www.mdpi.com/.*",
              area: ["#middle-column > div.middle-column__main"]
            }
            // 可以在这里添加更多的规则
          ];
          const url = window.location.href;
          for (const rule of rules) {
            if (new RegExp(rule.url).test(url)) {
              if (rule.area.length === 0) {
                return true;
              }
              for (const selector of rule.area) {
                try {
                  if (e2.matches(selector) || e2.closest(selector)) {
                    return true;
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            }
          }
          return false;
        };
        if (targetElement && !shouldOpenLabel(targetElement) || wrongType || emptyElement || disableLabel) {
          return;
        }
        if (targetElement !== event2.relatedTarget && !targetElement.contains(event2.relatedTarget)) {
          shouldOpen = true;
          try {
            track(window, "showTranslateBlock");
          } catch (error) {
            console.error(error);
          }
          console.log("Mouse entered:", targetElement);
          let itemElement = event2.target.closest(".yd-translate-container");
          window.ydCurrentHoverElement = {
            targetElement,
            itemElement
          };
          hoverTimeout = setTimeout(() => {
            target.setAttribute("show", "");
            itemElement.appendChild(target);
            const cardWidth = 24;
            const cardHeight = 24;
            target.setAttribute("width", `${cardWidth}`);
            target.setAttribute("height", `${cardHeight}`);
            const id = itemElement.getAttribute("yd-parent-id");
            target.setAttribute("id", id);
            if (itemElement.classList.contains("yd-llm-container")) {
              target.setAttribute("llm", "");
            } else {
              target.removeAttribute("llm");
            }
          }, 0);
        }
      });
      const close = lodashExports.debounce(() => {
        if (!shouldOpen) {
          target.removeAttribute("show");
        }
      }, 300);
      body.addEventListener("mouseout", function(event2) {
        let targetElement = event2.target.closest(".yd-translate-container");
        clearTimeout(hoverTimeout);
        shouldOpen = false;
        if (!targetElement)
          return;
        if (targetElement !== event2.relatedTarget && !targetElement.contains(event2.relatedTarget)) {
          console.log("Mouse left:", targetElement);
          close();
        }
      });
    }
  }
  // 云端配置都在这里更新
  // 按钮翻译，系统菜单，全局retry，popup的快捷键，自动翻译，页面快捷键，切换引擎时候翻译 都会调用这个函数
  // 自动retry没有调用
  async getAndApplyUserConfig() {
    const config = await getUserConfig();
    await this.initRule();
    this.setType(config.engine);
    this.domain = config.domain;
    this.mode = config.mode;
    this.curentPriority = 0;
    this.initTranslationCount = this.translateSettingMap[this.type].initTranslationCount;
    this.intervalCap = this.translateSettingMap[this.type].intervalCap;
    this.interval = this.translateSettingMap[this.type].interval;
    this.concurrency = this.translateSettingMap[this.type].concurrency;
    this.translationQueue = new PQueue({ concurrency: this.concurrency, intervalCap: this.intervalCap, interval: this.interval });
    this.retries = config.retries || 2;
    this.aiLabel = config.aiLabel;
    const value = config.highLightStyle;
    this.styleInjectors.forEach((styleInjector) => {
      if (typeof styleInjector.hightlightStyle[value] === "string") {
        styleInjector.removeClass("yd-highlight");
        styleInjector.addClass("yd-highlight", styleInjector.hightlightStyle[value]);
      } else {
        styleInjector.removeClass("yd-highlight");
        styleInjector.addClass("yd-highlight", styleInjector.hightlightStyle[value].original);
        styleInjector.removeClass("yd-highlight:hover");
        styleInjector.addClass("yd-highlight:hover", styleInjector.hightlightStyle[value].hover);
      }
    });
  }
  enhanceArxiv() {
    function isArxivAbsUrl() {
      const regex = /^https:\/\/arxiv\.org\/abs\/.*/;
      const currentUrl = window.location.href;
      return regex.test(currentUrl);
    }
    if (isArxivAbsUrl()) {
      const selector = "#abs-outer > div.extra-services > div.full-text > ul";
      const ul = document.querySelector(selector);
      if (ul) {
        const li = document.createElement("li");
        li.innerHTML = `<a style="color:blue;cursor: pointer;" class="abs-button download-pdf">PDF双语(灵动翻译)</a>`;
        li.addEventListener("click", () => {
          browserPolyfillExports.runtime.sendMessage({ action: "openNewTab", url: `https://fanyi.youdao.com/trans/#/home?url=${encodeURI(window.location.href)}&keyfrom=magictrans_ext` });
        });
        ul.appendChild(li);
      }
    }
  }
  enhanceFanyi() {
    function getQueryParamValueFromHash() {
      const currentUrl = window.location.href;
      const targetBaseUrl = "https://fanyi.youdao.com/trans/#/home";
      if (currentUrl.startsWith(targetBaseUrl)) {
        const hash = window.location.hash;
        const queryParamsString = hash.substring(hash.indexOf("?") + 1);
        const queryParams = new URLSearchParams(queryParamsString);
        return queryParams.get("ydMgTrans");
      } else {
        return null;
      }
    }
    const url = getQueryParamValueFromHash();
    if (url) {
      const inputSelector = "#base-input > input";
      const input = document.querySelector(inputSelector);
      const buttonSelector = "#app > div > div > div.top > div > div.left > div.trans-input-comp > div > div.operate >.search";
      const button = document.querySelector(buttonSelector);
      input.value = url;
      input.dispatchEvent(new Event("input", {
        bubbles: true
      }));
      setTimeout(() => {
        button.click();
      }, 1e3);
    }
  }
  enhanceXspace() {
    this.XspaceEnhander.startListen();
  }
  unEnhanceXspace() {
    this.XspaceEnhander.destory();
  }
  async init() {
    try {
      this.enhanceXspace();
    } catch (error) {
      console.error("enhanceXspace", error);
    }
    try {
      this.enhanceArxiv();
    } catch (error) {
      console.error("enhanceArxiv", error);
    }
    try {
      this.createInlineListener(document.body);
    } catch (error) {
      console.error(" ", error);
    }
    try {
      console.debug("自动拉取配置");
      await shouldUpdate(1e3 * 60 * 60 * 1);
    } catch (error) {
      console.error(error);
    }
    try {
      this.listenForOptionT(async () => {
        track(window, "shortcutPage", {});
        await this.toggle();
      });
    } catch (error) {
      console.error(error);
    }
    await this.getAndApplyUserConfig();
    const config = await getUserConfig();
    const domain = getRootDomain(window.location.href);
    const strategy = config.strategy && config.strategy[domain] || "0";
    if (strategy === "1" || strategy === 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await currentTranslator.translatePage({
        document: document.body,
        updateRoot: document,
        styleRoot: document.head || document.body,
        force: false,
        noCheck: false
      });
    }
  }
  async translatePage(e) {
    this.translated = true;
    await updateBadge(this.translated);
    this.updateTranslation(e.updateRoot || e.document);
    await this.initStyle(e);
    this.createLazyTranslateObserver();
    this.translate(e);
  }
  getSetting() {
    return {
      initTranslationCount: this.initTranslationCount,
      intervalCap: this.intervalCap,
      interval: this.interval,
      concurrency: this.concurrency,
      type: this.type,
      translated: this.translated,
      mode: this.mode
    };
  }
  setType(type) {
    this.type = type;
  }
  removeAllStyles() {
    this.styleInjectors.forEach((styleInjector) => {
      styleInjector.removeAllStyles();
    });
  }
  async initStyle(e) {
    if (!this.styleInjectors.has(e.document)) {
      const styleInjector = new StyleInjector(initStyle, hightlightStyle);
      await styleInjector.injectStyle(e.styleRoot, this.rule.injectStyles);
      this.styleInjectors.set(e.document, styleInjector);
    }
  }
  async initRule() {
    const rulesMangement = new Rule();
    this.rule = await rulesMangement.getRule();
    this.translateSettingMap = await rulesMangement.getQueueSetting();
  }
  isEnglish(text) {
    return franc(text) === "eng";
  }
  isChinese(text) {
    console.log("isChinese", text, franc(text, { minLength: 2 }));
    return franc(text, { minLength: 1 }) === "cmn";
  }
  async tanslateSentence(text, type) {
    text = text.trim();
    let result;
    const parms = [text];
    if (this.type === "youdao" || type === "youdao") {
      parms.push("zh-CHS");
      parms.push(this.domain);
    }
    result = await this.service[type ?? this.type](...parms);
    console.log("强制translate", type, text);
    return result;
  }
  tansfromTranslation(text) {
    return text.replace(/\/n/g, "\n");
  }
  getCurrentPriorty(e) {
    function isElementNoRendered(el) {
      const style2 = window.getComputedStyle(el);
      return style2.visibility === "hidden" || parseFloat(style2.width) === 0 || parseFloat(style2.height) === 0 || el.hasAttribute("hidden");
    }
    const normal = 50;
    const mainFraime = 100;
    if (!e) {
      return normal;
    }
    if (e.nodeType === Node.ELEMENT_NODE && isElementNoRendered(e)) {
      return 0;
    }
    if (this.mainFraime) {
      if (this.mainFraime.contains(e)) {
        return mainFraime;
      } else {
        return normal;
      }
    } else {
      return normal;
    }
  }
  isLLM(item2) {
    return false;
  }
  addTranslateJob(item2, force = false) {
    this.record();
    if (!inViewport(item2.root || item2.fakeRoot) && !force) {
      console.debug("不在视窗内1", item2);
      this.clearVisited(item2.root);
      item2.translated = false;
      return;
    }
    const wrapper = this.createAndInsertWrapper(item2);
    if (item2.root) {
      item2.root.setAttribute("yd-root-id", item2.rootId);
    }
    wrapper.setAttribute("yd-parent-id", item2.rootId);
    this.setVisited(wrapper);
    wrapper.appendChild(this.createLoading(this.isLLM(item2)));
    const retryTask = async (signal, currentCount = 0, type) => {
      try {
        if (!inViewport(item2.root || item2.fakeRoot) && !force) {
          console.debug("不在视窗内2", item2);
          wrapper.remove();
          this.clearVisited(item2.root);
          item2.translated = false;
          return;
        }
        let originalTranslation;
        if (type) {
          originalTranslation = await this.tanslateSentence(item2.text, type);
        } else {
          originalTranslation = await this.tanslateSentence(item2.text);
        }
        const translation = this.tansfromTranslation(originalTranslation);
        await this.setCache(item2.text, translation, this.type, this.domain);
        if (!inViewport(item2.root || item2.fakeRoot) && !force) {
          console.debug("不在视窗内3", item2);
          wrapper.remove();
          this.clearVisited(item2.root);
          item2.translated = false;
          return;
        }
        console.debug("translation", translation, item2.text, item2);
        this.hanldeInsert(item2, wrapper, translation);
        this.handleTranslated(item2);
      } catch (e) {
        const maxTimeout = 1e3 * 60;
        const minTimeout = 1e3 * 1;
        const random = Math.random();
        const factor = 2;
        const timeout = Math.min(random * minTimeout * Math.pow(factor, currentCount), maxTimeout);
        if (currentCount >= this.retries) {
          console.error("translate error", e, item2);
          this.handleError(wrapper, item2);
          this.handleTranslated(item2);
        } else if (e.message && e.message.includes("Received type undefined")) {
          setTimeout(() => {
            console.debug("retry", item2);
            if (!inViewport(item2.root || item2.fakeRoot) && !force) {
              wrapper.remove();
              this.clearVisited(item2.root);
              item2.translated = false;
            } else {
              this.translationQueue.add(async () => {
                await retryTask(signal, currentCount + 1, "youdao");
              }, {
                priority: this.getCurrentPriorty(item2.root)
              });
            }
          }, timeout);
        } else {
          setTimeout(() => {
            console.debug("retry", item2);
            if (!inViewport(item2.root || item2.fakeRoot) && !force) {
              wrapper.remove();
              this.clearVisited(item2.root);
              item2.translated = false;
            } else {
              this.translationQueue.add(async () => {
                await retryTask(signal, currentCount + 1);
              }, {
                priority: this.getCurrentPriorty(item2.root)
              });
            }
          }, timeout);
        }
      }
    };
    if (this.type === "youdaollm") {
      if (item2.trimedText && item2.trimedText.length < 20) {
        this.smallTranslationQueue.add(async ({ signal }) => {
          await retryTask(signal, 0, "youdao");
        }, {
          priority: this.getCurrentPriorty(item2.root)
        });
      } else {
        console.log("llm", item2.trimedText);
        this.translationQueue.add(retryTask, {
          priority: this.getCurrentPriorty(item2.root)
        });
      }
    } else {
      this.translationQueue.add(retryTask, {
        priority: this.getCurrentPriorty(item2.root)
      });
    }
  }
  hanldeInsert(item2, wrapper, translation) {
    wrapper.innerHTML = "";
    function removeSpacesAndCompare(str1, str2) {
      if (typeof str1 !== "string" || typeof str2 !== "string") {
        return false;
      }
      const str1WithoutSpaces = str1.replace(/\s/g, "");
      const str2WithoutSpaces = str2.replace(/\s/g, "");
      return str1WithoutSpaces === str2WithoutSpaces;
    }
    if (removeSpacesAndCompare(item2.text, translation)) {
      return void 0;
    }
    if (this.mode === "dual") {
      if (!this.isInline(item2)) {
        const translationElement = document.createElement("font");
        this.setVisited(translationElement);
        translationElement.innerHTML = this.getHtml(translation, item2);
        translationElement.classList.add(this.isInline(item2) ? this.cssClassMap.wrapperInline : this.cssClassMap.wrapperBlock);
        translationElement.classList.add(this.cssClassMap.highlight);
        wrapper.appendChild(translationElement);
      } else {
        const translationElement = document.createElement("font");
        this.setVisited(translationElement);
        translationElement.innerHTML = "  " + this.getHtml(translation, item2);
        translationElement.classList.add(this.isInline(item2) ? this.cssClassMap.wrapperInline : this.cssClassMap.wrapperBlock);
        translationElement.classList.add(this.cssClassMap.highlight);
        const space = document.createElement("font");
        this.setVisited(space);
        space.innerHTML = " ";
        wrapper.appendChild(space);
        wrapper.appendChild(translationElement);
        item2.html = wrapper;
      }
    } else {
      item2.children = [];
      const parentElement = wrapper.parentElement;
      while (parentElement.firstChild) {
        item2.children.push(parentElement.firstChild);
        parentElement.removeChild(parentElement.firstChild);
      }
      const translationElement = document.createElement("font");
      this.setVisited(translationElement);
      translationElement.innerHTML = this.getHtml(translation, item2);
      translationElement.classList.add(this.isInline(item2) ? this.cssClassMap.wrapperInline : this.cssClassMap.wrapperBlock);
      translationElement.classList.add(this.cssClassMap.highlight);
      parentElement.appendChild(translationElement);
      item2.html = translationElement;
    }
    item2.wrapper = wrapper;
  }
  handleError(wrapper, item2) {
    wrapper.innerHTML = "";
    const target = document.createElement("font");
    this.setVisited(target);
    target.title = "翻译失败，点击重试";
    target.classList.add(this.cssClassMap.fail);
    target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width=18 height=18 fill="red" ><title>reload-alert</title><path d="M2 12C2 17 6 21 11 21C13.4 21 15.7 20.1 17.4 18.4L15.9 16.9C14.6 18.3 12.9 19 11 19C4.8 19 1.6 11.5 6.1 7.1S18 5.8 18 12H15L19 16H19.1L23 12H20C20 7 16 3 11 3S2 7 2 12M10 15H12V17H10V15M10 7H12V13H10V7" /></svg>';
    target.addEventListener("click", (e) => {
      track(window, "retySingle", {
        text: item2.text
      });
      e.preventDefault();
      e.stopPropagation();
      wrapper.remove();
      this.handleNoCheck([item2]);
    });
    wrapper.appendChild(target);
    return target;
  }
  createLoading(isLLM) {
    const target = document.createElement("font");
    this.setVisited(target);
    target.classList.add(isLLM ? this.cssClassMap.loadingLlm : this.cssClassMap.loading);
    return target;
  }
  // 创建插入翻译结果的节点
  createAndInsertWrapper(item2) {
    var _a;
    function getAncestors(element) {
      let ancestors = [];
      while (element) {
        ancestors.push(element);
        element = element.parentElement;
      }
      return ancestors;
    }
    function findCommonAncestor(elements) {
      if (!elements || elements.length === 0)
        return null;
      let listOfAncestors = elements.map(getAncestors);
      let commonAncestor = null;
      for (let ancestor of listOfAncestors[0]) {
        if (listOfAncestors.every((ancestors) => ancestors.includes(ancestor))) {
          commonAncestor = ancestor;
          break;
        }
      }
      return commonAncestor;
    }
    const target = document.createElement("font");
    this.setVisited(target);
    target.classList.add(this.cssClassMap.container);
    console.debug("createAndInsertWrapper", item2, this.isInline(item2), item2.texts.filter((x2) => {
      var _a2, _b;
      return ((_b = (_a2 = x2 == null ? void 0 : x2.node) == null ? void 0 : _a2.textContent) == null ? void 0 : _b.trim()) ?? "";
    }));
    if (item2.trimedTexts.length === 1) {
      const node = item2.trimedTexts[0].node;
      if (node.nodeType === Node.TEXT_NODE) {
        console.debug("insert after one", item2);
        if (node.nextSibling) {
          node.parentNode.insertBefore(target, node.nextSibling);
        } else {
          node.parentNode.appendChild(target);
        }
      } else {
        console.debug("appendChild one", item2);
        node.appendChild(target);
      }
    } else {
      if (item2.sublibing) {
        const e = item2.sublibing;
        e.parentNode.insertBefore(target, e.nextSibling);
        console.debug("insert after", item2);
      } else {
        const lastNode = item2.trimedTexts[item2.trimedTexts.length - 1].node;
        const lca = findCommonAncestor(item2.trimedTexts.map((x2) => x2.node));
        if (lca) {
          lca.appendChild(target);
        } else {
          if (lastNode && lastNode.parentNode) {
            lastNode.parentNode.appendChild(target);
          } else {
            if (item2.root) {
              item2.root.appendChild(target);
            } else {
              (_a = item2.fakeRoot) == null ? void 0 : _a.appendChild(target);
            }
          }
          console.debug("insert root", item2);
        }
      }
    }
    item2.itemParent = target.parentElement;
    return target;
  }
  // 用于处理翻译结果的插入
  getHtml(text, item2) {
    const elements = item2.elements ?? [];
    let str = text;
    let regex = /< *b\d+ *> *< *\/ *b\d+ *>/g;
    let newStr = str.replace(regex, function(...args) {
      const match = args[0];
      let num = match.match(/\d+/)[0];
      const e = elements[num];
      const nodes = item2.texts.map((x2) => x2.node);
      const index = nodes.indexOf(e);
      const pre = nodes[index - 1] ?? null;
      const next = nodes[index + 1] ?? null;
      const shouldPadding = e.nodeType !== Node.TEXT_NODE;
      const shouldPaddingPre = pre && pre.nodeType === Node.TEXT_NODE;
      const shouldPaddingNext = next && next.nodeType === Node.TEXT_NODE;
      return shouldPadding ? `${shouldPaddingPre ? '<span style="display:inline">&nbsp;</span>' : ""}${elements[num].outerHTML}${shouldPaddingNext ? '<span style="display:inline">&nbsp;</span>' : ""}` : elements[num].outerHTML;
    });
    return newStr;
  }
  // 移除observer
  handleTranslated(item2) {
    var _a;
    (_a = this.lazyTranslateObserver) == null ? void 0 : _a.unobserve(item2.root || item2.fakeRoot);
  }
  // 这里已经有翻译结果了，将翻译结果添加到合适的地方
  translateNow(item2, translation) {
    this.record();
    const wrapper = this.createAndInsertWrapper(item2);
    if (item2.root) {
      item2.root.setAttribute("yd-root-id", item2.rootId);
    }
    wrapper.setAttribute("yd-parent-id", item2.rootId);
    this.setVisited(wrapper);
    wrapper.appendChild(this.createLoading(this.isLLM(item2)));
    const task = async () => {
      console.log("使用缓存翻译", item2.text);
      try {
        this.hanldeInsert(item2, wrapper, translation);
        this.handleTranslated(item2);
      } catch (e) {
        console.error("translate error", e);
        this.handleError(wrapper, item2);
        this.handleTranslated(item2);
      }
    };
    task();
  }
  noTranslate(text) {
    const isDigtal = /^\d+$/.test(text);
    function isInvalidChar(str) {
      const regex = /[^a-zA-Z0-9\u4e00-\u9fa5]/;
      return regex.test(str) && str.length === 1;
    }
    return isDigtal || isInvalidChar(text);
  }
  getChildren(node) {
    if (node.shadowRoot) {
      return node.childNodes;
    }
    return node.childNodes;
  }
  // 可翻译段识别
  async handleContainer(e, i2) {
    let currentNode = {
      document: i2.document,
      force: i2.force,
      noCheck: i2.noCheck,
      root: e,
      texts: []
    };
    const isBlock = (element) => {
      const display = window.getComputedStyle(element).display;
      const displayLikeBlock = ["table-cell", "block", "box", "flex", "table", "list-item", "grid", "-webkit-box", "contents", "table-row"].includes(display);
      if (matchesAnySelector(element, this.rule.forceBlockSelectors)) {
        return true;
      }
      if (display === "none") {
        if (matchesAnySelector(element, this.rule.inlineSelectors)) {
          return false;
        }
        return true;
      }
      return displayLikeBlock;
    };
    const shouldBeForceInline = (element) => {
      const display = window.getComputedStyle(element).display;
      const displayLikeInline = ["inline-block", "inline-table", "inline-flex", "inline-grid"].includes(display);
      return displayLikeInline && element.getBoundingClientRect().height < 2.5 * parseFloat(window.getComputedStyle(element).fontSize);
    };
    const result = [];
    const dfs = (node, result2 = [], deep = 0) => {
      var _a, _b, _c, _d;
      if (node.nodeType === Node.ELEMENT_NODE && matchesAnySelector(node, this.rule.noIncludeSelectors)) {
        console.debug("拒绝翻译的node", node);
        return void 0;
      }
      if (node.shadowRoot) {
        if (e.document !== node.shadowRoot) {
          this.translatePage({
            document: node.shadowRoot,
            styleRoot: node.shadowRoot,
            force: false,
            noCheck: false
          });
        }
      }
      if (node.nodeName === "FRAME" || node.nodeName === "IFRAME") {
        try {
          if (e.document !== ((_a = node.contentWindow) == null ? void 0 : _a.document.body)) {
            const translate = () => {
              var _a2, _b2, _c2;
              this.translatePage({
                document: (_a2 = node.contentWindow) == null ? void 0 : _a2.document.body,
                styleRoot: ((_b2 = node.contentWindow) == null ? void 0 : _b2.document.head) || ((_c2 = node.contentWindow) == null ? void 0 : _c2.document.body),
                force: false,
                noCheck: false
              });
            };
            translate();
            if (node.addEventListener && node.removeEventListener) {
              node.removeEventListener("load", translate);
              node.addEventListener("load", translate);
            }
            return false;
          }
        } catch (error) {
          return false;
        }
      }
      if (node.nodeName === "BR") {
        if (currentNode.texts.length > 0) {
          currentNode.root = null;
          const fakeRoot = document.createElement("div");
          this.setVisited(fakeRoot);
          node.parentNode.insertBefore(fakeRoot, node.nextSibling);
          currentNode.fakeRoot = fakeRoot;
        }
        result2.push(currentNode);
        currentNode = {
          root: null,
          fakeRoot: null,
          texts: []
        };
      }
      if (node.nodeType === Node.ELEMENT_NODE && isBlock(node) && !matchesAnySelector(node, this.rule.noIncludeSelectors) && !matchesAnySelector(node, this.rule.noTranslateSelectors)) {
        if (currentNode.root !== node) {
          result2.push(currentNode);
          currentNode = {
            root: node,
            texts: []
          };
        }
        currentNode.root = node;
      } else {
        if (node.nodeType === Node.ELEMENT_NODE && matchesAnySelector(node, this.rule.noTranslateSelectors)) {
          if (((_b = currentNode.root) == null ? void 0 : _b.contains(node)) ?? false) {
            currentNode.texts.push({
              node,
              deep,
              isText: false
            });
          } else {
            result2.push(currentNode);
            currentNode = {
              root: node.parentNode,
              texts: [{
                node,
                deep,
                isText: false
              }]
            };
          }
          return 0;
        } else {
          if (node.nodeType === Node.TEXT_NODE) {
            if (((_c = currentNode.root) == null ? void 0 : _c.contains(node)) ?? false) {
              currentNode.texts.push({
                node,
                deep,
                isText: true
              });
            } else {
              result2.push(currentNode);
              currentNode = {
                root: node.parentNode,
                texts: [{
                  node,
                  deep,
                  isText: true
                }]
              };
            }
            return 0;
          } else {
            if (node instanceof Element && (matchesAnySelector(node, this.rule.forceInlineSelectors) || shouldBeForceInline(node))) {
              const getText = (element, deep2) => {
                let textContent = [];
                for (let node2 of element.childNodes) {
                  if (node2.nodeType === Node.TEXT_NODE) {
                    textContent.push({
                      node: node2,
                      deep: deep2,
                      text: true
                    });
                  } else if (node2.nodeType === Node.ELEMENT_NODE && !matchesAnySelector(node2, this.rule.noIncludeSelectors)) {
                    if (matchesAnySelector(node2, this.rule.noTranslateSelectors)) {
                      textContent.push({
                        node: node2,
                        deep: deep2,
                        text: false
                      });
                    } else {
                      textContent = textContent.concat(getText(node2, deep2 + 1));
                    }
                  }
                }
                return textContent;
              };
              const texts = getText(node, deep).map((x2) => {
                return {
                  node: x2.node,
                  deep: x2.deep,
                  isText: x2.text
                };
              });
              if (((_d = currentNode.root) == null ? void 0 : _d.contains(node)) ?? false) {
                currentNode.texts = currentNode.texts.concat(texts);
              } else {
                result2.push(currentNode);
                currentNode = {
                  root: node,
                  texts
                };
              }
              return 0;
            }
          }
        }
      }
      const children = this.getChildren(node);
      for (let i22 = 0; i22 < children.length; i22++) {
        dfs(children[i22], result2, deep + 1);
      }
    };
    const removeInnerNewlinesAndMultipleSpaces = (str) => {
      if (this.rule.removeInnerNewlinesAndMultipleSpaces) {
        return str.replace(/(\S)[\n\s]+(\S)/g, "$1 $2");
      }
      return str;
    };
    const transformToPrargraph = (item2) => {
      var _a, _b;
      const nodes = item2.texts;
      let elements = [];
      let result2 = "";
      for (let index = 0; index < nodes.length; index++) {
        const e2 = nodes[index];
        if (e2.node.nodeType === Node.TEXT_NODE) {
          result2 += e2.node.textContent;
        } else {
          if (e2.node.nodeName === "IMG" && ((_b = (_a = this.rule) == null ? void 0 : _a.ignoreImageSize) == null ? void 0 : _b.length) > 0) {
            const imgElement = e2.node;
            const width = imgElement.clientWidth;
            const height = imgElement.clientHeight;
            const [maxImageWidth, maxImageHeight] = this.rule.ignoreImageSize;
            if (width > maxImageWidth || height > maxImageHeight) {
              continue;
            }
          }
          const i22 = elements.length;
          elements.push(e2.node);
          result2 += `<b${i22}></b${i22}>`;
        }
      }
      item2.elements = elements;
      item2.text = removeInnerNewlinesAndMultipleSpaces(result2);
      item2.translated = false;
      item2.trimedText = nodes.map((x2) => {
        var _a2, _b2;
        return ((_b2 = (_a2 = x2 == null ? void 0 : x2.node) == null ? void 0 : _a2.textContent) == null ? void 0 : _b2.trim()) ?? "";
      }).join("");
      item2.trimedTexts = item2.texts.filter((x2) => {
        var _a2, _b2;
        if ((((_b2 = (_a2 = x2 == null ? void 0 : x2.node) == null ? void 0 : _a2.textContent) == null ? void 0 : _b2.trim()) ?? "") || !x2.isText) {
          return true;
        } else {
          return false;
        }
      });
      return item2;
    };
    const handleTakeAsErrorBlock = (item2) => {
      function findClosestElementNode(node) {
        if (node && node.nodeType === 1) {
          return node;
        }
        while (node) {
          node = node.parentNode;
          if (node && node.nodeType === 1) {
            return node;
          }
        }
        return null;
      }
      function areAllTagNamesEqualAndHaveCommonClass(elements) {
        if (elements.length === 0) {
          return true;
        }
        const firstTagName = elements[0].tagName;
        const firstElementClasses = new Set(elements[0].className.split(" "));
        for (let i22 = 1; i22 < elements.length; i22++) {
          if (elements[i22].tagName !== firstTagName) {
            return false;
          }
          const currentElementClasses = new Set(elements[i22].className.split(" "));
          let hasCommonClass = false;
          for (let cls of firstElementClasses) {
            if (currentElementClasses.has(cls)) {
              hasCommonClass = true;
              break;
            }
          }
          if (!hasCommonClass) {
            return false;
          }
        }
        return true;
      }
      const usefulTexts = item2.texts.filter((x2) => {
        var _a, _b;
        if ((((_b = (_a = x2 == null ? void 0 : x2.node) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) ?? "") || !x2.isText) {
          return true;
        } else {
          return false;
        }
      });
      function areLeftPositionsSame(elements) {
        if (elements.length === 0) {
          return true;
        }
        const firstLeftValue = elements[0].getBoundingClientRect().left;
        for (let i22 = 1; i22 < elements.length; i22++) {
          if (elements[i22].getBoundingClientRect().left !== firstLeftValue) {
            return false;
          }
        }
        return true;
      }
      function checkElements(elements, gap) {
        if (elements.length <= 1) {
          return true;
        }
        const topValue = elements[0].getBoundingClientRect().top;
        for (let i22 = 1; i22 < elements.length; i22++) {
          if (elements[i22].getBoundingClientRect().top !== topValue) {
            return false;
          }
        }
        elements.sort((a2, b2) => a2.getBoundingClientRect().left - b2.getBoundingClientRect().left);
        for (let i22 = 1; i22 < elements.length; i22++) {
          if (elements[i22].getBoundingClientRect().left <= elements[i22 - 1].getBoundingClientRect().right + gap) {
            return false;
          }
        }
        return true;
      }
      const usefulElement2 = usefulTexts.map((x2) => findClosestElementNode(x2.node)).filter((x2) => x2 !== null);
      const allsamleElement = usefulElement2.every((element) => element === usefulElement2[0]);
      if (usefulElement2.length > 1 && !allsamleElement && (areAllTagNamesEqualAndHaveCommonClass(usefulElement2) && (areLeftPositionsSame(usefulElement2) || checkElements(usefulElement2, 10)))) {
        const result2 = usefulElement2.map((x2, i22) => {
          return {
            texts: [usefulTexts[i22]],
            root: usefulTexts[i22].isText ? x2 : usefulTexts[i22].node.parentElement,
            fakeRoot: null
          };
        });
        console.log("splitResult", result2);
        return result2;
      }
      return [item2];
    };
    console.debug("handleContainerPlus", e);
    dfs(e, result);
    if (currentNode.texts.length > 0) {
      result.push(currentNode);
    }
    const usefulElement = result.filter((x2) => x2.texts.length > 0);
    const transformElement = usefulElement.reduce((pre, cur) => {
      return [...pre, ...handleTakeAsErrorBlock(cur)];
    }, []);
    const itemWithSublibing = transformElement.map((x2) => {
      let smallDeep = Number.MAX_SAFE_INTEGER;
      let smallDeepItem = null;
      x2.texts.forEach((item2) => {
        if (item2.deep <= smallDeep) {
          smallDeep = item2.deep;
          smallDeepItem = item2;
        }
      });
      let sublibing = smallDeepItem.node;
      while (sublibing) {
        if (sublibing.contains(x2.texts[x2.texts.length - 1].node)) {
          break;
        }
        sublibing = sublibing.nextSibling;
      }
      return {
        ...x2,
        // 这个sublibing用于后续插入翻译结果
        sublibing: sublibing === smallDeepItem.node ? null : sublibing
      };
    });
    itemWithSublibing.forEach(async (item2) => {
      var _a, _b;
      transformToPrargraph(item2);
      if ((((_a = item2 == null ? void 0 : item2.text) == null ? void 0 : _a.trim().length) ?? 0) === 0) {
        return void 0;
      }
      let id = this.job.set(item2.root || item2.fakeRoot, item2);
      item2.rootId = id;
      if (item2.noCheck) {
        await this.handleNoCheck([item2]);
      } else {
        (_b = this.lazyTranslateObserver) == null ? void 0 : _b.observe(item2.root || item2.fakeRoot);
      }
    });
  }
  // 立即处理翻译任务
  async handleNoCheck(items) {
    items.forEach(async (item2) => {
      const translated = item2.translated;
      if (!this.isVisited(item2.root) && !this.isChinese(item2.trimedText) && !translated || item2.force) {
        this.setVisited(item2.root);
        item2.translated = true;
        const cache = await this.getCache(item2.text, this.type, this.domain);
        if (cache) {
          console.debug("cache", cache, item2.text);
          const translation = this.tansfromTranslation(cache);
          this.translateNow(item2, translation);
        } else {
          if (!this.noTranslate(item2.trimedText) && item2.text.length > 0) {
            this.initTranslationCount--;
            this.addTranslateJob(item2, item2.force);
          }
        }
      }
    });
  }
  // this.type: 翻译的大模型
  isVisited(element) {
    return element ? element.getAttribute("dy-tran-visited") === this.type : false;
  }
  setVisited(element) {
    if (element)
      element.setAttribute("dy-tran-visited", this.type);
  }
  clearVisited(element) {
    if (element)
      element.removeAttribute("dy-tran-visited");
  }
  isInline(item2) {
    const node = item2.root;
    if (this.rule.shouldTranslateBlock.length > 0 && node.nodeType === Node.ELEMENT_NODE && matchesAnySelector(node, this.rule.shouldTranslateBlock)) {
      return false;
    }
    if (this.rule.shouldTranslateInline.length > 0 && node.nodeType === Node.ELEMENT_NODE && matchesAnySelector(node, this.rule.shouldTranslateInline)) {
      return true;
    }
    const ruleDetails = {
      wordCount: 4,
      textCount: 24
    };
    let originalText = item2.trimedText || "";
    let wordCount = originalText.split(" ").length;
    let textLength = originalText.length;
    let lineCount = originalText.split("\n").length;
    if (wordCount <= ruleDetails.wordCount && textLength <= ruleDetails.textCount && lineCount < 2) {
      return true;
    }
    return false;
  }
  hasNonEmptyTextChild(node) {
    for (let i2 = 0; i2 < node.childNodes.length; i2++) {
      const child = node.childNodes[i2];
      if (child.nodeType === Node.TEXT_NODE || child.textContent && child.textContent.trim().length > 0) {
        return true;
      }
    }
    return false;
  }
  isContainer(node, e) {
    var _a;
    const nodeName = node.nodeName;
    const blackList = ["SCRIPT", "IMG", "#comment"];
    if (blackList.includes(nodeName)) {
      return false;
    }
    if (node.shadowRoot) {
      if (e.document !== node.shadowRoot) {
        this.translatePage({
          document: node.shadowRoot,
          styleRoot: node.shadowRoot,
          force: false,
          noCheck: false
        });
        return false;
      }
      return true;
    }
    if (node.nodeName === "FRAME" || node.nodeName === "IFRAME") {
      try {
        if (e.document !== ((_a = node.contentWindow) == null ? void 0 : _a.document.body)) {
          const translate = async () => {
            var _a2, _b, _c;
            this.translatePage({
              document: (_a2 = node.contentWindow) == null ? void 0 : _a2.document.body,
              styleRoot: ((_b = node.contentWindow) == null ? void 0 : _b.document.head) || ((_c = node.contentWindow) == null ? void 0 : _c.document.body),
              force: false,
              noCheck: false
            });
          };
          translate();
          if (node.addEventListener && node.removeEventListener) {
            node.removeEventListener("load", translate);
            node.addEventListener("load", translate);
          }
          return false;
        }
        return true;
      } catch (error) {
        return false;
      }
    }
    function isAnySelectorPresent(selectors) {
      for (let selector of selectors) {
        if (document.querySelector(selector)) {
          return true;
        }
      }
      return false;
    }
    const hasContainerSelector = this.rule.containerSelector.length > 0 && (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_NODE);
    if (hasContainerSelector && (isAnySelectorPresent(this.rule.containerSelector) || this.rule.justContainer)) {
      return matchesAnySelector(node, this.rule.containerSelector);
    }
    if (this.hasNonEmptyTextChild(node)) {
      return true;
    }
    return false;
  }
  async getCache(key2, type, domain) {
    const result = this.Cache.getCache(key2, type, domain);
    return result;
  }
  async setCache(key2, value, type, domain) {
    this.Cache.setCache(key2, value, type, domain);
  }
  shouldTranslate() {
    const blackList = this.rule.blackList;
    if (blackList.length === 0) {
      return true;
    }
    const currentUrl = window.location.href;
    for (let i2 = 0; i2 < blackList.length; i2++) {
      const regex = new RegExp(blackList[i2]);
      if (regex.test(currentUrl)) {
        return false;
      }
    }
    return true;
  }
  updateMainframe() {
    if (!this.mainFraime) {
      const { main, reable } = getMainframe();
      this.mainFraime = main;
      this.reable = reable;
      console.info("主要元素", this.mainFraime, this.reable);
    }
  }
  // 这里的translate并不会执行翻译，而是对一个item进行处理，将它处理后的放到lazyTranslateObserver.observe中
  // 真正的翻译是在lazyTranslateObserver中进行的
  translate(e) {
    function isElement(e2) {
      return e2.nodeType === Node.ELEMENT_NODE;
    }
    this.updateMainframe();
    const findContainer = (node) => {
      if (node === null) {
        return void 0;
      }
      if (isElement(node) && (isChildOrSelfOfAny(node, this.rule.noIncludeSelectors) || matchesAnySelector(node, [".yd-wrapper", ".yd-highlight"]) || this.isVisited(node)) && !e.force) {
        console.debug("拒绝翻译的node", node);
        return void 0;
      }
      if (this.isContainer(node, e)) {
        this.handleContainer(node, e);
        return void 0;
      }
      const children = this.getChildren(node);
      for (let i2 = 0; i2 < children.length; i2++) {
        findContainer(children[i2]);
      }
    };
    if (this.shouldTranslate()) {
      findContainer(e.document);
    } else {
      console.debug("黑名单");
    }
  }
  createLazyTranslateObserver() {
    this.lazyTranslateObserver = new IntersectionObserver((entries) => {
      console.debug("lazyTranslateObserver", entries);
      const fn = lodashExports.debounce((entries2) => {
        entries2.forEach((entry) => {
          if (entry.intersectionRatio >= 0) {
            if (!this.translated) {
              console.info("原文状态不翻译");
              return 0;
            }
            console.debug("lazyTranslateObserver", entry.targe);
            this.curentPriority += 1;
            if (this.job.has(entry.target)) {
              console.log(this.job.get(entry.target), "item");
              const values = this.job.get(entry.target);
              this.handleNoCheck(values);
            } else {
              this.handleContainer(entry.target, {
                document: document.body,
                force: false,
                noCheck: false
              });
            }
          }
        });
      }, 300);
      fn(entries);
    }, {
      root: null,
      // 多次重复触发，避免漏掉
      threshold: [0.5, 1]
    });
  }
  updateTranslation(e) {
    const updateTranslationObserver = new MutationObserver((mutations) => {
      let result = true;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE || !this.isVisited(node)) {
            result = false;
          }
        });
      });
      if (!result) {
        this.initTranslationCount = 300;
        this.curentPriority += 1;
      }
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!this.translated) {
            console.info("原文状态不翻译");
            return 0;
          }
          if (node.nodeType === node.ELEMENT_NODE && this.isVisited(node)) {
            return void 0;
          }
          if (node.nodeType === node.ELEMENT_NODE && isChildOrSelfOfAny(node, this.rule.noIncludeSelectors)) {
            console.debug("拒绝翻译的node", node);
            return void 0;
          }
          if (node.nodeType === node.ELEMENT_NODE && isChildOrSelfOfAny(node, [this.cssClassMap.container])) {
            console.debug("拒绝翻译Container的node", node);
            return void 0;
          }
          this.translate({
            document: node,
            force: false,
            noCheck: false
          });
        });
      });
    });
    updateTranslationObserver.observe(e, {
      childList: true,
      subtree: true
    });
    this.updateTranslationObservers.set(e, updateTranslationObserver);
  }
  makeitVisible() {
    this.styleInjectors.forEach((styleInjector) => {
      styleInjector.modifyClass(this.cssClassMap.container, `{
                display: inline !important;
                position: relative;
            }`);
    });
  }
  hideIt() {
    this.styleInjectors.forEach((styleInjector) => {
      styleInjector.modifyClass(this.cssClassMap.container, `{
                display: none !important;
                position: relative;
            }`);
    });
  }
  recoverFromOrignal() {
    this.job.forEachValue((v2, uuid) => {
      v2.forEach((v22) => {
        if (v22.translated && v22.itemParent && v22.children && v22.children.length > 0) {
          this.clearVisited(v22.root);
          v22.itemParent.innerHTML = "";
          v22.children.forEach((el) => {
            if (v22.itemParent)
              v22.itemParent.appendChild(el);
          });
        }
      });
    });
  }
  async toggle() {
    if (this.translated) {
      if (this.mode === "dual") {
        this.hideIt();
      } else {
        this.recoverFromOrignal();
      }
      this.changeTranslateSetting();
    } else {
      currentTranslator.removeTranslate(document.body);
      await currentTranslator.changeTranslateSetting();
      const config = {
        document: document.body,
        updateRoot: document,
        styleRoot: document.head || document.body,
        force: true,
        noCheck: true
      };
      await currentTranslator.translatePage(config);
      currentTranslator.makeitVisible();
    }
    await updateBadge(this.translated);
  }
  record() {
    const currentUrl = getUrlWithoutQuery();
    if (this.lastUrl !== currentUrl) {
      track(window, "urlChanged", {
        engine: this.type
      });
      this.lastUrl = currentUrl;
    }
  }
  async toggleMode() {
    if (this.mode === "dual") {
      this.job.forEachValue((v2, uuid) => {
        v2.forEach((v22) => {
          if (v22.translated && v22.wrapper) {
            v22.wrapper.innerHTML = "";
            if (v22.itemParent) {
              v22.itemParent.innerHTML = "";
              v22.itemParent.append(v22.html);
            } else {
              console.error("必须考虑v.root为空的情况");
            }
          }
        });
      });
    } else {
      this.job.forEachValue((v2, uuid) => {
        v2.forEach((v22) => {
          if (v22.translated && v22.itemParent && v22.children && v22.children.length > 0) {
            v22.itemParent.innerHTML = "";
            v22.children.forEach((el) => {
              if (v22.itemParent)
                v22.itemParent.appendChild(el);
            });
            v22.wrapper.append(v22.html);
          }
        });
      });
    }
    await this.getAndApplyUserConfig();
  }
  async checkIfRating() {
    const isMoreThanOneDay = (recordedDateTime) => {
      const recordedDate = new Date(recordedDateTime).getTime();
      const currentDate = (/* @__PURE__ */ new Date()).getTime();
      const difference = currentDate - recordedDate;
      return difference > 24 * 60 * 60 * 1e3;
    };
    const config = await getUserConfig();
    const days = config.installTime;
    if (!config.rated && isMoreThanOneDay(days)) {
      setTimeout(() => {
        try {
          UserRateCreator();
        } catch (error) {
          console.error(error);
        }
      }, 2e3);
    }
  }
}
let currentTranslator = new Translator();
currentTranslator.init();
ping();
browserPolyfillExports.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.debug("request", request);
  if (!currentTranslator) {
    currentTranslator = new Translator();
    currentTranslator.init();
  }
  const isToggle = request.action === "toggle";
  const isToggleMenu = request.action === "toggleMenu";
  const isToggleShortcut = request.action === "toggleShort";
  if (isToggle || isToggleMenu || isToggleShortcut) {
    const sameApi = currentTranslator.type === request.api;
    const sameDomain = currentTranslator.domain === request.domain;
    let promiseChain;
    if (sameApi && (sameDomain || isToggleMenu || isToggleShortcut)) {
      if (isToggleMenu) {
        track(window, "toggleMenu", { api: request.api, oldApi: currentTranslator.type, getOrignal: true, domain: request.domain });
      }
      if (isToggleShortcut) {
        track(window, "shortcutPage", { api: request.api, oldApi: currentTranslator.type, getOrignal: true, domain: request.domain });
      }
      promiseChain = currentTranslator == null ? void 0 : currentTranslator.toggle();
    } else {
      if (isToggleMenu) {
        track(window, "toggleMenu", { api: request.api, oldApi: currentTranslator.type, getOrignal: false, domain: request.domain });
      }
      if (isToggleShortcut) {
        track(window, "shortcutPage", { api: request.api, oldApi: currentTranslator.type, getOrignal: true, domain: request.domain });
      }
      if (currentTranslator.translated) {
        currentTranslator.recoverFromOrignal();
      }
      currentTranslator.removeTranslate(document.body);
      promiseChain = currentTranslator.changeTranslateSetting().then(() => {
        const config = {
          document: document.body,
          updateRoot: document,
          styleRoot: document.head || document.body,
          force: true,
          noCheck: true
        };
        return currentTranslator.translatePage(config);
      }).then(() => {
        currentTranslator.makeitVisible();
      });
    }
    currentTranslator == null ? void 0 : currentTranslator.checkIfRating();
    return promiseChain.then(() => {
      return updateBadge(currentTranslator == null ? void 0 : currentTranslator.translated);
    }).then(() => {
      return {
        translated: currentTranslator == null ? void 0 : currentTranslator.translated,
        isHealth: true
      };
    });
  } else if (request.action === "track") {
    if (request.event === "installed") {
      request.params["channel"] = "EDGE";
    }
    console.log(request.event, request.params, "????");
    track(window, request.event, request.params, request.withUrl);
    return Promise.resolve({
      translated: currentTranslator == null ? void 0 : currentTranslator.translated,
      isHealth: true
    });
  } else if (request.action === "getSetting") {
    return Promise.resolve({
      translated: currentTranslator == null ? void 0 : currentTranslator.translated,
      isHealth: true,
      type: currentTranslator == null ? void 0 : currentTranslator.type,
      mode: currentTranslator == null ? void 0 : currentTranslator.mode
    });
  } else if (request.action === "retry") {
    currentTranslator.retry(request.api);
    return Promise.resolve({
      translated: currentTranslator == null ? void 0 : currentTranslator.translated,
      isHealth: true
    });
  } else if (request.action === "toggleSubtilte") {
    if (request.status) {
      currentTranslator.enhanceXspace();
    } else {
      currentTranslator.unEnhanceXspace();
    }
    return Promise.resolve(true);
  }
});
