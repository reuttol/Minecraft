import { objectType } from "./startScreen.js";

export const board = document.querySelector('.board');

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
  
export const select ={
    type: null,
    name: null
}

export const inventory = {
    dirt: 0,
    leaves: 0,
    wood: 0,
    stone: 0,
};

export function bolckClickEvent(event){
    const target = event.target;

    if(select.type === 'resource'){
        build(target);
    }
    else if(select.type === 'tool'){
        mine(target);
    }
    
}

export function build(target){
    let targetClassList = target.classList;

    if(isMineable(targetClassList) || !isBuildable(target) || inventory[select.name] === 0)
        return;

    target.classList.toggle(targetClassList);
    target.classList.toggle(select.name);

    changeInventoryCount(select.name, -1);
    changeClass(target, select.name);
}

export function mine(target){
    let targetClassList = target.classList;

    if(!(isMineable(targetClassList) && isAccessible(target) && correctTool(targetClassList.value)) )
        // setTimeout(flicker, 0, );
        return;
    if(targetClassList.contains(objectType.grass)){
        targetClassList = objectType.dirt;
    }
    changeInventoryCount(targetClassList, 1);
    changeClass(target, objectType.sky);
}

export function isMineable(targetClassList) {
    return materialProperty.mineable.includes(targetClassList.value);
}
  
export function isAccessible(tile) {
    
    const x = parseInt(tile.getAttribute("x"));
    const y = parseInt(tile.getAttribute("y"));
    return (
            (x<24 && board.children[(x+1)*25 + y].classList.contains("sky")) ||
            (x>0 && board.children[(x-1)*25 + y].classList.contains("sky")) ||
            (y<24 && board.children[x*25 + (y+1)].classList.contains("sky")) ||
            (y>0 && board.children[x*25 + (y-1)].classList.contains("sky")) 
        );
}

export function isBuildable(tile) {
    const x = parseInt(tile.getAttribute("x"));
    const y = parseInt(tile.getAttribute("y"));
    return (
            (x<24 && !board.children[(x+1)*25 + y].classList.contains("sky")) ||
            (x>0 && !board.children[(x-1)*25 + y].classList.contains("sky")) ||
            (y>24 && !board.children[x*25 + (y+1)].classList.contains("sky")) ||
            (y>0 && !board.children[x*25 + (y-1)].classList.contains("sky")) 
        );
}

export function correctTool(material){
    return toolMaterials[select.name].includes(material);
}

export function changeClass(tile, target){
    const tileClass = tile.classList;
    tile.classList.toggle(tileClass);
    tile.classList.toggle(target);
}

export function changeInventoryCount(name, count){
    inventory[name] += count;
    const label = document.querySelector(`.desc-${name}`);
    label.innerText = inventory[name];
}
