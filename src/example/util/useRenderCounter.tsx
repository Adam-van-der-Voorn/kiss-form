import React, { useRef } from "react";

export default function useRenderCounter(name: string) {
    const count = useRef(0);
    count.current ++
    return <div>Rendered <span className="render-count" id={name}>{count.current}</span> times</div>
}