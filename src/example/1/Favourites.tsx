import React, { memo } from 'react';
import useFormArray from '../../lib/useFormArray';
import trimObject from '../../lib/private/util/trimObject';
import { FormPartition } from '../../lib/types/useFormTypes';
import { FormInput } from './Form1';
import PokerHand from './PokerHand';
import useRenderCounter from '../util/useRenderCounter';

type Props = {
    partition: FormPartition<FormInput['fav']>;
};

function Favourites({ partition }: Props) {
    const renderCount = useRenderCounter('favs');
    const { register, state: favourites, partitionCapsule} = partition;
    const { push, remove, replace, insert } = useFormArray<FormInput['fav'], FormInput['fav']['pokerHands']>('pokerHands', partitionCapsule);

    return (
        <div className="nested">
            <p>Your favourites are <span id="favourites-state">{JSON.stringify(trimObject(favourites))}</span>!</p>
            <div>
                <input type="text" value={favourites.fruit}{...register('fruit')} autoComplete="off" />
            </div>
            {favourites.pokerHands.map((hand, idx) => {
                return <PokerHand key={idx}
                    register={register}
                    {...{ hand, idx, remove, insert }}
                />;
            })}
            <button type="button" data-cy="push-hand" onClick={() => push({a: '', b: ''})}>Add poker hand</button>
            <button type="button" data-cy="clear-hands" onClick={() => replace([])}>Clear</button>
            {renderCount}
        </div>
    );
}

export default memo(Favourites);