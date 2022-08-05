import React, { memo } from "react";
import { Register } from "../lib/types/useFormTypes";
import { FormInput } from "./Form";
import useRenderCounter from "./util/useRenderCounter";

type Props = {
    hand: FormInput['fav']['pokerHands'][0],
    register: Register;
    idx: number;
    remove: (idx: number) => void;
};

function PokerHand({ hand, register, idx, remove }: Props) {
    const renderCount = useRenderCounter(`poker-hand-${idx}`, { inline: true });
    return (
        <div>
            <input type="text" value={hand.a} {...register(`pokerHands.${idx}.a`)} />
            <input type="text" value={hand.b} {...register(`pokerHands.${idx}.b`)} />
            <button type="button" data-cy={`remove-hand-${idx}`} onClick={() => remove(idx)}>Remove</button>
            {renderCount}
        </div>
    );
}

export default memo(PokerHand);