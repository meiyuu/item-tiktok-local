import { ENV } from 'constants/env';
import { getDeferred } from '.';
import { api } from './api';
import { Modal } from 'antd';

export const userInfoDeferred = getDeferred(); // 用户信息

/**
 * 存储用户信息
 */
export async function setUserInfo(newUserInfo: Record<string, any>) {
    const { userInfo } = window;
    window.userInfo = { ...userInfo, ...newUserInfo };
}

/**
 * 获取用户信息
 */
export function getUserInfo(): Record<string, any> {
    return window.userInfo;
}

/*
 * 初始化用户信息
 */
export const userInfoInit = ({ shop_region = 'US' }) => {
    api({
        host: ENV.hosts.pre,
        method: '/v2/tiktok/getUserInfo',
        body: {
            shop_region,
        },
        callback: (res) => {
            if (res.code === 200) {
                window.userInfo = res.data;
                userInfoDeferred.resolve(window.userInfo);
                return;
            }
            const modal = Modal.warning({
                title: '获取用户信息失败',
                content: '请退出页面重新尝试！',
                keyboard: false,
                onOk() {
                    modal.destroy();
                },
            });
        },
        errCallback: () => {
            const modal = Modal.warning({
                title: '获取用户信息失败',
                content: '请退出页面重新尝试！',
                keyboard: false,
                onOk() {
                    modal.destroy();
                },
            });
        },
    });
};
