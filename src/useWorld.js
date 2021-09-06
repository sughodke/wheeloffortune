import {useContext, useEffect, useLayoutEffect} from "react";
import {MatterContext} from "./MatterContext";
import {Composite} from "matter-js";

export const useWorldAdd = (objs, hack = false) => {
    // noinspection JSCheckFunctionSignatures
    const {engine} = useContext(MatterContext);
    const effectFn = hack ? useEffect : useLayoutEffect

    effectFn(() => {
        Composite.add(engine.world, objs)
    }, [engine])
}
