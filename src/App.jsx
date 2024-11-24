import React, { useState, useEffect } from 'react';
import { Chart } from 'regraph';
import Tooltip from './components/Tooltip';
import Sidebar from './components/Sidebar';
import { reformatData } from './helpers/reformatData';
import './App.css';

const lightColour = "#d3e3f3";
const darkColour = "#051428";
const darkColour2 = "#020B16";

// Parent component
export default function Fetch() {

  // State for importanceStandard, scores, data (items), and tooltip
  const [importanceStandard, setImportanceStandard] = useState('combined');
  const [scores, setScores] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState({ name: null, message: null, position: { x: 0, y: 0 } });

  // Get the data, format it, set state
  useEffect(() => {
    fetch('https://bost.ocks.org/mike/miserables/miserables.json')
      .then(response => response.json())
      .then(data => setData(reformatData(data, importanceStandard)))
      .catch(error => setError('Something went wrong with the fetch!'));
  }, [importanceStandard]);  // importanceStandard is our reactive value

  // Highscores, set state
  useEffect(() => {
    if (data) {
      let top5 = Object.values(data).filter(node => node.data).sort((a, b) => b.value - a.value).slice(0, 5);;
      let top5Names = Object.values(top5).map(node => node.label.find(obj => obj && obj.text)?.text + ' (' + node.value + ')');
      setScores(top5Names);
    }
  }, [data]); // data is our reactive value

  // Tooltip set state
  const updateTooltip = ({ id, x, y }) => {
    const item = data[id];
    if (item && item.data && item.value) {
      setTooltip({
        name: item.data.name,
        message: item.value,
        source: item.data.source,
        target: item.data.target,
        connections: item.data.connections,
        position: { x, y },
      });
    } else {
      setTooltip({
        name: null,
        message: null,
        source: null,
        target: null,
        connections: null,
        position: { x: 0, y: 0 },
      });
    }
  };

  // ImportanceStandard set state
  const handleImportanceStandard = (newImportanceStandard) => {
    setImportanceStandard(newImportanceStandard);
  };

  // Groups
  const combineNodesHandler = ({ setStyle }) => {
    setStyle({
      open: true,
      color: darkColour,
      label: { text: 'Group', fontSize: 30 },
      closedStyle: {
        color: darkColour,
        label: { text: 'Group', fontSize: 30 },
      },
      border: { width: 1, lineStyle: 'solid', color: {lightColour} },
    });
  };

  // Accessibility keyboard
  const chartRef = React.useRef(null);
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      // unsubscribe event
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowRight':
        chartRef.current.pan('right');
        break;
      case 'ArrowLeft':
        chartRef.current.pan('left');
        break;
      case 'ArrowUp':
        chartRef.current.pan('up');
        break;
      case 'ArrowDown':
        chartRef.current.pan('down');
        break;
      case 'i':
        chartRef.current.zoom('in');
        break;
      case 'o':
        chartRef.current.zoom('out');
        break;
      default:
        break;
    }
  };

  const pingOptions = {
    color: lightColour,
    haloRadius: 50,
    haloWidth: 10,
    linkWidth: 0,
    time: 300,
    repeat: 1,
  };
    
  const ping = ({ id }) => {
    if (id) {
      chartRef.current.ping({ [id]: true }, pingOptions);
    }
  };

  return (
    <div data-testid="Fetch" style={{ height: '100vh', width: '100vw' }}>
      <div
        style={{ height: '100%' }}
        aria-label={ `Les Misérables character chart` }
        aria-description={ `A chart showing important characters in the show using the ${importanceStandard} standard.` }
      >
        <Chart
          animation={{ time: 1000 }}
          aria-hidden={true}
          items={data}
          combine={{
            properties: ['group'],
            level: 1,
          }}
          onClick={ping}
          onCombineNodes={combineNodesHandler}
          options={{
            dragPan: false,
            hoverDelay: 0,
            labels: { maxLength: 25 },
            backgroundColor: darkColour2,
          }}
          onPointerMove={updateTooltip}
          ref={chartRef}
        />
      </div>
      {/* We will prop drill Sidebar HOC / RadioButtonGroup, any more complexity and I would have used context provider or redux */}
      <Sidebar 
        highScores={scores} 
        onChangeImportance={handleImportanceStandard} 
        importanceStandard={importanceStandard}
        fail={error}
      />
      {tooltip.message && (
        <Tooltip 
          x={tooltip.position.x}
          y={tooltip.position.y - 42}
          name={tooltip.name}
          message={`Overall importance: ${tooltip.message}`}
          source={`Source of connections value: ${tooltip.source}`}
          target={`Target of connections value: ${tooltip.target}`}
          connections={`Direct connections: ${tooltip.connections}`}
        />
      )}
    </div>
  );
}
