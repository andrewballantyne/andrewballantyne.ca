/**
 * A rounded corner button.
 *
 * @param x {Number} The top left X location
 * @param y {Number} The top left Y location
 * @param width {Number} The width of the button
 * @param height {Number} The height of the button
 * @param btnText {String} The text that appears on the button
 */
function BButton ( x, y, width, height, btnText ) {
	if ( x != undefined && y != undefined && width != undefined && height != undefined && btnText != undefined )
		this.bButtonInit( x, y, width, height, btnText );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param x {Number} The top left X location
 * @param y {Number} The top left Y location
 * @param width {Number} The width of the button
 * @param height {Number} The height of the button
 * @param btnText {String} The text that appears on the button
 */
BButton.prototype.bButtonInit = function ( x, y, width, height, btnText ) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	// Create a text object and set font weight
	this.textObj = new BText( btnText );
	this.textObj.setFontWeight( 'bold' );

	// Set defaults
	this.borderWidth = 2;
	this.backgroundColor = 'white';
	this.defaultBorderColor = 'rgba(0,0,0,1)';
	this.borderColor = this.defaultBorderColor;
	this.textColor = "black";
	this.cornerRadius = Math.min( this.height/4, this.width/4 );
	this.cornerRadius = Math.min( this.height/4, this.width/4 );
	this.isDown = false;
	this.isPressed = false;
};

/**
 * Renders the button.
 *
 * @param c {2DContext} The 2D drawing context
 */
BButton.prototype.paint = function ( c ) {
	// Rectangle with rounded corners
	//
	// Legend:
	//    .     draw points
	//    -- |  sides of the rectangle
	//    ,     center point of arc draw (center of the arc circle); . to , is this.cornerRadius
	//
	//                             Point Information:
	//  A   B  (width)  C   D           this.cornerRadius  = A-B, C-D, D-E, F-G, G-H, I-J, J-K, L-A
	//      .-----------.               width           = A-D, G-J
	//  L . ,           , . E           height          = D-G, J-A
	//    |               |
	//    |               | (height)    point A         = this.x, this.y
	//    |               |             B-C || H-I      = this.width - (this.cornerRadius*2)
	//  K . ,           , . F           E-F || K-L      = this.height - (this.cornerRadius*2)
	//      .-----------.
	//  J   I           H   G           this.cornerRadius  = whichever is lowest: this.height/4 || this.width/4
	//

	// Start path
	c.beginPath();

	// Get the starting point (B)
	var currentX = this.x + this.cornerRadius;
	var currentY = this.y;
	c.moveTo( currentX, currentY );

	// Go Right (B-C)
	currentX = this.x + this.width - this.cornerRadius;
	c.lineTo( currentX, currentY );

	// Top Right Corner (C-D-E)
	currentY = this.y + this.cornerRadius; // The center point needs to be pushed below point C
	c.arc( currentX, currentY, this.cornerRadius, 270/Math.RAD2DEG, 0/Math.RAD2DEG, false );

	// Go Down (E-F)
	currentX = this.x + this.width;
	currentY = this.y + this.height - this.cornerRadius;
	c.lineTo( currentX, currentY );

	// Bottom Right Corner (F-G-H)
	currentX = this.x + this.width - this.cornerRadius;
	c.arc( currentX, currentY, this.cornerRadius, 0/Math.RAD2DEG, 90/Math.RAD2DEG, false );

	// Go Left (H-I)
	currentX = this.x + this.cornerRadius;
	currentY = this.y + this.height;
	c.lineTo( currentX, currentY );

	// Bottom Left Corner (I-J-K)
	currentY = this.y + this.height - this.cornerRadius;
	c.arc( currentX, currentY, this.cornerRadius, 90/Math.RAD2DEG, 180/Math.RAD2DEG, false );

	// Go Up (K-L)
	currentX = this.x;
	currentY = this.y + this.cornerRadius;
	c.lineTo( currentX, currentY );

	// Top Left Corner (L-A-B)
	currentX = this.x + this.cornerRadius;
	c.arc( currentX, currentY, this.cornerRadius, 180/Math.RAD2DEG, 270/Math.RAD2DEG, false );

	// End path
	c.closePath();

	// Configure the background
	c.fillStyle = this.backgroundColor;

	// Draw the background
	c.fill();

	// Add a "shine" to the background
	var grd = c.createLinearGradient( this.x, this.y*0.8, this.x+this.width, this.y+this.height );
	var firstGradient = new BColor( "rgba(255,255,255,0.5)" );
	var secondGradient = new BColor( "rgba(0,0,0,0.35)" );
	if ( this.isDown ) {
		firstGradient.adjustColorTo( 0, 0, 0, 0.18 );
		secondGradient.adjustColorBy( 0, 0, 0, -0.18 );
	}
	grd.addColorStop( 0.0, firstGradient.rgbaColor() );
	grd.addColorStop( 0.8, secondGradient.rgbaColor() );
	c.fillStyle = grd;

	// Draw the "shine"
	c.fill();

	// Configure the border
	c.strokeStyle = this.borderColor;
	c.lineWidth = this.borderWidth;

	// Draw the border
	c.stroke();

	// Color the text & set the font
	c.fillStyle = this.textColor;
	c.font = this.textObj.getFont();

	// Center the text, vertically and horizontally
	c.textAlign = "center";
	c.textBaseline = "middle";

	// Find the center location
	var displacement = 0;
	if ( this.isDown ) // displace to show when the button is down
		displacement = 1;

	// Position the text in the center of the button
	var xLocation = displacement + this.x + this.width / 2;
	var yLocation = displacement + this.y + this.height / 2;

	// Draw the text
	c.fillText( this.textObj.getText(), xLocation, yLocation, this.width );
};

