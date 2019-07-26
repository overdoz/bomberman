"use strict";

import Game from "./Game.js";
import _ from 'lodash';
import './main.css';


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
        { name: 'spoilLife', url: '../images/spoilLife.png' },
        { name: 'spoilRun', url: '../images/spoilRun.png' },
        { name: 'spoilBomb', url: '../images/spoilBomb.png' },
        { name: 'bomb', url: '../images/bomb.png' },
        { name: 'grid_option2', url: '../images/grid_option2.png' },
        { name: 'fire', url: '../images/fire.png' },
        { name: 'enemy', url: '../images/enemy_bomberman.png'}
    ])
    .then(assets => {
        let game = null;
        let id = '';

        document.querySelector("#login").addEventListener("click", function(event) {

            // prevent refresh of the current screen
            event.preventDefault();

            // select input node of DOM by its ID
            id = document.querySelector("#lname").value;

            // initialize game when nickname has at least 1 character
            if (id !== '') {
                game = new Game("myCanvas", 13, 13, assets, id);
            }

        }, false);

        document.querySelector("#you_suck_button").addEventListener('click', function (event){
            event.preventDefault();
            const YOU_SUCK = "you_suck";
            if (game != null) {
                game.broadcastReaction(YOU_SUCK);
                game.drawReaction({id: game.id, reaction: YOU_SUCK})
            }
        });

        document.querySelector('#love_button').addEventListener('click', function (event) {
            event.preventDefault();
            const LOVE = 'love';
            if (game != null) {
                game.broadcastReaction(LOVE);
                game.drawReaction({id: game.id, reaction: LOVE})
            }
        });

        document.querySelector('#lol_button').addEventListener('click', function (event) {
            event.preventDefault();
            const LOL = 'lol';
            if (game != null) {
                game.broadcastReaction(LOL);
                game.drawReaction({id: game.id, reaction: LOL})
            }
        });



    }).catch(err => {
        console.log(err);
        window.open(`http://stackoverflow.com/search?q=[js]+${err}`);
        //window.location.href = "http://stackoverflow.com/search?q=[js]+" + err;
});








