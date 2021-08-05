#include "Struct.h"

Vector2 & Vector2::operator-()
{
	x = -x;
	y = -y;
	return *this;
}

Vector2& Vector2::operator += (const Vector2& vector)
{
	x += vector.x;
	y += vector.y;
	return *this;
}

Vector2& Vector2::operator -= (const Vector2& vector)
{
	x -= vector.x;
	y += vector.y;
	return *this;
}

Vector2& Vector2::operator * (const Vector2& vector)
{
	x *= vector.x;
	y *= vector.y;
	return *this;
}