/**
 * Sets the border width.
 *
 * @param width {Number} The new border width
 */
BButton.prototype.setBorderWidth = function ( width ) { this.borderWidth = width; };
/**
 * Sets the border color.
 *
 * @param color {String} The color string
 */
BButton.prototype.setBorderColor = function ( color ) { this.borderColor = color; };
/**
 * Sets the background color.
 *
 * @param color {String} The color string
 */
BButton.prototype.setBackgroundColor = function ( color ) { this.backgroundColor = color; };
/**
 * Sets the text color.
 *
 * @param color {String} The color string
 */
BButton.prototype.setTextColor = function ( color ) { this.textColor = color; };

BButton.prototype.changeText = function ( newText ) { this.textObj.changeText( newText ); };

/**
 * Gets the down status of the button.
 */
BButton.prototype.getDownStatus = function ( ) { return this.isDown; };
/**
 * Gets the pressed status of the button.
 */
BButton.prototype.getPressedStatus = function ( ) { return this.isPressed; };

/**
 * Changes the hover condition of the button.
 *
 * @param condition {Boolean} Is it being hovered?
 */
BButton.prototype.hover = function ( condition ) {
	// Change the border based on the condition
	if ( condition ) {
		this.borderColor = 'rgba(0,0,255,.5)';
		this.textColor = "black";
		this.borderWidth = 3;
	}
	else if ( !this.isDown ) {
		this.borderColor = this.defaultBorderColor;
//		this.textColor = "rgba(75,0,0,1)";
		this.borderWidth = 2;
	}
};
/**
 * Changes the down condition of the button.
 *
 * @param condition {Boolean} Is it in a downed state?
 */
BButton.prototype.down = function ( condition ) { this.isDown = condition; };
/**
 * Changes the pressed condition of the button.
 *
 * @param condition {Boolean} Is the button currently being pressed?
 */
BButton.prototype.pressed = function ( condition ) { this.isPressed = condition; };

/**
 * Check to see if the button is hit at the passed X and Y.
 *
 * @param x {Number} The X location of the hit
 * @param y {Number} The Y location of the hit
 * @return {Boolean} Was it hit?
 */
BButton.prototype.isHit = function ( x, y ) {
	// Check to see if the coordinates are NOT within the bounding box
	if ( (x < this.x && x > this.x+this.width) && (y < this.y && y > this.y+this.height) )
		return false;

	// Rectangle with rounded corners
	//
	//  corner1        corner2
	//      .-----------.                 .-----------.
	//    . |           | .             .---------------.
	//    | |           | |             |               |
	//    | |   box1    | |             |      box2     |
	//    | |           | |             |               |
	//    . |           | .             .---------------.
	//      .-----------.                 .-----------.
	//  corner3        corner4

	// Get the defining corners of box1
	var topLeft = new BPoint( this.x + this.cornerRadius, this.y );
	var bottomRight = new BPoint( this.x + this.width - this.cornerRadius, this.y + this.height );

	// Eliminate the locations that are NOT inside the button
	// Check to see if it's NOT in box1
	if ( (x < topLeft.x || y < topLeft.y) || (x > bottomRight.x || y > bottomRight.y) ) {
		// Not in box1; is it in box2?
		// Get the defining corners of box2
		topLeft = new BPoint( this.x, this.y + this.cornerRadius );
		bottomRight = new BPoint( this.x + this.width, this.y + this.height - this.cornerRadius );
		// Check to see if it's NOT in box2
		if ( (x < topLeft.x || y < topLeft.y) || (x > bottomRight.x || y > bottomRight.y) ) {
			// Not in box2; is it in one of the curved corners?
			// Center point of corner1
			var corner1 = new BPoint( this.x + this.cornerRadius, this.y + this.cornerRadius );
			// Center point of corner2
			var corner2 = new BPoint( this.x + this.width - this.cornerRadius, this.y + this.cornerRadius );
			// Center point of corner3
			var corner3 = new BPoint( this.x + this.cornerRadius, this.y + this.height - this.cornerRadius );
			// Center point of corner4
			var corner4 = new BPoint( this.x + this.width - this.cornerRadius, this.y + this.height - this.cornerRadius );

			// Check to see if it's NOT hitting one of the corners
			if ( !(Math.circleHitTest( x, y, corner1, this.cornerRadius ) || Math.circleHitTest( x, y, corner2, this.cornerRadius ) ||
				Math.circleHitTest( x, y, corner3, this.cornerRadius ) || Math.circleHitTest( x, y, corner4, this.cornerRadius )) ) {
				// Not inside the button
				return false;
			}
		}
	}

	// Inside the button
	return true;
};
