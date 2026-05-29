import { marked } from 'https://cdn.bootcdn.net/ajax/libs/marked/16.3.0/lib/marked.esm.js';

// ────────────────────────────
// STYLE INJECTION（仅一次）
// ────────────────────────────
let styleInjected = false;
const MD_STYLES = `
.md-rendered { font-size: 14px; line-height: 1.8; color: #2c2c2a; padding: 4px 0; }
.md-rendered h1 { font-size: 20px; margin-bottom: 8px; }
.md-rendered h2 { font-size: 17px; margin: 12px 0 6px; }
.md-rendered h3 { font-size: 15px; margin: 10px 0 4px; }
.md-rendered p { margin-bottom: 10px; }
.md-rendered blockquote {
    margin: 8px 0; padding: 4px 14px;
    border-left: 3px solid #5385e0; color: #6b6b65;
    background: #fafaf7; border-radius: 0 10px 10px 0;
}
.md-rendered ul, .md-rendered ol { margin: 6px 0 10px; padding-left: 20px; }
.md-rendered li { margin-bottom: 4px; }
.md-rendered a { color: #5385e0; text-decoration: none; }
.md-rendered a:hover { color: #1361f1; }
.md-rendered hr { border: none; border-top: 1px solid #e8e6e1; margin: 14px 0; }
.md-rendered strong { font-weight: 700; }
.md-rendered em { font-style: italic; }
.md-rendered code {
    background: #f7f6f2; padding: 1px 6px; border-radius: 4px; font-size: 13px;
}
.md-rendered pre {
    background: #f7f6f2; padding: 12px 14px; border-radius: 10px;
    overflow-x: auto; margin: 8px 0; border: 1px solid #e8e6e1;
}
.md-rendered pre code { background: none; padding: 0; border-radius: 0; }
.md-rendered img { max-width: 100%; border-radius: 10px; }
.md-rendered table { border-collapse: collapse; width: 100%; margin: 8px 0; }
.md-rendered th, .md-rendered td {
    border: 1px solid #e8e6e1; padding: 6px 12px; text-align: left;
}
.md-rendered th { background: #f7f6f2; font-weight: 700; }
`;

function injectStyles() {
    if (styleInjected) return;
    const style = document.createElement('style');
    style.id = 'md-renderer-styles';
    style.textContent = MD_STYLES;
    document.head.appendChild(style);
    styleInjected = true;
}

// ────────────────────────────
// CUSTOM RENDERER（{target=_blank} / {new} 扩展）
// ────────────────────────────
function preprocess(md) {
    // [text](url){target=xxx} → [text](url "$$t=xxx")
    md = md.replace(/\]\((.+?)\)\{target=(.+?)\}/g, ']($1 "$$t=$2")');
    // [text](url){new} → [text](url "$$t=_blank")
    md = md.replace(/\]\((.+?)\)\{new\}/g, ']($1 "$$t=_blank")');
    return md;
}

const renderer = {
    link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const attrs = [`href="${href}"`];

        if (title && title.startsWith('$t=')) {
            const target = title.slice(3);
            attrs.push(`target="${target}"`);
            if (target === '_blank') attrs.push('rel="noopener noreferrer"');
        } else if (title) {
            attrs.push(`title="${title}"`);
        }

        return `<a ${attrs.join(' ')}>${text}</a>`;
    }
};

marked.use({ renderer });

// ────────────────────────────
// PUBLIC API
// ────────────────────────────
/**
 * 将 markdown 渲染到指定容器
 * @param {string|Element} elOrId - 容器元素或 id
 * @param {string} md - Markdown 字符串
 */
export function renderMD(elOrId, md) {
    injectStyles();
    const el = typeof elOrId === 'string' ? document.getElementById(elOrId) : elOrId;
    if (!el) return;
    el.classList.add('md-rendered');
    el.innerHTML = marked.parse(preprocess(md));
}
