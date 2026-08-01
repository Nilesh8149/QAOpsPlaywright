const ExcelJs = require('exceljs');
const { test, expect } = require("@playwright/test");

async function writeExcel(searchText, replaceText, change, filePath) {


    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    //scenario is to replace banana by Kajal
    const ACell = worksheet.getCell(output.row, output.column + change.columnChange);
    ACell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            //console.log(cell.value)

            if (cell.value === searchText) {
                // console.log(rowNumber);   //Scenario is to get row and column number of Apple
                // console.log(colNumber);

                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    });
    return output;
}


test('upload download excel validation', async ({ page }) => {

    const searchText='Papaya';
    const updatedValue='786';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
     const downloadPromise= page.waitForEvent("download");
    await page.getByRole("button", { name: "Download" }).click();
    await downloadPromise;
    writeExcel(searchText, updatedValue, { rowChange: 0, columnChange: 2 }, "C:/Users/Admin/Downloads/download.xlsx");

    // await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/Admin/Downloads/download.xlsx")

     const textLocator=await page.getByText(searchText);
     const desiredrow=await page.getByRole("row").filter({has:textLocator});
    await  expect(desiredrow.locator("#cell-4-undefined")).toContainText(updatedValue);



});
