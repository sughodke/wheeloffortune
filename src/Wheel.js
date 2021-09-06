import {Bodies, Body, Composite, Constraint} from "matter-js"
import useMatter from "./useMatter"
import { useLayoutEffect } from "react"
import Needle from "./Needle";
import Pegs from "./Pegs";

// create wheel that can spin
export default ({ numPegs = 16, outerRadius = 100 }) => {
    const { engine } = useMatter()

    const wheelBase = Bodies.circle(0, 0, outerRadius, {
        collisionFilter: {
            group: -1,
            category: 0,
            mask: 0x0
        },
        render: {
            fillStyle: '#5f5f7e'
        },
    }, numPegs)

    const wheelConstraint = Constraint.create({
        pointA: { x: 0, y: 0 },
        bodyB: wheelBase,
        length: 0
    })

    useLayoutEffect(() => {
        Composite.add(engine.world, [wheelBase, wheelConstraint])
    }, [engine])

    return <>
        <Pegs numPegs={numPegs} outerRadius={outerRadius} wheelBase={wheelBase} />
        <Needle outerRadius={outerRadius}/>
    </>
}
