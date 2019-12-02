const fs = require('fs');

const toInt = massString => parseInt(massString);
let originalData = fs.readFileSync('input.txt').toString()
    .split(',')
    .map(toInt);

const processCode = (data, pos) => {
    const opCode = data[pos];
    if (opCode === 99) {
        return false;
    } 

    [input1, input2, outputPos] = data.slice(pos+1, pos+4);

    if(opCode === 1) {
        data[outputPos] = data[input1] + data[input2];
        return true;
    }

    if(opCode === 2) {
        data[outputPos] = data[input1] * data[input2];
        return true;
    }

    console.log('SOMETHING WENT WRONG');
    return false;
}

const output1 = () => {
    let data = originalData.slice();
    // pre-process
    data[1] = 12;
    data[2] = 2;

    let pos = 0;
    while(processCode(data, pos)) pos += 4;

    console.log('Output 1:', data[0]);
}
output1();

const output2 = (target) => {
    // Output 2 target: 
    for(let noun = 0; noun < 100; noun++) {
        for(let verb = 0; verb < 100; verb++) {
            let data = originalData.slice();
            data[1] = noun;
            data[2] = verb;

            let pos = 0;
            while(processCode(data, pos)) pos += 4;
            if (data[0] === target) {
                console.log('Output 2:', 100 * noun + verb);
                return;
            } 
        }
    }
}
output2(19690720);



