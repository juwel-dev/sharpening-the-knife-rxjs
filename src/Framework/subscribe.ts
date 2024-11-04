import {container, InjectionToken} from "tsyringe";
import {filter, Subject} from "rxjs";
import {TEvent} from "./event";

export const globalEvent$ = new Subject<TEvent>();

/**
 * Annotate your class as an event handler
 * the handle method will be called when an event of the specified type is emitted
 *
 * @param eventType - The 'command' that the event handler will listen for
 */
export function subscribe(eventType: string) {
  return function (target: InjectionToken<{handle(): void}> ) {
    globalEvent$
        .pipe(filter((e) => e.type === eventType))
        .subscribe(() => container.resolve(target).handle());
  };
}

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