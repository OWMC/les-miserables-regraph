import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import Sidebar, {handleSidebarClick} from './Sidebar';

const highScores = ['Valjean (158)', 'Marius (104)', 'Enjolras (91)', 'Courfeyrac (84)', 'Cosette (68)', 'Thenardier (35)']

describe('Sidebar', () => {
    it("renders the Sidebar component", async () => {
        const { getByTestId } = render(<Sidebar highScores={highScores} />);
        const div = getByTestId('sidebar');
        expect(div).toBeInTheDocument();
    });
    it("renders the radioButtonGroup component", async () => {
        const { getByTestId } = render(<Sidebar highScores={highScores} />);
        const div = getByTestId('radioButtonGroup');
        expect(div).toBeInTheDocument();
    });
});

describe('Sidebar', () => {
    it('renders the high scores list', () => {
        const { getByText } = render(<ol>{highScores.map(score => <li key={score}>{score}</li>)}</ol>);
        expect(getByText('Valjean (158)')).toBeInTheDocument();
        expect(getByText('Marius (104)')).toBeInTheDocument();
        expect(getByText('Enjolras (91)')).toBeInTheDocument();
        expect(getByText('Courfeyrac (84)')).toBeInTheDocument();
        expect(getByText('Cosette (68)')).toBeInTheDocument();
    });
    it('renders the correct number of high scores', () => {
        const { getAllByRole } = render(<ul>{highScores.map(score => <li key={score}>{score}</li>)}</ul>);
        expect(getAllByRole('listitem')).toHaveLength(highScores.length);
    });
});

describe('handleSidebarClick', () => {
    it('toggles the hideSidebar class on the sidebar element', () => {
        const sidebarElement = document.createElement('div');
        sidebarElement.classList.add('sidebar');
        document.body.appendChild(sidebarElement);
        expect(sidebarElement.classList.contains('hideSidebar')).toBe(false);
        handleSidebarClick();
        expect(sidebarElement.classList.contains('hideSidebar')).toBe(true);
        handleSidebarClick();
        expect(sidebarElement.classList.contains('hideSidebar')).toBe(false);
    });
});
