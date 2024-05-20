import { ENV } from 'constants/env';
import { NOOP, buildParams, getCookie, getThrottle, isEmpty } from '.';
import { Modal } from 'antd';
import { AnyCallback, BODY_CONTENT_TYPE, HTTP_REQUEST_METHODS } from './type';
import axios from 'axios';

/**
 * 获取sessionId
 */
export function getSessionId(): any {
    // 处理请求头
    let sessionId = getCookie('PHPSESSID');
    if (!sessionId) {
        const searchParams = new URLSearchParams(window.location.search);
        sessionId = searchParams.get('tt-session-id') || '';
        if (!sessionId) {
            redirectAuth({});
        }
        window.document.cookie = `PHPSESSID=${sessionId};path=/`;
    }
    return sessionId;
}

/**
 * 重新授权倒计时
 */

let redirectAuthExecute = false;
const redirectAuth = getThrottle(() => {
    // 是否已经在授权
    if (redirectAuthExecute) return;
    redirectAuthExecute = true;
    const modal = Modal.warning({
        title: '登录失效',
        content: '请退出页面重试！',
        keyboard: false,
        onOk() {
            modal.destroy();
        },
    });
    return;
}, 1000 * 10);

/**
 * 统一请求
 */
interface ApiParams {
    host?: string;
    method: string;
    params?: any;
    body?: any;
    options?: object;
    callback?: AnyCallback;
    errCallback?: AnyCallback;
    httpMethod?: HTTP_REQUEST_METHODS;
    bodyContentType?: BODY_CONTENT_TYPE;
}
export async function api({
    host = ENV.hosts.default,
    method = '',
    params,
    body,
    options = {},
    bodyContentType = BODY_CONTENT_TYPE.JSON,
    httpMethod = HTTP_REQUEST_METHODS.POST,
    callback = NOOP,
    errCallback = NOOP,
}: ApiParams): Promise<void> {
    const requestConfig: any = { ...options };
    if (httpMethod === HTTP_REQUEST_METHODS.POST && !isEmpty(body)) {
        switch (bodyContentType) {
            case BODY_CONTENT_TYPE.JSON:
                requestConfig.data = JSON.stringify(body);
                requestConfig.headers = { ...requestConfig.headers, 'Content-Type': 'application/json' };
                break;
            case BODY_CONTENT_TYPE.FORM_DATA:
                requestConfig.data = body;
                break;
        }
    }
    let url = host + method;
    if (!isEmpty(params)) {
        url += `?${buildParams(params)}`;
    }
    try {
        axios({
            url,
            method: httpMethod,
            withCredentials: true,
            ...requestConfig
        })
            .then(function (response) {
                callback(response.data);
            })
            .catch(function (error) {
                errCallback(error);
            });
    } catch (error) {
        errCallback(error);
    }
}
