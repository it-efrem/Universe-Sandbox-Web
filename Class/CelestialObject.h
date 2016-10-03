#ifndef CELESTIALOBJECT_H
#define CELESTIALOBJECT_H

#pragma once
#include "Struct.h"

class CelestialObject
{
    Vector2 position;
    Vector2 acceleration;
    Color color;
    int r, m;
public:
    CelestialObject() : position(Vector2(0, 0)), acceleration(Vector2(0, 0)), r(10), m(500), color(Color(0, 0, 0))
    {}

    CelestialObject(Vector2 _pos, Vector2 _vel, int _r, int _m, Color _color) : position(_pos), acceleration(_vel), r(_r), m(_m), color(_color)
    {}

    void Draw();

    void addedPosition(Vector2);
    void addedAcceleration(Vector2);
    void addRadius(float);
    void addMass(float);

    Vector2 getPosition();
    Vector2 getAcceleration();
    int getRadius();
    int getMass();
};


#endif // CELESTIALOBJECT_H
