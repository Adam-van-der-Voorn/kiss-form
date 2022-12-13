import React, { memo } from 'react';
import { FormPartition } from '../../lib/types/useFormTypes';
import { FormInput } from './Form1';
import useRenderCounter from '../util/useRenderCounter';

type Props = {
    partition: FormPartition<FormInput['fav']>;
    idx: number;
    remove: (idx: number) => void;
    insert: (idx: number, val: FormInput['fav']['pokerHands'][0]) => void;
};

function PokerHand({ partition, idx, remove, insert }: Props) {
    const { register, error } = partition;
    const renderCount = useRenderCounter(`poker-hand-${idx}`, { inline: true });
    return (
        <div>
            <input type="text" {...register(`pokerHands.${idx}.a`)} />
            <div className='err-msg' data-cy="hand-a-err">{error?.pokerHands?.at(idx)?.a}</div>
            <input type="text" {...register(`pokerHands.${idx}.b`)} />
            <div className='err-msg' data-cy="hand-b-err">{error?.pokerHands?.at(idx)?.b}</div>
            <button type="button" data-cy={`remove-hand-${idx}`} onClick={() => remove(idx)}>Remove</button>
            <button type="button" data-cy={`insert-above-hand-${idx}`} onClick={() => insert(idx, {a: '', b: ''})}>Insert above</button>
            {renderCount}
        </div>
    );
}

export default memo(PokerHand);