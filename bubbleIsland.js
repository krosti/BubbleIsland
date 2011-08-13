var VERSION = '3.0.123';

function rnd(top){ return Math.floor(Math.random()*(top + 1))};

/*touchMove = function(event) {
	// Prevent scrolling on this element
	event.preventDefault();
}*/
function touchMove(event) {
	// Prevent scrolling on this element
	event.preventDefault();
}

Array.prototype.remove = function(data) {
	var i = 0; 
	var found = false;
	while((i < this.length) && !found){
		if(this[i] == data){
			this.splice(i, 1);
			found = true;
		}else{
			i++;
		};
	};
};



//debug
var console;
function setDebugEnv(elem){
	console = '#' + elem;
};
function debug(txt){
	$(console).html("" + $(console).text() + txt + "<br>");
};

//bubbles
var bubbleBlueImage = new Image();
var bubbleRedImage = new Image();
var bubbleGreenImage = new Image();
var bubblePurpleImage = new Image();
var bubbleYellowImage = new Image();
var bubbleBlueBombImage = new Image();
var bubbleRedBombImage = new Image();
var bubbleGreenBombImage = new Image();
var bubblePurpleBombImage = new Image();
var bubbleYellowBombImage = new Image();
var bubbleBlueHalfImage = new Image();
var bubbleRedHalfImage = new Image();
var bubbleGreenHalfImage = new Image();
var bubblePurpleHalfImage = new Image();
var bubbleYellowHalfImage = new Image();
var bubbleBlueFreezeImage = new Image();
var bubbleRedFreezeImage = new Image();
var bubbleGreenFreezeImage = new Image();
var bubblePurpleFreezeImage = new Image();
var bubbleYellowFreezeImage = new Image();
var bubbleBlueImageX2 = new Image();
var bubbleRedImageX2 = new Image();
var bubbleGreenImageX2 = new Image();
var bubblePurpleImageX2 = new Image();
var bubbleYellowImageX2 = new Image();
var bubbleBlueImageX3 = new Image();
var bubbleRedImageX3 = new Image();
var bubbleGreenImageX3 = new Image();
var bubblePurpleImageX3 = new Image();
var bubbleYellowImageX3 = new Image();

//ingame animations
var bubbleExplode = new Image();
var bubbleEstela = new Image();
var bubbleBombExplode = new Image();
var bubbleFreezeExplode = new Image();
var bubbleMultiColorExplode = new Image();
var bubbleX2Explode = new Image();
var bubbleX3Explode = new Image();
var bubbleTrace = new Image();

var uiPandaBag = new Image();
var uiPanda = new Image();
var uiCannon = new Image();
var uiCannonShoot = new Image();

var lvlFrame = new Image();
var backgroundImage = new Image();
var initImage = new Image();
var logoImage = new Image();

//interfaz
var uiLevelFrame = new Image();
var uiLifeFrame = new Image();
var uiPointsFrame = new Image();
var uiMultiCountFrame = new Image();
var uiBombCountFrame = new Image();
var uiFreezeCountFrame = new Image();

var uiLooseFrame = new Image();
var uiWinFrame = new Image();
var uiWinContinueButton = new Image();
var uiLoseContinueButton = new Image();
var uiFinishAdd = new Image();
/*var uiFinishContinue = new Image();
var uiFinishMenu = new Image();*/

var uiOptionButton = new Image();
var uiNewButton = new Image();
var uiContinueButton = new Image();
var uiBackButton = new Image();
var uiLoadingScreen = new Image();

var uiLeaderboardScreen = new Image();
var uiLeaderboardMenu = new Image();
var uiLeaderboardHighscore = new Image();
var uiLeaderboardFriends = new Image();
var uiLeaderboardStar = new Image();

var uiOptionsBackground = new Image();
var uiOptionsMenu = new Image();
var uiOptionsVolumenOn = new Image();
var uiOptionsVolumenOff = new Image();
var uiOptionsFacebook = new Image();
var uiOptionsLeaderboard = new Image();
var uiOptionsCoins = new Image();
var uiOptionsLogout = new Image();

var uiAlertScreen = new Image();
var uiAlertButton = new Image();

var uiHighscoreScreen = new Image();
var uiHighscoreButton = new Image();

var uiPauseButton = new Image();
var uiPauseCartel = new Image();

var facebookScreen = new Image();
var facebookButton = new Image();

var uiNoInetErrorScreen = new Image();
var uiNoInetErrorButton = new Image();

var uiNoFaceErrorScreen = new Image();
var uiNoFaceErrorButton = new Image();

var uiResolutionErrorScreen = new Image();
var uiResolutionErrorButton = new Image();
/*var uiErrorScreen = new Image();
var uiErrorButton = new Image()*/

var uiEndGameScreen = new Image();
var uiEndGameButton1 = new Image();
var uiEndGameButton2 = new Image();

var game;
var cartel;
var frameBuffer;
var animNav;
var fps = 22;
var pointExplode = 10;
var pointDrop = 5;
var min_vel = .05;
var freezeTime = 10 //en segundos
var lifesPerCoins = 3;
var linesPerLevel = 5;

var bombValue = 5;
var freezeValue = 5;
var multiValue = 5;

var bombInit = 5;
var freezeInit = 5;
var multiInit = 5;

var specialCountBubbles = 1000;

var currentState = {
	level: 1,
	points: 0,
	state: 'waiting'
};

//var datafile;

/*APPID = '213255638692367';
APPKEY = '230bd48e2d38a991fe41e284887db3d8';*/


