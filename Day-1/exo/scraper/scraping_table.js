import * as cheerio from 'cheerio';
import fs from 'fs';
const url = "https://www.worldometers.info/world-population/population-by-country/"

const $ = await cheerio.fromURL(url)

const table = $("table")
const rows = table.find("tbody tr")
const countries = []

rows.each((index ,row) => {
    const country = $(row).find("td").eq(1).text().trim()
    const population = $(row).find("td").eq(2).text().trim()
    const yearlyChange = $(row).find("td").eq(3).text().trim()
    const netChange = $(row).find("td").eq(4).text().trim()
    const density = $(row).find("td").eq(5).text().trim()
    const landArea = $(row).find("td").eq(6).text().trim()
    const migrants = $(row).find("td").eq(7).text().trim()
    const fertilityRate = $(row).find("td").eq(8).text().trim()
    const medianAge = $(row).find("td").eq(9).text().trim()
    const urbanPopulation = $(row).find("td").eq(10).text().trim()
    const worldShare = $(row).find("td").eq(11).text().trim()
    countries.push({ country, population, yearlyChange, netChange, density, landArea, migrants, fertilityRate, medianAge, urbanPopulation, worldShare })
    fs.writeFileSync("countries.json", JSON.stringify(countries, null, 2), { flag: "w" },(err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("File written successfully")
    })
}
)