// Container div renders
// Child components render
// State is managed
// Child components update

import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
require('jest-fetch-mock').enableMocks()
import Fetch from "./App"

// Integration
// Sidebar works as part of Fetch (test API works, formats data, processes highscores and passes them to Sidebar)
describe('Fetch', () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    })
    test('renders data when API call succeeds', async () => {
        const fakeUsers = {
            "nodes": [
                {
                    "name": "Ben",
                    "group": 1
                },                         
                {
                    "name": "Bob",
                    "group": 1
                },                         
                {
                    "name": "Fred",
                    "group": 1
                }
            ],
            "links": [
                {
                    "source": 0,
                    "target": 1,
                    "value": 1
                },
                {
                    "source": 0,
                    "target": 2,
                    "value": 1
                },
                {
                    "source": 1,
                    "target": 0,
                    "value": 1
                }   
            ]
        };
        fetchMock.mockResolvedValue({ status: 200, json: jest.fn(() => fakeUsers) })
        render(<Fetch />)
        expect(await screen.findByText('Ben (3)')).toBeInTheDocument()
        expect(await screen.findByText('Bob (2)')).toBeInTheDocument()
    })

    test('renders error when API call fails', async () => {
        fetchMock.mockReject(() => Promise.reject('API error'))
        render(<Fetch />)
        expect(await screen.findByText('Something went wrong with the fetch!')).toBeInTheDocument()
    })
});
