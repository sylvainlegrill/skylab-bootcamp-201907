console.log('DEMO: find');

var array = [1, 2, 3 , 4 , 5];
console.log('array', array);

console.log('find');
var result = find(array , '>' , 2);
console.log(result, 'expected: 3');

console.log('find');
var result = find(array , '<' , 4);
console.log(result, 'expected: 1');

console.log('find');
var result = find(array , '===' , 6);
console.log(result, 'expected: undefined');
console.log("----------------------------------------");