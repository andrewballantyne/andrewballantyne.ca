
function Slider ( x, y, width, steps, image, text ) {
	if ( x != undefined && y != undefined && width != undefined && steps != undefined && image != undefined && text != undefined )
		this.sliderInit( x, y, width, steps, image, text );
}

Slider.prototype.sliderInit = function ( x, y, width, steps, image, text ) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.steps = steps;
	this.image = image;
	this.textObj = new GraphicalText( this.x+this.width/2, this.y+10, text );
	this.textObj.setFontColor( "black" );
	this.textObj.setFontWeight( "bold" );

	// Defaults
	this.barColor = "rgba(0,0,0,1)";
	this.barHeight = 5;
	this.imageRadius = 16;
	this.textDisplacement = 20;
};

Slider.prototype.paint = function ( c ) {
	// Render the text
	this.textObj.paint( c );

	// Draw the slider bar with rounded ends
	c.fillStyle = this.barColor;
	c.beginPath();
	var cornerRadius = this.barHeight / 2;
	var currentX = this.x + cornerRadius;
	var currentY = this.y + (this.imageRadius) - cornerRadius + this.textDisplacement;
	c.moveTo( currentX, currentY );
	currentX = this.x + this.width - cornerRadius;
	c.lineTo( currentX, currentY );
	currentY = this.y + (this.imageRadius) + this.textDisplacement;
	c.arc( currentX, currentY, cornerRadius, 270/Math.RAD2DEG, 0/Math.RAD2DEG, false );
	c.arc( currentX, currentY, cornerRadius, 0/Math.RAD2DEG, 90/Math.RAD2DEG, false );
	currentX = this.x - cornerRadius;
	currentY = this.y + (this.imageRadius) + cornerRadius + this.textDisplacement;
	c.lineTo( currentX, currentY );
	currentY = this.y + (this.imageRadius) + this.textDisplacement;
	c.arc( currentX, currentY, cornerRadius, 90/Math.RAD2DEG, 180/Math.RAD2DEG, false );
	c.arc( currentX, currentY, cornerRadius, 180/Math.RAD2DEG, 270/Math.RAD2DEG, false );
	c.closePath();
	c.fill();

	// Draw the slider ball
	currentX = this.x + (this.width / 2) - (this.imageRadius);
	currentY = this.y + this.textDisplacement;
	c.drawImage( this.image, currentX, currentY, this.imageRadius*2, this.imageRadius*2 );
};
