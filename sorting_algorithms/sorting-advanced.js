//! Advanced Sorting Algorithms -> Merge-Sort, Quick-Sort, Radix-Sort, Heap-Sort:
// NOTE Reference Image -> [../assets/advanced_sort_algorithms.webp]

//* Merge Sort is a divide and conquer algorithm. It divides the array into halves. Recursively sorts each half, and merges the sorted halves back together. 
//^ Time Complexity -> Best case -> O(n log n): Average case -> O(n log n): Worst case -> O(n log n)
//^ Space Complexity -> O(n) - as it requires additional array for merging sorted halves.

const mergeSort = (arr) => {
    // base case:
    if (arr.length <= 1) {
        return arr;
    }

    // step 1: split the array into halves:
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // step 2: recursively sort both halves:
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    // step 3: merge the two sorted halves:
    return merge(sortedLeft, sortedRight);
}

// helper function of merge:
function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;

    // compare elements and merge in sorted order:
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // add any remaining elements:
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }
    return result;
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));

