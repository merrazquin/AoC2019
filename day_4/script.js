const min = 357253;
const max = 892942;

const validPassword = (password) => {
    let passwordArr = password.split('').map(val => parseInt(val));
    // It is a six-digit number. - FREE
    //The value is within the range given in your puzzle input. - FREE
    
    // Two adjacent digits are the same (like 22 in 122345).
    if (password.match(/(.)\1/) === null) return false;

    // Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
    return passwordArr.every((element, index) => {
        if (index === 0) return true;
        var prev = passwordArr[index - 1];
        return element >= prev;
    });
}

const twosiesOnly = (password) => {
    let passwordArr = password.toString().split('').map(val => parseInt(val));
    var prevChar = passwordArr[0];
    var maxMatch = 1;
    for(var i = 1; i < passwordArr.length; i++) {
        if(prevChar === passwordArr[i]) maxMatch++;
        else {
            if(maxMatch === 2) return true;
            maxMatch = 1;
        }
        prevChar = passwordArr[i];
    }    
    return maxMatch === 2;
}

let valids = [];
for (var i = min; i <= max; i++) {
    if(validPassword(i.toString())) {
        valids.push(i);
    }
}
console.log(valids.length);

let p2Valids = valids.filter(password => twosiesOnly(password));
console.log(p2Valids.length); 