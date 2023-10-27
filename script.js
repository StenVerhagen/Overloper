var  playerleven = 1;

class Bom {
  constructor() {
    this.x = floor(random(9,raster.aantalKolommen))*raster.celGrootte;
    this.y = floor(random(1,12,raster.aantalRijen))*raster.celGrootte;
    this.snelheid =  7;
    this.yRichting = 7;
  }
  
  beweeg() {
    this.y -= this.snelheid * this.yRichting;

    if (this.y >= canvas.height - raster.celGrootte || this.y <= 0) {
      this.yRichting *= -1;
    }
    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
  }
  
  toon() {
    image(bomPlaatje,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

class Raster {
  constructor(r,k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
    this.oranjeRegel = r;
  }
  
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }
  
  teken() {
    push();
    noFill();
    stroke('purple');
    for (var rij = 0;rij < this.aantalRijen;rij++) {
      for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
        if (rij === this.oranjeRegel - 12 || kolom ===
            this.oranjeRegel +5) 
        {
          fill ('orange');
        } else(
          noFill()
        )
          rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}

class Jos {
  constructor() {
    this.x = 0;
    this.y = 300;
    this.animatie = [];
    this.frameNummer =  3;
    this.stapGrootte = null;
    this.gehaald = false;
  }
  
  beweeg() {
    if (keyIsDown(65)) {
      this.x -= this.stapGrootte;
      this.frameNummer = 2;
    }
    if (keyIsDown(68)) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
    }
    if (keyIsDown(87)) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
    }
    if (keyIsDown(83)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }
    
    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
    
    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  }
  
  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      return true;
    }
    else {
      return false;
    }
  }

staatOp(bommenLijst) {
    for (var b = 0;b < bommenLijst.length;b++) {
      if (bommenLijst[b].x == this.x && bommenLijst[b].y == this.y) {
        this.staOpBom = true;
      }
    }
    return this.staOpBom;
  } 
  
  toon() {
    image(this.animatie[this.frameNummer],this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}


class ExtraLife {
  constructor() {
    this.x = random(canvas.width - raster.celGrootte);
    this.y = random(canvas.height - raster.celGrootte);
  }

  toon() {
    if (!this.collected) {
      image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
    }
  }
}

let extraLife;



class Vijand {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }

  beweeg() {
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  }

toon(){
  image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

function preload() {
  brug = loadImage("Sick.jpg");
  bomPlaatje = loadImage("Nuk 10.png");
}

var bommenArray = [];

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent();
  frameRate(10);
  textFont("Georgia");
  textSize(90);
  
  raster = new Raster(12,18);
  
  raster.berekenCelGrootte();
  bomba1 = new Bom();
  bomba2 = new Bom();
  bomba3 = new Bom();
  bomba4 = new Bom();
  bomba5 = new Bom();
  bomba6 = new Bom();
  
  eve = new Jos();
  eve.stapGrootte = 1*raster.celGrootte;
  for (var b = 0;b < 6;b++) {
    frameEve = loadImage("images/sprites/diefspel.png");
    eve.animatie.push(frameEve);
  }

  extraLife = new ExtraLife();
  extraLife.sprite = loadImage("images/sprites/appel_2.png");

  alice = new Vijand(700,200);
  alice.stapGrootte = 1*eve.stapGrootte;
  alice.sprite = loadImage("images/sprites/politiespel.png");

  bob = new Vijand(600,400);
  bob.stapGrootte = 1*eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/politiespel.png");  

  jan = new Vijand(600,400);
  jan.stapGrootte = 1*eve.stapGrootte;
  jan.sprite = loadImage("images/sprites/politiespel.png");  
}

function draw() {
  background(brug);
  raster.teken();
  eve.beweeg();
  alice.beweeg();
  bob.beweeg();
  jan.beweeg();
  bomba1.beweeg();
  bomba2.beweeg();
  bomba3.beweeg();
  bomba4.beweeg();
  bomba5.beweeg();
  bomba6.beweeg();
  eve.toon();
  alice.toon();
  bob.toon();
  jan.toon();
  extraLife.toon();
  bomba1.toon();
  bomba2.toon();
  bomba3.toon();
  bomba4.toon();
  bomba5.toon();
  bomba6.toon();

  fill ('white');
  textSize(50);
  text("Levens over:" + playerleven, 50, 50);
  
  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob) || eve.wordtGeraakt(jan) || eve.wordtGeraakt(bomba1) || eve.wordtGeraakt(bomba2) || eve.wordtGeraakt(bomba3) || eve.wordtGeraakt(bomba4) || eve.wordtGeraakt(bomba5) || eve.wordtGeraakt(bomba6)) {
    playerleven -= 1;
if (playerleven <= 0){
  
    
    background("red")
    fill ("black")    
    textSize(250);
    text ("Loser!!!",10,375)
    noloop();
  }
  }
  
 if (!extraLife.collected && dist(eve.x, eve.y, extraLife.x, extraLife.y) < raster.celGrootte) {
   extraLife.collected = true;
  }

  if (eve.gehaald) {
    background('green');
    fill('white');
    textSize(95);
    text("Bartje voor de winst!",10,340);
    noLoop();
  }
}