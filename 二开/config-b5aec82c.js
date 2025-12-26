const productName = "有道灵动翻译";
const key = "s";
const logoPath = "logo.svg";
const brandPath = "brand.svg";
const job = "fetchConfig";
const hightlightStyle = [`{}`, `{ text-decoration: underline;}`, `{ background-color: #ffff23;}`, {
  original: `{ filter: blur(6px); transition: filter 0.2s ease !important;border-radius: 8px;}`,
  hover: `{ filter: blur(0px);}`,
  active: `{ filter: blur(0px);}`
}];
const rules = {
  // 全局规则
  globalRules: {
    // 黑名单
    blackList: [],
    // 注入样式 如目标网站限制了元素高度，导致翻译内容无法显示，可以通过这个属性注入样式使得max-height：unset
    injectStyles: {},
    // 需要翻译的内容
    containerSelector: [],
    // 修改了，这部份元素强制认为是行内元素
    inlineSelectors: [
      "a",
      "abbr",
      "acronym",
      "b",
      "bdo",
      "big",
      "cite",
      "code",
      "del",
      "dfn",
      "em",
      "font",
      "i",
      "img",
      "ins",
      "kbd",
      "label",
      "link",
      "mark",
      "meta",
      "nobr",
      "nobr",
      "q",
      "script",
      "small",
      "span",
      "strong",
      "style",
      "sub",
      "sup",
      "time",
      "tt",
      "u"
    ],
    // 强制认为是行内元素
    blockSelectors: [],
    // 不翻译, 避免重复翻译 .notranslate
    noIncludeSelectors: ["math", "pre code", ".sr-only", "style", "noscript", "script", "svg", "desc", "i", '[aria-hidden="true"]', ".notranslate"],
    // 保存原文的标签，即行内元素的部份内容不翻译（如文字+emoji表情，表情不翻译）
    noTranslateSelectors: ["code", "tt", "sup", "sub", "g-emoji"],
    // 下面两行， 在src/content/index.ts isInline()函数决定翻译出来的内容应该行内复制还是另起一行
    // 目前在上述文件中另外有赋值，这里的值不会生效
    textCount: 4,
    wordCount: 2
  },
  // 针对特定网站的规则
  specificRules: [
    {
      pattern: ["https://[^/]+.apache.org/guides?.*"],
      noTranslateSelectors: [".verbatim"]
    },
    {
      pattern: ["https://browse.arxiv.org/html"],
      noTranslateSelectors: ["cite"]
    },
    {
      pattern: ["https://www.bing.com/search?.*", "https://cn.bing.com/search?.*"],
      injectStyles: {
        ".tpcn .tptt": "max-height: unset !important;height:unset !important",
        "#b_results .b_algo .tpcn .b_attribution": "max-height: unset !important;height:unset !important"
      }
    },
    {
      pattern: ["https://ar5iv.labs.arxiv.org/html/.*"],
      forceInlineSelectors: ["math", "annotation"]
    },
    {
      pattern: ["https://www.mdpi.com/.*"],
      noIncludeSelectors: ["header", "#table_of_contents"]
    },
    {
      pattern: [".*16personalities.com.*"],
      noIncludeSelectors: [".nav__text"]
    },
    {
      pattern: [".*discord.com"],
      noIncludeSelectors: ['h3[class^="header-"]'],
      noTranslateSelectors: ["a"]
    },
    {
      pattern: [".*twitch.tv.*"],
      shouldTranslateBlock: ["h3[title]", '[class*="CoreText"]', ".chat-line__message > div", '[data-a-target="chat-message-text"]'],
      noTranslateSelectors: [".side-bar-contents", '[data-a-target="side-nav-title"]', '[data-a-target="side-nav-game-title"]'],
      noIncludeSelectors: [".chat-room__content  p[title]", ".chat-line__username"]
    },
    {
      pattern: [".*tiktok.com.*"],
      injectStyles: {
        '[data-e2e="search-card-video-caption"] [class*="DivMusicText"]': "-webkit-line-clamp: unset !important;max-height: unset !important;"
      },
      noTranslateSelectors: ['[data-e2e="search-common-link]'],
      forceInlineSelectors: ['[data-e2e="search-common-link"]'],
      noIncludeSelectors: ['[class*="StyledAuthorAnchor"]', '[class*="DivMusicText"]', '[class*="DivActionContainer"]', '[data-e2e="browse-username"]', '[data-e2e="comment-username-1"]', ".avatar-anchor", '[data-e2e="like-count"]', '[data-e2e="comment-icon"]', '[data-e2e="share-icon"]', '[data-e2e="undefined-icon"]']
    },
    {
      pattern: [".*economist.com.*"],
      forceInlineSelectors: ['[data-caps="initial"]', "small"]
    },
    {
      pattern: [".*wsj.com.*"],
      noIncludeSelectors: ['[role="banner"]', '[aria-label="Primary Navigation"]']
    },
    {
      pattern: ["www.google.*/search.*"],
      injectStyles: {
        ".lEBKkf": "display: unset !important;"
      },
      containerSelector: [".MjjYud"],
      inlineSelectors: [],
      blockSelectors: [],
      noIncludeSelectors: ["div.NJjxre", ".appbar", ".Mg1HEd"],
      noTranslateSelectors: []
    },
    {
      pattern: [".*youtube.com"],
      injectStyles: {
        "#video-title": "-webkit-line-clamp: unset !important;max-height: unset !important;",
        ".metadata-snippet-text, .ytd-video-renderer": "-webkit-line-clamp: unset !important;max-height: unset !important",
        "h1.ytd-watch-metadata": "-webkit-line-clamp: unset !important;max-height: unset !important;"
      },
      containerSelector: ["#video-title", "#title", "#content-text", "#description", ".metadata-snippet-text"],
      inlineSelectors: [],
      blockSelectors: [],
      noIncludeSelectors: [],
      noTranslateSelectors: []
    },
    {
      pattern: [".*mail.google.com.*"]
    },
    {
      pattern: [".*developer.mozilla.org.*"],
      noIncludeSelectors: [".article-actions-container", ".top-navigation", "#sidebar-quicklinks", ".pong-box", ".bc-table"]
    },
    {
      pattern: [".*wikipedia.org.*"],
      forceBlockSelectors: [".wikipedia-languages-langs > ul"],
      forceInlineSelectors: [".wikipedia-languages-langs > ul li"],
      noIncludeSelectors: [".link-box", ".central-textlogo", ".mw-header", ".mw-editsection", ".references li", "pre"],
      ignoreImageSize: [20, 20]
    },
    {
      pattern: [".*.stackoverflow.com.*"],
      noIncludeSelectors: ['[data-value="ScoreDesc] *', ".s-pagination--item__clear", "#feed-link a", ".no-tag-menu", ".s-post-summary--meta", ".js-post-summary-stats", ".ws-nowrap", ".fw-wrap", ".js-top-bar", ".js-sticky-leftnav", ".js-gps-related-tags", ".js-hidden.dno", ".s-pagination--item", "#mainbar .yd-wrapper-block", ".bottom-notice div", "#post-editor", "[data-answercount]"]
    },
    {
      pattern: [".*twitter.com.*"],
      injectStyles: {},
      containerSelector: ['[data-testid="activeRoute"]', '[data-testid="tweetText"]', '[data-testid="card.wrapper"]', '[data-testid="card.layoutLarge.detail"]', '[data-testid="UserCell"]'],
      inlineSelectors: [],
      forceInlineSelectors: [".r-xoduu5 [role=link]"],
      blockSelectors: [],
      noIncludeSelectors: [],
      noTranslateSelectors: ['[data-testid="tweetText"] a', "img", ".r-xoduu5 [role=link]"]
    },
    {
      pattern: ["https://github.com.*"],
      injectStyles: {},
      containerSelector: [".pinned-item-desc", ".markdown-body", "#conduit-feed-frame li", "li.repo-list-item p", "[aria_label='repo description']", ".LjnbQ", "#readme", ".pr-md-2", ".Layout-main .v-align-middle", ".repo-list .wb-break-word", ".user-select-contain p", ".mt-4  .wb-break-word", "#js-discussions-timeline-anchor-loader p", ".PageLayout-content  .Link--primary", '[aria-label="card content"]'],
      inlineSelectors: ["g-emoji", "a.anchor"],
      blockSelectors: [],
      noIncludeSelectors: ['[id="repos-file-tree"]', "pre", ".DUrqY", ".cvduTM", ".opened-by", ".code-list", '[data-testid="search-sub-header"]', '[data-testid="facets-pane"]', "#search-filters-title", ".AppHeader-search", ".search-title"],
      noTranslateSelectors: [".IssueLabel", ".issue-link", ".commit-build-statuses > a"],
      justContainer: false
    },
    {
      pattern: [".*bbc.com.*"],
      noIncludeSelectors: [".drop-capped"]
    },
    {
      pattern: [".*slack.com.*"]
    },
    {
      pattern: [".*developer.apple.com/forums/.*"],
      noIncludeSelectors: [".actions", ".down-vote", ".up-vote", ".author-timestamp-wrapper", '[aria-label="Code"]']
    },
    {
      pattern: [".*developer.apple.com/documentation.*"],
      containerSelector: [".main", "h3.title", "main"]
    },
    //www.linkedin.com"
    {
      pattern: [".*www.linkedin.com/jobs/.*"],
      injectStyles: {},
      containerSelector: ["#job-details > span"]
    },
    // medium.com
    {
      pattern: [".*medium.com.*"],
      noIncludeSelectors: ["hi", ".gi", ".bp .yd-wrapper-inline", "#scroller-items .s", ".ai", ".gg", ".js.bp", "pre", ".yl", ".q span"],
      injectStyles: {
        "h2, p": "-webkit-line-clamp: unset !important;max-height: unset !important;"
      }
    },
    // //developer.android.google.cn
    // {
    // },
    // //www.ebay.com"
    // {
    // },
    // // "www.goodreads.com"
    {
      pattern: [".*goodreads.com.*"],
      noIncludeSelectors: [".ReviewerProfile__info", ".ReviewCard__row", ".SocialFooter div", ".Header__contents", ".RatingsHistogram__labelTotal", ".RatingsHistogram__labelTitle", ".RatingStatistics__meta", ".Text__title3"],
      forceBlockSelectors: [".CollapsableList"],
      forceInlineSelectors: [".CollapsableList .Button__labelItem"]
    },
    // //www.businessinsider.com
    {
      pattern: [".*businessinsider.com.*"],
      noIncludeSelectors: ["header > div", ".group-icons", ".share-icon-dropdown-container"],
      forceBlockSelectors: [".subnav-navigation"],
      forceInlineSelectors: [".subnav-item a"]
    },
    // quora.com
    {
      pattern: [".*quora.com.*"],
      noIncludeSelectors: [".post_timestamp", ".qu-zIndex--header"]
    },
    {
      pattern: [".*reddit.com.*"],
      injectStyles: {
        "div.XPromoBottomBar": "display:none",
        "._292iotee39Lmt0MkQZ2hPV::-webkit-scrollbar": "display:none"
      },
      containerSelector: [".PostHeader__post-title-line", "[data-testid=comment]", '[data-adclicklocation="title"]', '[data-adclicklocation="media"]', "h2", ".tbIApBd2DM_drfZQJjIum", "._2QhEclR_DjIrTv_oNU5MMN", "div[slot=title]", "div[slot=text-body]", "#-post-rtjson-content", '[data-test-id="post-content"]'],
      inlineSelectors: [],
      forceInlineSelectors: ['[data-adclicklocation="title"]'],
      blockSelectors: [],
      noIncludeSelectors: [],
      noTranslateSelectors: ['[data-testid="outbound-link"]']
    },
    {
      pattern: [".*paulgraham.*"],
      forceBlockSelectors: [],
      removeInnerNewlinesAndMultipleSpaces: true
    },
    {
      pattern: [".*ncode.syosetu.com.*"],
      shouldTranslateBlock: [".novel_sublist2"]
    },
    {
      pattern: [".*archiveofourown.org.*"],
      noIncludeSelectors: [".tags", ".stats", '[aria-label="Pagination"]']
    },
    {
      pattern: ["https://github.blog/.*"]
    },
    {
      pattern: [".*www.pixiv.net.*"],
      injectStyles: {
        'div[title], [id^="expandable-paragraph-"]': "-webkit-line-clamp: unset !important;max-height: unset !important;"
      }
    },
    {
      pattern: [".*.pinterest.com.*"],
      injectStyles: {
        '[role="listitem"], [data-test-id="bestIdeasContainer"]': "-webkit-line-clamp: unset !important;max-height: unset !important; height: unset !important"
      }
    },
    {
      pattern: [".*wowhead.com.*"],
      forceInlineSelectors: ["header-nav > a"],
      noIncludeSelectors: [".header-nav-wrapper", ".header-wrapper"],
      injectStyles: {
        ".news-recent-posts-rows>div": "-webkit-line-clamp: unset !important;height: unset !important;",
        ".footer-content .footer-list li": "white-space: unset !important"
      },
      shouldTranslateBlock: [".footer-list-item"]
    },
    {
      pattern: [".*www.amazon.com.*"],
      injectStyles: {
        ".truncate-2line": "-webkit-line-clamp: unset !important;height: unset !important;"
      },
      noIncludeSelectors: [".navFooterDescText", "#cm_cr-brdcmb"]
    },
    {
      pattern: [".*temu.com.*"],
      noIncludeSelectors: ['[data-type="saleTips"]', '[id="mallHeader"]']
    },
    {
      pattern: [".*byrut.org.*"],
      injectStyles: {
        ".rcomm_text": "-webkit-line-clamp: unset !important;height: unset !important;"
      },
      noIncludeSelectors: [".date", ".status", ".size", ".view", ".rcomm_meta", ".header-main", "headers", ".nav-menu", ".side-two", ".itemtop-subtitle", ".comm-one_line", ".comm-av"]
    },
    {
      pattern: [".*sciencedirect.com.*"],
      containerSelector: ['[data-iso-key="_0"]']
    },
    {
      pattern: [".*chinadaily.com.*"],
      noIncludeSelectors: [".topBar", ".topBar", ".dropdown", ".dropdown *", ".topNav2_art"]
    },
    {
      pattern: [".*civitai.com.*"],
      noIncludeSelectors: [".mantine-Card-root *", "mantine-Accordion-item *", ".mantine-Accordion-panel"]
    },
    {
      pattern: [".*chub.ai.*"],
      noIncludeSelectors: [".tooltip"]
    },
    {
      pattern: [".*npmjs.com.*"],
      containerSelector: ["#readme"],
      noIncludeSelectors: ['[role="tablist"]', "pre"],
      justContainer: false
    },
    {
      pattern: [".*reuters.com.*"],
      noIncludeSelectors: ['[class^="market-bar__body"]', '[data-testid="SiteHeader"]']
    }
  ]
};
const OldQueueSetting = {
  youdao: {
    initTranslationCount: 3e3,
    intervalCap: 10,
    interval: 1e3,
    concurrency: 10
  },
  youdaollm: {
    initTranslationCount: 200,
    intervalCap: 7,
    interval: 1e3,
    concurrency: 7
  }
};
export {
  OldQueueSetting as O,
  brandPath as b,
  hightlightStyle as h,
  job as j,
  key as k,
  logoPath as l,
  productName as p,
  rules as r
};
