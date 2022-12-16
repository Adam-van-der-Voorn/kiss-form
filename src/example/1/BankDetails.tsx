import React, { FormEvent, memo } from 'react';
import { Register } from '../../lib/types/useFormTypes';

type Props = {
    setState: (key: string, val: React.SetStateAction<any>) => void,
    register: Register,
};

function BankDetails({ setState, register }: Props) {
    const onChange = (ev: FormEvent<HTMLInputElement>) => {
        let text = ev.currentTarget.value;
        
        // add spaces
        for (let i = 0; i < 4; i += 1) {
            const idx = 4 + (i * 5);
            const char = text.charAt(idx)
            if (char && char != ' ') {
                text = text.slice(0, idx) + ' ' + text.slice(idx);
            }
        }
        
        // restrict
        text = text.slice(0, 19);
        setState('bank.number', text);
    };

    return (
        <div className="nested">
            <input type="text" {...register('bank.number', { onChange })} autoComplete="off" />
        </div>
    );
}

export default BankDetails;