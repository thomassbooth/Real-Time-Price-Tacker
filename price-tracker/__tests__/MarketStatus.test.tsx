import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import MarketStatus from "../src/components/MarketStatus"; // Adjust the path as necessary

describe("MarketStatus Component", () => {
  it("renders 'Open' when status is true", () => {
    render(<MarketStatus status={true} />);

    // Check for the text content
    expect(screen.getByText("Market Status:")).toBeInTheDocument();
    expect(screen.getByText("Open")).toBeInTheDocument();

    // Check for the correct class applied for open status
    const statusSpan = screen.getByText("Open").closest("span");
    expect(statusSpan).toHaveClass("font-semibold");
    expect(statusSpan).toHaveClass("text-green-700");
  });

  it("renders 'Closed' when status is false", () => {
    render(<MarketStatus status={false} />);

    // Check for the text content
    expect(screen.getByText("Market Status:")).toBeInTheDocument();
    expect(screen.getByText("Closed")).toBeInTheDocument();

    // Check for the correct class applied for closed status
    const statusSpan = screen.getByText("Closed").closest("span");
    expect(statusSpan).toHaveClass("font-semibold");
    expect(statusSpan).toHaveClass("text-red-700");
  });
});
