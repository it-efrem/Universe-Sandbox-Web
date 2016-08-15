/*
Радиус объекта не рекомендуется ставить меньше 20, иначе возможны проскоки на высоких скоростях
Массу объекта лучше не привышать 99999
*/

#include "stdafx.h"
#include <iostream>
#include <gl\glut.h>
#include <math.h>
#include <ctime>
#include <vector>

int width = 1300;
int height = 700;

float thousandsKilometersPixel = 1;

void Start()
{
	glClearColor(1, 1, 1, 1);
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluOrtho2D(-width * thousandsKilometersPixel, width * thousandsKilometersPixel, -height * thousandsKilometersPixel, height * thousandsKilometersPixel);
	glMatrixMode(GL_MODELVIEW);
}

struct Vector2
{
	float x, y;
	Vector2(float _x, float _y) : x(_x), y(_y)
	{}

	//Профиксить перегрузку
	Vector2 operator+= (Vector2& vector2)
	{
		return Vector2(x + vector2.x, y + vector2.y);
	}
};

/*Vector2 Vector2::operator+= (Vector2 &vector1, const Vector2 &vector2)
{
return Vector2(vector1.x + vector2.x, vector2.y + vector2.y);
}*/

struct Color
{
	float r, g, b;
	Color(int _r, int _g, int _b) : r(_r / 255), g(_g / 255), b(_b / 255)
	{}
};

class СelestialObject
{
	Vector2 position;
	Color color;
	int r, m;
public:
	Vector2 acceleration;
	bool enable;

	СelestialObject() : enable(true), position(Vector2(0, 0)), acceleration(Vector2(0, 0)), r(10), m(500), color(Color(0, 0, 0))
	{}

	СelestialObject(Vector2 _pos, Vector2 _vel, int _r, int _m, Color _color) : enable(true), position(_pos), acceleration(_vel), r(_r), m(_m), color(_color)
	{}

	void Draw()
	{
		glColor3f(color.r, color.g, color.b);
		glBegin(GL_QUADS);
		glVertex2i(position.x + r / 2, position.y - r / 2);
		glVertex2i(position.x + r / 2, position.y + r / 2);
		glVertex2i(position.x - r / 2, position.y + r / 2);
		glVertex2i(position.x - r / 2, position.y - r / 2);
		glEnd();
	}

	Vector2 getPosition()
	{
		return position;
	}

	void addedPosition(Vector2 vector)
	{
		position.x += vector.x;
		position.y += vector.y;
	}

	int getRadius()
	{
		return r;
	}

	void addRadius(float r)
	{
		this->r += r;
	}

	int getMass()
	{
		return m;
	}

	void addMass(int m)
	{
		this->m += m;
	}
};

class Space
{
	std::vector<СelestialObject*> objectsArray;
	float ForceOfGravity(bool &collision, float x1, float x2, float y1, float y2, int r1, int r2, int m1, int m2)
	{
		float a = 0, b = 0;

		if (x1 > x2)
			a = x1 - x2;
		if (x1 < x2)
			a = x2 - x1;
		if (y1 > y2)
			b = y1 - y2;
		if (y1 < y2)
			b = y2 - y1;

		float r = (a + b);

		//Если произошло столкновение
		if (r <= (r1 + r2)/1.5f)
		{
			collision = true;
			return 0.001f;
		}

		return ((6.67408f * (m1*m2 / pow(r,2))) / 6674081);
	}
public:
	Space()
	{}

	void add(СelestialObject object)
	{
		objectsArray.push_back(new СelestialObject(object));
	}

