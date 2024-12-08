import '../../Domain/user.module';
import { FunctionComponent, useEffect, useState } from 'react';
import { container } from 'tsyringe';
import { userTypes } from '../../Domain/user.types';
import {
  UserFetchData,
  UserRepository,
} from '../../Infrastructure/Repository/UserRepository';
import {globalEvent$} from "../../Framework/subscribe";

const HomePage: FunctionComponent = () => {
  const userRepository = container.resolve<UserRepository>(userTypes.userRepository);

  const [users, setUsers] = useState<UserFetchData[]>();

  useEffect(() => globalEvent$.next({ type: 'fetchUsersCommand' }), []);

  useEffect(() => {
    userRepository.Users$.subscribe((users) => setUsers(users));
  }, [userRepository]);

  return (
    <div className='flex w-screen h-screen justify-center items-center gap-2 flex-row flex-wrap'>
      {users?.map((user) => (
        <div key={user.id} className='bg-sky-200 rounded-md drop-shadow-md p-2'>
          <p className='font-bold'>{user.name}</p>
          <p>{user.address.city}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
