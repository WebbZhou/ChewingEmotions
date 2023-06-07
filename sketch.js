let data; // Variable to store the loaded dataset
let start_x = 300; // Start x-coordinate of the line
let start_x2 = 1150;
let end_x = 600; // End x-coordinate of the line
let end_x2 = 1450;
let y = 900; // y-coordinate of the line and circle
let y2 = 900;
let targetX = start_x; // Target x-coordinate for the circle's position
let targetX2 = start_x2;
let index = 0; // Index to track the current position in the dataset
let x = start_x; // Initial x-coordinate for the circle's position
let x2 = start_x2;
let images = []; // Array to store the images
let Eimages = [];
let currentImageIndex = 0; // Index of the currently displayed image
let cursorImage;
let appleX = 560; // X-coordinate of the apple image
let appleY = 20; // Y-coordinate of the apple image
let isHovered = false;
let appleImage; // Variable to store the apple image
let hoverImage; // Variable to store the hover image
let isPopupOpen = false;
let currentIndex = 0;
let alphaLeft = 255, alphaRight = 255;
let minddata = [
  ["What an exhausted day!", "Lunch time!"],
  ["Um... this is great", "Yum!"],
  ["Yum Yum", "Ummm"],
  ["I shoud open a restaurant", "I don't think these two are enough for me"],
  ["Wait...", "There is only one left :("],
  ["I got another thing need to do after the meal", "Why do I need to lose my weight?"],
  ["And I don't want to do it", "Why!"],
  ["But I have to", "No..."],
  ["Damn", "..."],
  ["Fresh egg tart!", "EGG TART!"],
  ["God! it's too sweet!", "OMG!It is great!"],
  ["Uh...", "YumYumYum!"],
  ["I should finish it rather than waste it", "I wish I can have another one"],
  ["At least the puff pastry was good", "Only one bite left..."],
  ["Last time I bought it", "I can't have another one, hang in there Evie!"],
  ["This looks tasty", "I am so sleepy..."],
  ["And it is!", "Wo...it taste good"],
  ["The shrimps are great!", "I like the eggs"],
  ["Butter smells so good", "Bagel God!"],
  ["...", "Those eggs are about to fall out"],
  ["I feel full already", "I'm just about full!"],
  ["Don't waste it!", "Last bite!"],
  ["I shouldn't cook that much...", "I feel sleepy again"],
  ["I can do it!", "Uh oh, I have a meeting in 10 mins"],
  ["No, I can not", "God, I will fall asleep if my eye close"],
  ["Finally", "I am... just about to..."]
];


function preload() {
  // Load the CSV dataset
  data = loadTable('data.csv', 'csv', 'header');
  print(data);
  appleImage = loadImage("Apple 01.png");
  hoverImage = loadImage("Apple 02.png");
  eatingSound = loadSound('eatingSoundEffect.mp3');
  font1 = loadFont("DIN-Regular.otf");
  font2 = loadFont("DIN-Medium.otf");

  for (let i = 0; i < 26; i++) {
    let img = loadImage(`image${i}.png`);
    let Eimg = loadImage(`Eimage${i}.png`);
    images.push(img);
    Eimages.push(Eimg);
  }
}

function setup() {
  createCanvas(1800, 1100); // Adjust the canvas size as per your preference
  textAlign(LEFT);
  // Load the cursor image
  cursorImage = loadImage("cursor.png");

  // Set the custom cursor
  noCursor();
}



