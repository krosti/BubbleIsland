function FBConnect(elementId){
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
	//document.body.appendChild(this.element);
	
	this.tokenUrl = 'access_token=';
	this.isConnected = false;
	this.token = '';
	this.url;
	this.ajaxReply;
	
	this.connectResponse = function(data){
		//response of GET 
		alert('response: ' + data);
		if(data.indexOf(this.tokenUrl) != -1){ //existe token
			this.isConnected = true;
			this.token = data.slice(data.indexOf(this.tokenUrl) + this.tokenUrl.length, data.indexOf("&"));
			this.token = '"' + this.token + '"';
			alert(this.token);
			this.token = eval(this.token);
			/*this.token = this.token.replace("\\u", "|");
			this.token = this.token.replace("\\u", "|");*/
			alert('connected!: ' + this.token);
			this.element.style.display = 'none';
			this.onConnect();
		}else{
			alert('no connected');
		};
		this.element.innerHTML = data;
	};
	
	this.error = function(data, error){
		//handle error
		alert('error');
	};
	
	this.setUrl = function(app_id, display){
		this.url = 'https://www.facebook.com/dialog/oauth?client_id=' + app_id + '&scope=publish_stream&redirect_uri=http://www.facebook.com/connect/login_success.html&display=' + display +'&response_type=token';
		//this.url = 'https://graph.facebook.com/oauth/authorize?client_id=' + app_id + '&scope=publish_stream&redirect_uri=http://www.facebook.com/connect/login_success.html&display=' + display +'&response_type=token';
		
		//alert('connecting: ' +uri);
		/*jq = $.ajax({
			type: 'GET',
			url: uri,
			success: function(data){
				alert(data);
				//alert(jq.getAllResponseHeaders());
				alert(this.url);
				var browserDiv = document.createElement('nav');
				browserDiv.style.position = 'absolute';
				browserDiv.style.top = '0px';
				browserDiv.style.left = '0px';
				browserDiv.style.width = '320px';
				browserDiv.style.height = '480px'
				browserDiv.innerHTML = data;
				document.body.appendChild(browserDiv);			
			},
			error: function(data, error){
				alert(error + ' : ' + data.toString());
			}
		});
		jq = $.ajax({
			type: 'GET',
			url: uri,
			success: FBConnect.connectResponse,
			error: FBConnect.error
		});
		
		jq.success(FBConnect.connectResponse);
		jq.error(function(){ alert('peligro!'); })*/
	}

	this.post = function(msg)
	{	
		alert('post: ' + msg);
		var uri = "https://graph.facebook.com/me/feed";
		postdata = {
			access_token: this.token,
			message: msg
		};
		//$.post(url, {message: msg, access_token: FB.token}, function(data){ alert(data); });
		this.ajaxReply = $.ajax({
			url: uri,
			type: 'POST',
			contentType: 'multipart/form-data',
			data: postdata, 
			success: function(data){ alert('success: ' + data); },
			error: function(data, error, r){ alert('error: ' + data.responseText + error + r); }
		});
		//alert('termine el post');
	}
	
	this.retrieveUserData = function(){
		this.ajaxReply = $.ajax({
			url: 'https://graph.facebook.com/me',
			type: 'GET',
			success: function(data){ alert('success: ' + data); },
			error: function(data, er, r){ alert(data.responseText + ':' + er + ':' +r)};
		});
	};

	this.onConnect; 
}


/*
FBConnect.prototype.post = function(msg)
{
	var url = "https://graph.facebook.com/me/feed";
	//$.post(url, {message: msg}, function(data){ alert(data); });
}
*/