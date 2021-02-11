var totalRows;
var totalColumns;
var currentTreasureCoins;
var totalTreasureCoins;
var treasureCoinsDiv;
var islandDiv;
var cluesDiv;
var treasureRow;
var treasureColumn;

var isGameStarted=false;
var isGameOver=false;

const treasureCoinsTabText="Treasure Coins : ";
const defaultClue="Your clues appear here";
const firstElement=0;
const wrongGuessDecrementor=10;
const lookDownwards="Please Look Downwards";
const lookUpwards="Please Look Upwards";
const lookLeftwards="Please Look Leftwards";
const lookRightwards="Please Look Rightwards";
const lostGame="You lost";
const wonGame="You won";


function createGame()
{
    if(!isGameStarted)startGame();
    else gameAlreadyRunning();
}

function gameAlreadyRunning()
{
    alert("Please play the current game");
}

function startGame()
{
    var numberOfCells=document.getElementById("numberOfCells").value;
    totalRows=numberOfCells;
    totalColumns=numberOfCells;
    let gameDiv=document.createElement("div");
    gameDiv.className="game";
    generateTreasureCoins();
    generateTreasureTab();
    gameDiv.appendChild(treasureCoinsDiv);
    generateCluesTab();
    gameDiv.appendChild(cluesDiv);
    generateIslandTab();
    gameDiv.appendChild(islandDiv);
    document.body.appendChild(gameDiv);
    isGameStarted=true;
}

function generateIslandTab()
{
    islandDiv=document.createElement("div");
    var color="blue";
    for(let row=0;row<totalRows;row++)
    {
        let rowDiv=document.createElement("div");
        for(let column=0;column<totalColumns;column++)
        {
            let islandCellDiv=document.createElement("div");
            islandCellDiv.className=generateClassName(color);
            islandCellDiv.id=generateId(row,column);
            islandCellDiv.setAttribute("onclick","playGame(this)");
            color=changeIslandCellColor(color);
            rowDiv.appendChild(islandCellDiv);
        }
        rowDiv.className="island-row";
       islandDiv.appendChild(rowDiv);
    }
    islandDiv.className="island";
    
}

function generateClassName(color)
{
    if(color=="blue")return "island-cell-blue";
    return "island-cell-brown";
}

function changeIslandCellColor(color)
{
    if(color=="blue")return "brown"
    return "blue";
}

function generateTreasureTab()
{
    treasureCoinsDiv=document.createElement("div");
    treasureCoinsDiv.className="treasure-coins";
    treasureCoinsDiv.innerHTML=treasureCoinsTabText+totalTreasureCoins;
}

function generateCluesTab()
{
    cluesDiv=document.createElement("div");
    cluesDiv.className="clues";
    cluesDiv.innerHTML=defaultClue;
}

function generateTreasureCoins()
{
    currentTreasureCoins=totalRows*10;
    totalTreasureCoins=totalRows*10;
    treasureRow=Math.floor((Math.random() * totalRows));
    treasureColumn=Math.floor(Math.random()*totalColumns);
    console.log(treasureRow+" "+treasureColumn);
}

function generateId(row,column)
{
    return "cell-"+row+"-"+column;
}

function playGame(islandCell)
{
    if(!isGameOver)
    {
        checkForTreasureAndGiveClue(islandCell);
        canContinueGame();
    }

}

function checkForTreasureAndGiveClue(islandCell)
{
    islandCellId=islandCell.id;
    let splitter=islandCellId.split('-');
    let selectedRow=splitter[1];
    let selectedColumn=splitter[2];
   
    if(isTreasureNotFound(selectedRow,selectedColumn))
    {
        minimizeTreasureCoins();
        modifyClueTab(selectedRow,selectedColumn);
        makeSelectedCellNone(selectedRow,selectedColumn);
        modifyTreasureTab();
    }
    else{
        treasureFound(selectedRow,selectedColumn);
    }
    
}

function isTreasureNotFound(selectedRow,selectedColumn)
{
 return (treasureRow!=selectedRow || treasureColumn!=selectedColumn)
}

function modifyClueTab(selectedRow,selectedColumn)
{
    clueTab=document.getElementsByClassName("clues")[firstElement];
    if(selectedRow<treasureRow)
    {
        clueTab.innerHTML=lookDownwards;
    }
    else if(selectedRow>treasureRow)
    {
        clueTab.innerHTML=lookUpwards;
    }
    else
    {
        if(selectedColumn<treasureColumn)
        {
            clueTab.innerHTML=lookRightwards;
        }
        else if(selectedColumn>treasureColumn)
        {
            clueTab.innerHTML=lookLeftwards;
        }
    }
    if(!hasSafeAmountOfCoins())
    {
        clueTab.setAttribute("style","background-color:red;border: 2px solid red;");
    }
}

function minimizeTreasureCoins()
{
    
    currentTreasureCoins-=wrongGuessDecrementor;
    console.log(currentTreasureCoins);
}

function makeSelectedCellNone(selectedRow,selectedColumn)
{
    currentCell=document.getElementById(generateId(selectedRow,selectedColumn));
    currentCell.id="null-cell";
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

function treasureFound(selectedRow,selectedColumn)
{
    displayTreasureCell();
    wonDiv=document.createElement("div");
    wonDiv.className="won-game";
    wonDiv.innerHTML=wonGame;
    document.body.append(wonDiv);
    isGameOver=true;
}

function displayTreasureCell()
{
    treasureCellId=generateId(treasureRow,treasureColumn);
    treasureCell=document.getElementById(treasureCellId);
    treasureCell.className="treasure-cell";
    treasureCell.innerHTML=currentTreasureCoins;
}

function canContinueGame()
{
    console.log("Coming here");
    if(!hasEnoughCoins())
    {
        terminateGame();
    }
}

function hasEnoughCoins()
{
    return currentTreasureCoins!=0;
}

function terminateGame()
{
   displayTreasureCell();
    lostDiv=document.createElement("div");
    lostDiv.className="lost-game";
    lostDiv.innerHTML=lostGame;
    console.log("lost");
    document.body.append(lostDiv);
    isGameOver=true;
}