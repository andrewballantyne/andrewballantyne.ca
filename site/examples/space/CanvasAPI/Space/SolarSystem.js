/**
 * A solar system (currently fixed constants makes it only the Sol Solar System).
 *
 * @param x {Number} Center X of the solar system
 * @param y {Number} Center Y of the solar system
 * @param preLoader {PreLoader} The preloader object holding onto the already loaded image data
 */
function SolarSystem ( x, y, preLoader ) {
	if ( x != undefined && y != undefined && preLoader != undefined )
		this.solarSystemInit( x, y, preLoader );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param x {Number} Center X of the solar system
 * @param y {Number} Center Y of the solar system
 * @param preLoader {PreLoader} The preloader object holding onto the already loaded image data
 */
SolarSystem.prototype.solarSystemInit = function ( x, y, preLoader ) {
	this.x = x;
	this.y = y;

	// Create the Sun
	this.unscaledSunRadius = SpaceGlobals.SUN['radius'];
	this.sunRadius = this.unscaledSunRadius;
	this.sun = preLoader.getImage(SpaceGlobals.SUN['src']);

	// Asteroid Field
	this.asteroidField = new AsteroidRing( this.x, this.y, this.sunRadius, SpaceGlobals.ASTEROIDS, preLoader.getImage(SpaceGlobals.ASTEROIDS.src) );

	// Create the 8 Solar Planets' orbit rings
	this.orbits = new Array();
	// Inner Planets
	this.orbits[0] = new OrbitRing( this.x, this.y, this.sunRadius, SpaceGlobals.PLANETS.MERCURY, preLoader.getImage(SpaceGlobals.PLANETS.MERCURY.src) );
	this.orbits[1] = new OrbitRing( this.x, this.y, this.sunRadius, SpaceGlobals.PLANETS.VENUS, preLoader.getImage(SpaceGlobals.PLANETS.VENUS.src) );
	this.orbits[2] = new OrbitRing( this.x, this.y, this.sunRadius, SpaceGlobals.PLANETS.EARTH, preLoader.getImage(SpaceGlobals.PLANETS.EARTH.src) );
	this.orbits[3] = new OrbitRing( this.x, this.y, this.sunRadius, SpaceGlobals.PLANETS.MARS, preLoader.getImage(SpaceGlobals.PLANETS.MARS.src) );
	// Outer Planets
	this.orbits[4] = new OrbitRing( this.x, this.y, this.sunRadius, SpaceGlobals.PLANETS.JUPITER, preLoader.getImage(SpaceGlobals.PLANETS.JUPITER.src) );
	this.orbits[5] = new OrbitRing( this.x, this.y, this.sunRadius, SpaceGlobals.PLANETS.SATURN, preLoader.getImage(SpaceGlobals.PLANETS.SATURN.src) );
	this.orbits[6] = new OrbitRing( this.x, this.y, this.sunRadius, SpaceGlobals.PLANETS.URANUS, preLoader.getImage(SpaceGlobals.PLANETS.URANUS.src) );
	this.orbits[7] = new OrbitRing( this.x, this.y, this.sunRadius, SpaceGlobals.PLANETS.NEPTUNE, preLoader.getImage(SpaceGlobals.PLANETS.NEPTUNE.src) );
};

/**
 * Renders the solar system.
 *
 * @param c {2DContext} The 2D drawing context
 */
SolarSystem.prototype.paint = function ( c ) {
	// Draw the sun image
	c.drawImage( this.sun, this.x-this.sunRadius, this.y-this.sunRadius, this.sunRadius*2, this.sunRadius*2 );

	// Render the Asteroid field
	this.asteroidField.paint( c );

	for ( var i=0; i<this.orbits.length; i++ )
		this.orbits[i].paint( c );
};

/**
 * Handles the timer tick for a rotation interval of the solar system.
 */
SolarSystem.prototype.rotationTick = function ( ) {
	// Apply the rotation tick to the asteroid field
	this.asteroidField.rotationTick();

	// Apply the rotation tick to all the orbit rings
	for ( var i=0; i<this.orbits.length; i++ )
		this.orbits[i].rotationTick();
};

/**
 * Handles the changing of scale of the solar system due to a zoom.
 *
 * @param toScale {Number} The scale you wish to zoom to.
 */
SolarSystem.prototype.zoom = function ( toScale ) {
	this.sunRadius = this.unscaledSunRadius / toScale;

	this.asteroidField.zoom( toScale );

	for ( var i=0; i<this.orbits.length; i++ )
		this.orbits[i].zoom( toScale );
};

/**
 * Get all the stat information from the orbit rings.
 *
 * @return {String} A comprehensive string from all the orbit rings
 */
SolarSystem.prototype.printStats = function ( ) {
	var data = "";
	for ( var i=0; i<this.orbits.length; i++ )
		data += this.orbits[i].printStats() + "\n";
	return data;
};
