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