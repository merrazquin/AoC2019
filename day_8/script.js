const fs = require('fs');
let input = fs.readFileSync('input.txt').toString();
const example = '123456789012';
const width = 25;
const height = 6;

const data = input.split('');
data.pop();
let layers = [];

let x = 0, y = 0;

let arr = [];
let subArr = [];
data.forEach(pixel => {
    if(y === height) {
       layers.push(arr);
       arr = [];
       y = 0;
    }
   subArr.push(pixel);
   x++;

   if (x === width) {
       arr.push(subArr);
       subArr = [];
       x = 0; 
       y++;
   }
});
layers.push(arr);
layers.forEach(layer => {
    // console.log(layer.length);
    // layer.forEach(line => console.log(' ',line.length));
})
composite = [];

for(x = 0; x < width; x++) {
    for(y = 0; y < height; y++) {
        if(!composite[x]) composite[x] = [];
        const layerIndex = layers.findIndex(layer => layer[y][x] !== '2');
        composite[x][y] = layers[layerIndex][y][x] === '0' ? ' ' : '*';
    }
}
composite = composite.map(line => line.join(''));
console.log(composite.join('\n'));

// let minZeros = width * height, index = -1;
// layers.forEach((layer, i) => {
//     const zeros = layer.reduce((prev, curr) => curr === '0' ? prev + 1 : prev, 0);
//     console.log(i, zeros)
//     if (zeros < minZeros) {
//         minZeros = zeros;
//         index = i;
//     }
// });

// let ones = layers[index].reduce((prev, curr) => curr === '1' ? prev + 1 : prev, 0);
// let twos = layers[index].reduce((prev, curr) => curr === '2' ? prev + 1 : prev, 0);

// console.log(layers[index].length);

// // 2332 too high
// // 1599 too low
// console.log(ones * twos);

//part 1: 2318