// OpenGLLearning.cpp: определяет точку входа для консольного приложения.
//

#include "stdafx.h"
#include <iostream>
#include <gl\glut.h>
#include <math.h>

int width = 1200;
int height = 600;

void Start()
{
	glClearColor(1, 1, 1, 1);
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluOrtho2D(-width / 2, width / 2, -height / 2, height / 2);
	glMatrixMode(GL_MODELVIEW);
}

struct Vector2
{
	float x, y;
	Vector2(float _x, float _y) : x(_x), y(_y)
	{}
};

class Planet
{
public:
	Vector2 position;
	Vector2 acceleration;
	int r, m;

	Planet() : position(Vector2(0, 0)), acceleration(Vector2(0, 0)), r(10), m(600)
	{}

	Planet(Vector2 _pos, Vector2 _vel, int _r, int _m) : position(_pos), acceleration(_vel), r(_r), m(_m)
	{}

	void Draw()
	{
		glBegin(GL_QUADS);
		glVertex2i(position.x + r / 2, position.y - r / 2);
		glVertex2i(position.x + r / 2, position.y + r / 2);
		glVertex2i(position.x - r / 2, position.y + r / 2);
		glVertex2i(position.x - r / 2, position.y - r / 2);
		glEnd();
	}
};

//Сила гравитации между объектами
float gravityStrong(float x1, float x2, float y1, float y2, int m1, int m2, float lower)
{
	int a = abs(x2 - x1);
	int b = abs(y2 - y1);
	int r = pow(a, 2) + pow(b, 2);
	return (6.67408f * (m1*m2 / r)) / lower;
}

//Движение объектов друг к другу
void moveTo(Planet *p1, Planet *p2, float g)
{
		if (p2->position.x > p1->position.x)
		{
			p1->acceleration.x += g;
			p2->acceleration.x -= g;
		}
		if (p2->position.x < p1->position.x)
		{
			p2->acceleration.x += g;
			p1->acceleration.x -= g;
		}

		if (p2->position.y > p1->position.y)
		{
			p1->acceleration.y += g;
			p2->acceleration.y -= g;
		}
		if (p2->position.y < p1->position.y)
		{
			p2->acceleration.y += g;
			p1->acceleration.y -= g;
		}
}


Planet planet1(Vector2(-400, 134), Vector2(4.3f, 0), 5, 73.5f);
Planet planet2(Vector2(-400, -250), Vector2(0, 0), 15, 5970);

void Draw()
{
	glClear(GL_COLOR_BUFFER_BIT);

	glColor3i(250, 0, 0);

	planet1.Draw();
	planet2.Draw();

	glutSwapBuffers();
}

void Update(int)
{
	glutPostRedisplay();
	glutTimerFunc(50, Update, 0);

	float g = gravityStrong(planet1.position.x, planet2.position.x, planet1.position.y, planet2.position.y, planet1.m, planet2.m, 1000);

	//Двигаем объекты
	planet1.position.x += planet1.acceleration.x;
	planet1.position.y += planet1.acceleration.y;

	planet2.position.x += planet2.acceleration.x;
	planet2.position.y += planet2.acceleration.y;

	//Если планеты не столкнулись
	//if ((planet1.position.x != planet2.position.x) && (planet1.position.y != planet2.position.y))
	//{
		moveTo(&planet1, &planet2, g);

		std::cout << planet1.acceleration.y << std::endl;
	//}
}

int main(int argc, char * argv[])
{
	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA | GLUT_STENCIL);

	glutInitWindowSize(width, height);
	glutInitWindowPosition(100, 100);
	glutCreateWindow("Gravity");
	Start();

	glutDisplayFunc(Draw);
	glutTimerFunc(50, Update, 0);

	glutMainLoop();

	return 0;
}

