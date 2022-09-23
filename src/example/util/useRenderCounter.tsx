import React, { useRef } from 'react';

type Opts = {
    inline: boolean;
}

export default function useRenderCounter(name: string, opts?: Opts) {
    const count = useRef(0);
    count.current ++;
    if (opts && opts.inline) {
        return <span>render: <span className="render-count" id={name}>{count.current}</span></span>;
    }
    return <div>Rendered <span className="render-count" id={name}>{count.current}</span> times</div>;
}