"use strict";

import Game from "./Game.js";
import io from 'socket.io-client';

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
    ])
    .then(assets => {
        let players = [];
        new Game("myCanvas", 13, 13, assets);
        console.log("in App.js a new Game ");
    }).catch(err => {
        window.location.href = "http://stackoverflow.com/search?q=[js]+" + err;
});


export default class Client{
    constructor() {
        this.socket = io('http://localhost:9000');
    }

    move(direction) {
        this.socket.emit('move', {direction: direction});
    }
}
