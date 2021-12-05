import * as bd from './board.js';
import * as drop from './dropUtils.js';
import {linesOfDirt, drawRocks, drawTrees} from './createObjects.js';
import { setListeners } from './ToolsUtils.js';

export const objectType = {
    sky: "sky",
    dirt: "dirt", 
    wood: "wood",
    leaves: "leaves",
    stone: "stone",
    grass: "grass",
    cloud: "cloud"
};

const startBtn = document.querySelector('button');
const restartBtn = document.querySelector('.restart');
const resetBtn = document.querySelector('.reset');

restartBtn.addEventListener('click', startGame);
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

function startGame(){
    deleteBoard();
    resetInvetory();
    setGrid();
    const welcome = document.querySelector('.welcome-page');
    welcome.classList.toggle('hidden');
}

function resetGame(){
    deleteBoard();
    resetInvetory();
    setGrid();
}

function deleteBoard(){
    while (bd.board.firstChild) {
        bd.board.removeChild(bd.board.firstChild);
    }
}

function resetInvetory(){
    for(let key in bd.inventory){
        bd.changeInventoryCount(key, -bd.inventory[key]);
    }
}

function setGrid(){
    for(let i=1; i<=25; i++){
        for(let j=1; j<=25; j++){
            if(i > 25-linesOfDirt)
                newGridCell(objectType.dirt, j, i);
            else
                newGridCell(objectType.sky, j, i);
        }
    }
    drawRocks();
    drawTrees();
}

function newGridCell(cls, i, j){
    const tile = document.createElement('div');
    
    tile.classList.add(`${cls}`);
    tile.setAttribute('x', j-1);
    tile.setAttribute('y', i-1);
    tile.addEventListener('click', bd.bolckClickEvent, false);
    tile.addEventListener('dragover', drop.dragOver, false);
    tile.addEventListener('dragenter', drop.hover, false);
    tile.addEventListener('dragleave', drop.hover, false);
    tile.addEventListener('drop', drop.dropEvent, false);
    
    bd.board.appendChild(tile);
}

setListeners();