var api = {};api.facebook = {};api.softgame = {};//Facebook apiapi.facebook.appid = '213255638692367';api.facebook.appkey = '230bd48e2d38a991fe41e284887db3d8';api.facebook.accessToken = '';api.facebook.user = {};api.facebook.friends = {};api.facebook.xhr = null;api.facebook.framework = null;api.facebook.onConnect = function(){};api.facebook.onFriends = function(){};api.facebook.onPost = function(){};api.facebook.loaded = function(){};//https://www.facebook.com/login.php?api_key=171902539527776&cancel_url=&display=touch&fbconnect=1&next=http%3A%2F%2Fdrone.softgames.de%2Feui%2Fauth%2Ffacebook%3Fctx%3Dbcb5cebc2dda7d9b38cfbcffe1272932%26SGDS_D%3Da91hotld1pfs5gg78tel3sv3j5&return_session=1&session_version=3&v=1.0&req_perms=publish_stream//https://www.facebook.com/login.php?api_key=171902539527776&cancel_url=&display=touch&fbconnect=1&next=&req_perms=publish_stream//https://www.facebook.com/dialog/oauth?client_id=213255638692367&scope=publish_stream&redirect_uri=http://www.facebook.com/connect/login_success.html&display=touch&response_type=token'//https://www.facebook.com/dialog/oauth?client_id=213255638692367&scope=publish_stream&redirect_uri=https://www.facebook.com/login.php?api_key=171902539527776&cancel_url=&display=touch&fbconnect=1&next=&req_perms=publish_stream&display=touch&response_type=token//https://www.facebook.com/dialog/oauth?client_id=213255638692367&scope=publish_stream&redirect_uri=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fclient_id%3D213255638692367%26scope%3Dpublish_stream%26redirect_uri%3Dhttps%3A%2F%2Fwww.facebook.com%2Flogin.php%3Fapi_key%3D171902539527776%26cancel_url%3D%26display%3Dtouch%26fbconnect%3D1%26next%3D%26req_perms%3Dpublish_stream%26display%3Dtouch%26response_type%3Dtoken//https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fclient_id%3D17190253952777%26scope%3Dpublish_stream%26redirect_uri%3Dhttp%3A%2F%2Fwww.facebook.com%2Fconnect%2Flogin_success.html%26display%3Dtouch%26response_type%3Dtoken//https://www.facebook.com/login.php?api_key=171902539527776&cancel_url=&display=touch&fbconnect=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fclient_id%3D213255638692367%26scope%3Dpublish_stream%26redirect_uri%3Dhttp%3A%2F%2Fwww.facebook.com%2Fconnect%2Flogin_success.html%26display%3Dtouch%26response_type%3Dtoken&return_session=1&session_version=3&v=1.0&req_perms=publish_streamapi.facebook.startConnection = function(){	//FB.onConnect = connectToFacebook2;	var uri = 'https://www.facebook.com/dialog/oauth?client_id=' + api.facebook.appid + '&scope=publish_stream&redirect_uri=http://www.facebook.com/connect/login_success.html&display=touch&response_type=token';	//alert('before ajax: ' + uri);	api.facebook.xhr = $.ajax({		type: 'GET',		url: uri,		crossDomain: true,		success: function(data){ api.facebook.connectResponse(data) },		error: function(data, error){ api.facebook.errorResponse(data, error) }	})};api.facebook.errorResponse = function(data, error){	//alert(data + ':' + error);	api.ui.hideWaiting();	api.ui.alert('Are you sure that you have internet connection? Because Facebook dosent response my calls!', 'Let me check');};api.facebook.connectResponse = function(data){	//alert('connectResponse: ' + data);	if(data.indexOf('access_token=') != -1){		api.facebook.loginResponse(data);		return;	};	api.ui.hideWaiting();	api.facebook.framework.style.display = 'block';	api.facebook.framework.innerHTML = data;	$('form').submit(function(){		var todata = {};		var inputs = $('input');		for(var i = 0; i < inputs.length; ++i){			todata[inputs[i].name] = inputs[i].value;				//alert(inputs[i].name + ':' + inputs[i].value);						};		//alert($('form')[0].action);		$.ajax({			type: 'POST',			url: $('form')[0].action,			data: todata,			success: function(data){ api.facebook.loginResponse(data); },			error: function(xhr, textStatus, data){ //alert(textStatus) 			}		});		return false;	});};api.facebook.loginResponse = function(data){	//alert('login response: ' + data);	var tokenstring = 'access_token=';	if(data.indexOf(tokenstring) != -1){ //existe token		//this.isConnected = true;		api.facebook.accessToken = data.slice(data.indexOf(tokenstring) + tokenstring.length, data.indexOf("&"));		api.facebook.accessToken = '"' +api.facebook.accessToken + '"';		//alert(api.facebook.accessToken);		api.facebook.accessToken = eval(api.facebook.accessToken);		//alert('access token face: ' + api.facebook.accessToken);		/*this.token = this.token.replace("\\u", "|");		this.token = this.token.replace("\\u", "|");*/		//alert('connected!: ' + this.token);		api.facebook.framework.style.display = 'none';		api.facebook.onConnect();	}else{		//alert(data);		var wantAccess = 'name="grant_clicked"';		if(data.indexOf(wantAccess) != -1){			//requiere permisos			window.location= 'https://www.facebook.com/login.php?api_key=171902539527776&cancel_url=&display=touch&fbconnect=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fclient_id%3D' + api.facebook.appid + '%26scope%3Dpublish_stream%26redirect_uri%3Dhttp%3A%2F%2Fwww.facebook.com%2Fconnect%2Flogin_success.html%26display%3Dtouch%26response_type%3Dtoken&return_session=1&session_version=3&v=1.0&req_perms=publish_stream'			return;		};		api.facebook.framework.style.display = 'block';		api.facebook.framework.innerHTML = data;		$('form').submit(function(){			var todata = {};			var inputs = $('input');			for(var i = 0; i < inputs.length; ++i){				todata[inputs[i].name] = inputs[i].value;					//alert(inputs[i].name + ':' + inputs[i].value);							};			//alert($('form')[0].action);			$.ajax({				type: 'POST',				url: $('form')[0].action,				data: todata,				success: function(data){ api.facebook.loginResponse(data); },				error: function(xhr, textStatus, data){ //alert(textStatus) 				}			});			return false;		});	};	api.facebook.framework.innerHTML = data;};api.facebook.retrieveUserData = function(){	postdata = {		access_token: api.facebook.accessToken			};	self = this;	$.ajax({		url: 'https://graph.facebook.com/me',		type: 'GET',		data: postdata,		//success: function(data){ alert('success: ' + data); self.setUserData(data); },		success: this.setUserData,		//error: function(data, er, r){ alert(data.responseText + ':' + er + ':' +r); }	});};api.facebook.setUserData = function(data){	//alert(data);	api.facebook.user = eval('(' + data + ')');		api.facebook.retrieveUserFriends();};api.facebook.retrieveUserFriends = function(){	postdata = {		access_token: api.facebook.accessToken			};	self = this;	$.ajax({		url: 'https://graph.facebook.com/me/friends',		type: 'GET',		data: postdata,		//success: function(data){ alert('success: ' + data); self.setUserData(data); },		success: api.facebook.retrieveUserFriendsResponse,		//error: function(data, er, r){ alert(data.responseText + ':' + er + ':' +r); }	});};api.facebook.retrieveUserFriendsResponse = function(data){	//alert(data);	var friends = api.string2JSON(data)	api.facebook.friends = friends.data;	api.facebook.loaded();};api.facebook.postMessage = function(msg){		//alert('post: ' + msg);		var uri = "https://graph.facebook.com/me/feed";		postdata = {			access_token: api.facebook.accessToken,			message: msg		};		//$.post(url, {message: msg, access_token: FB.token}, function(data){ alert(data); });		this.ajaxReply = $.ajax({			url: uri,			type: 'POST',			contentType: 'multipart/form-data',			data: postdata, 			success: function(data){ //alert('success: ' + data); 			},			error: function(data, error, r){ //alert('error: ' + data.responseText + error + r); 			}		});		//alert('termine el post');};//api softgame//api.softgame.api.softgame.game_id = '9C5TVaAs3w1xvUOBn9BZM3g4E3I83DFn';api.softgame.game_secret = '8nMnqNRYc096xbBaCa0uuQN9XDPcwsWU';//api.softgame.softgameUrl = 'http://sgds.softgame.de/'; <--- for productionapi.softgame.softgameUrl = 'http://drone.softgames.de/'; //<--- for testingapi.softgame.softgameAuth = 'eui/auth';api.softgame.softgameLogout = 'eui/logout';api.softgame.softgameGetUserData = 'cpi/user';api.softgame.softgameGetUserBalance = 'cpi/user/balance';api.softgame.softgameOrderStart = 'cpi/order/start';api.softgame.softgameOrderFinalize = 'cpi/order/finalize';api.softgame.softgameDoOrder = 'eui/order';api.softgame.softgameBilling = 'eui/billing';api.softgame.softgameBackUrl = "http://puzzlebubble.eudaimonia.com.ar/";//api.softgame.softgameBackUrl = "http://eudaimonia.com.ar";api.softgame.split = '|';//api.softgame.split2 = '||';api.softgame.softgameLangCode = 'en';//variablesapi.softgame.framework = null;api.softgame.username = null;api.softgame.password = null;api.softgame.uid = null;api.softgame.userdata = null;api.softgame.xhr = null;api.softgame.signature = null;api.softgame.token  = '';api.softgame.connected = false;api.softgame.user = {};api.softgame.userCoins = 0;api.softgame.otoken = '';api.softgame.startSignature = function(type){	 	(type == 'RESTApi')? api.softgame.split = '|' : api.softgame.split = '||';	api.softgame.signature = api.softgame.game_id;};api.softgame.addSignatureParm = function(p){	api.softgame.signature += api.softgame.split + p;};api.softgame.getSignature = function(){	api.softgame.addSignatureParm(api.softgame.game_secret);	api.softgame.signature = api.softgame.signature.toUpperCase();	api.softgame.signature = $.md5(api.softgame.signature).toUpperCase();	return api.softgame.signature;};api.softgame.JSON2Signature = function(obj, type){	api.softgame.startSignature(type);	var data = [];	for(param in obj){		data.push(obj[param]);	};	api.softgame.signature = data.join(api.softgame.split);	return api.softgame.getSignature();};//api.softgame.on;api.softgame.onLoginUser = function(){};api.softgame.onUserBalance = function(){};api.softgame.onLogin = function(){};//functionsapi.softgame.startConnection = function(){	//alert('starConnection');	var link = api.softgame.softgameUrl + api.softgame.softgameAuth;	var getdata = {		pk: api.softgame.game_id,		back: api.softgame.softgameBackUrl,		lang: api.softgame.softgameLangCode	};	//alert('to sign');	var sign = api.softgame.JSON2Signature(getdata, 'RESTApi');	//alert('signed');	getdata.sig = sign;	/*for(param in getdata){		alert()	};*/	//alert(link);	api.softgame.xhr = $.ajax({		type: 'GET',		url: link,		data: getdata,		success: function(data, textStatus){ api.softgame.connectionEstablished(data); },		error: function(obj, err, r){ api.softgame.connectionError(obj, err, r); }	});};// Get user informationapi.softgame.getUserInfo = function(){	//if(!this.connected) return false;	//alert('user info');	var uri = api.softgame.softgameUrl + api.softgame.softgameGetUserData;	//alert('uri: ' + uri);	var getdata = {		pk: api.softgame.game_id,		token: api.softgame.token	};	var sign = api.softgame.JSON2Signature(getdata, 'web');	getdata.sig = sign;	api.softgame.xhr = $.ajax({		type: 'GET',		url: uri,		data: getdata,		success: function(data){ /*alert(this.url);*/ api.softgame.userRequest(data); 		},		error: function(){ //alert('error ' + this.url); 			api.softgame.errorResponse();		}	});};api.softgame.getUserBalance = function(){	var uri = api.softgame.softgameUrl + api.softgame.softgameGetUserBalance;	var getdata = {		pk: api.softgame.game_id,		token: api.softgame.token	};	var sign = api.softgame.JSON2Signature(getdata, 'web');	getdata.sig = sign;	this.jqajax = $.ajax({		type: 'GET',		url: uri,		data: getdata,		success: function(data){ api.softgame.balanceRequest(data); },		error: function(xhr, data){ //alert('error: ' + data); 		}	});};api.softgame.getBilling = function(){	var uri = api.softgame.softgameUrl + api.softgame.softgameBilling;	var getdata = {		pk: api.softgame.game_id,		back: api.softgame.softgameBackUrl,		lang: api.softgame.softgameLangCode	};	var sign = api.softgame.JSON2Signature(getdata, 'web');	getdata.sig = sign;	api.softgame.xhr = $.ajax({		type: 'GET',		url: uri,		data: getdata,		success: function(data){ api.softgame.billingRequest(data); },		error: function(xhr, data){ //alert('error: ' + data); 		}	});};api.softgame.startCoinsBuying = function(id, title, desc, price, img_url, obj){	var uri = api.softgame.softgameUrl + api.softgame.softgameOrderStart;	//alert('startCoinsBuying: ' + uri);	var getdata = {		pk: api.softgame.game_id,		custom_data: obj,		descr: desc,		id: id,		img_url: img_url,		price: price,		title: title,		token: api.softgame.token	};	var sign = api.softgame.JSON2Signature(getdata, 'web');	getdata.sig = sign;	//alert(api.JSON2String(getdata));	/*api.softgame.xhr =*/ $.ajax({		type: 'GET',		url: uri,		data: getdata,		success: function(data){ /*alert(data);*/ api.softgame.startOrderRequest(data); 		},		error: api.softgame.errorResponse	});};api.softgame.doCoinsBuying = function(){	var uri = api.softgame.softgameUrl + api.softgame.softgameDoOrder;	//alert('doCoinsBuying: ' + uri);	var getdata = {		pk: api.softgame.game_id,		back: api.softgame.softgameBackUrl,		lang: api.softgame.softgameLangCode,		otoken: api.softgame.otoken	};	var sign = api.softgame.JSON2Signature(getdata, 'RESTApi');	getdata.sig = sign;	//alert(api.JSON2String(getdata));	/*api.softgame.xhr =*/ $.ajax({		type: 'GET',		url: uri,		data: getdata,		success: function(data){ api.softgame.doCoinsRequest(data); },		error: api.softgame.errorResponse	});};api.softgame.finalizeCoinsBuying = function(){//rpuebas// [x] web// [ ] RESTApi// [ ] 	var uri = api.softgame.softgameUrl + api.softgame.softgameOrderFinalize;	//alert('doCoinsBuying: ' + uri);	var getdata = {		pk: api.softgame.game_id,				otoken: api.softgame.otoken,		token: api.softgame.token	};	var sign = api.softgame.JSON2Signature(getdata, 'web');	getdata.sig = sign;	//alert(api.JSON2String(getdata));	$.ajax({		type: 'GET',		url: uri,		data: getdata,		success: function(data){ /*alert(this.url);*/ api.softgame.finalizeCoinsRequest(data); 		},		error: api.softgame.errorResponse	});};//response handlersapi.softgame.connectionEstablished = function(data){	//alert('connectionEstablished: ' + data);	api.softgame.framework.style.display = 'none';	//s.slice(s.indexOf(q) + q.length, s.indexOf("&"))	//alert(this.uri)	//data = data + '';	//this.element.innetHTML = data;	if(data.indexOf("https://") != -1){		var faceuri = data.slice(data.indexOf("https://"), data.indexOf('<table cellpadding="0" cellspacing="0" class="table-centered">') - 2);		//alert('result: ' + faceuri);		this.jq = $.ajax({			type: 'GET',			url: faceuri,			crossDomain: true,			success: function(data){ api.softgame.facebookConnectResponse(data); },			error: function(data, error){ api.ui.alert('Error trying to access to Facebook, have you got internet?', 'Ok'); }			//complete: function(xhr,textStatus){ if(xhr.status == 302){ alert('complete: connectionEstablished ' + xhr.getResponseHeader("Location")); }; }		});	}else{		if(data.indexOf('token') != -1){			var response = eval('(' + data + ')');			//alert('response: ' + response);			api.softgame.token = response.token;				api.softgame.signature = response.sig;			api.softgame.framework.style.display = 'none';			api.softgame.onLogin();			api.softgame.getUserInfo();		}else{			alert('Error gral de apps: ' + data);			var wantAccess = 'name="grant_clicked"';			if(data.indexOf(wantAccess) != -1){				//requiere permisos				window.location.href = 'https://www.facebook.com/login.php?api_key=171902539527776&cancel_url=&display=touch&fbconnect=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fclient_id%3D' + api.facebook.appid + '%26scope%3Dpublish_stream%26redirect_uri%3Dhttp%3A%2F%2Fwww.facebook.com%2Fconnect%2Flogin_success.html%26display%3Dtouch%26response_type%3Dtoken&return_session=1&session_version=3&v=1.0&req_perms=publish_stream'				return;			};			api.softgame.framework.style.display = 'block';			api.softgame.framework.innerHTML = data;		};	};	//var d = data.slice(data.indexOf("<body"), data.indexOf('</html>'));	//this.element.innerHTML = d;};api.softgame.facebookConnectResponse = function(data){	//alert('facebookConnectResponse: ' + data);	if(data.indexOf('window.location.href.href="') != -1){		var faceuri = data.slice(data.indexOf('window.location.href.href="') + 22, data.indexOf('";'));		faceuri = '"' + faceuri + '"';		faceuri = eval(faceuri);		//alert('result second: ' + faceuri);		faceuri = decodeURI(faceuri);		//window.location.href = faceuri;		this.jq = $.ajax({			type: 'GET',			url: faceuri,			//success: function(data){ FB.connectResponse(data) },			success: function(data){ api.softgame.secondConnectResponse(data, decodeURI(this.url)); },			error: function(data, error){ //alert('facebookConnectResponse: ' + data.responseText + ' : ' + error); 			}			//complete: function(xhr,textStatus){ alert('complete: facebookConnectionEstablished ' + xhr.getAllResponseHeaders());  }		});	}else{		alert('login on facebook: ' + data);				var wantAccess = 'name="grant_clicked"';		if(data.indexOf(wantAccess) != -1){			//requiere permisos			window.location.href = 'https://www.facebook.com/login.php?api_key=171902539527776&cancel_url=&display=touch&fbconnect=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fclient_id%3D' + api.facebook.appid + '%26scope%3Dpublish_stream%26redirect_uri%3Dhttp%3A%2F%2Fwww.facebook.com%2Fconnect%2Flogin_success.html%26display%3Dtouch%26response_type%3Dtoken&return_session=1&session_version=3&v=1.0&req_perms=publish_stream'			return;		};		api.softgame.framework.style.display = 'block';		api.softgame.framework.innerHTML = data;		$('form').submit(function(){			var todata = {};			var inputs = $('input');			for(var i = 0; i < inputs.length; ++i){				todata[inputs[i].name] = inputs[i].value;								};			$.ajax({				type: 'POST',				url: $('form')[0].action,				data: todata,				success: function(data){ api.softgame.facebookConnectResponse(data); },				error: function(xhr, textStatus, data){ //alert(textStatus) 				}			});			return false;		});		if(data.indexOf('<input type="submit" value="Connect" class="btn btnC" name="login"')){						$('form').submit(function(){				var todata = {};				var inputs = $('input');				for(var i = 0; i < inputs.length; ++i){					todata[inputs[i].name] = inputs[i].value;									};				$.ajax({					type: 'POST',					url: $('form')[0].action,					data: todata,					success: function(data){ api.softgame.facebookConnectResponse(data); },					error: function(xhr, textStatus, data){ //alert(textStatus) 					}				});				return false;			});		}else{			//window.location.href = this.jq.url;			//alert('facebook Response, another page, retrying');			api.softgame.startConnection();		};	};};api.softgame.secondConnectResponse = function(data, uri){	//alert('secondConnectResponse: ' + data);	/*alert('this.url: ' + this.url);	alert('uri: ' + uri);*/	var response = eval('(' + data + ')');	//alert('response: ' + response);	api.softgame.token = response.token;		api.softgame.signature = response.sig;	api.softgame.framework.style.display = 'none';	api.softgame.onLogin();	//api.softgame.getUserInfo();};api.softgame.connectionError = function(obj, err, r){	apu.ui.alert('error: ' + obj.getAllResponseHeaders() + err + r + this.url, "Ok, I'll try later");};api.softgame.userRequest = function(data){	//alert(data);	var userdata = eval('(' + data + ')');	//alert(userdata);	//alert(userdata.status);	if(userdata.status == 1){				api.softgame.user = userdata.response;		api.softgame.onLoginUser();	};};api.softgame.coinsRequest = function(data){	//alert(data);	var coinsdata = eval('(' + data + ')');	if(data.status == 1){		api.softgame.userCoins = coinsdata.response.balance;	};};api.softgame.balanceRequest = function(data){	//alert(data);	var balancedata = eval('(' + data + ')');};api.softgame.billingRequest = function(data){	//alert(data);	api.softgame.framework.style.display = 'block';	api.softgame.framework.innerHTML = data;	//var billingdata = eval('(' + data + ')');};api.softgame.startOrderRequest = function(data){	//alert('startOrderResponse: ' + data);	var orderdata = api.string2JSON(data);	//alert('json: ' + api.JSON2String(orderdata));	if(orderdata.status == 1){		api.softgame.otoken = orderdata.response.otoken;		api.softgame.doCoinsBuying();	};};api.softgame.doCoinsRequest = function(data){	//alert('doCoinsRequest: ' + data);	var confirm = 'eui/order/confirm';	var uri = api.softgame.softgameUrl;	var start = data.indexOf(confirm);	if(start != -1){		uri += data.slice(start, data.indexOf('">', start));		//alert('uri confirm: ' + uri);		$.ajax({			type: 'GET',			url: uri,			success: function(data){ api.softgame.confirmDoCoinsBuying(data, this.url); },			error: api.softgame.errorResponse		});	}else{		//alert('Error al pedir vidas');	};};api.softgame.confirmDoCoinsBuying = function(data, uri){	//alert(data);	//alert(uri);	//parsear data en json	var getdata = api.string2JSON(data);	if(getdata.status == "SUCCESS"){		/*api.softgame.otoken = getdata.otoken;		alert('otoken: ' + api.softgame.otoken);*/		api.softgame.finalizeCoinsBuying(); 				}else{		//alert('Mmm.. we have a little inconvenient trying to reach you some lifes. Please can you try again and see if Hades wanna give you another chance?');	};	//alert(uri);};api.softgame.finalizeCoinsRequest = function(data){	//alert(data);	var getdata = api.string2JSON(data.replace('\\\\', ''));	if(getdata.status == 1){		api.ui.alert('You have 3 more lifes!! or you are a cat or someone loves you up there :)', 'Thanks! Go on!', function(){});		api.softgame.buyFinalized();	}else{		//alert('Mmm.. we have a little inconvenient trying to reach you some lifes. Please can you try again and see if Hades wanna give you another chance?');		//alert(api.JSON2String(getdata));	};};api.softgame.getBuyingCoinsUrl = function(){	var uri;	api.softgame.startSignature('RESTApi');	api.softgame.addSignatureParm('');	api.softgame.addSignatureParm('');	var sign = api.softgame.getSignature();	uri = api.softgame.softgameUrl + api.softgame.softgameBilling;	uri += '?pk='+api.softgame.game_id;	uri += '&sig='+sign;	return uri;};api.softgame.errorResponse = function(xhr, error, text){	//alert(xhr +':'+ error +':'+ text);	api.ui.hideWaiting();	api.ui.alert('Are you sure that you have internet connection? Because Facebook dosent response my calls!', 'Let me check');};api.softgame.buyFinalized = function(){};//api db personalapi.levels = {};api.levels.xhr = null;api.levels.url = 'http://betatester.borealdev.com.ar/apilevels/index.php';api.levels.jsonlevel = {};api.levels.onGetLevel = function(){};api.levels.getLevel = function(playerid){	//alert(playerid);	var getdata = {		to: 'get',		player_id: playerid,	};	api.levels.xhr = $.ajax({		type: 'POST',		data: getdata,		contentType: 'application/x-www-form-urlencoded',		url: api.levels.url, 		success: function(data){ /*alert(data);*/ api.levels.getResponse(data); 		},		error: api.levels.responseError	});};api.levels.getResponse = function(data){	//alert(data);	var jsonlevel = api.string2JSON(data);	if(jsonlevel.status == 1){		api.levels.jsonlevel = api.string2JSON(jsonlevel.level);		//alert(api.levels.jsonlevel);	}else{		api.levels.jsonlevel = "";	};	api.levels.onGetLevel();};api.levels.putLevel = function(playerid){	//alert(playerid);	var level = api.JSON2String(api.levels.jsonlevel);	var getdata = {		to: 'put',		player_id: playerid,		json: level	};	//alert(api.JSON2String(getdata));	/*api.levels.xhr =*/ 	$.ajax({		type: 'POST',		url: api.levels.url, 		contentType: 'application/x-www-form-urlencoded',		data: getdata,		success: function(data){ //alert(this.url); api.levels.getResponse(data) 		},		error: function(xhr, error, text){ //alert(this.url); api.levels.responseError(xhr, error, text) 		}	});};api.levels.putResponse = function(data){	//alert(data);};api.levels.responseError = function(xhr, error, text){	//alert(xhr + ':' + error + ':' + text);};api.levels.serializeLevel = function(){};api.levels.unserializeLevel = function(){};//additional api usefull functionapi.ui = {};api.ui.alert = function(msg, button, fn){}; //(msg, button, fn)api.string2JSON = function(data){	return eval('(' + data + ')')};api.JSON2String = function(obj){	var t = typeof (obj);    if(t != "object" || obj === null){        if (t == "string") obj = '"'+obj+'"';        return String(obj);    }else{        var n, v, json = [], arr = (obj && obj.constructor == Array);        for (n in obj) {            v = obj[n]; t = typeof(v);            if (t == "function") continue;            if (t == "string") v = '"'+v+'"';            else if (t == "object" && v !== null) v = api.JSON2String(v);            json.push((arr ? "" : '"' + n + '":') + String(v));        }        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");    }};api.md5 = function(data){	//to implement};