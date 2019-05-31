const Element = require('./Element.js');

class Player extends Element {



    constructor(position, health, numberOfBombs, numberOfWalls) {
        super(position[0], position[1], null);
        this.lifeLeft = health; // double
        this.numberOfBombs = numberOfBombs; // 14 at the beginning
        this.numberOfWalls = numberOfWalls; //  7 walls at the beginning
        this.maximumNumberOfBombs = this.numberOfBombs*2;
        this.powerUps = null;
        this.timeLeftToBuildWall = 15;
        this.dead = false;
        this.direction = 'EAST';
    }

    getGridPositionX() {
        return super.getX();
    }

    getGridPositionY() {
        return super.getY();
    }

    // Reduces the Life Left of the current Player
    getDamage(damage) {
        // damage must always be a negative double
        if (damage >= 0) {
            throw new Error("Damage must be a negative double number!");
        }
        this.lifeLeft += damage;
        // Player is dead
        if (this.lifeLeft <= 0) {
            this.dead = true;
        }
    }

    throwBomb() {
        // throws a bomb at the current position
        if (this.numberOfBombs > 0) {
            this.numberOfBombs--;
            return new Bomb(this.getGridPositionX(), this.getGridPositionY());
        }
        return null;
    }

    getNumberOfBombs() {
        return this.numberOfBombs;
    }

    getLifeLeft() {
        return this.lifeLeft;
    }

    move(direction) {
        // TODO: OUT OF CANVAS
        // TODO: A WALL IN FRONT OF THE PLAYER
        switch (direction) {
            case "NORTH":
                super.setY(super.getY() + 1);
                return;
            case "SOUTH":
                super.setY(super.getY() - 1);
                return;
            case "EAST":
                super.setX(super.getX() + 1);
                return;
            case "WEST":
                super.setX(super.getX() - 1);
                return;
        }
        throw new Error("Invalid Direction !!!");
    }

    buildWall() {
        if (this.timeLeftToBuildWall == 0) {
            this.timeLeftToBuildWall = 15;
            return new Wall()
        } else {
            return null;
        }
    }

}

module.exports = Player;