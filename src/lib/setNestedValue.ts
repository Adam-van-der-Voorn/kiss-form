export default function setNestedValue<FormInput>(data: FormInput, key: string, value: any): void {
    const keys = key.split('.');
    const finalKey = keys[keys.length - 1];

    let subject: any = data;
    for (let i = 0; i < keys.length - 1; i++) {
        subject = subject[keys[i]];
    }
    subject[finalKey] = value;
}