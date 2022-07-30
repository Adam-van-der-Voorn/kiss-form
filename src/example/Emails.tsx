import React, { memo, useCallback } from "react";
import getFormPartition from "../lib/getFormPartition";
import { FormInterface } from "../lib/types/useFormTypes";
import { FormInput } from "./Form";
import useRenderCounter from "./util/useRenderCounter";

type Props = {
    form: FormInterface<FormInput>;
    email: FormInput['email'];
};

function Emails({ form, email }: Props) {
    const renderCount = useRenderCounter('email');
    const { register, setPartitionState } = getFormPartition('email', form)

    const clear = useCallback(() => {
        setPartitionState('', {
            work: '',
            personal: ''
        });
    }, [setPartitionState]);

    return (
        <div className="nested">
            <input type="text" value={email.work} {...register("work")} autoComplete="off" />
            <input type="text" value={email.personal} {...register("personal")} autoComplete="off" />
            <button type="button" data-cy="clear-email" onClick={clear}>Clear</button>
            {renderCount}
        </div>
    );
}

export default memo(Emails);