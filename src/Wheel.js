import {useEffect} from "react"
import {Bodies, Constraint} from "matter-js"
import {useWorldAdd} from "./useWorld";
import Needle from "./Needle";
import Pegs from "./Pegs";

// create wheel that can spin
export default ({ numPegs = 16, outerRadius = 100, onLoad }) => {

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

    useEffect(() => {
        onLoad(wheelBase)
    }, [])

    useWorldAdd([wheelBase, wheelConstraint])

    return <>
        <Pegs numPegs={numPegs} outerRadius={outerRadius} wheelBase={wheelBase} />
        <Needle outerRadius={outerRadius}/>
    </>
}