function bubble(l){
	this.lvl = l;
	this.flavor = "nula";
	this.marked = false;
	this.i = -1; //position in the array
	this.j = -1;//position in the array
	this.x = -1; //position in the canvas
	this.y = -1; //position in the canvas
	this.dx = 0; //incremental in the x direction
	this.dy = 0; //incremental in the x direction
	this.meinBild = new Image();
	//this.object = null;
	this.element = document.createElement('div');
	//this.meinBild.src = 'bubble.png';

	this.secondFlavor = '';
	this.freezeBall = false;
	this.bombBall = false;
	this.wasDetonated = false;
	this.pointsMultiplier = 1;

	this.makeElement = function(){
		var fragment = document.createDocumentFragment();
		//this.element.style.backgroundImage = 'url(' + this.meinBild.src + ')';
		this.element.style.height = this.lvl.bubbleRadius + 'px';	
		this.element.style.width = this.lvl.bubbleRadius + 'px';
		this.element.style.overflow = 'hidden';
		this.element.style.position = 'absolute';
		var baseElement = document.createElement('img');
		baseElement.src = this.meinBild.src;
		baseElement.style.position = 'absolute';
		baseElement.style.top = '0px';
		baseElement.style.left = '0px';
		baseElement.style.overflow = 'hidden';
		baseElement.style.width = this.lvl.bubbleRadius + 'px';
		baseElement.style.height = this.lvl.bubbleRadius + 'px';
		baseElement.style.minHeight = this.lvl.bubbleRadius + 'px';
		fragment.appendChild(this.element);
		this.element.appendChild(baseElement);
		if(this.secondFlavor != ''){
			var zweithBild = new Image();				
			switch(this.secondFlavor){
				case 'blue':
					zweithBild.src = bubbleBlueHalfImage.src;
					break;
				case 'green':
					zweithBild.src = bubbleGreenHalfImage.src;
					break;
				case 'red':
					zweithBild.src = bubbleRedHalfImage.src;
					break;
				case 'purple':
					zweithBild.src = bubblePurpleHalfImage.src;
					break;
				case 'yellow':
					zweithBild.src = bubbleYellowHalfImage.src;
					break;
			};
			var baseElement2 = document.createElement('img');
			baseElement2.src = zweithBild.src;
			baseElement2.style.position = 'absolute';
			baseElement2.style.top = '0px';
			baseElement2.style.left = '0px';
			baseElement2.style.overflow = 'hidden';
			baseElement2.style.width = this.lvl.bubbleRadius + 'px';
			baseElement2.style.height = this.lvl.bubbleRadius + 'px';
			baseElement2.style.minHeight = this.lvl.bubbleRadius + 'px';
			this.element.appendChild(baseElement2);
		};

	};

	this.makeItRandomNormal = function(){
		this.flavor = this.randomFlavor();
		//this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
		//this.element = this.object.element;
		this.makeElement();
		$(this.element).addClass('bubble');
		//this.object.fitNormalImage();
	};

	this.makeItMulti = function(){
		this.flavor = this.randomFlavor();
		do{
			this.secondFlavor = this.randomFlavor(true);
		}while(this.flavor == this.secondFlavor);
		this.makeElement();
	};

	this.makeItBomb = function(){
		this.flavor = this.randomBombFlavor();
		this.makeElement();
		this.bombBall = true;
	};

	this.makeItFreeze = function(){
		this.flavor = this.randomFreezeFlavor();
		this.makeElement();
		this.freezeBall = true;
	};

	this.makeItRandom = function(){
		var value = rnd(specialCountBubbles) / 10;
		if(value > this.lvl.bonus){
			this.flavor = this.randomFlavor();
			/*this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
			this.element = this.object.element;*/
			this.makeElement();
		}else{
			var second = rnd(18);
			if((second >= 0) && ( second <4)){
				this.flavor = this.randomX2Flavor();
				this.pointsMultiplier = 2;
				/*this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;	*/
				this.makeElement();
			};
			if((second >= 4) && ( second < 7)){
				this.flavor = this.randomX3Flavor();
				this.pointsMultiplier = 3;
				/*this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;	*/
				this.makeElement();
			};

			if((second >= 7) && ( second < 10)){
				this.flavor = this.randomBombFlavor();
				/*this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;*/
				this.makeElement();
				this.bombBall = true;
			};

			if((second >= 10) && ( second < 14)){
				this.flavor = this.randomFreezeFlavor();
				/*this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;*/
				this.makeElement();
				this.freezeBall = true;
			};

			if((second >= 14) && ( second <= 18)){
				this.flavor = this.randomFlavor();
				/*this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				this.element = this.object.element;*/
				do{
					this.secondFlavor = this.randomFlavor();
				}while(this.flavor == this.secondFlavor);
				this.makeElement();
			};
		};

		//this.object.fitNormalImage();
		$(this.element).addClass('bubble');
		this.element.style.overflow = 'show'
	};

	this.randomFlavor = function(isSecond){
		var flavor;
		var value = rnd(4);
		var second = (isSecond ? isSecond : false);
		switch (value){
			case 0:
				flavor = "blue"; 
				if(!second) this.meinBild = bubbleBlueImage;
				break;
			case 1:
				flavor = "yellow"; 
				if(!second) this.meinBild = bubbleYellowImage;
				break;
			case 2:
				flavor = "purple"; 
				if(!second) this.meinBild = bubblePurpleImage;
				break;
			case 3:
				flavor = "red"; 
				if(!second) this.meinBild = bubbleRedImage;
				break;
			case 4:
				flavor = "green";
				if(!second) this.meinBild = bubbleGreenImage;
				break;
		};
		return flavor;
	};	

	this.randomFreezeFlavor = function(){
		var flavor;
		var value = rnd(4);
		switch (value){
			case 0:
				flavor = "blue"; 
				this.meinBild = bubbleBlueFreezeImage;
				break;
			case 1:
				flavor = "yellow"; 
				this.meinBild = bubbleYellowFreezeImage;
				break;
			case 2:
				flavor = "purple"; 
				this.meinBild = bubblePurpleFreezeImage;
				break;
			case 3:
				flavor = "red"; 
				this.meinBild = bubbleRedFreezeImage;
				break;
			case 4:
				flavor = "green";
				this.meinBild = bubbleGreenFreezeImage;
				break;
		};
		return flavor;
	};

	this.randomBombFlavor = function(){
		var flavor;
		var value = rnd(4);
		switch (value){
			case 0:
				flavor = "blue"; 
				this.meinBild = bubbleBlueBombImage;
				break;
			case 1:
				flavor = "yellow"; 
				this.meinBild = bubbleYellowBombImage;
				break;
			case 2:
				flavor = "purple"; 
				this.meinBild = bubblePurpleBombImage;
				break;
			case 3:
				flavor = "red"; 
				this.meinBild = bubbleRedBombImage;
				break;
			case 4:
				flavor = "green";
				this.meinBild = bubbleGreenBombImage;
				break;
		};
		return flavor;
	};

	this.randomX2Flavor = function(){
		var flavor;
		var value = rnd(4);
		switch (value){
			case 0:
				flavor = "blue"; 
				this.meinBild = bubbleBlueImageX2;
				break;
			case 1:
				flavor = "yellow"; 
				this.meinBild = bubbleYellowImageX2;
				break;
			case 2:
				flavor = "purple"; 
				this.meinBild = bubblePurpleImageX2;
				break;
			case 3:
				flavor = "red"; 
				this.meinBild = bubbleRedImageX2;
				break;
			case 4:
				flavor = "green";
				this.meinBild = bubbleGreenImageX2;
				break;
		};
		return flavor;
	};

	this.randomX3Flavor= function(){
		var flavor;
		var value = rnd(4);
		switch (value){
			case 0:
				flavor = "blue"; 
				this.meinBild = bubbleBlueImageX3;
				break;
			case 1:
				flavor = "yellow"; 
				this.meinBild = bubbleYellowImageX3;
				break;
			case 2:
				flavor = "purple"; 
				this.meinBild = bubblePurpleImageX3;
				break;
			case 3:
				flavor = "red"; 
				this.meinBild = bubbleRedImageX3;
				break;
			case 4:
				flavor = "green";
				this.meinBild = bubbleGreenImageX3;
				break;
		};
		return flavor;
	};

	this.serialize = function(){
		var ich = {};
		ich.flavor = this.flavor;
		ich.marked = this.marked;
		ich.i = this.i;
		ich.j = this.j;
		ich.x = this.x;
		ich.y = this.y;
		ich.dx = this.dx
		ich.dy = this.dy;		
		ich.secondFlavor = this.secondFlavor;
		ich.freezeBall = this.freezeBall;
		ich.bombBall = this.bombBall;
		ich.wasDetonated = this.wasDetonated
		ich.pointsMultiplier = this.pointsMultiplier;
		return ich;
	};

	this.unserialize = function(ich){
		if(ich == null) return null;
		this.flavor = ich.flavor;
		this.marked = ich.marked;
		this.i = ich.i;
		this.j = ich.j;
		this.x = ich.x;
		this.y = ich.y;
		this.dx = ich.dx
		this.dy = ich.dy;		
		this.secondFlavor = ich.secondFlavor;
		this.freezeBall = ich.freezeBall;
		this.bombBall = ich.bombBall;
		this.wasDetonated = ich.wasDetonated
		this.pointsMultiplier = ich.pointsMultiplier;
		//armo el html
		if(this.freezeBall){
			switch (this.flavor){
				case "blue":
					this.meinBild = bubbleBlueFreezeImage;
					break;
				case "yellow":
					this.meinBild = bubbleYellowFreezeImage;
					break;
				case "purple":
					this.meinBild = bubblePurpleFreezeImage;
					break;
				case "red":
					this.meinBild = bubbleRedFreezeImage;
					break;
				case "green":
					this.meinBild = bubbleGreenFreezeImage;
					break;
			};			
		};

		if(this.bombBall){
			switch (this.flavor){
				case "blue":
					this.meinBild = bubbleBlueBombImage;
					break;
				case "yellow":
					this.meinBild = bubbleYellowBombImage;
					break;
				case "purple":
					this.meinBild = bubblePurpleBombImage;
					break;
				case "red":
					this.meinBild = bubbleRedBombImage;
					break;
				case "green":
					this.meinBild = bubbleGreenBombImage;
					break;
			};			
		};

		if(this.pointsMultiplier == 2){
			switch (this.flavor){
				case "blue":
					this.meinBild = bubbleBlueImageX2;
					break;
				case "yellow":
					this.meinBild = bubbleYellowImageX2;
					break;
				case "purple":
					this.meinBild = bubblePurpleImageX2;
					break;
				case "red":
					this.meinBild = bubbleRedImageX2;
					break;
				case "green":
					this.meinBild = bubbleGreenImageX2;
					break;
			};			
		};

		if(this.pointsMultiplier == 3){
			switch (this.flavor){
				case "blue":
					this.meinBild = bubbleBlueImageX3;
					break;
				case "yellow":
					this.meinBild = bubbleYellowImageX3;
					break;
				case "purple":
					this.meinBild = bubblePurpleImageX3;
					break;
				case "red":
					this.meinBild = bubbleRedImageX3;
					break;
				case "green":
					this.meinBild = bubbleGreenImageX3;
					break;
			};			
		};



		if(this.secondFlavor != ''){
			switch(this.secondFlavor){
				case 'blue':
					zweithBild.src = bubbleBlueHalfImage.src;
					break;
				case 'green':
					zweithBild.src = bubbleGreenHalfImage.src;
					break;
				case 'red':
					zweithBild.src = bubbleRedHalfImage.src;
					break;
				case 'purple':
					zweithBild.src = bubblePurpleHalfImage.src;
					break;
				case 'yellow':
					zweithBild.src = bubbleYellowHalfImage.src;
					break;
			};			
		};

		if(this.meinBild.src == ''){ // normal
			switch (this.flavor){
				case "blue":
					this.meinBild = bubbleBlueImage;
					break;
				case "yellow":
					this.meinBild = bubbleYellowImage;
					break;
				case "purple":
					this.meinBild = bubblePurpleImage;
					break;
				case "red":
					this.meinBild = bubbleRedImage;
					break;
				case "green":
					this.meinBild = bubbleGreenImage;
					break;
			};
		};
		this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
		this.element = this.object.element;
		$(this.element).addClass('bubble');
		if(this.secondFlavor != ''){
			var zweithBild = document.createElement('img');				
			this.object.element.appendChild(zweithBild);
			zweithBild.style.width = this.lvl.bubbleRadius + 'px';
			zweithBild.style.heigth = (this.lvl.bubbleRadius / 2) + 'px';
			zweithBild.style.position = 'absolute';
			zweithBild.style.top = '0px';
			zweithBild.style.left = '0px';
		};
		this.element.style.top = this.y + 'px';
		this.element.style.left = this.x + 'px';
		animNav.append(this.element);
	};

	this.move = function(){
		if((this.dx == 0) && (this.dy == 0)) return;
		this.x += this.dx;
		this.y += this.dy;

		if(this.x <= this.lvl.leftBound) this.x = this.lvl.leftBound;
		//if(this.x > this.lvl.width) this.x = this.lvl.width;
		this.element.style.top = this.y + 'px';
		this.element.style.left = this.x + 'px';

		if((this.x == this.lvl.leftBound) || (this.x >= this.lvl.width)) this.dx = -this.dx;
		//if((currentBubble.dx == 0) || (currentBubble.dy == this.lvl.bubbleVelocity)) alert('es un hijo de puta a fuera: ' + culo);
		if(this.y < (this.lvl.topBound + this.lvl.currentTop)){
			var currentBubble = this;
			/*if((currentBubble.dx == 0) || (currentBubble.dy == this.lvl.bubbleVelocity)) alert('es un hijo de puta antes de arrancar1: ' + culo);
			this.lvl.mutex = true;
			game.clock.stop();
			var inPlace = false;
			
			this.lvl.shootedBubble = null;
			this.lvl.cannon.currentBubble = null
			if((currentBubble.dx == 0) || (currentBubble.dy == this.lvl.bubbleVelocity)) alert('es un hijo de puta antes de arrancar2: ' + culo);
			var delta = this.lvl.grilla.isShortRow(0) * (this.lvl.bubbleRadius / 2);
			delta = delta / 2;
			var culo = 0;
			do{					
				//currentBubble.j = Math.floor(((currentBubble.x + ( currentBubble.lvl.bubbleRadius / 2)) - currentBubble.lvl.leftBound) / currentBubble.lvl.bubbleRadius);

				currentBubble.j = Math.floor((((currentBubble.x + delta) - currentBubble.lvl.leftBound) + ( currentBubble.lvl.bubbleRadius / 2)) / currentBubble.lvl.bubbleRadius);
				currentBubble.i = 0;
				inPlace = (currentBubble.lvl.grilla.Table[currentBubble.i][currentBubble.j] == 'vacio');
				currentBubble.x -= (currentBubble.dx / 4);
				currentBubble.y -= (currentBubble.dy / 4);
				if((currentBubble.x <= currentBubble.lvl.leftBound) || (currentBubble.x >= currentBubble.lvl.width)) currentBubble.dx = -currentBubble.dx;
				if((currentBubble.dx == 0) || (currentBubble.dy == this.lvl.bubbleVelocity)) alert('es un hijo de puta: ' + culo);
				culo++;
			}while(!inPlace);		
			//alert('stop');
			this.stopMove();
			this.recalcXY();
			this.y += this.lvl.currentTop;
			this.dy = this.lvl.bubbleVelocity;			
			this.lvl.addBubble(this);
			this.lvl.grilla.Table[this.i][this.j] = this;
			var c = this.lvl.grilla.checkForCompatibility(this, this);
			//debug('    c   :' + c + '   ');
			//this.lvl.mutex = true;
			if(c >= 3){				
				//alert(c);
				var mult = this.pointsMultiplier;
				this.lvl.pointsMultiplier =  c * c * pointExplode * mult;
				//alert(this.lvl.pointsMultiplier);
				this.lvl.grilla.exploded = c;
				this.lvl.grilla.explodeMarked();			
				this.lvl.addPoints();
				this.lvl.pointsMultiplier = pointDrop * mult;
				this.lvl.grilla.checkForOrphans();
			}else{				
				this.lvl.grilla.clearMarks();
			};
			this.lvl.grilla.touchedBubbles = null;
			this.lvl.grilla.touchedBubbles = new Array();*/

			/*this.lvl.mutex = true;
			game.clock.stop();
			var inPlace = false;
			
			this.lvl.shootedBubble = null;
			this.lvl.cannon.currentBubble = null
			var delta = this.lvl.grilla.isShortRow(0) * (this.lvl.bubbleRadius / 2);
			delta = delta / 2;
			currentBubble.j = Math.floor((((currentBubble.x + delta) - currentBubble.lvl.leftBound) + ( currentBubble.lvl.bubbleRadius / 2)) / currentBubble.lvl.bubbleRadius);
			currentBubble.i = 0;
			inPlace = (currentBubble.lvl.grilla.Table[currentBubble.i][currentBubble.j] == 'vacio');

			if(!inPlace){
				//var me = this;
				//this.lvl.shootedBubble = null;
				//this.lvl.setReadyShoot();
				this.lvl.grilla.addBubble(currentBubble, [{bubble: this.lvl.grilla.Table[this.i][this.j], dis: 0}]);
				currentBubble.stopMove();
				currentBubble.dy = currentBubble.lvl.bubbleVelocity;
				this.lvl.addBubble(currentBubble);
			}else{
				this.stopMove();
				this.recalcXY();
				this.y += this.lvl.currentTop;
				this.dy = this.lvl.bubbleVelocity;			
				this.lvl.addBubble(this);
				this.lvl.grilla.Table[this.i][this.j] = this;				
			};

			var c = this.lvl.grilla.checkForCompatibility(this, this);
			//debug('    c   :' + c + '   ');
			this.lvl.mutex = true;
			if(c >= 3){				
				//alert(c);
				var mult = this.pointsMultiplier;
				this.lvl.pointsMultiplier =  c * c * pointExplode * mult;
				//alert(this.lvl.pointsMultiplier);
				this.lvl.grilla.exploded = c;
				this.lvl.grilla.explodeMarked();			
				this.lvl.addPoints();
				this.lvl.pointsMultiplier = pointDrop * mult;
				this.lvl.grilla.checkForOrphans();
			}else{				
				this.lvl.grilla.clearMarks();
			};
			this.lvl.grilla.touchedBubbles = null;
			this.lvl.grilla.touchedBubbles = new Array();

			this.lvl.shootedBubble = null;

			this.lvl.setReadyShoot();

			game.clock.start();
			this.lvl.mutex = false;*/
		}; 
	};
	
	this.moveShooted = function(){
		if((this.dx == 0) && (this.dy == 0)) return;
		this.x += this.dx;
		this.y += this.dy;

		if(this.x <= this.lvl.leftBound) this.x = this.lvl.leftBound;
		//if(this.x > this.lvl.width) this.x = this.lvl.width;
		this.element.style.top = this.y + 'px';
		this.element.style.left = this.x + 'px';

		if((this.x == this.lvl.leftBound) || (this.x >= this.lvl.width)){
			this.dx = -this.dx;
			//soundengine.reproduceSound('bounce');
		};
		//if((currentBubble.dx == 0) || (currentBubble.dy == this.lvl.bubbleVelocity)) alert('es un hijo de puta a fuera: ' + culo);
		if(this.y < (this.lvl.topBound + this.lvl.currentTop)){
			var currentBubble = this;
		}; 
		//add trace img
		var trace = document.createElement('img');
		trace.src = bubbleTrace.src;
		trace.style.position = 'fixed';
		trace.style.top = (this.y + ((this.lvl.bubbleRadius - this.lvl.traceRadius) / 2)) + 'px';
		trace.style.left = (this.x + ((this.lvl.bubbleRadius - this.lvl.traceRadius) / 2)) + 'px';
		trace.style.width = this.lvl.traceRadius + 'px'
		trace.style.height = this.lvl.traceRadius + 'px'
		//$(trace).addClass('trace');
		animNav.append(trace);
		this.lvl.traces.push(trace);
	};

	this.draw = function(painter){
		//hacer calculos
		//painter.drawImage(this.meinBild, Math.floor(this.x), Math.floor(this.y), this.lvl.bubbleRadius, this.lvl.bubbleRadius);
		painter.drawImage(this.meinBild, this.x, this.y, this.lvl.bubbleRadius, this.lvl.bubbleRadius);
		//painter.drawImage(this.meinBild, this.x, this.y);
		//painter.drawImage(this.meinBild, this.x, this.y, 28, 28);
	};

	this.stopMove = function(){
		//back off
		//this.x = this.x - (this.dx / 2);
		//this.y = this.y - (this.dy / 2);
		//stop moving
		this.dx = 0;
		this.dy = 0;
		//soundengine.reproduceSound('hit');
		return; 
	};

	this.equalBubble = function(bubble){
		var equal = (bubble.flavor == this.flavor);
		if(bubble.secondFlavor != ''){
			equal = equal || (bubble.secondFlavor == this.flavor);		
		};

		if(this.secondFlavor != ''){
			equal = equal || (this.secondFlavor == bubble.flavor);		
		};

		if(this.secondFlavor != ''){
			equal = equal || (this.secondFlavor == bubble.secondFlavor);		
		};

		return equal;
	};

	this.recalcXY = function(){
		//h = Math.sqrt((this.lvl.bubbleRadius*this.lvl.bubbleRadius) - ((this.lvl.bubbleRadius / 2) * (this.lvl.bubbleRadius / 2)));
		var delta = this.lvl.grilla.isShortRow(this.i) * (this.lvl.bubbleRadius / 2);
		this.x = this.j * (this.lvl.bubbleRadius) + delta;
		//this.y = ((this.lvl.grilla.alto - this.i) * h);
		this.y = (this.i * this.lvl.h);
		this.x += this.lvl.leftBound;
		this.y += this.lvl.topBound;
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.element.style.top = this.y + 'px';
		this.element.style.left = this.x + 'px';
		//alert(this.x + ' : ' + this.y);*/
	};

	this.recalcXYfrom = function(thisBubble){
		this.recalcXY();
		//h = Math.sqrt((this.lvl.bubbleRadius*this.lvl.bubbleRadius) - ((this.lvl.bubbleRadius / 2) * (this.lvl.bubbleRadius / 2)));
		y = (thisBubble.i * this.lvl.h) + this.lvl.topBound;
		this.y += thisBubble.y - y; 
		this.y = Math.floor(this.y);
		this.element.style.top = this.y + 'px';
		this.element.style.left = this.x + 'px';
	};

	this.isMoving = function(){
		//debug(((this.dx == 0) && (this.dy == 0)));
		return ((this.dx != 0) || (this.dy) != 0);
	};

	this.explode = function(){
		//do explode animation and remove element
		//this.object.animationEnds = this.removeBubble;
		var anim = '';
		this.lvl.pointsMade = true;
		if(this.freezeBall){
			anim = new Animation(14, bubbleFreezeExplode.width / 14, bubbleFreezeExplode.height, bubbleFreezeExplode.src);		
			anim.element.style.position = 'absolute';
			anim.element.style.top = ( (game.height / 2) - (bubbleFreezeExplode.height / 2)) + 'px';
			anim.element.style.left = ( (game.width / 2)  - ((bubbleFreezeExplode.width / 14) / 2)) + 'px';
			this.lvl.specialPointsMade = true;
		};

		if(this.wasDetonated){
			anim = new Animation(14, bubbleBombExplode.width / 14, bubbleBombExplode.height, bubbleBombExplode.src);		
			anim.element.style.position = 'absolute';
			anim.element.style.top = ((this.y + (this.lvl.bubbleRadius / 2) ) - (bubbleBombExplode.height / 2)) + 'px';
			anim.element.style.left = ((this.x + (this.lvl.bubbleRadius / 2) ) - ((bubbleBombExplode.width / 14) / 2)) + 'px';
			this.lvl.specialPointsMade = true;
		};

		if(this.secondFlavor != ''){
			anim = new Animation(7, bubbleMultiColorExplode.width / 7, bubbleMultiColorExplode.height, bubbleMultiColorExplode.src);		
			anim.element.style.position = 'absolute';
			anim.element.style.top = ((this.y + (this.lvl.bubbleRadius / 2) ) - (bubbleMultiColorExplode.height / 2)) + 'px';
			anim.element.style.left = ((this.x + (this.lvl.bubbleRadius / 2) ) - ((bubbleMultiColorExplode.width / 14) / 2)) + 'px';
			this.lvl.specialPointsMade = true;
		};

		if(this.pointsMultiplier == 2){			
			anim = new Animation(7, bubbleX2Explode.width / 7, bubbleX2Explode.height, bubbleX2Explode.src);		
			anim.element.style.position = 'absolute';
			anim.element.style.top = ((this.y + (this.lvl.bubbleRadius / 2) ) - (bubbleX2Explode.height / 2)) + 'px';
			anim.element.style.left = ((this.x + (this.lvl.bubbleRadius / 2) ) - ((bubbleX2Explode.width / 7) / 2)) + 'px';
			this.lvl.specialPointsMade = true;
		};

		if(this.pointsMultiplier == 3){			
			anim = new Animation(7, bubbleX3Explode.width / 9, bubbleX3Explode.height, bubbleX3Explode.src);		
			anim.element.style.position = 'absolute';
			anim.element.style.top = ((this.y + (this.lvl.bubbleRadius / 2) ) - (bubbleX3Explode.height / 2)) + 'px';
			anim.element.style.left = ((this.x + (this.lvl.bubbleRadius / 2) ) - ((bubbleX3Explode.width / 9) / 2)) + 'px';
			this.lvl.specialPointsMade = true;
		};	

		if(anim == ''){
			anim = new Animation(7, bubbleExplode.width / 7, bubbleExplode.height, bubbleExplode.src);		
			anim.element.style.position = 'absolute';
			anim.element.style.top = ((this.y + (this.lvl.bubbleRadius / 2) ) - (bubbleExplode.height / 2)) + 'px';
			anim.element.style.left = ((this.x + (this.lvl.bubbleRadius / 2) ) - ((bubbleExplode.width / 7) / 2)) + 'px';
		};

		anim.animationEnd = function(){};
		animNav.append(anim.element);
		$(this.element).remove();
		this.lvl.animations.push(anim);
	};
};

function bubbleCannon(lvl){
	this.lvl = lvl;
	this.currentBubble;/* = new bubble(this.lvl);
	this.currentBubble.makeItRandom();*/
	this.readyShoot = false;
	this.charging = false;
	this.loaded = false;
	this.object = new standAnimation(uiCannon.width, uiCannon.height, uiCannon.src);
	this.object.addState('shoot', uiCannonShoot.src, 8);
	this.element = this.object.element;
	this.object.setXY(((this.lvl.width - uiCannon.width) / 2) + this.lvl.leftBound - 5, /*(this.lvl.height - uiCannon.height) + this.lvl.topBound + 4)*/ this.lvl.height + this.lvl.topBound);
	/*style.top = this.lvl.height - cannonImage.height;
	style.left = (this.lvl.width - cannonImage.width) / 2;*/
	this.bufferBubble;

	this.shoot = function(x, y){
	//function shoot(x, y){
		/*vecx = -((lvl.width / 2) - (x - this.lvl.left));
		vecy = lvl.height - (y - this.lvl.top);*/
		if(y > (this.lvl.looseLine + (game.canvas.height - this.lvl.height))) return
		if(!this.readyShoot) return;
		if(!this.loaded) return;
		this.currentBubble.x = ((lvl.width / 2) - (this.lvl.bubbleRadius / 2)) + this.lvl.leftBound;
		//this.currentBubble.y = (lvl.height - lvl.bubbleRadius) + this.lvl.topBound;
		/*this.currentBubble.y = lvl.height/* + lvl.looseLine* + this.lvl.topBound;
		this.currentBubble.y -= 5;*/
		this.currentBubble.y =((this.lvl.height /*- lvl.bubbleRadius*/) + this.lvl.topBound) + this.lvl.bubbleRadius

		this.readyShoot = false;
		this.loaded = false;

		var vecx = (x/* - this.lvl.left*/) - (this.currentBubble.x  + (this.lvl.bubbleRadius / 2));
		var vecy = (y /*- this.lvl.top*/) - (this.currentBubble.y + (this.lvl.bubbleRadius / 2));

		var hip = Math.sqrt(vecx*vecx+vecy*vecy);

		var velocity = 25; //--------------------------------------------------------------------------------------------------------------------velocidad bola, const
		this.currentBubble.dx = velocity * (vecx/hip);//Math.cos(ang);
		this.currentBubble.dy = velocity * (vecy/hip);//;/Math.sin(ang);
		//this.lvl.addBubble(this.currentBubble);
		this.lvl.setShootedBubble(this.currentBubble);	
		this.currentBubble.element.style.zIndex = 'auto';
		//this.object.setCurrentState('shoot');
		//$('.trace').remove();
		this.lvl.removeTraces();
		/*if(this.currentBubble.bombBall) game.ui.addBombBubbleCount();
		if(this.currentBubble.freezeBall) game.ui.addFreezeBubbleCount();
		if(this.currentBubble.secondFlavor != '') game.ui.addMultiBubbleCount();*/
		this.currentBubble = null;
		this.chargeCannon();
		//soundengine.reproduceSound('bubblethrow');
	};

	this.setReadyShoot = function(){
		this.readyShoot = true;
	};

	/*this.setReadyShoot = function(){
		$(this.bufferBubble.element).animate({
				left: ((this.lvl.width / 2) - (this.lvl.bubbleRadius / 2)) + this.lvl.leftBound,
				top: ((lvl.height - lvl.bubbleRadius) + this.lvl.topBound) - 5
			}, 450, function(){
				game.cannon.setReadyShoot2();
				game
				game.cannon.addBuffer();
		});
	};*/

	this.chargeCannon = function(){
		this.charging = true;
		$(this.bufferBubble.element).delay(500).animate({
			left: ((this.lvl.width / 2) - (this.lvl.bubbleRadius / 2)) + this.lvl.leftBound,
			top: ((lvl.height /*- lvl.bubbleRadius*/) + this.lvl.topBound) + this.lvl.bubbleRadius
		}, 450, function(){
			game.cannon.loaded = true;
			game.cannon.currentBubble = game.cannon.bufferBubble;
			console.log('before add buffer');
			game.cannon.addBuffer();
			console.log('after add buffer');
			game.cannon.charging = false;
		});
	};

	this.addBuffer = function(){
		console.log('begin add buffer');
		this.bufferBubble = new bubble(game.level);
		this.bufferBubble.makeItRandom(); 
		animNav.append(this.bufferBubble.element);
		$(this.bufferBubble.element).addClass('guiNextBallFrame' + gameSize);
		console.log('end add buffer');
	};

	this.draw = function(){
		this.object.render();
	};

	this.chargeMultiBuffer = function(){	
		if(this.charging) return false;	
		$(this.bufferBubble.element).remove();
		this.bufferBubble = null;
		this.bufferBubble = new bubble(this.lvl);
		this.bufferBubble.makeItMulti();
		animNav.append(this.bufferBubble.element);
		$(this.bufferBubble.element).addClass('guiNextBallFrame' + gameSize);
		return true;
	};

	this.chargeBombBuffer = function(){	
		if(this.charging) return false;		
		$(this.bufferBubble.element).remove();
		this.bufferBubble = null;
		this.bufferBubble = new bubble(this.lvl);
		this.bufferBubble.makeItBomb();
		animNav.append(this.bufferBubble.element);
		$(this.bufferBubble.element).addClass('guiNextBallFrame' + gameSize);
		return true;
	};

	this.chargeFreezeBuffer = function(){		
		if(this.charging) return false;	
		$(this.bufferBubble.element).remove();
		this.bufferBubble = null;
		this.bufferBubble = new bubble(this.lvl);
		this.bufferBubble.makeItFreeze();
		animNav.append(this.bufferBubble.element);
		$(this.bufferBubble.element).addClass('guiNextBallFrame' + gameSize);
		return true;
	};
	/*this.addBuffer();
	this.chargeCannon();*/
};

