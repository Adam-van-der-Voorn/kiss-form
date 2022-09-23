import React, { memo, useCallback } from 'react';
import getFormPartition from '../lib/useFormPartition';
import { FormInterface } from '../lib/types/useFormTypes';
import { FormInput } from './Form';
import useRenderCounter from './util/useRenderCounter';

type Props = {
    form: FormInterface<FormInput>;
    email: FormInput['email'];
};

function Emails({ form, email }: Props) {
    const renderCount = useRenderCounter('email');
    const partition = getFormPartition('email', form);

    const clear = useCallback(() => {
        partition.setState('', {
            work: '',
            personal: ''
        });
    }, [partition.setState]);

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