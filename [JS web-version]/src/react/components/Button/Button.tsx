import React, {ReactElement} from 'react';
import {StyledButton, StyledButtonIcon, StyledButtonText} from "./Button.styles";

interface ButtonProps {
    isActive?: boolean;
    icon?: ReactElement<any, any> | number | string;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({isActive, icon, onClick, children}) => {
    return (
        <StyledButton onClick={onClick}>
            {icon !== undefined &&
            <StyledButtonIcon isActive={isActive}>{icon}</StyledButtonIcon>}
            {children !== undefined && <StyledButtonText>{children}</StyledButtonText>}
        </StyledButton>
    )
};
