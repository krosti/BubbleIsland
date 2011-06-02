

function Loader(progress, size){

	this.progressBar = document.getElementById(progress);	

	this.size = size;



	/*bubbleBlueImage = new Image();

	bubbleRedImage = new Image();

	bubbleGreenImage = new Image();

	bubblePurpleImage = new Image();

	bubbleYellowImage = new Image();



	bubbleBlueBombImage = new Image();

	bubbleRedBombImage = new Image();

	bubbleGreenBombImage = new Image();

	bubblePurpleBombImage = new Image();

	bubbleYellowBombImage = new Image();



	bubbleBlueHalfImage = new Image();

	bubbleRedHalfImage = new Image();

	bubbleGreenHalfImage = new Image();

	bubblePurpleHalfImage = new Image();

	bubbleYellowHalfImage = new Image();



	bubbleBlueFreezeImage = new Image();

	bubbleRedFreezeImage = new Image();

	bubbleGreenFreezeImage = new Image();

	bubblePurpleFreezeImage = new Image();

	bubbleYellowFreezeImage = new Image();



	bubbleBlueImagex2 = new Image();

	bubbleRedImagex2 = new Image();

	bubbleGreenImagex2 = new Image();

	bubblePurpleImagex2 = new Image();

	bubbleYellowImagex2 = new Image();



	bubbleBlueImagex3 = new Image();

	bubbleRedImagex3 = new Image();

	bubbleGreenImagex3 = new Image();

	bubblePurpleImagex3 = new Image();

	bubbleYellowImagex3 = new Image();



	lvlFrame = new Image();

	backgroundImage = new Image();

	initImage = new Image();

	logoImage = new Image();

	pandaBearAnim = new Image();

	uiPanda = new Image();

	uiLevelFrame = new Image();

	uiLifeFrame = new Image();

	uiPointsFrame = new Image();

	uiLooseFrame = new Image();

	uiWinFrame = new Image();

	uiCannon = new Image();

	uiOptionButton = new Image();

	uiNewButton = new Image();

	uiContinueButton = new Image();

	uiBackButton = new Image();*/

	

	this.readyLoad; // = function(){ alert('hola'); };

	

	this.toLoad = 74;

	this.isloaded = 0;

	this.separator = '/';

	

	this.loaded = function(){

		//alert(this.isloaded);

		loader.isloaded++;

		//alert(loader.isloaded + ':' + this.src);

		loader.progressBar.style.width = ((loader.isloaded / loader.toLoad) * 100)+ '%';

		if(loader.isloaded == loader.toLoad) loader.readyLoad();

	};

	

	bubbleBlueImage.onload = this.loaded;

	bubbleGreenImage.onload = this.loaded;

	bubbleRedImage.onload = this.loaded;

	bubblePurpleImage.onload = this.loaded;

	bubbleYellowImage.onload = this.loaded;



	bubbleBlueBombImage.onload = this.loaded;

	bubbleGreenBombImage.onload = this.loaded;

	bubbleRedBombImage.onload = this.loaded;

	bubblePurpleBombImage.onload = this.loaded;

	bubbleYellowBombImage.onload = this.loaded;



	bubbleBlueFreezeImage.onload = this.loaded;

	bubbleGreenFreezeImage.onload = this.loaded;

	bubbleRedFreezeImage.onload = this.loaded;

	bubblePurpleFreezeImage.onload = this.loaded;

	bubbleYellowFreezeImage.onload = this.loaded;



	bubbleBlueHalfImage.onload = this.loaded;

	bubbleRedHalfImage.onload = this.loaded;

	bubbleGreenHalfImage.onload = this.loaded;

	bubblePurpleHalfImage.onload = this.loaded;

	bubbleYellowHalfImage.onload = this.loaded;



	bubbleBlueImageX2.onload = this.loaded;

	bubbleGreenImageX2.onload = this.loaded;

	bubbleRedImageX2.onload = this.loaded;

	bubblePurpleImageX2.onload = this.loaded;

	bubbleYellowImageX2.onload = this.loaded;



	bubbleBlueImageX3.onload = this.loaded

	bubbleGreenImageX3.onload = this.loaded;

	bubbleRedImageX3.onload = this.loaded;

	bubblePurpleImageX3.onload = this.loaded;

	bubbleYellowImageX3.onload = this.loaded;



	bubbleExplode.onload = this.loaded;

	bubbleEstela.onload = this.loaded;

	bubbleBombExplode.onload = this.loaded;

	bubbleFreezeExplode.onload = this.loaded;

	bubbleMultiColorExplode.onload = this.loaded;

	bubbleX2Explode.onload = this.loaded;

	bubbleX3Explode.onload = this.loaded;



	lvlFrame.onload = this.loaded;

	initImage.onload = this.loaded;

	backgroundImage.onload = this.loaded

	logoImage.onload = this.loaded;

	uiPandaStandBy.onload = this.loaded;

	uiPandaLoading.onload = this.loaded;

	uiPandaBlinking.onload = this.loaded;

	uiPanda.onload = this.loaded;

	uiLevelFrame.onload = this.loaded;

	uiLifeFrame.onload = this.loaded;

	uiPointsFrame.onload = this.loaded;

	uiLooseFrame.onload = this.loaded;

	uiWinFrame.onload = this.loaded;

	uiFinishContinue.onload = this.loaded;

	uiFinishMenu.onload = this.loaded;

	uiCannon.onload = this.loaded;

	uiCannonShoot.onload = this.loaded

	uiOptionButton.onload = this.loaded;

	uiNewButton.onload = this.loaded;

	uiContinueButton.onload = this.loaded;

	uiBackButton.onload = this.loaded;

	//uiLoadingScreen.onload = this.loaded;



	uiLeaderboardScreen.onload = this.loaded;

	uiLeaderboardMenu.onload = this.loaded;

	uiLeaderboardHighscore.onload = this.loaded;

	uiLeaderboardFriends.onload = this.loaded;

	uiLeaderboardStar.onload = this.loaded;



	uiOptionsBackground.onload = this.loaded;

	uiOptionsMenu.onload = this.loaded;

	uiOptionsVolumenOn.onload = this.loaded;

	uiOptionsVolumenOff.onload = this.loaded;

	uiOptionsFacebook.onload = this.loaded;

	uiOptionsLeaderboard.onload = this.loaded;

	uiOptionsCoins.onload = this.loaded;



	uiAlertScreen.onload = this.loaded;

	uiAlertButton.onload = this.loaded;

	uiPauseButton.onload = this.loaded;
	uiPauseCartel.onload = this.loaded;

	facebookScreen.onload = this.loaded;

	facebookButton.onload = this.loaded;



		/*this.startLoad();

	};*/

	this.init = function(){	

	//this.startLoad = function(){	

		bubbleBlueImage.src = 'bubbles/bluebubble.png';

		bubbleGreenImage.src = 'bubbles/greenbubble.png';

		bubbleRedImage.src = 'bubbles/redbubble.png';

		bubblePurpleImage.src = 'bubbles/purplebubble.png';

		bubbleYellowImage.src = 'bubbles/yellowbubble.png';



		bubbleBlueBombImage.src = 'bubbles/bluebubblebomb.png';

		bubbleGreenBombImage.src = 'bubbles/greenbubblebomb.png';

		bubbleRedBombImage.src = 'bubbles/redbubblebomb.png';

		bubblePurpleBombImage.src = 'bubbles/purplebubblebomb.png';

		bubbleYellowBombImage.src = 'bubbles/yellowbubblebomb.png';

		

		bubbleBlueFreezeImage.src = 'bubbles/bluebubblefreeze.png';

		bubbleGreenFreezeImage.src = 'bubbles/greenbubblefreeze.png';

		bubbleRedFreezeImage.src = 'bubbles/redbubblefreeze.png';

		bubblePurpleFreezeImage.src = 'bubbles/purplebubblefreeze.png';

		bubbleYellowFreezeImage.src = 'bubbles/yellowbubblefreeze.png';

		

		bubbleBlueHalfImage.src = 'bubbles/bluebubblehalf.png';

		bubbleGreenHalfImage.src = 'bubbles/greenbubblehalf.png';

		bubbleRedHalfImage.src = 'bubbles/redbubblehalf.png';

		bubblePurpleHalfImage.src = 'bubbles/purplebubblehalf.png';

		bubbleYellowHalfImage.src = 'bubbles/yellowbubblehalf.png';



		bubbleBlueImageX2.src = 'bubbles/bluebubblex2.png';

		bubbleGreenImageX2.src = 'bubbles/greenbubblex2.png';

		bubbleRedImageX2.src = 'bubbles/redbubblex2.png';

		bubblePurpleImageX2.src = 'bubbles/purplebubblex2.png';

		bubbleYellowImageX2.src = 'bubbles/yellowbubblex2.png';



		bubbleBlueImageX3.src = 'bubbles/bluebubblex3.png';

		bubbleGreenImageX3.src = 'bubbles/greenbubblex3.png';

		bubbleRedImageX3.src = 'bubbles/redbubblex3.png';

		bubblePurpleImageX3.src = 'bubbles/purplebubblex3.png';

		bubbleYellowImageX3.src = 'bubbles/yellowbubblex3.png';



		bubbleExplode.src = this.size + this.separator + 'explosion.png';

		bubbleEstela.src = this.size + this.separator + 'estela.png';

		bubbleBombExplode.src = this.size + this.separator + 'bombexplosion.png';

		bubbleFreezeExplode.src = this.size + this.separator + 'freezeexplosion.png';

		bubbleMultiColorExplode.src = this.size + this.separator + 'multicolorexplosion.png';

		bubbleX2Explode.src = this.size + this.separator + 'x2explosion.png';

		bubbleX3Explode.src = this.size + this.separator + 'x3explosion.png';



		lvlFrame.src = this.size + this.separator + 'lvlframe.png';

		//alert(this.size + this.separator + 'lvlframe.png');

		backgroundImage.src = this.size + this.separator + 'background.png';

		//alert(backgroundImage.src);

		logoImage.src = 'logo.jpg';		

		initImage.src = this.size + this.separator + 'initscreen.png';

		//pandaBearAnim.src = this.size + this.separator + 'animacion.png';

		uiPandaStandBy.src = this.size + this.separator + 'standbyanimacion.png';

		uiPandaLoading.src = this.size + this.separator + 'loadinganimacion.png';

		uiPandaBlinking.src = this.size + this.separator + 'blinkinganimacion.png';

		//uiPanda.src = this.size + this.separator + 'panda.png';

		uiPanda.src = this.size + this.separator + 'flashanimacion.png';

		uiLevelFrame.src = this.size + this.separator + 'lvl.png';

		uiLifeFrame.src = this.size + this.separator + 'life.png';

		uiPointsFrame.src = this.size + this.separator + 'points.png';

		uiLooseFrame.src = this.size + this.separator + 'guiloose.png';

		uiWinFrame.src = this.size + this.separator + 'guiwin.png';

		uiFinishContinue.src = this.size + this.separator + 'guicontinue.png';

		uiFinishMenu.src = this.size + this.separator + 'guimenu.png';

		uiCannon.src = this.size + this.separator + 'cannon.png';

		uiCannonShoot.src = this.size + this.separator + 'cannonanimacion.png';

		uiOptionButton.src = this.size + this.separator + 'optionbutton.png';

		uiNewButton.src = this.size + this.separator + 'newbutton.png';

		uiContinueButton.src = this.size + this.separator + 'continuebutton.png';

		uiBackButton.src = this.size + this.separator + 'backbutton.png';

		//uiLoadingScreen.src = this.size + this.separator + 'loadingscreen.png';



		uiLeaderboardScreen.src = this.size + this.separator + 'leaderboardscreen.png';

		uiLeaderboardMenu.src = this.size + this.separator + 'leaderboardmenu.png';

		uiLeaderboardHighscore.src = this.size + this.separator + 'leaderboardhighscore.png';

		uiLeaderboardFriends.src = this.size + this.separator + 'leaderboardfriends.png';

		uiLeaderboardStar.src = this.size + this.separator + 'leaderboardstar.png';



		uiOptionsBackground.src = this.size + this.separator + 'optionsbackground.png';

		uiOptionsMenu.src = this.size + this.separator + 'optionsmenu.png';

		uiOptionsVolumenOn.src = this.size + this.separator + 'optionsvolumenon.png';

		uiOptionsVolumenOff.src = this.size + this.separator + 'optionsvolumenoff.png';

		uiOptionsFacebook.src = this.size + this.separator + 'optionsfacebook.png';

		uiOptionsLeaderboard.src = this.size + this.separator + 'optionsleaderboard.png';

		uiOptionsCoins.src = this.size + this.separator + 'optionscoins.png';



		uiAlertScreen.src = this.size + this.separator + 'alertscreen.png';

		uiAlertButton.src = this.size + this.separator + 'alertbutton.png';

		uiPauseButton.src = this.size + this.separator + 'pausebutton.png';
		uiPauseCartel.src = this.size + this.separator + 'pausecartel.png';


		facebookScreen.src = this.size + this.separator + 'facebookscreen.png';

		facebookButton.src = this.size + this.separator + 'facebookbutton.png';

	};

};

