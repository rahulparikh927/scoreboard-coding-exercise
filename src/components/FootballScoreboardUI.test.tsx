import { render, fireEvent, screen } from "@testing-library/react";
import FootballScoreboardUI from "./FootballScoreboardUI";

describe("FootballScoreboardUI", () => {
  it("renders correctly", () => {
    render(<FootballScoreboardUI />);

    // Check if the header is present
    expect(screen.getByText("Football Scoreboard")).toBeInTheDocument();

    // Check if input fields for Home Team, Away Team, and buttons are present
    expect(screen.getByPlaceholderText("Home Team")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Away Team")).toBeInTheDocument();
    expect(screen.getByText("Start Match")).toBeInTheDocument();
  });

  it("allows starting a new match", () => {
    render(<FootballScoreboardUI />);

    // Type in Home Team and Away Team names
    fireEvent.change(screen.getByPlaceholderText("Home Team"), {
      target: { value: "Team A" },
    });
    fireEvent.change(screen.getByPlaceholderText("Away Team"), {
      target: { value: "Team B" },
    });

    // Click the Start Match button
    fireEvent.click(screen.getByText("Start Match"));

    // Expect new match details to be displayed
    expect(screen.getByText("Team A 0 - 0 Team B")).toBeInTheDocument();
  });
});
