import '../../Domain/user.module';
import Lottie from 'lottie-react';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { container } from 'tsyringe';
import { userTypes } from '../../Domain/user.types';
import { globalEvent$ } from '../../Framework/subscribe';
import {
  UserFetchData,
  UserRepository,
} from '../../Infrastructure/Repository/UserRepository';
import { GiftAnimated } from '../Atom/GiftAnimated';
import { GiftOrganism } from '../Organism/GiftOrganism';

const HomePage: FunctionComponent = () => {
  const userRepository = container.resolve<UserRepository>(
    userTypes.userRepository,
  );

  useEffect(() => globalEvent$.next({ type: 'fetchUsersCommand' }), []);

  const [users, setUsers] = useState<UserFetchData[]>();
  useEffect(() => {
    const subscription = userRepository.Users$.subscribe((users) =>
      setUsers(users),
    );

    return () => subscription.unsubscribe();
  }, [userRepository]);

  const onUserClick = useCallback((user: UserFetchData) => {
    globalEvent$.next({ type: 'UserClicked', payload: { userId: user.id } });
  }, []);

  return (
    <div className='flex w-screen h-screen justify-center items-center gap-2 flex-row flex-wrap'>
      {users?.map((user) => (
        <div
          key={user.id}
          onClick={() => onUserClick(user)}
          onKeyDown={(event) => event.key === 'Enter' && onUserClick(user)}
          className='bg-sky-200 rounded-md drop-shadow-md p-2'
        >
          <p className='font-bold'>{user.name}</p>
          <p>{user.address.city}</p>
        </div>
      ))}

      <GiftOrganism />
    </div>
  );
};

export default HomePage;
