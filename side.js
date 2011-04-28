
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

	/*bubbleSilverImage.src = 'silverbubble.jpg';
	bubbleOrangeImage.src = 'orangebubble.jpg';
	bubbleRedImage.src = 'redbubble.jpg';
	bubblePurpleImage.src = 'purplebubble.jpg';
	bubbleYellowImage.src = 'yellowbubble.jpg';*/

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