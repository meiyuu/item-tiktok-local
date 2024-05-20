import { AnyCallback } from 'public/utils/type';

export function NOOP () {
}

/**
 * 去掉前后 空格/空行/tab 的正则 预先定义 避免在函数中重复构造
 * @type {RegExp}
 */
const trimReg = /(^\s*)|(\s*$)/g;

/**
 * 判断一个东西是不是空 空格 空字符串 undefined 长度为0的数组及对象会被认为是空的
 * @param obj
 */
export function isEmpty (obj: any): obj is undefined | null | '' {
    if (obj === undefined || obj === '' || obj === null) {
        return true;
    }
    if (typeof (obj) === 'string') {
        obj = obj.replace(trimReg, '');
        if (obj == '' || obj == null || obj == 'null' || obj == undefined || obj == 'undefined') {
            return true;
        }
        return false;
    } else if (typeof (obj) === 'undefined') {
        return true;
    } else if (typeof (obj) === 'object') {
        for (const _value in obj) {
            return false;
        }
        return true;
    } else if (typeof (obj) === 'boolean') {
        return false;
    }
    return false;
}

/**
 * 将Object 转换为QueryString 对象只能有一层.
 * @param params
 */
export function buildParams (params: { [key: string]: string | number }) {
    return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}

export const TYPES = {
    Number: '[object Number]',
    String: '[object String]',
    Undefined: '[object Undefined]',
    Boolean: '[object Boolean]',
    Object: '[object Object]',
    Array: '[object Array]',
    Function: '[object Function]',
};

/**
 * 获取一个东西的type 请与上面的常量进行比较
 * @param obj
 */
export function getType (obj: unknown) {
    return Object.prototype.toString.call(obj);
}

/**
 * 判断是否是对象
 * @param target
 */
export function isObject (target: unknown) {
    return getType(target) === TYPES.Object;
}

/**
 * 判断参数是否是JSON字符串
 * */
export function isJSON (str: string) {
    try {
        const obj = JSON.parse(str);
        if (typeof (obj) === 'object' && obj) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

/**
 * 判断是否是array
 * @param target
 */
export function isArray (target: unknown) {
    return getType(target) === TYPES.Array;
}

/**
 * 判断是否是函数
 * @param target
 */
export function isFunction (target: unknown): target is Function {
    return getType(target) === TYPES.Function;
}

/*
 * @Description 从url中获取指定键值
 */
export const getQueryString = (url: string, name: string) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const ret = url.substring(url.indexOf('?') + 1, url.length).match(reg);
    if (ret != null) {
        return decodeURIComponent(decodeURIComponent(ret[2]));
    }
    return null;
};

/**
 * 深拷贝对象
 * @param obj
 */
export function deepCopyObj<T> (obj: object): T {
    if (typeof obj === 'object') {
        return JSON.parse(JSON.stringify(obj));
    }
    return obj;
};


interface DeferredPromise extends Promise<any> {
    resolve: AnyCallback;
    reject: AnyCallback;
}
/**
 * 构造一个deferred对象 相当于一个resolve reject 外置的promise 可以预先生成这个promise 然后等待这个promise被外部resolve
 */
export function getDeferred (): DeferredPromise {
    let resolve: AnyCallback = NOOP;
    let reject: AnyCallback = NOOP;

    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });

    // @ts-ignore
    promise.resolve = resolve; // TS2339: Property 'resolve' does not exist on type 'Promise '.
    // @ts-ignore
    promise.reject = reject;// TS2339: Property 'resolve' does not exist on type 'Promise '.
    // @ts-ignore
    return promise;
};

/**
 * 读取cookie
 */
export function getCookie (name: string) {
    const cookies = document.cookie.split('; ');
    for(const item of cookies) {
        const [key, value] = item.split('=');
        if(key.trim() === name) {
            return value.trim();
        }
    }
    return null;
}

/**
 * 获取一个防抖函数
 * @param func
 * @param duration
 * @returns {Function}
 */
export function getDebounce (func: any, duration = 800) {
    let timer: any;
    return function (args: any) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func(args);
        }, duration);
    };
}

/**
 * 获取一个节流函数
 * @param func
 * @param duration
 * @returns {function(...[*]=)}
 */
export function getThrottle (func: any, duration = 1000) {
    let flag = true;
    return function (args: any) {
        if (flag) {
            flag = false;
            func(args);
            setTimeout(() => {
                flag = true;
            }, duration);
        }
    };
}