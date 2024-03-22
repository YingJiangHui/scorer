import { useState } from "react";

export const useHistoryTravel = <T>(initialState: T) => {
    const [stateHistory, setHistory] = useState<{
        state: T[];
        current: number;
    }>(() => ({ state: [initialState], current: initialState ? 0 : -1 }));
    const { current: point, state: history } = stateHistory;
    const setState = (newState: React.SetStateAction<T>) => {
        setHistory((prevHistory) => {
            const { current: point, state: history } = prevHistory;
            const prevState = history[history.length - 1];
            const _newState =
                typeof newState === "function"
                    ? // @ts-ignore
                    newState(prevState)
                    : newState;
            if (newState !== prevState) {
                const past = history.slice(0, point + 1);
                return { state: [...past, _newState], current: past.length };
            } else {
                return prevHistory;
            }
        });
    };
    const forward = () => {
        setHistory((prevHistory) => {
            const { state, current } = prevHistory;
            return {
                state,
                current: current + 1 < state.length ? current + 1 : current,
            };
        });
    };
    const back = () => {
        setHistory((prevHistory) => {
            const { state, current } = prevHistory;
            return {
                state,
                current: current - 1 > 0 ? current - 1 : 0,
            };
        });
    };
    return { setState, state: history[point], forward, back };
};
