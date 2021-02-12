var totalRows;
var totalColumns;
var currentTreasureCoins;
var totalTreasureCoins;
var treasureCoinsDiv;
var islandDiv;
var treasureRow;
var treasureColumn;


var isGameStarted=false;
var isGameOver=false;

const gameRules="Choose the island cells and get clues to find Treasure. Coins will be minimized for wrong guess. Look at right to know coins left"
const treasureCoinsTabText="Treasure Coins : ";
const defaultClue="Your clues appear here";
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
    if(!isGameStarted)startGame();
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

function startGame()
{
    var numberOfCells=document.getElementById("numberOfCells").value;
    totalRows=numberOfCells;
    totalColumns=numberOfCells;
    let gameDiv=document.createElement("div");
    gameDiv.className="game";
    generateGameRules();
    generateTreasureCoins();
    generateTreasureTab();
    gameDiv.appendChild(treasureCoinsDiv);
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
            islandCellDiv.className=generateIslandCellClassName(color);
            islandCellDiv.id=generateIdForIslandCell(row,column);
            islandCellDiv.setAttribute("onclick","playGame(this)");
            color=changeIslandCellColor(color);
            rowDiv.appendChild(islandCellDiv);
        }
        rowDiv.className="island-row";
       islandDiv.appendChild(rowDiv);
    }
    islandDiv.className="island";
    
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

function generateTreasureTab()
{
    treasureCoinsDiv=document.createElement("div");
    treasureCoinsDiv.className="treasure-coins";
    treasureCoinsDiv.innerHTML=treasureCoinsTabText+totalTreasureCoins;
}

function generateTreasureCoins()
{
    currentTreasureCoins=totalRows*10;
    totalTreasureCoins=totalRows*10;
    treasureRow=Math.floor(Math.random() * totalRows);
    treasureColumn=Math.floor(Math.random()*totalColumns);
    console.log(treasureRow+" "+treasureColumn);
}

function generateIdForIslandCell(row,column)
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
        giveClues(selectedRow,selectedColumn);
        modifyTreasureTab();
    }
    else{
        treasureFound();
        terminateGame()
    }
    
}

function isTreasureNotFound(selectedRow,selectedColumn)
{
 return (treasureRow!=selectedRow || treasureColumn!=selectedColumn);
}

function giveClues(selectedRow,selectedColumn)
{
    currentCell=document.getElementById(generateIdForIslandCell(selectedRow,selectedColumn));
    if(selectedRow<treasureRow)
    {
        currentCell.innerHTML=lookDownwards;
    }
    else if(selectedRow>treasureRow)
    {
        currentCell.innerHTML=lookUpwards;
    }
    else
    {
        if(selectedColumn<treasureColumn)
        {
            currentCell.innerHTML=lookRightwards;
        }
        else if(selectedColumn>treasureColumn)
        {
            currentCell.innerHTML=lookLeftwards;
        }
    }
    currentCell.id="null-cell";
}

function minimizeTreasureCoins()
{
    currentTreasureCoins-=wrongGuessDecrementor;
    console.log(currentTreasureCoins);
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

function treasureFound()
{
    displayTreasureCell();
    wonDiv=document.createElement("div");
    wonDiv.className="won-game";
    wonDiv.innerHTML=wonGame+" "+currentTreasureCoins+" coins";
    document.body.append(wonDiv);
    isGameOver=true;
}

function displayTreasureCell()
{
    treasureCellId=generateIdForIslandCell(treasureRow,treasureColumn);
    treasureCell=document.getElementById(treasureCellId);
    treasureCell.className="treasure-cell";
    treasureCell.innerHTML=currentTreasureCoins;
}

function canContinueGame()
{
    if(!hasEnoughCoins())
    {
        treasureNotFound();
        terminateGame();
    }
}

function hasEnoughCoins()
{
    return currentTreasureCoins!=0;
}

function treasureNotFound()
{
    displayTreasureCell();
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