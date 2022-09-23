import { Nested } from '../types/Nested';

export default function getNestedValue<T>(data: T, key: string) {
    const keys = key.split('.');

    let subject: any = data;
    for (let i = 0; i < keys.length; i++) {
        subject = subject[keys[i]];
    }

    return subject as Nested<T> | undefined;
}