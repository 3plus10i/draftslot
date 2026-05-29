import { renderMD } from './md-renderer.js';

// ────────────────────────────
// DEFAULT DATA
// ────────────────────────────
const defaultPools = {
    person: [
        '大厂35岁员工', '985文科毕业生', '延毕博士', '抑郁症患者', '鸡娃父母',
        '一年制英硕', '考研二战生', '双非学历者', 'AI创业新秀', '县城做题家',
        '精英幻觉患者', '脆皮年轻人', '小镇贵族梦者', '中产返贫者', '一线城市漂流者',
        '独立女性大女主', '讨好型人格者', '社恐社牛之间的人', '情感模式迷茫者', '破产精英',
        '高敏感人', '回避型人', 'NPD自恋型人格者', '被PUA者', '体验过Gaslighting者',
        '低能量体质者', '低欲望青年', '数字游民', '灵活就业者', '情绪破产者',
        '精神贵族', '复古主义者', '育儿焦虑家长', '鸡自己的一代', '幸存者内疚者',
        '共情疲劳者', '表达欲消失者', '浪漫稀缺追求者', '关系降级中的人', '成年人友谊困惑者',
        '废墟感携带者', '末世感体验者', '独立开发创业者', '产品经理宇宙中人', 'UX/UI设计师',
        'Notion人生管理者', 'Obsidian第二大脑建设者', '读博还是创业纠结者', '语言羞耻者', '东亚小孩', 'QS前50退学', 'ADHD患者',
        'INFJ', 'INFP', 'INTJ', 'INTP', 'ISFJ', 'ISFP', 'ISTJ', 'ISTP',
        'ENFJ', 'ENFP', 'ENTJ', 'ENTP', 'ESFJ', 'ESFP', 'ESTJ', 'ESTP',
        
    ],
    event: [
        '房子贬值', '过年回家', '秋招面试', '职场PUA', '情感冷暴力',
        '裁员降薪', '家庭变故', '心理疾病爆发', '学历通胀冲击', '阶层滑落',
        '婚育恐惧降临', '精神内耗加重', '原生家庭冲突', '身份焦虑升级', '宏大叙事崩塌',
        '消费降级来临', '祛魅后的空心', '同辈压力逼近', '文化断裂显现', '存在意义流失',
        '35岁危机', '职业倦怠', '行业骤变', '信息茧房', '多巴胺陷阱沉溺',
        '皮质醇爆表', '血清素不足', '关系降级', '共情疲劳', '表达通胀',
        '浪漫稀缺', '激情耗尽', '意念回复沟通障碍', '情绪掉帧', '羞耻感袭来',
        '无力感弥漫', '社交电量耗尽', '社会性死亡风险', '审美积累焦虑', 'AI大模型冲击',
        'token思维训练', '课题分离困惑', '客体需要缺失', '主体性迷茫', '性别叙事困扰',
        '性压抑', '创伤反应持续', '依恋类型冲突', '戒断反应', '定义词回声','疲劳北上广', '西方幻梦', '原生家庭破碎', '核心家庭破碎'
    ],
    choice: [
        '遁入寺庙修行', '回到县城生活', '开启副业探索', '寻找同伴', '去看精神科医生',
        '开始正念冥想', '学历提升', '换份工作重启', '打离婚官司', '独立开发创业',
        '成为数字游民', '一人公司运营', '远程办公切换', 'Prompt工程师转身', '知识付费变现',
        '润出国生活', '进大厂价值观刷新', '斜杠青年身份', '写作记录自救', '建立弱连接圈层',
        '健身续命', '冰美式续命', '褪黑素续命', '考公考编', '做外包员工',
        '跟进业务转型', '定期复盘', '向上管理', '表演型工作应对', '学习钝感力',
        '尝试搭子文化', '体验Crush与暧昧', '建立边界感', '进行课题分离', '训练前额叶控制',
        '发展主体性', '摆脱性别叙事', '戒除多巴胺陷阱', '补充血清素', '人生重启计划',
        '重构自我叙事', '建立个人品牌', '输出LinkedIn精英内容', '在X上发布暴论', '制作YouTube长视频',
        '收听播客疗愈', '购买知识付费课程', '学习AI副业技巧', '使用Notion人生管理', '构建Obsidian第二大脑', 'gap year', '寻找松弛感', '开启奥德赛', '寻找搭子', '知识付费'
    ]
};

