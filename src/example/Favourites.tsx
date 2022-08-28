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
    const partition = getFormPartition('fav', form);
    const { push, remove, replace, insert } = arrayFunctions<FormInput>('pokerHands', partition);

    return (
        <div className="nested">
            <p>Your favourites are <span id="favourites-state">{JSON.stringify(trimObject(favourites))}</span>!</p>
            <div>
                <input type="text" value={favourites.fruit}{...partition.register("fruit")} autoComplete="off" />
            </div>
            {favourites.pokerHands.map((hand, idx) => {
                return <PokerHand key={idx}
                    register={partition.register}
                    {...{ hand, idx, remove, insert }}
                />;
            })}
            <button type="button" data-cy="push-hand" onClick={() => push({a: "", b: ""})}>Add poker hand</button>
            <button type="button" data-cy="clear-hands" onClick={() => replace([])}>Clear</button>
            {renderCount}
        </div>
    );
}

export default memo(Favourites);