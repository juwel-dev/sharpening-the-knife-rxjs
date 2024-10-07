import { container } from 'tsyringe';
import { EventBus } from '../../Framework/EventBus';
import { frameworkTypes } from '../../Framework/framework.types';
import { UserRepository } from '../../Infrastructure/Repository/UserRepository';
import { userTypes } from '../user.types';

const eventBus = container.resolve<EventBus>(frameworkTypes.eventBus);
const userRepository = container.resolve<UserRepository>(
  userTypes.userRepository,
);

eventBus.subscribe('fetchUserCommand', () => {
  userRepository.triggerFetchAllUsers();
});
