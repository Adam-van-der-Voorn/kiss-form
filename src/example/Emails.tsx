import React, { memo, useCallback } from "react";
import getFormPartition from "../lib/getFormPartition";
import useRenderCounter from "./util/useRenderCounter";

type Props = {
    form: any;
    email: any;
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