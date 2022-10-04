import React, { memo, useContext } from 'react';
import useFormArray from '../../lib/useFormArray';
import { FormContext, FormInput } from './Form2';
import ShoppingItem from './ShoppingItem';

function Favourites() {
    const { state: { cart }, register, form } = useContext(FormContext);
    const { push, remove, replace, insert } = useFormArray<FormInput>('cart.items', form);

    return (
        <div className="nested">
            <div>
                <input type="number" value={cart.couponNo} {...register('cart.couponNo')} />
            </div>
            {cart.items.map(({ item, quantity }, idx) => (
                <ShoppingItem key={idx}
                    idx={idx}
                    item={item}
                    quantity={quantity}
                    register={register}
                />
            ))}
            <button type="button" data-cy="push-item" onClick={() => push({ item: '', quantity: '1' })}>Add item</button>
            <button type="button" data-cy="clear-items" onClick={() => replace([])}>Clear</button>
        </div>
    );
}

export default memo(Favourites);