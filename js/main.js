var k = 2;

const calculateHomothety = () => {
    homothetyDots = [];
    for (var dot = 0; dot < dots.length; dot++) {
        var vel = p5.Vector.sub(homothetyDot, dots[dot]).mult(-1*k);
        homothetyDots.push(p5.Vector.add(homothetyDot, vel));
    }
};


const drawHomothety = () => {
    for (var dot = 0; dot < homothetyDots.length; dot++) {
        fill(newFigureDotColor);
        strokeWeight(1);
        stroke([0, 0, 0])
        ellipse(homothetyDots[dot].x, homothetyDots[dot].y, 10);
        if (homothetyDots.length > 1 && dot > 0) {
            line(homothetyDots[dot-1].x, homothetyDots[dot-1].y, homothetyDots[dot].x, homothetyDots[dot].y);
        }
    }
}

const drawFigure = () => {
    for (var dot = 0; dot < dots.length; dot++) {
        fill(figureDotColor);
        strokeWeight(1);
        stroke([0, 0, 0])
        ellipse(dots[dot].x, dots[dot].y, 10);
        if (dots.length > 1 && dot > 0) {
            line(dots[dot-1].x, dots[dot-1].y, dots[dot].x, dots[dot].y);
        }
    }
}

const drawVectors = () => {
    for (var dot = 0; dot < homothetyDots.length; dot++) {
        strokeWeight(3);
        stroke([255, 255, 0])
        line(homothetyDot.x, homothetyDot.y, homothetyDots[dot].x, homothetyDots[dot].y);
    }
}

var dots = [];
var homothetyDots = [];
var homothetyDot;
var createFigure = true;
var createHomothetyDot = false;

var homothetyDotColor = [255, 0, 0];
var figureDotColor = [0, 255, 0];
var newFigureDotColor = [0, 0, 255];
var canDrawHomothety = false;

function setup() {
    createCanvas(600, 600);
    homothetyDot = createVector(0, 0);
}
  
function draw() {
    background(255);

    drawVectors();
    drawFigure();

    if (createFigure) {
        fill(figureDotColor)
        ellipse(mouseX, mouseY, 10);
    }

    if (createHomothetyDot) {
        fill(homothetyDotColor)
        ellipse(mouseX, mouseY, 10);
    }

    if (canDrawHomothety) {
        fill(homothetyDotColor)
        ellipse(homothetyDot.x, homothetyDot.y, 10); 
        drawHomothety();
    }

}

function mouseClicked(){
    if (createFigure){
        dots.push(createVector(mouseX, mouseY));
    }

    if (createHomothetyDot) {
        homothetyDot.set(mouseX, mouseY);
        calculateHomothety();
        canDrawHomothety = true;
        createHomothetyDot = false;
    }
}

function keyPressed() {
    if (keyCode == ENTER) {
        dots.push(dots[0]);
        createFigure = false;
        createHomothetyDot = true;
    }
    console.log(keyCode)
    if(keyCode == 8) { // DELETE BUTTON
        dots = [];
        homothetyDots = [];
        homothetyDot.set(0, 0);
        canDrawHomothety = false;
        createFigure = true;
        createHomothetyDot = false;   
    }
}

function mouseWheel(event) {
    if (event.delta > 0) {
        k += 0.1;
    } else {
        k -= 0.1;
    }
    
    $("#k").text(`Коєфіцієнт гомотетії = ${Math.floor(k)}`);
}
