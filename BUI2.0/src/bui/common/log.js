﻿import config from './config';

var LogOption = {
    /**日志权重*/
    levels: ["info", "warn", "error"],
    /**
    * 作用：写日志公共方法
    * 参数：
    *   日志类型 <info,error,warn,groupCollapsed,groupEnd>
    *   日志标志 <String>
    *   日志内容 <String，Object，Int，Boolean>
    */
    writeLog: function (type, tag, content) {
        if (window.console && window.console[type]) {

            //若是分组标签等级保持和info平级
            var leve = this.levels.indexOf(type);
            if (leve === -1 && type.indexOf('group') === 0) leve = 0;

            //判断日志输出等级
            if (leve < this.levels[config.logLevel]) return;

            content = this.transformContent(content);
            var timer = this._getTimer();
            tag = " ----" + tag + "---- ";

            console[type](timer + tag + content);
        }
    },
    /**
    * 作用：内容转换
    * 参数：
    *   日志内容 <String,Object,Int,Boolean,Function>
    * 输出：<String>
    */
    transformContent: function (content) {
        if (typeof content === "object") {
            return JSON.stringify(content);
        }

        if (content === undefined || content === null) {
            return "";
        }

        return content;
    },
    _getTimer: function () {
        var date = new Date();

        return [
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        ].join(':');
    }
};

/**
**  作者：张传辉
**  名称：前端日志管理
**  描述： 
*/
class LogHandler {
    /**
    * 输出普通日志信息
    * @param tag 日志标志 <String>
    * @param content 日志内容 <String,Object,Int,Boolean>
    */
    static info(tag, content) {
        LogOption.writeLog("info", tag, content);
    }
    /**
    * 输出错误日志信息
    * @param tag 日志标志 <String>
    * @param content 日志内容 <String,Object,Int,Boolean>
    */
    static error(tag, content) {
        LogOption.writeLog("error", tag, content);
    }
    /**
    * 输出警告日志信息
    * @param tag 日志标志 <String>
    * @param content 日志内容 <String,Object,Int,Boolean>
    */
    static warn(tag, content) {
        LogOption.writeLog("warn", tag, content);
    }
    /**
    * 组合日志信息开始
    * @param tag 日志标志 <String>
    * @param content 日志内容 <String,Object,Int,Boolean>
    */
    static groupStart(tag, content) {
        LogOption.writeLog("groupCollapsed", tag, content);
    }
    /**
    * 组合日志信息结束
    * @param tag 日志标志 <String>
    * @param content 日志内容 <String,Object,Int,Boolean>
    */
    static groupEnd(tag, content) {
        LogOption.writeLog("groupEnd", tag);
    }
};

export default LogHandler;