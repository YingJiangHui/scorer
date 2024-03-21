import React, {memo, useMemo} from "react";
import {DisplayWithSVG, DisplayWithSVGProps} from "@/app/shared/components/DisplayWithSVG/DisplayWithSVG";
import {useCounter} from "@/app/shared/hooks/useCounter";
import {useDynamicFontSize} from "@/app/shared/hooks/useDynamicFontSize";
import {autoCompleteZero} from "@/app/shared/utils/autoCompleteZero";

type props = {};
export type NumberCountDisplayProps = props & DisplayWithSVGProps;
export const NumberCountDisplay: React.FC<React.PropsWithChildren<NumberCountDisplayProps>> = memo(props => {
    const {value, ...rest} = props
    const count = useMemo(() => autoCompleteZero(value || 0), [value])
    const fontSize = useDynamicFontSize(0, count.length)
    return <DisplayWithSVG {...rest} value={count} fontSize={fontSize} textColor={"#fff"}/>;
});
NumberCountDisplay.displayName = "计数展示";
