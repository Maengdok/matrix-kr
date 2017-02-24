var symbolSize = 20;
var streams = [];

function setup() {
  createCanvas(
    window.innerWidth, // Largeur de la fenêtre actuelle
    window.innerHeight // Hauteur de la fenêtre actuelle
  );
  background(0); // Couleur du fonds
  var x = 0; // coord
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-1500, 0));
    streams.push(stream);
    x += symbolSize
  }
  textSize(symbolSize);
}

function draw() {
  background(0, 150); // deactived the long trail
  streams.forEach(function(stream) {
    stream.render();
  });
  
}

function Symbol(x, y, speed, first) { 
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(2, 20));
  this.first = first;
  
  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0) { 
      this.value = String.fromCharCode(
        0x3131 + round(random(0, 50)) // Unicode Char
      );
    }
  }
  
  this.rain = function() {
    if (this.y >= height) {
      this.y = 0;
    } else {
      this.y += this.speed;
    }
     //this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  this.speed = random(5, 20);
  
  this.generateSymbols = function (x, y) {
      var first = round(random(0, 4)) == 1; // 1/4
      for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  }
  
  this.render = function () {
      this.symbols.forEach(function(symbol) {
        if (symbol.first){
          fill(180, 255, 180);
        } else {
            fill (0, 255, 70);
        }
        text(symbol.value, symbol.x, symbol.y);
        symbol.rain();
        symbol.setToRandomSymbol();
     });
  }
  
}