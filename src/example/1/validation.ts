import _ from 'lodash';
import { Flooded } from '../../lib/types/Flooded';
import { FormInput } from './Form1';

export default function validation(data: FormInput) {
    console.log('validating...', data);
    const errors: Partial<Flooded<FormInput, string>> = {};
    if (data.name == '') {
        errors.name = 'name is required';
    }
    
    const pokerHandErrMessage = 'Card must be a number followed by a suit, e.g K♥ (♦♠♣♥)';
    data.fav.pokerHands.forEach((hand, index) => {
        {
            const matches = hand.a.match(/^[2-9JQKA][♦♠♣♥]$/);
            if (matches == null || matches.length != 1) {
                _.set(errors, `fav.pokerHands.${index}.a`, pokerHandErrMessage);
            }
        }
        {
            const matches = hand.b.match(/^[2-9JQKA][♦♠♣♥]$/);
            if (matches == null || matches.length != 1) {
                _.set(errors, `fav.pokerHands.${index}.b`, pokerHandErrMessage);
            }
        }
    });

    return errors;
}