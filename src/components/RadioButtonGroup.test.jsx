import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import RadioButtonGroup from './RadioButtonGroup';

describe('RadioButtonGroup', () => {
    it("renders the RadioButtonGroup component", async () => {
        const { getByTestId } = render(<RadioButtonGroup />);
        const div = getByTestId('radioButtonGroup');
        expect(div).toBeInTheDocument();
    });
});

describe('RadioButtonGroup', () => {
    it('calls onChangeImportance with the correct value', () => {
      const onChangeImportance = jest.fn();
      const importanceStandard = 'combined';
      const { getByText } = render(
        <RadioButtonGroup onChangeImportance={onChangeImportance} importanceStandard={importanceStandard} />
      );
      const radioInput = getByText('Total number of direct connections?');
      fireEvent.click(radioInput);
      expect(onChangeImportance).toHaveBeenCalledTimes(1);
      expect(onChangeImportance).toHaveBeenCalledWith('countConnections');
    });
  });
  