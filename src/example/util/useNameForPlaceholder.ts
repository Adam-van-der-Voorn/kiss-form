import { useEffect } from 'react';

export default function useNameForPlaceholder() {
    useEffect(() => {
        document.querySelectorAll('input').forEach(input => {
            const name = input.getAttribute('name');
            if (name) {
                input.setAttribute('placeholder', name);
            }
        });
    });
}