function bubbleTable(ancho, alto, lvl){
	// 15 x 10 pelotitas
	// Init
	this.lvl = lvl
	this.alto = alto;
	this.ancho = ancho;
	this.Table = new Array(this.alto);
	for(var i = 0; i < this.alto; ++i){
		this.Table[i] = new Array(this.ancho);
	};
	for(var i = 0; i < this.alto; ++i){
		for(var j = 0; j < this.ancho; ++j){
			//alert('i:'+i+' j:'+j);
			this.Table[i][j] = "vacio";
		};
	};
	
	for(var i = 0; i < this.alto; ++i){		
		if((i % 2) == 0){
			this.Table[i][this.ancho - 1] = "nada";
		};
	};

	this.touchedBubbles = new Array();
	this.exploded = 0;

	this.retrieveBubble = function(i, j){
		//debug('  retrieve Bubble i:' + i + ' j:' + j);
		if((i >= this.alto)) return new bubble(this.lvl);
		if((j >= this.ancho) || (j < 0)) return new bubble(this.lvl);
		if(i < 0){
			var b = new bubble(this.lvl);
			b.flavor = "techo";
			return b;
		};
		if(this.isShortRow(i) && j == this.ancho) return new bubble(this.lvl);
		return this.Table[i][j];
	};

	this.isShortRow = function(i){
		//debug(this.Table[i][this.ancho - 1]);
		//var bubble = this.retrieveBubble(i, this.ancho - 1);
		if(this.Table[i][this.ancho - 1] == "nada"){
		//if(bubble == "nada"){
			return 1;
		}else{
			return 0;
		};
	};
	
	this.addBubble = function(bubble, collided){
		//debug(dx +':'+ dy + '; &nbsp;');
		var radius = this.lvl.bubbleRadius / 2;
		var halfradius = this.lvl.bubbleRadius / 3;

		var inPlace = false;
		var currentBubble;
		do{
			var i = 0;
			do{
				currentBubble = collided[i].bubble;
				var deltax = (currentBubble.x + radius) - (bubble.x + radius);
				var deltay = (currentBubble.y + radius) - (bubble.y + radius);
				var isShort = this.isShortRow(currentBubble.i); 
				var dx = 0;
				var dy = 0;
				if(deltay < -(halfradius / 2)) dy = 1;
				if(deltay >= (halfradius / 2)) dy = -1;
				if(dy == 0){
					if(deltax >= 0) dx = -1;
					if(deltax < 0) dx = 1;
				}else{
					if(isShort){
						if(deltax > 0) dx = 0;
						if(deltax < 0) dx = 1;
					}else{
						if(deltax > 0) dx = -1;
						if(deltax < 0) dx = 0;
					};
				};
				//alert(dx + ':' + dy);
				bubble.i = currentBubble.i + dy;
				bubble.j = currentBubble.j + dx;
				inPlace = (this.retrieveBubble(bubble.i, bubble.j) == 'vacio');
				i += 1;
			}while(!inPlace && (i != collided.length));
			bubble.x -= (bubble.dx / 4);
			bubble.y -= (bubble.dy / 4);
			if((bubble.x <= bubble.lvl.leftBound) || (bubble.x >= bubble.lvl.width)) bubble.dx = -bubble.dx;
		}while(!inPlace);
		//$('#debug')[0].innerHTML = $('#debug')[0].innerHTML + ' &nbsp; tabla: ' + this.Table[bubble.i][bubble.j];

		this.Table[bubble.i][bubble.j] = bubble;
		bubble.recalcXYfrom(currentBubble);
		/*bubble.recalcXY();
		bubble.y = bubble.y + bubble.lvl.currentTop;
		bubble.element.top = bubble.y + 'px';*/

		var c = this.checkForCompatibility(bubble, bubble);
		//debug('    c   :' + c + '   ');
		this.lvl.mutex = true;
		if(c >= 3){				
			//alert(c);
			/*var mult = bubble.pointsMultiplier;
			this.lvl.pointsMultiplier =  c * c * pointExplode * mult;
			//alert(this.lvl.pointsMultiplier);*/
			this.exploded = c;
			this.explodeMarked();
			game.after.checkExplode(false);
			this.lvl.addPoints();	
			
			this.checkForOrphans();
			game.after.checkDrop();
			this.lvl.addPoints();		
		}else{				
			this.clearMarks();
		};
		this.touchedBubbles = null;
		this.touchedBubbles = new Array();
		this.lvl.setReadyShoot();
	};

	this.checkForCompatibility = function(toCheck, flavor){
		//chequeo si donde cayo, puede explotar algunas
		//if(this.retrieveBubble(i-1, j).)
		//toCheck = bubble//this.retrieveBubble(i,j);
		if(toCheck == "nada" || toCheck == "vacio") return 0;
		if(toCheck.flavor == "nula" ||toCheck.flavor == "techo") return 0;
		if(toCheck.marked) return 0;
		this.touchedBubbles.push(toCheck);
		toCheck.marked = true;
		//debug('&nbsp;  tocheck: ' + toCheck.flavor + ' &nbsp; flavor:' + flavor + ' &nbsp; i: ' + toCheck.i+ ':'+toCheck.j+ '<br>');
		if(flavor.equalBubble(toCheck)){
			var c = 1;
			//debug('toCheck')			
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i, toCheck.j + 1), flavor);
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i, toCheck.j - 1), flavor);
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i - 1, toCheck.j), flavor);
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i + 1, toCheck.j), flavor);
			if(!this.isShortRow(toCheck.i)){
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i + 1, toCheck.j - 1), flavor);
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i - 1, toCheck.j - 1), flavor);	
			}else{
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i + 1, toCheck.j + 1), flavor);
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i - 1, toCheck.j + 1), flavor);
			};
			return c;
		}else{
			toCheck.marked = false;
			return 0;
		};
	};

	/*this.checkForCompatibility = function(toCheck, flavor){
		//chequeo si donde cayo, puede explotar algunas
		//if(this.retrieveBubble(i-1, j).)
		//toCheck = bubble//this.retrieveBubble(i,j);
		if(toCheck == "nada" || toCheck == "vacio") return 0;
		if(toCheck.flavor == "nula") return 0;
		if(toCheck.marked) return 0;
		this.touchedBubbles.push(toCheck);
		toCheck.marked = true;
		//debug('&nbsp;  tocheck: ' + toCheck.flavor + ' &nbsp; flavor:' + flavor + ' &nbsp; i: ' + toCheck.i+ ':'+toCheck.j+ '<br>');
		if(toCheck.flavor == flavor){
			c = 1;
			//debug('toCheck')			
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i, toCheck.j + 1), flavor);
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i, toCheck.j - 1), flavor);
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i - 1, toCheck.j), flavor);
			c += this.checkForCompatibility(this.retrieveBubble(toCheck.i + 1, toCheck.j), flavor);
			if(!this.isShortRow(toCheck.i)){
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i + 1, toCheck.j - 1), flavor);
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i - 1, toCheck.j - 1), flavor);	
			}else{
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i + 1, toCheck.j + 1), flavor);
				c += this.checkForCompatibility(this.retrieveBubble(toCheck.i - 1, toCheck.j + 1), flavor);
			};
			return c;
		}else{
			toCheck.marked = false;
			return 0;
		};	
	};*/
	this.checkNeighbours = function(bubble){
		//check de caidas
		//debug(bubble);
		if(bubble == "nada" || bubble == "vacio") return true;
		//if(bubble.flavor == "nula") return false;
		if(bubble.flavor == "nula") return true;
		if(bubble.flavor == "techo") return false;
		if(bubble.marked) return true;
		
		bubble.marked = true;
		var c = true;
		c = c && this.checkNeighbours(this.retrieveBubble(bubble.i, bubble.j + 1));
		c = c && this.checkNeighbours(this.retrieveBubble(bubble.i, bubble.j - 1));
		c = c && this.checkNeighbours(this.retrieveBubble(bubble.i - 1, bubble.j));
		c = c && this.checkNeighbours(this.retrieveBubble(bubble.i + 1, bubble.j));
		if(!this.isShortRow(bubble.i)){
			c = c && this.checkNeighbours(this.retrieveBubble(bubble.i + 1, bubble.j - 1));
			c = c && this.checkNeighbours(this.retrieveBubble(bubble.i - 1, bubble.j - 1));
		}else{
			c = c && this.checkNeighbours(this.retrieveBubble(bubble.i + 1, bubble.j + 1));
			c = c && this.checkNeighbours(this.retrieveBubble(bubble.i - 1, bubble.j + 1));
		};
		bubble.marked = c;
		return c;
	};
	
	this.checkForOrphans = function(){
		//cheque si hay alguno que se cae
		//mientras tenga bubbles por chequear
		//debug(this.touchedBubbles);
		while(this.touchedBubbles.length > 0){
			var toCheck = this.touchedBubbles.shift();
			if(this.checkNeighbours(toCheck)){				
				this.explodeMarked(true); // <------------- por ahora, cambiar a drop de las bolitas
				//game.after.addDrop(toCheck);
				/*this.lvl.pointsMultiplier = this.exploded * 10;
				this.lvl.addPoints();*/
			}else{
				this.clearMarks();
			};
		};
	}
	
	this.explodeMarked = function(toDrop){
		toDrop = toDrop == undefined ? false : toDrop;
		//bubbles marked as exploded, explode
		//debug( ' explode!!!  ' + this.alto + ':' + this.ancho );
		for(var i = 0; i < this.alto; ++i){
			for(var j = 0; j < this.ancho; ++j){
				var b = this.Table[i][j];
				if((b != "nada") && (b != "vacio")){					
					if(b.marked){
						if(b.freezeBall) this.lvl.freezeMovement();
						if(b.bombBall){
							this.lvl.detonateBomb(b, 3);
							//this.explodeMarked();
						};
						this.lvl.removeBubble(b, toDrop);						
						this.Table[i][j] = "vacio";
						this.touchedBubbles.remove(b);
					};
				}; 
			};
		};
		/*for(var i = 0; i < this.lvl.bubbles_array.length; ++i){
			var b = this.lvl.bubbles_array[i];
			if(b.marked){
				if(b.freezeBall) this.lvl.freezeMovement();
				if(b.bombBall){
					this.lvl.detonateBomb(b, 3);
					i = 0;
				};
				this.lvl.removeBubble(b, toDrop);						
				this.Table[b.i][b.j] = "vacio";
				this.touchedBubbles.remove(b);
			};
		};*/
	};

	this.clearMarks  = function(){
		for(var i = 0; i < this.alto; ++i){
			for(var j = 0; j < this.ancho; ++j){
				//alert('i:'+i+' j:'+j);
				//alert(i + ':' + j);
				//if((this.Table[i][j] != "nada") || (this.Table[i][j] != "vacio")){					
				if((this.Table[i][j] != "nada") && (this.Table[i][j] != "vacio")){					
					var b = this.Table[i][j];
					b.marked = false;
				}; 
			};
		};
	};
	
	this.returnLowest = function(){
			var i = this.alto - 1;
			var j = 0;
			var salir = false;
			var result;
			while(!salir && i > -1){
				result = this.Table[i][j];
				if(result != "nada" && result != "vacio"){
					salir = true;
				}else{
					j++;
					if(j == this.ancho){
						i--;
						j = 0;
					};
				};
			};
			return result;
		};
	
	this.dispose = function(){
		for(var i = 0; i < this.Table.length; ++i){
			for(var j = 0; j < this.Table[i].length; ++j){
				delete this.Table[i][j];
				this.Table[i][j] = null;
			}
		};
		delete this.Table;
		this.Table = null;
		for(var i = 0; i < this.touchedBubbles.length; ++i){
			delete this.touchedBubbles[i];
			this.touchedBubbles[i] = null;
		};
		delete this.touchedBubbles;
		this.touchedBubbles = null;
	}; 
}