//function Timeline(self, fps){ //donde self es el nombre del objeto usado

function Timeline(fps){

	this.animations = new Array();

	this.fps = fps;

	this.timerId;

	this.state = 'stop';

	

	this.onStop = new Array();

	this.onStart = new Array();

	this.onTick = new Array();

	

	this.tick = function(){

		this.trigger(this.onTick);

	};

	

	this.start = function(){

		//empieza la animacion

		if(this.state == 'stop'){
			this.state = 'started';
		}else{
			return;
		};

		this.trigger(this.onStart);

		this.timerId = setInterval("this.tick()", 1000/this.fps);

		//this.timerId = setTimeout("this.tick()", 1);

	};

	

	this.stop = function(){

		//detiene la animacion
		this.state = 'stop';

		clearInterval(this.timerId)

		this.trigger(this.onStop);

	};

	

	this.connect = function(f, to){

		switch(to){

			case 'start':

				this.onStart.push(f);

				break;

			case 'stop':

				this.onStop.push(f);

				break;

			case 'tick':

				this.onTick.push(f);

				break;

		};	

	};

	

	this.disconnect = function(f, to){

		switch(to){

			case 'start':

				this.onStart.remove(f);

				break;

			case 'stop':

				this.onStop.remove(f);

				break;

			case 'tick':

				this.onTick.remove(f);

				break;

		};	

	};

	

	this.trigger = function(what){

		for(i = 0; i < what.length; ++i){

			alert(what[i]);

			what[i]();

		}

	};



};



