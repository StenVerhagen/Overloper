var  playerleven = 1;

class Bom {
  constructor() {
    this.x = floor(random(9,raster.aantalKolommen))*raster.celGrootte;
    this.y = floor(random(1,12,raster.aantalRijen))*raster.celGrootte;
    this.snelheid =  random(5 ,5);
    this.yRichting = 5;
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

// Hierboven staat de klasse bom. 

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
    stroke('white');
    for (var rij = 0;rij < this.aantalRijen;rij++) {
      for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
        if (rij === this.oranjeRegel - 12 || kolom ===
            this.oranjeRegel -12) 
        {
          fill ('blue');
        } else(
          noFill()
        )
          
// Hierboven hebben we een stukje code die ervoor zorgt dat het raster wit is en de 2 balken blauw zijn.
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

// Hierboven wordt het poppetje jos, wat bij ons de rode angry bird is, gegenereert.
  
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

// Hierboven zie je dat wij de bestuurstoetsen hebben veranderd van de pijltjes naar WASD door hun nummers in te vullen.
    
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

var extraLife;

//Hierboven wordt een klasse voor een extra leven toegepast, bij ons is dat de powerpotion.

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
  brug = loadImage("background.jpg");
  bomPlaatje = loadImage("Bom bird.png");
}
//Hier veranderen wij het plaatje van de bommen en de achtergrond.

var bommenArray = [];

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent();
  frameRate(10);
  textFont("Georgia");
  textSize(90);
  
  raster = new Raster(12,18);
 // Hier passen wij het raster aan naar 12,18.
  
  raster.berekenCelGrootte();
  bomba1 = new Bom();
  bomba2 = new Bom();
  bomba3 = new Bom();
  bomba4 = new Bom();
  bomba5 = new Bom();
  bomba6 = new Bom();

//Hierboven worden Bommen uit Class Bom die bovenaan de code staat gekopieert en er 6 van geplaatst.
  
  eve = new Jos();
  eve.stapGrootte = 1*raster.celGrootte;
  for (var b = 0;b < 6;b++) {
    frameEve = loadImage("red 2.png");
    eve.animatie.push(frameEve);
  }
//Hierboven hebben wij het plaatje van de Jos aangepast.
  
  extraLife = new ExtraLife();
  extraLife.sprite = loadImage("images/sprites/PowerPotion.png");
//Hierboven hebben wij het plaatje van de appel/extra leven aangepast.
  
  alice = new Vijand(700,200);
  alice.stapGrootte = 1*eve.stapGrootte;
  alice.sprite = loadImage("Koning.png");

  bob = new Vijand(600,400);
  bob.stapGrootte = 1*eve.stapGrootte;
  bob.sprite = loadImage("Koning.png");  

  jan = new Vijand(600,400);
  jan.stapGrootte = 1*eve.stapGrootte;
  jan.sprite = loadImage("Koning.png");  
//Hierboven hebben wij hebben wij de plaatjes van de vijanden aangepast. Ook voor de extra vijand die wij toegevoegd hebben.
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

// Hierboven wordt ervoor gezorgd dat alle tastbare/bewegende elementen uit het spel getoond worden.
  
  fill ('white');
  textSize(50);
  text("Levens over:" + playerleven, 20, 50);
  
  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob) || eve.wordtGeraakt(jan) || eve.wordtGeraakt(bomba1) || eve.wordtGeraakt(bomba2) || eve.wordtGeraakt(bomba3) || eve.wordtGeraakt(bomba4) || eve.wordtGeraakt(bomba5) || eve.wordtGeraakt(bomba6)) {
    playerleven -= 1;
if (playerleven <= 0){
    background("red")
    fill ("black")    
    textSize(110);
    text ("Helaas, verloren!",30,330)
    noloop();
  }
  }

//Hierboven word gezorgd dat wanneer eve word geraakt door een van de mobs (alice, bob, jan en bomba 1t/m6) er een leven af gaat en wanneer je 0 levens over hebt je af bent en het verliezers scherm wordt getoond. 

  
  if (!extraLife.collected && dist(eve.x, eve.y, extraLife.x, extraLife.y) < raster.celGrootte) {
    extraLife.collected = true;
    playerleven++;
  }

  if (eve.gehaald) {
    background('green');
    fill('white');
    textSize(95);
    text("Gefeliciteerd!",155,340);
    noLoop();
  }

  // Hierbiven geven wij een passende boodschap wanneer je wint of verliest.
  
}