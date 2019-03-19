module.exports = function solveSudoku(matrix) {
  
  //get all cells
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      solveOneCell(matrix, x, y);
    }
  }
    
  // solve one cell
  function solveOneCell (matrix, x, y) {
    // find position of the empty cell
    let position = findEmptyCell(matrix, x, y);
    x = position[0];
    y = position[1];
    // if no empty cells
    if (x == 'no empty cells') {
      return true;
    }
    // else, assign value
    for (let num = 1; num < 10; num++) {
      if (checkAll(matrix, x, y, num)) {
        matrix[x][y] = num;
        //check if next cell is solved
        if (solveOneCell(matrix, x, y)) { 
          return true 
        } else { // if not, assign value of the cell as 0
          matrix[x][y] = 0;
        }
      }
    }
    //trigger backtracking
    return false;
  }
   
  //find empty cell
  function findEmptyCell(matrix, x, y) {
    // set marker
    let isChecked = false;
    let defPosition = ['no empty cells', 'no empty cells'];
    
    while(!isChecked) {
     
      if (x == 9) {
        isChecked = true;
      } else {
          if (matrix[x][y] == 0) {
            defPosition[0] = x;
            defPosition[1] = y;
            isChecked = true;
          } else { // go on the next col
              if (y < 8) {
                y++;
              } else {//go on the next row
                x++;
                y = 0;
              }
          } 
      }
    }
    return defPosition;
  }
  
  // check empty cell's row
  function checkCellsRow(matrix, x, num) {
    if (!matrix[x].includes(num)) {
      return true;
    } else {
      return false;
    }
  }

  // check emty cell's col
  function checkCellsCol(matrix, y, num) {
    for(let i = 0; i < 9; i++) {
      if (matrix[i][y] == num) {
        return false;
      } 
    }
    return true;
  }

  // check empty cell's subgrid
  function checkCellsBox (matrix, x, y, num) {
    x = Math.floor(x / 3) * 3;
    y = Math.floor(y / 3) * 3;

    for (var c = 0; c < 3; c++) {
      for (var v = 0; v < 3; v++) {
        if (matrix[x + c][y + v] == num) {
          return false;
        } 
      }
    }
    return true;
  }
  
  //check all requirements
  function checkAll(matrix, x, y, num) {
    if (checkCellsRow(matrix, x, num) && checkCellsCol(matrix, y, num) && checkCellsBox (matrix, x, y, num)) {
      return true;
    }
    return false;
  }
  return matrix;
}



  

