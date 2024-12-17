import { inject, injectable } from 'tsyringe';
import { globalEvent$, subscribe } from '../../Framework/subscribe';
import type { GiftRepository } from '../../Infrastructure/Repository/GiftRepository';
import { userTypes } from '../user.types';

@subscribe('UserClicked')
@injectable()
export class OnUserClickedEventHandler {
  constructor(
    @inject(userTypes.giftRepository)
    private readonly giftRepository: GiftRepository,
  ) {}

  handle(event: { type: 'UserClicked'; payload: { userId?: number } }) {
    this.giftRepository.triggerFetchAllGifts(event.payload.userId);

    globalEvent$.next({ type: 'UserClickedEventHandled' });
  }
}