function draw() {
  background(255); // Set the background color

  image(images[currentImageIndex], 50, 80);
  image(Eimages[currentImageIndex], 900, 80);

  // Check if the mouse is at the top of the canvas
  if (mouseY < 80) {
    // Display additional information
    noStroke(0);
    fill(0);
    textSize(32);
    textFont(font2);
    text(": EAT ME! -->", 340, 46);

    if (isHovered) {
      // Display the hover image when the mouse is hovering over the apple
      image(hoverImage, appleX, appleY);
    } else {
      // Display the normal apple image
      image(appleImage, appleX, appleY);
    }


    stroke(0);
    strokeWeight(1);
    line(0, 80, 2000, 80);
    // Add more text or any other elements as needed
  }

  textAlign(CENTER,CENTER);
  noStroke(0);
  textSize(32);
  textFont("Din");
  fill(0, alphaLeft);
  text(minddata[currentIndex][0], 450, 180);
  fill(0, alphaRight);
  text(minddata[currentIndex][1], 1300, 180);

  if (alphaLeft > 0) alphaLeft -= 2;
  if (alphaRight > 0) alphaRight -= 2;

  textAlign(LEFT,LEFT);
  noStroke(0);
  fill(0);
  textSize(32);
  textFont(font2);
  text("CHEWING EMOTIONS", 30, 46);

  noStroke(0);
  fill(0);
  textFont(font1);
  textSize(12);
  text("We are Webb and Evie, and this website will show you our dietary habits over the course of three days \nand how they affect our emotions. By clicking the mouse, you can see the changes in our moods with each bite, \nas the content and quantity of food have an impact on our feelings. So go ahead, click the mouse, and see what changes!"
  , 850, 30);

  noStroke(0);
  fill(0);
  textFont(font1);
  textSize(12);
  text("Webb Zhou & Evie Huang\nLondon College of Communication\nUniversity of the Arts London"
  , 1570, 30);

  fill(0);
  textFont(font1);
  textSize(12);
  text("Depress", start_x - 60, y + 3);
  text("Happy", end_x + 18, y + 3);
  text("Depress", start_x2 - 60, y2 + 3);
  text("Happy", end_x2 + 18, y2 + 3);

  // Draw the line
  stroke(0);
  strokeWeight(1);
  line(start_x, y, end_x, y);
  line(start_x2, y2, end_x2, y2);

  // Get the value from the current row in the dataset
  let newData = data.getNum(index, 'mood_index');
  let newData2 = data.getNum(index, 'mood_index_E');

  // Calculate the target x-coordinate based on the data
  let targetX = map(newData, 0, 100, start_x, end_x);
  let targetX2 = map(newData2, 0, 100, start_x2, end_x2);

  // Move the circle smoothly towards the target x-coordinate using lerp()
  let easing = 0.05; // Controls the speed of the movement
  let deltaX = targetX - x;
  x += deltaX * easing;
  let deltaX2 = targetX2 - x2;
  x2 += deltaX2 * easing;

  // Draw the circle at the position on the line
  fill(255);
  stroke(0);
  ellipse(x, y, 10, 10);
  ellipse(x2, y2, 10, 10);

  if (isPopupOpen) {
    print("pp")
    drawPopupWindow();
  }

  // Draw the cursor image at the mouse position
  image(cursorImage, mouseX, mouseY);
}

function mouseMoved() {
  // Check if the mouse is hovering over the apple
  if (mouseX > appleX - appleImage.width/2 && mouseX < appleX + appleImage.width/2 && mouseY > appleY - appleImage.height/2 && mouseY < appleY + appleImage.height/2) {
    // Set the flag to true when the mouse is hovering over the apple
    isHovered = true;
  } else {
    // Set the flag to false when the mouse is not hovering over the apple
    isHovered = false;
  }
}

function mouseClicked() {
  // Check if the mouse is clicked on the apple
  if (mouseX > appleX - appleImage.width/2 && mouseX < appleX + appleImage.width/2 && mouseY > appleY - appleImage.height/2 && mouseY < appleY + appleImage.height/2) {
    // Toggle the state of the pop-up window
    isPopupOpen = !isPopupOpen;
    print("mc")
  }
}



function mousePressed() {
  if (mouseY > 80) {
  // Move to the next row in the dataset
  index = (index + 1) % data.getRowCount();

  currentImageIndex = (currentImageIndex + 1) % images.length;

  // Replace 'nextCursor.png' with the filename of your next cursor image
  cursorImage = loadImage("nextCursor.png");
  eatingSound.play();
  currentIndex++;
  if (currentIndex >= minddata.length) {
    currentIndex = 0;
  }
  alphaLeft = 255;
  alphaRight = 255;
  }
}

function mouseReleased(){
  cursorImage = loadImage("cursor.png");

}

// Function to update the position based on data (0 to 100)
function updatePosition() {
  // Get the value from the current row in the dataset
  let newData = data.getNum(index, 'mood_index');

  // Update the position based on the data
  position = constrain(newData, 0, 100);
  position = constrain(newData, 0, 100);
}

function drawPopupWindow() {
  let popupWidth = 1800;
  let popupHeight = 1100;
  let popupX = 0;
  let popupY = 80;

  // Draw the pop-up window background
  fill(255,255,255,200);
  noStroke(0);
  rect(popupX, popupY, popupWidth, popupHeight);

  // Draw the line chart
  drawLineChart();
}

