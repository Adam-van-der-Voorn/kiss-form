import React, { useEffect, useState } from 'react';
import trimObject from '../lib/private/util/trimObject';
import { Flooded } from '../lib/types/Flooded';
import useForm from '../lib/useForm';
import useFormPartition from '../lib/useFormPartition';
import Emails from './Emails';
import Favourites from './Favourites';
import './style.css';
import useRenderCounter from './util/useRenderCounter';

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

function Form({initialData}: Props) {

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
        const errors: Partial<Flooded<string, FormInput>> = {};
        if (data.name == '') {
            errors.name = 'name is required';
        }
        return errors;
    };

    useEffect(() => {
        document.querySelectorAll('input').forEach(input => {
            const name = input.getAttribute('name');
            if (name) {
                input.setAttribute('placeholder', name);
            }
        });
    });

    const { state: formState, handleSubmit, error, form } = useForm(initialData, onSubmit, { validation });
    const emailsPartition = useFormPartition('email', form);
    const favouritesPartition = useFormPartition('fav', form);


    const { register, touched } = form;

    return (
        <form onSubmit={handleSubmit}>
            {renderCount}
            <div>
                <input type="text" value={formState.name} {...register('name')} autoComplete="off" />
                <div className='err-msg' data-cy="name-err">{error.name}</div>
                <input type="number" value={formState.age} {...register('age')} />
            </div>
            <Emails partition={emailsPartition} email={formState.email} />
            <Favourites partition={favouritesPartition} favourites={formState.fav} />
            <pre id="form-state">
                {JSON.stringify(trimObject(formState), null, 2)}
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

export default Form;