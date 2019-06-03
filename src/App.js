"use strict";

import Game from "./Game.js";
import Player from "./Player.js";

console.log("Hello WOrld");

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

let players = [];
players.push(new Player({x: 1, y: 2}, null));
players.push(new Player({x: 3, y: 2}, null));
players.push(new Player({x: 1, y: 7}, null));

new AssetLoader()
    .loadAssets([
        { name: 'chicken', url: '/chicken.png' },
    ])
    .then(assets => {
        // Assets are loaded at this point and saved in assets.
//    console.log(assets);
    });

let a = new Game(players);
