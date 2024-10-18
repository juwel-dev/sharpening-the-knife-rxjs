type Event<T> = {
  payload: T;
  type: string;
};

interface IEventBus {
  subscribe(event: string, callback: () => void): void;
  publish(event: Event<unknown>): void;
}

export class EventBus implements IEventBus {
  private subscribers: Map<string, Array<() => void>> = new Map();

  publish(event: Event<unknown>): void {
    for (const callback of this.subscribers.get(event.type) ?? []) {
      callback();
    }
  }

  subscribe(event: string, callback: () => void): void {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }

    this.subscribers.get(event)?.push(callback);
  }
}