// one div, multiple imgs

/*function Animation(duration, width, height, image){

	this.duration = duration;

	this.width = width;

	this.height = height;

	this.internalClock = duration / fps;

	this.finished = false;

	this.element = document.createElement('div');

	this.frames = new Array();

	for(var i = 0; i < duration; ++i){

		//alert(i);

		div = document.createElement('img');

		div.style.width = width + 'px';

		div.style.minHeight = height + 'px';

		div.style.minWidth = width + 'px';

		div.style.position = 'absolute';

		div.style.top = '0px';

		div.style.left = '0px';

		div.style.backgroundPosition = i * this.width + 'px 0px';

		div.style.display = 'none';

		//div.style.backgroundImage = 'url(' + image + ')';

		div.src = image[i];

		this.frames.push(div);

		$(this.element).append(div);

	};

	this.frames[0].style.display = 'block';



	this.element.style.width = width + 'px';

	this.element.style.minHeight = height + 'px';

	this.element.style.minWidth = width + 'px';

	this.element.style.position = 'absolute';

	//this.element.style.backgroundImage = 'url(' + image + ')'

	this.tick = 0;

	

	this.addMoment = function(img, stage){



	};



	this.setX = function(x){ this.element.style.left = x + 'px'; };

	this.setY = function(y){ this.element.style.top = y + 'px'; };

	

	this.render = function(){

		//alert(this.tick);

		this.tick += 1;// % duration; 

		this.tick = this.tick % this.duration;

		//this.element.style.backgroundPosition = this.tick * this.width + 'px 0px';*

		this.frames[this.tick].style.display = 'none';

		this.tick += 1;// % duration; 

		this.tick = this.tick % this.duration;

		this.frames[this.tick].style.display = 'block';

	};

	

};*/



