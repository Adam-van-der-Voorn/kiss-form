import React from 'react';
import { Register } from '../../lib/types/useFormTypes';

type Props = {
    idx: number,
    item: string,
    quantity: string,
    register: Register
}

function ShoppingItem({ idx, item, quantity, register }: Props) {
    return (
        <div>
            <input type="text" value={item} {...register(`cart.items.${idx}.item`)} />
            <input type="number" value={quantity} {...register(`cart.items.${idx}.quantity`)} />
        </div>
    );
}

export default ShoppingItem;