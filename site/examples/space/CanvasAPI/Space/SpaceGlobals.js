function SpaceGlobals () {}

// Enums For Planet Information
//	radius	- in km (rounded to the nearest km)
//	spin	- how fast it rotates, in days [actual data]
//	src		- the source of the image
SpaceGlobals.SUN = {
	radius: 250,
	spin: 25,
	src: "sun"
};

//	orbit	- how long does it take to orbit the sun, in days [~actual data]
//	dist	- distance from the sun
//	src		- the source of the image
SpaceGlobals.ASTEROIDS = {
	orbit: 1681,
	dist: 1100,
	src: "asteroidRing"
};

//	radius	- of the planet
//	orbit	- how long it takes to get around the sun, in 'days' [actual data]
//	dist	- distance from the sun
//	src		- the source of the image
SpaceGlobals.PLANETS = {
	MERCURY	: {name: 'Mercury', radius: 50, orbit: 88, dist: 150, src: "mercury"},
	VENUS	: {name: 'Venus', radius: 75, orbit: 225, dist: 300, src: "venus"},
	EARTH	: {name: 'Earth', radius: 78, orbit: 365, dist: 450, src: "earth"},
	MARS	: {name: 'Mars', radius: 60, orbit: 669, dist: 600, src: "mars"},
	JUPITER	: {name: 'Jupiter', radius: 142, orbit: 4333, dist: 1500, src: "jupiter"},
	SATURN	: {name: 'Saturn', radius: 142, orbit: 10759, dist: 1900, src: "saturn"},
	URANUS	: {name: 'Uranus', radius: 90, orbit: 30799, dist: 2500, src: "uranus"},
	NEPTUNE	: {name: 'Neptune', radius: 90, orbit: 60190, dist: 4000, src: "neptune"}
};