// one div, moving background

function Animation(duration, width, height, image){

	this.duration = duration;

	this.width = width;

	this.height = height;

	this.internalClock = duration / fps;

	this.finished = false;

	this.element = document.createElement('div');



	this.element.style.width = width + 'px';

	this.element.style.height = height + 'px';

	this.element.style.minHeight = height + 'px';

	this.element.style.minWidth = width + 'px';

	this.element.style.backgroundImage = 'url(' + image + ')';

	//this.element.style.border = 'black solid 5px';

	this.element.style.position = 'relative';

	this.element.style.overflow = 'hidden';

	this.tick = 0;

	

	this.addMoment = function(img, stage){



	};



	this.setX = function(x){ this.element.style.left = x + 'px'; };

	this.setY = function(y){ this.element.style.top = y + 'px'; };

	

	this.render = function(){

		//alert(this.tick);		

		this.tick += 1;// % duration; 

		//alert('tick' + this.tick);

		if(this.tick > this.duration){

			//alert('hola');

			this.animationEnd();

			return

		};

		//this.tick = this.tick % this.duration;

		this.element.style.backgroundPosition = '-' + this.tick * this.width + 'px 0px';

		//alert(this.element.style.backgroundPosition);

		//this.frames[this.tick].style.display = 'none';

	};

	

	this.animationEnd;

};



