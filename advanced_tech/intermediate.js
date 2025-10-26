//! Sliding window is one of the advanced technique in order 'slice' and look for the sum of the array or string substring values. There two techniques in play i.e. Fixed window and Sliding Window:

// An example of a fixed window:
//* This function will take in 2 argh of array argh, and k target which is the bound of the subarray in k-numeric value:

const maxSumFixedWindow = (arr, k) => {
    // strict validation of the array argh and the k target value to make sure that it is an a numeric value:
    if (!Array.isArray(arr)) throw new TypeError('array argh must be an array object!');
    if (!arr.every(item => typeof item === 'number')) throw new RangeError('every element of the array argh must be a numeric value!');
    if (arr.length <= 2) throw new TypeError('the length property of the array argh must be greater && || equal to 2!');
    if (typeof (k) !== 'number') throw new TypeError('k argh data type must be numeric');

    // init the default values:
    let sum = 0;
    for (let i = 0; i < k; i++) {
        sum += arr[i];
    }
    // assign the sum so far to the maxSum:
    let maxSum = sum;

    for (let i = k; i < arr.length; i++) {
        //NOTE this operation will slide the window and assign the max value using the Math.max global function:
        sum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, sum);
    }
    // return the the result which in this argh should be 9:
    return maxSum;
}

console.log(maxSumFixedWindow([2, 1, 5, 1, 3, 2], 3)); // 9 (5+1+3)

//* The next example of a sliding window is a little bit different as it uses a sliding window approach in finding the desired output:
const longestUniqueSubstring = (str) => {
    // some validation of the input argh:
    if (typeof (str) !== 'string') throw new TypeError('str argh must be a string object!');

    // init the seen, left = 0, maxLen = 0 default values to be initiated upon:
    const seen = new Map();
    let left = 0;
    let maxLen = 0;

    // this loop is for dynamic sliding windowLookUp:
    for (let right = 0; right < str.length; right++) {
        if (seen.has(str[right]) && seen.get(str[right]) >= left) {
            left = seen.get(str[right]) + 1;
        }
        seen.set(str[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

console.log(longestUniqueSubstring("abcabcbb")); // 3 ("abc"):

// Prefix, Suffix Sums Range sum queries in O(1):
// A. Range sum queries in O(1):

//* this function will uild the prefixe of the array argh:
const buildPrefix = (arr) => {
    const pref = [0];
    for (let i = 0; i < arr.length; i++) {
        pref.push(pref[i] + arr[i]);
    }
    return pref;
}

const rangeSum = (pref, i, j) => {
    return pref[j + 1] - pref[i];
}

const arr = [2, 4, 6, 8, 10];
const pref = buildPrefix(arr);
// invoke the function of rangeSum:
console.log(rangeSum(pref, 1, 3)); // 18 (4 + 6 + 8):

// B. Count subarrays summing to k (prefix, hashmap):
const subarraySumEqualsK = (arr, k) => {
    let sum = 0;
    let count = 0;

    // NOTE the synthax of Map([[0, 1]]) to initiate the default Map() global object:
    const freq = new Map([[0, 1]]);
    for (const num of arr) {
        sum += num;
        if (freq.has(sum - k)) {
            count += freq.get(sum - k);
        } freq.set(sum, (freq.get(sum) || 0) + 1);
    }
    return count;
}

console.log(subarraySumEqualsK([3, 4, 7, 2, -3, 1, 4, 2], 7)); // 4

//* 3) Hash Maps for frequency / Prefix:
// A. Two-Sum (indices):
const twoSum = (arr, k) => {
    const map = new Map();

    for (let i = 0; i < arr.length; i++) {
        const need = k - arr[i];
        if (map.has(need)) {
            return [map.get(need), i];
        } map.set(arr[i], i);
    }
    // otherwise return []: 
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9));

// B. Character frequency:
const freqCount = (str) => {
    const seen = new Map();
    for (let ch of str) {
        seen.set(ch, (seen.get(ch) || 0) + 1);
    }
    return seen;
}

// NOTE the console.log invocation using the ... spreader operator on the string argh:
console.log([...freqCount('mississippi')]);

// 4) Set / Map lookup for (membership, duplicates): boolean return type!
const hasDuplicate = (arr) => {
    const seen = new Set();
    for (const num of arr) {
        if (seen.has(num)) {
            return true;
        } seen.add(num);
    }
    return false;
}

console.log(hasDuplicate([1, 2, 3]));
console.log(hasDuplicate([1, 2, 2, 3]));

// 5) Stack/ Monotonic Stack:
// A) Next Greater element:
const nextGreater = (arr) => {
    // init the prototype array of n-length argh and fill with -1:
    const result = new Array(arr.length).fill(-1);
    const stack = []; // indices, decreasing stack by value:

    for (let i = 0; i < arr.length; i++) {
        while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
            const j = stack.pop();
            result[j] = arr[i]
        }
        stack.push(i);
    }
    return result;
}

console.log(nextGreater([2, 1, 2, 4, 3])); // [4,2,4,-1,-1]

// NOTE Given bar heights, it finds the largest rectangle area that can be formed using adjacent bars.
//* For [2,1,5,6,2,3], the answer is 10 (bars 5 and 6 → width 2 × height 5 = 10, or height 5 with width 2? actually height 5 × width 2 formed by bars [5,6] gives 10; height 6 × width 1 gives 6; height 2 × width 5 gives 10 as well).

//* What is the Monotonic Stack? A monotonic Stack is a stack that keeps its elements in monotone order (non-decreasing or non-increasing) according to some key:
const largestRectangleArea = (heights) => {
    const stack = []; // stores indices of increasing bars:
    let maxA = 0;
    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];
        while (stack.length && h < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()];
            const right = i;
            const left = stack.length ? stack[stack.length - 1] + 1 : 0;
            maxA = Math.max(maxA, height * (right - left));
        }
        stack.push(i);
    }
    return maxA;
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10

// Backtracking is a systematic trial-and-error algorithmic technique for exploring all possible solutions to a problem, while pruning (undoing) paths that lead to invalid or suboptimal solutions.
// in essence it is an optimization over brute force - exploring the search intellegently rather than blindly.
//! this is an Inclusion–exclusion pattern
const getSubsets = (arr) => {
    // this will hold the result and it will create a matrix like structure that will hold the return 2D table:
    const result = [];
    function backtrack(i, path) {
        if (i === arr.length) {
            result.push([...path]);
            return;
        }
        // choose nums[i]:
        path.push(arr[i]);
        backtrack(i + 1, path);
        // skip arr[i]:
        path.pop();
        backtrack(i + 1, path);
    }
    backtrack(0, []);
    return result;
}

console.log(getSubsets([1, 2, 3]));

// This function will invoke full traversal of all configurations:
const permute = (arr) => {
    // validation of the input argh:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (!arr.every(item => typeof item === 'number' && Number.isFinite(item))) throw new RangeError('every element of the arr argh must be a numeric value and finite');

    // main logic of the function:
    const result = [];
    const used = Array(arr.length).fill(false);

    // helper function of backtrack:
    function backtrack(path) {
        if (path.length === arr.length) {
            result.push([...path]);
            return;
        };

        // loop inside the backtrack function:
        for (let i = 0; i < arr.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push(arr[i]);
            backtrack(path);
            path.pop();
            used[i] = false; // backtrack:
        }
    }
    backtrack([]);
    return result;
}   

// this function should return 2D matrix of 6 different permutations of this argh arr:
console.log(permute([1, 2, 3]));

// TODO do the combinations, Controlled depth (k - length) subset generation.
