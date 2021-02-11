var totalRows;
var totalColumns;
var currentTreasureCoins;
var totalTreasureCoins;
var treasureCoinsDiv;
var islandDiv;
var cluesDiv;
var treasureRow;
var treasureColumn;

const treasureCoinsTabText="Treasure Coins : ";
const defaultClue="Your clues appear here";
const firstElement=0;
const wrongGuessDecrementor=10;
const lookDownwards="Please Look Downwards";
const lookUpwards="Please Look Upwards";
const lookLeftwards="Please Look Leftwards";
const lookRightwards="Please Look Rightwards";
const treasureFound="Treasure found";

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
            islandCellDiv.setAttribute("onclick","checkForTreasureAndGiveClue(this)");
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

function checkForTreasureAndGiveClue(islandCell)
{
    islandCellId=islandCell.id;
    let splitter=islandCellId.split('-');
    let selectedRow=splitter[1];
    let selectedColumn=splitter[2];
    modifyClueTab(selectedRow,selectedColumn);
    if(isTreasureNotFound(selectedRow,selectedColumn))
    {
    minimizeTreasureCoins();
    makeSelectedCellNone(selectedRow,selectedColumn);
    }
    modifyTreasureTab();
}

function isTreasureNotFound(selectedRow,selectedColumn)
{
 return (treasureRow!=selectedRow || treasureColumn!=selectedColumn)
}

function modifyClueTab(selectedRow,selectedColumn)
{
    clue=document.getElementsByClassName("clues")[firstElement];
    if(selectedRow<treasureRow)
    {
        clue.innerHTML=lookDownwards;
    }
    else if(selectedRow>treasureRow)
    {
        clue.innerHTML=lookUpwards;
    }
    else
    {
        if(selectedColumn<treasureColumn)
        {
            clue.innerHTML=lookRightwards;
        }
        else if(selectedColumn>treasureColumn)
        {
            clue.innerHTML=lookLeftwards;
        }
        else
        {
            clue.innerHTML=treasureFound;
            return;
        } 
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
    currentCell.innerHTML="None";
}

function modifyTreasureTab()
{
    treasureTab=document.getElementsByClassName("treasure-coins")[firstElement];
    treasureTab.innerHTML=treasureCoinsTabText+currentTreasureCoins;
}