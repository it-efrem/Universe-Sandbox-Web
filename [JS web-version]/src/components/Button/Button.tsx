import React, {ReactElement} from 'react';
import cn from "classnames";
import "./Button.css";

interface ButtonProps {
    isActive?: boolean;
    icon?: ReactElement<any, any> | number | string;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({isActive, icon, onClick, children}) => {
    return (
        <div className="Button" onClick={onClick}>
            {icon !== undefined &&
            <div className={cn("Button_icon", {
                "Button_active": isActive,
            })}>{icon}</div>}
            {children !== undefined && <div className="Button_text">{children}</div>}
        </div>
    )
};
