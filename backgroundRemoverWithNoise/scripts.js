const myImage = new Image();
myImage.src = "/ha.png";

const [canvas, ctx] = start(
  document.querySelector("canvas"),
  myImage.width,
  myImage.height,
  {
    antialias: false,
  }
);

const scale = 80;
const frequency = 10;

function draw() {
  ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
  const pixelData = getImageData(ctx, canvas);
  clear(ctx, canvas);
  imageDataLoop(pixelData, (pixel, x, y) => {
    if (
      brightnessCalc(pixel.r, pixel.g, pixel.b) <
      noise.simplex2((x / scale) * frequency, (y / scale) * frequency)
    ) {
      // rect(ctx, x, y, 1, 1, objColorToString(pixel), "FILL");
      rect(ctx, x, y, 1, 1, "white", "FILL");
    }
  });
}

window.onload = draw;
