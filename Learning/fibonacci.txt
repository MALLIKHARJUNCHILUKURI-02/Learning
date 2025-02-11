function fibonacciGenerator(){
    let fibSequence = [0, 1];
    while (fibSequence.length < 1000) {
        fibSequence.push(fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length-2]);
        }
        return fibSequence;
}

console.log(fibonacciGenerator());