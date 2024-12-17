import { FunctionComponent } from 'react';
import { container } from 'tsyringe';
import { userTypes } from '../../Domain/user.types';
import { useSubscription } from '../../Framework/hook/useSubscription';
import { GiftRepository } from '../../Infrastructure/Repository/GiftRepository';
import { GiftAnimated } from '../Atom/GiftAnimated';

export const GiftOrganism: FunctionComponent = () => {
  const giftRepository = container.resolve<GiftRepository>(
    userTypes.giftRepository,
  );

  const gifts = useSubscription(giftRepository.Gifts$);

  return (
    <div className='text-white bg-slate-900'>
      <h2 className='text-2xl'>Gifts</h2>
      <div className='grid grid-cols-3 gap-4'>
        {gifts?.map((gift) => (
          <div key={gift.name} className='p-4 rounded-md'>
            <p className='font-bold'>{gift.name}</p>
            <GiftAnimated />
          </div>
        ))}
      </div>
    </div>
  );
};
