import {dragStart} from './dropUtils.js'
import { select } from './board.js';


export function setListeners(){
    let inventoryBoxes = document.querySelectorAll('.box');
    inventoryBoxes = [...inventoryBoxes];

    inventoryBoxes.forEach((el) => el.addEventListener('dragstart',dragStart, false));
    inventoryBoxes.forEach((el) => el.addEventListener('click',handleSelected, false));

    let tools = document.querySelectorAll('.box1');
    tools.forEach((element) => {
    element.addEventListener("click", handleSelected, false);
    });
}

export function handleSelected(event){
    let targetType = event.target.getAttribute('type');
    let targetName = event.target.getAttribute('name');

    const removeSelected = document.querySelector('.selected');

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

