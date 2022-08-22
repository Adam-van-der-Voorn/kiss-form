import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import Form from "./Form";

const container = document.querySelector('#app');
const root = createRoot(container!);

const urlParams = new URLSearchParams(window.location.search);

const initialDataJSON = urlParams.get("state");

const initialData = initialDataJSON != null
    ? JSON.parse(decodeURIComponent(initialDataJSON))
    : undefined

root.render(
    <StrictMode>
        <Form initialData={initialData} />
    </StrictMode >
);