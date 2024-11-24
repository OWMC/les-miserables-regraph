import React from 'react';
// Was tempted to go to town with more options here. I would have maybe created an Input child component and mapped a data object to it.

export default function RadioButtonGroup({ onChangeImportance, importanceStandard }) {
  const handleRadioChange = (event) => { 
    onChangeImportance(event.target.value);
  };
  return (
    <div data-testid="radioButtonGroup" className='radioButtonGroup'>
      <div>
        <input
          type="radio"
          id="source"
          name="value"
          value="source"
          checked={importanceStandard === 'source'}
          onChange={handleRadioChange}
        />
        <label htmlFor="source">The total value of source connections.</label>
      </div>
      <div>
        <input
          type="radio"
          id="target"
          name="value"
          value="target"
          checked={importanceStandard === 'target'}
          onChange={handleRadioChange}
        />
        <label htmlFor="target">The total value of target connections.</label>
      </div>
      <div>
        <input
          type="radio"
          id="combined"
          name="value"
          value="combined"
          checked={importanceStandard === 'combined'}
          onChange={handleRadioChange}
        />
        <label htmlFor="combined">By the total value of both the above!</label>
      </div>
      <div>
        <input
          type="radio"
          id="countConnections"
          name="value"
          value="countConnections"
          checked={importanceStandard === 'countConnections'}
          onChange={handleRadioChange}
        />
        <label htmlFor="countConnections">Total number of direct connections?</label>
      </div>
    </div>
  );
};
  