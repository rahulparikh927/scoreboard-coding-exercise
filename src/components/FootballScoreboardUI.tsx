import { useState } from "react";
import { FootballScoreboard } from "../services/FootballScoreboard"; // Assuming FootballScoreboard is imported
import { FootballMatch } from "../models/Scoreboard.Model";

type FootballMatchUI = FootballMatch & {
  homeScoreInput: number;
  awayScoreInput: number;
};

const FootballScoreboardUI = () => {
  const [scoreboard] = useState(new FootballScoreboard());
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");

  const [footballScoreboardUI, SetFootballScoreboardUI] = useState<
    FootballMatchUI[]
  >([]);

  const startNewMatch = () => {
    const newMatch = scoreboard.startNewMatch(homeTeam, awayTeam);
    setHomeTeam("");
    setAwayTeam("");
    SetFootballScoreboardUI([
      ...footballScoreboardUI,
      { ...newMatch, homeScoreInput: 0, awayScoreInput: 0 },
    ]);
  };

  const updateScore = (index: number) => {
    const homeScore = footballScoreboardUI[index].homeScoreInput;
    const awayScore = footballScoreboardUI[index].awayScoreInput;
    scoreboard.updateScore(homeScore, awayScore, index);
    updateFootBallScoreboardUI();
  };

  const finishMatch = (index: number) => {
    scoreboard.finishMatch(index);
    updateFootBallScoreboardUI();
  };

  const updateFootBallScoreboardUI = () => {
    const updateFootballScoreboardUI = scoreboard.getSummary().map((match) => {
      return { ...match, homeScoreInput: 0, awayScoreInput: 0 };
    });
    SetFootballScoreboardUI(updateFootballScoreboardUI);
  };

  return (
    <div>
      <h2>Football Scoreboard</h2>
      <div>
        <input
          type="text"
          placeholder="Home Team"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
        />
        <input
          type="text"
          placeholder="Away Team"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        />
        <button onClick={startNewMatch}>Start Match</button>
      </div>
      <br />
      <div>
        {footballScoreboardUI.map((match: FootballMatchUI, index: number) => (
          <div key={index}>
            <p>
              {match.homeTeam} {match.homeScore} - {match.awayScore}{" "}
              {match.awayTeam}
            </p>
            <input
              type="number"
              value={match.homeScoreInput}
              onChange={(e) => {
                const updateFootBallScoreboardUI = footballScoreboardUI;
                updateFootBallScoreboardUI[index].homeScoreInput = parseInt(
                  e.target.value
                );
                SetFootballScoreboardUI([...updateFootBallScoreboardUI]);
              }}
            />
            <input
              type="number"
              value={match.awayScoreInput}
              onChange={(e) => {
                const updateFootBallScoreboardUI = footballScoreboardUI;
                updateFootBallScoreboardUI[index].awayScoreInput = parseInt(
                  e.target.value
                );
                SetFootballScoreboardUI([...updateFootBallScoreboardUI]);
              }}
            />
            <button onClick={() => updateScore(index)}>Update Score</button>
            <button onClick={() => finishMatch(index)}>Finish Match</button>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FootballScoreboardUI;
