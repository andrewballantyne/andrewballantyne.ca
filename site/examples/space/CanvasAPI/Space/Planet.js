/**
 * A Planetary body.
 *
 * @param x {Number} Center X of the planet
 * @param y {Number} Center Y of the planet
 * @param radius {Number} Radius of the planet
 * @param imageSrc {String} The URL to the image
 * @param planetImage {Image} The image data for the planet
 */
function Planet ( x, y, radius, imageSrc, planetImage ) {
	if ( x != undefined && y != undefined && radius != undefined && imageSrc != undefined && planetImage != undefined )
		this.planetInit( x, y, radius, imageSrc, planetImage );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param x {Number} Center X of the planet
 * @param y {Number} Center Y of the planet
 * @param radius {Number} Radius of the planet
 * @param imageSrc {String} The URL to the image
 * @param planetImage {Image} The image data for the planet
 */
Planet.prototype.planetInit = function ( x, y, radius, imageSrc, planetImage ) {
	this.x = x;
	this.y = y;
	this.unscaledRadius = radius;
	this.radius = this.unscaledRadius;
	this.image = planetImage;

	// Set some defaults
	this.color = "white";
};

/**
 * Renders the planetary body.
 *
 * @param c {2DContext} The 2D drawing context
 */
Planet.prototype.paint = function ( c ) {
	c.drawImage( this.image, this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2 );
};

/**
 * Repositions the planetary body.
 *
 * @param x {Number} New x coordinate of the planet
 * @param y {Number} New y coordinate of the planet
 */
Planet.prototype.move = function ( x, y ) {
	this.x = x;
	this.y = y;
};

/**
 * Handles the changing of scale of the planetary body by a zoom scale.
 *
 * @param toScale {Number} The scale you wish to zoom to.
 */
Planet.prototype.zoom = function ( toScale ) {
	this.radius = this.unscaledRadius / toScale;
};