// ────────────────────────────
// TITLE TEMPLATES
// ────────────────────────────
const titleTemplates = [
    '《{person}决定去{choice}》',
    '《{person}，困在{event}里》',
    '《被{event}困住的{person}》',
    '《一个{person}与{event}的对话》',
    '《{event}不欢迎{person}》',
    '《{person}在{event}之后{choice}》',
    '《关于{person}的{event}和{choice}》',
    '《当{person}遇见{event}，TA选择{choice}》',
    '《30岁开始{choice}，为了逃离{event}》',
    '《{person}和ta的{event}之旅》',
    '《{event}里的{person}，不浪漫，也不幻想》',
    '《{choice}，和{person}背后的{event}》',
    '《我在{event}的60天：{person}，{choice}》',
    '《{event}之后，一个{person}打算{choice}》',
    '《{person}{event}，这不是再正常不过的事吗》',
    '《{person}{choice}后，突然发现{event}》',
    '《那些{person}，回到了{event}的世界》',
    '《一份忧伤的{person}{choice}百科》',
    '《{choice}的{person}：人生不能过早投降》',
    '《{choice}的{person}发呆的一年：哪有什么命运呢》',
    '《我，30岁，不敢{choice}》',
    '《识别与脱离「{event}」的枷锁》',
    '《难道「{event}」就是终点？{person}{choice}》',
    '《逃离{event}》',
    '《{person}：{event}十年，我后悔了》',
    '《{person}的人生任务：{choice}》',
    '《{person}再也不{choice}》',
    '《{event}后才知道，只有{person}是不能{choice}的》',
    '《那些悄悄消失的{person}：在{choice}之前，TA们做了什么？》',
    '《{person}：终止{choice}，在{event}之后》',
];

// ────────────────────────────
// TAG BRANDING (image + slogan)
// ────────────────────────────
const tagMap = {
    '正面连接': '面对复杂。',
    '极昼工作室': '为坚持严肃阅读的人提供选项',
    '真实故事计划': '从生命里拿出故事',
    '人物': '人是万物的尺度',
    '谷雨实验室': '聚焦深度图文',
    '看理想': '看见另一种可能',
    '新世相': '提供精神力量，服务美好生活',
    '看客insight': '看看这个荒诞又有趣的世界',
    '天才捕手计划': '捕捉最带劲儿的亲身经历',
};
const tagNames = Object.keys(tagMap);
const tagImgBase = './journals/';

function getRandomTag() {
    const name = tagNames[Math.floor(Math.random() * tagNames.length)];
    return { name, slogan: tagMap[name] };
}

// ────────────────────────────
// SESSION STORAGE HELPERS
// ────────────────────────────
function getPool(key) {
    const stored = sessionStorage.getItem('pool_' + key);
    if (stored) {
        try { return JSON.parse(stored); } catch (e) { /* fall through */ }
    }
    return [...defaultPools[key]];
}

function setPool(key, arr) {
    sessionStorage.setItem('pool_' + key, JSON.stringify(arr));
}

function getResults() {
    const stored = sessionStorage.getItem('results');
    if (stored) {
        try { return JSON.parse(stored); } catch (e) { /* fall through */ }
    }
    return [];
}

function setResults(arr) {
    sessionStorage.setItem('results', JSON.stringify(arr));
}

function resetPool(key) {
    sessionStorage.removeItem('pool_' + key);
}

function resetAllResults() {
    sessionStorage.removeItem('results');
}

// ────────────────────────────
// DOM REFS
// ────────────────────────────
const slotPerson = document.getElementById('slotPerson');
const slotEvent = document.getElementById('slotEvent');
const slotChoice = document.getElementById('slotChoice');
const spinOnceBtn = document.getElementById('spinOnceBtn');
const spinFiveBtn = document.getElementById('spinFiveBtn');
const outputList = document.getElementById('outputList');
const outputCount = document.getElementById('outputCount');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalTextarea = document.getElementById('modalTextarea');
const modalSave = document.getElementById('modalSave');
const modalReset = document.getElementById('modalReset');
const modalCancel = document.getElementById('modalCancel');
const modalClose = document.getElementById('modalClose');
const confirmOverlay = document.getElementById('confirmOverlay');
const confirmTitle = document.getElementById('confirmTitle');
const confirmMessage = document.getElementById('confirmMessage');
const confirmOk = document.getElementById('confirmOk');
const confirmCancel = document.getElementById('confirmCancel');
const confirmClose = document.getElementById('confirmClose');
const allEditBtns = document.querySelectorAll('.slot-edit-btn');

