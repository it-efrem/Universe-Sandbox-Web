import React from "react";
import {useObjectMenu} from "./ObjectMenu.hook";
import "./ObjectMenu.css";
import {InputNumber} from "../InputNumber/InputNumber";

export const ObjectMenu = () => {
    const {isVisible, objectInfo, handleClickCloseMenu, handleChangeObjectMass} = useObjectMenu();

    return React.useMemo(() => {
        if (!isVisible || !objectInfo) {
            return null;
        }

        return (
            <div className="ObjectMenu_wrapper">
                <div className="ObjectMenu_container">
                    <div className="ObjectMenu_top">
                        <div>{objectInfo.id}</div>
                        <div className="ObjectMenu_close"
                             onClick={handleClickCloseMenu}>
                            <i className="fas fa-times-circle"/>
                        </div>
                    </div>
                    <div className="ObjectMenu_row">
                        <div className="ObjectMenu_label ObjectMenu_label-mass"><i className="fas fa-weight-hanging"/></div>
                        <div className="ObjectMenu_value">
                            <InputNumber value={objectInfo.mass}
                                         onChange={handleChangeObjectMass}/>
                        </div>
                    </div>
                    <div className="ObjectMenu_row">
                        <div className="ObjectMenu_label"><i className="fas fa-circle-notch"/></div>
                        <div className="ObjectMenu_value">{objectInfo.radius}</div>
                    </div>
                    <div className="ObjectMenu_row">
                        <div className="ObjectMenu_label"><i className="fas fa-tachometer-alt"/></div>
                        <div className="ObjectMenu_value">{objectInfo.speed}</div>
                    </div>
                    <div className="ObjectMenu_row">
                        <div className="ObjectMenu_label">
                            <i className="fas fa-map-marked-alt"/>
                            Coordinates
                        </div>
                    </div>
                    <div className="ObjectMenu_row">
                        <div className="ObjectMenu_label">x</div>
                        <div className="ObjectMenu_value">{objectInfo.x}</div>
                    </div>
                    <div className="ObjectMenu_row">
                        <div className="ObjectMenu_label">y</div>
                        <div className="ObjectMenu_value">{objectInfo.y}</div>
                    </div>
                </div>
            </div>
        )
    }, [isVisible, objectInfo]);
}
