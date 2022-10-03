import '../style.css';
import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import Form2 from './Form2';
import getJSONParam from '../util/getJSONParam';

const container = document.querySelector('#app');
const root = createRoot(container!);

root.render(
    <StrictMode>
        <Form2 initialData={getJSONParam('state')} />
    </StrictMode >
);