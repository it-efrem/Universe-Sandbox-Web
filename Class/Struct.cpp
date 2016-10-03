#include "Struct.h"

Vector2& Vector2::operator += (const Vector2& vector)
{
	this->x += vector.x;
	this->y += vector.y;
	return *this;
}

Vector2& Vector2::operator -= (const Vector2& vector)
{
	x -= vector.x;
	y += vector.y;
	return *this;
}