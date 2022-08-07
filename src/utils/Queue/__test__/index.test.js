import Queue from "../index.js";

const testData1 = [1, 2, 3, 4, 5, 6];
const testData2 = [2, 3, 4, 5, 6, 7, 4];

describe("Queue class", () => {
  test("Construction", () => {
    const queue = new Queue(testData1);
    expect(queue).toBeInstanceOf(Queue);
    expect(queue.getSize()).toBe(testData1.length);
  });

  test("Methods", () => {
    const queue = new Queue(testData2);

    for (let i = 0; i < testData2.length; i++) {
      expect(testData2[i]).toBe(queue.dequeue());
    }
    expect(queue.getSize()).toBe(0);

    queue.enqueue(1);

    expect(queue.getSize()).toBe(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue.getSize()).toBe(0);
    expect(() => queue.dequeue()).toThrow();
  });
});
