import {handleSelected} from './ToolsUtils.js';
import {select, isMineable, isBuildable, changeInventoryCount, changeClass } from './board.js';
import {inventory} from './board.js'

export function dropEvent(event){
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
    resource.classList.toggle('selected');

    select.type = null
    select.name = null
}

export function dragOver(event){
    event.preventDefault();   
}

export function dragStart(event){
    handleSelected(event)
}

export function hover(event){
    event.target.classList.toggle('hovered');
}