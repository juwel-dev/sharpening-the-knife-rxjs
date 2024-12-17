import './Handler/fetchUsersCommandHandler';
import { container } from 'tsyringe';
import { UserRepository } from '../Infrastructure/Repository/UserRepository';
import { userTypes } from './user.types';
import './Handler/LogAllEventHandler';
import './Handler/OnUserClickedEventHandler';
import { GiftRepository } from '../Infrastructure/Repository/GiftRepository';

container.registerSingleton(userTypes.giftRepository, GiftRepository);
container.registerSingleton(userTypes.userRepository, UserRepository);
