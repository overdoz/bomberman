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
        {name: 'enemy', url: '../images/bomberman_boy.png' },
    ])
    .then(assets => {
        let game = null;


        let id = '';

        document.querySelector("#login").addEventListener("click", function(event) {

            // prevent refresh of the current screen
            event.preventDefault();

            // select input node of DOM by its ID
            id = document.querySelector("#lname").value;
           /* document.getElementById('amountBombs').id = id + 'BombText';
            document.getElementById('amountWalls').id = id + 'WallText';*/

            // initialize game
            game = new Game("myCanvas", 13, 13, assets, id);

            // send notification to server to create your player
            //socket.emit('loginPlayer', { id: id });

            // after logging in your player, the server will send you all generated walls
            // socket.on('createWalls', function (data) {
            //     data.forEach(d => {
            //         let pos = {x: d.x, y: d.y};
            //         game.walls.push(new Wall(pos, 1, d.isDestructible, assets, 40, d.id));
            //     });
            // });

            // server.js will this method each time a new player is created
            //TODO: this method is being called twice (see browser console) - WHY?!?!
            // socket.on('createNewPlayer', function (data) {
            //     console.log(data);
            //     game.pushPlayer(data);
            //     // game.creatHTMLnode(data);
            // });

            // receive direction changes
            // socket.on('directionChanged', function (data) {
            //     console.log('direction changed', data);
            //     game.changeDirection(data)
            // });

            // receive enemy player movements
            // socket.on('playerMoved', function (data) {
            //     console.log('playerMoved', data);
            //     game.playerMoved(data);
            // });

            // receive bombs set by enemies
            // socket.on('getBomb', function (data) {
            //     console.log('got bomb', data);
            //     game.getBomb(data);
            // });

            // receive walls set by enemies
            // socket.on('getWall', function (data) {
            //     console.log('got wall', data);
            //     game.getWall(data);
            // });

            // your personal player ID is stored inside App.js and Game.js
            // so eventListeners will only affect your player
            // document.addEventListener("keydown", (e) => {
            //     game.movePlayer({id: id, key: e.key})
            //
            // });

            // socket.on('updateHTML', function (data) {
            //     try {
            //         let bomb = document.getElementById(data.id + 'BombText');
            //         bomb.innerText = data.amountBombs;
            //
            //         let wall = document.getElementById(data.id + 'WallText');
            //         wall.innerText = data.amountWalls;
            //     } catch (e) {
            //         console.log(e.message);
            //     }
            //
            // });

        }, false);











    }).catch(err => {
        window.location.href = "http://stackoverflow.com/search?q=[js]+" + err;
});








