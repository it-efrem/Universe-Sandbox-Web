import {getRandom} from "../../utils/other";
import {GravityObjectCoreFormType} from "./GravityObject.types";

export const createRandomObject = () => {
    const initialCircle: GravityObjectCoreFormType = [
        [0, 0.5, 0, 0.22, 0.22, 0, 0.5, 0],
        [0.5, 0, 0.78, 0, 1, 0.22, 1, 0.5],
        [1, 0.5, 1, 0.78, 0.78, 1, 0.5, 1],
        [0.5, 1, 0.22, 1, 0, 0.78, 0, 0.5],
    ];

    return initialCircle.map(row => row.map((val, idx) => {
            if (idx < 2 || idx > 5) {
                return val
            }

            return val + getRandom(-0.1, 0.1)

        })
    ) as GravityObjectCoreFormType
}
