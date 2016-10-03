#pragma once
#include "CelestialObject.h"
#include <vector>

class Space
{
    std::vector<CelestialObject*> objectsArray;
	float ForceOfGravity(bool&, CelestialObject*, CelestialObject*);

public:
	Space()
	{}

    void add(CelestialObject);
	void accelerationObjects();
	void moveObjects();
	void DrawingAllObjects();
};