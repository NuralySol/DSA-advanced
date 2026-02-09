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

//! Quicksort -> is also a Divide-and-Conquer sorting algorithm that picks a pivot element, partitions the array so that all elements smaller than the pivot go it's left, and all greater go to its right. Recursively sorts the left and right parts.

const quickSort = (arr) => {
    // base case scenario if it is less than or equal to 1 then it is 'sorted':
    if (arr.length <= 1) return arr; 

    // choose a pivot, and init left = [], and right = [] empty arrays:
    const pivot = arr[arr.length - 1]; // this will pick the last element of the array:
    const left = [];
    const right = [];

    // this loop will skip the last element of the array since we are already tracking it:
    for (let i = 0; i < arr.length - 1; i++) {
        if(arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    //recursive calls and merges:
    return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([7, 2, 1, 6, 8, 5, 3, 4]));

// NOTE there are other ways of doing quickSort algorithms -> Choose a random pivot, in-place Lomuto partition O(1) for space efficency, Iterative approach in order to avoid deep recursion on huge arrays:

// Heap Sort (ascending), Builds a max-heap, then extracts max to the end.
const heapSort = (arr) => {
    const n = arr.length;
    if (n <= 1) return arr;

    // 1). Build max-heap in O(n):
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        siftDown(arr, i, n);
    }

    // 2). Repeatedly move max to end and restore heap:
    for (let end = n - 1; end > 0; end--) {
        [arr[0], arr[end]] = [arr[end], arr[0]] // move current max to its final place:
        siftDown(arr, 0, end) // restore heap for [0, end]:
    }
    return arr;
}

// Push element at i down until heap property holds (max-heap):
// This is a helper function of siftDown:
function siftDown(a, i, heapSize) {
    while (true) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let largest = i;

        if (l < heapSize && a[l] > a[largest]) largest = l;
        if (r < heapSize && a[r] > a[largest]) largest = r;

        if (largest === i) break;
        [a[i], a[largest]] = [a[largest], a[i]];
        i = largest;
    }
}

console.log(heapSort([7, 2, 1, 6, 8, 5, 3, 4])); 

//! Radix Sort -> is a non-comparative, stable sorting algorithm that orders keys digit by digit (or character by character), using a stable sub-routine (usually counting sort) on each digit.
// Two common flavors of the Radix Sort are, LSD (Least Significant Digit) and MSD (Most Common Digit):

const radixSortNonNeg = (arr) => {
    if (arr.length <= 1) return arr; // base case:

    const max = Math.max(...arr); 
    let exp = 1;

    const out = new Array(arr.length);

    while (Math.floor(max / exp) > 0) {
        // counting sort by digit at exp:
        const count = new Array(10).fill(0);

        // count occurrences:
        for (let i = 0; i < arr.length; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
        }

        // prefix sum -> positions:
        for (let d = 1; d < 10; d++) count[d] += count[d - 1];

        // build output (stable, iterate from right to left):
        for (let i = arr.length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            out[--count[digit]] = arr[i];
        }

        // copy back:
        for (let i = 0; i < arr.length; i++) arr[i] = out[i];
        exp *= 10;
    }
    return arr;
}

console.log(radixSortNonNeg([170, 45, 75, 90, 802, 24, 2, 66])); 

// NOTE there is also an advanced Radix sort which will sort all of the integer values indcluding negative values:
// TODO Do the radix sort for the negative values as well:

