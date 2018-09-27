// Write a multiplication function in javascript to use like this.
// console.log(mul(2)(4)(5));

const mul = (arg) => {
    let result = 1;
    let numArgs = 3; //assuming we want result after 3rd invocation
    let argValues = [];
    const subMul = (el) => {
        argValues.push(el);
        result *= el;
        if (argValues.length < numArgs){
            return subMul;
        } else {
            return result;
        }
        
    }
    return subMul(arg);
}

console.log(mul(2)(4)(5));

