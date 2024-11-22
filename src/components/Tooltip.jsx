export default function Tooltip(props) {
  const { name, message, source, target, connections, x, y } = props;
  return (
    <div className="tooltip" style={{ left: x, top: y }}>
      <div className="tooltip-arrow" />
      <div className="tooltip-content">
        <p className="tooltip-para"><strong>{name}</strong></p>
        <p className="tooltip-para">{message}</p>
        <p className="tooltip-para">{source}</p>
        <p className="tooltip-para">{target}</p>
        <p className="tooltip-para">{connections}</p>
      </div>
    </div>
  );
}
