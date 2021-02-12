
const { expect, test } = require('@jest/globals');
const app=require('./app');

test("Checks function that generates treasure coins and treasure coins tab",() =>
{
    let actual=app.generateTreasureCoins(4,4);
    let expected=40;
    expect(actual).toBe(expected);
    actual=app.generateTreasureCoins(5,5);
    expected=50;
    expect(actual).toBe(expected);
});

test("Checks function that generate treasure coins tab",()=>
{
    let actual=app.generateTreasureTab(30).className;
    let expected="treasure-coins"
    expect(actual).toBe(expected);
});

test("Checks function that generates island tab",()=>
{
    let actual=app.generateIslandTab(3,3).className;
    let expected="island"
    expect(actual).toBe(expected);
});

test("Checks function that checks if treasure is found",()=>
{
    let actual=app.isTreasureNotFound(2,2,3,2);
    let expected=true;
    expect(actual).toBe(expected);
    actual=app.isTreasureNotFound(2,3,2,3);
    expected=false;
    expect(actual).toBe(expected);
});

test("Checks function that minimizes treasure coins",()=>
{
    let actual=app.minimizeTreasureCoins(20);
    let expected=10;
    expect(actual).toBe(expected);
});


