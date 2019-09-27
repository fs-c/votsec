import css from 'styled-jsx/css';

import { pageWidth } from './constants';

export default css.global`
    :root {
        --background: #ffffff;
        --foreground: #000000;

        --accent-1: #fafafa;
        --accent-2: #eaeaea;
        --accent-3: #999999;
        --accent-4: #888888;
        --accent-5: #666666;
        --accent-6: #444444;
        --accent-7: #333333;
        --accent-8: #111111;

        --success-light: #3291FF;
        --success: #0070F3;
        --success-dark: #0366D6;

        --error-light: #FF1A1A;
        --error: #EE0000;
        --error-dark: #CC0000;

        --warning-light: #F7B955;
        --warning: #F5A623;
        --warning-dark: #F49B0B;

        --secondary-light: var(--accents-3);
        --secondary: var(--accents-5);
        --secondary-dark: var(--accents-7);

        --alert: #FF0080;
        --purple: #F81CE5;
        --violet: #7928CA;
        --cyan: #79FFE1;
        --cyan-dark: #008B8B; 

        --hero: var(--cyan-dark);

        --page-width: ${pageWidth};

        --border-radius: 5px;
    }

    #root {
        min-height: 100vh;
        position: relative;
    
        color: var(--foreground);
        background-color: var(--background);
    }
`;
