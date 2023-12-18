import { FootballScoreboard } from "./FootballScoreboard"; // Import the FootballScoreboard class

describe("FootballScoreboard", () => {
  let scoreboard: FootballScoreboard;

  beforeEach(() => {
    scoreboard = new FootballScoreboard();
  });

  it("should start a new match and add it to the scoreboard", () => {
    scoreboard.startNewMatch("Home Team", "Away Team");
    expect(scoreboard.getSummary().length).toBe(1);
  });

  it("should update the score of a match", () => {
    scoreboard.startNewMatch("Home Team", "Away Team");
    scoreboard.updateScore(2, 1, 0);
    const match = scoreboard.getSummary()[0];
    expect(match.homeScore).toBe(2);
    expect(match.awayScore).toBe(1);
  });

  it("should finish a match and remove it from the scoreboard", () => {
    scoreboard.startNewMatch("Home Team", "Away Team");
    scoreboard.finishMatch(0);
    expect(scoreboard.getSummary().length).toBe(0);
  });

  it("should get a summary of matches in progress ordered by total score", () => {
    scoreboard.startNewMatch("Uruguay", "Italy");
    scoreboard.updateScore(6, 6, 0); // Total score: 12
    scoreboard.startNewMatch("Spain", "Brazil");
    scoreboard.updateScore(10, 2, 1); // Total score: 12
    scoreboard.startNewMatch("Mexico", "Canada");
    scoreboard.updateScore(0, 5, 2); // Total score: 5

    const summary = scoreboard.getSummary();
    expect(summary.length).toBe(3);
    expect(summary[0].homeTeam).toBe("Uruguay");
    expect(summary[1].homeTeam).toBe("Spain");
    expect(summary[2].homeTeam).toBe("Mexico");
  });
});
