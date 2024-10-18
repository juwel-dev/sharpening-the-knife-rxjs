import './Handler/fetchUsersCommandHandler';
import { container } from 'tsyringe';
import { UserRepository } from '../Infrastructure/Repository/UserRepository';
import { userTypes } from './user.types';

container.registerSingleton(userTypes.userRepository, UserRepository);
