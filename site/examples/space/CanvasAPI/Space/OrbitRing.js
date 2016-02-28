/** Extend SpaceRing */
OrbitRing.prototype = new SpaceRing();
OrbitRing.prototype.constructor = OrbitRing;
OrbitRing.prototype.parent = SpaceRing.prototype;

/**
 * An orbit ring that a planetary body orbits around the sun on.
 *
 * @param x {Number} Center X of the orbit ring
 * @param y {Number} Center Y of the orbit ring
 * @param distStart {Number} The radius of the Sun; ie, the distance the orbit ring is calculated from
 * @param planetData {SpaceGlobals.PLANETS} The associated array of planet data
 * @param planetImage {Image} The image data for the planet
 */
function OrbitRing ( x, y, distStart, planetData, planetImage ) {
	if ( x != undefined && y != undefined && distStart != undefined && planetData != undefined && planetImage != undefined )
		this.orbitRingInit( x, y, distStart, planetData, planetImage );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param x {Number} Center X of the orbit ring
 * @param y {Number} Center Y of the orbit ring
 * @param distStart {Number} The radius of the Sun; ie, the distance the orbit ring is calculated from
 * @param planetData {SpaceGlobals.PLANETS} The associated array of planet data
 * @param planetImage {Image} The image data for the planet
 */
OrbitRing.prototype.orbitRingInit = function ( x, y, distStart, planetData, planetImage ) {
	this.parent.spaceRingInit.call( this, x, y, planetData['orbit'] );

	// OrbitRing data
	this.unscaledRadius = distStart+planetData['dist'];
	this.radius = this.unscaledRadius;
	this.ringColor = "rgba(0,0,255,.2)";
	this.name = planetData['name'];

	// Create a planet to follow the orbit ring
	this.planet = new Planet( this.x+this.radius, this.y, planetData['radius'], planetData['src'], planetImage );
};

/**
 * Renders the orbit path.
 *
 * @param c {2DContext} The 2D drawing context
 */
OrbitRing.prototype.paint = function ( c ) {
	c.strokeStyle = this.ringColor;
	c.lineWidth = 1;
	c.beginPath();
	c.arc( this.x, this.y, this.radius, 0, Math.PI*2, true );
	c.closePath();
	c.stroke();

	this.planet.paint( c );
};

/**
 * Handles the timer tick for a rotation interval of the orbiting planetary body.
 */
OrbitRing.prototype.rotationTick = function ( ) {
	this.parent.rotationTick.call( this );

	// Calculate the new position
	var x = this.x + this.radius * Math.cos(this.rotateRad);
	var y = this.y + this.radius * Math.sin(this.rotateRad);
	this.planet.move( x, y );
};

/**
 * Handles the changing of scale of the orbital ring of the planetary body due to a zoom.
 *
 * @param toScale {Number} The scale you wish to zoom to.
 */
OrbitRing.prototype.zoom = function ( toScale ) {
	this.parent.zoom.call( this, toScale );

	// Calculate the new location of the planetary body
	var x = this.x + this.radius * Math.cos(this.rotateRad);
	var y = this.y + this.radius * Math.sin(this.rotateRad);
	this.planet.move( x, y );

	// Apply the zoom to the planetary body
	this.planet.zoom( toScale );
};

/**
 * Determines the partial rotation of the planet on the orbit ring.
 *
 * @return {Number} An integer representing the decimal point of a rotation (to two decimal places)
 */
OrbitRing.prototype.partialRotations = function ( ) {
	var decimal = this.direction * this.rotateRad * Math.RAD2DEG;
	decimal = Math.formatDigits( Math.floor(decimal / 360 * 100), 2 );
	return decimal;
};

/**
 * Creates a string of the current rotation stats. Line breaks are used by '\n'.
 *
 * @return {String} The string with the current rotation stats
 */
OrbitRing.prototype.printStats = function ( ) {
	var data = this.name + " has made " + this.rotations + "." + this.partialRotations() + " rotation(s).";
	data += "\n       - A single rotation takes " + this.rotationDays + " days.\n";

	return data;
};