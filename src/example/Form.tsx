import React, { useEffect, useState } from "react";
import trimObject from "../lib/trimObject";
import useForm from "../lib/useForm";
import Emails from "./Emails";
import Favourites from "./Favourites";
import './style.css';
import useRenderCounter from "./util/useRenderCounter";

const initialData = {
    name: "",
    age: "",
    email: {
        personal: "",
        work: ""
    },
    fav: {
        fruit: ""
    }
};

type FormInput = typeof initialData;

function Form() {

    const [submittedData, setSubmittedData] = useState(null);

    const renderCount = useRenderCounter('root');

    const onSubmit = (data: FormInput) => {
        console.log("submit!", data);
        setSubmittedData(trimObject(data));
    };

    useEffect(() => {
        document.querySelectorAll('input').forEach(input => {
            const name = input.getAttribute('name');
            input.setAttribute('placeholder', name);
        });
    });

    const { formState, register, handleSubmit } = useForm(initialData, onSubmit);

    return (
        <form onSubmit={handleSubmit}>
            {renderCount}
            <div>
                <input type="text" {...register("name")} autoComplete="off" />
                <input type="number" {...register("age")} />
            </div>
            <Emails register={register} />
            <Favourites register={register} favourites={formState.fav} />
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