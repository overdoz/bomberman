"use strict";

import Game from "./Game.js";
// import io from '../node_modules library root/socket.io-client/dist/';
import io from 'socket.io-client';
import _ from 'lodash';
import './main.css';
import Bomberman from '../images/bomberman.png';
import DestructibleWall from '../images/wall.png';
import Bomb from '../images/bomb.png';
import IndestructibleWall from '../images/grid_option2.png';
import Fire from '../images/fire.png';

export class AssetLoader {
    loadAsset(name, url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.addEventListener('load', function() {
                return resolve({ name, image: this });
            });
        });
    }

    loadAssets(assetsToLoad) {
        return Promise.all(
            assetsToLoad.map(asset => this.loadAsset(asset.name, asset.url))
        ).then(assets =>
            assets.reduceRight(
                (acc, elem) => ({ ...acc, [elem.name]: elem.image }),
                {}
            )
        );
    }
}

var game;

new AssetLoader()
    /*.loadAssets([
        { name: 'bomberman', url: Bomberman },
        { name: 'wall', url: DestructibleWall },
        { name: 'bomb', url: Bomb },
        { name: 'grid_option2', url: IndestructibleWall },
        { name: 'fire', url: Fire },
    ])*/
    .loadAssets([
        { name: 'bomberman', url: '../images/bomberman.png' },
        { name: 'wall', url: '../images/wall.png' },
        { name: 'bomb', url: '../images/bomb.png' },
        { name: 'grid_option2', url: '../images/grid_option2.png' },
        { name: 'fire', url: '../images/fire.png' },
        {name: 'enemy', url: '../images/bomberman_boy.png' },
    ])
    .then(assets => {
        let players = [];
        game = new Game("myCanvas", 13, 13, assets);
        console.log("in App.js a new Game ");
    }).catch(err => {
        window.location.href = "http://stackoverflow.com/search?q=[js]+" + err;
});


export default class Client{
    constructor() {
        this.socket = io('http://localhost:9000');
        this.socket.on("move", function(direction) {
            console.log("Client receives that the enemy moved:  " + direction.direction);
            game.enemyMoved(direction.direction);
        });
    }

    move(direction) {
        this.socket.emit('move', {direction: direction});
    }





}
