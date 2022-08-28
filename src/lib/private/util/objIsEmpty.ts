export default function objIsEmpty(obj: Record<string, unknown>) {
    return Object.keys(obj).length === 0;
}