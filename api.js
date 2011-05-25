api = {};

api.facebook = {};
api.softgame = {};

//Facebook api
api.facebook.appid = '213255638692367';
api.facebook.appkey = '230bd48e2d38a991fe41e284887db3d8';
api.facebook.accessToken = '';
api.facebook.user = {};
api.facebook.friends = {};
api.facebook.xhr;
api.facebook.framework;
api.facebook.onConnect = function(){};
api.facebook.onFriends = function(){};
api.facebook.onPost = function(){};

api.facebook.startConnection = function(){
	//FB.onConnect = connectToFacebook2;
	var uri = 'https://www.facebook.com/dialog/oauth?client_id=' + api.facebook.appid + '&scope=publish_stream&redirect_uri=http://www.facebook.com/connect/login_success.html&display=touch&response_type=token';
	alert('before ajax: ' + uri);
	api.facebook.xhr = $.ajax({
		type: 'GET',
		url: uri,
		crossDomain: true,
		success: function(data){ api.facebook.connectResponse(data) },
		error: function(data, error){ api.facebbok.errorResponse(data, error) }
	})
};

api.facebook.errorResponse = function(data, error){
	alert(data + ':' + error);
};

api.facebook.connectResponse = function(data){
	alert('connectResponse: ' + data);
	if(data.indexOf('access_token=') != -1){
		api.softgame.loginResponse(data);
		return;
	};
	api.facebook.framework.style.display = 'block';
	api.facebook.framework.innerHTML = data;
	$('form').submit(function(){
		var todata = {};
		var inputs = $('input');
		for(var i = 0; i < inputs.length; ++i){
			todata[inputs[i].name] = inputs[i].value;	
			alert(inputs[i].name + ':' + inputs[i].value);				
		};
		alert($('form')[0].action);
		$.ajax({
			type: 'POST',
			url: $('form')[0].action,
			data: todata,
			success: function(data){ api.facebook.loginResponse(data); },
			error: function(xhr, textStatus, data){ alert(textStatus) }
		});
		return false;
	});
};

api.facebook.loginResponse = function(data){
	alert('login response: ' + data);
	var tokenstring = 'access_token=';
	if(data.indexOf(tokenstring) != -1){ //existe token
		//this.isConnected = true;
		api.facebook.accessToken = data.slice(data.indexOf(tokenstring) + tokenstring.length, data.indexOf("&"));
		api.facebook.accessToken = '"' + this.token + '"';
		alert(api.facebook.accessToken);
		api.facebook.accessToken = eval(api.facebook.accessToken);
		/*this.token = this.token.replace("\\u", "|");
		this.token = this.token.replace("\\u", "|");*/
		//alert('connected!: ' + this.token);
		api.facebook.framework.style.display = 'none';
		api.facebook.onConnect();
	}else{
		//alert('no connected');
	};
	api.facebook.framework.innerHTML = data;
};

api.facebook.retrieveUserData = function(){
	

};

api.facebook.retrieveUserFriends = function(){
	
};

api.facebook.postMessage = function(msg){
	
};

//api softgame
//api.softgame.
api.softgame.game_id = '9C5TVaAs3w1xvUOBn9BZM3g4E3I83DFn';
api.softgame.game_secret = '8nMnqNRYc096xbBaCa0uuQN9XDPcwsWU';
//api.softgame.softgameUrl = 'http://sgds.softgame.de/'; <--- for production
api.softgame.softgameUrl = 'http://drone.softgames.de/'; //<--- for testing
api.softgame.softgameAuth = 'eui/auth';
api.softgame.softgameLogout = 'eui/logout';
api.softgame.softgameGetUserData = 'cpi/user';
api.softgame.softgameGetUserBalance = 'cpi/user/balance';
api.softgame.softgameOrderStart = 'cpi/order/start';
api.softgame.softgameDoOrder = 'eui/order';
api.softgame.softgameOrderFinalize = 'cpi/user/balance';
api.softgame.softgameBackUrl = "http://puzzlebubble.eudaimonia.com.ar/";
//api.softgame.softgameBackUrl = "http://eudaimonia.com.ar";
api.softgame.split = '|';
//api.softgame.split2 = '||';
api.softgame.softgameLangCode = 'en';

//variables
api.softgame.framework;
api.softgame.username;
api.softgame.password;
api.softgame.uid;
api.softgame.userdata;
api.softgame.xhr;
api.softgame.signature;
api.softgame.token  = '';
api.softgame.connected = false;
api.softgame.user = {};
api.softgame.userCoins = 0;
api.softgame.otoken = '';

