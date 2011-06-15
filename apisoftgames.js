api.softgame = {};

api.softgame.game_id = '9C5TVaAs3w1xvUOBn9BZM3g4E3I83DFn';
api.softgame.game_secret = '8nMnqNRYc096xbBaCa0uuQN9XDPcwsWU';
//api.softgame.softgameUrl = 'http://sgds.softgame.de/'; <--- for production
api.softgame.softgameUrl = 'http://drone.softgames.de/'; //<--- for testing
api.softgame.softgameAuth = 'eui/auth';
api.softgame.softgameLogout = 'eui/logout';
api.softgame.softgameGetUserData = 'cpi/user';
api.softgame.softgameGetUserBalance = 'cpi/user/balance';
api.softgame.softgameOrderStart = 'cpi/order/start';
api.softgame.softgameOrderFinalize = 'cpi/order/finalize';
api.softgame.softgameDoOrder = 'eui/order';
api.softgame.softgameBilling = 'eui/billing';
api.softgame.softgameBackUrl = "http://puzzlebubble.eudaimonia.com.ar/";
//api.softgame.softgameBackUrl = "http://eudaimonia.com.ar";
api.softgame.split = '|';
//api.softgame.split2 = '||';
api.softgame.softgameLangCode = 'en';

//variables
api.softgame.framework = null;
api.softgame.username = null;
api.softgame.password = null;
api.softgame.uid = null;
api.softgame.userdata = null;
api.softgame.xhr = null;
api.softgame.signature = null;
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
	//alert('starConnection');
	api.softgame.connectionEstablished('token');
};

// Get user information
api.softgame.getUserInfo = function(){
	api.softgame.userRequest(""); 
};

api.softgame.getUserBalance = function(){
	api.softgame.balanceRequest("");
};

api.softgame.getBilling = function(){
	api.softgame.billingRequest("");
};

api.softgame.startCoinsBuying = function(id, title, desc, price, img_url, obj){
	api.softgame.startOrderRequest("data"); 
	//api.softgame.errorResponse
};

api.softgame.doCoinsBuying = function(){
	api.softgame.doCoinsRequest("data"); 
	//api.softgame.errorResponse
};

api.softgame.finalizeCoinsBuying = function(){
	api.softgame.finalizeCoinsRequest("data"); 
	// api.softgame.errorResponse
};

//response handlers
api.softgame.connectionEstablished = function(data){

	if(data.indexOf("https://") != -1){
		api.softgame.facebookConnectResponse(data);
	}else{
		if(data.indexOf('token') != -1){
			api.softgame.onLogin();
			api.softgame.getUserInfo();
		}else{

		};
	};
	//var d = data.slice(data.indexOf("<body"), data.indexOf('</html>'));

	//this.element.innerHTML = d;
};

api.softgame.facebookConnectResponse = function(data){
	//alert('facebookConnectResponse: ' + data);
	if(data.indexOf('window.location.href="') != -1){
		api.softgame.secondConnectResponse(data, decodeURI(this.url));
	}else{
		//alert('login on facebook: ' + data);		
	};
};

api.softgame.secondConnectResponse = function(data, uri){
	//alert('secondConnectResponse: ' + data);
	/*alert('this.url: ' + this.url);
	alert('uri: ' + uri);*/
	var response = eval('(' + data + ')');
	//alert('response: ' + response);
	api.softgame.token = response.token;	
	api.softgame.signature = response.sig;
	api.softgame.framework.style.display = 'none';
	api.softgame.getUserInfo();
	api.softgame.onLogin();
};

api.softgame.connectionError = function(obj, err, r){
	//api.ui.alert('error: ' + obj.getAllResponseHeaders() + err + r + this.url, "Ok, I'll try later");
	api.ui.alertStyle('guiNoInetErrorScreen', 'guiNoInetErrorButton');
};

api.softgame.userRequest = function(data){
	//alert('user request: ' + data);
	var userdata = {};
	userdata.status = 1;
	userdata.response = {};
	userdata.response = { 
				uid: "2a6d77d5d35741e96947ae53d2685742", 
				name: "Foo Bar", 
				gender: "M", 
				balance: 10, 
				country: "DE", 
				created: "2000-01-01T15:20:08+01:00", 
				last_visit: "2000-01-02T08:36:38+01:00", 
				};
	//alert(userdata);
	//alert(userdata.status);
	if(userdata.status == 1){		
		api.softgame.user = userdata.response;		
	};
	api.softgame.onLoginUser();
};

api.softgame.coinsRequest = function(data){
	api.softgame.userCoins = 10;
};

api.softgame.balanceRequest = function(data){
	//alert(data);
	var balancedata = eval('(' + data + ')');
};

api.softgame.billingRequest = function(data){
	//alert(data);
	api.softgame.framework.style.display = 'block';
	api.softgame.framework.innerHTML = data;
	//var billingdata = eval('(' + data + ')');
};

api.softgame.startOrderRequest = function(data){
	api.softgame.doCoinsBuying();
};

api.softgame.doCoinsRequest = function(data){
	api.softgame.confirmDoCoinsBuying(data, this.url); 
};

api.softgame.confirmDoCoinsBuying = function(data, uri){
	api.softgame.finalizeCoinsBuying(); 			
};

api.softgame.finalizeCoinsRequest = function(data){
	api.softgame.buyFinalized();
};

api.softgame.getBuyingCoinsUrl = function(){
	var uri;
	api.softgame.startSignature('RESTApi');
	api.softgame.addSignatureParm('');
	api.softgame.addSignatureParm('');
	var sign = api.softgame.getSignature();
	uri = api.softgame.softgameUrl + api.softgame.softgameBilling;
	uri += '?pk='+api.softgame.game_id;
	uri += '&sig='+sign;
	return uri;
};

api.softgame.errorResponse = function(xhr, error, text){
	//alert(xhr +':'+ error +':'+ text);
	api.ui.hideWaiting();
	api.ui.alertStyle('guiNoInetErrorScreen', 'guiNoInetErrorButton');
};

api.softgame.buyFinalized = function(){};