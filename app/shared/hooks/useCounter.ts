import React, { useState } from 'react';
interface CounterProps {
    initialCount?: number;
    min?: number;
    max?: number;
    onReachMax?: (max: number)=> void;
    onChange?: (count: number,config:{ min: number,max: number })=> void;
}

export const useCounter = ({ initialCount = 0, min = -Infinity, max = Infinity, onReachMax, onChange }: CounterProps = {}) => {
    const [count, setCount] = useState<number>(initialCount);
    const increment = () => {
        if (count < max) {
            setCount((prevCount) => {
                const newCount = Math.min(prevCount + 1, max)
                onChange?.(newCount,{min,max})
                return newCount
            });
        }else{
            // TODO 此写法存在问题
            onReachMax?.(max)
        }
    };

    const decrement = () => {
        if (count > min) {
            setCount((prevCount) => {
                const newCount = Math.max(prevCount - 1, min)
                onChange?.(newCount,{min,max})
                return newCount
            });
        }
    };

    const reset = ()=>{
        setCount(initialCount)
    }

    return {
        count,
        increment,
        decrement,
        reset
    };
};