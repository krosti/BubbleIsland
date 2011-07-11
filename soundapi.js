var soundengine = {};

soundengine.sounds = [];
//soundengine.sounds2 = {};
soundengine.themes = [];
soundengine.currentTheme = null;
soundengine.enable = true;

function sound(name, file, duration){
	this.name = name;
	this.media = new Media(file);
	this.duration = duration;
	this.timer = null;
	this.playing = false;

	this.play =function(){
		//if(this.playing) return;
		this.media.stop();
		this.media.play();
		//var mahself = this;
		//this.timer = setTimeout(function(){ mahself.playing = false; }, this.duration);
		//this.media.play();
	};

	this.stop = function(){
		this.media.stop();
		this.playing = false;
	};

	this.loop = function(){
		this.stop();
		this.play();
	};

	this.startLoop = function(){
		if(this.timer == null){
			this.play();
			this.timer = setInterval(this.loop, this.duration);
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
	//soundengine.sounds2[name] = obj;
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
			/*soundengine.sounds[i].getCurrentPosition(function(pos){
				if(!(pos > -1)){
					this.play();
				};
			});*/
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
				soundengine.currentTheme[j].stopLoop();
			};
		}else{
			soundengine.currentTheme.stopLoop();
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
				++j;
			};	
		};
		++i;
	};	
};

soundengine.enableSound = function(){
	soundengine.enable = true;
	soundengine.backgroundsound.loop();
	soundengine.starttheme();
	window.localStorage.setItem('enablesound', 1);
	soundengine.soundToggled();
};
soundengine.disableSound = function(){
	soundengine.enable = false;
	soundengine.stopbackground();
	soundengine.stoptheme();
	window.localStorage.setItem('enablesound', 0);
	soundengine.soundToggled();
};

soundengine.soundToggled = function(){};

soundengine.backgroundsound = {};
soundengine.backgroundsound.duration = 1000;
soundengine.backgroundsound.media = null;
soundengine.backgroundsound.timer = null;
soundengine.backgroundsound.playing = false;

soundengine.startbackground = function(file, duration){
	soundengine.backgroundsound.media = new Media(file);
	soundengine.backgroundsound.duration = duration;
	soundengine.backgroundsound.playing = true;
	if(!soundengine.enable) return;
	soundengine.backgroundsound.loop();
};

soundengine.stopbackground = function(){
	soundengine.backgroundsound.playing = false;
	clearTimeout(soundengine.backgroundsound.timer);
	soundengine.backgroundsound.media.stop();
};

soundengine.backgroundsound.loop = function(){
	soundengine.backgroundsound.media.stop();
	if(!soundengine.enable) return;
	if(!soundengine.backgroundsound.playing) return;
	soundengine.backgroundsound.media.play();
	soundengine.backgroundsound.timer = setTimeout('soundengine.backgroundsound.loop()', soundengine.backgroundsound.duration);
};

soundengine.maintheme = {};

soundengine.themesound = {};
soundengine.themesound.duration = 1000;
soundengine.themesound.media = null;
soundengine.themesound.timer = null;
soundengine.themesound.playing = false;

soundengine.setuptheme = function(file, duration){
	soundengine.themesound.media = new Media(file);
	soundengine.themesound.duration = duration;
};

soundengine.starttheme = function(){
	if(!soundengine.enable) return;
	soundengine.themesound.playing = true;
	soundengine.themesound.loop();
}; 

soundengine.stoptheme = function(){
	soundengine.themesound.playing = false;
	clearTimeout(soundengine.themesound.timer);
	soundengine.themesound.media.stop();

};

soundengine.themesound.loop = function(){
	soundengine.themesound.media.stop();
	if(!soundengine.enable) return;
	if(!soundengine.themesound.playing) return;
	soundengine.themesound.media.play();
	soundengine.themesound.timer = setTimeout('soundengine.themesound.loop()', soundengine.themesound.duration);
};