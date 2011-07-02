var soundengine = {};

soundengine.sounds = [];
soundengine.themes = [];
soundengine.currentTheme = null;
soundengine.enable = true;

soundengine.soundloaded = function(name){};

soundengine.loaded = function(){
	//alert('hola');
	soundengine.soundloaded();
};

soundengine.addSound = function(name, file){
	var obj = {};
	obj.name = name;
	obj.filename = file;
	obj.element = document.createElement('audio');	
	document.body.appendChild(obj.element);
	//obj.element.onload = soundengine.loaded;
	obj.element.addEventListener('canplaythrough', function(){soundengine.loaded();}, false);
	obj.element.src = file;
	soundengine.sounds.push(obj);
};
soundengine.addTheme = function(name, file){
	var obj = {};
	obj.name = name;
	obj.filename = file;
	obj.element = document.createElement('audio');
	document.body.appendChild(obj.element);
	obj.element.addEventListener('canplaythrough', function(){soundengine.loaded();}, false);
	obj.element.src = file;
	soundengine.themes.push(obj);
};

soundengine.reproduceSound = function(name){
	if(!soundengine.enable) return;
	var i = 0;
	var found = false;
	while((i < soundengine.sounds.length) && (!found)){
		if(soundengine.sounds[i].name = name){
			found = true;
			soundengine.sounds[i].obj.currentTime(0);
			soundengine.sounds[i].obj.play();
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
						soundengine.currentTheme[j].element.pause();
					};
				}else{
					soundengine.currentTheme.obj.pause();
				};
			};
			//soundengine.themes[i].element.currentTime = 0;
			soundengine.themes[i].element.loop = true;
			soundengine.themes[i].element.play();
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
				soundengine.currentTheme[j].element.pause();
			};
		}else{
			soundengine.currentTheme.element.pause();
		};
	};

	while((i < soundengine.themes.length) && (!found)){
		j = 0;
		found2 = false;
		while((j < soundengine.themes.length) && (!found2)){
			if(soundengine.themes[i].name == names[j]){
				found2 = true;
				soundengine.themes[i].obj.currentTime(0);
				soundengine.themes[i].obj.loop = true;
				soundengine.themes[i].obj.play();
				soundengine.currentTheme = soundengine.themes[i];
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