function drawLineChart() {
  let chartX = 250; // Chart x-coordinate
  let chartY = 230; // Chart y-coordinate
  let chartWidth = 3300; // Chart width
  let chartHeight = 600; // Chart height
  let padding = 50; // Padding around the chart

  strokeWeight(10);

  let prevName = '';
  lineStart = 0;

  // Draw the mood_index line
  stroke(160, 197, 120); // Green color
  noFill();
  beginShape();
  for (let i = 0; i < data.getRowCount(); i++) {
    let name = data.getString(i,'food_name');
    if (prevName!=name) {
      lineStart = i
      endShape();
      beginShape();
    }
    let mood_index = data.getNum(i, 'mood_index');
    let x = map(i-lineStart, 0, data.getRowCount() - 1, chartX, chartX + chartWidth - padding);
    let y = map(mood_index, 0, 100, chartY + chartHeight - padding, chartY);
    vertex(x, y);

    // function isMouseOver(x, y) {
    //   let d = dist(mouseX, mouseY, x, y);
    //   return d < 50;  // Change 5 to whatever distance you consider as "over"
    // }

    // if (isMouseOver(x, y)) {
    //   drawTooltip(x, y, mood_index, name);
    // }

    prevName = name
  }
  endShape();

  // Draw the mood_index_E line
  
  beginShape();
  for (let i = 0; i < data.getRowCount(); i++) {
    let name = data.getString(i,'food_name');
    if (prevName!=name) {
      lineStart = i
      endShape();
      beginShape();
    }
    let mood_index_E = data.getNum(i, 'mood_index_E');
    let x = map(i-lineStart, 0, data.getRowCount() - 1, chartX, chartX + chartWidth - padding);
    let y = map(mood_index_E, 0, 100, chartY + chartHeight - padding, chartY);
    
    vertex(x, y);
    stroke(255, 159, 28); // Orange color
    noFill();

    prevName = name;
  }
  endShape();
  

  noStroke(0);
  fill(0);
  textSize(12);
  textFont(font1);
  text("Depress", 180, chartY + chartHeight);

  noStroke(0);
  fill(0);
  textSize(12);
  textFont(font1);
  text("Happy", 180, chartY);

  fill(180);
  ellipse(chartX, chartY-3, 10, 10);
  ellipse(chartX, chartY + chartHeight-3, 10, 10);

  beginShape();
  for (let i = 0; i < data.getRowCount(); i++) {
    let name = data.getString(i,'food_name');
    if (prevName!=name) {
      lineStart = i
      endShape();
      beginShape();
    }
    let x = map(i-lineStart, 0, data.getRowCount() - 1, chartX, chartX + chartWidth - padding);

    ellipse(x, chartY + chartHeight-3, 10, 10);
    prevName = name;
  }
  endShape();

  noStroke(0);
  fill(0);
  textSize(12);
  textFont(font1);
  text("0", 246, chartY + chartHeight + 30);
  text("1", 377.5, chartY + chartHeight + 30);
  text("2", 507, chartY + chartHeight + 30);
  text("3", 637, chartY + chartHeight + 30);
  text("4", 767, chartY + chartHeight + 30);
  text("5", 897, chartY + chartHeight + 30);
  text("6", 1027, chartY + chartHeight + 30);
  text("7", 1157, chartY + chartHeight + 30);
  text("8", 1287, chartY + chartHeight + 30);
  text("9", 1417, chartY + chartHeight + 30);
  text("10", 1545, chartY + chartHeight + 30);
  text("Bites", 180, chartY + chartHeight + 30);

  text("Webb", 1500, chartY);
  text("Evie", 1500, chartY + 30);

  fill(160, 197, 120);
  ellipse(1547, chartY - 4, 10, 10);

  fill(255, 159, 28);
  ellipse(1547, chartY + 26, 10, 10);

  if (mouseX < 246 && mouseY > chartY && mouseY < chartY + chartHeight) {
    noStroke(0);
    fill(0);
    textSize(12);
    textFont(font1);
    text("Noodles with sausages", 100,314)
    text("Egg tart", 180,345)
    text("Egg", 202,453)
    text("Egg tart", 180,508)
    text("Bagel", 190,620)
    text("Roasted duck noodles", 106,675)
  }

  


  // function drawTooltip(x, y, mood_index, food_name) {
  //   let chartX = 250; // Chart x-coordinate
  //   let chartY = 230; // Chart y-coordinate
  //   let chartWidth = 3300; // Chart width
  //   let chartHeight = 600; // Chart height
  //   let padding = 50; // Padding around the chart
  //   let prevName = '';
  //   lineStart = 0;

  //   // Draw the mood_index line
  //   stroke(160, 197, 120); // Green color
  //   noFill(0);
  //   beginShape();
  //   for (let i = 0; i < data.getRowCount(); i++) {
  //     let name = data.getString(i,'food_name');
  //     if (prevName!=name) {
  //       lineStart = i
  //       endShape();
  //       beginShape();
  //     }
  //     let mood_index = data.getNum(i, 'mood_index');
  //     let x = map(i-lineStart, 0, data.getRowCount() - 1, chartX, chartX + chartWidth - padding);
  //     let y = map(mood_index, 0, 100, chartY + chartHeight - padding, chartY);
  //     vertex(x, y);
  //     prevName = name
  //   }
  //   endShape();
  
  //   noStroke(0);
  //   fill(0);
  //   textSize(24);
  //   text(`${food_name}`, mouseX, mouseY);
  // }
}