let currentEditPool = null; // 'person' | 'event' | 'choice'
let confirmCallback = null;
let isSpinning = false;
let pendingSpins = 0;
let results = getResults();

// ────────────────────────────
// RENDER RESULTS
// ────────────────────────────
function renderResults() {
    if (results.length === 0) {
        outputList.innerHTML = '<div class="output-empty">点击上方按钮，生成第一条标题</div>';
    } else {
        outputList.innerHTML = results.map((r, i) => {
            const tag = r.tagName || '';
            const imgHtml = tag ? `<img class="bg-img" src="${tagImgBase}${tag}.jpg" />` : '';
            const sloganHtml = r.tagSlogan ? `<span class="bg-slogan">${escapeHTML(r.tagSlogan)}</span>` : '';
            return `<div class="output-item">
                <div class="meta-line">#${i + 1} [ ${escapeHTML(r.person)} / ${escapeHTML(r.event)} / ${escapeHTML(r.choice)} ]</div>
                <div class="title-line">${escapeHTML(r.title)}</div>
                ${imgHtml}${sloganHtml}
            </div>`;
        }).join('');
        // scroll to bottom
        outputList.scrollTop = outputList.scrollHeight;
    }
    outputCount.textContent = results.length + ' 条';
}

function addResult(title, person, event, choice) {
    const tag = getRandomTag();
    results.push({ title, person, event, choice, tagName: tag.name, tagSlogan: tag.slogan, time: Date.now() });
    setResults(results);
    renderResults();
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ────────────────────────────
// SPIN LOGIC
// ────────────────────────────
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function buildTitle(person, event, choice) {
    const tpl = getRandomItem(titleTemplates);
    return tpl
        .replace('{person}', person)
        .replace('{event}', event)
        .replace('{choice}', choice);
}

function setButtonsEnabled(enabled) {
    spinOnceBtn.disabled = !enabled;
    spinFiveBtn.disabled = !enabled;
}

function spinMultiple(n) {
    if (isSpinning) return;
    pendingSpins = n - 1;
    spin();
}

function spin() {
    if (isSpinning) return;
    isSpinning = true;
    setButtonsEnabled(false);

    const poolPerson = getPool('person');
    const poolEvent = getPool('event');
    const poolChoice = getPool('choice');

    if (poolPerson.length === 0 || poolEvent.length === 0 || poolChoice.length === 0) {
        alert('请确保三个词库至少各有一个词条。');
        isSpinning = false;
        setButtonsEnabled(true);
        return;
    }

    // Pre-select final items
    const finalPerson = getRandomItem(poolPerson);
    const finalEvent = getRandomItem(poolEvent);
    const finalChoice = getRandomItem(poolChoice);

    // Reset slot styles
    [slotPerson, slotEvent, slotChoice].forEach(s => {
        s.classList.remove('rolling', 'done');
    });
    slotPerson.classList.add('rolling');
    slotEvent.classList.add('rolling');
    slotChoice.classList.add('rolling');

    // Rolling intervals
    const intervals = [];
    const slots = [
        { el: slotPerson, pool: poolPerson, final: finalPerson, stopAt: 900 },
        { el: slotEvent, pool: poolEvent, final: finalEvent, stopAt: 1600 },
        { el: slotChoice, pool: poolChoice, final: finalChoice, stopAt: 2300 },
    ];

    const startTime = Date.now();

    slots.forEach((slot) => {
        const interval = setInterval(() => {
            slot.el.textContent = getRandomItem(slot.pool);
        }, 65);
        intervals.push({ interval, slot });
    });

    // Stop each slot at its designated time
    slots.forEach((slot, idx) => {
        const delay = slot.stopAt;
        setTimeout(() => {
            clearInterval(intervals[idx].interval);
            slot.el.textContent = slot.final;
            slot.el.classList.remove('rolling');
            slot.el.classList.add('done');

            // Check if all done
            if (idx === slots.length - 1) {
                // Last slot stopped
                setTimeout(() => {
                    const title = buildTitle(finalPerson, finalEvent, finalChoice);
                    addResult(title, finalPerson, finalEvent, finalChoice);
                    isSpinning = false;
                    setButtonsEnabled(true);
                    if (pendingSpins > 0) {
                        pendingSpins--;
                        spin();
                    }
                }, 300);
            }
        }, delay);
    });
}

// ────────────────────────────
// MODAL LOGIC
// ────────────────────────────
function openModal(poolKey) {
    if (isSpinning) return;
    currentEditPool = poolKey;
    const data = getPool(poolKey);
    modalTextarea.value = data.join('\n');
    const labels = { person: '人物集合', event: '事件集合', choice: '选择集合' };
    modalTitle.textContent = '编辑：' + labels[poolKey];
    modalOverlay.style.display = 'flex';
    modalTextarea.focus();
}

function closeModal() {
    modalOverlay.style.display = 'none';
    currentEditPool = null;
}

function saveModal() {
    if (!currentEditPool) return;
    const raw = modalTextarea.value;
    const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) {
        alert('至少需要保留一个词条。');
        return;
    }
    setPool(currentEditPool, lines);
    // Update slot display if it's not currently rolling
    if (!isSpinning) {
        const slotMap = { person: slotPerson, event: slotEvent, choice: slotChoice };
        const el = slotMap[currentEditPool];
        if (el && !el.classList.contains('rolling') && !el.classList.contains('done')) {
            el.textContent = getRandomItem(lines);
        }
    }
    closeModal();
}

