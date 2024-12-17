import { Subject, filter } from 'rxjs';
import { type InjectionToken, container } from 'tsyringe';
import type { TEvent } from './event';

export const globalEvent$ = new Subject<TEvent<any>>();

/**
 * Annotate your class as an event handler
 * the handle method will be called when an event of the specified type is emitted
 *
 * @param eventType - The 'command' that the event handler will listen for
 */
export function subscribe(eventType: string | RegExp) {
  return (target: InjectionToken<{ handle(event: TEvent<any>): void }>) => {
    globalEvent$
      .pipe(
        filter((e) => {
          if (typeof eventType === 'string') {
            return e.type === eventType;
          }
          return eventType.test(e.type);
        }),
      )
      .subscribe((e) => container.resolve(target).handle(e));
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
