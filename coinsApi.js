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

http://drone.softgames.de/eui/auth?pk=9C5TVaAs3w1xvUOBn9BZM3g4E3I83DFn&lang=en&sig=BA97816F2802DBA7FF69D8BCC22CF3E3&back=http://puzzlebubble.eudaimonia.com.ar/
*/

function softgameApi(displayNav){
	this.self = this;
	this.jq;
	//alert('get element: ' + displayNav);
	this.element = document.getElementById(displayNav);
	this.element.style.position = 'fixed';
	this.element.style.top = '0px';
	this.element.style.left = '0px';
	this.element.style.width = '320px';
	this.element.style.height = '480px';
	//alert('making signature');
	this.signature = this.game_id + this.softgameSplit + this.softgameBackUrl + this.softgameSplit + this.softgameLangCode + this.softgameSplit + this.game_secret;
	//this.signature = this.game_id + this.softgameSplit + this.softgameLangCode + this.softgameSplit + this.softgameBackUrl + this.softgameSplit + this.game_secret;
	this.signature = this.signature.toUpperCase();
	this.signature = $.md5(this.signature).toUpperCase();
	//alert(this.signature);
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
softgameApi.prototype.softgameSplit2 = '||';
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
softgameApi.prototype.onLoginUser = function(){};
softgameApi.prototype.onUserBalance = function(){};
softgameApi.prototype.onLogin = function(){};

//listener
softgameApi.prototype.connectionEstablished = function(data){
	alert('connectionEstablished: ' + data);
	this.element.style.display = 'none';
	//s.slice(s.indexOf(q) + q.length, s.indexOf("&"))
	//alert(this.uri)
	data = data + '';
	//this.element.innetHTML = data;
	if(data.indexOf("https://") != -1){
		var faceuri = data.slice(data.indexOf("https://"), data.indexOf('<table cellpadding="0" cellspacing="0" class="table-centered">') - 2);
		//alert('result: ' + faceuri);
		this.jq = $.ajax({
			type: 'GET',
			url: faceuri,
			crossDomain: true,
			success: function(data){ softgame.facebookConnectResponse(data); },
			error: function(data, error){ alert('error first attemp'); }
			//complete: function(xhr,textStatus){ if(xhr.status == 302){ alert('complete: connectionEstablished ' + xhr.getResponseHeader("Location")); }; }
		});
	}else{
		if(data.indexOf('token') != -1){
			var response = eval('(' + data + ')');
			//alert('response: ' + response);
			this.token = response.token;	
			this.signature = response.sig;
			this.element.style.display = 'none';
			this.onLogin();
			softgame.getUserInfo();
		}else{
			alert('Error gral de apps');
			this.element.style.display = 'block';
			this.element.innerHTML = data;
		};
	};
	//var d = data.slice(data.indexOf("<body"), data.indexOf('</html>'));

	//this.element.innerHTML = d;
};

softgameApi.prototype.facebookConnectResponse = function(data){
	alert('facebookConnectResponse: ' + data);
	if(data.indexOf('window.location.href="') != -1){
		var faceuri = data.slice(data.indexOf('window.location.href="') + 22, data.indexOf('";'));
		faceuri = '"' + faceuri + '"';
		faceuri = eval(faceuri);
		//alert('result second: ' + faceuri);
		faceuri = decodeURI(faceuri);
		//window.location = faceuri;
		this.jq = $.ajax({
			type: 'GET',
			url: faceuri,
			//success: function(data){ FB.connectResponse(data) },
			success: function(data){softgame.secondConnectResponse(data, decodeURI(this.url)); },
			error: function(data, error){ alert('facebookConnectResponse: ' + data.responseText + ' : ' + error); }
			//complete: function(xhr,textStatus){ alert('complete: facebookConnectionEstablished ' + xhr.getAllResponseHeaders());  }
		});
	}else{
		//alert('login on facebook');
		if(data.indexOf('<label class="uiButton uiButtonLarge" id="cancel_clicked" ') == -1){			
			$('form').submit(function(){
				var todata = {};
				var inputs = $('input');
				for(var i = 0; i < inputs.length; ++i){
					todata[inputs[i].name] = inputs[i].value;
					//alert(inputs[i].name + ':' + inputs[i].value);
				};
				//alert('form.action: ' + $('form')[0].action);
				//alert(inputs[0].name + ':' + inputs[0].value);

				$.ajax({
					type: 'POST',
					url: $('form')[0].action,
					data: todata,
					success: function(data){ softgame.facebookConnectResponse(data); },
					error: function(xhr, textStatus, data){ alert(textStatus) }
				});
				return false;
			});
		}else{
			window.location = this.jq.url;
		};
		this.element.style.display = 'block';
		this.element.innerHTML = data;
	};
};

softgameApi.prototype.secondConnectResponse = function(data, uri){
	//alert('secondConnectResponse: ' + data);
	/*alert('this.url: ' + this.url);
	alert('uri: ' + uri);*/
	var response = eval('(' + data + ')');
	//alert('response: ' + response);
	this.token = response.token;	
	this.signature = response.sig;
	this.element.style.display = 'none';
	this.onLogin();
	softgame.getUserInfo();
};

softgameApi.prototype.connectionError = function(obj, err, r){
	alert('error: ' + obj.getAllResponseHeaders() + err + r + this.url);
};

softgameApi.prototype.userRequest = function(data){
	if(data.status == 1){
		this.user = this.response;
		this.onLoginUser();
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
	//alert(link);
	this.jqajax = $.ajax({
		type: 'GET',
		url: link,
		data: getdata,
		/*success: this.connectionEstablished,
		error: this.connectionError,*/
		success: function(data, textStatus){ softgame.connectionEstablished(data); },
		error: function(obj, err, r){  alert(this.url); softgame.connectionError(obj, err, r); }
		/*complete: function(jq, errorStatus){
			alert('complete: ' + errorStatus +':'+jq.status + ':' + jq.getAllResponseHeaders()); 
		}*/
	});
};

// Get user information
softgameApi.prototype.getUserInfo = function(){
	//if(!this.connected) return false;
	alert('user info');
	var uri = this.softgameUrl + this.softgameGetUserData;
	var signature = this.game_id + this.softgameSplit2 +  this.token + this.softgameSplit2 + this.game_secret;
	signature = signature.toUpperCase();
	signature = $.md5(signature).toUpperCase();
	alert('uri: ' + uri);
	var getdata = {
		pk: this.game_id,
		sig: signature,
		token: this.token
	};

	this.jqajax = $.ajax({
		type: 'GET',
		url: uri,
		data: getdata,
		/*success: this.connectionEstablished,
		error: this.connectionError*/
		success: function(data){ softgame.userRequest(data); },
		error: function(){ alert('error ' + this.url); }
	});
};

softgameApi.prototype.getUserBalance = function(){
	if(this.userdata == undefined){
		alert('Error! we dont have your info yet, please wait while we chat with our server to ask about you :)');
		return;
	};
	var uri = this.softgameUrl + this.softgameGetUserBalance;
	var signature = this.game_id + this.softgameSplit2 +  this.token + this.softgameSplit2 + this.game_secret;
	signature = signature.toUpperCase();
	signature = $.md5(signature).toUpperCase();
	var getdata = {
		pk: this.game_id,
		token: this.token,
		sig: signature
	};
	this.jqajax = $.ajax({
		type: 'GET',
		url: uri,
		data: getdata,
		success: function(data){ alert('success: ' + data); },
		error: function(xhr, data){ alert('error: ' + data); }
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