/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { SnakeTargetComponent } from '../components';
import SnakeComponent from '../components/snake.component';

const defaultSpeed = 150;
export default function GamePage() {
    const [snake, setSnake]: [IPosition[], Function] = useState([
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 4, y: 0 },
    ]);
    const [targetPosition, setTargetPosition]: [IPosition, Function] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState('RIGHT');
    const [speed, setSpeed] = useState(defaultSpeed);
    const [score, setScore] = useState(() => {
        return 0;
    });
    function GetRandomTarget() {
        let xPosition;
        let yPosition;
        do {
            xPosition = Math.floor(Math.random() * 99);
            yPosition = Math.floor(Math.random() * 99);
        } while (xPosition % 2 !== 0 || yPosition % 2 !== 0);
        setTargetPosition({ x: xPosition, y: yPosition });
    }
    useInterval(() => {
        gameLoop();
    }, speed);

    useEffect(() => {
        document.onkeydown = onkeydown;
        GetRandomTarget();
    }, []);

    const onkeydown = (e: any) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 37: {
                setDirection('LEFT');
                break;
            }
            case 38: {
                setDirection('UP');
                break;
            }
            case 39: {
                setDirection('RIGHT');
                break;
            }
            case 40: {
                setDirection('DOWN');
                break;
            }
        }
    };
    const gameLoop = () => {
        const dots = [...snake];
        const head = dots[dots.length - 1];
        let newDot: IPosition = { x: 0, y: 0 };
        switch (direction) {
            case 'LEFT': {
                newDot = { x: head.x - 2, y: head.y };
                break;
            }
            case 'RIGHT': {
                newDot = { x: head.x + 2, y: head.y };
                break;
            }
            case 'UP': {
                newDot = { x: head.x, y: head.y - 2 };
                break;
            }
            case 'DOWN': {
                newDot = { x: head.x, y: head.y + 2 };
                break;
            }
        }
        //check snake run out of box
        if (newDot.x < 0 || newDot.x >= 100 || newDot.y < 0 || newDot.y >= 100) {
            setDefault();
            return;
        }

        if (newDot.x !== targetPosition.x || newDot.y !== targetPosition.y) {
            // when snake don't eat anything
            dots.shift(); //delete the last dot
        } else {
            // when snake eat the target
            setScore((prevScore: any) => (prevScore += 1));
            setSpeed((prevSpeed) => (prevSpeed -= 5));
            GetRandomTarget();
        }
        dots.push(newDot);
        setSnake(dots);
    };
    const setDefault = () => {
        GetRandomTarget();
        setSnake([
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 4, y: 0 },
        ]);
        setDirection('RIGHT');
        setSpeed(defaultSpeed);
    };
    return (
        <div>
            <div>
                <p>Score: {score}</p>
            </div>
            <div className="game-area">
                <SnakeComponent dots={snake} />
                <SnakeTargetComponent x={targetPosition.x} y={targetPosition.y} />
            </div>
        </div>
    );
}

function useInterval(callback: any, delay: number | null) {
    //https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    const savedCallback: any = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        console.log('delay');
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
