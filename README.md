<h1>All data for based on real celestial object. Real proportion of the mass, distance and speed.</h1>

<h1>Earth and moon</h1>
gravity.add(ÑelestialObject(Vector2(0, -100), Vector2(0, 0), 15, 5973, Color(0, 0, 255)));<br>
gravity.add(ÑelestialObject(Vector2(0, 184), Vector2(0.6f, 0), 4, 735, Color(0, 0, 0)));

<h1>The conclusion of the satellite into geostationary orbit</h1>
gravity.add(ÑelestialObject(Vector2(60, 0), Vector2(0, 1.25f), 5, 1, Color(0, 0, 0)));<br>
gravity.add(ÑelestialObject(Vector2(0, 0), Vector2(0, 0), 40, 5973, Color(0, 0, 255)));

<h1>The conclusion of the satellite on high elliptical orbit</h1>
gravity.add(ÑelestialObject(Vector2(60, 0), Vector2(0.275f, 1.27f), 7, 1, Color(0, 0, 0)));<br>
gravity.add(ÑelestialObject(Vector2(0, 0), Vector2(0, 0), 40, 5973, Color(0, 0, 255)));

<h1>Demonstration. Create several planets with 1 or more satellite from the original cloud of cosmic dust.</h1>
srand(time(0));<br>
for (int i = 1; i != 60; i++)<br>
{<br>
	int r = rand() % 20 + 5;<br>
	int m = r * 160;<br>
	Vector2 position(1500 - rand() % 3000, 750 - rand() % 1500);<br>
	Vector2 direction(1 - rand() % 2, (1 - rand() % 2));<br>
	Color color(0, 0, 0);<br>
	gravity.add(ÑelestialObject(position, direction, r, m, color));<br>
}