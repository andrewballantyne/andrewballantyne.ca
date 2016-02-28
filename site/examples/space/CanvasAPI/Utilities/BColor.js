/**
 * A color class that helps manipulate and normalize color codes.
 *
 * @param color {String} The color code
 *				 		 	'#hhhhhh'
 * 							'#hhh'
 * 						h = hex number (0 - F)
 * 							'rgb( 0-255, 0-255, 0-255 )'
 *				 			'rgba( 0-255, 0-255, 0-255, 0-1 )'
 */
function BColor ( color ) {
	if ( color != undefined )
		this.bColorInit( color );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param color {String} The color code
 *				 		 	'#hhhhhh'
 * 							'#hhh'
 * 						h = hex number (0 - F)
 * 							'rgb( 0-255, 0-255, 0-255 )'
 *				 			'rgba( 0-255, 0-255, 0-255, 0-1 )'
 */
BColor.prototype.bColorInit = function ( color ) {
	this.red = "";
	this.green = "";
	this.blue = "";
	this.alpha = 1.0;

	color = color.toLowerCase();

	// Determine which type of color code was passed
	if ( color[0] == "#" && color.length == 7 ) { // 7 character HTML color code (eg. #ffffff)
		// Breakdown and save each individual color
		this.red = Math.hex2dec( color[1] ) * 16 + Math.hex2dec( color[2] );
		this.green = Math.hex2dec( color[3] ) * 16 + Math.hex2dec( color[4] );
		this.blue = Math.hex2dec( color[5] ) * 16 + Math.hex2dec( color[6] );
	}
	else if ( color[0] == "#" && color.length == 4 ) { // 4 character HTML color code (eg. #fff)
		// Breakdown and save each individual color
		this.red = Math.hex2dec( color[1] ) * 16 + 16;
		this.green = Math.hex2dec( color[2] ) * 16 + 16;
		this.blue = Math.hex2dec( color[3] ) * 16 + 16;
	}
	else if ( color [0] == "r" ) { // either rgb() or rgba()
		// Determine which rgb function is being used
		var loopStart;
		if ( color[3] == "a" ) // rgba()
			loopStart = 5; // 5th character is the 1st character after the bracket
		else // rgb()
			loopStart = 4; // 4th character is the 1st character after the bracket

		// Break down the function into it's rgb splits
		var number = "";
		var colorIndex = 1;
		for ( var i = loopStart; i < color.length; i++ ) {
			if ( !isNaN( color[i] ) || color[i] == "." ) { // is a number
				number += color[i].toString();
			}
			else if ( color[i] == "," || color[i] == ")" ) { // end of color
				// Save the color
				switch ( colorIndex ) {
					case 1: // red
						this.red = parseInt( number );
						break;
					case 2: // green
						this.green = parseInt( number );
						break;
					case 3: // blue
						this.blue = parseInt( number );
						break;
					case 4: // alpha
						this.alpha = parseFloat( number );
						break;
				}
				if ( color[i] == ")" ) { // end of function
					break;
				}
				else { // not end of function
					// reset variables for next number
					number = "";
					colorIndex++;
				}
			}
		}
	}
};

/**
 * Gets the red color component.
 *
 * @return {Number} 0-255, the red color component
 */
BColor.prototype.getRed = function ( ) { return this.red; };
/**
 * Gets the green color component.
 *
 * @return {Number} 0-255, the green color component
 */
BColor.prototype.getGreen = function ( ) { return this.green; };
/**
 * Gets the blue color component.
 *
 * @return {Number} 0-255, the blue color component
 */
BColor.prototype.getBlue = function ( ) { return this.blue; };
/**
 * Gets the alpha component of the color.
 *
 * @return {Number} 0-1, the alpha component
 */
BColor.prototype.getAlpha = function ( ) { return this.alpha; };

/**
 * Gets the rgba color code.
 *
 * @return {String} 'rgba(###,###,###,#)' with the color codes
 */
BColor.prototype.rgbaColor = function ( ) { return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")"; };
/**
 * Gets the rgb color code.
 *
 * @return {String} 'rgba(###,###,###)' with the color codes
 */
BColor.prototype.rgbColor = function ( ) { return "rgb(" + this.red + "," + this.green + "," + this.blue + ")"; };
/**
 * Gets the standard 6 character HTML color code.
 *
 * @return {String} '######' with the hex color codes
 */
BColor.prototype.HTMLColor = function ( ) {
	// Convert the decimal numbers into hexadecimal numbers for the 7 character HTML Color Code System
	var leftChar = parseInt( this.red / 16 );
	var rightChar = parseFloat( this.red % 16 );
	var hexRed = Math.dec2hex( leftChar ) + Math.dec2hex( rightChar );

	leftChar = parseInt( this.green / 16 );
	rightChar = parseFloat( this.green % 16 );
	var hexGreen = Math.dec2hex( leftChar ) + Math.dec2hex( rightChar );

	leftChar = parseInt( this.blue / 16 );
	rightChar = parseFloat( this.blue % 16 );
	var hexBlue = Math.dec2hex( leftChar ) + Math.dec2hex( rightChar );

	return "#" + hexRed + hexGreen + hexBlue;
};

/**
 * Adjusts a color by the passed amount.
 *
 * @param red {Number} An integer number 0-255
 * @param green {Number} A integer number 0-255
 * @param blue {Number} A integer number 0-255
 * @param alpha {Number} A decimal number 0-1
 */
BColor.prototype.adjustColorBy = function ( red, green, blue, alpha ) {
	// Add the passed difference of each color to the member variables
	this.red += red;
	this.green += green;
	this.blue += blue;
	this.alpha += alpha;

	// If the number goes beyond the min or max, reduce it back to the edge
	this.checkColorLevels();
};

/**
 * Changes a color to the passed amounts.
 *
 * @param red {Number} An integer number 0-255
 * @param green {Number} A integer number 0-255
 * @param blue {Number} A integer number 0-255
 * @param alpha {Number} A decimal number 0-1
 */
BColor.prototype.adjustColorTo = function ( red, green, blue, alpha ) {
	// Change the member variables to the passed ones
	this.red = red;
	this.green = green;
	this.blue = blue;
	this.alpha = alpha;

	// If the number goes beyond the min or max, reduce it back to the edge
	this.checkColorLevels();
};

/**
 * Checks the color levels to make sure they are not past their limits.
 */
BColor.prototype.checkColorLevels = function ( ) {
	// Determine if the member variables are past the edges of the standard color input
	if ( this.red < 0 )
		this.red = 0;
	else if ( this.red > 255 )
		this.red = 255;
	if ( this.green < 0 )
		this.green = 0;
	else if ( this.green > 255 )
		this.green = 255;
	if ( this.blue < 0 )
		this.blue = 0;
	else if ( this.blue > 255 )
		this.blue = 255;
	if ( this.alpha < 0 )
		this.alpha = 0;
	else if ( this.alpha > 1 )
		this.alpha = 1;
};
