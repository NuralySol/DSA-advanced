//! Memoization is an optimization technique that stores ('remembers') the result of expensive function calls and returns cached result when the same inputs occur again. Essentially, memoization = caching for functions. It trades time for space - using extra memory to avoid recalculating things.

//* Example of a function without memoization:
const slowFib = (n) => {
    if (n <= 1) return n;
    return slowFib(n - 1) + slowFib(n - 2);
}

console.log(slowFib(10));

//* Example of a similar function but with memoization:
const memoFib = (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = memoFib(n - 1, memo) + memoFib(n - 2, memo);
    return memo[n];
}

// in this function call -> first call -> computes and caches results. Later calls: constant-time lookups.
console.log(memoFib(10));

//! Coin change-> Coin change is a classic DP problem with two popular variants. Memoization, and Tabulation:

// 1st example will be of memoization, Top - Down, (recursion + memoization):
const coinChangeMinMemo = (coins, amount) => {
    const memo = new Map(); // key: amount, value: min coins

    function dp(rem) {
        if (rem === 0) return 0;
        if (rem < 0) return Infinity;
        if (memo.has(rem)) return memo.get(rem);

        let best = Infinity;
        for (const c of coins) {
            const res = dp(rem - c);
            if (res !== Infinity) best = Math.min(best, res + 1);
        }
        memo.set(rem, best);
        return best;
    }
    const ans = dp(amount);
    return ans === Infinity ? -1 : ans;
}

console.log(coinChangeMinMemo([1, 2, 5], 11)); // output -> 3 (5+5+1)

//! Bottom-Up (tabulation)!:
const coinChangeMinTab = (coins, amount) => {
    // Init Infinit amount + 1:
    // this will fill the dp table with an array = amout + 1:
    const INF = amount + 1;
    const dp = new Array(amount + 1).fill(INF);
    dp[0] = 0;

    for (let a = 1; a <= amount; a++) {
        for (const c of coins) {
            if (a - c >= 0) dp[a] = Math.min(dp[a], dp[a - c] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}

console.log(coinChangeMinTab([1, 2, 5], 11)); // expected output of the function is 3: