import '../style.css';
import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import Form1 from './Form1';
import getJSONParam from '../util/getJSONParam';

const container = document.querySelector('#app');
const root = createRoot(container!);

root.render(
    <StrictMode>
        <Form1 initialData={getJSONParam('state')} />
    </StrictMode >
);