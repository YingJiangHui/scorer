import React, {memo, useEffect, useMemo, useRef, useState} from "react";
import {DisplayWithSVG, DisplayWithSVGProps} from "@/app/shared/components/DisplayWithSVG/DisplayWithSVG";
import {useCounter} from "@/app/shared/hooks/useCounter";
import {useDynamicFontSize} from "@/app/shared/hooks/useDynamicFontSize";
import {autoCompleteZero} from "@/app/shared/utils/autoCompleteZero";
import {AnimatePresence, motion} from "framer-motion";

type props = {};
export type NumberCountDisplayProps = props & DisplayWithSVGProps;
/**
 * 及其取巧的动画实现，基于React component key
 */
export const NumberCountDisplay: React.FC<React.PropsWithChildren<NumberCountDisplayProps>> = memo(props => {
    const {value, ...rest} = props
    const getNumber = ()=>autoCompleteZero(value || 0)
    const [count,setCount] = useState<string>(getNumber)
    const fontSize = useDynamicFontSize(0, count.length)
    const prevValueRef = useRef<number | string>(-1)
    const downMove = "-100%"
    const upMove = "100%"

    useEffect(() => {
        prevValueRef.current = value
        setCount(getNumber)
    }, [value])

    return <AnimatePresence>
        <motion.div key={count}
                    initial={{
                        opacity: 0, top: "50%",
                        left: "50%",
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    animate={{
                        opacity: 1,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    exit={{
                        opacity: 0, translateY: prevValueRef.current <= value ? downMove : upMove, top: "50%",
                        left: "50%", translateX: "-50%",
                    }}
                    transition={{duration: .25}}><DisplayWithSVG {...rest} value={count} fontSize={fontSize}
                                                                 textColor={"#fff"}/></motion.div>
    </AnimatePresence>;
});
NumberCountDisplay.displayName = "计数展示";
