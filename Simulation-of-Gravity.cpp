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

//Сила гравитации между 2-я объектами
float gravityStrong(float x1, float x2, float y1, float y2, int m1, int m2, float lower)
{
	int a = 0, b = 0;

	if (x1 > x2)
		a = x1 - x2;
	if (x1 < x2)
		a = x2 - x1;
	if (y1 > y2)
		b = y1 - y2;
	if (y1 < y2)
		b = y2 - y1;

	int r = a + b;
	return (6.67408f * (m1*m2 / r)) / lower;
}

//Движение объектов друг к другу
void moveTo(Planet **pl)
{
	for (int i = 0; i < 4; i++)
	{
		for (int j = 0; j < 4; j++)
		{
			if (i == j)
				continue;

			float g = gravityStrong(pl[i]->position.x, pl[j]->position.x, pl[i]->position.y, pl[j]->position.y, pl[i]->m, pl[j]->m, 6600000);

			if (pl[i]->position.x > pl[j]->position.x)
			{
				pl[i]->acceleration.x -= g * ((float)pl[j]->m / pl[i]->m);
				pl[j]->acceleration.x += g * ((float)pl[i]->m / pl[j]->m);
			}
			if (pl[i]->position.x < pl[j]->position.x)
			{
				pl[i]->acceleration.x += g * ((float)pl[j]->m / pl[i]->m);
				pl[j]->acceleration.x -= g * ((float)pl[i]->m / pl[j]->m);
			}
			if (pl[i]->position.y > pl[j]->position.y)
			{
				pl[i]->acceleration.y -= g * ((float)pl[j]->m / pl[i]->m);
				pl[j]->acceleration.y += g * ((float)pl[i]->m / pl[j]->m);
			}
			if (pl[i]->position.y < pl[j]->position.y)
			{
				pl[i]->acceleration.y += g * ((float)pl[j]->m / pl[i]->m);
				pl[j]->acceleration.y -= g * ((float)pl[i]->m / pl[j]->m);
			}
		}
	}
}

//Земля и 3 луны
Planet planet1(Vector2(-150, -150), Vector2(5, 0), 5, 735);
Planet planet2(Vector2(150, -150), Vector2(0, 5), 5, 735);
Planet planet3(Vector2(384, 0), Vector2(0, 7), 10, 735);
Planet planet4(Vector2(0, 0), Vector2(0, -0.1f), 12, 5973);


Planet *planets[4] = {&planet1, &planet2, &planet3, &planet4};

void Draw()
{
	glClear(GL_COLOR_BUFFER_BIT);

	glColor3i(50, 0, 0);

	planet1.Draw();
	planet2.Draw();
	planet3.Draw();
	planet4.Draw();

	glutSwapBuffers();
}

void Update(int)
{
	glutPostRedisplay();
	glutTimerFunc(50, Update, 0);

	//Двигаем объекты
	planet1.position.x += planet1.acceleration.x;
	planet1.position.y += planet1.acceleration.y;

	planet2.position.x += planet2.acceleration.x;
	planet2.position.y += planet2.acceleration.y;

	planet3.position.x += planet3.acceleration.x;
	planet3.position.y += planet3.acceleration.y;

	planet4.position.x += planet4.acceleration.x;
	planet4.position.y += planet4.acceleration.y;

	//Если планеты не столкнулись
	//if ((planet1.position.x != planet2.position.x) && (planet1.position.y != planet2.position.y))
	//{
	moveTo(planets);

		std::cout << planet1.acceleration.x << '\t' << planet2.acceleration.x << std::endl;
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

