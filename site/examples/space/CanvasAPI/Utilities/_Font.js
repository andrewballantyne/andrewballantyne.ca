///
///	Summary:
///		Creation of static variables regarding to text Fonts.
///

function Font () {}

Font.textSize = 12;
Font.fontType = "Arial";
Font.textHeight = Font.textSize * Math.FONT2PIXEL;

/**
 * Breaks up a string at line breaks (\n).
 *
 * @param string {String} The string to break up
 * @return {Array} The array of strings
 */
Font.splitString = function ( string ) {
	// Create a storage for the split string arrays
	var newArray = new Array();

	// Add a closing line break
	string += "\n";

	// Run through each character
	var start = 0;
	var end = 0;
	var tempString = null;
	for ( var i=0; i<string.length; i++ ) {
		// Are we at a line break?
		if ( string[i] == "\n" ) {
			// Create a new string of a single line
			end = i;
			tempString = "";
			for ( var j=start; j<end; j++ ) {
				tempString += string[j];
			}
			start = j+1;

			// Store the new string
			newArray.push(tempString);
		}
	}

	// Return the array
	return newArray;
};