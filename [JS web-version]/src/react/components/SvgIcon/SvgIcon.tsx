import styled from "styled-components";

interface StyledIconProps {
    src: string;
}

export const StyledIcon = styled.div<StyledIconProps>`
    background: ${({src}) => `url(${src})`} center no-repeat;
    display: inline-block;
    background-size: contain;
    width: 16px;
    height: 18px;
`;
