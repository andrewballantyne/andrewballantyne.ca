/** Extend CanvasWin */
SpaceCanvasWin.prototype = new CanvasWin();
SpaceCanvasWin.prototype.constructor = SpaceCanvasWin;
SpaceCanvasWin.prototype.parent = CanvasWin.prototype;

/**
 * A space canvas window.
 *
 * @param canvasID {String} The document element ID for the canvas
 * @param preLoader {PreLoader} The preloader object holding onto the already loaded image data
 */
function SpaceCanvasWin ( canvasID, preLoader ) {
	if ( canvasID != undefined && preLoader != undefined )
		this.spaceCanvasWinInit( canvasID, preLoader );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param canvasID {String} The document element ID for the canvas
 * @param preLoader {PreLoader} The preloader object holding onto the already loaded image data
 */
SpaceCanvasWin.prototype.spaceCanvasWinInit = function ( canvasID, preLoader ) {
	this.parent.canvasWinInit.call( this, canvasID );

	this.elapsedTime = 0;
	this.timerSpeed = 0;

	// Create controls
	this.solarSystem = new SolarSystem( this.width/2, this.height/2, preLoader );
	this.solarSystem.zoom( this.scale );
	this.btnStats = new BButton( 10, 10, 100, 25, "Stats" );
	this.btnStats.setBackgroundColor( "rgba(0,255,0,.8)" );
	this.btnStop = new BButton( 120, 10, 100, 25, "Pause/Play" );
	this.btnStop.setBackgroundColor( "rgba(255,255,0,.8)" );
	this.pnlStats = new PanelSlide( 0, 45, 300, this.height-45, "Planet Stats" );
//	var width = 150;
//	this.zoomSlider = new Slider( this.width-10-width, 10, width, 10, preLoader.getImage('sliderPlanet'), "Zoom" );
//	this.speedSlider = new Slider( this.width-10-width, 10+70, width, 10, preLoader.getImage('sliderPlanet'), "Speed" );

	// Create a bgImage
	this.bgImage = preLoader.getImage('bgImage');
};

/**
 * Renders the elements on the canvas.
 */
SpaceCanvasWin.prototype.paint = function ( ) {

	this.parent.clearScreen.call( this, 'white', ((this.bgImage.loaded) ? this.bgImage : undefined) );

	// Render the floating text
	this.focusText.paint( this.context );

	// Render the solar system
	this.solarSystem.paint( this.context );

	// Render the controls
	this.btnStats.paint( this.context );
	this.btnStop.paint( this.context );
	this.pnlStats.paint( this.context );
//	this.zoomSlider.paint( this.context );
//	this.speedSlider.paint( this.context );

	this.parent.paintBorder.call( this );
};

/**
 * Event handler for the left mouse press down.
 *
 * @param e {Event} The event handler
 * @return {String} The canvas ID if the event down was inside the canvas
 */
SpaceCanvasWin.prototype.mouseDown = function ( e ) {
	var focus = this.parent.mouseDown.call( this, e );

	if ( focus ) {
		// Get the local X and Y coordinates
		var x = e.pageX-this.x;
		var y = e.pageY-this.y;

		// Check to see if the stats button was hit
		if ( this.btnStats.isHit( x, y ) ) {
			this.btnStats.down( true );
			this.btnStats.pressed( true );
		}
		else if ( this.btnStop.isHit( x, y ) ) {
			this.btnStop.down( true );
			this.btnStop.pressed( true );
		}
	}

	return focus;
};

/**
 * Event handler for the left mouse press up.
 *
 * @param e {Event} The event handler
 * @return {String} A return effect ('timer' - stops timer);
 */
SpaceCanvasWin.prototype.mouseUp = function ( e ) {
	this.parent.mouseUp.call( this, e );

	var returnEffect = null;

	if ( this.btnStats.getPressedStatus() ) {
		if ( this.pnlStats.isItHiding() )
			this.pnlStats.startSlide();
		else if ( this.pnlStats.isItShowing() )
			this.pnlStats.startSlide();
		this.printStats();
	}
	else if ( this.btnStop.getPressedStatus() ) {
		returnEffect = 'timer';
	}

	this.btnStats.down( false );
	this.btnStats.pressed( false );
	this.btnStop.down( false );
	this.btnStop.pressed( false );

	return returnEffect;
};

/**
 * Event handler for the mouse move.
 *
 * @param e {Event} The event handler
 */
SpaceCanvasWin.prototype.mouseMove = function ( e ) {
	this.parent.mouseMove.call( this, e );

	// Get the local X and Y coordinates
	var x = e.pageX-this.x;
	var y = e.pageY-this.y;

	// Clear the hover selection
	this.btnStats.hover( false );
	this.btnStop.hover( false );

	// Find out if a button is being hovered over
	if ( this.btnStats.isHit( x, y ) )
		this.btnStats.hover( true );
	else if ( this.btnStop.isHit( x, y ) )
		this.btnStop.hover( true );
};

/**
 * Event handler for the mouse scroll wheel.
 *
 * @param e {Event} The event handler
 */
SpaceCanvasWin.prototype.mouseScroll = function ( e ) {
	this.parent.mouseScroll.call( this, e );

	this.solarSystem.zoom( this.scale );
};

/**
 * Handles the ticks for a timer.
 *
 * @param timerSpeed {Number} The speed of the timer
 */
SpaceCanvasWin.prototype.timerTick = function ( timerSpeed ) {
	this.elapsedTime += timerSpeed;
	this.timerSpeed = timerSpeed;

	// Check to see if the timer is still moving
	if ( timerSpeed > 0 )
		this.solarSystem.rotationTick();

	if ( this.pnlStats.isItSliding() )
		this.pnlStats.timerTick();
	else if ( this.pnlStats.isItShowing() && this.timerSpeed > 0 ) // timer is going and panel is showing
		this.printStats();
};

/**
 * Collates all the solar system information and sends it to the sliding panel.
 */
SpaceCanvasWin.prototype.printStats = function ( ) {
	var longString = "";

	// Format the scale
	longString += "Rotation speed: 1 second = 20 days.";
//	longString += "Rotation speed: 1 second = " + Math.roundToNearest(1000/this.timerSpeed,1) + " days.";

	// Calculate and format the timer stats
	var seconds = Math.roundToNearest(this.elapsedTime/1000,0);
	var minute = 0;
	var hour = 0;
	// Break up the time into sections
	while ( seconds >= 60 ) {
		// A minute has been reached
		seconds -= 60;
		minute++;

		// An hour has been reached
		if ( minute >= 60 ) {
			minute -= 60;
			hour++;
		}
	}
	var hours = "";
	if ( hour > 0 )
		hours = hour + ":";
	longString += "\n" + "Elapsed time: " + hours + Math.formatDigits(minute,2) + ":" + Math.formatDigits(seconds,2);

	// Get all the solar system data
	longString += "\n\n" + this.solarSystem.printStats();

	this.pnlStats.setData( Font.splitString( longString ) );
};