function bubbleLevel(w, h, bubblesWidth, bubblesHeight, lvlnbr){
	this.grilla = new bubbleTable(bubblesWidth, bubblesHeight, this);
	this.cannon;
	this.width = w;
	this.height = h;
	this.top;
	this.left;
	this.lvlnro = lvlnbr;
	this.topBound;
	this.leftBound;

	this.animations = new Array();
	this.traces = new Array();
	
	this.blinkTimer;
	this.mutex = false;
	this.freeze = false;
	this.finished = false;
	this.freezeTimeout = 0;
	this.bubbleRadius = this.width / bubblesWidth;
	this.traceRadius = Math.round(25 * (this.bubbleRadius / 100));
	this.shootedBubble = null;
	this.bubbles_array = new Array();
	this.points = 0;
	this.pointsToReach = game.ui.points + (1000 * this.lvlnro * 2);
	this.pointsMultiplier = 0;
	this.looseLine = this.height - (this.bubbleRadius * 5);
	this.currentTop = 0;
	this.h = Math.sqrt((this.bubbleRadius*this.bubbleRadius) - ((this.bubbleRadius / 2) * (this.bubbleRadius / 2)));
	this.bonus = .2 * this.lvlnro;

	this.pointsMade = false;
	this.specialPointsMade = false;
	//this.character = new standAnimation(uiPanda.width, uiPanda.height, uiPanda.src, game.clock);
	//this.character.setXY((w / 2), (game.canvas.height - uiPanda.height) - 7);
	/*this.character.addState('load', uiPandaLoading.src, 21);
	this.character.addState('blink', uiPandaBlinking.src, 4);
	this.character.addState('standby', uiPandaLoading.src, 5);*/
	this.character = new flashAnimation(uiPanda.src, uiPanda.width / 28, uiPanda.height, 28);
	//this.character.setXY((w / 2), (game.canvas.height - uiPanda.height) - 7);
	this.character.addState('blink', 1, 5);
	this.character.addState('load', 6, 27);
	//this.character.addState('standby', uiPandaLoading.src, 5);
	animNav.append(this.character.element);
	/*var bag = document.createElement('div');
	$(bag).addClass('guiPandaBag' + gameSize);
	$(this.character.element).append(bag);*/
	$(this.character.element).addClass('panda' + gameSize);

	this.blinkTimer = setInterval('game.level.characterBlink()', 1500);

	//alert(this.pointsToReach);
	//this.fallvelocity = 0.2; //balls per seccond
	//this.bubbleVelocity = (this.bubbleRadius) * (this.fallvelocity / fps);
	this.bubbleVelocity = min_vel * ( this.lvlnro / 500 + 1);
	//this.fallvelocity = Math.round(this.bubbleRadius / this.bubbleVelocity);
	this.fallvelocity = Math.round(this.h / this.bubbleVelocity);
	/*alert(this.bubbleRadius / this.bubbleVelocity);
	alert(this.fallvelocity);*/
	this.fpscount = 0;

	this.moveBalls = function(){
		//debug('length: ' + this.bubbles_array.length);
		if(this.finished) return;
		//si esta ocupado, evitar movimiento (normalmente no se mueve, solo evita check de mas)
		if(game.level.mutex) return;
		if(this.shootedBubble != null){
			this.shootedBubble.moveShooted();
			//this.shootedBubble.move();//Shooted();
			this.checkColisions();
			/*if(this.pointsMade){
				if(this.specialPointsMade){
					soundengine.reproduceSound('specialpoints');
				}else{
					soundengine.reproduceSound('normalpoints');
				};
			};
			this.pointsMade = false;
			this.specialPointsMade = false;*/
		};
		for(var i = 0; i < this.animations.length; ++i){
			this.animations[i].render();
			if(this.animations[i].tick > this.animations[i].duration){
				$(this.animations[i].element).remove();
				this.animations.remove(this.animations[i]);
			};
		};
		//check for freeze;
		if(this.freezeTimeout == 0){
			this.freeze = false;
		}else{
			this.freezeTimeout--;
		};

		if(this.freeze) return;
		//performance.check('move balls');
		this.fpscount++;
		//this.fpscount = Math.round(this.fpscount % (fps / this.fallvelocity));
		this.fpscount = Math.round(this.fpscount %  this.fallvelocity);
		if(this.fpscount == 0) this.addRandomRow();
		//bubblesFragment = document.createDocumentFragment();
		for(var i = 0; i < this.bubbles_array.length; ++i){
			var bubble = this.bubbles_array[i];
			//var b = $(bubble.element).detach();
			//alert('bubble: ' + bubble.flavor);
			//bubble.element = animNav[0].removeChild(bubble.element);
			bubble.move();
			//alert(bubble.element.firstChild);
			//b.appendTo(bubbles);
			//bubblesFragment.appendChild(bubble.element);
			//alert(bubbles.firstChild);
			//animNav.append(bubble.element);
		};
		/*alert('sali, pase por todos y los agregue al fragment');
		animNav[0].appendChild(bubblesFragment.cloneNode(true));
		delete bubblesFragment;*/

		this.currentTop += this.bubbleVelocity;
		//performance.check('move balls');
		var masBaja = this.grilla.returnLowest();
		/*alert(this.looseLine);*/
		//alert(masBaja.y + this.bubbleRadius);

		if((masBaja.y - (game.canvas.height - this.height)) + this.bubbleRadius > this.looseLine){
			//alert('perdiste');
			/*alert(this.looseLine);
			alert(masBaja.x + this.bubbleRadius);*/
			this.freeze = true;
			this.finished = true;
			this.loose();
		};
	};

	this.checkColisions = function(){
		//check colisions
		//performance.check('colisiones');
		if(this.shootedBubble == null) return;	
		var collisions = new Array();
		for(var i = 0; i < this.bubbles_array.length; ++i){			
			var currentBubble = this.bubbles_array[i];
			// check radius
			var disx = Math.abs((currentBubble.x + this.bubbleRadius / 2) - (this.shootedBubble.x + this.bubbleRadius / 2));
			var disy = Math.abs((currentBubble.y + this.bubbleRadius / 2) - (this.shootedBubble.y + this.bubbleRadius / 2));
			//debug(disx + ':' + disy);
			
			var distance = Math.sqrt(disx * disx + disy * disy);
			if(distance < (this.bubbleRadius *.9)){
				//debug('COLLITION');				
				//this.bubbles_array.push(this.shootedBubble);	
				collisions.push({ bubble: currentBubble, dis: distance});
				//alert(this.points);
				//break;
			};
		};
		if(collisions.length > 0){
			//debug(' &nbsp; length: ' + collisions.length);
			game.level.mutex = true;					
			game.clock.stop();
			this.addBubble(this.shootedBubble);			
			//alert(currentBubble + ' before shoot');
			/*var currentBubble = collisions[0];
			for(var i = 1; i < collisions.length; ++i){
				if(currentBubble.dis > collisions[i].dis) currentBubble = collisions[i];
			};*/
			//(bubble, collided)
			//this.grilla.addBubble(this.shootedBubble, currentBubble.bubble);	
			this.grilla.addBubble(this.shootedBubble, collisions);			
			/*for(var i = 0; i < this.bubbles_array.length; ++i){
				var b1 = this.bubbles_array[i];
				for(var j = 0; j < this.bubbles_array.length; ++j){
					if(i == j) continue;
					var b2 = this.bubbles_array[j];
					if((b2.i == b1.i) && (b2.j == b1.j)){
						alert('superposicion! con b1 ' + i + ' y b2 ' + j+ ' en la posicion i: ' + b1.i + ' j: '+ b1.j);
					};
					if((Math.abs(b2.x - b1.x) < 5) && (Math.abs(b2.y - b1.y) < 5) ){
						alert('superposicion! con b1 ' + i + ' y b2 ' + j+ ' en la ubicacion x: ' + b1.x + ' y: '+ b1.y);
					};
				};
			};*/
			this.shootedBubble.stopMove();
			this.shootedBubble.dy = this.bubbleVelocity;
			this.shootedBubble = null;
			game.level.mutex = false;
			game.clock.start();	
		};
		//chequea si no se paso
		if(this.shootedBubble != null){
			if(this.shootedBubble.y < (this.topBound + this.currentTop)){
				game.level.mutex = true;					
				game.clock.stop();
				this.addBubble(this.shootedBubble);	

				var currentBubble = this.shootedBubble;
				//if((currentBubble.dx == 0) || (currentBubble.dy == this.bubbleVelocity)) alert('es un hijo de puta antes de arrancar2: ' + culo);
				var delta = this.grilla.isShortRow(0) * (this.bubbleRadius / 2);
				delta = delta / 2;
				//var culo = 0;
				do{					
					//currentBubble.j = Math.floor(((currentBubble.x + ( currentBubble.lvl.bubbleRadius / 2)) - currentBubble.lvl.leftBound) / currentBubble.lvl.bubbleRadius);
					currentBubble.j = Math.floor((((currentBubble.x + delta) - currentBubble.lvl.leftBound) + ( currentBubble.lvl.bubbleRadius / 2)) / currentBubble.lvl.bubbleRadius);
					currentBubble.i = 0;
					//if(this.grilla.isShortRow(0) && (currentBubble.j == 8)) currentBubble;
					if(currentBubble.lvl.grilla.Table[currentBubble.i][currentBubble.j] == 'nada') currentBubble.j = currentBubble.j - 1;
					inPlace = (currentBubble.lvl.grilla.Table[currentBubble.i][currentBubble.j] == 'vacio');
					currentBubble.x -= (currentBubble.dx / 4);
					currentBubble.y -= (currentBubble.dy / 4);
					if((currentBubble.x <= currentBubble.lvl.leftBound) || (currentBubble.x >= currentBubble.lvl.width)) currentBubble.dx = -currentBubble.dx;
					//if((currentBubble.dx == 0) || (currentBubble.dy == this.bubbleVelocity)) alert('es un hijo de puta: ' + culo);
					//culo++;
				}while(!inPlace);	

				this.shootedBubble.stopMove();
				this.shootedBubble.recalcXY();
				this.shootedBubble.y += this.currentTop;
				this.shootedBubble.dy = this.bubbleVelocity;
				this.shootedBubble = null;


				this.grilla.Table[currentBubble.i][currentBubble.j] = currentBubble;
				//currentBubble.recalcXYfrom(currentBubble);
				/*bubble.recalcXY();
				bubble.y = bubble.y + bubble.lvl.currentTop;
				bubble.element.top = bubble.y + 'px';*/

				var c = this.grilla.checkForCompatibility(currentBubble, currentBubble);
				//debug('    c   :' + c + '   ');
				if(c >= 3){				
					//alert(c);
					var mult = currentBubble.pointsMultiplier;
					this.pointsMultiplier =  c * c * pointExplode * mult;
					//alert(this.lvl.pointsMultiplier);
					this.grilla.exploded = c;
					this.grilla.explodeMarked();			
					this.addPoints();
					this.pointsMultiplier = pointDrop * mult;
					this.grilla.checkForOrphans();
				}else{				
					this.grilla.clearMarks();
				};
				this.grilla.touchedBubbles = null;
				this.grilla.touchedBubbles = new Array();
				this.setReadyShoot();

				game.clock.start();	
				game.level.mutex = false;
			};
		};

		if(this.points >= this.pointsToReach){
			this.freeze = true;
			this.finished = true;
			game.ui.points = this.points;
			this.win();
		};
		//performance.check('colisiones');
		//si la pelota disparada llego al techo y freno sola
		//debug(this.shootedBubble.isMoving());
		if(this.shootedBubble == null) return;
		if(!this.shootedBubble.isMoving()){			
			//debug('stop moving');
			//this.bubbles_array.push(this.shootedBubble);
			this.shootedBubble = null;
		};
	};

	this.setShootedBubble = function(bubble){
		this.shootedBubble = bubble;
		this.character.setCurrentState('load');
		//this.shootedBubble.object.setCurrentState('estela', true);
		//this.shootedBubble.object.baseElement.style.display = 'block';
		//this.shootedBubble.object.animationEnds = function(){ this.setCurrentState('estela'); }
	}

	this.drawBalls = function(painter){
		//alert(painter);
		//if((this.bubbles_array.length) != 0) alert(this.bubbles_array.length);
		//performance.check('draw balls');
		for(var i = 0; i < this.bubbles_array.length; ++i){
			//draw each ball
			this.bubbles_array[i].draw(painter);
			//setTimeout('game.level.bubbles_array['+i+'].draw(frameBuffer)', 1);
		};
		//performance.check('draw balls');
		if(this.shootedBubble != null) this.shootedBubble.draw(painter);
	};

	this.drawLevel = function(){
		this.character.render();	
		//if(this.shootedBubble != undefined) this.shootedBubble.object.render();
	};
	
	this.addBubble = function(b){
		this.bubbles_array.push(b);	
	};
	
	this.removeBubble = function(b, toDrop){
		//debug('called remover');
		//debug(b.i + ':' + b.j);
		toDrop = toDrop == undefined ? false : toDrop;
		for(var i = 0; i < this.bubbles_array.length; ++i){
			//debug(' bubble : ' + this.bubbles_array[i].i +':'+this.bubbles_array[i].j);
			if((this.bubbles_array[i].i == b.i) && (this.bubbles_array[i].j == b.j)){
				this.bubbles_array.splice(i, 1);				
				//debug('removed ' + b.toString());
			};
		};
		//$(b.element).remove();
		//if(b != 'nada' && b != 'vacio' && b != 'techo') b.explode()
		if(toDrop){
			game.after.addDrop(b);
		}else{
			game.after.addExplode(b);
		};
		
		if(this.bubbles_array.length != 0) return;
		this.fpscount = 0;
		game.ui.archivements.cleansInLevel += 1;
		this.addRandomRow();
	};
	
	this.setReadyShoot = function(){
		game.level.mutex = false;
		this.cannon.setReadyShoot();
	};

	this.addPoints = function(){
		//alert('add points: ' + this.pointsMultiplier);
		this.points += this.pointsMultiplier;	

	};

	this.makeMeRandom = function(alto){		
		//for(i = (this.grilla.alto - alto); i < this.grilla.alto; ++i){
		for(var i = 0; i < alto; ++i){
			isShort = this.grilla.isShortRow(i);
			for(var j = 0; j < this.grilla.ancho; ++j){
				if((j == this.grilla.ancho - 1) && isShort) continue;
				var b = new bubble(this);
				b.makeItRandomNormal();
				//b.flavor = b.randomFlavor();
				//b.makeItRandomNormal();
				//b.flavor = "red"//b.randomFlavor();
				//b.meinBild = bubbleRedImage;;
				//this.object = new standAnimation(this.lvl.bubbleRadius, this.lvl.bubbleRadius, this.meinBild.src);
				//this.element = this.object.element;
				//b.makeElement();
				$(b.element).addClass('bubble');

				b.i = i;
				b.j = j;
				b.dy = this.bubbleVelocity;
				this.grilla.Table[i][j] = b;
				b.recalcXY();				
				this.addBubble(b);
				animNav.append(b.element);
			};
		};
	};
	
	this.addRandomRow = function(){
		//re do
		//alert("newrow");
		//console.log('add row');
		if(this.mutex){
			//console.log('muted');
			setTimeout('game.level.addRandomRow()', 10);
			return;
		};
		var pFlavor1 = '';
		var pFlavor2 = '';
		var ancho = this.grilla.ancho;
		var newrow = new Array(ancho);
		if(!this.grilla.isShortRow(0)){ 
			ancho--;
			newrow[ancho] = "nada"; 
		};	
		this.grilla.alto = this.grilla.Table.unshift(newrow);

		for(var i = 0; i < this.bubbles_array.length; ++i){			
			this.bubbles_array[i].i += 1;
		};
		var i = 0;
		while(i < ancho){
			var b = new bubble(this);
			b.makeItRandomNormal();
			if((pFlavor1 != b.flavor) || (pFlavor2 != b.flavor)){				
				b.i = 0;
				b.j = i;
				b.dy = this.bubbleVelocity;
				b.recalcXY();
				//newrow[i] = b;
				this.grilla.Table[b.i][b.j] = b;
				this.addBubble(b);
				animNav.append(b.element);
				pFlavor1 = pFlavor2;
				pFlavor2 = b.flavor;
				i++;
			};			
		};
		var erase = this.grilla.Table[this.grilla.Table.length - 1];
		var deleteMe = true;
		for(var i = 0; i < erase.length; ++i){
			deleteMe = deleteMe && ((erase[i] == "vacio") || (erase[i] == "nada"));
		};

		if(deleteMe && (this.grilla.alto > 18)){
			var toDelete = this.grilla.Table.pop();
			this.grilla.alto -= 1;
			delete toDelete;
			toDelete = null;
		};

		/*for(i = 0; i < ancho; ++i){
			//alert(i);
			b = new bubble(this);
			//b.makeItRandom();
		//b.flavor = b.randomFlavor();
			b.makeItRandomNormal();
			b.i = 0;
			b.j = i;
			b.dy = this.bubbleVelocity;
			b.recalcXY();
			newrow[i] = b;
			this.addBubble(b);
			animNav.append(b.element);
		};	*/		
		this.currentTop = 0;	
	};

	this.removeTraces = function(){
		for(var i = 0; i < this.traces.length; ++i){
			animNav[0].removeChild(this.traces[i]);
			delete this.traces[i];
			this.traces[i] = null;
		};
		delete this.traces;
		this.traces = null;
		this.traces = new Array();
	};
	
	this.clearBoard = function(){
		clearInterval(this.blinkTimer);
		for(var i = 0; i < this.bubbles_array.length; ++i){
			var b = this.bubbles_array[i];
			//b.stopMove();
			if(b.element){
				$(b.element).remove();
				delete b.element;
				b.element = null;
			};
			delete b;
			b = null;
			delete this.bubbles_array[i];
			this.bubbles_array[i] = null;
		};
		delete this.bubbles_array;
		this.bubbles_array = null;
		for(var i = 0; i < this.animations.length; ++i){
			var b = this.animations[i];
			if(b.element){
				$(b.element).remove();
				delete b.element;
				b.element = null;	
			};
			delete b;
			b = null;
		};
		$(this.character.element).remove();
		if(this.cannon != null){
			$(this.cannon.element).remove();
			if(this.cannon.currentBubble != null) $(this.cannon.currentBubble.element).remove();
			if(this.cannon.bufferBubble != null) $(this.cannon.bufferBubble.element).remove();
		};
		if(this.shootedBubble != null) $(this.shootedBubble.element).remove();
		//$('.bubble').remove();
		//$('.trace').remove();
		this.removeTraces();
		if(this.grilla != null) this.grilla.dispose();
		delete this.cannon;
		delete this.grilla;
		this.cannon = null;
		this.grilla = null;
	};

	this.freezeMovement = function(){
		this.freeze = true;
		this.freezeTimeout = fps * freezeTime;
	};

	this.levelCleared = function(){
		if(this.bubbles_array.lenght != 0) return;
		this.addRandomRow();
	};

	this.detonateBomb = function(detonated, neighbour){
		//alert(detonated.i + ' : ' + detonated.j + '  neighbour: ' + neighbour);
		if(detonated == "nada" || detonated == "vacio") return;
		if(detonated == "techo") return;
		if(detonated.flavor == "nula") return;
		if(neighbour == 0){
			this.grilla.touchedBubbles.push(detonated);
			return;
		}; 
		//alert(detonated.i + ' : ' + detonated.j + '  neighbour: ' + neighbour);
		//if(detonated.marked) return;
		
		detonated.marked = true;
		if(detonated.bombBall){
			detonated.bombBall = false;
			detonated.wasDetonated	= true;
		};
		this.detonateBomb(this.grilla.retrieveBubble(detonated.i, detonated.j + 1), neighbour - 1);
		this.detonateBomb(this.grilla.retrieveBubble(detonated.i, detonated.j - 1), neighbour - 1);
		this.detonateBomb(this.grilla.retrieveBubble(detonated.i - 1, detonated.j), neighbour - 1);
		this.detonateBomb(this.grilla.retrieveBubble(detonated.i + 1, detonated.j), neighbour - 1);
		if(!this.grilla.isShortRow(detonated.i)){
			this.detonateBomb(this.grilla.retrieveBubble(detonated.i + 1, detonated.j - 1), neighbour - 1);
			this.detonateBomb(this.grilla.retrieveBubble(detonated.i - 1, detonated.j - 1), neighbour - 1);
		}else{
			this.detonateBomb(this.grilla.retrieveBubble(detonated.i + 1, detonated.j + 1), neighbour - 1);
			this.detonateBomb(this.grilla.retrieveBubble(detonated.i - 1, detonated.j + 1), neighbour - 1);
		};
	};

	this.characterBlink = function(){
		if(this.character.currentAnim == ''){
			this.character.setCurrentState('blink');
		};

	};

	this.dispose = function(){
		//clear memory
		//delete work
	};

	// event handler
	this.loose;
	this.win;
}