function resetModal() {
    if (!currentEditPool) return;
    showConfirm('恢复默认词库', '确定恢复为默认词库吗？当前编辑内容将丢失。', () => {
        resetPool(currentEditPool);
        const data = getPool(currentEditPool);
        modalTextarea.value = data.join('\n');
        if (!isSpinning) {
            const slotMap = { person: slotPerson, event: slotEvent, choice: slotChoice };
            const el = slotMap[currentEditPool];
            if (el && !el.classList.contains('rolling') && !el.classList.contains('done')) {
                el.textContent = getRandomItem(data);
            }
        }
    });
}

// ────────────────────────────
// CONFIRM MODAL
// ────────────────────────────
function showConfirm(title, message, onConfirm) {
    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    confirmCallback = onConfirm;
    confirmOverlay.style.display = 'flex';
}

function hideConfirm() {
    confirmOverlay.style.display = 'none';
    confirmCallback = null;
}

// ────────────────────────────
// EVENT LISTENERS
// ────────────────────────────
spinOnceBtn.addEventListener('click', () => spinMultiple(1));
spinFiveBtn.addEventListener('click', () => spinMultiple(5));

copyBtn.addEventListener('click', () => {
    const feedbackEl = copyBtn.querySelector('.btn-text-full');
    if (results.length === 0) {
        feedbackEl.textContent = '啥也没有啊！';
        setTimeout(() => { feedbackEl.textContent = '复制结果'; }, 1500);
        return;
    }
    let text = results.map((r, i) => {
        return `#${i + 1} [ ${r.person} / ${r.event} / ${r.choice} ]\n${r.title}`;
    }).join('\n');
    // 追加小尾巴
    text += '\n来自随机选题工具DraftSlot：https://draftslot.3plus10i.top/'
    navigator.clipboard.writeText(text).then(() => {
        feedbackEl.textContent = '已复制!';
        setTimeout(() => { feedbackEl.textContent = '复制结果'; }, 1500);
    }).catch(() => {
        alert('复制失败，请重试');
    });
});

clearBtn.addEventListener('click', () => {
    if (isSpinning) return;
    if (results.length === 0) return;
    showConfirm('清空记录', '确定清空所有生成记录吗？此操作不可恢复。', () => {
        results = [];
        resetAllResults();
        renderResults();
    });
});

allEditBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const poolKey = btn.getAttribute('data-pool');
        if (poolKey) openModal(poolKey);
    });
});

modalSave.addEventListener('click', saveModal);
modalReset.addEventListener('click', resetModal);
modalCancel.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

confirmOk.addEventListener('click', () => {
    if (confirmCallback) confirmCallback();
    hideConfirm();
});
confirmCancel.addEventListener('click', hideConfirm);
confirmClose.addEventListener('click', hideConfirm);
confirmOverlay.addEventListener('click', (e) => {
    if (e.target === confirmOverlay) hideConfirm();
});

