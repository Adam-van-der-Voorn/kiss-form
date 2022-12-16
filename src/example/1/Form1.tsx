import React, { useState } from 'react';
import trimObject from '../../lib/private/util/trimObject';
import useForm from '../../lib/useForm';
import useFormPartition from '../../lib/useFormPartition';
import Emails from './Emails';
import Favourites from './Favourites';
import useRenderCounter from '../util/useRenderCounter';
import useNameForPlaceholder from '../util/useNameForPlaceholder';
import validation from './validation';
import Toggle from '../Toggle';
import BankDetails from './BankDetails';

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
    },
    bank: {
        number: ''
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

    useNameForPlaceholder();

    const { state, error, touched, dirty, register, handleSubmit, formCapsule, setState } = useForm(initialData, onSubmit, { validation });
    const emailsPartition = useFormPartition<FormInput, FormInput['email']>('email', formCapsule);
    const favouritesPartition = useFormPartition<FormInput, FormInput['fav']>('fav', formCapsule);

    return (
        <form onSubmit={handleSubmit}>
            {renderCount}
            <div>
                <input type="text" {...register('name')} autoComplete="off" />
                <div className='err-msg' data-cy="name-err">{error.name}</div>
                <input type="number" {...register('age')} />
            </div>
            <Emails partition={emailsPartition} />
            <Favourites partition={favouritesPartition} />
            <BankDetails setState={setState} register={register} />
            <input type="submit" />
            <Toggle name="form state">
                <pre id="form-state">
                    {JSON.stringify(trimObject(state), null, 2)}
                </pre>
            </Toggle>
            <Toggle name="form touched">
                <pre id="form-touched">
                    {JSON.stringify(touched, null, 2)}
                </pre>
            </Toggle>
            <Toggle name="form dirty">
                <pre id="form-dirty">
                    {JSON.stringify(dirty, null, 2)}
                </pre>
            </Toggle>
            <pre id="submitted-data">
                {JSON.stringify(submittedData, null, 2)}
            </pre>
        </form>
    );
}

export default Form1;