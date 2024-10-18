import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../Infrastructure/Repository/UserRepository';
import { userTypes } from '../user.types';
import { subscribe } from "../../Framework/subscribe";

@injectable()
@subscribe('fetchUsersCommand')
export class FetchUsersCommandHandler {

  constructor(@inject(userTypes.userRepository) private readonly userRepository: UserRepository) {}

  public handle() {
    this.userRepository.triggerFetchAllUsers();
  }
}
