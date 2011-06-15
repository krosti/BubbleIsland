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
    alert(api.JSON2String(response));
}

function retrieveLeaderboard(divFB, divGen){
	LeaderBoard.divGen = document.getElementById(divGen);
	LeaderBoard.divFB = document.getElementById(divFB);
	Playtomic.Leaderboard.List("highscores", retrieveGeneralLeaderboard, { perpage: 5});
	//Playtomic.Leaderboard.List("highscores", retrieveFacebookLeaderboard, { facebook: true, friendslist: api.facebook.friends, perpage: 5 });
};

function retrieveGeneralLeaderboard(scores, numscores, response){
	//alert(api.JSON2String(scores));
	if(response.Success)
    {
        //alert(scores.length + " scores returned out of " + numscores);
        if(numscores == 0){ LeaderBoard.divGen.innerHTML('There is no scores to show'); };
				
        var text = '';
        text = '<table style="width: 100%">';
        for(var i = 0; i<scores.length; i++)
        {
            var score = scores[i];
            //alert(" - " + score.Name + " got " + score.Points + " on " + score.SDate);
            text += '<tr><td><img src="'+uiLeaderboardtar.src+'" alt="star"></td><td>' + score.Name + '</td><td style="text-align: right">' +score.Points+ '</td></tr>';
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

function retrieveFacebookLeaderboard(scores, numscores, response){
	//alert(api.JSON2String(scores));
	if(response.Success)
    {
        //alert(scores.length + " scores returned out of " + numscores);
        if(numscores == 0){ LeaderBoard.divFB.innerHTML('There is no scores to show'); };
				
        var text = '<table style="width: 100%">';
        for(var i = 0; i<scores.length; i++)
        {
            var score = scores[i];
            //alert(" - " + score.Name + " got " + score.Points + " on " + score.SDate);
            text += '<tr><td><img src="'+uiLeaderboardtar.src+'" alt="star">' + score.Name + '</td><td style="text-align: right">' +score.Points+ '</td></tr>';
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