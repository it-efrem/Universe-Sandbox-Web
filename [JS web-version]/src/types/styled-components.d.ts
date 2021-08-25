import styled from 'styled-components';

declare module 'styled-components' {
    export type StyledComponents = Parameters<typeof styled>[0];
}
