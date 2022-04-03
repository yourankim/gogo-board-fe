// https://styled-components.com/docs/api#typescript

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      primary: string;
      secondary: string;
      warn: string;
      [index: string]: string;
    };
  }
}
