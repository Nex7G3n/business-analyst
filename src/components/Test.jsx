const ScrollingText = () => {
  const containerStyle = {
    width: "300px",
    height: "100px",
    overflow: "hidden",
    position: "relative",
  };

  const textStyle = {
    whiteSpace: "nowrap",
    display: "inline-block",
    position: "absolute",
    animation: "scrollText 10s linear infinite",
  };

  const keyframesStyle = `
     
  `;

  return (
    <div>
      <style>{keyframesStyle}</style>
      <div style={containerStyle}>
        <div style={textStyle}>
          Este es un ejemplo de texto muy largo que se desplazará de manera infinita a través de este cuadro. Puedes agregar todo el texto que desees, y seguirá desplazándose sin problemas.
        </div>
      </div>
    </div>
  );
};

export default ScrollingText;