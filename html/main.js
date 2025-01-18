const 本地存储 = localStorage;
const 视窗 = window;
const 文档 = document;
const 读文件 = FileReader;
const 取 = fetch;
const 如何做爱元素 = 文档.documentElement;
const 体元素 = 文档.body;
const 头元素 = 文档.head;
const 新建元素 = 名 => 文档.createElement(名);
const 新建图 = _=> new Image();
const 添加事件监控 = (元素,事件,回调) => 元素[`on${事件}`] = 回调;// 元素.addEventListener(事件,回调);
const 获取元素方位 = 元素 => 元素.getBoundingClientRect();
const 设置延时 = setTimeout;
const 数学 = Math;
const 统一资源定位 = URL;
const 点击 = 'click';
const 加载 = 'load';
const 等级 = 'level';
const 样式 = 'style';
const 唯一标识 = 'id';
const 源 = 'src';
const 目标 = 'href';
const 成果 = 'result';
const 那么 = 'then';
const 加末尾 = 'appendChild';
const 设置属性 = 'setAttribute';
const 获取属性 = 'getAttribute';
const 清除属性 = 'removeAttribute';
const 来源 = 'referrer';
const 数据属性头 = 'data-'; 
const 呢 = 'ing';
const 运行中属性 = 数据属性头 + 'runn' + 呢;
const 加载中属性 = 数据属性头 + 加载 + 呢;
const 子元素 = 'children';
const 停止冒泡 = 'stopPropagation';
const 新建数据地址 = 'createObjectURL';
const 展示 = 'display';
const 块 = 'block';
const 肉 = 'innerHTML';
const 宽度 = 'width';
const 高度 = 'height';
const 左边 = 'left';
const 上边 = 'top';
const 零 = 0;
const 二 = 2;
const 千 = 1e3;
const 面 = '2d';
const 像素 = 'px';
const 空字 = '';
const 啊 = 'a';
const 靶子 = 'target';
const 真 = true;
const 无 = 'none';
const 最小 = 'min';
const 最大 = 'max';
const 四舍五入 = 'round';
const 是社交媒体 = /weibo|qq/i.test(navigator.userAgent);

const $ = (名,元素 = 文档) => 元素.querySelector(名);

const showScore = $('#score');

const 字体名 = '字体';
const 背景色 = '#efb4b4';
const 本地存储等级们钥匙 = 'jr-ex-levels';
const 保存文件名 = `[Inoki][JR制霸].png`;

const 宽 = 1147;
const 高 = 1147;
const 比 = 二;
const 最小间距 = 6;

const 地区 = $('#area');
const 保存 = $('#保存');
const 输出 = $('#输出');
const 输出图片 = $('img',输出);
const 设置等级 = $('#设置等级');

const 画板 = 新建元素('canvas');
const 上下文 = 画板.getContext(面);

画板[宽度] = 宽 * 比;
画板[高度] = 宽 * 比;

const 图形 = 体元素[子元素][零];
const 设置等级标题 = 设置等级[子元素][零];

const 设置等级样式 = 设置等级[样式];
const 输出样式 = 输出[样式];


