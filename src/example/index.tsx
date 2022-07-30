import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import Form from "./Form";

const container = document.querySelector('#app');
const root = createRoot(container!);
root.render(
    <StrictMode>
        <Form />
    </StrictMode >
);