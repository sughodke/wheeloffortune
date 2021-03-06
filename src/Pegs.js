import { Bodies, Body, Composite, Constraint } from "matter-js";
import {useWorldAdd2} from "./useWorld";

// add the pegs to the wheel
export default ({ wheelBase, outerRadius, numPegs, pegRadius = 4 }) => {
    useWorldAdd2(() => {
        if (!wheelBase) return []

        const innerRadius = outerRadius - 10
        const pegSpacing = numPegs / 2

        const wheelPositions = Array(numPegs).fill(0).map((_, i) => ({
            x: innerRadius * Math.sin(i * Math.PI/pegSpacing),
            y: innerRadius * Math.cos(i * Math.PI/pegSpacing)
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

        return [...wheelPegs, ...wheelPegsJoint]
    }, false, [wheelBase])

    return <></>
}
