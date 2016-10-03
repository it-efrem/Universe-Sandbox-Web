#include <iostream>
#include <cstdlib>
#include <ctime>
#include <vector>

#include "Class/glut.h"
#include "Class/Struct.h"
#include "Class/Display.h"
#include "Class/Space.h"
#include "Class/CelestialObject.h"

Space gravity;
Display display(1300, 700, 3, 1);

void Start()
{
	glClearColor(1, 1, 1, 1);
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluOrtho2D(-display.getWidth() * display.getScale(), display.getWidth() * display.getScale(), -display.getHeight() * display.getScale(), display.getHeight() * display.getScale());
	glMatrixMode(GL_MODELVIEW);
}

void Draw()
{
	glClear(GL_COLOR_BUFFER_BIT);
	gravity.DrawingAllObjects();
	glutSwapBuffers();
}

void Update(int)
{
	glutPostRedisplay();
	glutTimerFunc(display.getSpeed(), Update, 0);

	gravity.accelerationObjects();
	gravity.moveObjects();
}

int main(int argc, char * argv[])
{
	//Added objects

	/*gravity.add(CelestialObject(Vector2(-560, 0), Vector2(0.275f, 1.27f), 7, 1, Color(0, 0, 0)));
	gravity.add(CelestialObject(Vector2(-500, 0), Vector2(0, 0), 40, 5973, Color(0, 0, 255)));

	gravity.add(CelestialObject(Vector2(560, 0), Vector2(0, 1.25f), 5, 1, Color(0, 0, 0)));
	gravity.add(CelestialObject(Vector2(500, 0), Vector2(0, 0), 40, 5973, Color(0, 0, 255)));*/

	srand(time(0));
	for (int i = 1; i != 70; i++)
	{
		int r = rand() % 20 + 5;
		int m = r * 160;
		Vector2 position(1500 - rand() % 3000, 750 - rand() % 1500);
		Vector2 direction(1 - rand() % 2, (1 - rand() % 2));
		Color color(0, 0, 0);
		gravity.add(CelestialObject(position, direction, r, m, color));
	}

	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA | GLUT_STENCIL);

	glutInitWindowSize(display.getWidth(), display.getHeight());
	glutInitWindowPosition(50, 0);
	glutCreateWindow("Gravity");
	Start();

	glutDisplayFunc(Draw);
	glutTimerFunc(1, Update, 0);

	glutMainLoop();

	return 0;
}

