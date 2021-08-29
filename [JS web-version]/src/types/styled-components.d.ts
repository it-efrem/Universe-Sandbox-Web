import styled from 'styled-components';

declare module 'styled-components' {
    export type StyledComponents = Parameters<typeof styled>[0];
}

declare module '*.ttf';
declare module '*.eot';
declare module '*.woff';
declare module '*.woff2';
