export default function objIsEmpty(obj: Record<string, any>) {
    return Object.keys(obj).length === 0;
}