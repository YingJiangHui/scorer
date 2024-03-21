import {useEffect, useState} from "react";

export const useWindowResize = (resize: ()=> void) => {
    useEffect(() => {
        resize()
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [resize]);
};