function bubbleArchivement(user){
	/*
	"Tough Bear" hit level 10 without any booster
"Really Tough Bear" hit level 20 without any booster
"Master of the Combinations" made 5 "MegaCombo" combo in one level
"The Paradise is on Fire!" made 5 "On Fire!" combo in one level
"Call Mr Plow, That's my name, That name again is Mr Plow" clean the
board 5 times in one level
"King-Bear of the Paradise" hit rank 1 globally
	*/

	this.archivement = function(){
		this.title = "";
		this.hint = "";
		this.done = false;
		this.posted = false;
		this.checkDone = function(){
			if(this.done == false) game.ui.innerCoins += 1;
			this.done = true;
		};
		
		this.postMe = function(){
			if(this.posted) return;
			api.facebook.post(api.facebook.user.name + ' has reach "' + this.title + '" archivement in @' + api.facebook.appname + ' and won 1 coins!');
			game.ui.innerCoins += 1;
			this.posted = true;
		};
		/*this.toReach = 0;
		this.reached = 0;
		this.percent = 0;
		this.checkDone(d){
			if(this.done) return;
			if(this.reached > data) return;
			this.reached = data;
			this.checkPercent();
			if(this.toReach == this.reached){
				//archivement complete
				this.done = true;
				game.ui.innerCoins += 1;
			};
		};*/
		/*
		this.checkPercent(){
			this.percent = parseInt((this.reached / this.toReach)*100);
		};*/
	};
	
	this.archivements = {};
	
	this.archivements.tough1 = new this.archivement();
	this.archivements.tough1.title = "Tough Bear!";
	this.archivements.tough1.hint = "Hit level 10 without any booster";
	this.archivements.tough2 = new this.archivement();
	this.archivements.tough2.title = "Really Tough Bear!";
	this.archivements.tough2.hint = "Hit level 20 without any booster";
	this.archivements.combo1 = new this.archivement();
	this.archivements.combo1.title = "Combination Master!";
	this.archivements.combo1.hint = "Made 5 'MegaCombo' combo in one level";
	this.archivements.combo2 = new this.archivement();
	this.archivements.combo2.title = "Paradise on Fire!";
	this.archivements.combo2.hint = "Made 5 'OnFire' combo in one level";
	this.archivements.cleaner = new this.archivement();
	this.archivements.cleaner.title = "Call Mr Plow!";
	this.archivements.cleaner.hint = "Clean the board 5 times in one level";
	this.archivements.king = new this.archivement();
	this.archivements.king.title = "King-Bear of the Paradise";
	this.archivements.king.hint = "Hit number 1 in the global ranking";
	
	this.user = user;
	this.cleansInLevel = 0;
	this.megaComboInLevel = 0;
	this.onFireInLevel = 0;
	this.boosterUsed = false;
	
	this.checkLevel = function(){
		if(game.level.lvlnro == 10 && (!this.boosterUsed)) this.archivements.tough1.checkDone();	
		if(game.level.lvlnro == 20 && (!this.boosterUsed)) this.archivements.tough2.checkDone();
		if(this.megaComboInLevel >= 5) this.archimenets.combo1.checkDone();
		if(this.onFireInLevel >= 5) this.archimenets.combo2.checkDone();
		if(this.cleansInLevel >= 5) this.archimenets.cleans.checkDone();
		
		this.clearLevelData();
	};
	
	this.clearLevelData = function(){
		this.cleansInLevel = 0;
		this.megaComboInLevel = 0;
		this.onFireInLevel = 0;
	};
	
	this.postOnFace = function(){
		this.archivements.tough1.postMe();
		this.archivements.tough2.postMe();
		this.archivements.combo1.postMe();
		this.archivements.combo2.postMe();
		this.archivements.cleaner.postMe();
		this.archivements.king.postMe();
	};
	
	this.serialize = function(){
		var result = {};
		result.archivements = {};
		result.archivements.tough1done = this.archivements.tough1.done;
		result.archivements.tough2done = this.archivements.tough2.done;
		result.archivements.combo1done = this.archivements.combo1.done;
		result.archivements.combo2done = this.archivements.combo2.done;
		result.archivements.cleanerdone = this.archivements.cleaner.done;
		result.archivements.kingdone =    this.archivements.king.done;
		
		result.archivements.tough1posted = this.archivements.tough1.posted;
		result.archivements.tough2posted = this.archivements.tough2.posted;
		result.archivements.combo1posted = this.archivements.combo1.posted;
		result.archivements.combo2posted = this.archivements.combo2.posted;
		result.archivements.cleanerposted = this.archivements.cleaner.posted;
		result.archivements.kingposted = this.archivements.king.posted;
		
		result.user = this.user;
		result.cleansInLevel = this.cleansInLevel;
		result.megaComboInLevel = this.megaComboInLevel;
		result.onFireInLevel = this.onFireInLevel;
		result.boosterUsed = this.boosterUsed;
		
		return result;
	};
	
	this.unserialize = function(result){
		this.archivements.tough1.done = result.archivements.tough1done;
		this.archivements.tough2.done = result.archivements.tough2done;
		this.archivements.combo1.done = result.archivements.combo1done;
		this.archivements.combo2.done = result.archivements.combo2done;
		this.archivements.cleaner.done = result.archivements.cleanerdone;
		this.archivements.king.done = result.archivements.kingdone;
		
		this.archivements.tough1.posted = result.archivements.tough1posted;
		this.archivements.tough2.posted = result.archivements.tough2posted;
		this.archivements.combo1.posted = result.archivements.combo1posted;
		this.archivements.combo2.posted = result.archivements.combo2posted;
		this.archivements.cleaner.posted = result.archivements.cleanerposted;
		this.archivements.king.posted = result.archivements.kingdoneposted;
		
		this.user = result.user;
		this.cleansInLevel = result.cleansInLevel;
		this.megaComboInLevel = result.megaComboInLevel;
		this.onFireInLevel = result.onFireInLevel;
		this.boosterUsed = result.boosterUsed;
	};
};

function gameUI(w, h){
	this.width = w;
	this.height = h;
	this.points = 0;
	this.pointsCounter = 0;
	this.acumuledPoints = 0;
	this.lifes = 0;//5;
	this.initialLifes = lifesPerCoins;
	this.rank = "none";
	this.level = 0;
	this.score = 0;

	this.multiBubbleCount = multiInit;
	this.bombBubbleCount = bombInit;
	this.freezeBubbleCount = freezeInit;
	
	this.innerCoins = 0;
	this.archivements = new bubbleArchivement(api.facebook.user);
	
	//this.element = document.createElement('<div style=" @font-face: { font-family: \'The New Font\'; src: Bubblegum.ttf;}"></div>');
	this.element = document.createElement('div');
	this.element2 = document.createElement('div');
	this.element3 = document.createElement('div');
	this.backElement = document.createElement('div');
	this.pauseElement = document.createElement('div');

	// new element
	this.multiBubbleElement = document.createElement('div');
	this.bombBubbleElement = document.createElement('div');
	this.freezeBubbleElement = document.createElement('div');
	this.coinsElement = document.createElement('div'); 
	this.addCoinsElement = document.createElement('div'); 
	
	this.statusBarContainer = document.createElement('div'); 
	this.statusBar = document.createElement('div'); 
	this.statusProgressBar = document.createElement('div');
	
	this.lvlFrame = document.createElement('div');
	this.rankFrame = document.createElement('div');
	this.scoreFrame = document.createElement('div');
	
	document.getElementById('gameMenu').appendChild(this.lvlFrame);
	document.getElementById('gameMenu').appendChild(this.rankFrame);
	document.getElementById('gameMenu').appendChild(this.scoreFrame);
	
	this.lvlFrame.setAttribute('class', 'homelevel' + gameSize);
	this.rankFrame.setAttribute('class', 'homerank' + gameSize);
	this.scoreFrame.setAttribute('class', 'homescore' + gameSize);
	
	this.statusBarContainer.setAttribute('class', 'guiProgressBartrofeo' + gameSize);
	this.statusBar.setAttribute('class', 'guiProgressBarmedio' + gameSize);
	this.statusProgressBar.setAttribute('class', 'guiProgressBarinterna' + gameSize);
	
	animNav.append(this.element);
	animNav.append(this.element2);
	animNav.append(this.element3);
	animNav.append(this.backElement);
	animNav.append(this.pauseElement);

	animNav.append(this.multiBubbleElement);
	animNav.append(this.bombBubbleElement);
	animNav.append(this.freezeBubbleElement);
	animNav.append(this.coinsElement);
	animNav.append(this.addCoinsElement);
	animNav.append(this.statusBarContainer);
	//$(this.statusBar).append(this.statusProgressBar);
	this.statusBarContainer.appendChild(this.statusBar);
	this.statusBar.appendChild(this.statusProgressBar);

	$(this.element).addClass('pointsFrame'+ gameSize);
	$(this.element2).addClass('lifesFrame'+ gameSize);
	$(this.element3).addClass('levelsFrame'+ gameSize);
	$(this.backElement).addClass('gobackFrame' + gameSize);
	$(this.pauseElement).addClass('uiPauseButton' + gameSize);
	// add classes to new elements
	$(this.multiBubbleElement).addClass('guiBuyMultiFrame' + gameSize);
	$(this.bombBubbleElement).addClass('guiBuyBombFrame' + gameSize);
	$(this.freezeBubbleElement).addClass('guiBuyFreezeFrame' + gameSize);
	$(this.coinsElement).addClass('guiCoinsFrame' + gameSize);;
	$(this.addCoinsElement).addClass('guiBuyCoinsFrame' + gameSize);
	//$(this.statusBar).addClass('guiProgressBar' + gameSize);

	$(this.backElement).click(function(){ game.showMenu(); });

	$(this.multiBubbleElement).click(function(e){
		if(game.ui.multiBubbleCount != 0){
			if(game.cannon.chargeMultiBuffer()){
				game.ui.multiBubbleCount -= 1;
				game.ui.multiBubbleElement.innerHTML = 'x' + game.ui.multiBubbleCount;
				game.ui.archivements.boosterUsed = true;
			};
		}else{
			$(game.ui.pauseElement).click();
			api.ui.showChooseBooster();
		};
		e.stopPropagation();
	});

	$(this.bombBubbleElement).click(function(e){
		if(game.ui.bombBubbleCount != 0){
			if(game.cannon.chargeBombBuffer()){
				game.ui.bombBubbleCount -= 1;
				game.ui.bombBubbleElement.innerHTML = 'x' + game.ui.bombBubbleCount;	
				game.ui.archivements.boosterUsed = true;
			};
		}else{
			$(game.ui.pauseElement).click();
			api.ui.showChooseBooster();
		};
		e.stopPropagation();
	});

	$(this.freezeBubbleElement).click(function(e){
		if(game.ui.freezeBubbleCount != 0){
			if(game.cannon.chargeFreezeBuffer()){
				game.ui.freezeBubbleCount -= 1;
				game.ui.freezeBubbleElement.innerHTML = 'x' + game.ui.freezeBubbleCount;	
				game.ui.archivements.boosterUsed = true;
			};
		}else{
			$(game.ui.pauseElement).click();
			api.ui.showChooseBooster();
		};
		e.stopPropagation();
	});

	$(this.pauseElement).click(function(event){
		soundengine.reproduceSound('pause');
		cartel = document.createElement('div');
		var waitscreen = document.createElement('div');
		
		var continueButton = document.createElement('div');
		continueButton.setAttribute('class', 'pausecontinue' + gameSize);
		var helpButton = document.createElement('div');
		helpButton.setAttribute('class', 'pausehelp' + gameSize);
		var menuButton = document.createElement('div');
		menuButton.setAttribute('class', 'pausemenu' + gameSize);
		
		$(cartel).addClass('uiAlert' + gameSize);		
		$(waitscreen).addClass('uiPauseScreen' + gameSize);
		
		$(continueButton).click(function(){
			$(cartel).remove();
			game.clock.start();
		});
		
		$(helpButton).click(function(){
			menues.showMenu('help', cartel);
		});
		
		$(menuButton).click(function(){
			game.ui.score = game.ui.points;
			$(cartel).remove();
			game.showMenu();
			game.ui.refresh();
		});
		
		cartel.appendChild(waitscreen);
		cartel.appendChild(continueButton);
		cartel.appendChild(menuButton);
		cartel.appendChild(helpButton);
		
		//$(document.body).append(cartel);
		menues.basenav.appendChild(cartel);
		game.clock.stop();
		
		event.stopPropagation()
	});

	this.coinsElement.innerHTML = (api.softgame.user.balance == undefined ? "-" : api.softgame.user.balance + game.ui.innerCoins);

	this.multiBubbleElement.innerHTML = this.multiBubbleCount;
	this.bombBubbleElement.innerHTML = this.bombBubbleCount;
	this.freezeBubbleElement.innerHTML = this.freezeBubbleCount;

	this.savePoints = function(){ this.acumuledPoints = this.points;};

	this.restorePoints = function(){ this.points = this.acumuledPoints;}

	//$('#' + animNav).append(this.element);

	this.draw = function(painter){
		//performance.check('draw ui');
		/*painter.save();
		painter.fillStyle = '#fff';
		painter.fillRect(0, 0, 100, 25);
		painter.font = "bold 12px sans-serif";
		painter.fillStyle = '#000';*/
		if(this.pointsCounter < this.points){
			this.pointsCounter += 10;
			var percent = ((this.pointsCounter / game.level.pointsToReach) * 100);
			this.statusProgressBar.style.height = (percent > 100 ? 100 : percent)  + '%';
		};
		//$(this.element).html(this.pointsCounter);
		this.element.innerHTML = this.pointsCounter;
		this.element2.innerHTML = this.lifes;
		this.element3.innerHTML = game.level.lvlnro;
		//$(this.element2).html(this.lifes);
		//$(this.element3).html(game.level.lvlnro);
		/*painter.fillText(this.pointsCounter , 10, 10);
		painter.restore();*/
		//performance.check('draw ui');
	};

	this.addPoints = function(p){ this.points += p; };

	this.refresh = function(){
		$(this.element).html(this.points);
		$(this.element2).html(this.lifes);
		$(this.element3).html(game.level.lvlnro);

		this.multiBubbleElement.innerHTML = 'x' + this.multiBubbleCount;
		this.bombBubbleElement.innerHTML = 'x' + this.bombBubbleCount;
		this.freezeBubbleElement.innerHTML = 'x' + this.freezeBubbleCount;

		this.coinsElement.innerHTML = api.softgame.user.balance  + game.ui.innerCoins;
		
		this.lvlFrame.innerHTML = this.level;
		this.rankFrame.innerHTML = this.rank;
		this.scoreFrame.innerHTML = this.score;
	}

	//this.

	this.addMultiBubbleCount = function(){
		this.multiBubbleCount++;
		this.multiBubbleElement.innerHTML = this.multiBubbleCount;
	};

	this.addBombBubbleCount =  function(){
		this.bombBubbleCount++;
		this.bombBubbleElement.innerHTML = this.bombBubbleCount;	
	};
	
	this.addFreezeBubbleCount = function(){
		this.freezeBubbleCount++;
		this.freezeBubbleElement.innerHTML = this.freezeBubbleCount;
	};

	this.setRank = function(response){
		//var response = api.string2JSON(data);
		/*alert('setRank');
		alert(api.JSON2String(response));*/
		if(response.status == 1){
			game.ui.ranking = response.response.rank;
			game.ui.onRank();
		};
	};
	
	this.clearUi = function(){
		delete this.archivements;
		this.archivements = null;
		
		this.points = 0;
		this.pointsCounter = 0;
		this.acumuledPoints = 0;
		this.lifes = 5;
		this.initialLifes = lifesPerCoins;
		this.rank = "none";
		this.level = 0;
		this.score = 0;

		this.multiBubbleCount = multiInit;
		this.bombBubbleCount = bombInit;
		this.freezeBubbleCount = freezeInit;
		
		this.innerCoins = 0;
		this.archivements = new bubbleArchivement(api.facebook.user);
	};

	//events
	this.onRank = function(){};
};

