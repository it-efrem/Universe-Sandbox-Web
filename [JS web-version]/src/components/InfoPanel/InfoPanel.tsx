import React from "react";
import './InfoPanel.css';
import {store} from "../../store";

function InfoPanel() {
    const [lastFPS, setLastFPS] = React.useState(0);
    const [lastPPS, setLastPPS] = React.useState(0);
    const [objectsCount, setObjectsCount] = React.useState(0);
    const [mode, setMode] = React.useState('');

    React.useEffect(() => {

        const intervalId = setInterval(() => {
            setLastFPS(store.engine.lastFPS)
            setLastPPS(store.engine.lastPPS)
            setObjectsCount(store.drawObjects.length)
            setMode(store.canvas.mode)
        }, 333)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <div className="InfoPanel">
            <div>FPS: {lastFPS}</div>
            <div>PPS: {lastPPS}</div>
            <div>Objects count: {objectsCount}</div>

            <div onClick={() => {
                store.canvas.drawForceLines = !store.canvas.drawForceLines
            }}>
                <button>{store.canvas.drawForceLines ? 'hide lines' : 'show lines'}</button>
            </div>

            <div>Mode: {mode}</div>
            <div onClick={() => {
                store.canvas.mode = 'WATCH'
            }}>
                <button>WATCH</button>
            </div>
            <div onClick={() => {
                store.canvas.mode = 'ADDITIONAL'
            }}>
                <button>ADDITIONAL</button>
            </div>
        </div>
    );
}

export default InfoPanel;
