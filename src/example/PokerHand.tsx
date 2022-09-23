import React, { memo } from 'react';
import { Nested } from '../lib/object-state/types/Nested';
import { Register } from '../lib/types/useFormTypes';
import { FormInput } from './Form';
import useRenderCounter from './util/useRenderCounter';

type Props = {
    hand: FormInput['fav']['pokerHands'][0],
    register: Register;
    idx: number;
    remove: (idx: number) => void;
    insert: (idx: number, val: Nested<FormInput>) => void;
};

function PokerHand({ hand, register, idx, remove, insert }: Props) {
    const renderCount = useRenderCounter(`poker-hand-${idx}`, { inline: true });
    return (
        <div>
            <input type="text" value={hand.a} {...register(`pokerHands.${idx}.a`)} />
            <input type="text" value={hand.b} {...register(`pokerHands.${idx}.b`)} />
            <button type="button" data-cy={`remove-hand-${idx}`} onClick={() => remove(idx)}>Remove</button>
            <button type="button" data-cy={`insert-above-hand-${idx}`} onClick={() => insert(idx, {a: '', b: ''})}>Insert above</button>
            {renderCount}
        </div>
    );
}

export default memo(PokerHand);