// About Modal - Markdown content
const aboutMD = `# 次世代AI超智能选题工具  
点击按钮，生成中文互联网非虚构写作博文标题。  
本项目仅供娱乐。  
[项目仓库](https://github.com/3plus10i/draftslot){new}

---
页面上出现的杂志图标和相关标语仅作视觉参考，与具体文案内容无关。版权属于其所有者，商用请联系原作者。  

---
# AI怎么看  
> 我：这些标题的共性是什么？特点是什么？作为非虚构网络媒体编辑，你对它们的看法是？  

DeepSeekV4Pro：
## 共性分析

这些标题共享一个稳定结构：**人物 × 事件 × 选择**，三者以不同权重排列组合。核心叙事引擎是：

1. 困境叙事驱动。人物很少主动，多数是被事件推着走。
2. 转折制造悬念。"之后""突然发现""才知道"反复出现，暗示认知反转。读者被邀请见证一个人的顿悟时刻。
3. 年龄焦虑。作为社会时钟的刻度线，精准触发同龄读者的焦虑共情。
4. 标题即故事。每个标题都是一篇非虚构报道的微缩版，读者读完标题就完成了情感预期。这降低了点击到阅读之间的决策成本。

## 特点

这套模板是中国非虚构平台的成熟工业品，具体特征：

- 高度可复制。三个变量可无限填充。编辑不需要灵感，只需要选题。
- 情绪定向明确。困境 × 逃离 × 后悔 × 不甘。标题承担了情绪定价功能，预筛选受众。
- 个体经验被结构化。无论素材差异多大，最终都归入同一套叙事模版。人物的复杂性被压缩。
- 隐含道德立场。多个标题已经替读者站定了价值判断，不留给文本本身协商空间。

## 作为编辑的看法

这套模版的效率很高，但弊端清晰：

1. 过度依赖困境叙事会让编辑部对"正常生活"失语。大量值得写的人生没有"困在"什么里面，没有逃离故事线，没有认知反转。这些素材在现有框架里找不到位置。

2. 读者会疲劳。当每篇标题结构一致，点击决策从"我想知道什么"变成"我选哪个熟悉的情绪套餐"。这对平台的长期信任感有侵蚀。

我的建议是保留其中两个方向做迭代：一是"我和xx的60天"这种日记体，它至少保留了时间纵深感；二是"那些悄悄消失的xx"这种群像路径，它把焦点从单个戏剧化个体移向结构性问题。其余的可以暂时收束，给新结构留出试验空间。
`;

renderMD('aboutContent', aboutMD);

const aboutOverlay = document.getElementById('aboutOverlay');
const aboutClose = document.getElementById('aboutClose');
const aboutLink = document.getElementById('aboutLink');
const aboutBox = document.getElementById('aboutBox');

aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (isSpinning) return;
    aboutOverlay.style.display = 'flex';
});
aboutClose.addEventListener('click', () => {
    aboutOverlay.style.display = 'none';
});
aboutOverlay.addEventListener('click', (e) => {
    if (e.target === aboutOverlay) aboutOverlay.style.display = 'none';
});

// Keyboard shortcut
document.addEventListener('keydown', (e) => {
    if (modalOverlay.style.display === 'flex') {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) saveModal();
        return;
    }
    if (confirmOverlay.style.display === 'flex') {
        if (e.key === 'Escape') hideConfirm();
        if (e.key === 'Enter') { if (confirmCallback) confirmCallback(); hideConfirm(); }
        return;
    }
    if (aboutOverlay.style.display === 'flex') {
        if (e.key === 'Escape') aboutOverlay.style.display = 'none';
        return;
    }
    if (e.key === ' ' && !isSpinning && document.activeElement === document.body) {
        e.preventDefault();
        spinMultiple(1);
    }
});

// ────────────────────────────
// INIT
// ────────────────────────────
function initSlots() {
    const p = getPool('person');
    const e = getPool('event');
    const c = getPool('choice');
    if (p.length > 0) slotPerson.textContent = getRandomItem(p);
    if (e.length > 0) slotEvent.textContent = getRandomItem(e);
    if (c.length > 0) slotChoice.textContent = getRandomItem(c);
}

initSlots();
renderResults();

// console.log('🎰 标题生成器已就绪');
// console.log('  点击按钮或按空格键生成标题');
// console.log('  点击标签旁的 ✏️ 编辑词库');
// console.log('  结果存储在会话中，关闭标签页后清除');