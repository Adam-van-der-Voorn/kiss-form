import React, { useEffect, useState } from "react";
import trimObject from "../lib/private/util/trimObject";
import useForm from "../lib/useForm";
import Emails from "./Emails";
import Favourites from "./Favourites";
import './style.css';
import useRenderCounter from "./util/useRenderCounter";

const defaultInitialData = {
    name: "",
    age: "",
    email: {
        personal: "",
        work: ""
    },
    fav: {
        fruit: "",
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
        console.log("submit!", data);
        setSubmittedData(trimObject(data));
    };

    useEffect(() => {
        document.querySelectorAll('input').forEach(input => {
            const name = input.getAttribute('name');
            if (name) {
                input.setAttribute('placeholder', name);
            }
        });
    });

    const { formState, register, setFormState, handleSubmit, form } = useForm(initialData, onSubmit);

    return (
        <form onSubmit={handleSubmit}>
            {renderCount}
            <div>
                <input type="text" value={formState.name} {...register("name")} autoComplete="off" />
                <input type="number" value={formState.age} {...register("age")} />
            </div>
            <Emails form={form} email={formState.email} />
            <Favourites form={form} favourites={formState.fav} />
            <pre id="form-state">
                {JSON.stringify(trimObject(formState), null, 2)}
            </pre>
            <input type="submit" />
            <pre id="submitted-data">
                {JSON.stringify(submittedData, null, 2)}
            </pre>
        </form>
    );
}

export default Form;