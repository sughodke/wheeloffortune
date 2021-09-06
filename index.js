// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        showAngleIndicator: false,
        wireframes: false
    }
});

// https://gamedev.stackexchange.com/a/72414

// create wheel that can spin
const outerRadius = 100
const pegSpacing = 8;
const wheelBase = Bodies.circle(0, 0, outerRadius, {
    collisionFilter: {
        group: 2,
        category: 2,
        mask: 0x010
    },
    render: {
        fillStyle: '#5f5f7e'
    },
    }, pegSpacing * 2);
const wheelConstraint = Constraint.create({
    pointA: { x: 0, y: 0 },
    bodyB: wheelBase,
    length: 0
});
Composite.add(engine.world, [wheelBase, wheelConstraint]);


// add the pegs to the wheel
const innerRadius = outerRadius - 10;
const pegRadius = 4;
const wheelPositions = Array(pegSpacing * 2).fill(0).map((_, i) => ({
    x: innerRadius * Math.sin(i * Math.PI/pegSpacing + Math.PI/pegSpacing/2),
    y: innerRadius * Math.cos(i * Math.PI/pegSpacing + Math.PI/pegSpacing/2)
}))
const wheelPegs = wheelPositions.map(p =>
    Bodies.circle(p.x, p.y, pegRadius, {
        mass: 2,
        friction: 0.4,
        slop: 1
    }, 6));

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
Composite.add(engine.world, [...wheelPegs, ...wheelPegsJoint]);


// add the needle
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
});
const needleJointRight = Constraint.create({
    pointA: { x: 20, y: outerRadius * -1.05 },
    bodyB: needle,
    pointB: { x: 0, y: -15 },
    stiffness: 0.01,
    damping: 0.5,
});
Composite.add(engine.world, [needle, needleConstraint, needleJointLeft, needleJointRight]);

document.getElementById('spin').addEventListener('click', () => {
    Body.setAngularVelocity(wheelBase, wheelBase.angularVelocity + 3 * Math.PI/100);
})

const angleEl = document.getElementById('angle')
setInterval(() => {
    const angle = 180/Math.PI * wheelBase.angle % 360;
    angleEl.innerText = angle.toFixed(1)
}, 50)



// add mouse control
const mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: true
            },
            // collisionFilter: {}
        }
    });

Composite.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;


// fit the render viewport to the scene
const zoom = 0.5
Render.lookAt(render, {
    min: { x: -200 * zoom, y: -250 * zoom },
    max: { x: 200 * zoom, y: 0 }
});

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);
















