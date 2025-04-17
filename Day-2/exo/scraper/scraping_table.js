// Importing the cheerio library for web scraping and the fs module for file system operations
import * as cheerio from 'cheerio';
import fs from 'fs';

// URL of the webpage to scrape
const url = "https://www.worldometers.info/world-population/population-by-country/";

// Loading the webpage content using cheerio
const $ = await cheerio.fromURL(url);

// Selecting the table element from the webpage
const table = $("table");

// Selecting all rows within the table body
const rows = table.find("tbody tr");

// Array to store the extracted country data
const countries = [];

// Keys representing the data fields to extract from each row
const keys = [
    "country",         // Country name
    "population",      // Population count
    "yearlyChange",    // Yearly population change percentage
    "netChange",       // Net population change
    "density",         // Population density
    "landArea",        // Land area in square kilometers
    "migrants",        // Number of migrants
    "fertilityRate",   // Fertility rate
    "medianAge",       // Median age of the population
    "urbanPopulation", // Urban population percentage
    "worldShare"       // Country's share of the world population
];

// Object to temporarily store data for each row
const rowData = {};

// Iterating over each row in the table
rows.each((index, row) => {
    // Extracting data for each key from the corresponding table cell
    keys.forEach((key, index) => {
        rowData[key] = $(row).find("td").eq(index + 1).text().trim();
    });

    // Adding the extracted row data to the countries array
    countries.push(rowData);

    // Writing the extracted data to a JSON file
    fs.writeFileSync("countries.json", JSON.stringify(countries, null, 2), { flag: "w" }, (err) => {
        if (err) {
            // Logging an error message if the file write operation fails
            console.error(err);
            return;
        }
        // Logging a success message if the file is written successfully
        console.log("File written successfully");
    });
});