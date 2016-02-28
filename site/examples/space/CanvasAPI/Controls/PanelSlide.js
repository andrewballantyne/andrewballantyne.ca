/**
 * A sliding pane that acts as a panel attached to the side.
 *
 * @param x {Number} The X location of the panel once it's visible
 * @param y {Number} The Y location of the panel once it's visible
 * @param width {Number} The width of the panel
 * @param height {Number} The height of the panel
 * @param titleText {String} The title text for the panel (ie, the header text)
 */
function PanelSlide ( x, y, width, height, titleText ) {
	if ( x != undefined && y != undefined && width != undefined && height != undefined && titleText != undefined )
		this.panelSlideInit( x, y, width, height, titleText );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param x {Number} The X location of the panel once it's visible
 * @param y {Number} The Y location of the panel once it's visible
 * @param width {Number} The width of the panel
 * @param height {Number} The height of the panel
 * @param titleText {String} The title text for the panel (ie, the header text)
 */
PanelSlide.prototype.panelSlideInit = function ( x, y, width, height, titleText ) {
	this.x = x - width;
	this.y = y;
	this.width = width;
	this.height = height;
	this.titleText = titleText;

	this.cornerRadius = 30;
	this.bgColor = "rgba(230,230,230,.9)";
	this.borderColor = "rgba(0,0,150,1)";
	this.textColor = 'rgba(0,0,200,1)';
	this.state = "hiding"; // hiding, slidingOut, slidingIn, showing
	this.slideDuration = 10; // 10 intervals of the timerTick to do a full duration
	this.data = new Array();
	this.timer = 0;
};

/**
 * Renders the Panel and it's text at the current location.
 *
 * @param c {2DContext} The 2D drawing context
 */
PanelSlide.prototype.paint = function ( c ) {
	// Draw a "top-right rounded corner" panel
	c.beginPath();
	var x = this.x;
	var y = this.y;
	c.moveTo( x, y );
	x = this.x + this.width - this.cornerRadius;
	c.lineTo( x, y );
	y = this.y + this.cornerRadius;
	c.arc( x, y, this.cornerRadius, 270/Math.RAD2DEG, 0/Math.RAD2DEG, false );
	x = this.x + this.width;
	y = this.y + this.cornerRadius + this.height;
	c.lineTo( x, y );
	x = this.x;
	c.lineTo( x, y );
	c.closePath();

	// Fill in the background
	c.fillStyle = this.bgColor;
	c.fill();

	// Stroke a border
	c.lineWidth = 2;
	c.strokeStyle = this.borderColor;
	c.stroke();

	// Assign/create a few important variables
	c.fillStyle = this.textColor;
	c.textAlign = "left";
	c.textBaseline = "top";
	var borderBuffer = 20;
	var lineStart = borderBuffer;
	var text, xLocation, yLocation;

	// Print the title of the panel
	text = new BText( this.titleText );
	text.changeFontSize( 18 );
	text.setFontWeight( "bold" );
	c.font = text.getFont();
	xLocation = this.x + borderBuffer;
	yLocation = this.y + lineStart;
	c.fillText( text.getText(), xLocation, yLocation, this.width );
	lineStart += text.getTextHeight() * 4;

	// Underline the text
	c.lineWidth = 2;
	c.strokeStyle = this.textColor;
	c.beginPath();
	c.moveTo( this.x+borderBuffer, this.y+text.getTextHeight()-5+borderBuffer );
	c.lineTo( this.x+borderBuffer+text.getTextWidth(c), this.y+text.getTextHeight()-5+borderBuffer );
	c.closePath();
	c.stroke();

	// Run through all the data and print out each line
	for ( var i=0; i<this.data.length; i++ ) {
		// Create a text object to handle the finer details of text styling
		text = new BText( this.data[i] );
		text.changeFontSize( 14 );
		c.font = text.getFont();

		// Position the new line of text
		xLocation = this.x + borderBuffer;
		yLocation = this.y + lineStart / 2;
		lineStart += text.getTextHeight() * 2;

		// Render the text
		c.fillText( text.getText(), xLocation, yLocation, this.width );
	}
};

/**
 * Push new data to the panel.
 *
 * @param data {String} The array (if more than one) of strings that will display the text; one paragraph per string
 */
PanelSlide.prototype.setData = function ( data ) {
	if ( data instanceof Array )
		this.data = data;
	else
		this.data = new Array(data);
};

/**
 * Handles the timer tick to render the slide motion.
 */
PanelSlide.prototype.timerTick = function ( ) {
	if ( this.state == "slidingOut" ) {
		this.x += this.width/this.slideDuration;
		if ( this.x >= 0 ) {
			this.x = 0;
			this.state = "showing";
		}
	}
	else if ( this.state == "slidingIn" ) {
		this.x -= this.width/this.slideDuration;
		if ( this.x <= -this.width ) {
			this.x = -this.width;
			this.state = "hiding";
		}
	}
};

/**
 * Starts a slide. It will determine which direction to slide the panel based on it's current location.
 */
PanelSlide.prototype.startSlide = function ( ) {
	if ( this.state == "hiding" )
		this.state = "slidingOut";
	else if ( this.state == "showing" )
		this.state = "slidingIn";
};

/**
 * Check to see if the panel is hiding.
 *
 * @return {Boolean} Is it hiding?
 */
PanelSlide.prototype.isItHiding = function ( ) { return (this.state == "hiding"); };
/**
 * Check to see if the panel is showing.
 *
 * @return {Boolean} Is it showing?
 */
PanelSlide.prototype.isItShowing = function ( ) { return (this.state == "showing"); };
/**
 * Check to see if the panel is sliding.
 *
 * @return {Boolean} Is the panel sliding? (handles both in and out; no distinction between the two)
 */
PanelSlide.prototype.isItSliding = function ( ) { return (this.state == "slidingOut" || this.state == "slidingIn"); };
