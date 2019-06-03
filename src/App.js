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






new AssetLoader()
    .loadAssets([
        { name: 'bomberman', url: '../images/bomberman.png' },
    ])
    .then(assets => {
        let players = [];
        players.push(new Player(1, 1, assets, 1, 14, 7, 40));
        new Game("myCanvas", 12, 12, assets, players);

    });

