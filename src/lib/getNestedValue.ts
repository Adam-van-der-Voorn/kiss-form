export default function getNestedValue(data: Record<string, any>, key: string) {
    const keys = key.split('.');

    let subject = data;
    for (let i = 0; i < keys.length; i++) {
        subject = subject[keys[i]];
    }
    return subject;
}