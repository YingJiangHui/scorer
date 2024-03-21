import {DependencyList, useEffect} from "react";

export const useRequestAnimationFrame = (requestFrame?: ()=>void, dependencyList?: DependencyList )=>{
    useEffect(() => {
        let animationFrameId: number;

        const update = () => {
            requestFrame?.()
            animationFrameId = requestAnimationFrame(update);
        };

        update();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, dependencyList);
}