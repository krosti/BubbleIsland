
function SubmitScore()
{
    var simple_score = {};
    simple_score.Name = FB.user.name;
    simple_score.Points = game.ui.acumuledPoints;

    // submit to the highest-is-best table "highscores"
	var score_data = {
		facebook : true,
		highest: true,
		allowduplicates: false
	};

    //Playtomic.Leaderboards.Submit(simple_score, "highscores", SubmitComplete, score_data);
}

function SubmitComplete(score, response)
{
    if(response.Success)
    {
        alert("Score saved!");		
    }
    else
    {
        // submission failed because of response.ErrorCode
    }
}

function retrieveGeneralLeaderboard(divId){
	
};

function retrieveFacebookLeaderboard(divId){
	
};