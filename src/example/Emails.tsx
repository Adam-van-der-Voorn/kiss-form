import React from "react";

function Emails({ register }: { register: any; }) {
    return (
        <div>
            <input type="text" {...register("email.work")} autoComplete="off" />
            <input type="text" {...register("email.personal")} autoComplete="off" />
        </div>
    );
}

export default Emails;