import React, { useState } from "react";
import trimObject from "../lib/trimObject";
import useForm from "../lib/useForm";
import Emails from "./Emails";

const initialData = {
    name: "",
    age: "",
    email: {
        personal: "",
        work: ""
    }
};

type FormInput = typeof initialData;

function Form() {


    const [submittedData, setSubmittedData] = useState(null);

    const onSubmit = (data: FormInput) => {
        console.log("submit!", data);
        setSubmittedData(trimObject(data));
    };

    const { formState, register, handleSubmit } = useForm(initialData, onSubmit);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" {...register("name")} autoComplete="off" />
                <input type="number" {...register("age")} />
            </div>
            <Emails register={register} />
            <pre id="form-state">
                {JSON.stringify(trimObject(formState))}
            </pre>
            <input type="submit" />
            <pre id="submitted-data">
                {JSON.stringify(submittedData)}
            </pre>
        </form>
    );
}

export default Form;