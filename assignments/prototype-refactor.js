/* 

Prototype Refactor

1. Copy and paste your code or the solution from yesterday

2. Your goal is to refactor all of this code to use ES6 Classes. The console.log() statements should still return what is expected of them.

*/

/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

class GameObject {
  constructor({createdAt, name, dimensions}) {
    this.createdAt = createdAt;
    this.name = name;
    this.dimensions = dimensions;
  }
}
GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
};

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

class CharacterStats extends GameObject {
  constructor({healthPoints, ...gameObjectAttributes}) {
    super(gameObjectAttributes);
    this.healthPoints = healthPoints;
  }
}

CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage.`;
};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid({ team, weapons, language, ...characterStats }) {
  CharacterStats.call(this, characterStats);
  this.team = team;
  this.weapons = weapons;
  this.language = language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}`;
};

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by un-commenting these 3 objects and the list of console logs below:

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama"],
  language: "Common Tongue"
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: "Sir Mustachio",
  team: "The Round Table",
  weapons: ["Giant Sword", "Shield"],
  language: "Common Tongue"
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Bow", "Dagger"],
  language: "Elvish"
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

Humanoid.prototype.baseDamage = 75;

function Hero(attr) {
  Humanoid.call(this, attr);
  const damage = Math.floor(Math.random() * 5 * 15 + this.baseDamage);
  this.damage = damage;
  this.maxHealth = attr.healthPoints;
  console.log(
    `A Hero has been summoned onto the field with ${this.damage} damage and ${this.healthPoints} health`
  );
}

function Villain(attr) {
  const damage = Math.floor(Math.random() * 2 * 15 + this.baseDamage);
  Humanoid.call(this, attr);
  this.damage = damage;
  this.maxHealth = attr.healthPoints;
  console.log(
    `A villan has been summoned onto the field with ${this.damage} damage and ${this.healthPoints} health`
  );
}

Hero.prototype = Object.create(Humanoid.prototype);
Villain.prototype = Object.create(Humanoid.prototype);

Hero.prototype.smite = function(villain) {
  console.log(`\n----- Hero Attacks ------`)
  villain.healthPoints -= this.damage;
  console.log(`${villain.name} has been smited by ${this.name} for ${this.damage}, health left: ${villain.healthPoints <= 0 ? 0 : villain.healthPoints}`)
  console.log();
};

Villain.prototype.lifeSteal = function(hero) {
  const healRatio = .25;
  const heal = this.damage * healRatio;
  console.log(`\n----- Villain Attacks ------`)
  hero.healthPoints -= this.damage;
  this.healthPoints = this.healthPoints + heal >= this.maxHealth ? this.maxHealth : this.healthPoints + heal; 
  console.log(`${hero.name} has gotten their life stolen for ${this.damage}. health left: ${hero.healthPoints <= 0 ? 0 : hero.healthPoints}`);
  console.log(`${this.name} restored ${healRatio * 100}%(${heal}) of the damage dealt, bringing their health to ${this.healthPoints}`)
  console.log();
};

const archerHero = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: Math.floor(Math.random() * 100 + 500),
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Bow", "Dagger"],
  language: "Elvish",
  side: "Hero",
});

const mageVillain = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: Math.floor(Math.random() * 50 + 500),
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama"],
  language: "Common Tongue",
  side: "Villain",
});

const coinflip = Math.floor(Math.random * 2);
console.log(coinflip ? "Hero goes first" : "Villain goes first");
if (coinflip) {
  // if 1 hero goes first
  let heroHp = archerHero.healthPoints,
    villainHp = mageVillain.healthPoints;

  while (heroHp > 0 && villainHp > 0) {
    archerHero.smite(mageVillain);
    if (mageVillain.healthPoints <= 0) {
      console.log(mageVillain.destroy());
      return;
    }

    heroHp = archerHero.healthPoints;

    mageVillain.lifeSteal(archerHero);
    if (archerHero.healthPoints <= 0) {
      console.log(archerHero.destroy());
      return;
    }

    villainHp = mageVillain.healthPoints;
  }
}

let heroHp = archerHero.healthPoints,
villainHp = mageVillain.healthPoints;

while (heroHp > 0 && villainHp > 0) {
mageVillain.lifeSteal(archerHero);
if (archerHero.healthPoints <= 0) {
  console.log(archerHero.destroy());
  return;
}

heroHp = archerHero.healthPoints;

archerHero.smite(mageVillain);
if (mageVillain.healthPoints <= 0) {
  console.log(mageVillain.destroy());
  return;
}

villainHp = mageVillain.healthPoints;
}
