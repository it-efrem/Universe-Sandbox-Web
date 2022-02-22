import * as Three from "three";
import { Store } from "../store";
import { moveByVector } from "../utils/physics";

export class Physics {
  private readonly store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  public tick() {
    const objects = this.store.objects.getObjects();
    // const gravityConst = this.store.universe.gravityConst;
    const gravityConst = 6.6743;
    // const targetTimeSpeed = this.store.settings.targetTimeSpeed;
    const targetTimeSpeed = 10;

    for (let a = 0; a < objects.length; a++) {
      const objectA = objects[a];

      for (let b = a + 1; b < objects.length; b++) {
        const objectB = objects[b];

        //todo: refactoring
        if (
          objectA.isGravity &&
          objectB.isGravity &&
          objectA.mass &&
          objectB.mass
        ) {
          const totalDistance = new Three.Vector3()
            .add(objectA.body.position)
            .sub(objectB.body.position)
            .length();

          const [a_x_vector, b_x_vector] = moveByVector(
            gravityConst,
            targetTimeSpeed,
            totalDistance,
            objectA.body.position.x,
            objectB.body.position.x,
            objectA.mass,
            objectB.mass
          );

          const [a_y_vector, b_y_vector] = moveByVector(
            gravityConst,
            targetTimeSpeed,
            totalDistance,
            objectA.body.position.y,
            objectB.body.position.y,
            objectA.mass,
            objectB.mass
          );

          const [a_z_vector, b_z_vector] = moveByVector(
            gravityConst,
            targetTimeSpeed,
            totalDistance,
            objectA.body.position.z,
            objectB.body.position.z,
            objectA.mass,
            objectB.mass
          );

          objectA.moveVector.x += a_x_vector;
          objectA.moveVector.y += a_y_vector;
          objectA.moveVector.z += a_z_vector;

          objectB.moveVector.x += b_x_vector;
          objectB.moveVector.y += b_y_vector;
          objectB.moveVector.z += b_z_vector;

          // const isCollision =
          //   this.store.settings.isCollide &&
          //   detectUniverseCollision(
          //     totalDistance,
          //     objectA.radius.atmosphere,
          //     objectB.radius.atmosphere
          //   );
          //
          // if (isCollision) {
          //   const [bigObject, smallObject] =
          //     objectA.mass > objectB.mass
          //       ? [objectA, objectB]
          //       : [objectB, objectA];
          //
          //   bigObject.mergeWith(smallObject);
          //   smallObject.remove();
          // }
        }
      }
    }

    objects.forEach((object) => {
      object.body.position.x += object.moveVector.x * targetTimeSpeed;
      object.body.position.y += object.moveVector.y * targetTimeSpeed;
      object.body.position.z += object.moveVector.z * targetTimeSpeed;
    });
  }
}
