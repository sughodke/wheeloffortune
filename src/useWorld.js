import {useContext, useEffect, useLayoutEffect, useState} from "react";
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

export const useWorldAdd2 = (fn, hack = false, deps = []) => {
    // noinspection JSCheckFunctionSignatures
    const {engine} = useContext(MatterContext)
    const [objs, setObjs] = useState([])

    const effectFn = hack ? useEffect : useLayoutEffect
    effectFn(() => {
        const _objs = fn()
        Composite.add(engine.world, _objs)
        setObjs(_objs)
    }, [engine, ...deps])

    return objs
}
