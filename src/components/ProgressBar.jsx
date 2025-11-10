function StaticProgressBar({ progressValue }) {
  const maxProgress = 100;
  const progressPercent = Math.min(progressValue, maxProgress);

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    maxWidth: "300px",
  };

  const barContainerStyle = {
    flexGrow: 1,
    height: "14px",
    backgroundColor: "#e6e6e6",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
  };

  const barStyle = {
    height: "100%",
    width: `${progressPercent}%`,
    background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
    borderRadius: "10px",
    transition: "width 0.4s ease-in-out",
  };

  const textStyle = {
    fontWeight: "bold",
    color: "#333",
    minWidth: "40px",
    textAlign: "right",
  };

  return (
    <div style={containerStyle}>
      <div style={barContainerStyle}>
        <div style={barStyle}></div>
      </div>
      <p style={textStyle}>{progressPercent}%</p>
    </div>
  );
}

export default StaticProgressBar;
