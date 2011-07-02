var soundengine = {};

soundengine.sounds = [];
soundengine.themes = [];
soundengine.currentTheme = null;
soundengine.enable = true;

function sound(name, file, duration){
	this.name = name;
	this.media = new Media(file);
	this.duration = duration;
	this.timer = null;

	this.play =function(){
		this.media.play();
	};

	this.stop = function(){
		this.media.stop();
	};

	this.loop = function(){
		this.stop();
		this.play();
	};

	this.startLoop = function(){
		if(this.timer == null){
			this.play();
			this.timer = setInterval(this.loop, duration);
		};
	};
	this.stopLoop = function(){
		clearInterval(this.timer);
		this.timer = null;
	};
};

soundengine.soundloaded = function(name){};

soundengine.loaded = function(){
	//alert('hola');
	soundengine.soundloaded();
};

soundengine.addSound = function(name, file){
	/*var obj = {};
	obj.name = name;
	obj.filename = file;
	obj.element = document.createElement('audio');	
	document.body.appendChild(obj.element);
	//obj.element.onload = soundengine.loaded;
	obj.element.addEventListener('canplaythrough', function(){soundengine.loaded();}, false);
	obj.element.src = file;*/
	var obj = new sound(name, file, 1000);
	soundengine.sounds.push(obj);
};
soundengine.addTheme = function(name, file, duration){
	/*var obj = {};
	obj.name = name;
	obj.filename = file;
	obj.element = document.createElement('audio');
	document.body.appendChild(obj.element);
	obj.element.addEventListener('canplaythrough', function(){soundengine.loaded();}, false);
	obj.element.src = file;*/
	var obj = new sound(name, file, duration);
	soundengine.themes.push(obj);
};

soundengine.reproduceSound = function(name){
	if(!soundengine.enable) return;
	var i = 0;
	var found = false;
	while((i < soundengine.sounds.length) && (!found)){
		if(soundengine.sounds[i].name == name){
			found = true;
			//soundengine.sounds[i].obj.currentTime(0);
			soundengine.sounds[i].play();
		}else{
			++i;
		};
	};
};
soundengine.startTheme = function(name){
	if(!soundengine.enable) return;
	var i = 0;
	var found = false;
	while((i < soundengine.themes.length) && (!found)){
		//alert(i);
		if(soundengine.themes[i].name == name){
			found = true;
			if(soundengine.currentTheme != null){
				if(typeof(soundengine.currentTheme) == "array"){
					for(var j = 0; j < soundengine.currentTheme.length; ++j){
						soundengine.currentTheme[j].stop();
					};
				}else{
					soundengine.currentTheme.stop();
				};
			};
			soundengine.themes[i].startLoop();
			soundengine.currentTheme = soundengine.themes[i];
		}else{
			++i;
		};
	};	
};

soundengine.startThemes = function(names){
	if(!soundengine.enable) return;
	var i = 0;
	var j = 0;
	var found = false;
	var found2 = false;

	if(soundengine.currentTheme != null){
		if(typeof(soundengine.currentTheme) == "array"){
			for(var j = 0; j < soundengine.currentTheme.length; ++j){
				soundengine.currentTheme[j].element.stop();
			};
		}else{
			soundengine.currentTheme.element.stop();
		};
	};
	soundengine.currentTheme = [];
	while((i < soundengine.themes.length) && (!found)){
		j = 0;
		found2 = false;
		while((j < soundengine.themes.length) && (!found2)){
			if(soundengine.themes[i].name == names[j]){
				found2 = true;
				/*soundengine.themes[i].obj.currentTime(0);
				soundengine.themes[i].obj.loop = true;*/
				soundengine.themes[i].startLoop();
				soundengine.currentTheme.push(soundengine.themes[i]);
			}else{
				++i;
			};	
		};
	};	
};

soundengine.enableSound = function(){
	soundengine.enable = true;
};
soundengine.disableSound = function(){
	soundengine.enable = false;
};