function standAnimation(width, height, image, timeline){

	this.width = width;

	this.height = height;

	this.line = timeline;

	this.self = this;

	this.states = {};

	this.currentAnim = '';

	this.normalImage = image;

	this.meinSpat = timeline;

	//var self = this;

	//this.meinSpat.connect(self.render, 'tick');



	//init

	this.element = document.createElement('div');

	this.baseElement = document.createElement('img');

	this.element.appendChild(this.baseElement);

	//this.baseImage = document.createElement('img');

	//this.baseImage.src = image;

	this.baseElement.src = image;

	//this.setBaseStyle(this.element);

	this.element.style.position = 'absolute';

	/*this.element.style.top = '0px';

	this.element.style.left = '0px';*/

	this.element.style.overflow = 'hidden';

	//this.element.style.backgroundImage = 'url(' + this.normalImage + ')';

	this.element.style.width = this.width + 'px';

	this.element.style.height = this.height + 'px';

	this.element.style.minHeight = this.height + 'px';

	//this.setBaseStyle(this.baseImage);

	//this.baseImage.style.position = 'relative';	

	/*this.baseElement.style.width = this.width+'px';

	this.baseElement.style.height = this.height+'px';*/

	this.baseElement.style.position = 'absolute';

	this.baseElement.style.top = '0px';

	this.baseElement.style.left = '0px';

	this.baseElement.style.overflow = 'hidden';

	//this.element.style.backgroundImage = 'url(' + this.normalImage + ')';

	this.baseElement.style.width = this.width + 'px';

	this.baseElement.style.height = this.height + 'px';

	this.baseElement.style.minHeight = this.height + 'px';

};



standAnimation.prototype.setBaseStyle = function(obj) {

	//var style = obj.style;

	this.element.style.position = 'absolute';

	this.element.style.top = '0px';

	this.element.style.left = '0px';

	//this.element.style.overflow = 'hidden';

	//this.element.style.backgroundImage = 'url(' + this.normalImage + ')';

	this.element.style.width = this.width + 'px';

	this.element.style.height = this.height + 'px';

	this.element.style.minHeight = this.height + 'px';

};



standAnimation.prototype.fitNormalImage = function(){

	this.baseElement.style.width = this.width + 'px';

	this.baseElement.style.height = this.height + 'px';

	//this.baseElement.width = this.width +'';

	//this.baseElement.height = this.height +'';

};



/*standAnimation.prototype.setXY = function(obj, x, y) {

	var style = obj.style;

	style.top = y + 'px';

	style.left = x + 'px';

};*/



standAnimation.prototype.setXY = function(x, y) {

	this.element.style.top = y + 'px';

	this.element.style.left = x + 'px';

};



standAnimation.prototype.addState = function(name, image, duration) {

	var anim = new Animation(duration, this.width, this.height, image);

	this.element.appendChild(anim.element);

	$(this.element).append(anim.element);

	anim.element.style.display = 'none';

	this.states[name] = anim;

};