function appEnviroment(canvasObj, menuObj, navObj, size){
	this.level = '';
	this.animTimer = null;
	this.cannon = null;
	this.after = new afterEffect();
	this.canvas = document.getElementById(canvasObj);//$(canvasObj)
	this.menu = document.getElementById(menuObj);
	this.backgroundImage = backgroundImage;
	this.lvlFrame = lvlFrame;
	animNav = $('#' + navObj);
	this.filestate = 'loading'; // posible state loading, ok, writing

	this.size = size;

	this.doSerialize = true;

	switch(this.size){
		case "320x480":
			this.canvas.width = 320;
			this.canvas.height = 480;
			break;
		case "360x480":
			this.canvas.width = 360;
			this.canvas.height = 480;
			break;
		case "640x960":
			this.canvas.width = 640;
			this.canvas.height = 960;
			break;
		case "480x800":
			this.canvas.width = 480;
			this.canvas.height = 800;
			break;
		case "854x480":
			this.canvas.height = 480; 
			this.canvas.width = 854;
			break;
	};

	this.clock = new Timeline(fps);
	this.loadedLevel = false;
	
	this.ui = new gameUI(this.canvas.width, this.canvas.height);

	this.startLocalStorage = function(){};

	//event listeners

	this.mouseMove = function(event){}

	this.mouseClick = function(event){
		//alert(event.screenX + ' ' + event.screenY);
		//this = game;
		//debug(event);
		//alert(event.clientY +':'+ $(game.ui.backElement).css('height') +':' + $(game.ui.backElement).css('top') + ':' +( parseInt($(game.ui.backElement).css('height')) + parseInt($(game.ui.backElement).css('top'))));
		if(event.clientY < ( parseInt($(game.ui.backElement).css('height')) + parseInt($(game.ui.backElement).css('top')))) return;
		game.cannon.shoot(event.clientX, event.clientY);
	}

	this.startNewGame = function(){
		game.ui.refresh();
		game.ui.clearUi();
		if(this.level != '') this.level.clearBoard();
		//$(cartel).remove();
		if(cartel) $(cartel).remove();
		this.level = null; //dispose
		this.ui.acumuledPoints = 0;
		this.ui.points = 0;
		this.ui.pointsCounter = 0;
		this.pointsCounter = 0;
		this.ui.lifes = this.ui.initialLifes;
		this.createLvl(1);

		this.ui.refresh();
		this.clock.start();
		//hide menu
		//this.menu.style.zIndex = this.menu.style.zIndex - 1;
		//this.menu.style.display = 'none';
		soundengine.stoptheme();
		//soundengine.stopbackground();
		//alert('hola');
	};

	this.continueGame = function(){
		game.ui.refresh();
		if(game.level == ''){
			this.startNewGame();
		}else{
			//this.menu.style.zIndex = this.menu.style.zIndex + 1;
			this.clock.start();
			//this.menu.style.display = 'none';			
		};
		soundengine.stoptheme();
		//soundengine.stopbackground();
	};

	this.loadPreviousGame = function(doContinue){
		//alert("loadPreviousGame");
		doContinue = doContinue == undefined ? true : doContinue;
		api.ui.hideWaiting();
		/*if(api.levels.jsonlevel === ""){
			//alert("wepa!");
			//api.ui.alert("I can't find any previous game, you need to start from the begginig!", 'Ok, lets go for it!');
			api.ui.alertStyle('guiPreviousScreen', 'guiPreviousButton');
			return;
		};*/
		if(!api.levels.unserializeLevel()){
			//alert('hola');
			console.log('unserialize fail');
			return;
		};// return;
		//chequeo si esta en ganar o perder
		//gano
		//alert('check win');
		/*if(game.level.points >= game.level.pointsToReach){
			//alert('win');
			game.level.freeze = true;
			game.level.finished = true;
			game.ui.points = this.points;
			game.level.win();
		};*/
		//perdio
		//alert('check lose');
		/*var masBaja = game.level.grilla.returnLowest();
		/*alert(this.looseLine);*
		//alert(masBaja.y + this.bubbleRadius);
		//if(masBaja.y + game.level.bubbleRadius > game.level.looseLine){
		if((masBaja.y - (game.canvas.height - this.height)) + this.bubbleRadius > this.looseLine){
			//alert('perdiste');
			/*alert(this.looseLine);
			alert(masBaja.x + this.bubbleRadius);*
			game.level.freeze = true;
			game.level.finished = true;
			game.level.loose();
		};*/
		//if(doContinue) game.continueGame();
	};

	this.nextLevel = function(){
		//SubmitScore();
		this.createLvl(this.level.lvlnro + 1);
	};

	this.redoLevel = function(){
		this.createLvl(this.level.lvlnro);
	};

	this.moreLifes = function(){
		game.ui.lifes += 3;
		game.ui.refresh();
	};

	this.createLvl = function(levelnumber){
		if((game.level != "") && (game.level != null)){
			game.level.clearBoard();
			delete game.level;
			game.level = null;
		};
		switch(this.size){
			case "320x480":
				this.canvas.width = 320;
				this.canvas.height = 480;
				this.level = new bubbleLevel(240, 250, 8, 20, levelnumber);
				break;
			case "360x480":
				this.canvas.width = 360;
				this.canvas.height = 480;
				this.level = new bubbleLevel(250, 380, 8, 20, levelnumber);
				break;
			case "640x960":
				this.canvas.width = 640;
				this.canvas.height = 960;
				this.level = new bubbleLevel(475, 740, 8, 20, levelnumber);
				break;
			case "480x800":
				this.canvas.width = 480;
				this.canvas.height = 800;
				this.level = new bubbleLevel(355, 620, 8, 20, levelnumber);
				break;
			case "854x480":
				this.canvas.height = 480; 
				this.canvas.width = 854;
				this.level = new bubbleLevel(620, 370, 16, 20, levelnumber);
				break;
		};
		this.level.top = this.top;
		this.level.left = this.left;	
		this.level.topBound = 100;//(this.canvas.height - this.level.height) / 2;
		this.level.leftBound = (this.canvas.width - this.level.width) / 2;
		this.level.points = this.ui.points;
		this.level.loose = this.playerLoose;
		this.level.win = this.playerWin;
		this.level.makeMeRandom(linesPerLevel);
		this.level.finished = true;
		this.cannon = new bubbleCannon(this.level);
		this.level.cannon = this.cannon;
		animNav.append(this.cannon.element);
		this.cannon.addBuffer();
		this.cannon.chargeCannon();
		this.cannon.setReadyShoot();
		api.ui.showWaiting();
		setTimeout(function(){ game.level.finished = false; api.ui.hideWaiting(); }, 1200);
	};

	this.playerLoose = function(){
		//alert('loose');
		//soundengine.reproduceSound('losesound');
		game.ui.archivements.checkLevel();
		
		game.level.clearBoard();

		if(game.ui.lifes == 0){ // ask for more lifes!
			api.ui.showLoseScreen();
		}else{		
			cartel = document.createElement('div');
			var uiScreen = document.createElement('div');
			var uiCoins = document.createElement('div');
			var uiMoreCoins = document.createElement('div');
			var uiLifes = document.createElement('div');
			var uiPoints = document.createElement('div');
			var uiRank = document.createElement('div');
			var uiLevel = document.createElement('div');
			var uiMultiCount = document.createElement('div');
			var uiBombCount = document.createElement('div');
			var uiFreezeCount = document.createElement('div');
			var continueButton = document.createElement('div');
			var continuePostButton = document.createElement('div');
			
			var multiValueFrame = document.createElement('div');
			var bombValueFrame = document.createElement('div');
			var freezeValueFrame = document.createElement('div');
			
			multiValueFrame.innerHTML = multiValue;
			bombValueFrame.innerHTML = bombValue;
			freezeValueFrame.innerHTML = freezeValue;
			
			cartel.rankingdiv = uiRank;
			cartel.coins = uiCoins;
			cartel.lifes = uiLifes;
			cartel.multi = uiMultiCount;
			cartel.bomb = uiBombCount;
			cartel.freeze = uiFreezeCount;

			$(cartel).addClass('uiAlert' + gameSize);
			$(uiScreen).addClass('guiLooseScreen' + gameSize);
			$(uiCoins).addClass('guiFinishCoins' + gameSize);
			$(uiMoreCoins).addClass('guiFinishMoreCoins' + gameSize);
			$(uiLifes).addClass('guiFinishLifes' + gameSize);
			$(uiPoints).addClass('guiFinishPoints' + gameSize);
			$(uiRank).addClass('guiFinishRank' + gameSize);
			$(uiLevel).addClass('guiFinishLevel' + gameSize);
			$(uiMultiCount).addClass('guiFinishMultiCount' + gameSize);
			$(uiBombCount).addClass('guiFinishBombCount' + gameSize);
			$(uiFreezeCount).addClass('guiFinishFreezeCount' + gameSize);
			$(continueButton).addClass('guiLooseContinue' + gameSize);
			$(continuePostButton).addClass('guiLooseContinuepostonwall' + gameSize);
			
			multiValueFrame.setAttribute('class', 'guiCoinsMuli' + gameSize);
			bombValueFrame.setAttribute('class', 'guiCoinsBomb' + gameSize);
			freezeValueFrame.setAttribute('class', 'guiCoinsFreeze' + gameSize);
			
			$(cartel).append(uiScreen);
			$(cartel).append(uiCoins);
			$(cartel).append(uiMoreCoins);
			$(cartel).append(uiLifes);
			$(cartel).append(uiPoints);
			$(cartel).append(uiRank);
			$(cartel).append(uiLevel);
			$(cartel).append(uiMultiCount);
			$(cartel).append(uiBombCount);
			$(cartel).append(uiFreezeCount);
			$(cartel).append(continueButton);
			$(cartel).append(continuePostButton);
			
			cartel.appendChild(multiValueFrame);
			cartel.appendChild(bombValueFrame);
			cartel.appendChild(freezeValueFrame);

			var buymultibutton = document.createElement('div');
			$(buymultibutton).addClass('guiFinishBuyMulti' + gameSize);
			var buybombbutton = document.createElement('div');
			$(buybombbutton).addClass('guiFinishBuyBomb' + gameSize);
			var buyfreezebutton = document.createElement('div');
			$(buyfreezebutton).addClass('guiFinishBuyFreeze' + gameSize);

			$(cartel).append(buymultibutton);
			$(cartel).append(buyfreezebutton);
			$(cartel).append(buybombbutton);

			$(buymultibutton).click(api.ui.showMultiBubbleBuy);
			$(buybombbutton).click(api.ui.showBombBubbleBuy);
			$(buyfreezebutton).click(api.ui.showFreezeBubbleBuy);

			uiCoins.innerHTML = (api.softgame.user.balance == undefined ? "-" : api.softgame.user.balance + game.ui.innerCoins);
			uiLifes.innerHTML = game.ui.lifes;
			uiPoints.innerHTML = game.ui.points;
			uiRank.innerHTML = 0;
			uiLevel.innerHTML = game.level.lvlnro;
			uiMultiCount.innerHTML = 'x' + game.ui.multiBubbleCount;
			uiBombCount.innerHTML = 'x' + game.ui.bombBubbleCount;
			uiFreezeCount.innerHTML = 'x' + game.ui.freezeBubbleCount;

			cartel.refresh = function(){
				cartel.coins.innerHTML = (api.softgame.user.balance == undefined ? "-" : api.softgame.user.balance + game.ui.innerCoins);
				cartel.lifes.innerHTML = game.ui.lifes;
				cartel.multi.innerHTML = game.ui.multiBubbleCount;
				cartel.bomb.innerHTML = game.ui.bombBubbleCount;
				cartel.freeze.innerHTML = game.ui.freezeBubbleCount;
			};

			$(continueButton).click(function(){
				$(cartel).fadeOut(300, function(){
					game.ui.lifes -= 1;					
					if(game.ui.lifes == -1){
						/*game.level.clearBoard();
						game.level = null;*/
						game.level = '';
						game.ui.lifes = 5;
						game.ui.points = 0;
						game.ui.acumuledPoints = 0;
						game.ui.pointsCounter = 0;
						game.showMenu();
					}else{
						game.ui.points = game.ui.acumuledPoints;					 
						game.ui.pointsCounter = game.ui.acumuledPoints;
					};
					game.doSerialize = true;
					game.redoLevel();
					$(cartel).remove();
				});
			});
			
			$(continuePostButton).click(function(){
				$(cartel).fadeOut(300, function(){
					game.ui.lifes -= 1;					
					if(game.ui.lifes == -1){
						/*game.level.clearBoard();
						game.level = null;*/
						game.level = '';
						game.ui.lifes = 5;
						game.ui.points = 0;
						game.ui.acumuledPoints = 0;
						game.ui.pointsCounter = 0;
						game.showMenu();
					}else{
						game.ui.points = game.ui.acumuledPoints;					 
						game.ui.pointsCounter = game.ui.acumuledPoints;
					};
					game.doSerialize = true;
					game.redoLevel();
					$(cartel).remove();
				});
				api.facebook.postMessage(api.facebook.user.name + " has got " + game.ui.points + " points in Bubble Paradise ! join him in this @ " + api.facebook.appname + "!");
			});

			$(uiMoreCoins).click(function(){
				api.levels.serializaDone = function(){
					window.location = api.softgame.getBuyingCoinsUrl();
				};
				api.levels.serializeLevel();
			});

			$(document.body).append(cartel);
		};
	};

	this.playerWin = function(){
		//soundengine.reproduceSound('winsound');
		game.ui.archivements.checkLevel();
		
		api.leaderboard.saveok = game.ui.setRank;
		
		cartel = document.createElement('div');
		var uiScreen = document.createElement('div');
		var uiCoins = document.createElement('div');
		var uiMoreCoins = document.createElement('div');
		var uiLifes = document.createElement('div');
		var uiPoints = document.createElement('div');
		var uiRank = document.createElement('div');
		var uiLevel = document.createElement('div');
		var uiMultiCount = document.createElement('div');
		var uiBombCount = document.createElement('div');
		var uiFreezeCount = document.createElement('div');
		var continueButton = document.createElement('div');
		var continuePostButton = document.createElement('div');
		cartel.rankingdiv = uiRank;
		cartel.coins = uiCoins;
		cartel.lifes = uiLifes;
		cartel.multi = uiMultiCount;
		cartel.bomb = uiBombCount;
		cartel.freeze = uiFreezeCount;
		
		var multiValueFrame = document.createElement('div');
		var bombValueFrame = document.createElement('div');
		var freezeValueFrame = document.createElement('div');
		
		multiValueFrame.innerHTML = multiValue;
		bombValueFrame.innerHTML = bombValue;
		freezeValueFrame.innerHTML = freezeValue;

		$(cartel).addClass('uiAlert' + gameSize);
		$(uiScreen).addClass('guiWinScreen' + gameSize);
		$(uiCoins).addClass('guiFinishCoins' + gameSize);
		$(uiMoreCoins).addClass('guiFinishMoreCoins' + gameSize);
		$(uiLifes).addClass('guiFinishLifes' + gameSize);
		$(uiPoints).addClass('guiFinishPoints' + gameSize);
		$(uiRank).addClass('guiFinishRank' + gameSize);
		$(uiLevel).addClass('guiFinishLevel' + gameSize);
		$(uiMultiCount).addClass('guiFinishMultiCount' + gameSize);
		$(uiBombCount).addClass('guiFinishBombCount' + gameSize);
		$(uiFreezeCount).addClass('guiFinishFreezeCount' + gameSize);
		$(continueButton).addClass('guiWinContinue' + gameSize);
		$(continuePostButton).addClass('guiWinContinuepostonwall' + gameSize);
		
		multiValueFrame.setAttribute('class', 'guiCoinsMuli' + gameSize);
		bombValueFrame.setAttribute('class', 'guiCoinsBomb' + gameSize);
		freezeValueFrame.setAttribute('class', 'guiCoinsFreeze' + gameSize);
			
		$(cartel).append(uiScreen);
		$(cartel).append(uiCoins);
		$(cartel).append(uiMoreCoins);
		$(cartel).append(uiLifes);
		$(cartel).append(uiPoints);
		$(cartel).append(uiRank);
		$(cartel).append(uiLevel);
		$(cartel).append(uiMultiCount);
		$(cartel).append(uiBombCount);
		$(cartel).append(uiFreezeCount);
		$(cartel).append(continueButton);
		$(cartel).append(continuePostButton);

		cartel.appendChild(multiValueFrame);
		cartel.appendChild(bombValueFrame);
		cartel.appendChild(freezeValueFrame);
			
		var buymultibutton = document.createElement('div');
		$(buymultibutton).addClass('guiFinishBuyMulti' + gameSize);
		var buybombbutton = document.createElement('div');
		$(buybombbutton).addClass('guiFinishBuyBomb' + gameSize);
		var buyfreezebutton = document.createElement('div');
		$(buyfreezebutton).addClass('guiFinishBuyFreeze' + gameSize);

		$(cartel).append(buymultibutton);
		$(cartel).append(buyfreezebutton);
		$(cartel).append(buybombbutton);

		$(buymultibutton).click(api.ui.showMultiBubbleBuy);
		$(buybombbutton).click(api.ui.showBombBubbleBuy);
		$(buyfreezebutton).click(api.ui.showFreezeBubbleBuy);

		uiCoins.innerHTML = (api.softgame.user.balance == undefined ? "-" : api.softgame.user.balance + game.ui.innerCoins);
		uiLifes.innerHTML = game.ui.lifes;
		uiPoints.innerHTML = game.ui.points;
		uiRank.innerHTML = 'updating';
		uiLevel.innerHTML = game.level.lvlnro;
		uiMultiCount.innerHTML = 'x' + game.ui.multiBubbleCount;
		uiBombCount.innerHTML = 'x' + game.ui.bombBubbleCount;
		uiFreezeCount.innerHTML = 'x' + game.ui.freezeBubbleCount;

		cartel.refresh = function(){
			cartel.coins.innerHTML = (api.softgame.user.balance == undefined ? "-" : api.softgame.user.balance + game.ui.innerCoins);
			cartel.lifes.innerHTML = game.ui.lifes;
			cartel.multi.innerHTML = game.ui.multiBubbleCount;
			cartel.bomb.innerHTML = game.ui.bombBubbleCount;
			cartel.freeze.innerHTML = game.ui.freezeBubbleCount;
		};

		$(continueButton).click(function(){
			$(cartel).fadeOut(300, function(){
				/*game.level.clearBoard();
				game.level = null;*/
				game.doSerialize = true;
				//api.facebook.postMessage(api.facebook.user.name + " has got " + game.ui.points + " points in Bubble Paradise! Come with him and enjoy togheter in the paradise!");
				//api.facebook.postMessage(api.facebook.user.name + " has got " + game.ui.points + " points in Bubble Paradise! Come with him and enjoy togheter in the paradise!");
				//api.facebook.postMessage(api.facebook.user.name + " has got " + game.ui.points + " points in Bubble Paradise ! join him in this @ " + api.facebook.appname + "!");
				game.ui.acumuledPoints = game.ui.points;
				game.ui.pointsCounter = game.ui.points;
				game.nextLevel();
				$(cartel).remove();
				delete cartel;
			});
		});
		
		$(continuePostButton).click(function(){
			$(cartel).fadeOut(300, function(){
				/*game.level.clearBoard();
				game.level = null;*/
				game.doSerialize = true;
				//api.facebook.postMessage(api.facebook.user.name + " has got " + game.ui.points + " points in Bubble Paradise! Come with him and enjoy togheter in the paradise!");
				//api.facebook.postMessage(api.facebook.user.name + " has got " + game.ui.points + " points in Bubble Paradise! Come with him and enjoy togheter in the paradise!");
				api.facebook.postMessage(api.facebook.user.name + " has got " + game.ui.points + " points in Bubble Paradise ! join him in this @ " + api.facebook.appname + "!");
				game.ui.acumuledPoints = game.ui.points;
				game.ui.pointsCounter = game.ui.points;
				game.nextLevel();
				$(cartel).remove();
				delete cartel;
			});
		});

		$(uiMoreCoins).click(function(){
			api.levels.serializaDone = function(){
				window.location = api.softgame.getBuyingCoinsUrl();
			};
			api.levels.serializeLevel();
		});

		$(document.body).append(cartel);

		if(LeaderBoard.highscore < game.ui.points) api.ui.showHighScore();

		game.ui.onRank = function(){
			if(cartel){
				//$('.guiFinishRank' + gameSize)[0].innerHTML = game.ui.ranking;
				cartel.rankingdiv.innerHTML = game.ui.ranking;
				if((game.ui.ranking <= 3) && (game.ui.ranking > 0)){
					//api.ui.showHighScore();
					api.facebook.postMessage(api.facebook.user.name + " has got the " + this.ranking + "position on the Leaderboard of Bubble Paradise! What are you waiting for to beat him and enjoy this paradise!");
				};
			};
		};
		//api.leaderboard.save(4, 'Master of the Universe', game.ui.points);
		SubmitScore();
	};

	this.showMenu = function(){
		game.clock.stop();
		//this.menu.style.zIndex = 90//this.menu.style.zIndex + 2;
		//this.menu.style.display = 'block';
		menues.showMenu('mainMenu');
		soundengine.starttheme();
		//soundengine.startbackground();
		/*soundengine.backgroundsound.playing = true;
		soundengine.backgroundsound.loop();*/
		if(this.doSerialize){
			api.levels.serializeLevel(game);
			api.levels.putLevel(api.facebook.user.id);
			this.doSerialize = false;
		};		
	};

	//animation functions

	this.clearPainter = function(){
		//this.painter.save();
		//this.painter.fillStyle = '#fff';
		//this.painter.fillRect(0, 0, this.width, this.height);
		this.painter.clearRect(0, 0, this.width, this.height);
		//this.painter.restore();
	}

	this.drawCannon = function(painter){
		if(this.cannon.currentBubble == null) return;
		painter.save();
		painter.drawImage(this.cannon.currentBubble.meinBild, this.width / 2, (this.height - this.level.bubbleRadius));
		painter.restore();
	}

	this.drawBalls = function(painter){
		this.level.drawBalls(painter);
	}

	this.drawBackground = function(painter){
		//painter.save();
		painter.drawImage(this.backgroundImage, 0, 0);
		painter.drawImage(this.lvlFrame, 0, 0);
		//painter.drawImage(lvlFrame, (this.canvas.width - lvlFrame.width) / 2, this.canvas.height - lvlFrame.height);
		//painter.fillRect(this.level.leftBound, this.level.topBound, this.level.width, this.level.height);
		//painter.restore();
	}

	this.draw = function(){
		//this.canvas.style.display = 'none';
		//performance.check('clear painter');
		/*this.clearPainter(this.frameBuffer);
		//performance.check('clear painter');
		this.drawBackground(this.frameBuffer);
		this.drawCannon(this.frameBuffer);
		this.drawBalls(this.frameBuffer);
		this.ui.draw(this.frameBuffer);*/
		//this.clearPainter(this.painter);
		//performance.check('clear painter');
		//this.drawBackground(this.painter);
		//this.drawCannon(this.painter);
		//this.drawBalls(this.painter);
		this.ui.draw(this.painter);
		this.level.drawLevel();
		this.cannon.draw();
		this.after.render();
		//this.clearPainter(this.painter);
		//this.painter.putImageData(this.frameBuffer.getImageData(0, 0, this.buffercanvas.width, this.buffercanvas.height), 0, 0);
		//this.canvas.style.display = 'block';
	}

	//$(canvasObj).

	this.startAnimation = function(){
		// call this every 1/24 seconds to make all work
		this.ui.points = this.level.points;
		//n = $('#'+animNav);
		//var span = new Date;
		animNav[0].style.display = 'none';				
		this.level.moveBalls();
		this.draw();
		
		//var animTimer = setInterval(this.draw, 42);
		animNav[0].style.display = 'block';
		//var span2 = new Date;
		//console.log(span2 - span);
		//this.version.innerHTML = 'anim timer: ' + (span2 - span);
	}

	//init
	this.width = $('#'+canvasObj).width();
	this.height = $('#'+canvasObj).height();
	this.top = $('#'+canvasObj).offset().top;
	this.left = $('#'+canvasObj).offset().left;
	animNav.width(this.width);
	animNav.height(this.height);

	api.softgame.buyFinalized = this.moreLifes;
	//$('#'+canvasObj).click(shoot);
	//$('#'+canvasObj).click(this.mouseClick);
	//$('#'+navObj).click(this.mouseClick);
	//animNav.tap(this.mouseClick);
	animNav.click(this.mouseClick);

	//retrieveHighScore();
}

