import React, { memo, useCallback } from "react";
import useRenderCounter from "./util/useRenderCounter";

type Props = {
    register: any;
    setFormState: any;
    email: any;
};

function Emails({ register, setFormState, email }: Props) {
    const renderCount = useRenderCounter('email');

    const clear = useCallback(() => {
        setFormState('email', {
            work: '',
            personal: ''
        });
    }, [setFormState]);

    return (
        <div className="nested">
            <input type="text" value={email.work} {...register("email.work")} autoComplete="off" />
            <input type="text" value={email.personal} {...register("email.personal")} autoComplete="off" />
            <button type="button" data-cy="clear-email" onClick={clear}>Clear</button>
            {renderCount}
        </div>
    );
}

export default memo(Emails);