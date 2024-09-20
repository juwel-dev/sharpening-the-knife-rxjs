import { ReplaySubject, Subject } from 'rxjs';

export type UserFetchData = {
  id: number;
  name: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
};

export class UserRepository {
  public Users$: Subject<UserFetchData[]> = new ReplaySubject(1);

  public triggerFetchAllUsers(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => this.Users$.next(json));
  }
}
