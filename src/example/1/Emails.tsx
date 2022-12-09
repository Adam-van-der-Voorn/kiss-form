import React, { memo, useCallback } from 'react';
import { FormPartition } from '../../lib/types/useFormTypes';
import { FormInput } from './Form1';
import useRenderCounter from '../util/useRenderCounter';

type Props = {
    partition: FormPartition<FormInput['email']>;
};

function Emails({ partition }: Props) {
    const renderCount = useRenderCounter('email');
    const { state: email, setState: setEmail } = partition;

    const clear = useCallback(() => {
        setEmail('', {
            work: '',
            personal: ''
        });
    }, [setEmail]);

    return (
        <div className="nested">
            <input type="text" value={email.work} {...partition.register('work')} autoComplete="off" />
            <input type="text" value={email.personal} {...partition.register('personal')} autoComplete="off" />
            <button type="button" data-cy="clear-email" onClick={clear}>Clear</button>
            {renderCount}
        </div>
    );
}

export default memo(Emails);