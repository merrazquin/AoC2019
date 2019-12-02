const fs = require('fs');

/*
Fuel required to launch a given module is based on its mass. Specifically, 
to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.
*/
const toInt = massString => parseInt(massString);
const fuelRequired = (mass) => Math.floor(mass / 3) - 2;
const totalFuelRequired = (mass, arr) => {
    if (mass > 0) {
        arr.push(mass);
        return totalFuelRequired(fuelRequired(mass), arr);
    }
    
    return arr.reduce(sum, 0);
};
const sum = (accumulator, currentValue) => accumulator + currentValue;

let data = fs.readFileSync('input.txt').toString()
    .split('\n')
    .map(toInt)
    .map(fuelRequired);

// because there's some crud at the end
data.pop();

const output1 = data.reduce(sum, 0);
console.log('Output1: ', output1);

const output2 = data.map((fuel) => totalFuelRequired(fuel, [])).reduce(sum, 0);
console.log('Output2:', output2);