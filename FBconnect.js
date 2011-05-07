function FBConnect(elementId)
{
	//init FBConnect
	alert('initializing');
	this.self = this;
	this.element = document.getElementById(elementId);
	//var browserDiv = this.element;
	this.element.style.position = 'absolute';
	this.element.style.top = '0px';
	this.element.style.left = '0px';
	this.element.style.width = '320px';
	this.element.style.height = '480px'
	document.body.appendChild(this.element);
}

FBConnect.prototype.tokenUrl = 'access_token=';
FBConnect.prototype.isConnected = false;
FBConnect.prototype.token = '';
FBConnect.prototype.self;
FBConnect.prototype.element;

FBConnect.prototype.connect = function(app_id, display){
	var uri = 'https://www.facebook.com/dialog/oauth?client_id=' + app_id + '&scope=publish_stream&redirect_uri=http://www.facebook.com/connect/login_success.html&display=' + display +'&response_type=token';
	alert('connecting: ' +uri);
	jq = $.ajax({
		type: 'GET',
		url: uri,
		success: function(data){ FBConnect.connectResponse(data); },
		error: FBConnect.error
	});
}

FBConnect.prototype.post = function(msg)
{
	var url = "https://graph.facebook.com/me/feed";
	//$.post(url, {message: msg}, function(data){ alert(data); });
}

FBConnect.prototype.connectResponse = function(data){
	//response of GET 
	alert('response: ' + data);
	if(data.indexOf(this.tokenUrl) != -1){ //existe token
		this.isConnected = true;
		this.token = data.slice(data.indexOf(this.tokenUrl), data.indexOf("&"));
		alert()
		this.onConnect();
	}else{
		
	};
	this.element.innerHTML = data;

};

FBConnect.prototype.error = function(data, error){
	//handle error
	alert('error');
};

FBConnect.prototype.onConnect; 	