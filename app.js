var isGameStarted=false;
var isGameOver=false;
var currentTreasureCoins;
var totalTreasureCoins;
var islandDiv;
var treasureCoinsDiv;
const gameRules="Choose the island cells and get clues to find Treasure. Coins will be minimized for wrong guess. Look at right to know coins left";
const treasureCoinsTabText="Treasure Coins : ";
const firstElement=0;
const wrongGuessDecrementor=10;
const lookDownwards="Look Downwards";
const lookUpwards="Look Upwards";
const lookLeftwards="Look Leftwards";
const lookRightwards="Look Rightwards";
const lostGame="You lost";
const wonGame="You won";


function createGame()
{
    if(!isGameStarted)
    {
        var numberOfCells=document.getElementById("numberOfCells").value;
        var totalRows=numberOfCells;
        var totalColumns=numberOfCells;
        startGame(totalRows,totalColumns);
    }
    else gameAlreadyRunning();
}

function gameAlreadyRunning()
{
    swal(
        {
            title:"Please play the current game",
            icon:"warning",
        });
}

function startGame(totalRows,totalColumns)
{
    
    let gameDiv=document.createElement("div");
    gameDiv.className="game";
    generateGameRules();
    totalTreasureCoins=generateTreasureCoins(totalRows,totalColumns);
    currentTreasureCoins=totalTreasureCoins;
    var treasureRow=generateTreasureRow(totalRows);
    var treasureColumn=generateTreasureColumn(totalColumns);
    treasureCoinsDiv=generateTreasureTab(totalTreasureCoins);
    gameDiv.appendChild(treasureCoinsDiv);
    islandDiv=generateIslandTab(totalRows,totalColumns,treasureRow,treasureColumn);
    gameDiv.appendChild(islandDiv);
    document.body.appendChild(gameDiv);
    isGameStarted=true;
}

function generateIslandTab(totalRows,totalColumns,treasureRow,treasureColumn)
{
    islandDiv=document.createElement("div");
    var color="blue";
    for(let row=0;row<totalRows;row++)
    {
        let rowDiv=document.createElement("div");
        for(let column=0;column<totalColumns;column++)
        {
            let islandCellDiv=document.createElement("div");
            islandCellDiv.className=generateIslandCellClassName(color);
            islandCellDiv.id=generateIslandCellId(row,column);
            islandCellDiv.setAttribute("onclick","playGame(this,"+treasureRow+","+treasureColumn+",)");
            color=changeIslandCellColor(color);
            rowDiv.appendChild(islandCellDiv);
        }
        rowDiv.className="island-row";
       islandDiv.appendChild(rowDiv);
    }
    islandDiv.className="island";
    return islandDiv;
}

function  generateGameRules()
{
    swal({
        title:"Rules",
        text:gameRules,
        icon:"info",
    })
}

function generateIslandCellClassName(color)
{
    if(color=="blue")return "island-cell-blue";
    return "island-cell-brown";
}

function changeIslandCellColor(color)
{
    if(color=="blue")return "brown"
    return "blue";
}

function generateTreasureTab(totalTreasureCoins)
{
    let treasureCoinsDiv=document.createElement("div");
    treasureCoinsDiv.className="treasure-coins";
    treasureCoinsDiv.innerHTML=treasureCoinsTabText+totalTreasureCoins;
    return treasureCoinsDiv;
}

function generateTreasureCoins(totalRows,totalColumns)
{
    let totalTreasureCoins=totalRows*10;
    return totalTreasureCoins;
}

function generateTreasureRow(totalRows)
{
    return Math.floor(Math.random()*totalRows);
}

function generateTreasureColumn(totalColumns)
{
    return Math.floor(Math.random()*totalColumns);
}

function generateIslandCellId(row,column)
{
    return "cell-"+row+"-"+column;
}

function playGame(islandCell,treasureRow,treasureColumn)
{
    if(!isGameOver)
    {
        checkForTreasureAndGiveClue(islandCell,treasureRow,treasureColumn);
        canContinueGame(treasureRow,treasureColumn);
    }

}

