/** Promise 对象的状态， pending（进行中）fulfilled（已成功）rejected（已失败） */
export type PromiseStatus = 'pending' | 'fulfilled' | 'rejected';

export type AnyCallback = (...args: any[]) => any;

export type EmptyCallback = () => void;

export interface Dict<T> {
    [key: string]: T;
}

export enum HTTP_REQUEST_METHODS {
    'GET' = 'get',
    'POST' = 'post',
}

export enum BODY_CONTENT_TYPE {
    JSON = 'JSON',
    FORM_DATA = 'FORM_DATA',
}
