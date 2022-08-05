import { Collection } from "../../types/Collection";

export default function getNestedValue(data: Collection, key: string) {
    const keys = key.split('.');

    let subject: any = data;
    for (let i = 0; i < keys.length; i++) {
        subject = subject[keys[i]];
    }
    return subject as unknown;
}