	void accelerationObjects()
	{
		bool collision = false;

		for (int i = 0; i < (int)objectsArray.size(); i++)
		{
			for (int j = 0; j < (int)objectsArray.size() && (i != j); j++)
			{
				float fG = ForceOfGravity(collision, objectsArray.at(i)->getPosition().x, objectsArray.at(j)->getPosition().x, objectsArray.at(i)->getPosition().y, objectsArray.at(j)->getPosition().y, objectsArray.at(i)->getRadius(), objectsArray.at(j)->getRadius(), objectsArray.at(i)->getMass(), objectsArray.at(j)->getMass());

				float massJtoI = ((float)objectsArray.at(j)->getMass() / objectsArray.at(i)->getMass());
				float massItoJ = ((float)objectsArray.at(i)->getMass() / objectsArray.at(j)->getMass());

				float fGmassJtoI = fG * massJtoI * 2;
				float fGmassItoJ = fG * massItoJ * 2;

				//Если произошло столкновение
				if (collision)
				{
					if (objectsArray.at(j)->getMass() > objectsArray.at(i)->getMass())
					{
						objectsArray.at(j)->acceleration.x += objectsArray.at(i)->acceleration.x * massItoJ;
						objectsArray.at(j)->acceleration.y += objectsArray.at(i)->acceleration.y * massItoJ;

						//Изменение большего объета
						objectsArray.at(j)->addMass(objectsArray.at(i)->getMass() * 0.9f);
						objectsArray.at(j)->addRadius(objectsArray.at(i)->getRadius() * massItoJ);
						//Уничтожение меньшего
						objectsArray.erase(objectsArray.begin() + i);

						//Исключение попытки просчета для удаленного объекта
						if (i = (int)objectsArray.size())
							break;
					}
					else
					{
						objectsArray.at(i)->acceleration.x += objectsArray.at(j)->acceleration.x * massJtoI;
						objectsArray.at(i)->acceleration.y += objectsArray.at(j)->acceleration.y * massJtoI;

						//Изменение большего объета
						objectsArray.at(i)->addMass(objectsArray.at(j)->getMass() * 0.9f);
						objectsArray.at(i)->addRadius(objectsArray.at(j)->getRadius() * massJtoI);
						//Уничтожение меньшего
						objectsArray.erase(objectsArray.begin() + j);

						//Исключение попытки просчета для удаленного объекта
						if (i = (int)objectsArray.size())
							break;
					}
				}
				if (!collision)
				{
					//Добавление ускорения
					if (objectsArray.at(i)->getPosition().x > objectsArray.at(j)->getPosition().x)
					{
						objectsArray.at(i)->acceleration.x -= fGmassJtoI;
						objectsArray.at(j)->acceleration.x += fGmassItoJ;
					}
					if (objectsArray.at(i)->getPosition().x < objectsArray.at(j)->getPosition().x)
					{
						objectsArray.at(i)->acceleration.x += fGmassJtoI;
						objectsArray.at(j)->acceleration.x -= fGmassItoJ;
					}
					if (objectsArray.at(i)->getPosition().y > objectsArray.at(j)->getPosition().y)
					{
						objectsArray.at(i)->acceleration.y -= fGmassJtoI;
						objectsArray.at(j)->acceleration.y += fGmassItoJ;
					}
					if (objectsArray.at(i)->getPosition().y < objectsArray.at(j)->getPosition().y)
					{
						objectsArray.at(i)->acceleration.y += fGmassJtoI;
						objectsArray.at(j)->acceleration.y -= fGmassItoJ;
					}
				}
			}
		}
	}

	void moveObjects()
	{
		for (int i = 0; i < (int)objectsArray.size() && objectsArray.at(i)->enable; i++)
			objectsArray.at(i)->addedPosition(objectsArray.at(i)->acceleration);
	}

	void DrawingAllObjects()
	{
		for (int i = 0; i < (int)objectsArray.size() /*&& objectsArray.at(i)->enable*/; i++)
		{
			objectsArray.at(i)->Draw();
		}
	}
};

Space gravity;

void Draw()
{
	glClear(GL_COLOR_BUFFER_BIT);

	gravity.DrawingAllObjects();

	glutSwapBuffers();
}

void Update(int)
{
	glutPostRedisplay();
	glutTimerFunc(1, Update, 0);

	gravity.accelerationObjects();
	gravity.moveObjects();
}

int main(int argc, char * argv[])
{
	//Добавление объектов
	gravity.add(СelestialObject(Vector2(0, -100), Vector2(-0.1f, 0), 15, 1000, Color(0, 0, 0)));
	gravity.add(СelestialObject(Vector2(-200, 100), Vector2(0.1f, 0), 15, 1000, Color(0, 0, 0)));

	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA | GLUT_STENCIL);

	glutInitWindowSize(width, height);
	glutInitWindowPosition(50, 0);
	glutCreateWindow("Gravity");
	Start();

	glutDisplayFunc(Draw);
	glutTimerFunc(1, Update, 0);

	glutMainLoop();

	return 0;
}

