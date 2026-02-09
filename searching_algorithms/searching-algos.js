//! Searching is the fundemental process of locating a specific element or item within a collection of data. The collection of data can take various forms, such as arrays, lists, trees or other structured representations.
// NOTE  Reference Image -> [../assets/searching.webp]

//* Linear search is the simplest algorithm that checks each element sequentially until the key is found or collection is fully traversed. Works on both sorted and unsorted data. 

// Linear Search is - O(n) time and O(1) space:
const linearSearch = (arr, k) => {
    const n = arr.length;

    // iterate over the array in order to find k-target element which may or may not exist within the iterable:
    for (let i = 0; i < n; i++) {
        if (arr[i] === k) {
            return { index: i, value: arr[i] };
        }
    }
    // if not found return -1:
    return -1;
}

console.log(linearSearch([2, 3, 4, 10, 40], 10));

//* Binary Search works on sorted arrays by repeatedly dividing the search in half. If the target matches the middle element, return it, otherwise, continue searching left || right.
// Binary Search O(log n) O(1) space:
const binarySearch = (arr, k) => {
    // init the left and the right pointers of the leftmost and the rightmost bounds:
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        // init and calc mid point of the bound of the array argh:
        const mid = Math.floor((left + right) / 2);
        // either init quess at arr[mid] or use arr[mid]
        let guess = arr[mid];
        if (guess === k) {
            return { index: mid, value: arr[mid] };
        } else if (guess < k) {
            left++;
        } else {
            right--;
        }
    }
    // if not found return -1:
    return -1;
}

console.log(binarySearch([1, 3, 4, 10, 40, 50], 3));

//! Graph Algorithms - Graph is a non-linear data structure like a tree data structure. The limitation of the tree is, it can only represent hierarchical data. For situations where nodes or vertices are randomly connected with each other, we use Graph. Example situations where we use graph data structure are, a social network, a computer network, a network of locations used in GPS and many more examples where different nodes or vertices are connected without any hierarchic or constraint structure.

//^ Two most common ways of representation of the graphs are Adjacency Matrix, and Adjacency List.
//* bfs on connected graph:
const bfs = (adj) => {
    let V = adj.length;
    let s = 0; // source node is 0:
    // create an empty array to store the traversal:
    let result = [];

    // create a queue for the BFS:
    let queue = [];

    // initially mark all the verticies as Not visited:
    let visited = new Array(V).fill(false);

    // mark source node as visited and enqueue it:
    visited[s] = true;
    queue.push(s);

    // iterate over the queue:
    while (queue.length > 0) {
        // dequeue a vertex from queue and store it:
        let curr = queue.shift();
        result.push(curr);

        // get all adjacent vertices of the dequeued
        // vertex curr If an adjacent has not been
        // visited, mark it visited and enqueue it
        for (let x of adj[curr]) {
            if (!visited[x]) {
                visited[x] = true;
                queue.push(x);
            }
        }
    }
    return result;
}

// This is represent a connected graph:
let adjList = [
    [1, 2], [0, 2, 3], [0, 4], [1, 4], [2, 3]
];

// main execution:
let answerBFS = bfs(adjList);
console.log('Answer BFS: ', answerBFS.join(' '));

//* A pattern for BFS on a possibly disconnected graph. It finds the BFS order per connected component and returns them all.

// BFS for one connected component starting at 'src':
const bfsFromSources = (adj, src, visited) => {
    const order = [];
    const queue = [src];
    visited[src] = true;

    while (queue.length) {
        const u = queue.shift();
        order.push(u);
        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                queue.push(v)
            }
        }
    }
    return order; // traversal order of this component:
}

// BFS for a graph that may be disconnected:
const bfsAllComponents = (adj) => {
    if (!Array.isArray(adj)) throw new TypeError('adj must be an array of adjacency list');

    const V = adj.length;
    const visited = new Array(V).fill(false);
    const components = [];

    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            components.push(bfsFromSources(adj, i, visited));
        }
    }
    return components;
}

// -------- Example: DISCONNECTED graph --------
// Components: {0,1,2}, {3}, {4,5}
const adjListDisconnected = [
    [1],      // 0
    [0, 2],    // 1
    [1],      // 2
    [],       // 3 (isolated)
    [5],      // 4
    [4]       // 5
];

const comps = bfsAllComponents(adjListDisconnected);
console.log('BFS per component:', comps);

//! Summary of the differences between disconnected and connected Graphs in BFS.
/**
 * Difference between Connected and Disconnected Graphs in BFS:
 *
 * Connected Graph:
 *  - A single BFS starting at any node (e.g., 0) visits all vertices.
 *  - Only one traversal result is produced (e.g., [0, 1, 2, 3, 4]).
 *
 * Disconnected Graph:
 *  - A single BFS only covers its connected component.
 *  - You must run BFS again from each unvisited node (outer loop) 
 *    to visit all components in the graph.
 *  - Results in multiple traversal groups (connected components), 
 *    e.g. [[0,1,2], [3], [4,5]].
 *
 * Complexity:
 *  - Overall time complexity remains O(V + E),
 *    since each vertex and edge is processed once,
 *    even when BFS restarts for multiple components.
 */

//! DFS - Depth-First-Search, explores a graph (or a tree) by going deep as possible along each branch before backtracking. It's the recursive or stack based analog to Breadth-First Search (BFS) which uses a queue.

// graph represented in form of an Adjacency List:
const graph = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: [],
    E: ['F'],
    F: []
};

//* this is a recursive function in which function calls itself:
const dfsRecursive = (node, graph, visited = new Set(), result = []) => {
    if (visited.has(node)) return;
    visited.add(node);
    result.push(node);

    for (const neighbor of graph[node]) {
        dfsRecursive(neighbor, graph, visited, result);
    }
    // return the result array holder:
    return result;
}

console.log(dfsRecursive('A', graph));
console.log(dfsRecursive('E', graph)); 

//* this is an iterative function which uses a stack:
const dfsIterative = (start, graph) => {
    const visited = new Set();
    const stack = [start]; // LIFO: last-in-first-out!
    const result = [];

    while (stack.length > 0) {
        const node = stack.pop(); // take the top element:
        if (!visited.has(node)) {
            visited.add(node);
            result.push(node); // process node (collect it):

            // push neighbors in reverse order to mimic recursive DFS:
            const neighbors = graph[node];
            for (let i = neighbors.length - 1; i >= 0; i--) {
                stack.push(neighbors[i]);
            }
        }
    }
    return result;
}

// demo check of the dfsIterative traversals:
console.log(dfsIterative('A', graph));
console.log(dfsIterative('E', graph));
console.log(dfsIterative('B', graph));