/*
 * JS has no native Queue data structure.
 * So this is a simple implementation.
 *
 * - Last in first out principle
 * - Enqueue O(1) , add new to back of queue
 * - Dequeue O(1) , pop out from the front of queu
 *
 */
class Queue {
  #storage;
  #firstIndex;
  #lastIndex;

  constructor(arr = []) {
    /*
     * storage private
     * firstIndex private
     * lastIndex p
     */
    this.#storage = {};
    this.#firstIndex = 0;
    this.#lastIndex = 0;

    arr.forEach((v) => {
      this.enqueue(v);
    });
  }
  enqueue(value) {
    this.#storage[this.#lastIndex] = value;
    this.#lastIndex += 1;
  }
  dequeue() {
    if (this.getSize() === 0) {
      throw new Error("Queue is empty");
    }

    const toReturn = this.#storage[this.#firstIndex];
    this.#firstIndex += 1;
    return toReturn;
  }
  getSize() {
    return this.#lastIndex - this.#firstIndex;
  }
}

export default Queue;
