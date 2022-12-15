import React, { useRef, useState } from 'react';

type Props = {
    name: string
    children: React.ReactNode
}

export default function Toggle({name, children}: Props) {
    const [visible, setVisible] = useState(false);

    const display = visible ? 'block' : 'none';

    return (
        <div>
            <button type="button" onClick={() => setVisible(prev => !prev)}>
                {(visible ? 'Hide' : 'Show')} {name}
            </button>
            <div style={{ display }}>
                {children}
            </div>
        </div>
    )
}