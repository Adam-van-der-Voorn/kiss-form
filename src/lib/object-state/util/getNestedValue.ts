import { Nested } from '../types/Nested';

export default function getNestedValue<T>(data: T, key: string) {
    if (key == '') {
        return data as Nested<T>;
    }
    const keys = key.split('.');

    let subject: any = data;
    for (let i = 0; i < keys.length; i++) {
        subject = subject[keys[i]];
        if (subject == undefined) {
            return undefined;
        }
    }

    return subject as Nested<T> | undefined;
}