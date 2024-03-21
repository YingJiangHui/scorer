import {DependencyList, useEffect, useState} from "react";

export const useWindowResize = (resize: ()=> void,dependencyList?: DependencyList) => {
    useEffect(() => {
        resize()
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, dependencyList);
};