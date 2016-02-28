/** Extend SpaceRing */
AsteroidRing.prototype = new SpaceRing();
AsteroidRing.prototype.constructor = AsteroidRing;
AsteroidRing.prototype.parent = SpaceRing.prototype;

/**
 * An asteroid ring that orbits around the sun.
 *
 * @param x {Number} Center X of the asteroid ring
 * @param y {Number} Center Y of the asteroid ring
 * @param distStart {Number} The radius of the Sun; ie, the distance the asteroid ring is calculated from
 * @param asteroidData {SpaceGlobals.ASTEROIDS} The associated array of asteroid data
 * @param asteroidImage {Image} The image data for the asteroid ring
 */
function AsteroidRing ( x, y, distStart, asteroidData, asteroidImage ) {
	if ( x != undefined && y != undefined && distStart != undefined && asteroidData != undefined && asteroidImage != undefined )
		this.asteroidRingInit( x, y, distStart, asteroidData, asteroidImage );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param x {Number} Center X of the asteroid ring
 * @param y {Number} Center Y of the asteroid ring
 * @param distStart {Number} The radius of the Sun; ie, the distance the asteroid ring is calculated from
 * @param asteroidData {SpaceGlobals.ASTEROIDS} The associated array of asteroid data
 * @param asteroidImage {Image} The image data for the asteroid ring
 */
AsteroidRing.prototype.asteroidRingInit = function ( x, y, distStart, asteroidData, asteroidImage ) {
	this.parent.spaceRingInit.call( this, x, y, asteroidData['orbit'] );

	// Asteroid data
	this.unscaledRadius = distStart + asteroidData['dist'];
	this.radius = this.unscaledRadius;
	this.field = asteroidImage;
};

/**
 * Renders the asteroid ring.
 *
 * @param c {2DContext} The 2D drawing context
 */
AsteroidRing.prototype.paint = function ( c ) {
	// Save the current transformation
	c.save();

	// Rotate the asteroid field
	c.translate(this.x, this.y); // translate to the center of the canvas
	c.rotate(this.rotateRad);
	c.translate(-this.x, -this.y); // translate back to the top left corner of the canvas

	// Draw the asteroid field
	c.drawImage( this.field, this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2 );

	// Restore the transformation back to the saved point
	c.restore();
};

/**
 * Handles the changing of scale of the asteroid ring due to a zoom.
 *
 * @param toScale {Number} The scale you wish to zoom to.
 */
AsteroidRing.prototype.zoom = function ( toScale ) {
	this.parent.zoom.call( this, toScale );

	// Re-scale the asteroid field
	this.radius = this.unscaledRadius / toScale;
};
