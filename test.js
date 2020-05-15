function attempt (available, allowed, preferred) {
  // sorts all parameters in ascending order
  Array.from(arguments).map(param => param.sort((a, b) => a - b));
  // creating result variable to contain the resulted array returned from the function
  let result = [];
  // filter "allowed" array from values that are not included in "available" array
  let filtered = allowed.filter(value => available.includes(value) || value === 'any');
  // if we have no elements at "filtered" array there is no point of further algorithm's executing, returning result as empty array
  if(filtered.length === 0) {
    return result;
  // if we have key word "any" in "filtered" or all elements of "preferred" array are included in "filtered", we can make "result" a copy of "preferred"
  } else if(filtered.includes('any') || preferred.every(val => filtered.includes(val))) {
    result = [...preferred];
  // if we have "any" keyword in "preferred", we can make "result" a c
  } else if(preferred.includes('any')) {
    result = [...filtered];
  } else {
    // function cannot return more values than are present in "filtered" thus "preferred" cannot have more values that "filtered"
    if(preferred.length > filtered.length) {
      preferred.length = filtered.length;
    }
    // making "preferred" array copy for further checking
    const preferredCopy = [...preferred];
    // mapping "preferred" array. If value is included in "filtered" - callback returns value, otherwise it returns value from "filtered" with the same index
    result = preferred.map((val, index) => {
      return filtered.includes(val) ? val : filtered[index];
    })
    // if all elements of "preferred" were changed during mapping, we return the biggest value in the array
    if(result.every(val => !preferredCopy.includes(val))) {
      result = [Math.max(...result)];
    }
  }
  // using Set to avoid duplicates
  return [...new Set(result)];
}

console.log(attempt([240, 360, 720], [360, 720], [1080]))
console.log(attempt([240, 720], [360, 720], [1080]))
console.log(attempt([240], [360, 720], [1080]))
console.log(attempt([240, 360, 720], [240, 360, 720, 1080], [240, 360]))
console.log(attempt([240, 720], [240, 360, 720, 1080], [240, 360]))
console.log(attempt([240, 720], [240, 360, 1080], [240, 360]))
console.log(attempt([720], [240, 360, 1080], [240, 360]))
console.log(attempt([240, 360], [240, 360], [720, 1080]))
console.log(attempt([240, 360, 720], [360, 'any'], [360, 720]))
console.log(attempt([240, 360, 720], [240, 360, 720], ['any', 720]))
console.log(attempt([240, 360, 720], [360, 1080], ['any', 720]))
console.log(attempt([240, 360, 720], [1080], ['any', 720]))