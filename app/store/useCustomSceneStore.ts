const valueComparisonMap = {
    greaterThan: (specifiedValue: number, targetValue: number) => targetValue > specifiedValue,
    equalTo: (specifiedValue: number, targetValue: number) => targetValue === specifiedValue,
    lessThan: (specifiedValue: number, targetValue: number) => targetValue < specifiedValue
}

const settingValue = {
    add: (specifiedValue: number, prevValue: number) => prevValue + specifiedValue,
    subtract: (specifiedValue: number, prevValue: number) => prevValue - specifiedValue,
    specified: (specifiedValue: number, prevValue: number) => specifiedValue
}

type Condition<P = any> = (...args: P[]) => boolean
type SupportedValueType = "number"
const useCustomSceneStore = () => {
    const actionKinds = [{
        key: "setting_max", action: () => {
        }
    }]
// : {
//         valueType: SupportedValueType,
//             valueComparisonMap: Record<string, (...args: any[]) => void>,
//             actionMap: typeof settingValue
//         conditionHandler: (conditions: Condition[], targetValue: number) => Condition[]
//         action: ()=>void
//     }[]
    const supportedActionsOfValueType= [{
        valueType: "number",
        valueComparisonMap,
        conditionHandler: (conditions: Condition<number>[], specifiedValue: number) => {
            return conditions.map((c) => c.bind(null, specifiedValue))
        },
        actionMap: settingValue,
        action: (actionList: ((specifiedValue: number, prevValue: number)=> number)[], specifiedValue: number)=>{
            return actionList.map((c) => c.bind(null, specifiedValue))
        }
    }]

    const triggerConditions: { key: string, valueType: SupportedValueType }[] = [{
        key: "a_count_changed",
        valueType: "number",
        getConditionResult: (conditions: Condition<number>[], targetValue: number)=>{
            return conditions.map((c) => c(targetValue)).some((item)=>!item)
        }
    }]
    const actions = [{when: [], actionKey: "setting_max"}]

//     进入选择场景
//     选择a max值
//     选择b max值
//     定义当a值大于等于10时 & b值大于等于10时
//     触发a max,b max 设置为12
}