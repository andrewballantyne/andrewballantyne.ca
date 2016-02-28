/**
 * A simple canvas window.
 *
 * @param canvasID {String} The document element ID for the canvas
 */
function CanvasWin ( canvasID ) {
	if ( canvasID != undefined )
		this.canvasWinInit( canvasID );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param canvasID {String} The document element ID for the canvas
 */
CanvasWin.prototype.canvasWinInit = function ( canvasID ) {
	this.canvasID = canvasID;
	this.canvas = document.getElementById( this.canvasID );
	this.context = this.canvas.getContext('2d');
	this.borderColor = "rgba(0,0,0,1)";

	// Set the scale/zoom factor
	this.defaultScale = 5; // set bottom end of scale
	this.startingOffset = 1.5; // set offset for starting location
	this.scale = this.defaultScale + this.startingOffset; // set current scale

	this.lightText = "Click and scroll!";
	this.boldText = "Scroll to zoom!";

	this.reacquireCanvasInfo();

	// Create Focus Text
	this.focusText = new GraphicalText( this.width/2, 20, this.lightText );
};

/**
 * Clears the canvas elements.
 */
CanvasWin.prototype.paint = function ( ) {
	this.clearScreen( 'white', null );
	this.focusText.paint( this.context );
	this.paintBorder();
};
/**
 * Clears the canvas.
 *
 * @param bgColor {String} A preferred background color; if undefined, white takes place
 * @param bgImage {String} An image to place as the background
 */
CanvasWin.prototype.clearScreen = function ( bgColor, bgImage ) {
	// Clear the screen
	this.context.fillStyle = (bgColor != undefined) ? bgColor : "white";
	this.context.fillRect( 0, 0, this.canvas.width, this.canvas.height );

	// If an image is available, render it with slight transparency
	if ( bgImage != undefined ) {
		this.context.globalAlpha = 0.8;
		this.context.drawImage( bgImage, 0, 0, this.width, this.height );
		this.context.globalAlpha = 1;
	}
};
/**
 * Renders the border.
 */
CanvasWin.prototype.paintBorder = function ( ) {
	this.context.strokeStyle = this.borderColor;
	this.context.lineWidth = 2;
	this.context.strokeRect( .5, .5, this.canvas.width-1, this.canvas.height-1 );
};

/**
 * Event handler for the left mouse press down.
 *
 * @param e {Event} The event handler
 * @return {String} The canvas ID if the event down was inside the canvas
 */
CanvasWin.prototype.mouseDown = function ( e ) {
	this.reacquireCanvasInfo();
	var focus = null;

	// Check to see if the canvas was hit
	if ( this.isHit( e.pageX, e.pageY ) )
		focus = this.canvasID;

	return focus;
};
/**
 * Event handler for the left mouse press up.
 *
 * @param e {Event} The event handler
 */
CanvasWin.prototype.mouseUp = function ( e ) {
	this.reacquireCanvasInfo();
};
/**
 * Event handler for the mouse move.
 *
 * @param e {Event} The event handler
 */
CanvasWin.prototype.mouseMove = function ( e ) {
	this.reacquireCanvasInfo();
};
/**
 * Event handler for the mouse scroll wheel.
 *
 * @param e {Event} The event handler
 */
CanvasWin.prototype.mouseScroll = function ( e ) {
	var scrollDetails = ( e.wheelDelta != undefined ) ? -1*e.wheelDelta : e.detail;
	this.zoom( scrollDetails );
};

/**
 * Zooms by changing the scale.
 *
 * @param scrollInfo {Number} The wheel scroll data from the event handler.
 */
CanvasWin.prototype.zoom = function ( scrollInfo ) {
	// Check the scroll direction
	if ( scrollInfo < 0 ) // scrolling up
		this.scale -= .5;
	else if ( scrollInfo > 0 ) // scrolling down
		this.scale += .5;

	// Set some limits
	if ( this.scale < this.defaultScale )
		this.scale = this.defaultScale;
	else if ( this.scale > 15 )
		this.scale = 15;
};

/**
 * Check to see if the canvas is hit at the passed X and Y.
 *
 * @param x {Number} The X location of the hit
 * @param y {Number} The Y location of the hit
 * @return {Boolean} Was the hit inside the canvas?
 */
CanvasWin.prototype.isHit = function ( x, y ) {
	var beingHit = false;

	// Check the boundaries of the canvas
	if ( (x > this.x && x < this.x+this.width) && (y > this.y && y < this.y+this.height) )
		beingHit = true;

	// Alter the border to show the current hit state
	if ( beingHit ) { // selected
		this.borderColor = "red";
		this.focusText.setFontWeight( "bold" );
		this.focusText.setFontColor( "red" );
		this.focusText.changeText( this.boldText );
	}
	else { // not selected
		this.borderColor = "black";
		this.focusText.setFontWeight( "normal" );
		this.focusText.setFontColor( "rgba(0,0,0,.2)" );
		this.focusText.changeText( this.lightText );
	}

	return beingHit;
};

/**
 * Reacquires the location and size of the canvas.
 */
CanvasWin.prototype.reacquireCanvasInfo = function ( ) {
	this.x = this.canvas.offsetLeft;
	this.y = this.canvas.offsetTop;
	this.width = this.canvas.offsetWidth;
	this.height = this.canvas.offsetHeight;
};
