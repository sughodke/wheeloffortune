import {useEffect} from "react"
import {Bodies, Constraint} from "matter-js"
import {useWorldAdd2} from "./useWorld";
import Needle from "./Needle";
import Pegs from "./Pegs";
import useMatter from "./useMatter";

// https://stackoverflow.com/a/6062196/721564
CanvasRenderingContext2D.prototype.fillTextCircle = function(text,x,y,radius,startRotation) {
    text = Array.from(text)
    const numRadsPerLetter = 2 * Math.PI / text.length;
    this.save();
    this.translate(x,y);
    this.rotate(startRotation);

    const lookup = {}
    text.forEach((ch, i) => {
        this.save();
        const ang = i*numRadsPerLetter
        this.rotate(ang);

        this.fillText(ch,0,-radius);
        this.restore();

        lookup[ang] = ch
    })

    this.restore();

    return lookup
}

const createTexture = (count = 16, r = 100, cx = 100, cy = 100) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 200
    const ctx = canvas.getContext('2d');

    // https://stackoverflow.com/a/50529742/721564
    function getRandomColour() {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);

        return "rgb(" + red + "," + green + "," + blue + " )";
    }

    const delta = 2 * Math.PI / count;

    [...Array(count)].forEach((_, i) => {
        ctx.fillStyle = getRandomColour()

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, delta * (i - 1), delta * i);
        ctx.lineTo(cx, cy);
        ctx.closePath();
        ctx.fill();
    })

    ctx.font = "15px Arial";
    ctx.fillTextCircle('123456789abcdefg', cx, cy, r - 30, Math.PI/count/2)

    const image = new Image();
    image.src = canvas.toDataURL();

    return [ image, lookup ]
}

// create wheel that can spin
export default ({ numPegs = 16, outerRadius = 100, onLoad }) => {
    const { render } = useMatter()
    const [lookup, setLookup] = useState({})

    // Hack to load in the texture
    useEffect(() => {
        const [texture, _lookup] = createTexture(numPegs, outerRadius)
        render.textures['USER_DEFINED_1'] = texture
        setLookup(_lookup)
    }, [render])

    const [wheelBase] = useWorldAdd2(() => {
        const wheelBase = Bodies.circle(0, 0, outerRadius, {
            collisionFilter: {
                group: -1,
                category: 0,
                mask: 0x0
            },
            render: {
                sprite: {
                    texture: 'USER_DEFINED_1'
                }
            },
        }, numPegs)

        const wheelConstraint = Constraint.create({
            pointA: { x: 0, y: 0 },
            bodyB: wheelBase,
            length: 0
        })

        onLoad(wheelBase)
        return [wheelBase, wheelConstraint]
    })

    return <>
        <Pegs numPegs={numPegs} outerRadius={outerRadius} wheelBase={wheelBase} />
        <Needle outerRadius={outerRadius}/>
    </>
}
