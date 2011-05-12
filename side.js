
function Loader(progress){
	this.progressBar = document.getElementById(progress);	

	bubbleSilverImage = new Image();
	bubbleRedImage = new Image();
	bubbleOrangeImage = new Image();
	bubblePurpleImage = new Image();
	bubbleYellowImage = new Image();
	bubbleSilverBombImage = new Image();
	bubbleRedBombImage = new Image();
	bubbleOrangeBombImage = new Image();
	bubblePurpleBombImage = new Image();
	bubbleYellowBombImage = new Image();
	bubbleSilverHalfImage = new Image();
	bubbleRedHalfImage = new Image();
	bubbleOrangeHalfImage = new Image();
	bubblePurpleHalfImage = new Image();
	bubbleYellowHalfImage = new Image();
	bubbleSilverFreezeImage = new Image();
	bubbleRedFreezeImage = new Image();
	bubbleOrangeFreezeImage = new Image();
	bubblePurpleFreezeImage = new Image();
	bubbleYellowFreezeImage = new Image();
	lvlFrame = new Image();
	backgroundImage = new Image();
	logoImage = new Image();
	cannonImage = new Image();
	pandaBearAnim = new Image();
	
	this.readyLoad;// = function(){ alert('hola'); };
	
	this.toLoad = 25;
	this.isloaded = 0;
	
	this.loaded = function(){
		//alert(this.isloaded);
		this.isloaded++;
		this.progressBar.style.width = ((this.isloaded / this.toLoad) * 100)+ '%';
		if(this.isloaded == this.toLoad) this.readyLoad();
	};
	
	this.init = function(){	
		/*bubbleSilverImage.onLoad = this.loaded();
		bubbleOrangeImage.onLoad = this.loaded();
		bubbleRedImage.onLoad = this.loaded();
		bubblePurpleImage.onLoad = this.loaded();
		bubbleYellowImage.onLoad = this.loaded();
		lvlFrame.onLoad = this.loaded();
		backgroundImage.onLoad = this.loaded();
		logoImage.onLoad = this.loaded();
		cannonImage.onLoad = this.loaded;*/
		bubbleSilverImage.onLoad = this.loaded();
		bubbleOrangeImage.onLoad = this.loaded();
		bubbleRedImage.onLoad = this.loaded();
		bubblePurpleImage.onLoad = this.loaded();
		bubbleYellowImage.onLoad = this.loaded();
		bubbleSilverBombImage.onLoad = this.loaded();
		bubbleOrangeBombImage.onLoad = this.loaded();
		bubbleRedBombImage.onLoad = this.loaded();
		bubblePurpleBombImage.onLoad = this.loaded();
		bubbleYellowBombImage.onLoad = this.loaded();
		bubbleSilverFreezeImage.onLoad = this.loaded();
		bubbleOrangeFreezeImage.onLoad = this.loaded();
		bubbleRedFreezeImage.onLoad = this.loaded();
		bubblePurpleFreezeImage.onLoad = this.loaded();
		bubbleYellowFreezeImage.onLoad = this.loaded();
		bubbleSilverHalfImage.onLoad = this.loaded();
		bubbleRedHalfImage.onLoad = this.loaded();
		bubbleOrangeHalfImage.onLoad = this.loaded();
		bubblePurpleHalfImage.onLoad = this.loaded();
		bubbleYellowHalfImage.onLoad = this.loaded();
		lvlFrame.onLoad = this.loaded();
		backgroundImage.onLoad = this.loaded();
		logoImage.onLoad = this.loaded();
		cannonImage.onLoad = this.loaded();
		pandaBearAnim.onLoad = this.loaded();
		this.startLoad();
	};

	this.startLoad = function(){	
		bubbleSilverImage.src = 'silverbubble.png';
		bubbleOrangeImage.src = 'orangebubble.png';
		bubbleRedImage.src = 'redbubble.png';
		bubblePurpleImage.src = 'purplebubble.png';
		bubbleYellowImage.src = 'yellowbubble.png';

		bubbleSilverBombImage.src = 'silverbubblebomb.png';
		bubbleOrangeBombImage.src = 'orangebubblebomb.png';
		bubbleRedBombImage.src = 'redbubblebomb.png';
		bubblePurpleBombImage.src = 'purplebubblebomb.png';
		bubbleYellowBombImage.src = 'yellowbubblebomb.png';
		
		bubbleSilverFreezeImage.src = 'silverbubblefreeze.png';
		bubbleOrangeFreezeImage.src = 'orangebubblefreeze.png';
		bubbleRedFreezeImage.src = 'redbubblefreeze.png';
		bubblePurpleFreezeImage.src = 'purplebubblefreeze.png';
		bubbleYellowFreezeImage.src = 'yellowbubblefreeze.png';
		
		bubbleSilverHalfImage.src = 'halfsilverbubble.png';
		bubbleOrangeHalfImage.src = 'halforangebubble.png';
		bubbleRedHalfImage.src = 'halfredbubble.png';
		bubblePurpleHalfImage.src = 'halfpurplebubble.png';
		bubbleYellowHalfImage.src = 'halfyellowbubble.png';

		lvlFrame.src = 'lvlboundering.png';
		backgroundImage.src = 'background.png';
		logoImage.src = 'logo.jpg';
		cannonImage.src = 'cannon.png';
		
		pandaBearAnim.src = 'animacion.png';
	};
};
//function Timeline(self, fps){ //donde self es el nombre del objeto usado
function Timeline(fps){
	this.animations = new Array();
	this.fps = fps;
	this.timerId;
	
	this.onStop = new Array();
	this.onStart = new Array();
	this.onTick = new Array();
	
	this.tick = function(){
		this.trigger(this.onTick);
	};
	
	this.start = function(){
		//empieza la animacion
		this.trigger(this.onStart);
		this.timerId = setInterval("this.tick()", 1000/this.fps);
		//this.timerId = setTimeout("this.tick()", 1);
	};
	
	this.stop = function(){
		//detiene la animacion
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
	this.element.style.top = '0px';
	this.element.style.left = '0px';
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
		for(animName in this.states){
			this.states[this.currentAnim].element.style.display = 'none';
		};
		this.currentAnim = name;
		return;
	};
	this.currentAnim = name;
	this.baseElement.style.display = 'none';
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

	this.showLeaderboard = function(){
		this.leaderElement[0].style.display = 'block';
		this.menuElement[0].style.display = 'none';
	};

	this.exitLeaderboard = function(){
		this.menuElement[0].style.display = 'block';
		this.leaderElement[0].style.display = 'none';
	}

	this.toggleSound = function(){
		this.sound = !this.sound;
	};
	
	this.setSound = function(v){ this.sound = v; };
};