/**
 * A basic space ring that orbits around the sun.
 *
 * @param x {Number} Center X of the ring
 * @param y {Number} Center Y of the ring
 * @param rotateSpeed {Number} The speed at which the ring rotates
 */
function SpaceRing ( x, y, rotateSpeed ) {
	if ( x != undefined && y != undefined && rotateSpeed != undefined )
		this.spaceRingInit( x, y, rotateSpeed );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param x {Number} Center X of the ring
 * @param y {Number} Center Y of the ring
 * @param rotateSpeed {Number} The speed at which the ring rotates
 */
SpaceRing.prototype.spaceRingInit = function ( x, y, rotateSpeed ) {
	this.x = x;
	this.y = y;
	this.rotationDays = rotateSpeed;
	this.speed = 2*Math.PI/this.rotationDays;
	this.direction = -1; // rotate counter-clockwise

	// Set some defaults
	this.rotateRad = 0;
	this.rotations = 0;
};

/**
 * Renders the space ring.
 *
 * @param c {2DContext} The 2D drawing context
 */
SpaceRing.prototype.paint = function ( c ) {};

/**
 * Handles the timer tick for a rotation interval of the orbiting planetary body.
 */
SpaceRing.prototype.rotationTick = function ( ) {
	this.rotateRad += this.direction * this.speed;

	// Check to see if a full rotation has been made
	if ( this.rotateRad < (-2 * Math.PI) && this.direction == -1 ) { // counter-clockwise
		this.rotateRad += 2 * Math.PI;
		this.rotations++;
	}
	else if ( this.rotateRad > (2 * Math.PI) && this.direction == 1 ) { // clockwise
		this.rotateRad -= 2 * Math.PI;
		this.rotations++;
	}
};

/**
 * Handles the changing of scale of the ring due to a zoom.
 *
 * @param toScale {Number} The scale you wish to zoom to.
 */
SpaceRing.prototype.zoom = function ( toScale ) {
	this.radius = this.unscaledRadius / toScale;
};