standAnimation.prototype.setCurrentState = function(name, repeat) {

	

	if(repeat == undefined) repeat = false;

	if(name == ''){

		this.baseElement.style.display = 'block';

		//for(animName in this.states){

			this.states[this.currentAnim].element.style.display = 'none';

		//};

		this.currentAnim = name;

		return;

	};

	this.currentAnim = name;

	for(animName in this.states){

		//alert(animName + ':' + name);

		if(animName === name){		    

			this.states[animName].element.style.display = 'block';

			this.states[animName].tick = 0;

			var self = this;

			if(!repeat){

				this.states[animName].animationEnd = (function(){ self.setCurrentState(''); });

			}else{

				this.states[animName].animationEnd = (function(){});

			};

		}else{

			this.states[animName].element.style.display = 'none';

		};

	};

	this.baseElement.style.display = 'none';

};



standAnimation.prototype.animationEnds = function(){

	//alert('animation end');

	this.setCurrentState('');

};



standAnimation.prototype.render = function() {

	//alert('render!');

	if(this.currentAnim == '') return;

	this.states[this.currentAnim].render();

};



flashAnimation = function(image, width, height, totalFrames){

	this.width = width;

	this.height = height;

	this.states = {};

	this.currentAnim = '';

	this.image = image;

	this.totalFrames = totalFrames;

	this.tick = 0;

	var self = this;

	//this.meinSpat.connect(self.render, 'tick');

	//init

	this.element = document.createElement('div');

	//this.element.appendChild(this.baseElement);

	//this.baseImage = document.createElement('img');

	//this.baseImage.src = image;

	//this.baseElement.src = image;

	//this.setBaseStyle(this.element);

	this.element.style.position = 'absolute';

	/*this.element.style.top = '0px';

	this.element.style.left = '0px';*/

	this.element.style.overflow = 'hidden';

	this.element.style.backgroundImage = 'url(' + this.image + ')';

	this.element.style.width = this.width + 'px';

	this.element.style.height = this.height + 'px';

	this.element.style.minHeight = this.height + 'px';

	//this.addState('normal', 0, 0);

	this.duration = 0;

};





flashAnimation.prototype.setXY = function(x, y) {

	this.element.style.top = y + 'px';

	this.element.style.left = x + 'px';

};



flashAnimation.prototype.addState = function(name, start, end) {

	var anim = {

		start: start,

		end: end

	};

	this.states[name] = anim;

};



flashAnimation.prototype.setCurrentState = function(name, repeat) {

	

	if(repeat == undefined) repeat = false;

	if(name == ''){

		this.tick = 0;

		this.duration = 0;

		this.element.style.backgroundPosition = '0px 0px';

	};

	this.currentAnim = name;

	for(animName in this.states){

		//alert(animName + ':' + name);

		if(animName === name){		    

			//this.states[animName].element.style.display = 'block';

			this.tick = this.states[animName].start;

			this.duration = this.states[animName].end;

			var self = this;

			if(!repeat){

				this.animationEnd = (function(){ self.setCurrentState(''); });

			}else{

				this.animationEnd = (function(){});

			};

			break;

		};

	};

	//this.baseElement.style.display = 'none';

};



flashAnimation.prototype.animationEnds = function(){

	//alert('animation end');

	this.setCurrentState('');

};



flashAnimation.prototype.render = function() {

	if(this.currentAnim == '') return;

	if(this.tick > this.duration){

		//alert('hola');

		this.animationEnd();

		return

	};

	this.element.style.backgroundPosition = '-' + this.tick * this.width + 'px 0px';

	this.tick += 1;// % duration; 

	//alert('tick' + this.tick);

	//this.tick = this.tick % this.duration;

};

//multiple div, an div per frame

