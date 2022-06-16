const myImage = new Image();
myImage.src = "/tree.png";

const [canvas, ctx] = start(
  document.querySelector("canvas"),
  myImage.width,
  myImage.height,
  {
    antialias: false,
  }
);

function draw() {
  ctx.drawImage(myImage, 0, 0, myImage.width, myImage.height);
  const pixelData = getImageData(ctx, canvas);
  clear(ctx, canvas);
  imageDataLoop(pixelData, (pixel, x, y) => {
    if (brightnessCalc(pixel.r, pixel.g, pixel.b) < 0.5) {
      // rect(ctx, x, y, 1, 1, objColorToString(pixel), "FILL");
      rect(ctx, x, y, 1, 1, "white", "FILL");
    }
  });

  if (confirm("Do you want to download the result?")) {
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.download = `${myImage.src.replace(/^.*[\\\/]/, "")}`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    document.body.removeChild(link);
  }
}

window.onload = draw;
