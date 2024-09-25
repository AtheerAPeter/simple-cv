import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges and classifies CSS class names using twMerge and clsx
 * @param {...ClassValue[]} inputs - An array of class values to be merged and classified
 * @returns {string} A string of merged and classified CSS class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Recursively removes undefined values from an object or array
 * @param {any} obj - The input object or array to clean
 * @returns {any} A new object or array with all undefined values removed
 */
export const removeUndefined = (obj: any): any => {
  if (Array.isArray(obj)) {
    /**
     * Filters out undefined items from an array and applies the removeUndefined function to each remaining item
     * @param {Array} obj - The input array to be processed
     * @returns {Array} A new array with undefined items removed and removeUndefined applied to each element
     */
    return obj.filter((item) => item !== undefined).map(removeUndefined);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj)
        /**
         /**
          * Maps over an array of key-value pairs, removing undefined values from each value
          * @param {Array<[string, any]>} entries - An array of key-value pairs
          * @returns {Array<[string, any]>} A new array of key-value pairs with undefined values removed from each value
          */
         * Filters an array of key-value pairs, keeping only those where the value is not undefined
         * @param {Array} _ - An array of key-value pairs (entries)
         * @returns {Array} A new array containing only the key-value pairs where the value is not undefined
         */
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, removeUndefined(v)])
    );
  }
  return obj;
};
