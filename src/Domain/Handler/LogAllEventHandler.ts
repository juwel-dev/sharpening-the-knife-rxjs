import { Logger } from '@juwel-development/beautiful-logger';
import { subscribe } from '../../Framework/subscribe';

@subscribe(/.*/)
export class LogAllEventHandler {
  handle(event: any) {
    Logger.getLogger(LogAllEventHandler.name).debug(event);
  }
}
