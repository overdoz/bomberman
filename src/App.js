"use strict";

import Game from "./Game.js";


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
        { name: 'wall', url: '../images/wall.png' },
        { name: 'bomb', url: '../images/bomb.png' },
        { name: 'grid_option2', url: '../images/grid_option2.png'},
        { name: 'fire', url: '../images/fire.png'},
    ])
    .then(assets => {
        new Game("myCanvas", 13, 13, assets);
    }).catch(err => {
        window.location.href = "http://stackoverflow.com/search?q=[js]+" + err;
})

