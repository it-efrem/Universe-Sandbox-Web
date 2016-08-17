#All data for based on real celestial object. Real proportion of the mass, distance and speed.

#Earth and moon
gravity.add(СelestialObject(Vector2(0, -100), Vector2(0, 0), 15, 5973, Color(0, 0, 255)));
gravity.add(СelestialObject(Vector2(0, 184), Vector2(0.6f, 0), 4, 735, Color(0, 0, 0)));

#The conclusion of the satellite into geostationary orbit
gravity.add(СelestialObject(Vector2(60, 0), Vector2(0, 1.25f), 5, 1, Color(0, 0, 0)));
gravity.add(СelestialObject(Vector2(0, 0), Vector2(0, 0), 40, 5973, Color(0, 0, 255)));

#The conclusion of the satellite on high elliptical orbit
gravity.add(СelestialObject(Vector2(60, 0), Vector2(0.275f, 1.27f), 7, 1, Color(0, 0, 0)));
gravity.add(СelestialObject(Vector2(0, 0), Vector2(0, 0), 40, 5973, Color(0, 0, 255)));

#Demonstration. Create several planets with 1 or more satellite from the original cloud of cosmic dust.
srand(time(0));
for (int i = 1; i != 60; i++)
{
	int r = rand() % 20 + 5;
	int m = r * 160;
	Vector2 position(1500 - rand() % 3000, 750 - rand() % 1500);
	Vector2 direction(1 - rand() % 2, (1 - rand() % 2));
	Color color(0, 0, 0);
	gravity.add(СelestialObject(position, direction, r, m, color));
}