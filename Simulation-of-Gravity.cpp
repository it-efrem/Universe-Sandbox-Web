/*
Recommendation:
Radius of objects set don't less 20
Mass of objects don't more 99999
*/

#include "stdafx.h"
#include <iostream>
#include <gl\glut.h>
#include <windows.h>
#include <math.h>
#include <ctime>
#include <vector>

int width = 1300;
int height = 700;

//Scale for camera
float thousandsKilometersPixel = 2.5f;

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

	Vector2& operator += (Vector2 &vector)
	{
		this->x += vector.x;
		this->y += vector.y;
		return *this;
	}

	Vector2& operator -= (Vector2 &vector)
	{
		this->x -= vector.x;
		this->y += vector.y;
		return *this;
	}
};

struct Color
{
	float r, g, b;
	Color(int _r, int _g, int _b) : r(_r / 255), g(_g / 255), b(_b / 255)
	{}
};

class СelestialObject
{
	Vector2 position;
	Vector2 acceleration;
	Color color;
	int r, m;
public:
	СelestialObject() : position(Vector2(0, 0)), acceleration(Vector2(0, 0)), r(10), m(500), color(Color(0, 0, 0))
	{}

	СelestialObject(Vector2 _pos, Vector2 _vel, int _r, int _m, Color _color) : position(_pos), acceleration(_vel), r(_r), m(_m), color(_color)
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
		return this->position;
	}

	void addedPosition(Vector2 &vector)
	{
		this->position += vector;
	}

	Vector2 getAcceleration()
	{
		return this->acceleration;
	}

	void addedAcceleration(Vector2 &vector)
	{
		this->acceleration += vector;
	}

	int getRadius()
	{
		return this->r;
	}

	void addRadius(float r)
	{
		this->r += r;
	}

	int getMass()
	{
		return this->m;
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

		//Clashed?
		if (r <= (r1 + r2) / 1.5f)
		{
			collision = true;
			return 0.001f;
		}
		return (m1*m2 / pow(r, 2)) / 500000;
	}
public:
	Space()
	{}

	void add(СelestialObject &object)
	{
		objectsArray.push_back(new СelestialObject(object));
	}

	void accelerationObjects()
	{
		bool collision = false;
		int countPlanets = (int)objectsArray.size();
		int *cP = &countPlanets;

		for (int i = 0; i < *cP; i++)
		{
			for (int j = 0; j < *cP && (i != j); j++)
			{
				float fG = ForceOfGravity(collision, objectsArray.at(i)->getPosition().x, objectsArray.at(j)->getPosition().x, objectsArray.at(i)->getPosition().y, objectsArray.at(j)->getPosition().y, objectsArray.at(i)->getRadius(), objectsArray.at(j)->getRadius(), objectsArray.at(i)->getMass(), objectsArray.at(j)->getMass());

				/*std::cout << "i (" << objectsArray.at(i)->getMass() << "): \t " << i << " \t j(" << objectsArray.at(j)->getMass() << "): \t " << j << std::endl;
				if (collision) std::cout << "=== COLLISION !!! ===" << std::endl;*/

				float massJtoI = ((float)objectsArray.at(j)->getMass() / objectsArray.at(i)->getMass());
				float massItoJ = ((float)objectsArray.at(i)->getMass() / objectsArray.at(j)->getMass());

				float fGmassJtoI = fG * massJtoI;
				float fGmassItoJ = fG * massItoJ;

				//Clashed?
				/*
				Почему при коллизии i и j сбрасиваются?
				*/
				if (collision)
				{
					if (objectsArray.at(j)->getMass() > objectsArray.at(i)->getMass())
					{
						objectsArray.at(j)->addedAcceleration(
							Vector2(objectsArray.at(i)->getAcceleration().x * massItoJ / 2,
									objectsArray.at(i)->getAcceleration().y * massItoJ / 2));

						//Change big object
						objectsArray.at(j)->addMass(objectsArray.at(i)->getMass() * 0.9f);
						objectsArray.at(j)->addRadius(objectsArray.at(i)->getRadius() * massItoJ);

						//Delete small
						delete objectsArray[i];
						objectsArray.erase(objectsArray.begin() + i);

						*cP--;
					}
					else
					{
						objectsArray.at(i)->addedAcceleration(
							Vector2(objectsArray.at(j)->getAcceleration().x * massJtoI / 2,
									objectsArray.at(j)->getAcceleration().y * massJtoI / 2));

						//Change big object
						objectsArray.at(i)->addMass(objectsArray.at(j)->getMass() * 0.9f);
						objectsArray.at(i)->addRadius(objectsArray.at(j)->getRadius() * massJtoI);
						//Delete small
						delete objectsArray[j];
						objectsArray.erase(objectsArray.begin() + j);

						*cP--;
					}
				}
				if (!collision)
				{
					//Added acceleration
					if (objectsArray.at(i)->getPosition().x > objectsArray.at(j)->getPosition().x)
					{
						objectsArray.at(i)->addedAcceleration(Vector2(-fGmassJtoI, 0));
						objectsArray.at(j)->addedAcceleration(Vector2(fGmassItoJ, 0));
					}
					if (objectsArray.at(i)->getPosition().x < objectsArray.at(j)->getPosition().x)
					{
						objectsArray.at(i)->addedAcceleration(Vector2(fGmassJtoI, 0));
						objectsArray.at(j)->addedAcceleration(Vector2(-fGmassItoJ, 0));
					}
					if (objectsArray.at(i)->getPosition().y > objectsArray.at(j)->getPosition().y)
					{
						objectsArray.at(i)->addedAcceleration(Vector2(0, -fGmassJtoI));
						objectsArray.at(j)->addedAcceleration(Vector2(0, fGmassItoJ));
					}
					if (objectsArray.at(i)->getPosition().y < objectsArray.at(j)->getPosition().y)
					{
						objectsArray.at(i)->addedAcceleration(Vector2(0, fGmassJtoI));
						objectsArray.at(j)->addedAcceleration(Vector2(0, -fGmassItoJ));
					}
				}
			}
		}
	}

	void moveObjects()
	{
		for (int i = 0; i < (int)objectsArray.size(); i++)
			objectsArray.at(i)->addedPosition(objectsArray.at(i)->getAcceleration());
	}

	void DrawingAllObjects()
	{
		for (int i = 0; i < (int)objectsArray.size(); i++)
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
	glutTimerFunc(25, Update, 0);

	gravity.accelerationObjects();
	gravity.moveObjects();
}

int main(int argc, char * argv[])
{
	//Added objects

	//gravity.add(СelestialObject(Vector2(0, -100), Vector2(0, 0), 15, 5973, Color(0, 0, 255)));
	//gravity.add(СelestialObject(Vector2(0, 184), Vector2(0.6f, 0), 4, 735, Color(0, 0, 0)))

	srand(time(0));
	for (int i = 1; i != 50; i++)
	{
		int r = rand() % 20 + 5;
		int m = r * 160;
		Vector2 position(1500 - rand() % 3000, 750 - rand() % 1500);
		Vector2 direction(1 - rand() % 2, (1 - rand() % 2));
		Color color(0, 0, 0);
		gravity.add(СelestialObject(position, direction, r, m, color));
	}

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

