
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
	this.element.style.minHeight = height + 'px';
	this.element.style.minWidth = width + 'px';
	this.element.style.position = 'absolute';
	this.element.style.backgroundImage = 'url(' + image + ')'
	this.tick = 0;
	
	this.addMoment = function(img, stage){

	};

	this.setX = function(x){ this.element.style.left = x + 'px'; };
	this.setY = function(y){ this.element.style.top = y + 'px'; };
	
	this.render = function(){
		//alert(this.tick);
		this.tick += 1;// % duration; 
		this.tick = this.tick % this.duration;
		this.element.style.backgroundPosition = this.tick * this.width + 'px 0px';
		//this.frames[this.tick].style.display = 'none';
	};
	
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