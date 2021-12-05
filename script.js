import {drawRocks, drawTrees, linesOfDirt} from "./game.js";

const objectType = {
    sky: "sky",
    dirt: "dirt", 
    wood: "wood",
    leaves: "leaves",
    stone: "stone",
    grass: "grass",
    cloud: "cloud"
};

const inventory = {
    dirt: 0,
    leaves: 0,
    wood: 0,
    stone: 0,
};

const minecraftObjects = {
    tree: 2,
    stone: 4,
    cloud: 1,
    dirt: 3,
    grass: 1
}

export const board = document.querySelector('.board');
let inventoryBoxes = document.querySelectorAll('.box');
let tools = document.querySelectorAll('.box1');

const toolMaterials = {
    pickaxe: ["stone"],
    shovel: ["dirt", "grass"],
    axe: ["wood", "leaves"],
    none: [],
  };

  const materialProperty = {
    mineable: ["dirt", "grass", "stone", "wood", "leaves"],
    notMineAble: ["sky","cloud"]  
};
  
const select ={
    type: null,
    name: null
}

inventoryBoxes = [...inventoryBoxes];

inventoryBoxes.forEach((el) => el.addEventListener('dragstart',dragStart, false));
inventoryBoxes.forEach((el) => el.addEventListener('click',handleSelected, false));

tools.forEach((element) => {
  element.addEventListener("click", handleSelected, false);
});


function handleSelected(event){
    console.log("handle selected");
    let targetType = event.target.getAttribute('type');
    let targetName = event.target.getAttribute('name');
    console.log(targetType, targetName);
    const removeSelected = document.querySelector('.selected');

    console.log(removeSelected);
    if(removeSelected)
        removeSelected.classList.toggle('selected');

    if(targetName === select.name){
        targetType = null;
        targetName = null;
    }
    else
        event.target.classList.toggle('selected');
    
    select.type = targetType;
    select.name = targetName;
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
    tile.addEventListener('click', bolckClickEvent, false);
    tile.addEventListener('dragover', dragOver, false);
    tile.addEventListener('dragenter', hover, false);
    tile.addEventListener('dragleave', hover, false);
    tile.addEventListener('drop', dropEvent, false);
    board.appendChild(tile);
}

const startBtn = document.querySelector('button');
const restartBtn = document.querySelector('.restart');
const resetBtn = document.querySelector('.reset');

restartBtn.addEventListener('click', stratGame);
startBtn.addEventListener('click', stratGame);
resetBtn.addEventListener('click', resetGame);

function stratGame(){
    deleteBoard();
    setGrid();
    const welcome = document.querySelector('.welcome-page');
    welcome.classList.toggle('hidden');
}

function resetGame(){
    deleteBoard();
    setGrid();
}

function deleteBoard(){
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

function bolckClickEvent(event){
    const target = event.target;

    if(select.type === 'resource'){
        build(target);
    }
    else if(select.type === 'tool'){
        mine(target);
    }
    
}
function build(target){
    let targetClassList = target.classList;

    if(isMineable(targetClassList) || !isBuildable(target) || inventory[select.name] === 0)
        return;

    target.classList.toggle(targetClassList);
    target.classList.toggle(select.name);

    changeInventoryCount(select.name, -1);
    changeClass(target, select.name);
}

function mine(target){
    let targetClassList = target.classList;
    console.log("1")
    if(!(isMineable(targetClassList) && isAccessible(target) && correctTool(targetClassList.value)) )
        // setTimeout(flicker, 0, );
        return;
    console.log("2")
    if(targetClassList.contains(objectType.grass)){
        targetClassList = objectType.dirt;
    }
    changeInventoryCount(targetClassList, 1);
    changeClass(target, objectType.sky);
}

function changeInventoryCount(name, count){
    inventory[name] += count;
    const label = document.querySelector(`.desc-${name}`);
    label.innerText = inventory[name];
}

function isMineable(targetClassList) {
    return materialProperty.mineable.includes(targetClassList.value);
}
  
function isAccessible(tile) {
    
    const x = parseInt(tile.getAttribute("x"));
    const y = parseInt(tile.getAttribute("y"));
    return (
            board.children[(x+1)*25 + y].classList.contains("sky") ||
            board.children[(x-1)*25 + y].classList.contains("sky") ||
            board.children[x*25 + (y+1)].classList.contains("sky") ||
            board.children[x*25 + (y-1)].classList.contains("sky") 
        );
}

function isBuildable(tile) {
    const x = parseInt(tile.getAttribute("x"));
    const y = parseInt(tile.getAttribute("y"));
    return (
            !board.children[(x+1)*25 + y].classList.contains("sky") ||
            !board.children[(x-1)*25 + y].classList.contains("sky") ||
            !board.children[x*25 + (y+1)].classList.contains("sky") ||
            !board.children[x*25 + (y-1)].classList.contains("sky") 
        );
}

function correctTool(material){
    console.log(toolMaterials[select.name]);
    return toolMaterials[select.name].includes(material);
}

export function changeClass(tile, target){
    const tileClass = tile.classList;
    tile.classList.toggle(tileClass);
    tile.classList.toggle(target);
}

function growGrass(tile){
    setTimeout(changeClass, 2000, tile, 'grass');
}

// growGrass(board.children[510]);


//Drag and Drog functions
function dropEvent(event){
    event.preventDefault()

    const target = event.target;

    let targetClassList = target.classList;
    event.target.classList.toggle('hovered');

    if(select.type !== 'resource')
        return;
    if(isMineable(targetClassList) || !isBuildable(target) || inventory[select.name] === 0)
        return;

    //change classes from sky/cloud to resource
    target.classList.toggle(targetClassList);
    target.classList.toggle(select.name);

    changeInventoryCount(select.name, -1);
    changeClass(target, select.name);

    const resource = document.querySelector(`[name='${select.name}']`);
    console.log("keep", resource);
    resource.classList.toggle('selected');
    console.log(select.type);
    console.log(select.name);

    select.type = null
    select.name = null
}

function dragOver(event){
    event.preventDefault();   
}

function dragStart(event){
    handleSelected(event)
}

function hover(event){
    event.target.classList.toggle('hovered');
}
