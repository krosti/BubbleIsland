var LeaderBoard = {
	divGen: '',
	divFB: '',
    highscore: 10000000
};

function setLeaderboardsDivs(divFB, divGen){
	LeaderBoard.divGen = document.getElementById(divGen);
	LeaderBoard.divFB = document.getElementById(divFB);
};

function SubmitScore()
{
    //api.leaderboard.saveok = SubmitComplete;
    api.leaderboard.save(api.facebook.user.id, api.facebook.user.name, game.ui.points);
}

function SubmitComplete(response)
{

}

/*function retrieveLeaderboard(divFB, divGen){
    api.leaderboard.list(api.facebook.user.id, retrieveGeneralLeaderboard);
    api.leaderboard.list(api.facebook.user.id, retrieveFacebookLeaderboard, api.facebook.friends);
};*/

function retrieveLeaderboard(type_span){
	type_span = type_span ? 'global' : type_span;
    api.leaderboard.list(api.facebook.user.id, retrieveGeneralLeaderboard, [], 0, 2, type_span);
    api.leaderboard.list(api.facebook.user.id, retrieveFacebookLeaderboard, api.facebook.friends, 0, 2, type_span);
	var text = '<table class="guihighscoretabmyscore' + gameSize + '" >';
	text += '<tr><td><img src="loading.gif" alt="no encontrada"></td><td class="nick' + gameSize + '"> Loading... </td><td>0</td></tr>';
	text += '</table>';
	text += '<table class="guihighscoretabeveryone' + gameSize + '">';
	text += '<tr><td><img src="loading.gif" alt="no encontrada"></td><td class="nick' + gameSize + '"> Loading... </td><td>0</td></tr>';
	text += '<tr><td><img src="loading.gif" alt="no encontrada"></td><td class="nick' + gameSize + '"> Loading... </td><td>0</td></tr>';
	text += '</table>';
	
	LeaderBoard.divGen.innerHTML = text;
	LeaderBoard.divFB.innerHTML = text;
	
	//LeaderBoard.divGen.innerHTML = '<table class=""><tr><td><img src="loading.gif"></td></tr></table>';
	//LeaderBoard.divFB.innerHTML = '<table class=""><tr><td><img src="loading.gif"></td></tr></table>';
	//Playtomic.Leaderboard.List("highscores", retrieveGeneralLeaderboard, { perpage: 5});
	//Playtomic.Leaderboard.List("highscores", retrieveFacebookLeaderboard, { facebook: true, friendslist: api.facebook.friends, perpage: 5 });
};

function retrieveGeneralLeaderboard(data){
	//alert(api.JSON2String(scores));
    var response = api.string2JSON(data);
	if(response.status == 1)
    {
        //alert(scores.length + " scores returned out of " + numscores);
        //if(numscores == 0){ LeaderBoard.divGen.innerHTML('There is no scores to show'); };
				
        var text = '';
        scores = response.response;
        text = '<table class="guihighscoretabeveryone' + gameSize + '">';
        for(var i = 0; i<scores.length; i++)
        {
            var score = scores[i];
            //alert(" - " + score.Name + " got " + score.Points + " on " + score.SDate);
            text += '<tr><td><img src="https://graph.facebook.com/'+score.id+'/picture" alt="star"></td><td class="nick' + gameSize + '">' + score.name.slice(0, leaderboardElided) + '</td><td style="text-align: right">' +score.points+ '</td></tr>';
            // including custom data?  score.CustomPlaytomic.Data.Property
            if(i == 5) break;
        };
        text += '</table>';
        LeaderBoard.divGen.innerHTML = text;
		
		api.leaderboard.rankme(api.facebook.user.id, function(data){
			var result = api.string2JSON(data);
			if(result.status == 1){
				//api.leaderboard.rankok(result.response);
				var text = '<table class="guihighscoretabmyscore' + gameSize + '" >';
				text += '<tr><td><img src="https://graph.facebook.com/'+api.facebook.user.id+'/picture" alt="no encontrada"></td><td class="nick' + gameSize + '">' + api.facebook.user.name + '</td><td>' + result.response.points + '</td></tr>';
				text += '</table>';
				var score = document.createElement('div');
				score.innerHTML = text;
				//LeaderBoard.divGen.innerHTML = LeaderBoard.divGen.innerHTML + text;
				LeaderBoard.divGen.insertBefore(score, LeaderBoard.divGen.firstChild);
			};
		});
    }
    else
    {
        // score listing failed because of response.ErrorCode
        api.ui.alert('Sorry, now we have a little problem with the Leaderboard, please check it later', 'Ok');
    }
};

function retrieveFacebookLeaderboard(data){
	//alert(api.JSON2String(scores));
    var response = api.string2JSON(data);
	if(response.status == 1)
    {
        //alert(scores.length + " scores returned out of " + numscores);
        //if(numscores == 0){ LeaderBoard.divFB.innerHTML('There is no scores to show'); };
		var text = '';
        scores = response.response;
        text = '<table class="guihighscoretabeveryone' + gameSize + '">';
        for(var i = 0; i</*scores.length*/ 1; i++)
        {
            var score = scores[i];
            //alert(" - " + score.Name + " got " + score.Points + " on " + score.SDate);
            text += '<tr><td><img src="https://graph.facebook.com/'+score.id+'/picture" alt="star"></td><td class="nick' + gameSize + '">' + score.name.slice(0, leaderboardElided) + '</td><td style="text-align: right">' +score.points+ '</td></tr>';
            // including custom data?  score.CustomPlaytomic.Data.Property
            if(i == 5) break;
        };
        text += '</table>';
        LeaderBoard.divFB.innerHTML = text;
		
		api.leaderboard.rankme(api.facebook.user.id, function(data){
			var result = api.string2JSON(data);
			if(result.status == 1){
				var text = '<table class="guihighscoretabmyscore' + gameSize + '" >';
				text += '<tr><td><img src="https://graph.facebook.com/'+api.facebook.user.id+'/picture" alt="no encontrada"></td><td class="nick' + gameSize + '">' + api.facebook.user.name + '</td><td>' + result.response.points + '</td></tr>';
				text += '</table>';
				var score = document.createElement('div');
				score.innerHTML = text;
				//LeaderBoard.divGen.innerHTML = LeaderBoard.divGen.innerHTML + text;
				LeaderBoard.divFB.insertBefore(score, LeaderBoard.divFB.firstChild);
			};
		});
    }
    else
    {
        // score listing failed because of response.ErrorCode
        api.ui.alert('Sorry, now we have a little problem with the Leaderboard, please check it later', 'Ok');
    }
};

function retrieveHighScore(){
    /*Playtomic.Leaderboard.List("highscores", function(scores, numscores, response){
        if(response.Success){
            if(numscores == 0) return;
            LeaderBoard.highscore = scores[0].Points;
        }; 
    }, { perpage: 1});*/
};