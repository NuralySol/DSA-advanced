//! Sample review of the algorithms, basic and advanced:

//* A) getTwoSum with pointers works on already sorted arrays otherwise they have to be sorted first:
const getTwoSum = (arr, k) => {
    // strict validation of the array argh and k-target value:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (!arr.every(item => typeof item === 'number')) throw new RangeError('every element of the array object must be numeric');
    if (arr.length <= 2) throw new RangeError('array must contain at least 2 elements');
    if (typeof (k) !== 'number') throw new TypeError('k argh must be a number');

    // init two pointers of the array most left bound and the most right bound of the array:
    let left = 0; // since 0 is always the first element within the array i.e. address value:
    let right = arr.length - 1;

    // while loop for conditional with the sum capture:
    while (left < right) {
        // init the sum target to capture the left most bound and the right most bound of the array sum:
        const sum = arr[left] + arr[right];

        // conditional if equal to k target sum:
        if (sum === k) {
            return {
                indices: [left, right],
                values: [arr[left], arr[right]]
            };
        } else if (sum < k) {
            left++;
        } else {
            right--;
        }
    }
    // otherwise return -1 if not found:
    return -1;
}

console.log(getTwoSum([2, 5, 7, 11, 15], 9));

//* B) getTwoSum with the global map object:
const getTwoSumMap = (arr, k) => {
    const seen = new Map();

    for (let i = 0; i < arr.length; i++) {
        const need = k - arr[i];
        if (seen.has(need)) {
            return [need, arr[i]];
        } else {
            seen.set(arr[i], i);
        }
    }
    // else return -1;
    return -1;
}

console.log(getTwoSumMap([2, 5, 7, 11, 14], 18));

//* binary search, works on sorted arrays:
const binarySearch = (arr, k) => {
    if (!Array.isArray(arr)) return null;
    // NOTE this a new Synthax that the array must be sorted in ascending order:
    if (!arr.every((v,i,a) => i === 0 || a[i-1] <= v))
    throw new Error('Array must be sorted in ascending order');

    // init the left and right pointers for the binary search operation:
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === k) {
            return mid;
        } else if (arr[mid] < k ) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return - 1;
}

console.log(binarySearch([1, 3, 5, 7, 11, 15, 18], 18));

//* Sliding window technique using the fixed window technique:
const maxSumFixedWindow = (arr, k) => {
    // some validation of the array and the k target:
    if (!Array.isArray(arr)) throw new TypeError('arr argh must be an array object!');
    if (arr.length < k) return null;

    // Step 1: sum the first k elements window is 3 in this case:
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    // 2nd trackter which will ultimately track the maxSum:
    let maxSum = windowSum;

    // Step 2: slide the window:
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k] // add next, remove first of previous window:
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
};

console.log(maxSumFixedWindow([2, 1, 5, 1, 3, 2], 3)); // 9 (5+1+3)

// Variable window - longest substring without repeating characters:
const longestUniqueSubstring = (str) => {
    let left = 0;
    let maxLen = 0;
    const seen = new Map(); // char -> last index:

    for (let right = 0; right < str.length; right++) {
        const ch = str[right];

        if (seen.has(ch) && seen.get(ch) >= left) {
            // move left pointer just past the previous occurance:
            left = seen.get(ch) + 1;
        }
        seen.set(ch, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

console.log(longestUniqueSubstring("abcabcbb")); // 3:

// NOTE the core idea of the sliding window technique is Slide exactly k steps for the fixed window, and in the case of the variable window 'expand until invalid -> shrink until valid':
