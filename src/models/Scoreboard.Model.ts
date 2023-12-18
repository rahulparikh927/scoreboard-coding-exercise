export interface FootballMatch {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: Date;
  endTime?: Date;
}

export interface Scoreboard {
  matches: FootballMatch[];
}
