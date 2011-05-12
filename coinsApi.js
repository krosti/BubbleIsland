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
	this.signature = $.md5(this.signature).toUpperCase();
	alert(this.signature);
};

//const
//softgameApi.prototype.element = '';
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
softgameApi.prototype.element;
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
	this.element.style.display = 'none';
	//s.slice(s.indexOf(q) + q.length, s.indexOf("&"))
	//alert(this.uri)
	data = data + '';
	//this.element.innetHTML = data;
	if(data.indexOf("https://")){
		var faceuri = data.slice(data.indexOf("https://"), data.indexOf('<table cellpadding="0" cellspacing="0" class="table-centered">') - 2);
		alert('result: ' + faceuri);
		jq = $.ajax({
			type: 'GET',
			url: faceuri,
			success: function(data){ softgame.facebbokConnectResponse(data) },
			error: function(data, error){ alert('error'); }
		});
	}else{
		
	};
	//var d = data.slice(data.indexOf("<body"), data.indexOf('</html>'));
	
	//this.element.innerHTML = d;
};

softgameApi.prototype.facebookConnectResponse = function(data){
	alert('facebookConnectResponse: ' + data);
	if(data.indexOf('window.location.href="')){
		var faceuri = data.slice(data.indexOf('window.location.href="'), data.indexOf('</script>') - 2);
		alert('result second: ' + faceuri);
		jq = $.ajax({
			type: 'GET',
			url: faceuri,
			success: function(data){ FB.connectResponse(data) },
			error: function(data, error){FB.error(data, error) }
		});
	}else{
		alert('second result');
	};
	
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
		/*success: this.connectionEstablished,
		error: this.connectionError,*/
		success: function(data){ softgame.connectionEstablished(data); },
		error: function(obj, err, r){ softgame.connectionError(obj, err, r); },
		complete: function(jq, errorStatus){
			alert('complete: ' + errorStatus +':'+jq.status + ':' + jq.getAllResponseHeaders()); 
		}
	});
};

// Get user information
softgameApi.prototype.getUserInfo = function(){
	if(!this.connected) return false;
	
	var uri = this.softgameUrl + this.softgameGetUserData;
	var getdata = {
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
