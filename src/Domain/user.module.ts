import '../Framework/framework.module';
import './Handler/fetchUserCommandHandler';
import { container } from 'tsyringe';
import { UserRepository } from '../Infrastructure/Repository/UserRepository';
import { userTypes } from './user.types';

container.registerSingleton(userTypes.userRepository, UserRepository);
