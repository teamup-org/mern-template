import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

test("renders HomePage component", () => {
    render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    );
    
    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toHaveTextContent("Home Page");
});