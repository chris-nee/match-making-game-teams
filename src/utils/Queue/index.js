/*
 * Class for Queue Implementation
 *
 * JS has no native Queue data structure.
 * So this is a simple class implementation of Queue
 *
 * - Last in first out principle
 * - Enqueue O(1) , add new to back of queue
 * - Dequeue O(1) , pop out from the front of queu
 *
 *   @property {Object} storage     - map for storing index to value
 *   @property {number} firstIndex  - index holding the next value to dequeue
 *   @property {number} lastIndex   - index to add the next incoming value
 */
class Queue {
  #storage;
  #firstIndex;
  #lastIndex;

  /*
   * Creates a Queue, initialises private properties
   *
   * @param {any []} array - The array to initiate into a queue
   */
  constructor(arr = []) {
    this.#storage = {};
    this.#firstIndex = 0;
    this.#lastIndex = 0;

    arr.forEach((v) => {
      this.enqueue(v);
    });
  }

  /*
   * Adds a new value to the back of the queue, increases lastIndex pointer by 1
   * @param {any} value - Value to add to the end of the queue
   */
  enqueue(value) {
    this.#storage[this.#lastIndex] = value;
    this.#lastIndex += 1;
  }

  /*
   * Removes value from the front of the queue, increases firstIndex pointer by 1
   * @return {any}      - The value at the front of the queue
   */
  dequeue() {
    if (this.getSize() === 0) {
      throw new Error("Queue is empty");
    }

    const toReturn = this.#storage[this.#firstIndex];
    this.#firstIndex += 1;
    return toReturn;
  }

  /*
   * Calculates and return the length of the queue
   * @return {number}      - The current length of the queue
   */
  getSize() {
    return this.#lastIndex - this.#firstIndex;
  }
}

export default Queue;