/*function Animation(duration, width, height, image){

	this.duration = duration;

	this.width = width;

	this.height = height;

	this.internalClock = duration / fps;

	this.finished = false;

	this.element = document.createElement('div');

	this.frames = new Array();

	for(var i = 0; i < duration; ++i){

		//alert(i);

		div = document.createElement('div');

		div.style.width = width + 'px';

		div.style.minHeight = height + 'px';

		div.style.minWidth = width + 'px';

		div.style.position = 'absolute';

		div.style.top = '0px';

		div.style.left = '0px';

		div.style.backgroundPosition = i * this.width + 'px 0px';

		div.style.display = 'none';

		div.style.backgroundImage = 'url(' + image + ')';

		this.frames.push(div);

		$(this.element).append(div);

	};

	this.frames[0].style.display = 'block';



	this.element.style.width = width + 'px';

	this.element.style.minHeight = height + 'px';

	this.element.style.minWidth = width + 'px';

	this.element.style.position = 'absolute';

	//this.element.style.backgroundImage = 'url(' + image + ')'

	this.tick = 0;

	

	this.addMoment = function(img, stage){

		/*this.ticks.push({

			image: img;

			i: stage

		});*

	};



	this.setX = function(x){ this.element.style.left = x + 'px'; };

	this.setY = function(y){ this.element.style.top = y + 'px'; };

	

	this.render = function(){

		//alert(this.tick);

		/*this.tick += 1;// % duration; 

		this.tick = this.tick % this.duration;

		this.element.style.backgroundPosition = this.tick * this.width + 'px 0px';*

		this.frames[this.tick].style.display = 'none';

		this.tick += 1;// % duration; 

		this.tick = this.tick % this.duration;

		this.frames[this.tick].style.display = 'block';

	};

	

};*/



function performanceStatus(updateTime, painter){

	this.updateEvery = updateTime;

	this.checkers = {};

	this.painter = painter;

	this.fpsCount = 0;

	this.timer = new Date();



	this.addChecker = function(name){

		this.checkers[name] = new Object();

		this.checkers[name].lastStamp = this.timer.getTime();

		this.checkers[name].span = 0;

	};



	this.check = function(name){

		stop = new Date().getTime();

		/*alert(this.checkers[name].lastStamp);

		alert(stop);*/

		this.checkers[name].span = stop - this.checkers[name].lastStamp;

		this.checkers[name].lastStamp = stop;

	};



	this.update = function(){

		/*this.fpsCount++;

		this.fpsCount = this.fpsCount % this.updateEvery;

		if(this.fpsCount == 0) this.draw();	*/

		this.draw();

	};



	this.draw = function(){

		this.painter.save();

		base = 10;

		//alert('performance draw');

		for(i in this.checkers){

			//alert(i);

			current = this.checkers[i];

			this.painter.font = "bold 12px sans-serif";

			this.painter.fillStyle = '#000';

			this.painter.fillText(i + ' : ' + current.span , 100, base);

			base += 15

		};

		this.painter.restore();

	};

	

};



function Options(menuNav, leaderNav){
	this.sound = true;
	this.menuNav = menuNav;
	this.menuElement = $('#' + menuNav);
	this.leaderElement = $('#' + leaderNav);
	this.element;
	this.toHide;

	this.showOptions = function(hideElement){
		this.menuElement[0].style.display = 'block';
		this.toHide = document.getElementById(hideElement);
		this.toHide.style.display = 'none';
	};

	this.exitOptions = function(){
		this.menuElement[0].style.display = 'none';
		this.toHide.style.display = 'block';
	};

	this.showLeaderboard = function(hideElement){
		this.leaderElement[0].style.display = 'block';
		this.toHide = document.getElementById(hideElement);
		this.toHide.style.display = 'none';
		this.menuElement[0].style.display = 'none';
	};

	this.exitLeaderboard = function(){
		this.toHide.style.display = 'block';
		//this.menuElement[0].style.display = 'block';
		this.leaderElement[0].style.display = 'none';
	};

	this.showNav = function(navToShow, navToHide){
		this.element = $('#'+navToShow);
		this.toHide = $('#' + navToHide);
		this.element[0].style.display = 'block';
		this.toHide[0].style.display = 'none';
	};

	this.backToMenu = function(){
		this.element[0].style.display = 'none';
		this.toHide[0].style.display = 'block';
	};

	this.toggleSound = function(){
		this.sound = !this.sound;
	};
	
	this.setSound = function(v){ this.sound = v; };
};