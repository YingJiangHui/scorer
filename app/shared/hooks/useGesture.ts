import {DependencyList, useEffect, useState} from 'react';

type DirectionType = "down" | "up" | "right" | "left" | null
type SideType = "right" | "left" | null
export const useTouchMove = (callback: (e: {
    direction: DirectionType,
    side: SideType,
    delta: number | null
}) => void, dependencyList: DependencyList = []) => {

    useEffect(() => {
        const handleGesture = (startX: number, startY: number, endX: number, endY: number) => {
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const xThreshold = window.innerWidth / 2; // 将界面水平分为左右两部分
            let delta: number | null = null
            // 计算手势方向
            let direction: DirectionType = null;
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                delta = Math.abs(deltaX)
                if (deltaX > 0) {
                    direction = 'right';
                } else {
                    direction = 'left';
                }
            } else {
                delta = Math.abs(deltaY)
                if (deltaY > 0) {
                    direction = 'down';
                } else {
                    direction = 'up';
                }
            }

            // 更新手势方向
            let side: SideType = null
            // 更新手势发生的位置
            if (startX < xThreshold) {
                side = ('left');
            } else {
                side = ('right');
            }
            callback({direction, side, delta})
        };

        const handleTouchStart = (event: TouchEvent) => {
            const touch = event.touches[0];
            const startX = touch.clientX;
            const startY = touch.clientY;

            const handleTouchEnd = (event: TouchEvent) => {
                const touch = event.changedTouches[0];
                const endX = touch.clientX;
                const endY = touch.clientY;

                // 计算手势方向和位置
                handleGesture(startX, startY, endX, endY);

                // 移除触摸结束事件监听器
                window.removeEventListener('touchend', handleTouchEnd);
            };

            // 添加触摸结束事件监听器
            window.addEventListener('touchend', handleTouchEnd);
        };

        // 添加触摸开始事件监听器
        window.addEventListener('touchstart', handleTouchStart);

        return () => {
            // 清除触摸开始事件监听器
            window.removeEventListener('touchstart', handleTouchStart);
        };
    }, dependencyList);

};