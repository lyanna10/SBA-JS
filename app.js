//Make a Ship class
class Ship { 
    constructor(hull, firepower, accuracy) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

    attack(target) {
        if (Math.random() < this.accuracy) { 
            target.hull -= this.firepower; 
            console.log("%cAttack Successful!", "color: red; font-size: 15px")
        } else {
            console.log("%cMissed attack!", "color: orange; font-size: 15px")
        }
    }
}

//Make a HumanShip sub-class.
class HumanShip extends Ship { };

//Make an AlienShip sub-class.
class AlienShip extends Ship { };

/**
 * Make an instance of each class.
Simulate a battle between your ship and a single alien ship first.

Make a method for the Ship that will attack a given target. The target can be an input to the method.
Run the method and pass it the alien ship.
Make it so the method reduces the target's hull by the firepower of the USS Assembly
 */
const ussAssembly = new HumanShip(20, 5, 0.6);
const alienShips = [];

for (let i = 0; i < 6; i++) { //6 alien ships
    const hull = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
    const firepower = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
    const accuracy = Math.random() * (0.8 - 0.6) + 0.6;
    const alienShip = new AlienShip(hull, firepower, accuracy);
    alienShips.push(alienShip);
}

//Make a game object.
const game = {
    //Make a method in the game object that will run a 'check win' for the health of the alien(s) and/or the USS
    checkWin() {
        //Assembly. If the hull is 0 or less, display a message that the ship went kabloo-ey.
        if (ussAssembly.hull <= 0) {
            console.log("Ship went Kabloo-ey");
            return true;
        } else if (alienShips.every(ship => ship.hull <= 0)) {
            console.log("You did it, you destroyed all the the Alien ships!")
            return true;
        } else {
            return false;
        }
    },

    askQuestion(question) {
        return new Promise((resolve) => {
        const answer = window.confirm(question);
        resolve(answer);
        });
    },

    async sixRounds() {
        const theAlienShip = alienShips[0];

        //Make it so the alien will only be hit if a Math.random call is below the accuracy threshold.
        ussAssembly.attack(theAlienShip);
        if (theAlienShip.hull > 0) {
            theAlienShip.attack(ussAssembly);
        }
        /*if (await this.askQuestion("Attack the following ship?")) {
            ussAssembly.attack(theAlienShip);
        }

        if (theAlienShip.hull > 0) {
            theAlienShip.attack(ussAssembly);
        }*/

        //Add a status console.log for the end of the round.
        console.log(`Status: \nUss Assembly: ${ussAssembly.hull}\nAlien Ship: ${theAlienShip.hull}`);

        if (theAlienShip.hull <= 0) {
            alienShips.shift();
            if (this.checkWin()) {
                return;
            }

            const letsContinuePlaying = await this.askQuestion("Attack the following ship?");
            if (!letsContinuePlaying) {
                console.log("Game over!");
                return;
            }
            //this.checkWin();
            if (this.checkWin()) {
            return;
            }
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
    },

    async lestStartTheGame() {
        while (!this.checkWin()) {
           await this.sixRounds();
        }
    },
}

const buttons = document.getElementById("button");
buttons.addEventListener("click", () => {
    //evt.preventDefault();
    game.lestStartTheGame();
})

