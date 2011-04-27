
function Loader(progress){
	this.progressBar = document.getElementById(progress);	

	bubbleSilverImage = new Image();
	bubbleRedImage = new Image();
	bubbleOrangeImage = new Image();
	bubblePurpleImage = new Image();
	bubbleYellowImage = new Image();
	lvlFrame = new Image();
	backgroundImage = new Image();
	logoImage = new Image();
	
	this.readyLoad;// = function(){ alert('hola'); };
	
	this.toLoad = 8;
	this.isloaded = 0;
	
	this.loaded = function(){
		this.isloaded++;
		this.progressBar.style.width = ((this.isloaded / this.toLoad) * 100)+ '%';
		if(this.isloaded == this.toLoad) this.readyLoad();
	};
	
	this.init = function(){	
		bubbleSilverImage.onLoad = this.loaded();
		bubbleOrangeImage.onLoad = this.loaded();
		bubbleRedImage.onLoad = this.loaded();
		bubblePurpleImage.onLoad = this.loaded();
		bubbleYellowImage.onLoad = this.loaded();
		lvlFrame.onLoad = this.loaded();
		backgroundImage.onLoad = this.loaded();
		logoImage.onLoad = this.loaded();
	};
	
	bubbleSilverImage.src = 'silverbubble.png';
	bubbleOrangeImage.src = 'orangebubble.png';
	bubbleRedImage.src = 'redbubble.png';
	bubblePurpleImage.src = 'purplebubble.png';
	bubbleYellowImage.src = 'yellowbubble.png';
	lvlFrame.src = 'lvlboundering.png';
	backgroundImage.src = 'background.png';
	logoImage.src = 'logo.jpg';
};

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
			what[i]();
		}
	};

};

function Animation(duration, fps){
	this.duration = duration;
	this.fps = fps;
	this.ticks = new Array();
	this.internalClock = duration / fps;
	this.finished = false;
	
	this.addMoment = function(img, stage){
		/*this.ticks.push({
			image: img;
			i: stage
		});*/
	};
	
	this.render = function(painter, x, y){
		if(this.finished) return;
		
		this.internalClock--;
		if(this.internalClocl == 0) this.finished = true;
	};
	
};

function performanceStatus(updateTime){
	this.updateEvery = updateTime;
	this.checkers = new Array();
	
	this.addChecker = function(name){
		
	};
	//Init
	
};