/** Extend BText */
GraphicalText.prototype = new BText();
GraphicalText.prototype.constructor = GraphicalText;
GraphicalText.prototype.parent = BText.prototype;

/**
 * A graphical version of the BText object.
 *
 * @param cx {Number} The center x coordinate of the text
 * @param cy {Number} The center y coordinate of the text
 * @param text {String} The text to be rendered
 */
function GraphicalText ( cx, cy, text ) {
	if ( cx != undefined && cy != undefined && text != undefined )
		this.graphicalTextInit( cx, cy, text );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param x {Number} The center x coordinate of the text
 * @param y {Number} The center y coordinate of the text
 * @param text {String} The text to be rendered
 */
GraphicalText.prototype.graphicalTextInit = function ( x, y, text ) {
	this.parent.bTextInit.call( this, text );

	this.x = x;
	this.y = y;

	this.changeFontSize( 16 );
	this.textColor = "rgba(0,0,0,.2)";
};

/**
 * Renders the text.
 *
 * @param c {2DContext} The 2D drawing context
 */
GraphicalText.prototype.paint = function ( c ) {
	// Color the text & set the font
	c.fillStyle = this.textColor;
	c.font = this.font;

	// Center the text, vertically and horizontally
	c.textAlign = "center";
	c.textBaseline = "middle";

	// Draw the text
	var width = this.getTextWidth( c );
	c.fillText( this.text, this.x, this.y, width );
};

/**
 * Set a new font color.
 *
 * @param newColor {String} The new color of the text
 */
GraphicalText.prototype.setFontColor = function ( newColor ) { this.textColor = newColor; };
