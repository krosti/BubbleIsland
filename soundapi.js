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
	soundsengine.soundToggled();
};
soundengine.disableSound = function(){
	soundengine.enable = false;
	soundengine.stopbackground();
	soundengine.stoptheme();
	window.localStorage.setItem('enablesound', 0);
	soundsengine.soundToggled();
};

soundengine.soundToggled = function(){};

soundengine.backgroundsound = {};
soundengine.backgroundsound.duration = 1000;
soundengine.backgroundsound.media = null;
soundengine.backgroundsound.timer = null;

soundengine.startbackground = function(file, duration){
	soundengine.backgroundsound.media = new Media(file);
	soundengine.backgroundsound.duration = duration;
	if(!soundengine.enable) return;
	soundengine.backgroundsound.loop();
};

soundengine.stopbackground = function(){
	clearInterval(soundengine.backgroundsound.timer);
	soundengine.backgroundsound.media.stop();
};

soundengine.backgroundsound.loop = function(){
	if(!soundengine.enable) return;
	soundengine.backgroundsound.media.stop();
	soundengine.backgroundsound.media.play();
	soundengine.backgroundsound.timer = setInterval('soundengine.backgroundsound.loop()', soundengine.backgroundsound.duration);
};

soundengine.maintheme = {};

soundengine.themesound = {};
soundengine.themesound.duration = 1000;
soundengine.themesound.media = null;
soundengine.themesound.timer = null;

soundengine.setuptheme = function(file, duration){
	soundengine.themesound.media = new Media(file);
	soundengine.themesound.duration = duration;
};

soundengine.starttheme = function(){
	if(!soundengine.enable) return;
	soundengine.themesound.loop();
}; 

soundengine.stoptheme = function(){
	clearInterval(soundengine.themesound.timer);
	soundengine.themesound.media.stop();

};

soundengine.themesound.loop = function(){
	soundengine.themesound.media.stop();
	if(!soundengine.enable) return;
	soundengine.themesound.media.play();
	soundengine.themesound.timer = setInterval('soundengine.themesound.loop()', soundengine.themesound.duration);
};