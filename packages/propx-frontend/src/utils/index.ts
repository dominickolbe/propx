/** UTILS **/

/**
 * Returns a random number for given range
 * @param {number} n1 max number (+ n1)
 * @param {number} n2 min number
 * @return {number} number value
 */
export const getRandomNumber = (n1: number, n2: number) =>
  Math.floor(Math.random() * n1) + n2;

export const locale = "en-GB";
export const numberFormatConfig = {
  style: "currency",
  currency: "GBP",
};

/**
 * Helper function to 'simulate' a sleep
 * @param {number} duration in milliseconds
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
