import React, { useState } from "react";
import useForm from "../lib/useForm";

const initialData = {
    name: "",
    age: ""
};

type FormInput = typeof initialData;

function Form() {


    const [submittedData, setSubmittedData] = useState(null);

    const onSubmit = (data: FormInput) => {
        console.log("submit!", data);
        setSubmittedData(data)
    };

    const { formState, register, handleSubmit } = useForm(initialData, onSubmit);

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" {...register("name")} autoComplete="off" />
            <input type="number" {...register("age")} />
            <pre id="form-state">
                {JSON.stringify(formState)}
            </pre>
            <input type="submit" />
            <pre id="submitted-data">
                {JSON.stringify(submittedData)}
            </pre>
        </form>
    );
}

export default Form;