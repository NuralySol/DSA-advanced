//! Sorting algorithms are fundemental when sorting iterables, especially when you want the iterable to be in order.
// There two types of sorting techniques: 1st is Comparison-based -> We compare the elements in a comparison-based sorting algorithm.
// 2nd is Non-Comparison-based -> We DO NOT compare the elements in a non-comparison-based sorting algorithm.
// NOTE Reference image -> [../assets/sorting.png]
// Simple Sorting algorithms -> [../assets/basic_sort_algorithms.webp]

//* Bubble Sort is the simple algorithm that repeatedly swaps adjacent elements if they are in the wrong order. It performs multiple passes through the array, and each pass, the largest unsorted element moves to its correct position at the end.
// O(n^2) Time and O(1) Space: 
const bubbleSort = (arr) => {
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        // flag to detect if any swap happened:
        let swapped = false;

        for (let j = 0; j < n - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // swap using the destructuring:
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        // optimization: stop early if no swaps(already sorted):
        if (!swapped) break;
    }
    return arr;
};

console.log(bubbleSort([5, 6, 1, 3]));

//* Insertion Sort is a simple algorithm that builds the sorted array one element at a time. It works like sorting playing cards in your hand, where each new card is inserted into its correct position among the already sorted cards.
// O(n^2) Time and O(1) Space:
const insertionSort = (arr) => {
    // start at the 2nd element at index 1.
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i]; // element to be placed in the correct position:
        let j = i - 1;

        // shift elements of the sorted part to the right untill the correct position is found:
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        // insert key at the correct location:
        arr[j + 1] = key;
    }
    return arr;
}

console.log(insertionSort([12, 11, 13, 5, 6]));

//* Selection Sort is a comparison based algorithm that repeatedly selects the smallest (or the largest) element from the unsorted part of the array and swaps it with the first unsorted element. This process continues until the array is fully sorted.
// O(n^2) Time and O(1) Space:
const selectionSort = (arr) => {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        // find the smallest element in the remaining unsorted array:
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // swap if a smaller element was found:
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

console.log(selectionSort([64, 25, 12, 22, 11]));

//* Counting Sort is a non-comparison-based sorting algorithm that works efficiently when the range of input values is small relative to the number of elements. It counts the frequency of each distinct element and uses that count to place elements directly into their correct sorted positions.
// Time: O(n + k) n = number of elements, k = range(max - min + 1):
// Space: O(k) count array size depends on range input values:
const countingSort = (arr) => {
    // validation to make sure arr contains 'something':
    if (arr.length === 0) {
        return [];
    }

    // find the minimum and maximum values in the array:
    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    // create a count array to store the frequency of each element:
    // the size of the count array is determined by the range of values (max - min + 1):
    const count = new Array(max - min + 1).fill(0);

    // populate the count array:
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++; // Adjust index for potential negative numbers or offset:
    }

    // modify the count array to store the cumulative count:
    // this helps determine the correct sorted position of each element:
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // create an output array to store the sorted elements:
    const output = new Array(arr.length);

    // build the output array by traversing the original array in reverse:
    // this ensures stability (preserves relative order of equal elements):
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--; // Decrement count to place subsequent equal elements correctly:
    }
    // return the output:
    return output;
}

console.log(countingSort([4, 2, 2, 8, 3, 3, 1]));