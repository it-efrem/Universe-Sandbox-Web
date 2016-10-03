#include <iostream>
#include "Space.h"
#include <cmath>

float Space::ForceOfGravity(bool& collision, CelestialObject* o1, CelestialObject* o2)
{
	float x = 0, y = 0;

    x = std::abs(o1->getPosition().x - o2->getPosition().x);
    y = std::abs(o1->getPosition().y - o2->getPosition().y);

	float r = x + y;

	//Clashed?
	if (r <= (o1->getRadius() + o2->getRadius()) / 1.5f)
	{
		collision = true;
		return 0.001f;
	}
	return (o1->getMass() * o2->getMass() / pow(r, 2)) / 500000;
}

void Space::add(CelestialObject object)
{
    objectsArray.push_back(new CelestialObject(object));
}

void Space::accelerationObjects()
{
	bool collision = false;
	int countPlanets = (int)objectsArray.size();
	int *cP = &countPlanets;

	for (int i = 0; i < *cP; i++)
	{
		for (int j = 0; j < *cP && (i != j); j++)
		{
			float fG = ForceOfGravity(collision, objectsArray[i], objectsArray[j]);

			//std::cout << "i (" << objectsArray.at(i)->getMass() << "): \t " << i << " \t j(" << objectsArray.at(j)->getMass() << "): \t " << j << std::endl;
			//if (collision) std::cout << "=== COLLISION !!! ===" << std::endl;

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
				Vector2 direction
				(
					objectsArray.at(i)->getPosition().x > objectsArray.at(j)->getPosition().x
					? -1 : 1,
					objectsArray.at(i)->getPosition().y > objectsArray.at(j)->getPosition().y
					? -1 : 1
				);

				objectsArray.at(i)->addedAcceleration(Vector2(fGmassJtoI, fGmassJtoI) * direction);
				objectsArray.at(j)->addedAcceleration(Vector2(fGmassItoJ, fGmassItoJ) * -direction);
			}
		}
	}
}

void Space::moveObjects()
{
	for (CelestialObject* object : objectsArray)
		object->addedPosition(object->getAcceleration());
}

void Space::DrawingAllObjects()
{
	for (CelestialObject* object : objectsArray)
	{
		object->Draw();
	}
}
