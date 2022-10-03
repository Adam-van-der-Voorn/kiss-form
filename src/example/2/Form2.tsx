import React from 'react';

type Props = {
    initialData?: unknown;
}

export default function Form2({initialData}: Props) {
    return <pre>2nd form placeholder. {JSON.stringify(initialData)}</pre>;
}