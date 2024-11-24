// Container div renders
// Child components render
// State is managed
// Child components update

import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import Fetch from "./App"

describe("Fetch", () => {
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

    it("renders the Fetch component", async () => {
        const { getByTestId } = render(<Fetch />);
        const div = getByTestId('Fetch');
        expect(div).toBeInTheDocument();
    });
});  
