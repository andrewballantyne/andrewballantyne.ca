/**
 * A PreLoader object that will preload all the images, and prompt the canvas screen with a loading message.
 *
 * @param imageList {Array} The array of strings containing the path to the images
 * @param canvasID {String} The element ID for the canvas that gets the loading message
 */
function PreLoader ( imageList, canvasID ) {
	if ( imageList != undefined && canvasID != undefined )
		this.preLoaderInit( imageList, canvasID );
}

/**
 * Initialize the object; called when creating an object and not extending it.
 *
 * @param imageList {Array} The array of strings containing the path to the images
 * @param canvasID {String} The element ID for the canvas that gets the loading message
 */
PreLoader.prototype.preLoaderInit = function ( imageList, canvasID ) {
	// Create the drawable context
	this.canvas = document.getElementById( canvasID );
	this.context = this.canvas.getContext('2d');

	// Convert the imageList strings into Image objects
	this.imageList = new Array(imageList.length);
	for ( var i=0; i<imageList.length; i++ ) {
		this.imageList[i] = new Image();
		this.imageList[i].loaded = false;
		this.imageList[i].onload = function (e) { this.loaded = true; };
		this.imageList[i].src = imageList[i];
	}

	// The text changes as it loads
	this.textStageLimit = 4;
	this.textStages = new Array( this.textStageLimit );
	this.textStages[0] = "Loading Images";
	this.textStages[1] = "Loading Images .";
	this.textStages[2] = "Loading Images ..";
	this.textStages[3] = "Loading Images ...";
	this.textStage = 0;

	// Get current canvas details
	this.reacquireCanvasInfo();

	// Create the text object
	this.text = new GraphicalText( this.width/2, this.height/2, this.textStages[this.textStage] );
	this.text.setFontColor( "rgba(0,0,0,1)" );
	this.text.changeFontSize( 42 );

	// Render the page
	this.intervalTick();
};

/**
 * Handles the interval tick to show the loading text "moving", as well as test the status of the image loads
 *
 * @return {Boolean} Have all the images been loaded?
 */
PreLoader.prototype.intervalTick = function ( ) {
	// Clear the background
	this.context.fillStyle = "white";
	this.context.fillRect( .5, .5, this.width-1, this.height-1 );

	// Draw a border
	this.context.strokeStyle = "black";
	this.context.lineWidth = 2;
	this.context.strokeRect( .5, .5, this.width-1, this.height-1 );

	// Draw the loading text
	this.text.paint( this.context );

	// Move to the next text stage
	this.textStage++;
	if ( this.textStage == this.textStageLimit ) this.textStage -= this.textStageLimit; // reset

	// Change the text for the next paint
	this.text.changeText( this.textStages[this.textStage] );

	// Check to see if all the images are loaded
	var counter = 0;
	for ( var i=0; i<this.imageList.length; i++ ) {
		if ( this.imageList[i].loaded )
			counter++;
	}

	// Return true if all the images are loaded
	return ( this.imageList.length == counter );
};

/**
 * The means of which you extract the image object.
 *
 * @param imageName {String} The image name; eg. "imageName" of "images/imageName.png"
 * @return {Image} Returns the Image object
 */
PreLoader.prototype.getImage = function ( imageName ) {
	var fileExtention = 4; // assume a 4 character fileExtention; eg. ".png"

	// Run through the imageList and find the passed image name
	var nameStart;
	for ( var i=0; i<this.imageList.length; i++ ) {
		// Get the local "relative" string
		nameStart = this.imageList[i].src.length - imageName.length - fileExtention;

		// Check image
		if ( imageName == this.imageList[i].src.substring(nameStart,this.imageList[i].src.length-fileExtention) )
			return this.imageList[i]; // found image
	}
	return null; // didn't find image
};

/**
 * Reacquires the location and size of the canvas.
 */
PreLoader.prototype.reacquireCanvasInfo = function ( ) {
	this.x = this.canvas.offsetLeft;
	this.y = this.canvas.offsetTop;
	this.width = this.canvas.offsetWidth;
	this.height = this.canvas.offsetHeight;
};