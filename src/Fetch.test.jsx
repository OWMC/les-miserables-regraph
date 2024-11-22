import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import App from "./App"

describe("App", () => {
    let originalFetch;
  
    beforeEach(() => {
      originalFetch = global.fetch;
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve([
                {
                    "nodes": [
                        {
                            "name": "Ben",
                            "group": 1
                        },                         
                        {
                            "name": "Bob",
                            "group": 1
                        }
                    ],
                    "links": [
                        {
                            "source": 1,
                            "target": 0,
                            "value": 1
                        },
                        {
                            "source": 0,
                            "target": 1,
                            "value": 1
                        }   
                    ]
                },
            ]),
        })
      );
    });
  
    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("renders App component", async () => {
        render(<App />);
        const linkElement = await screen.findByText('Important characters in the show');
        expect(linkElement).toBeInTheDocument();
    });
    
});  