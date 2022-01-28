const fs = require('fs');

const toInt = val => parseInt(val);
let originalData = fs.readFileSync('input.txt').toString()
    .split(',')
    .map(toInt);

const processCode = (input, data, pos) => {
    let opCode = data[pos];
    if (opCode === 99) {
        console.log('99 Halting Program');
        return -1;
    }
    let param1Mode = 0, param2Mode = 0;
    let instruction = opCode.toString();
    if(instruction.length > 1) opCode = parseInt(instruction.slice(-2));
    if(instruction.length > 2) param1Mode = 1;
    if(instruction.length > 3) param2Mode = 1;

    if(opCode === 1) {
        [input1, input2, outputPos] = data.slice(pos+1, pos+4);
        data[outputPos] = (param1Mode ? input1 : data[input1]) + (param2Mode ? input2 : data[input2]);
        return 4;
    }

    if(opCode === 2) {
        [input1, input2, outputPos] = data.slice(pos+1, pos+4);
        data[outputPos] = data[input1] * data[input2];
        return 4;
    }

    if(opCode === 3) {
        outputPos = data[pos+1];
        data[outputPos] = input;
        console.log('writing input to position', outputPos);
        return 2;
    }

    if(opCode === 4) {
        let param = data[pos+1];
        console.log('4 Output', param1Mode);
        console.log(param1Mode ? param : data[param]);
        // console.log(data[param]);
        return 2;
    }

    /***Opcode 3 takes a single integer as input and saves it to the position given by its only parameter. For example, the instruction 3,50 would take an input value and store it at address 50.
    Opcode 4 outputs the value of its only parameter. For example, the instruction 4,50 would output the value at address 50. */
    console.log('SOMETHING WENT WRONG');
    return -1;
}


const output1 = (input) => {
    let data = originalData.slice();
    let pos = 0;
    let advance;
    do {
        advance = processCode(input, data, pos);
        pos += advance;
    } while (advance != -1)
    // while(advance = processCode(input, data, pos)) pos += advance;

    // console.log('Output 1:', data[0]);
}
output1(1);



