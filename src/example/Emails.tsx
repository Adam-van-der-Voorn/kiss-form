import React, { memo } from "react";

type Props = {
    register: any;
};

function Emails({ register }: Props) {
    return (
        <div className="nested">
            <input type="text" {...register("email.work")} autoComplete="off" />
            <input type="text" {...register("email.personal")} autoComplete="off" />
        </div>
    );
}

export default memo(Emails);