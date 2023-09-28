import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

function TypedText() {
    const el = useRef(null);

    useEffect(() => {
        const options = {
            strings: [
                'Take back your time <br/> with Tangerine.',
                'Automate tedious tasks,<br/> liberate your team,<br/> and fuel operational efficiency.',
            ],
            typeSpeed: 50,
            backSpeed: 15,
            backDelay: 1000,
            startDelay: 500,
            loop: true,
        };

        const typed = new Typed(el.current, options);

        return () => {
            typed.destroy();
        };
    }, []);

    return <span ref={el}></span>;
}

export default TypedText;