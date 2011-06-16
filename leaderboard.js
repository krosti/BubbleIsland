var LeaderBoard = {
	divGen: '',
	divFB: '',
    highscore: 10000000
};

function SubmitScore()
{
    api.leaderboard.saveok = SubmitComplete;
    api.leaderboard.save(api.facebook.user.id, api.facebook.user.name, game.ui.points);
}

function SubmitComplete(response)
{
    /*alert(api.JSON2String(score));
    alert(api.JSON2String(num));
    alert(api.JSON2String(response));
    if(response.Success){
        
    }else{
        
    };*/
    //alert(api.JSON2String(response));
}

function retrieveLeaderboard(divFB, divGen){
	LeaderBoard.divGen = document.getElementById(divGen);
	LeaderBoard.divFB = document.getElementById(divFB);
    api.leaderboard.list(4, retrieveGeneralLeaderboard);
    api.leaderboard.list(4, retrieveFacebookLeaderboard, api.facebook.friends);
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
        text = '<table style="width: 100%">';
        for(var i = 0; i<scores.length; i++)
        {
            var score = scores[i];
            //alert(" - " + score.Name + " got " + score.Points + " on " + score.SDate);
            text += '<tr><td><img src="'+uiLeaderboardStar.src+'" alt="star"></td><td>' + score.name.slice(0, leaderboardElided) + '</td><td style="text-align: right">' +score.points+ '</td></tr>';
            // including custom data?  score.CustomPlaytomic.Data.Property
            if(i == 5) break;
        };
        text += '</table>';
        LeaderBoard.divGen.innerHTML = text;
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
		scores = response.response;		
        var text = '<table style="width: 100%">';
        for(var i = 0; i<scores.length; i++)
        {
            var score = scores[i];
            //alert(api.JSON2String(score));
            //alert(" - " + score.Name + " got " + score.Points + " on " + score.SDate);
            text += '<tr><td><img src="'+uiLeaderboardStar.src+'" alt="star"></td><td>' + score.name.slice(0, leaderboardElided) + '</td><td style="text-align: right; overflow: hidden">' +score.points+ '</td></tr>';
            // including custom data?  score.CustomPlaytomic.Data.Property
            if(i == 5) break;
        };
        text += '</table>';
        LeaderBoard.divFB.innerHTML = text;
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