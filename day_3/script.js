const fs = require('fs');
let input = fs.readFileSync('input.txt').toString();

const manhattanDistance = (pointA, pointB) => Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y);

const example = `R8,U5,L5,D3
U7,R6,D4,L4`;
const exampleResult = 6;

const test1 = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`;
const result1 = 159;

const test2 = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`;
const result2 = 135;

const processWire = (wire, otherWire = null) => {
    let points = [];

    let x = 0, y = 0;
    wire.forEach(instruction => {
        let instructionArr = instruction.split('');
        let direction = instructionArr.shift();
        let steps = parseInt(instructionArr.join(''));
        switch (direction) {
            case 'R':
                    while(steps) {
                        x++;
                        if (!otherWire || otherWire.find(p => p.x === x && p.y === y)) {
                            points.push({x, y});
                        } 
                        steps--;
                    }
                break;
            case 'L':
                    while(steps) {
                        x--;
                        if (!otherWire || otherWire.find(p => p.x === x && p.y === y)) {
                            points.push({x, y});
                        } 
                        steps--;
                    }
                break;
            case 'D':
                    while(steps) {
                        y--;
                        if (!otherWire || otherWire.find(p => p.x === x && p.y === y)) {
                            points.push({x, y});
                        } 
                        steps--;
                    }
                break;
            case 'U':
                    while(steps) {
                        y++;
                        if (!otherWire || otherWire.find(p => p.x === x && p.y === y)) {
                            points.push({x, y});
                        } 
                        steps--;
                    }
                break;
        }
    });

    return points;
}

const findIntersections = (points1, points2) => {
    let intersections = [];
    points1.forEach(point1 => {
        points2.forEach(point2 => {
            if(point1.x === point2.x && point1.y === point2.y) intersections.push(point1);
        });
    });
    return intersections;
}

const findClosest = (intersections) => {
    const origin = {x: 0, y: 0};
    return intersections.map(point => manhattanDistance(origin, point))
        .sort((a, b) => a - b)
        .shift();
}

const [wire1, wire2] = example.split('\n')
    .map(str => str.split(','));

console.log('process wire 1');
const wire1Points = processWire(wire1);
console.log('process wire 2');
const wire2Points = processWire(wire2);
console.log('find intersections');
console.log('  points1', wire1Points.length);
console.log('  points2', wire2Points.length);
const intersections = findIntersections(wire1Points, wire2Points);
console.log('find closest');
const closest = findClosest(intersections);

console.log(closest);