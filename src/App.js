"use strict";

import Game from "./Game.js";
import Wall from "./Wall.js";

import io from 'socket.io-client';
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
        { name: 'bomb', url: '../images/bomb.png' },
        { name: 'grid_option2', url: '../images/grid_option2.png' },
        { name: 'fire', url: '../images/fire.png' },
        {name: 'enemy', url: '../images/bomberman_boy.png' },
    ])
    .then(assets => {
        let game = null;
        let socket = io.connect('http://localhost:9000');


        let id = '';

        document.querySelector("#login").addEventListener("click", function(event) {

            event.preventDefault();
            id = document.querySelector("#lname").value;

            game = new Game("myCanvas", 13, 13, assets, id);

            socket.emit('loginPlayer', { id: id });

            socket.on('createWalls', function (data) {
                data.forEach(d => {
                    let pos = {x: d.x, y: d.y};
                    game.walls.push(new Wall(pos, 1, d.isDestructible, assets, 40, d.id));
                });
            });

            socket.on('createNewPlayer', function (data) {
                game.pushPlayer(data);
            });

            socket.on('directionChanged', function (data) {
                game.changeDirection(data)
            });

            socket.on('playerMoved', function (data) {
                game.playerMoved(data);
            });

            socket.on('getBomb', function (data) {
                game.getBomb(data);
            });

            socket.on('getWall', function (data) {
                game.getWall(data);
            })

            document.addEventListener("keydown", (e) => {
                game.movePlayer({id: id, key: e.key})

            });

        }, false);











    }).catch(err => {
        window.location.href = "http://stackoverflow.com/search?q=[js]+" + err;
});








