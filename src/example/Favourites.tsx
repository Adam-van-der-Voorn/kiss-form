import React, { memo } from "react";
import useRenderCounter from "./util/useRenderCounter";

type Props = {
    register: any;
    favourites: any;
};

function Favourites({ register, favourites }: Props) {
    const renderCount = useRenderCounter('favs');

    return (
        <div className="nested">
            <input type="text" {...register("fav.fruit")} autoComplete="off" />
            <p>Your favourites are <span id="favourites-state">{JSON.stringify(favourites)}</span>!</p>
            {renderCount}
        </div>
    );
}

export default memo(Favourites);