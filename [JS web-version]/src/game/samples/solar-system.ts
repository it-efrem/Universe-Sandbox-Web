import {GravityObject} from "../gravityObject/GravityObject";
import {GravityObjectComposition} from "../gravityObject/GravityObject.types";

export const SolarSystemSample = {
    'Sun': new GravityObject({
        coordinates: {
            x: 0,
            y: 0,
        },
        vectorMove: {
            x: 0,
            y: 0,
        },
        composition: {
            [GravityObjectComposition.HYDROGEN]: 2190000000,
            [GravityObjectComposition.IRON]: 7000000,
            [GravityObjectComposition.WATER]: 400000,
            [GravityObjectComposition.SILICATES]: 4000,
        },
        coreForm: [
            [0, 0.5, 0.0074, 0.1334144980975718, 0.1836018940949956, -0.003414005423899663, 0.5, 0],
            [0.5, 0, 0.76, 0.057751056329688855, 0.9792271080736776, 0.20371166658036471, 1, 0.5],
            [1, 0.5, 0.90, 0.8462534407025388, 0.7864295848560977, 1.0231384695889916, 0.5, 1],
            [0.5, 1, 0.27, 0.9344921699998242, -0.07970099568524663, 0.819831340978712, 0, 0.5]
        ],
        rotationVector: 1,
        rotationCurrent: 0,
        isSimulated: true
    }),
    'Mercury': new GravityObject({
        coordinates: {
            // x: -46000000,
            // y: 0,
            x: -6396786.480321877,
            y: 50122575.568949334,
        },
        vectorMove: {
            // x: 0,
            // y: 61.5,
            x: 54.28992386328245,
            y: 16.8827150119237,
        },
        composition: {
            [GravityObjectComposition.HYDROGEN]: 1,
            [GravityObjectComposition.IRON]: 300,
            [GravityObjectComposition.WATER]: 1,
            [GravityObjectComposition.SILICATES]: 28,
        },
        coreForm: [
            [0, 0.5, 0.0074, 0.1334144980975718, 0.1836018940949956, -0.003414005423899663, 0.5, 0],
            [0.5, 0, 0.76, 0.057751056329688855, 0.9792271080736776, 0.20371166658036471, 1, 0.5],
            [1, 0.5, 0.90, 0.8462534407025388, 0.7864295848560977, 1.0231384695889916, 0.5, 1],
            [0.5, 1, 0.27, 0.9344921699998242, -0.07970099568524663, 0.819831340978712, 0, 0.5]
        ],
        rotationVector: 1,
        rotationCurrent: 0,
        isSimulated: true
    }),
    'Venus': new GravityObject({
        coordinates: {
            // x: -107476259,
            // y: 0,
            x: 29497132.358817127,
            y: -103290774.66312583,
        },
        vectorMove: {
            // x: 0,
            // y: 36.8,
            x: -35.26785336704689,
            y: -10.528069171451273,
        },
        composition: {
            [GravityObjectComposition.HYDROGEN]: 1138,
            [GravityObjectComposition.WATER]: 1,
            [GravityObjectComposition.SILICATES]: 1540,
            [GravityObjectComposition.IRON]: 2690,
        },
        coreForm: [
            [0, 0.5, 0.0074, 0.1334144980975718, 0.1836018940949956, -0.003414005423899663, 0.5, 0],
            [0.5, 0, 0.76, 0.057751056329688855, 0.9792271080736776, 0.20371166658036471, 1, 0.5],
            [1, 0.5, 0.90, 0.8462534407025388, 0.7864295848560977, 1.0231384695889916, 0.5, 1],
            [0.5, 1, 0.27, 0.9344921699998242, -0.07970099568524663, 0.819831340978712, 0, 0.5]
        ],
        rotationVector: 1,
        rotationCurrent: 0,
        isSimulated: true
    }),
    'Earth': new GravityObject({
        coordinates: {
            x: -147098290,
            y: 0,
        },
        vectorMove: {
            x: 0,
            y: 31.7,
        },
        composition: {
            [GravityObjectComposition.HYDROGEN]: 1000,
            [GravityObjectComposition.WATER]: 400,
            [GravityObjectComposition.SILICATES]: 1900,
            [GravityObjectComposition.IRON]: 3300,
        },
        coreForm: [
            [0, 0.5, 0.0074, 0.1334144980975718, 0.1836018940949956, -0.003414005423899663, 0.5, 0],
            [0.5, 0, 0.76, 0.057751056329688855, 0.9792271080736776, 0.20371166658036471, 1, 0.5],
            [1, 0.5, 0.90, 0.8462534407025388, 0.7864295848560977, 1.0231384695889916, 0.5, 1],
            [0.5, 1, 0.27, 0.9344921699998242, -0.07970099568524663, 0.819831340978712, 0, 0.5]
        ],
        rotationVector: 1,
        rotationCurrent: 0,
        isSimulated: true
    }),
    'Moon': new GravityObject({
        coordinates: {
            x: -147504290,
            y: 0,
        },
        vectorMove: {
            x: 0,
            y: 32.72,
        },
        composition: {
            [GravityObjectComposition.HYDROGEN]: 0.6,
            [GravityObjectComposition.WATER]: 0.6,
            [GravityObjectComposition.SILICATES]: 50,
            [GravityObjectComposition.IRON]: 30,
        },
        coreForm: [
            [0, 0.5, -0.04, 0.30822663293720176, 0.22379906173795241, -0.08517939087081042, 0.5, 0],
            [0.5, 0, 0.85, -0.05128102798883854, 0.9008649790048294, 0.13200509519353526, 1, 0.5],
            [1, 0.5, 1.09, 0.8492906411283264, 0.6863508784941157, 0.9785806585121479, 0.5, 1],
            [0.5, 1, 0.15, 1.0355947249254778, 0.0027087956008774172, 0.7015958406554407, 0, 0.5]
        ],
        rotationVector: 1,
        rotationCurrent: 0,
        isSimulated: true
    }),
    'Mars': new GravityObject({
        coordinates: {
            x: -206655000,
            y: 0,
        },
        vectorMove: {
            x: 0,
            y: 27.7,
        },
        composition: {
            [GravityObjectComposition.HYDROGEN]: 100,
            [GravityObjectComposition.WATER]: 40,
            [GravityObjectComposition.SILICATES]: 190,
            [GravityObjectComposition.IRON]: 330,
        },
        coreForm: [
            [0, 0.5, 0.0074, 0.1334144980975718, 0.1836018940949956, -0.003414005423899663, 0.5, 0],
            [0.5, 0, 0.76, 0.057751056329688855, 0.9792271080736776, 0.20371166658036471, 1, 0.5],
            [1, 0.5, 0.90, 0.8462534407025388, 0.7864295848560977, 1.0231384695889916, 0.5, 1],
            [0.5, 1, 0.27, 0.9344921699998242, -0.07970099568524663, 0.819831340978712, 0, 0.5]
        ],
        rotationVector: 1,
        rotationCurrent: 0,
        isSimulated: true
    }),
    'Jupiter': new GravityObject({
        coordinates: {
            x: -740573600,
            y: 0,
        },
        vectorMove: {
            x: 0,
            y: 14.25,
        },
        composition: {
            [GravityObjectComposition.HYDROGEN]: 2000000,
            [GravityObjectComposition.WATER]: 2000,
            [GravityObjectComposition.SILICATES]: 1,
            [GravityObjectComposition.IRON]: 90000,
        },
        coreForm: [
            [0, 0.5, 0.0074, 0.1334144980975718, 0.1836018940949956, -0.003414005423899663, 0.5, 0],
            [0.5, 0, 0.76, 0.057751056329688855, 0.9792271080736776, 0.20371166658036471, 1, 0.5],
            [1, 0.5, 0.90, 0.8462534407025388, 0.7864295848560977, 1.0231384695889916, 0.5, 1],
            [0.5, 1, 0.27, 0.9344921699998242, -0.07970099568524663, 0.819831340978712, 0, 0.5]
        ],
        rotationVector: 1,
        rotationCurrent: 0,
        isSimulated: true
    }),
    'Saturn': new GravityObject({
        coordinates: {
            x: -1353572956,
            y: 0,
        },
        vectorMove: {
            x: 0,
            y: 10.6,
        },
        composition: {
            [GravityObjectComposition.HYDROGEN]: 650000,
            [GravityObjectComposition.WATER]: 650,
            [GravityObjectComposition.SILICATES]: 1,
            [GravityObjectComposition.IRON]: 30000,
        },
        coreForm: [
            [0, 0.5, 0.0074, 0.1334144980975718, 0.1836018940949956, -0.003414005423899663, 0.5, 0],
            [0.5, 0, 0.76, 0.057751056329688855, 0.9792271080736776, 0.20371166658036471, 1, 0.5],
            [1, 0.5, 0.90, 0.8462534407025388, 0.7864295848560977, 1.0231384695889916, 0.5, 1],
            [0.5, 1, 0.27, 0.9344921699998242, -0.07970099568524663, 0.819831340978712, 0, 0.5]
        ],
        rotationVector: 1,
        rotationCurrent: 0,
        isSimulated: true
    }),
    'Uranus': new GravityObject({
        coordinates: {
            x: -2748938461,
            y: 0,
        },
        vectorMove: {
            x: 0,
            y: 7.45,
        },
        composition: {
            [GravityObjectComposition.HYDROGEN]: 90000,
            [GravityObjectComposition.WATER]: 5000,
            [GravityObjectComposition.SILICATES]: 1,
            [GravityObjectComposition.IRON]: 700,
        },
        coreForm: [
            [0, 0.5, 0.0074, 0.1334144980975718, 0.1836018940949956, -0.003414005423899663, 0.5, 0],
            [0.5, 0, 0.76, 0.057751056329688855, 0.9792271080736776, 0.20371166658036471, 1, 0.5],
            [1, 0.5, 0.90, 0.8462534407025388, 0.7864295848560977, 1.0231384695889916, 0.5, 1],
            [0.5, 1, 0.27, 0.9344921699998242, -0.07970099568524663, 0.819831340978712, 0, 0.5]
        ],
        rotationVector: 1,
        rotationCurrent: 0,
        isSimulated: true
    }),
    'Neptune': new GravityObject({
        coordinates: {
            x: -4452940833,
            y: 0,
        },
        vectorMove: {
            x: 0,
            y: 5.8,
        },
        composition: {
            [GravityObjectComposition.HYDROGEN]: 100000,
            [GravityObjectComposition.WATER]: 10000,
            [GravityObjectComposition.SILICATES]: 1,
            [GravityObjectComposition.IRON]: 3000,
        },
        coreForm: [
            [0, 0.5, 0.0074, 0.1334144980975718, 0.1836018940949956, -0.003414005423899663, 0.5, 0],
            [0.5, 0, 0.76, 0.057751056329688855, 0.9792271080736776, 0.20371166658036471, 1, 0.5],
            [1, 0.5, 0.90, 0.8462534407025388, 0.7864295848560977, 1.0231384695889916, 0.5, 1],
            [0.5, 1, 0.27, 0.9344921699998242, -0.07970099568524663, 0.819831340978712, 0, 0.5]
        ],
        rotationVector: 1,
        rotationCurrent: 0,
        isSimulated: true
    }),
    'Pluto': new GravityObject({
        coordinates: {
            x: 7376670969,
            y: 0,
        },
        vectorMove: {
            x: 0,
            y: -3.85,
        },
        composition: {
            [GravityObjectComposition.HYDROGEN]: 0,
            [GravityObjectComposition.WATER]: 1,
            [GravityObjectComposition.SILICATES]: 7,
            [GravityObjectComposition.IRON]: 6.6,
        },
        coreForm: [
            [0, 0.5, 0.0074, 0.1334144980975718, 0.1836018940949956, -0.003414005423899663, 0.5, 0],
            [0.5, 0, 0.76, 0.057751056329688855, 0.9792271080736776, 0.20371166658036471, 1, 0.5],
            [1, 0.5, 0.90, 0.8462534407025388, 0.7864295848560977, 1.0231384695889916, 0.5, 1],
            [0.5, 1, 0.27, 0.9344921699998242, -0.07970099568524663, 0.819831340978712, 0, 0.5]
        ],
        rotationVector: 1,
        rotationCurrent: 0,
        isSimulated: true
    }),
};
