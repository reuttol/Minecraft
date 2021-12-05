// const randomize = (a,b) => Math.round(Math.random() * a) + b;


// const height = randomize(1,5);
// const width = randomize(1,3);
// let grid = [
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
// ]
// offset = 0;
// n = width;
//rocks
// for(let i=0; i<height; i++){
//     offset += randomize(0,2);
//     if(n-offset ===0) break;
//     n = randomize(1,n-offset);
//     for(let j=offset; j<offset+n; j++ )
//         grid[i][j] = 1;
// }

//leaves randomize
// for(let i=0; i<height; i++){
//     offset += randomize(0,1);
//     if(n-offset ===0) break;
//     n = randomize(1,n-offset);
//     for(let j=offset; j<offset+n; j++ )
//         grid[i][j] = 1;
// }

//tree trunc randomize
// for(let i=0; i<height; i++){
//     for(let j=0; j<width; j++ )
//         grid[i][j] = 1;
// }

// console.log(grid);
