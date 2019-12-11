// #1 Implement an Array class from scratch.
const Mem = require ('./memory');
const memory = new Mem();

class Array {
  constructor() {
    this.length = 0;
    this._capactity = 0;
    this.ptr = memory.allocate(this.length);
  }
  push(value) {
    if (this.length >= this._capactity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.set(this.ptr = this.length, value);
    this.length++;
  }
  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if ( this.ptr === null ) {
      throw new Error ('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capactity = size; 
  }
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
  }
  pop() {
    if (this.length == 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }
  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }
  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
  }
}
Array.SIZE_RATIO = 3;


// #2 Explore the push() method

function main(){

  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  console.log(arr);
  // pop items from the array
  arr.pop();
  arr.pop();
  arr.pop();
  console.log(arr);
}

main();

// Length = 1, capacity = 2, and memory address = 0.
// then Length = 6, capacity = 12, and memory address = 5
// capacity - free space. 

// After pop: 
// Length = 3, capacity = 12, and the memory address = 5
// capacity - free space. 
// capacity is still 12 because the box is still occupied and waiting 
// for a new push 

// When trying to push a string into memory:
// cannot insert the string into memory, but will still allocate the memory, and returns NaN.

// Understanding more about arrays: 
// _resize() essentially allocates a new chunk of memory, copies the 
// existing values from the old chunk to the new chunk, and free the old chunk



// 5. URLify a string

function URLify(string) {
  let result = '';
  for(let x=0; x<string.length; x++){
    if(string[x] == ' '){
      result = result + '%20';
    } 
    else 
      result = result + string[x];
  }
  return result;
}
  
// console.log(URLify('tauhida parveen'))

// 6. Filtering an array

function lessThanFive(numbers){
  let result = [];
  for (let x=0; x < numbers.length; x++){
    if(numbers[x] > 5)
      result.push(numbers[x]);
  }
  return result;
}

// console.log(lessThanFive([2, 3, 5, 8, 9, 10]))

// 7. Max sum in the array

function sumAll(numbers){
  function myFunc(total, num){
    return total + num;
  }
  return numbers.reduce(myFunc);
}

// console.log(sumAll([4, 6, -3, 5, -2, 1]));

// 8. Merge arrays

function arrayMerge(arr1, arr2) {
  let merged = arr1.concat(arr2);
  return merged.sort(
    function(a, b) 
    {
      return a-b;
    }
  );
}

// console.log(arrayMerge([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

// 9. Remove characters

function removeCharacters(string, char) {
  let result = '';
  for(let x=0; x<char.length; x++){
    for(let i=0; i<string.length; i++) {
      if(char[x] !== string[i]) {
        result = result + string[i];
      } else {
        result = result + ' ';
      }
    }
  }
  return result;
}

console.log(removeCharacters('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'));