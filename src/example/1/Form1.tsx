import React, { useState } from 'react';
import trimObject from '../../lib/private/util/trimObject';
import { Flooded } from '../../lib/types/Flooded';
import useForm from '../../lib/useForm';
import useFormPartition from '../../lib/useFormPartition';
import Emails from './Emails';
import Favourites from './Favourites';
import useRenderCounter from '../util/useRenderCounter';
import useNameForPlaceholder from '../util/useNameForPlaceholder';

const defaultInitialData = {
    name: '',
    age: '',
    email: {
        personal: '',
        work: ''
    },
    fav: {
        fruit: '',
        pokerHands: [] as { a: string, b: string }[]
    }
};

export type FormInput = typeof defaultInitialData;

type Props = {
    initialData?: FormInput;
}

function Form1({initialData}: Props) {

    const [submittedData, setSubmittedData] = useState<any>(null);

    const renderCount = useRenderCounter('root');

    if (!initialData) {
        initialData = defaultInitialData;
    }

    const onSubmit = (data: FormInput) => {
        console.log('submit!', data);
        setSubmittedData(trimObject(data));
    };

    const validation = (data: FormInput) => {
        console.log('validating...');
        const errors: Partial<Flooded<FormInput, string>> = {};
        if (data.name == '') {
            errors.name = 'name is required';
        }
        return errors;
    };

    useNameForPlaceholder();

    const { state, touched, error, register, handleSubmit, formCapsule } = useForm(initialData, onSubmit, { validation });
    const emailsPartition = useFormPartition<FormInput, FormInput['email']>('email', formCapsule);
    const favouritesPartition = useFormPartition<FormInput, FormInput['fav']>('fav', formCapsule);

    return (
        <form onSubmit={handleSubmit}>
            {renderCount}
            <div>
                <input type="text" value={state.name} {...register('name')} autoComplete="off" />
                <div className='err-msg' data-cy="name-err">{error.name}</div>
                <input type="number" value={state.age} {...register('age')} />
            </div>
            <Emails partition={emailsPartition} />
            <Favourites partition={favouritesPartition} />
            <pre id="form-state">
                {JSON.stringify(trimObject(state), null, 2)}
            </pre>
            <input type="submit" />
            <pre id="form-touched">
                {JSON.stringify(touched, null, 2)}
            </pre>
            <pre id="submitted-data">
                {JSON.stringify(submittedData, null, 2)}
            </pre>
        </form>
    );
}

export default Form1;