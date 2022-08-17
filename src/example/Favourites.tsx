import React, { memo } from "react";
import arrayFunctions from "../lib/arrayFunctions";
import getFormPartition from "../lib/getFormPartition";
import trimObject from "../lib/private/util/trimObject";
import { FormInterface } from "../lib/types/useFormTypes";
import { FormInput } from "./Form";
import PokerHand from "./PokerHand";
import useRenderCounter from "./util/useRenderCounter";

type Props = {
    form: FormInterface<FormInput>;
    favourites: FormInput['fav'];
};

function Favourites({ form, favourites }: Props) {
    const renderCount = useRenderCounter('favs');
    const { registerPartition, partition } = getFormPartition('fav', form);
    const { push, remove, replace } = arrayFunctions<FormInput>('pokerHands', partition);

    return (
        <div className="nested">
            <p>Your favourites are <span id="favourites-state">{JSON.stringify(trimObject(favourites))}</span>!</p>
            <div>
                <input type="text" {...registerPartition("fruit")} autoComplete="off" />
            </div>
            {favourites.pokerHands.map((hand, idx) => {
                return <PokerHand key={idx}
                    register={registerPartition}
                    {...{ hand, idx, remove }}
                />;
            })}
            <button type="button" data-cy="push-hand" onClick={() => push({a: "", b: ""})}>Add poker hand</button>
            <button type="button" data-cy="clear-hands" onClick={() => replace([])}>Clear</button>
            {renderCount}
        </div>
    );
}

export default memo(Favourites);