import {Bodies, Body, Composite, Constraint} from "matter-js"
import useMatter from "./useMatter"
import {useEffect} from "react"
import Needle from "./Needle";

// add the pegs to the wheel
const Pegs = ({ wheelBase, outerRadius, numPegs, pegRadius = 4 }) => {
    const { engine } = useMatter()

    const innerRadius = outerRadius - 10
    const pegSpacing = numPegs / 2

    const wheelPositions = Array(numPegs).fill(0).map((_, i) => ({
        x: innerRadius * Math.sin(i * Math.PI/pegSpacing + Math.PI/pegSpacing/2),
        y: innerRadius * Math.cos(i * Math.PI/pegSpacing + Math.PI/pegSpacing/2)
    }))

    const wheelPegs = wheelPositions.map(p =>
        Bodies.circle(p.x, p.y, pegRadius, {
            mass: 2,
            friction: 0.4,
            slop: 1
        }, 6))

    // https://stackoverflow.com/a/52693401/721564
    wheelPegs.map(p => Body.setInertia(p, Infinity))

    const wheelPegsJoint = wheelPegs.map((p, i) =>
        Constraint.create({
            pointB: wheelPositions[i],
            bodyA: p,
            bodyB: wheelBase,
            // stiffness: 0.1,
            // damping: 0.05,
            length: 0,
        }))

    useEffect(() => {
        console.log('pegs')
        Composite.add(engine.world, [...wheelPegs, ...wheelPegsJoint])
    }, [engine])

    return <></>
}

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

    useEffect(() => {
        console.log('wheel')
        Composite.add(engine.world, [wheelBase, wheelConstraint])
    }, [engine])

    return <>
        <Pegs numPegs={numPegs} outerRadius={outerRadius} wheelBase={wheelBase} />
        <Needle outerRadius={outerRadius}/>
    </>
}
