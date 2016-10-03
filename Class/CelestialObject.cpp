#include "CelestialObject.h"
#include "glut.h"

void CelestialObject::Draw()
{
    glColor3f(color.r, color.g, color.b);
    glBegin(GL_QUADS);
    glVertex2i(position.x + r / 2, position.y - r / 2);
    glVertex2i(position.x + r / 2, position.y + r / 2);
    glVertex2i(position.x - r / 2, position.y + r / 2);
    glVertex2i(position.x - r / 2, position.y - r / 2);
    glEnd();
}

void CelestialObject::addedPosition(Vector2 vector)
{
    position += vector;
}

void CelestialObject::addedAcceleration(Vector2 vector)
{
    acceleration += vector;
}

void CelestialObject::addRadius(float _r)
{
    r += _r;
}

void CelestialObject::addMass(float _m)
{
    m += _m;
}

Vector2 CelestialObject::getPosition()
{
    return position;
}

Vector2 CelestialObject::getAcceleration()
{
    return acceleration;
}

int CelestialObject::getRadius()
{
    return r;
}

int CelestialObject::getMass()
{
    return m;
}
