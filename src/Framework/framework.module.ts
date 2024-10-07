import { container } from 'tsyringe';
import { EventBus } from './EventBus';
import { frameworkTypes } from './framework.types';

container.registerSingleton(frameworkTypes.eventBus, EventBus);
