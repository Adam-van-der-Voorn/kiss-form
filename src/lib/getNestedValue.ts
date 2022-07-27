export default function getNestedValue<FormInput>(data: FormInput, key: string) {
    const keys = key.split('.');

    let subject: any = data;
    for (let i = 0; i < keys.length; i++) {
        subject = subject[keys[i]];
    }
    return subject;
}