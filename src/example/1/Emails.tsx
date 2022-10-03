import React, { memo, useCallback } from 'react';
import { FormInterface } from '../../lib/types/useFormTypes';
import { FormInput } from './Form1';
import useRenderCounter from '../util/useRenderCounter';

type Props = {
    partition: FormInterface<FormInput>;
    email: FormInput['email'];
};

function Emails({ partition, email }: Props) {
    const renderCount = useRenderCounter('email');
    const { setState: setEmailsState } = partition;

    const clear = useCallback(() => {
        setEmailsState('', {
            work: '',
            personal: ''
        });
    }, [setEmailsState]);

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