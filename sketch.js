
let starSlider;
let rotateSlider;

let bgPicker;
let accentPicker;

let surpriseButton;
let saveButton;

function setup() {
  createCanvas(600, 600);

  angleMode(DEGREES);

  createP("Number of Stars");
  starSlider = createSlider(4, 20, 10, 1);
  starSlider.input(redraw);

  createP("Star Rotation");
  rotateSlider = createSlider(0, 360, 0, 5);
  rotateSlider.input(redraw);

  createP("Background Color");
  bgPicker = createColorPicker("#FCE4EC");
  bgPicker.input(redraw);

  createP("Accent Color");
  accentPicker = createColorPicker("#F4A261");
  accentPicker.input(redraw);

  surpriseButton = createButton("Surprise Me");
  surpriseButton.mousePressed(surpriseMe);

  saveButton = createButton("Download Sticker");
  saveButton.mousePressed(saveSticker);

  noLoop();
}

function draw() {
  background(bgPicker.value());

  fill(accentPicker.value());
  noStroke();

  circle(width / 2, height / 2, 330);

  fill(bgPicker.value());
  circle(width / 2, height / 2, 285);

  let starCount = starSlider.value();
  let rotation = rotateSlider.value();

  for (let i = 0; i < starCount; i++) {

    let angle = i * 360 / starCount + rotation;

    push();

    translate(width / 2, height / 2);
    rotate(angle);

    translate(0, -190);

    fill(accentPicker.value());

    star(0, 0, 8, 22, 5);

    pop();
  }

  push();

  translate(width / 2, height / 2);

  for (let i = 0; i < 12; i++) {

    rotate(30);

    fill(accentPicker.value());

    triangle(
      -10, -85,
      10, -85,
      0, -125
    );
  }

  fill(bgPicker.value());
  circle(0, 0, 150);

  fill(accentPicker.value());

  circle(-25, -10, 10);
  circle(25, -10, 10);

  noFill();
  stroke(accentPicker.value());
  strokeWeight(4);

  arc(0, 5, 45, 35, 20, 160);

  pop();
}

function star(x, y, innerRadius, outerRadius, points) {

  beginShape();

  for (let i = 0; i < points * 2; i++) {

    let angle = i * 360 / (points * 2);

    let radius;

    if (i % 2 == 0) {
      radius = outerRadius;
    } else {
      radius = innerRadius;
    }

    let sx = x + cos(angle) * radius;
    let sy = y + sin(angle) * radius;

    vertex(sx, sy);
  }

  endShape(CLOSE);
}

function surpriseMe() {

  starSlider.value(
    int(random(4, 21))
  );

  rotateSlider.value(
    int(random(0, 72)) * 5
  );

  bgPicker.value(
    randomColor()
  );

  accentPicker.value(
    randomColor()
  );

  redraw();
}

function randomColor() {

  let colors = [
    "#FCE4EC",
    "#F8C8DC",
    "#E6D6FF",
    "#B8E0D2",
    "#F4A261",
    "#A8DADC",
    "#FFD166",
    "#CDB4DB"
  ];

  return random(colors);
}

function saveSticker() {

  saveCanvas("cosmic-club-sticker", "png");
}