api.softgame.startSignature = function(type){	 
	(type == 'RESTApi')? api.softgame.split = '|' : api.softgame.split = '||';
	api.softgame.signature = api.softgame.game_id;
};

api.softgame.addSignatureParm = function(p){
	api.softgame.signature += api.softgame.split + p;
};

api.softgame.getSignature = function(){
	api.softgame.addSignatureParm(api.softgame.game_secret);
	api.softgame.signature = api.softgame.signature.toUpperCase();
	api.softgame.signature = $.md5(api.softgame.signature).toUpperCase();
	return api.softgame.signature;
};

api.softgame.JSON2Signature = function(obj, type){
	api.softgame.startSignature(type);
	var data = [];
	for(param in obj){
		data.push(obj[param]);
	};
	api.softgame.signature = data.join(api.softgame.split);
	return api.softgame.getSignature();
};

//api.softgame.on;
api.softgame.onLoginUser = function(){};
api.softgame.onUserBalance = function(){};
api.softgame.onLogin = function(){};

//functions
api.softgame.startConnection = function(){
	alert('starConnection');
	var link = api.softgame.softgameUrl + api.softgame.softgameAuth;
	var getdata = {
		pk: api.softgame.game_id,
		back: api.softgame.softgameBackUrl,
		lang: api.softgame.softgameLangCode
	};
	alert('to sign');
	var sign = api.softgame.JSON2Signature(getdata, 'RESTApi');
	alert('signed');
	getdata.sig = sign;
	/*for(param in getdata){
		alert()
	};*/
	alert(link);
	api.softgame.xhr = $.ajax({
		type: 'GET',
		url: link,
		data: getdata,
		success: function(data, textStatus){ api.softgame.connectionEstablished(data); },
		error: function(obj, err, r){  alert(this.url); api.softgame.connectionError(obj, err, r); }
	});
};

// Get user information
api.softgame.getUserInfo = function(){
	//if(!this.connected) return false;
	alert('user info');
	var uri = api.softgame.softgameUrl + api.softgame.softgameGetUserData;
	alert('uri: ' + uri);
	var getdata = {
		pk: api.softgame.game_id,
		token: api.softgame.token
	};
	var sign = api.softgame.JSON2Signature(getdata, 'RESTApi');
	getdata[sig] = sign;
	api.softgame.xhr = $.ajax({
		type: 'GET',
		url: uri,
		data: getdata,
		success: function(data){ api.softgame.userRequest(data); },
		error: function(){ alert('error ' + this.url); }
	});
};

api.softgame.getUserBalance = function(){
	if(this.userdata == undefined){
		alert('Error! we dont have your info yet, please wait while we chat with our server to ask about you :)');
		return;
	};
	var uri = this.softgameUrl + this.softgameGetUserBalance;
	var signature = this.game_id + this.split2 +  this.token + this.split2 + this.game_secret;
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

//response handlers
api.softgame.connectionEstablished = function(data){
	alert('connectionEstablished: ' + data);
	api.softgame.framework.style.display = 'none';
	//s.slice(s.indexOf(q) + q.length, s.indexOf("&"))
	//alert(this.uri)
	/*data = data + '';
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
	}else{*/
		if(data.indexOf('token') != -1){
			var response = eval('(' + data + ')');
			//alert('response: ' + response);
			api.softgame.token = response.token;	
			api.softgame.signature = response.sig;
			api.softgame.framework.style.display = 'none';
			api.softgame.onLogin();
			api.softgame.getUserInfo();
		}else{
			alert('Error gral de apps');
			api.softgame.framework.style.display = 'block';
			api.softgame.framework.innerHTML = data;
		};
	//};
	//var d = data.slice(data.indexOf("<body"), data.indexOf('</html>'));

	//this.element.innerHTML = d;
};

api.softgame.connectionError = function(obj, err, r){
	alert('error: ' + obj.getAllResponseHeaders() + err + r + this.url);
};

api.softgame.userRequest = function(data){
	alert(data);
	if(data.status == 1){
		api.softgame.user = data.response;
		api.softgame.onLoginUser();
	};
};

api.softgame.coinsRequest = function(data){
	if(data.status == 1){
		api.softgame.userCoins = data.response.balance;
	};
};
