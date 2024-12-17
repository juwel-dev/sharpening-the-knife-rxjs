import { ReplaySubject } from 'rxjs';

type Gift = {
  name: string;
};

const OPTION = [
  [{ name: 'Tesla' }],
  [{ name: 'Yacht' }],
  [{ name: 'Westflügel' }],
];

export class GiftRepository {
  public Gifts$ = new ReplaySubject<Gift[] | undefined>(1);

  public triggerFetchAllGifts(userId?: number): void {
    if (userId === undefined) {
      this.Gifts$.next(undefined);
      return;
    }

    this.Gifts$.next(OPTION[userId % OPTION.length]);
  }
}
