import "./framework.module";
import {container} from "tsyringe";
import {EventBus} from "./EventBus";
import {frameworkTypes} from "./framework.types";

export function subscribe(eventCommand: string) {
  return function (target: { new (...arg: never[]): { handle(): void } }) {
    const eventBus = container.resolve<EventBus>(frameworkTypes.eventBus);
    // @ts-expect-error - This is a hack to get around the fact that the event type is not known at compile time
    eventBus.subscribe(eventCommand, () => container.resolve(target).handle());
  };
}

/**
 * Annotate your class as an event handler
 * the handle method will be called when an event of the specified type is emitted
 *
 * @param eventType
 */
// export function EventHandler<T extends TEvent>(eventType: string | RegExp) {
//   return function (target: { new (...arg: never[]): { handle(event: T): void } }) {
//     GlobalEvent$.pipe(
//         filter((event) => {
//           if (typeof eventType === 'string') {
//             return event.type === eventType;
//           }
//           return eventType.test(event.type);
//         }),
//     ).subscribe((event) => {
//       // @ts-expect-error - This is a hack to get around the fact that the event type is not known at compile time
//       const callable = container.resolve(target);
//       callable.handle(event as T);
//     });
//   };
// }