const 全关闭 = _=>{
    设置等级样式[展示] = 空字;
};
const 数据 = {};
const 获取所有省元素们 = _=>[ ...地区[子元素] ];
const 获取所有省等级们 = _=>获取所有省元素们().map(元素 => new Number(元素[获取属性](等级)) || 零);
const 获取所有省等级们字符串 = _=> 获取所有省等级们().join(空字);
const 保存等级们 = _=>{
    本地存储.setItem(本地存储等级们钥匙,获取所有省等级们字符串());
};
const 获取等级们并生效 = _=>{
    const 等级们字串 = 本地存储.getItem(本地存储等级们钥匙) || 空字;
    获取所有省元素们().forEach((元素,下标)=>{
        元素[设置属性](等级,等级们字串[下标] || 零)
    });
};
function getBit(checkin, id) {
    // Get mod 8
    const mod = id % 8;
    // Get div 8
    const div = Math.floor(id / 8);

    return (checkin[div] & (1 << mod)) > 0;
}
function generateElementToHandleEki(eleId, countyId) {
    const checkin = getCheckin();
    return function(x) {
        const checked = getBit(checkin, x.id);

        return `<div style="flex: 1;">
            <input type="checkbox" id="${x.id}" name="${x.prefecture} ${x.name}" onclick="handleClick(this, '${eleId}', '${countyId}');" ${checked ? "checked" : ""}/>
            <label for="scales">${x.name}</label>
        </div>`;
    };
}
const getCheckin = () => {
    const localCheckin = localStorage.getItem("checkin");
    if (localCheckin) {
        return new Uint8Array(JSON.parse(localCheckin));
    }
    // We support 10240 stations at most now, but it's extensible
    return new Uint8Array(1285);
}
const saveCheckin = (checkin) => {
    localStorage.setItem("checkin", JSON.stringify(Array.from(checkin)));
}
window.handleClick = (checkbox, eleId, countyId) => {
    const id = Number(checkbox.id);
    const checkin = getCheckin();
    // Get mod 8
    const mod = id % 8;
    // Get div 8
    const div = Math.floor(id / 8);
    // Extend the array if necessary
    while (checkin.length < div) {
        console.log("Extending checkin array to ", checkin.length + 1);
        checkin.push(0);
    }
    if (checkbox.checked) {
        checkin[div] |= (1 << mod);
    } else {
        checkin[div] &= ~(1 << mod);
    }
    saveCheckin(checkin);

    const ekis = jr_eki_data[countyId];
    const checked = ekis.map(x => {
        return getBit(checkin, new Number(x.id)) ? 1 : 0;
    }).reduce((a, b) => a + b, 0);
    const total = ekis.length;
    // console.log("Checked ", checked, " out of ", total);
    if (total > 0) {
        const percentage = Math.floor(100 * checked / total);
        let level = 0;
        if (percentage > 0 && percentage < 25 || checked > 0 && percentage === 0) {
            level = 1;
        } else if (percentage >= 25 && percentage < 50) {
            level = 2;
        } else if (percentage >= 50 && percentage < 75) {
            level = 3;
        } else if (percentage >= 75 && percentage < 100) {
            level = 4;
        } else if (percentage === 100) {
            level = 5;
        }
        获取所有省元素们().forEach((element, index)=>{
            if (element.id === eleId) {
                element[设置属性](等级, level);
            }
        });
        计分();
        保存等级们();
    }
}
function generateElementToHandleEkiTokyo(countyId) {
    const checkin = getCheckin();
    return function(x) {
        const checked = getBit(checkin, x.id);

        return `<div style="flex: 1;">
            <input type="checkbox" id="${x.id}" name="${x.prefecture} ${x.name}" onclick="handleClickTokyo(this, '${countyId}');" ${checked ? "checked" : ""}/>
            <label for="scales">${x.name}</label>
        </div>`;
    };
}
window.handleClickTokyo = (checkbox) => {
    const id = Number(checkbox.id);
    const checkin = getCheckin();
    // Get mod 8
    const mod = id % 8;
    // Get div 8
    const div = Math.floor(id / 8);
    // Extend the array if necessary
    while (checkin.length < div) {
        console.log("Extending checkin array to ", checkin.length + 1);
        checkin.push(0);
    }
    if (checkbox.checked) {
        checkin[div] |= (1 << mod);
    } else {
        checkin[div] &= ~(1 << mod);
    }
    saveCheckin(checkin);

    const remaing = Object.keys(jr_eki_data).filter(x => x.endsWith("区") || x.endsWith("市") || x.endsWith("都"));
    const ekis = remaing.reduce((a, b) => a.concat(jr_eki_data[b]), []);
    const checked = ekis.map(x => {
        return getBit(checkin, new Number(x.id)) ? 1 : 0;
    }).reduce((a, b) => a + b, 0);
    const total = ekis.length;
    // console.log("Checked ", checked, " out of ", total);
    if (total > 0) {
        const percentage = Math.floor(100 * checked / total);
        let level = 0;
        if (percentage > 0 && percentage < 25 || checked > 0 && percentage === 0) {
            level = 1;
        } else if (percentage >= 25 && percentage < 50) {
            level = 2;
        } else if (percentage >= 50 && percentage < 75) {
            level = 3;
        } else if (percentage >= 75 && percentage < 100) {
            level = 4;
        } else if (percentage === 100) {
            level = 5;
        }
        获取所有省元素们().forEach((element, index)=>{
            if (element.id === '東京') {
                element[设置属性](等级, level);
            }
        });
        计分();
        保存等级们();
    }
}
添加事件监控(地区, 点击, 事件=>{
    事件[停止冒泡]();

    const 省元素 = 事件[靶子];
    数据.省元素 = 省元素;

    设置等级标题[肉] = 省元素[唯一标识];
    设置等级样式[展示] = 块;

    设置等级样式["left"] = `50px`;
    设置等级样式["top"] = `100px`;
    设置等级样式["right"] = `50px`;
    设置等级样式["bottom"] = `100px`;

    if (jr_eki_data) {
        const countyId = 省元素.id;
        if (jr_eki_data.hasOwnProperty(countyId + "県")) {
            // 43 ken
            $("#checkin").innerHTML = jr_eki_data[countyId + "県"].map(
                generateElementToHandleEki(countyId, countyId + "県")
            ).join(" ");
        } else if (jr_eki_data.hasOwnProperty(countyId + "府")) {
            // 2 fu
            $("#checkin").innerHTML = jr_eki_data[countyId + "府"].map(
                generateElementToHandleEki(countyId, countyId + "府")
            ).join(" ");
        } else if (countyId.endsWith("道")) {
            // 1 dou
            $("#checkin").innerHTML = jr_eki_data[countyId].map(
                generateElementToHandleEki(countyId, countyId)
            ).join(" ");
        } else {
            // 23 ku, 26 shi, etc
            // TODO: Generate for tokyo-ku, etc
            const remaining = Object.keys(jr_eki_data).filter(x => x.endsWith("区") || x.endsWith("市") || x.endsWith("都"));
            $("#checkin").innerHTML = remaining.map(x => {
                return "<div><h2>" + x + "</h2>" + (jr_eki_data[x].map(generateElementToHandleEkiTokyo(x)).join(" ")) + "</div>";
            }).join(" ");
        }
    }

    // TODO: Set color accordingly
    // const att = document.createAttribute("data-level");
    // att.value = "5";
    // 设置等级标题.setAttributeNode(att);
});
添加事件监控(文档,点击,全关闭);
const 计分 = _=>{
    const score = 获取所有省等级们().reduce((全, 当前) => {
        return 全 + (+当前 || 零);
      }, 零);
    showScore[肉] = `${score}`;
}
添加事件监控(设置等级,点击,事件=>{
    事件[停止冒泡]();
    const 等级值 = 事件[靶子][获取属性](数据属性头+等级);
    if(!等级值) return;
    数据.省元素[设置属性](等级,等级值);
    计分();
    全关闭();
    保存等级们();
})