function tick(){
	game.startAnimation();
	//performance.update();
	//setTimeout("tick()", 1);
}

api.levels.serializeLevel = function(game){
	//api.levels.jsonlevel = {};
	var lvl = {};
	lvl.resolution = gameSize;
	if(game.level.lvlnro == undefined){
		lvl.lvlnumber = 0;
	}else{
		lvl.lvlnumber = game.level.lvlnro;

		//this.grilla = new bubbleTable(bubblesWidth, bubblesHeight, this);
		//this.cannon;
		lvl.width = game.level.width;
		lvl.height = game.level.height;
		lvl.top = game.level.top;
		lvl.left = game.level.left;
		lvl.topBound = game.level.topBound;
		lvl.leftBound = game.level.leftBound;
		
		lvl.mutex = game.level.mutex;
		lvl.freeze = game.level.freeze
		lvl.finished = game.level.finished;
		lvl.freezeTimeout = game.level.frezeeTimeout;
		lvl.bubbleRadius = game.level.bubbleRadius
		lvl.shootedBubble = game.level.shootedBubble;
		//lvl.bubbles_array = new Array();
		lvl.points = game.level.points;
		lvl.pointsToReach = game.level.pointsToReach;
		lvl.pointsMultiplier = game.level.pointsMultiplier;
		lvl.looseLine = game.level.looseLine;
		lvl.currentTop = game.level.currentTop;
		lvl.h = game.level.h
		lvl.bonus = game.level.bonus;
		lvl.fpscount = game.level.fpscount;
		lvl.bubble_array = [];
		//salvo las bubbles del array, son las mismas que la grilla
		for(var i = 0; i < game.level.bubbles_array.length; ++i){
			var current = game.level.bubbles_array[i];
			var bubble = current.serialize();
			lvl.bubble_array.push(bubble);
			//current = null;
		};

		lvl.cannon = {};
		//lvl.cannon.currentBubble = (game.level.cannon.currentBubble == null)? null : game.level.cannon.currentBubble.serialize();
		lvl.cannon.readyShoot = game.level.cannon.readyShoot;
	};
	lvl.ui = {};
	lvl.ui.lifes = game.ui.lifes;
	lvl.ui.multiCount = game.ui.multiBubbleCount;
	lvl.ui.bombCount = game.ui.bombBubbleCount;
	lvl.ui.freezeCount = game.ui.freezeBubbleCount;
	lvl.ui.innerCoins = game.ui.innerCoins;
	
	lvl.ui.archivements = game.ui.archivements.serialize();

	api.levels.jsonlevel = lvl;
};

api.levels.unserializeLevel = function(){
	var lvl = api.levels.jsonlevel;
	
	if(lvl == ""){ //there isnt any previuos game
		game.ui.score = 0;
		game.ui.level = 0;
		game.ui.refresh();
		console.log('no level');
		return false;
		//game.
	};
	//alert('lvl: ' + lvl);
	if(lvl.resolution != gameSize){
		//alert('resolution wrong');
		//api.ui.alert('You have another session started with another phone resolution, we cannot arrange the bubbles in the same position, this will a mess!! please relogin with the original phone and try again', 'Ok, see you later');
		api.ui.alertStyle('guiResolutionScreen', 'guiResolutionButton');
		console.log('wrong resolution');
		return false;
	};
	//var level = game.level;
	//alert('hola1');
	game.ui.level = lvl.lvlnumber;
	game.ui.score = lvl.points;
	game.ui.points = lvl.points;
	game.ui.pointsCounter = lvl.points;
	
	if(lvl.lvlnumber == 0){
		game.cannon = null;
		game.level = "";
		switch(lvl.resolution){
			case "320x480":
				game.canvas.width = 320;
				game.canvas.height = 480;	
				break;
			case "360x480":
				game.canvas.width = 360;
				game.canvas.height = 480;
				break;
			case "640x960":
				game.canvas.width = 640;
				game.canvas.height = 960;
				break;
			case "480x800":
				game.canvas.width = 480;
				game.canvas.height = 800;
				break;
			case "854x480":
				game.canvas.height = 480; 
				game.canvas.width = 854;
				break;
		};
		return false;
	}else{

		switch(lvl.resolution){
			case "320x480":
				game.canvas.width = 320;
				game.canvas.height = 480;	
				game.level = new bubbleLevel(240, 250, 8, 20, lvl.lvlnumber);
				break;
			case "360x480":
				game.canvas.width = 360;
				game.canvas.height = 480;
				game.level = new bubbleLevel(360, 480, 10, 20, lvl.lvlnumber);
				break;
			case "640x960":
				game.canvas.width = 640;
				game.canvas.height = 960;
				game.level = new bubbleLevel(640, 960, 13, 30, lvl.lvlnumber);
				break;
			case "480x800":
				game.canvas.width = 480;
				game.canvas.height = 800;
				game.level = new bubbleLevel(480, 800, 11, 25, lvl.lvlnumber);
				break;
			case "854x480":
				game.canvas.height = 480; 
				game.canvas.width = 854;
				game.level = new bubbleLevel(800, 400, 23, 20, lvl.lvlnumber);
				break;
		};
		//alert('hola2');
		game.level.top = lvl.top;
		game.level.left = lvl.left;
		game.level.topBound = lvl.topBound;
		game.level.leftBound = lvl.leftBound;
		//alert('hola2');
		game.level.mutex = lvl.mutex;
		game.level.freeze = lvl.freeze
		game.level.finished = lvl.finished;
		game.level.freezeTimeout = lvl.frezeeTimeout;
		game.level.bubbleRadius = lvl.bubbleRadius
		game.level.shootedBubble = lvl.shootedBubble;
		//game.level.bubbles_array = new Array();
		game.level.points = lvl.points;
		game.level.pointsToReach = lvl.pointsToReach;
		game.level.pointsMultiplier = lvl.pointsMultiplier;
		game.level.looseLine = lvl.looseLine;
		game.level.currentTop = lvl.currentTop;
		game.level.h = lvl.h
		game.level.bonus = lvl.bonus;
		game.level.fpscount = lvl.fpscount;

		for(var i = 0; i < lvl.bubble_array.length; ++i){
			//alert('i: ' + i);
			var current = lvl.bubble_array[i];
			//alert(current);
			var b = new bubble(game.level);
			//alert('unserialize bubble');
			b.unserialize(current);
			//alert('fin unserialize bubble');
			game.level.bubbles_array.push(b);
			game.level.grilla.Table[b.i][b.j] = b;
			current = null;
		};
		//alert('hola3');
		game.cannon = new bubbleCannon(game.level);
		game.level.cannon = game.cannon;
		game.level.cannon.currentBubble = null;
		game.level.cannon.addBuffer();
		game.level.cannon.chargeCannon();
		game.level.cannon.setReadyShoot();

		game.cannon.readyShoot = lvl.cannon.readyShoot;
		game.level.loose = game.playerLoose;
		game.level.win = game.playerWin;	
		
		animNav.append(game.cannon.element);
	};
	game.ui.lifes = lvl.ui.lifes;
	game.ui.multiBubbleCount = lvl.ui.multiCount;
	game.ui.bombBubbleCount = lvl.ui.bombCount;
	game.ui.freezeBubbleCount = lvl.ui.freezeCount;
	game.ui.innerCoins = lvl.ui.innerCoins;
	game.ui.refresh();
	game.ui.archivements.unserialize(lvl.ui.archivements);
	
	return true;
};

api.ui.alertnav = null;

api.ui.alert = function(msg, button, fn){
	var alertui = document.createElement('div');
	var alertuitext = document.createElement('div');
	var alertuibackground = document.createElement('div');
	var alertuibutton = document.createElement('div');
	//alertuibackground.style.backgroundImage = 'url(' + uiAlertScreen.src + ')';
	$(alertui).addClass('uiAlert' + gameSize);
	$(alertuitext).addClass('uiAlertText' + gameSize);
	$(alertuibackground).addClass('uiAlertImage' + gameSize);
	$(alertuibutton).addClass('uiAlertButton' + gameSize);
	alertui.appendChild(alertuibackground);
	alertui.appendChild(alertuibutton);
	alertuibackground.appendChild(alertuitext);
	
	api.ui.alertnav = alertui;

	alertuitext.innerHTML = msg;
	alertuibutton.innerHTML = '<div>' + button + '</div>';
	alertuibutton.onclick = fn;

	$(document.body).append(api.ui.alertnav);
	$(api.ui.alertnav).fadeIn(150);
	$(alertuibutton).click(function(){
		$(api.ui.alertnav).fadeOut(300, function(){
			$(api.ui.alertnav).remove();
		});
	});
};

api.ui.alert2nav = null;

api.ui.alert2 = function(msg, fns){
	//asumo a fn como un array de objetos, donde el objeto es un string 'button' y la fc 'action'
	var alertui = document.createElement('div');
	var alertuitext = document.createElement('div');
	var alertuibackground = document.createElement('div');
	//var alertuibutton = document.createElement('div');
	alertuibackground.style.backgroundImage = 'url(' + uiAlertScreen.src + ')';
	$(alertui).addClass('uiAlert' + gameSize);
	$(alertuitext).addClass('uiAlertText' + gameSize);
	$(alertuibackground).addClass('uiAlertImage' + gameSize);
	//$(alertuibutton).addClass('uiAlertButton' + gameSize);
	alertui.appendChild(alertuibackground);
	//alertui.appendChild(alertuibutton);
	alertuibackground.appendChild(alertuitext);
	
	alertuitext.innerHTML = msg;
	/*$(alertuibutton)[0].innerText = button;
	$(alertuibutton)[0].onclick = fn;*/

	api.ui.alert2nav = alertui;
	$(document.body).append(api.ui.alert2nav);
	//var button;
	for(var i = 0; i < fns.length; ++i){
		var button = document.createElement('div');
		$(button).addClass('uiAlertButton' + gameSize);
		alertui.appendChild(button);
		button.innerHTML = '<div>' + fns[i].button + '</div>';
		button.onclick = fns[i].action;
		button.style.top = (parseInt($(button).css('top')) + (i * parseInt($(button).css('height')))) + 'px';		
		//alert(button.style.top + ' : ' + parseInt(button.style.top) + ' : ' + (i * parseInt(button.style.top)));
		//alert($(button).css('top') + ':' + parseInt($(button).css('top')));
		button.style.top = (parseInt(button.style.top) + (i * parseInt(button.style.height))) + 'px';
		if(fns[i].noclose === true) continue;
		$(button).click(function(){
			$(api.ui.alert2nav).fadeOut(300, function(){
				$(api.ui.alert2nav).remove();
				delete api.ui.alert2nav;
				api.ui.alert2nav = null;
			});
		});
		
	};
};

//api.ui.alertStyleDiv  = '';
api.ui.alertStyle = function(screenclass, buttonclass){
	var alertui = document.createElement('div');
	var alertuibackground = document.createElement('div');
	var alertuibutton = document.createElement('div');
	//alertuibackground.style.backgroundImage = 'url(' + uiAlertScreen.src + ')';
	$(alertui).addClass('uiAlert' + gameSize);
	$(alertuibackground).addClass(screenclass + gameSize);
	$(alertuibutton).addClass(buttonclass + gameSize);
	alertui.appendChild(alertuibackground);
	alertui.appendChild(alertuibutton);
	
	if(api.ui.alertnav != null) $(api.ui.alertnav).remove();
	api.ui.alertnav = null;
	api.ui.alertnav = alertui;

	$(document.body).append(api.ui.alertnav);
	$(api.ui.alertnav).fadeIn(150);
	$(alertuibutton).click(function(){
		$(api.ui.alertnav).fadeOut(300, function(){
			$(api.ui.alertnav).remove();
			api.ui.alertnav = null;
		});
	});
};

api.ui.balancediv = null
api.ui.balancedivcoins = '';

