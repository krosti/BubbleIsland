/*
Api for use the REST-api from softgame
*/

/*
data for testing 2011-05 - 09


Company Name:        Softgames
Project Name:            Bubble Paradise
Project URL: http://puzzlebubble.eudaimonia.com.ar
Softgames Server: http://drone.softgames.de (SOFTGAMES Portal Sandbox)
Project Id:                   9C5TVaAs3w1xvUOBn9BZM3g4E3I83DFn
Project Secret:           ***

F2A626BE8BECEABB0E8648DE1EB63232 good signature
*/

function softgameApi(displayNav){
	this.self = this;
	alert('get element: ' + displayNav);
	this.element = document.getElementById(displayNav);
	this.element.style.position = 'fixed';
	this.element.style.top = '0px';
	this.element.style.left = '0px';
	this.element.style.width = '320px';
	this.element.style.height = '480px';
	alert('making signature');
	this.signature = this.game_id + this.softgameSplit + this.softgameBackUrl + this.softgameSplit + this.softgameLangCode + this.softgameSplit + this.game_secret;
	//this.signature = this.game_id + this.softgameSplit + this.softgameLangCode + this.softgameSplit + this.softgameBackUrl + this.softgameSplit + this.game_secret;
	this.signature = this.signature.toUpperCase();
	alert(this.signature);
	this.signature = $.md5(this.signature).toUpperCase();
};

//const
softgameApi.prototype.game_id = '9C5TVaAs3w1xvUOBn9BZM3g4E3I83DFn';
softgameApi.prototype.game_secret = '8nMnqNRYc096xbBaCa0uuQN9XDPcwsWU';
//softgameApi.prototype.softgameUrl = 'http://sgds.softgame.de/'; <--- for production
softgameApi.prototype.softgameUrl = 'http://drone.softgames.de/'; //<--- for testing
softgameApi.prototype.softgameAuth = 'eui/auth';
softgameApi.prototype.softgameLogout = 'eui/logout';
softgameApi.prototype.softgameGetUserData = 'cpi/user';
softgameApi.prototype.softgameGetUserBalance = 'cpi/user/balance';
softgameApi.prototype.softgameOrderStart = 'cpi/order/start';
softgameApi.prototype.softgameDoOrder = 'eui/order';
softgameApi.prototype.softgameOrderFinalize = 'cpi/user/balance';
softgameApi.prototype.softgameBackUrl = "http://puzzlebubble.eudaimonia.com.ar/";
//softgameApi.prototype.softgameBackUrl = "http://eudaimonia.com.ar";
softgameApi.prototype.softgameSplit = '|';
softgameApi.prototype.softgameLangCode = 'en';
//softgameApi.prototype.softgame

//variables
softgameApi.prototype.username;
softgameApi.prototype.password;
softgameApi.prototype.uid;
softgameApi.prototype.userdata;
softgameApi.prototype.jqajax;
softgameApi.prototype.signature;
softgameApi.prototype.token  = 'C8C1EE20742435D14606135A61581C2A';
softgameApi.prototype.connected = false;
softgameApi.prototype.user = {};
softgameApi.prototype.userCoins = 0;
softgameApi.prototype.otoken = '';
//softgameApi.prototype.

//events
//softgameApi.prototype.on;

//listener
softgameApi.prototype.connectionEstablished = function(data){
	alert('connectionEstablished: ' + data);
	this.element.style.display = 'block';
	//s.slice(s.indexOf(q) + q.length, s.indexOf("&"))
	var d = data.slice(data.indexOf("<body"), data.indexOf('</html>'));
	alert('result: ' + d);
	this.element.innerHTML = d;
};

softgameApi.prototype.connectionError = function(obj, err, r){
	alert('error: ' + obj.getAllResponseHeaders() + err + r + this.url);
};

softgameApi.prototype.userRequest = function(data){
	if(data.status == 1){
		this.user = this.response;
	};
};

softgameApi.prototype.coinsRequest = function(data){
	if(data.status == 1){
		this.userCoins = this.response.balance;
	};
};

//functions
softgameApi.prototype.startConnection = function(){
	var link = this.softgameUrl + this.softgameAuth;
	var getdata = {
		pk: this.game_id,
		lang: this.softgameLangCode,
		sig: this.signature,
		back: this.softgameBackUrl
	};
	
	this.jqajax = $.ajax({
		type: 'GET',
		url: link,
		data: getdata,
		crossDomain: true,
		success: this.connectionEstablished,
		error: this.connectionError,
		complete: function(jq, errorStatus){
			alert('complete: ' + errorStatus +':'+jq.status + ':' + jq.getAllResponseHeaders()); 
		}
	});
};

// Get user information
softgameApi.prototype.getUserInfo = function(){
	if(!this.connected) return false;
	
	var uri = this.softgameUrl + this.softgameGetUserData;
	var gwtdata = {
		pk: this.game_id,
		sig:this.signature,
		token: this.token
	};
	this.jqajax = $.ajax({
		type: 'GET',
		url: uri,
		data: getdata,
		sync: true,
		/*success: this.connectionEstablished,
		error: this.connectionError*/
		success: function(){ alert('success' + this.url); },
		error: function(){ alert('error ' + this.url); }
	});
};



/*softgameApi.prototype.name = function(){
	if(!this.connected) return false;
	
	var uri = this.softgameUrl + this.softgame;
	var gwtdata = {
		pk: this.game_id,
		sig:this.signature,
		token: this.token
	};
	this.jqajax = $.ajax({
		type: 'GET',
		url: uri,
		data: getdata,
		sync: true,
		success: this.connectionEstablished,
		error: this.connectionError
	});
};*/
//softgameApi

//softgameApi.prototype. = function(){};