获取等级们并生效();
计分();

const 读文件成地址 = (原始数据,回调)=>{
    const 读 = new 读文件();
    添加事件监控(读,加载,事件 => 回调(事件[靶子][成果]));
    读.readAsDataURL(原始数据);
};
// const 获取字体数据地址 = (地址,回调)=>{
//     取(地址)[那么](资源 => 资源.blob())[那么](原始数据 => 读文件成地址(原始数据,回调));
// };
// const 获取字体样式 = (字体名,回调)=>{
//     获取字体数据地址(
//         `${字体名}.woff?v={version}`,
//         地址 => 回调(`@font-face{font-family:${字体名};${源}:url(${地址})}`)
//     );
// };
// 获取字体样式(字体名,样式字串=>{
//     $(样式,图形)[肉] = 样式字串;
//     const 样式元素 = 新建元素(样式);
//     样式元素[肉] = 样式字串;
//     头元素[加末尾](样式元素);
//     设置延时(_=>如何做爱元素[清除属性](加载中属性),二 * 千);
// });

const 从文档文本新建图形文件 = 文档文本=>{
    const 原始数据 = new Blob([文档文本], {type: 'image/svg+xml'});
    return 统一资源定位[新建数据地址](原始数据);
};
const 下载文件 = (地址,文件名,元素 = 新建元素(啊))=>{
    if(!是社交媒体){
        元素.download = 文件名;
    }
    元素[目标] = 地址;
    元素[点击]();
};
const 地址变图像元素 = (地址,回调)=>{
    const 图 = 新建图();
    添加事件监控(图,加载,_=>设置延时(_=>回调(图),千 / 二));
    图[源] = 地址;
};
// const 日志 = _=>(新建图())[源] = `https://lab.magiconch.com/api/china-ex/log?levels=${获取所有省等级们字符串()}&r=${文档[来源]}`;

const 保存图像 = _=>{
    如何做爱元素[设置属性](运行中属性,真);

    const 文档文本 = `<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${宽} ${高}" ${宽度}="${宽}px" ${高度}="${高}px">${图形[肉]}</svg>`;
    const 数据地址 = 从文档文本新建图形文件(文档文本);

    地址变图像元素(数据地址,图=>{
        上下文.fillStyle = 背景色;
        上下文.fillRect(
            零,零,
            宽 * 比,宽 * 比
        );
        上下文.drawImage(
            图,
            零,零,
            宽,高,
            零,(宽 - 高) * 比 / 二,
            宽 * 比, 高 * 比
        );
        画板.toBlob(元素数据=>{
            const 地址 = 统一资源定位[新建数据地址](元素数据);
            输出图片[源] = 地址;
            输出样式[展示] = 空字;

            设置延时(_=>{
                下载文件(地址,保存文件名);
                如何做爱元素[清除属性](运行中属性);
            },50)
        });
    });
    // 日志();
};

添加事件监控(保存,点击,保存图像);

添加事件监控($(啊,输出),点击,_=>{
    输出样式[展示] = 无
});

const jr_eki_data = undefined;