function checkForTreasureAndGiveClue(islandCell,treasureRow,treasureColumn)
{
    islandCellId=islandCell.id;
    let splitter=islandCellId.split('-');
    let selectedRow=splitter[1];
    let selectedColumn=splitter[2];
   
    if(isTreasureNotFound(selectedRow,selectedColumn,treasureRow,treasureColumn))
    {
        currentTreasureCoins=minimizeTreasureCoins(currentTreasureCoins);
        giveCluesOnSelectedCell(selectedRow,selectedColumn,treasureRow,treasureColumn);
        modifyTreasureTab();
    }
    else{
        treasureFound(treasureRow,treasureColumn);
        terminateGame()
    }
    
}

function isTreasureNotFound(selectedRow,selectedColumn,treasureRow,treasureColumn)
{
 return (treasureRow!=selectedRow || treasureColumn!=selectedColumn);
}

function giveCluesOnSelectedCell(selectedRow,selectedColumn,treasureRow,treasureColumn)
{
    currentCell=document.getElementById(generateIslandCellId(selectedRow,selectedColumn));
    currentCell.innerHTML=generateClues(selectedRow,selectedColumn,treasureRow,treasureColumn);
    currentCell.id="null-cell";
}

function generateClues(selectedRow,selectedColumn,treasureRow,treasureColumn)
{
    if(selectedRow<treasureRow)
    {
        return lookDownwards;
    }
    else if(selectedRow>treasureRow)
    {
        return lookUpwards;
    }
    else
    {
        if(selectedColumn<treasureColumn)
        {
            return lookRightwards;
        }
        else if(selectedColumn>treasureColumn)
        {
            return lookLeftwards;
        }
    }
}

function minimizeTreasureCoins(currentTreasureCoins)
{
    currentTreasureCoins-=wrongGuessDecrementor;
    console.log(currentTreasureCoins);
    return currentTreasureCoins;
}

function modifyTreasureTab()
{
    treasureTab=document.getElementsByClassName("treasure-coins")[firstElement];
    if(!hasSafeAmountOfCoins())
    {
        treasureTab.setAttribute("style","background-color:red;border: 2px solid red;");
    }
    treasureTab.innerHTML=treasureCoinsTabText+currentTreasureCoins;
}

function hasSafeAmountOfCoins()
{
    return (currentTreasureCoins> (totalTreasureCoins/2));
}

function treasureFound(treasureRow,treasureColumn)
{
    displayTreasureCell(treasureRow,treasureColumn);
    wonDiv=document.createElement("div");
    wonDiv.className="won-game";
    wonDiv.innerHTML=wonGame+" "+currentTreasureCoins+" coins";
    document.body.append(wonDiv);
    isGameOver=true;
}

function displayTreasureCell(treasureRow,treasureColumn)
{
    treasureCellId=generateIslandCellId(treasureRow,treasureColumn);
    treasureCell=document.getElementById(treasureCellId);
    treasureCell.className="treasure-cell";
    treasureCell.innerHTML=currentTreasureCoins;
}

function canContinueGame(treasureRow,treasureColumn)
{
    if(!hasEnoughCoins())
    {
        treasureNotFound(treasureRow,treasureColumn);
        terminateGame();
    }
}

function hasEnoughCoins()
{
    return currentTreasureCoins!=0;
}

function treasureNotFound(treasureRow,treasureColumn)
{
    displayTreasureCell(treasureRow,treasureColumn);
    lostDiv=document.createElement("div");
    lostDiv.className="lost-game";
    lostDiv.innerHTML=lostGame;
    console.log("lost");
    document.body.append(lostDiv);
    isGameOver=true;
}

function terminateGame()
{
    islandDiv.setAttribute("style","display:none");
    treasureCoinsDiv.setAttribute("style","display:none");
}

/*module.exports.generateTreasureCoins=generateTreasureCoins;
module.exports.generateTreasureTab=generateTreasureTab;
module.exports.generateIslandTab=generateIslandTab;
module.exports.isTreasureNotFound=isTreasureNotFound;
module.exports.minimizeTreasureCoins=minimizeTreasureCoins;
module.exports.generateClues=generateClues;
console.log(module.exports);
console.log(module.filename);*/