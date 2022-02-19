import * as Three from "three";

export type SpaceSphereTexturesType = {
  map: string;
  bumpMap?: string;
  specularMap?: string;
};

export class SpaceSphereTextures {
  public map: Three.Texture;
  public bumpMap?: Three.Texture;
  public specularMap?: Three.Texture;

  constructor({ map, bumpMap, specularMap }: SpaceSphereTexturesType) {
    this.map = new Three.TextureLoader().load(map);

    if (bumpMap) {
      this.bumpMap = new Three.TextureLoader().load(bumpMap);
    }
    if (specularMap) {
      this.specularMap = new Three.TextureLoader().load(specularMap);
    }
  }
}

export type SpaceSphereType = {
  radius: number;
  rotationSpeed?: number;
  textures: SpaceSphereTextures;
};

export class SpaceSphere {
  public geometry: Three.SphereGeometry;
  public material: Three.MeshPhongMaterial;
  public textures: SpaceSphereTextures;
  public mesh: Three.Mesh;

  public rotationSpeed?: number;

  constructor({ radius, rotationSpeed, textures }: SpaceSphereType) {
    this.geometry = new Three.SphereGeometry(radius, 50, 50);
    this.textures = textures;
    this.material = new Three.MeshPhongMaterial();
    this.material.map = this.textures.map;
    this.rotationSpeed = rotationSpeed;

    if (this.textures.bumpMap) {
      this.material.bumpMap = this.textures.bumpMap;
    }
    if (this.textures.specularMap) {
      this.material.specularMap = this.textures.specularMap;
      this.material.specular = new Three.Color("grey");
    }

    this.mesh = new Three.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
  }
}
