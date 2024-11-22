import React from 'react';
import RadioButtonGroup from './RadioButtonGroup';
import logo from '../assets/lesmis-logo.png';
import bg from '../assets/bg.png';

export default function Sidebar({highScores, onChangeImportance, importanceStandard }) {
  const handleSidebarClick = () => {
    const sidebarElement = document.querySelector('.sidebar');
    sidebarElement.classList.toggle('hideSidebar');
  };
  return (
    <>
      <div className="sidebar" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
        <img src={logo} width="196" height="91" alt="LesMis logo" />
        <h1 className='title-large'>Important characters in the show</h1>
        <hr />
        <h2 className='title-medium'>By what standard should we measure "importance"?</h2>
        <RadioButtonGroup onChangeImportance={onChangeImportance} importanceStandard={importanceStandard} />
        <h2 className='title-medium'>High scores</h2>
        <ol>
          {highScores.map(score => <li key={score}>{score}</li>)}
        </ol>
        <h2 className='title-medium'>Blue vs orange nodes</h2>
        <p>Orange nodes are special cases. Either are never a target, or never a source.</p>
      </div>      
      <button className="sidebarButton" onClick={handleSidebarClick}>Show/hide sidebar</button>
    </>
  );
}
