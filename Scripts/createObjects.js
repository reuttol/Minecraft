import { changeClass, board } from "./board.js";

const trees = {
    1: 
        {   wood: [{x:0,y:0},{x:0,y:1},
                   {x:-1,y:0},{x:-1,y:1},
                   {x:-2,y:0},{x:-2,y:1},
                   {x:-3,y:0},{x:-3,y:1}],
            leaves: [{x:-4,y:-1}, {x:-4,y:0}, {x:-4,y:1}, {x:-4,y:2},
                    {x:-5,y:-1}, {x:-5,y:0}, {x:-5,y:1}, {x:-5,y:2},
                    {x:-6,y:-1}, {x:-6,y:0}, {x:-6,y:1}, {x:-6,y:2}]
        },

    2:
        {
            wood: [{x:0,y:0},
                    {x:-1,y:0},
                    {x:-2,y:0},
                    {x:-3,y:0}],
            leaves: [{x:-4,y:-1}, {x:-4,y:0}, {x:-4,y:1},
                     {x:-5,y:-1}, {x:-5,y:0}, {x:-5,y:1},
                     {x:-6,y:-1}, {x:-6,y:0}, {x:-6,y:1}]
        },

    3:
    {
        wood: [{x:0,y:1},{x:0,y:2},{x:0,y:3},
               {x:-1,y:1},{x:-1,y:2},{x:-1,y:3},
               {x:-2,y:1},{x:-2,y:2},{x:-2,y:3},
               {x:-3,y:1},{x:-3,y:2},{x:-3,y:3}],
        leaves: [{x:-4,y:0}, {x:-4,y:1}, {x:-4,y:2}, {x:-4,y:3}, {x:-4, y:4},
                            {x:-5,y:1}, {x:-5,y:2}, {x:-5,y:3},
                            {x:-6,y:1}, {x:-6,y:2}, {x:-6,y:3},
                                       {x:-7,y:2}]
    },

    4:{
        wood: [{x:0,y:0},
                {x:-1,y:0},
                {x:-2,y:0},
                {x:-3,y:0}],
        leaves: [{x:-4,y:-1}, {x:-4,y:0}, {x:-4,y:1},
                 {x:-5,y:-1}, {x:-5,y:0}, {x:-5,y:1},
                             {x:-6,y:0}]
    } 
};

const rocks = {
    1: [{x:0,y:0}, {x:0,y:-1}, {x:0,y:-2}, {x:0,y:-3},
        {x:-1,y:0}, {x:-1,y:-1}, {x:-1,y:-2},
        {x:-2,y:0}, {x:-2,y:-1},
        {x:-3,y:0}],

    2: [{x:0,y:0}, {x:0,y:-1},
        {x:-1,y:0}, {x:-1,y:-1}],

    3: [{x:0,y:0}, {x:0,y:-1}, {x:0,y:-2},
                   {x:-1,y:-1}],

    4: [{x:0,y:-1}, {x:0,y:-2}, {x:0,y:-3},
        {x:-1,y:-1}, {x:-1,y:-2}]
};

// const randomize = (a,b) => Math.floor(Math.random() * a) + b;
const randomize = (a,b) => Math.floor(Math.random() * (b-a+1)) + a;
    
const GRID_COLS = 25;
const GRID_ROWS = 25;
export const linesOfDirt = randomize(3,6);

export function drawRocks(){

    for(const [key,value] of Object.entries(rocks)){
        const startX = randomize(24-linesOfDirt,24);
        const startY = randomize(1,22);
        for(let tile of value){
            const newX = startX + tile.x;
            const newY = startY + tile.y;
            const currentTile = board.children[newX*25 + newY];
            changeClass(currentTile, "stone")
        }
    }
}
export function drawTrees(){

    const tree1 = randomize(1,4); 
    // const tree2 = randomize(1,4); 
    const startX = 24-linesOfDirt;
    const startY = randomize(3,20);
    
    for(let tile of trees[tree1].wood){
        const newX = startX + tile.x;
        const newY = startY + tile.y;
        
        const currentTile = board.children[newX*25 + newY];
        changeClass(currentTile, "wood");
    }
    for(let tile of trees[tree1].leaves){
        const newX = startX + tile.x;
        const newY = startY + tile.y;
        const currentTile = board.children[newX*25 + newY];
        changeClass(currentTile, "leaves");
    }
}
