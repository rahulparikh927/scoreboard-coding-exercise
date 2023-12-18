import { FootballMatch, Scoreboard } from "../models/Scoreboard.Model";

/* The FootballScoreboard class manages a scoreboard for football matches, allowing users to start new
matches, update scores, finish matches, and get a summary of all matches. */

export class FootballScoreboard {
  private scoreboard: Scoreboard;

  constructor() {
    this.scoreboard = { matches: [] };
  }

  /**
   * The function "startNewMatch" creates a new football match with the given home and away team names,
   * initializes the scores to 0, sets the start time to the current time, and adds the match to the
   * scoreboard.
   * @param {string} homeTeam - The home team is a string representing the name of the team playing at
   * home.
   * @param {string} awayTeam - The awayTeam parameter is a string that represents the name of the away
   * team in a football match.
   * @returns a new instance of the FootballMatch object.
   */
  startNewMatch(homeTeam: string, awayTeam: string): FootballMatch {
    const newMatch: FootballMatch = {
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      startTime: new Date(),
    };
    this.scoreboard.matches.push(newMatch);

    return newMatch;
  }

  /**
   * The function updates the scores of a football match in a scoreboard.
   * @param {number} homeScore - The home team's score in the football match.
   * @param {number} awayScore - The `awayScore` parameter is the updated score for the away team in a
   * football match.
   * @param {number} matchIndex - The `matchIndex` parameter is the index of the match in the
   * scoreboard that you want to update. It is used to retrieve the specific match from the scoreboard
   * array.
   * @returns the updated FootballMatch object.
   */
  updateScore(
    homeScore: number,
    awayScore: number,
    matchIndex: number
  ): FootballMatch {
    const matchToUpdate = this.scoreboard.matches[matchIndex];
    if (matchToUpdate) {
      matchToUpdate.homeScore = homeScore;
      matchToUpdate.awayScore = awayScore;
    }

    return matchToUpdate;
  }

  /**
   * The function `finishMatch` removes a football match from the scoreboard and returns the removed
   * match.
   * @param {number} matchIndex - The `matchIndex` parameter is a number that represents the index of
   * the match to be finished in the `scoreboard.matches` array.
   * @returns the FootballMatch object that was removed from the scoreboard matches array.
   */
  finishMatch(matchIndex: number): FootballMatch {
    const matchToRemove = this.scoreboard.matches[matchIndex];
    if (matchToRemove) {
      matchToRemove.endTime = new Date();
      this.scoreboard.matches.splice(matchIndex, 1);
    }

    return matchToRemove;
  }

  /**
   * The function sorts an array of football matches by total score and start time, and returns the
   * sorted array.
   * @returns The function `getSummary()` returns an array of `FootballMatch` objects that have been
   * sorted based on their total score and start time.
   */
  getSummary(): FootballMatch[] {
    const sortedMatches = [...this.scoreboard.matches].sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;
      if (totalScoreA !== totalScoreB) {
        return totalScoreB - totalScoreA; // Sort by total score descending
      } else {
        return b.startTime.getTime() - a.startTime.getTime(); // Sort by start time descending for same total scores
      }
    });
    this.scoreboard.matches = sortedMatches;
    return sortedMatches;
  }
}
