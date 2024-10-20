import '../../Domain/user.module';
import { FunctionComponent, useEffect, useState } from 'react';
import { container } from 'tsyringe';
import { userTypes } from '../../Domain/user.types';
import {
  UserFetchData,
  UserRepository,
} from '../../Infrastructure/Repository/UserRepository';
import { EventBus } from '../../Framework/EventBus';
import { frameworkTypes } from '../../Framework/framework.types';

const HomePage: FunctionComponent = () => {
  const eventBus = container.resolve<EventBus>(frameworkTypes.eventBus);
  const userRepository = container.resolve<UserRepository>(
    userTypes.userRepository,
  );

  const [users, setUsers] = useState<UserFetchData[]>();

  useEffect(() => {
    eventBus.publish({ type: 'fetchUsersCommand', payload: undefined });
  }, [eventBus]);

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