api.ui.showBalance = function(){
	if(api.ui.balancediv == null){
		api.ui.balancediv = document.createElement('div');
		$(api.ui.balancediv).addClass('uiAlert' + gameSize);
		var cartel = document.createElement('div');
		$(cartel).addClass('guiBalanceCartel' + gameSize);

		var okbutton = document.createElement('div');
		$(okbutton).addClass('guiBalanceOkButton' + gameSize);

		var buybutton = document.createElement('div');
		$(buybutton).addClass('guiBalanceBuyButton' + gameSize);

		api.ui.balancedivcoins = document.createElement('div');
		$(api.ui.balancedivcoins).addClass('guiBalanceCoins' + gameSize);

		$(api.ui.balancediv).append(cartel);
		$(api.ui.balancediv).append(okbutton);
		$(api.ui.balancediv).append(buybutton);
		$(api.ui.balancediv).append(api.ui.balancedivcoins);

		$(okbutton).click(function(){
			api.ui.balancediv.style.display = 'none';		
			$(api.ui.balancediv).remove();
			api.ui.balancediv = null;
		});
		$(buybutton).click(function(){
			api.ui.balancediv.style.display = 'none';		
			$(api.ui.balancediv).remove();
			delete api.ui.balancediv;
			api.ui.balancediv = null;
			window.location = api.softgame.getBuyingCoinsUrl();
		});
	};

	api.ui.balancedivcoins.innerHTML =  api.softgame.user.balance + game.ui.innerCoins;
	api.ui.balancediv.style.display = 'block';
	$(document.body).append(api.ui.balancediv);
};

api.ui.losescreendiv = null

api.ui.showLoseScreen = function(){
	if(api.ui.losescreendiv == null){
		api.ui.losescreendiv = document.createElement('div');
		$(api.ui.losescreendiv).addClass('uiAlert' + gameSize);

		var cartel = document.createElement('div');
		//$(cartel).addClass('guiLoseAllLifes' + gameSize);
		cartel.setAttribute('class', 'lifecontainer' + gameSize);

		var okbutton = document.createElement('div');
		//$(okbutton).addClass('guiLoseAllLifesOk' + gameSize);
		okbutton.setAttribute('class', 'lifegiveme' + gameSize);

		var buybutton = document.createElement('div');
		//$(buybutton).addClass('guiLoseAllLifesBuy' + gameSize);
		buybutton.setAttribute('class', 'lifeaddcoins' + gameSize);
		
		var coinsFrame = document.createElement('div');
		coinsFrame.setAttribute('class', 'lifecoins' + gameSize);
		coinsFrame.innerHTML = api.softgame.user.balance + game.ui.innerCoins;
		/*$(api.ui.losescreendiv).append(cartel);
		$(api.ui.losescreendiv).append(okbutton);
		$(api.ui.losescreendiv).append(buybutton);*/
		api.ui.losescreendiv.appendChild(cartel);
		api.ui.losescreendiv.appendChild(okbutton);
		api.ui.losescreendiv.appendChild(buybutton);
		api.ui.losescreendiv.appendChild(coinsFrame);

		$(okbutton).click(function(){
			//api.ui.losescreendiv.style.display = 'none';	
			api.ui.losescreendiv.parentNode.removeChild(api.ui.losescreendiv);
			delete api.ui.losescreendiv;
			api.ui.losescreendiv = null;
			if(game.level) game.level.clearBoard();
			delete game.level;
			game.level = null;
			game.level = '';
			game.showMenu();
		});
		
		$(buybutton).click(function(){
			//api.ui.losescreendiv.style.display = 'none';
			api.ui.losescreendiv.parentNode.removeChild(api.ui.losescreendiv);
			delete api.ui.losescreendiv;
			api.ui.losescreendiv = null;
			api.softgame.buyFinalized = function(){
				api.ui.hideWaiting();
				//api.ui.alert('You have ' + lifesPerCoins + ' more lifes!! or you are a cat or someone loves you up there :)', 'Thanks! Go on!', function(){
					game.ui.lifes += lifesPerCoins;
					$(cartel).remove();
					$(api.ui.losescreendiv).remove();
					delete api.ui.losescreendiv;
					api.ui.losescreendiv = null;
					game.playerLoose();
				//});
			};
			api.ui.showWaiting();
			api.softgame.startCoinsBuying('level', '3morelifes', '', 1, '', '');
		});

		//$(document.body).append(api.ui.losescreendiv);
	};

	//api.ui.losescreendiv.style.display = 'block';
	$(document.body).append(api.ui.losescreendiv);
};

api.ui.boosterScreen = null;

api.ui.showBooster = function(){
	if(api.ui.boosterScreen == null){
		api.ui.boosterScreen  = document.createElement('div');
		var mahself = $(api.ui.boosterScreen);
		mahself.addClass('uiAlert' + gameSize);
	};
};

api.ui.waitTimer = 0;
api.ui.waitdiv = null;
api.ui.highscore = null;

api.ui.showWaiting = function(){
	if(api.ui.waitdiv == null){
		api.ui.waitdiv = document.createElement('div');
		$(api.ui.waitdiv).addClass('uiAlert' + gameSize);
		var waiting = document.createElement('div');
		$(waiting).addClass('uiAlert' + gameSize);
		waiting.style.backgroundRepeat = 'no-repeat';
		waiting.style.backgroundImage = 'url(' + gameSize + '/waitscreen.png)';
		waiting.style.backgroundPosition = 'center top';
		api.ui.waitdiv.appendChild(waiting);
		$(document.body).append(api.ui.waitdiv);
	};
	//api.ui.waitTimer = setTimeout('api.ui.waitdiv.style.display = "block"', 500);
	api.ui.waitdiv.style.display = "block";
};

api.ui.hideWaiting = function(){
	if(api.ui.waitdiv == null) return;
	api.ui.waitdiv.style.display = 'none';
	$(api.ui.waitdiv).remove();
	/*delete api.ui.waitdiv;*/
	api.ui.waitdiv = null;
	//clearTimeout(api.ui.waitTimer);
};

api.ui.showHighScore = function(){
	if(api.ui.highscore == null){
		api.ui.highscore = document.createElement('div');
		$(api.ui.highscore).addClass('uiAlert' + gameSize);
		//api.ui.waitdiv.style.backgroundRepeat = 'no-repeat';
		var alertuibackground = document.createElement('div');
		var alertuibutton = document.createElement('div');
		//alertuibackground.style.backgroundImage = 'url(' + uiAlertScreen.src + ')';
		$(api.ui.highscore).addClass('uiAlert' + gameSize);
		$(alertuibackground).addClass('uiHighscoreImage' + gameSize);
		$(alertuibutton).addClass('uiHighscoreButton' + gameSize);
		api.ui.highscore.appendChild(alertuibackground);
		api.ui.highscore.appendChild(alertuibutton);
		
		$(document.body).append(api.ui.highscore);
		//$(api.ui.highscore).show();
		$(alertuibutton).click(function(){
			$(api.ui.highscore).remove();
			delete api.ui.highscore;
			api.ui.highscore = null;
		});
	};
	$(api.ui.highscore).show();
};

api.ui.showBubbleBuyElement = null;

api.ui.showBubbleBuy = function(cartel, button1, button2, callback1, callback2){
	if(callback2 == undefined){
		callback2 = function(){
			$(api.ui.showBubbleBuyElement).remove();
			delete api.ui.showBubbleBuyElement;
			api.ui.showBubbleBuyElement = null;
		};
	};
	if(api.ui.showBubbleBuyElement == null){
		api.ui.showBubbleBuyElement = document.createElement('div');
		var fragment = document.createDocumentFragment();
		var carteldiv = document.createElement('div');
		var button1div  = document.createElement('div');
		var button2div =  document.createElement('div');
		$(api.ui.showBubbleBuyElement).addClass('uiAlert' + gameSize);
		$(carteldiv).addClass(cartel + gameSize);
		$(button1div).addClass(button1 + gameSize);
		$(button2div).addClass(button2 + gameSize);
		fragment.appendChild(carteldiv);
		fragment.appendChild(button1div);
		fragment.appendChild(button2div);
		api.ui.showBubbleBuyElement.appendChild(fragment);
		$(document.body).append(api.ui.showBubbleBuyElement);

		$(button1div).click(callback1);
		$(button2div).click(callback2);
	};	
	$(api.ui.showBubbleBuyElement).show();
};

api.ui.showMultiBubbleBuy = function(){
	var fn = function(){
		api.softgame.buyFinalized = function(){
			api.ui.hideWaiting();
			game.ui.multiBubbleCount += 3;
			$(api.ui.showBubbleBuyElement).remove();
			api.ui.showBubbleBuyElement = null;
			if(cartel.refresh) cartel.refresh();
		};
		api.ui.showWaiting();
		api.softgame.startCoinsBuying('multiBubble', '3moremultiBubble', '', multiValue, '', '');
	};
	api.ui.showBubbleBuy('guiBuyMultiScreen', 'guiBuyMultiOk', 'guiBuyMultiNo', fn);
};

api.ui.showBombBubbleBuy = function(){
	var fn = function(){
		api.softgame.buyFinalized = function(){
			api.ui.hideWaiting();
			game.ui.bombBubbleCount += 3;
			$(api.ui.showBubbleBuyElement).remove();
			api.ui.showBubbleBuyElement = null;
			cartel.refresh();
		};
		api.ui.showWaiting();
		api.softgame.startCoinsBuying('bombBubble', '3morebombBubble', '', bombValue, '', '');
	};
	api.ui.showBubbleBuy('guiBuyBombScreen', 'guiBuyBombOk', 'guiBuyBombNo', fn);
};

api.ui.showFreezeBubbleBuy = function(){
	var fn = function(){
		api.softgame.buyFinalized = function(){
			api.ui.hideWaiting();
			game.ui.freezeBubbleCount += 3;
			$(api.ui.showBubbleBuyElement).remove();
			api.ui.showBubbleBuyElement = null;
			cartel.refresh();
		};
		api.ui.showWaiting();
		api.softgame.startCoinsBuying('freezeBubble', '3morefreezeBubble', '', freezeValue, '', '');
	};
	api.ui.showBubbleBuy('guiBuyFreezeScreen', 'guiBuyFreezeOk', 'guiBuyFreezeNo', fn);
};

api.ui.chooseBoosterdiv = null;

api.ui.showChooseBooster = function(){
	if(api.ui.chooseBoosterdiv == null){
		api.ui.chooseBoosterdiv = document.createElement('div');
		api.ui.chooseBoosterdiv.setAttribute('class', 'container' + gameSize);
		
		var multiCountFrame = document.createElement('div');
		multiCountFrame.setAttribute('class', 'guiChooseFinishMultiCount' + gameSize);
		var bombCountFrame = document.createElement('div');
		bombCountFrame.setAttribute('class', 'guiChooseFinishBombCount' + gameSize);
		var freezeCountFrame = document.createElement('div');
		freezeCountFrame.setAttribute('class', 'guiChooseFinishFreezeCount' + gameSize);
		
		var multiBuyButton = document.createElement('div');
		multiBuyButton.setAttribute('class', 'guiFinishChooseBuyMulti' + gameSize);
		var bombBuyButton = document.createElement('div');
		bombBuyButton.setAttribute('class', 'guiFinishChooseBuyBomb' + gameSize);
		var freezeBuyButton = document.createElement('div');
		freezeBuyButton.setAttribute('class', 'guiFinishChooseBuyFreeze' + gameSize);

		var multiValueFrame = document.createElement('div');
		multiValueFrame.setAttribute('class', 'guiChooseCoinsMuli' + gameSize);
		multiValueFrame.innerHTML = multiValue;
		var bombValueFrame = document.createElement('div');
		bombValueFrame.setAttribute('class', 'guiChooseCoinsBomb' + gameSize);
		bombValueFrame.innerHTML = bombValue;
		var freezeValueFrame = document.createElement('div');
		freezeValueFrame.setAttribute('class', 'guiChooseCoinsFreeze' + gameSize);
		freezeValueFrame.innerHTML = freezeValue;
		
		var addCoinsButton = document.createElement('div');
		addCoinsButton.setAttribute('class', 'guiChooseAddCoins' + gameSize);
		var coinsFrame = document.createElement('div');
		coinsFrame.setAttribute('class', 'guiFinishChooseCoins' + gameSize);
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'guiChoosecerrar' + gameSize);
		
		api.ui.chooseBoosterdiv.appendChild(multiCountFrame);
		api.ui.chooseBoosterdiv.appendChild(bombCountFrame);
		api.ui.chooseBoosterdiv.appendChild(freezeCountFrame);
		
		api.ui.chooseBoosterdiv.appendChild(multiBuyButton);
		api.ui.chooseBoosterdiv.appendChild(bombBuyButton);
		api.ui.chooseBoosterdiv.appendChild(freezeBuyButton);
		
		api.ui.chooseBoosterdiv.appendChild(multiValueFrame);
		api.ui.chooseBoosterdiv.appendChild(bombValueFrame);
		api.ui.chooseBoosterdiv.appendChild(freezeValueFrame);
		
		api.ui.chooseBoosterdiv.appendChild(addCoinsButton);
		api.ui.chooseBoosterdiv.appendChild(coinsFrame);
		api.ui.chooseBoosterdiv.appendChild(closeButton);
		
		$(addCoinsButton).click(function(){
			api.levels.serializaDone = function(){
				window.location = api.softgame.getBuyingCoinsUrl();
			};
			api.levels.serializeLevel();
		});
		
		$(multiBuyButton).click(api.ui.showMultiBubbleBuy);
		$(bombBuyButton).click(api.ui.showBombBubbleBuy);
		$(freezeBuyButton).click(api.ui.showFreezeBubbleBuy);
		
		$(closeButton).click(function(){
			api.ui.chooseBoosterdiv.parentNode.removeChild(api.ui.chooseBoosterdiv);
			delete api.ui.chooseBoosterdiv;
			api.ui.chooseBoosterdiv = null;
			game.ui.refresh();
		});
		
	};
	
	$(document.body).append(api.ui.chooseBoosterdiv);
};

api.ui.bonusDiv = null;
api.ui.bonusRetrieved = 0;

api.ui.showBonusScreen = function(bonus){
	if(bonus == 0) return;
	if(api.ui.bonusDiv == null){
		api.ui.bonusDiv = document.createElement('div');
		api.ui.bonusDiv.setAttribute('class', 'uiAlert' + gameSize);
		var container = document.createElement('div');
		var closeButton = document.createElement('div')
		var okButton = document.createElement('div');
		
		container.setAttribute('class', 'containerbonus' + gameSize);
		closeButton.setAttribute('class', 'bonuscerrar' + gameSize);
		okButton.setAttribute('class', 'bonusaccepyshare' + gameSize);
		/*.setAttribute('class', '' + gameSize);
		.setAttribute('class', '' + gameSize);
		
		1.jocker
		2.granade
		3.time
		4.life
		5.coins
		6.score
		*/
		var imageDiv = document.createElement('div');
		imageDiv.setAttribute('class', 'bonusyouwon' + gameSize);
		
		switch(bonus){
			case "1":
				imageDiv.style.backgroundImage = 'url(../' + gameSize + '/bonusjocker.png)';
				game.ui.multiBubbleCount += 3;
				break;
			case "2":
				imageDiv.style.backgroundImage = 'url(../' + gameSize + '/bonusgrenade.png)';
				game.ui.bombBubbleCount += 3;
				break;
			case "3":
				imageDiv.style.backgroundImage = 'url(../' + gameSize + '/bonustime.png)';
				game.ui.freezeBubbleCount += 3;
				break;
			case "4":
				imageDiv.style.backgroundImage = 'url(../' + gameSize + '/bonuslife.png)';
				game.ui.lifes += 1;
				break;
			case "5":
				imageDiv.style.backgroundImage = 'url(../' + gameSize + '/bonuscoins.png)';
				game.ui.innerCoins += 3;
				break;
			case "6":
				imageDiv.style.backgroundImage = 'url(../' + gameSize + '/bonusscore.png)';
				game.ui.score += 500;
				game.ui.points += 500;
				break;
		};
		
		api.ui.bonusDiv.appendChild(container);
		//api.ui.bonusDiv.appendChild();
		api.ui.bonusDiv.appendChild(closeButton);
		api.ui.bonusDiv.appendChild(okButton);
		api.ui.bonusDiv.appendChild(imageDiv);
		
		$(closeButton).click(function(){
			api.ui.bonusDiv.parentNode.removeChild(api.ui.bonusDiv);
			delete api.ui.bonusDiv;
			api.ui.bonusDiv = null;
		});
		
		$(okButton).click(function(){
			var msg = api.facebook.user.name + ' just got ';
			switch(api.ui.bonusRetrieved){
				case "1":
					msg += ' Jocker bubble bonus';
					break;
				case "2":
					msg += ' Grenade bubble bonus';
					break;
				case "3":
					msg += ' Time bubble bonus';
					break;
				case "4":
					msg += ' Life bonus';
					break;
				case "5":
					msg += ' Coins bonus';
					break;
				case "6":
					msg += ' Score bonus';
					break;
			};
		
			msg += ' on @' + api.facebook.appname;
			api.facebook.postMessage(msg);
			
			api.ui.bonusDiv.parentNode.removeChild(api.ui.bonusDiv);
			delete api.ui.bonusDiv;
			api.ui.bonusDiv = null;
		});
	};
	
	$(document.body).append(api.ui.bonusDiv);
};

api.ui.showBonus = function(data){
	api.bonus.getBonus(api.facebook.user.id, function(data){
		var response = api.string2JSON(data);
		if(response.status == 1){
			api.ui.bonusRetrieved = response.response.bonus;
			api.ui.showBonusScreen(api.ui.bonusRetrieved);
			game.ui.refresh();
		};
	});
};