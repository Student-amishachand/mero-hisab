import "./SummaryCard.css";

const SummaryCard = ({ title, value, icon, variant = "neutral", note }) => (
  <article className={`summary-card card ${variant}`}>
    <div className="summary-icon">{icon}</div>
    <div className="summary-content">
      <p>{title}</p>
      <h2>{value}</h2>
      {note && <span>{note}</span>}
    </div>
  </article>
);

export default SummaryCard;
