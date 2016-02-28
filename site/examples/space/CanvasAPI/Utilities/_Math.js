///
///	Summary:
/// 	"Static" additions to the Math class.
///

// Convert Radians to Degrees
Math.RAD2DEG = 180 / Math.PI;

// Convert Font Size to Pixels (Dots per Point)
//    96 - Dots per Inch on the standard screen
//    72 - Points per Inch
Math.FONT2PIXEL = 96 / 72;

/**
 * Checks to see if the hit location is within' a circle.
 *
 * @param x {Number} The X location of the hit
 * @param y {Number} The Y location of the hit
 * @param circleCenter {BPoint} An X/Y object wrapper (also the BPoint class)
 * @param radius {Number} The radius of the circle
 * @return {Boolean} Was it a hit inside the circle?
 */
Math.circleHitTest = function ( x, y, circleCenter, radius ) {
	// Get the distance from the x,y point to the center point
	var dist = Math.sqrt( (x - circleCenter.x) * (x - circleCenter.x) + (y - circleCenter.y) * (y - circleCenter.y) );

	return dist < radius;
};

/**
 * Converts a Hexadecimal number into a Decimal number.
 *
 * @param hex {String} The single hex character to convert into decimal (0 - F)
 * @return {Number} The decimal equivalent of the passed hex number
 */
Math.hex2dec = function ( hex ) {
	// Make sure the hex is a single character
	if ( hex.length != 1 )
		return 0;

	// Set the default
	var dec = 0;

	// Make sure the hex variable is in lower case
	hex = hex.toLowerCase();

	// Convert the hex into a decimal
	switch ( hex ) {
		case "f":
			dec = 15;
			break;
		case "e":
			dec = 14;
			break;
		case "d":
			dec = 13;
			break;
		case "c":
			dec = 12;
			break;
		case "b":
			dec = 11;
			break;
		case "a":
			dec = 10;
			break;
		default:
			dec = parseInt( hex );
			break;
	}

	return dec;
};

/**
 * Converts a Decimal number into a Hexadecimal number.
 *
 * @param dec {Number} A decimal number to be converted into a s single hex character (0 - 15)
 * @return {String} The hex equivalent of the passed decimal number
 */
Math.dec2hex = function ( dec ) {
	// Make sure the dec is a valid single hex character
	if ( dec > 15 )
		return "0";

	// Set the default
	var hex = "0";

	// Convert the decimal to a hexadecimal
	switch ( dec ) {
		case 15:
			hex = "f";
			break;
		case 14:
			hex = "e";
			break;
		case 13:
			hex = "d";
			break;
		case 12:
			hex = "c";
			break;
		case 11:
			hex = "b";
			break;
		case 10:
			hex = "a";
			break;
		default:
			hex = dec.toString();
			break;
	}

	return hex;
};

/**
 * Rounds to the nearest decimal.
 *
 * @param number {Number} The number to be rounded
 * @param decimals {Number} The amount of decimals (0 being none)
 * @return {Number} The rounded number, with correct number of decimals
 */
Math.roundToNearest = function ( number, decimals ) {
	number *= Math.pow(10, decimals);
	number = Math.round( number );
	number /= Math.pow(10, decimals);

	return number;
};

/**
 * Formats an integer to have leading 0s.
 *
 * @param number {Number} An integer that you want formatted
 * @param digits {Number} The amount of digits you want
 * @return {String} The formatted integer with leading 0s
 */
Math.formatDigits = function ( number, digits ) {
	// If request is outside of params:
	//		Wants 0 digits
	//		The number is less or equal to the number of digits already
	if ( number >= Math.pow(10,digits-1) || digits == 0 )
		return number;

	// Suppress any decimal places
	number = Math.floor(number);

	// Check to see if the number is negative
	var isNeg = false;
	if ( number < 0 ) {
		number *= -1;
		isNeg = true;
	}

	// Convert to a 'string'
	var stringNum = "" + number;

	// Run through and increase number by passed digits
	for ( var i=1; i<digits; i++ )
		if( stringNum <= Math.pow(10,i) )
			stringNum = "0" + stringNum;

	// If it was negative, convert it back to being a negative
	if ( isNeg )
		stringNum = "-" + stringNum;

	return stringNum;
};
