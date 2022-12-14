import React, { memo } from 'react';
import { FormPartition } from '../../lib/types/useFormTypes';
import { FormInput } from './Form1';
import useRenderCounter from '../util/useRenderCounter';
import useFormPartition from '../../lib/useFormPartition';

type HandInput = FormInput['fav']['pokerHands'][0];

type Props = {
    partition: FormPartition<FormInput['fav']>;
    idx: number;
    remove: (idx: number) => void;
    insert: (idx: number, val: HandInput) => void;
};

// this is just a wrapper for the real content of the PokerHand
// content is nested like this so it can be memoized
function PokerHand({ partition, idx, remove, insert }: Props) {
    const { partitionCapsule } = partition;
    const handPartition = useFormPartition<FormInput['fav'], HandInput>(`pokerHands.${idx}`, partitionCapsule);
    return <PokerHandInternal idx={idx}
        partition={handPartition}
        insert={insert}
        remove={remove}
    />;
}

type PropsInternal = {
    partition: FormPartition<HandInput>;
    idx: number;
    remove: (idx: number) => void;
    insert: (idx: number, val: HandInput) => void;
};

const PokerHandInternal = memo(({idx, partition, remove, insert}: PropsInternal) => {
    const renderCount = useRenderCounter(`poker-hand-${idx}`, { inline: true });
    const { register, error } = partition;
    return (
        <div>
            <input type="text" {...register('a')} />
            <div className='err-msg' data-cy="hand-a-err">{error?.a}</div>
            <input type="text" {...register('b')} />
            <div className='err-msg' data-cy="hand-b-err">{error?.b}</div>
            <button type="button" data-cy={`remove-hand-${idx}`} onClick={() => remove(idx)}>Remove</button>
            <button type="button" data-cy={`insert-above-hand-${idx}`} onClick={() => insert(idx, {a: '', b: ''})}>Insert above</button>
            {renderCount}
        </div>
    );
});

export default PokerHand;