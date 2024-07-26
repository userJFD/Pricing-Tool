import '../styles/ScreenshotButton.css';
import html2canvas from 'html2canvas';

function ScreenshotButton() {
  const takeScreenshot = () => {
    html2canvas(document.querySelector(".app-container")).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'screenshot.png';
      link.click();
    });
  };

  return (
    <button onClick={takeScreenshot}>Take Screenshot</button>
  );
}

export default ScreenshotButton;
