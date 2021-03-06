﻿import Base from './base';

export const TAGREGEXP = /^b-((?:.*|\n)+?)/;
export const ONREGEXP = /^on:((?:.*|\n)+?)/;
export const ATTRREGEXP = /^:((?:.*|\n)+?)/;

/**
 *  作者：张传辉
 *  功能名称：Element 模板渲染处理类
 *  描述信息：
 */
export default class Handler extends Base {
    check() {
        return this.node.nodeType === 1;
    }
    parser() {
        let nodeAttrs = this.node.attributes;

        for (let attr of Array.from(nodeAttrs)) {
            let attrNm = attr.name,
                exp = attr.value;
            let baseItem = {
                exp: exp,
                cause: attrNm
            };

            if (TAGREGEXP.test(attrNm)) {
                let order = TAGREGEXP.exec(attrNm)[1];
                this.result.push(Object.assign(baseItem, {
                    order: order,
                    removeAttr: function () { this.node.removeAttribute(attrNm); }
                }));

            } else if (ONREGEXP.test(attrNm)) {
                let param = ONREGEXP.exec(attrNm)[1];
                this.result.push(Object.assign(baseItem, {
                    order: "event",
                    param: param,
                    removeAttr: function () { this.node.removeAttribute(attrNm); }
                }));

            } else if (ATTRREGEXP.test(attrNm)) {
                let param = ATTRREGEXP.exec(attrNm)[1];
                this.result.push(Object.assign(baseItem, {
                    order: "attr",
                    param: param,
                    removeAttr: function () { this.node.removeAttribute(attrNm); }
                }));
            }
        }
    }
}