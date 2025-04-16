import * as cheerio from 'cheerio';
import fs from 'fs';
const url = "https://www.worldometers.info/world-population/population-by-country/"

const $ = await cheerio.fromURL(url)

const table = $("table")
const rows = table.find("tbody tr")
const countries = []
const keys = [
    "country",
    "population",
    "yearlyChange",
    "netChange",
    "density",
    "landArea",
    "migrants",
    "fertilityRate",
    "medianAge",
    "urbanPopulation",
    "worldShare"
]
const rowData = {}
rows.each((index, row) => {

    keys.forEach((key, index) => {
        rowData[key] = $(row).find("td").eq(index + 1).text().trim()
    })

    countries.push(rowData)

    fs.writeFileSync("countries.json", JSON.stringify(countries, null, 2), { flag: "w" }, (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("File written successfully")
    })
}
)