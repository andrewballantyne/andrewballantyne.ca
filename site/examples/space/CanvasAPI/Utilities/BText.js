/**
 * A class to manipulate a string of text and associated font settings.
 *
 * @param text {String} The string to be held
 */
function BText ( text ) {
	if ( text != undefined )
		this.bTextInit( text );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param text {String} The string to be held
 */
BText.prototype.bTextInit = function ( text ) {
	this.text = text;

	// Set defaults
	this.style = "normal";
	this.weight = "normal";
	this.textSize = Font.textSize;

	// Create the font for the text
	this.font = this.style + " " + this.weight + " " + this.textSize + "px " + Font.fontType;
};

/**
 * Gets the full 2D drawing context font information.
 *
 * @return {String} The full font information
 */
BText.prototype.getFont = function ( ) { return this.font; };
/**
 * Gets the text.
 *
 * @return {String} The text
 */
BText.prototype.getText = function ( ) { return this.text; };
/**
 * Gets the height of the text in pixels.
 *
 * @return {Number} the height of the text in pixels
 */
BText.prototype.getTextHeight = function ( ) { return this.textSize * Math.FONT2PIXEL; };
/**
 * Gets the width of the text in pixels. It uses the 2D drawing context measureText() method, so the 2D context needs to be passed.
 *
 * @param c <2DContext> The 2D drawing context
 */
BText.prototype.getTextWidth = function ( c ) { return c.measureText(this.text).width; };

/**
 * Sets the font weight and reconfigures the font.
 *
 * @param fontWeight {String} A font weight (eg. bold, normal)
 */
BText.prototype.setFontWeight = function ( fontWeight ) {
	// Save the passed information
	this.weight = fontWeight;

	// Reconfigure the font
	this.font = this.style + " " + this.weight + " " + this.textSize + "px " + Font.fontType;
};
/**
 * Sets the font style and reconfigures the font.
 *
 * @param fontStyle {String} A font style (eg. italic, normal)
 */
BText.prototype.setFontStyle = function ( fontStyle ) {
	// Save the passed information
	this.style = fontStyle;

	// Reconfigure the font
	this.font = this.style + " " + this.weight + " " + this.textSize + "px " + Font.fontType;
};

/**
 * Sets the font size in pixels. Default is 12 point
 *
 * @param newFontSize {Number} In pixels how large the text will be
 */
BText.prototype.changeFontSize = function ( newFontSize ) {
	this.textSize = newFontSize;

	// Reconfigure the font
	this.font = this.style + " " + this.weight + " " + this.textSize + "px " + Font.fontType;
};

/**
 * Changes the text.
 *
 * @param newText {String} The new text
 */
BText.prototype.changeText = function ( newText ) { this.text = newText; };