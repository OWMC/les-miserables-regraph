// Content

import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import Tooltip from "./Tooltip"

describe('Tooltip', () => {
    it('Should render content', () => {
        render(<Tooltip name="Olly" message="message" source="2" target="0" connections="1" />);
        const name = screen.getByText('Olly');
        const message = screen.getByText('message');
        const target = screen.getByText('0');
        const source = screen.getByText('1');
        const connections = screen.getByText('1');
        expect(name).toBeInTheDocument();
        expect(message).toBeInTheDocument();
        expect(target).toBeInTheDocument();
        expect(source).toBeInTheDocument();
        expect(connections).toBeInTheDocument();
    })
})
