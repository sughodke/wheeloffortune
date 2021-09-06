import { Bodies, Constraint } from "matter-js";
import {useWorldAdd} from "./useWorld";

// add the needle
export default ({ outerRadius }) => {
    const needle = Bodies.trapezoid(0, outerRadius * -1.10, 10, 40, 0.85, {
        angle: Math.PI,
        friction: 0.4,
        slop: 1
    });
    const needleConstraint = Constraint.create({
        pointA: { x: 0, y: outerRadius * -1.10 },
        bodyB: needle,
        length: 0
    });
    const needleJointLeft = Constraint.create({
        pointA: { x: -20, y: outerRadius * -1.05 },
        bodyB: needle,
        pointB: { x: 0, y: -15 },
        stiffness: 0.01,
        damping: 0.5,
        render: { visible: false }
    });
    const needleJointRight = Constraint.create({
        pointA: { x: 20, y: outerRadius * -1.05 },
        bodyB: needle,
        pointB: { x: 0, y: -15 },
        stiffness: 0.01,
        damping: 0.5,
        render: { visible: false }
    });
    useWorldAdd([needle, needleConstraint, needleJointLeft, needleJointRight], true)

    return <></>
}
