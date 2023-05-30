class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class Queue {
  constructor(size) {
    this.head = null || {};
    this.tail = null || {};
    this.length = 0;
    this.size = size;
  }

  enqueue(element) {
    const node = new ListNode(element);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else if (!this.isEmpty() && this.length <= this.size) {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
    return node;
  }

  dequeue() {
    const current = this.head;
    this.head = this.head.next;
    this.length--;
    return current.data;
  }

  isEmpty() {
    return this.length === 0;
  }

  getHead() {
    return this.isEmpty() ? "empty so no head" : this.head;
  }

  getTail() {
    return this.isEmpty() ? "empty so no tail" : this.tail;
  }

  clear() {
    return this.size = 0;
  }

  print() {
    let current = this.head;
    while (current) {
      console.log(current);
      current = current.next;
    }
    return current;
  }
}
