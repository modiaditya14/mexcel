import { excel } from "./script.js"

const $ = (el) => document.querySelector(el),
    size = [20, 30],
    sgrid = $("#sgrid"),
    lets = $("#lets"),
    nums = $("#nums"),
    prevSheet = JSON.parse((localStorage.getItem("vals") || "[]")) || []
let allCells = []

sgrid.style.gridTemplateRows = `repeat(${size[1]},3ch)`
sgrid.style.gridTemplateColumns = `repeat(${size[0]},8.5ch)`
lets.style.gridTemplateColumns = `repeat(${size[0]},8.5ch)`
const alphabet = [...'abcdefghijklmnopqrstuvwxyz']
function createCell(x, y) {
    let newId = `${alphabet[x].toUpperCase()}${y + 1}`
    let cell = document.createElement("input")
    cell.classList.add("cell")
    cell.id = newId
    cell.title = newId
    prevSheet.forEach((cellObj) => {
        if (cellObj.id == cell.id)
            cell.value = cellObj.newVal || cellObj.firstVal
    })
    sgrid.appendChild(cell)
    allCells.push(cell)
}
let letr, numy
for (let y = 0; y < size[1]; y++) {
    for (let x = 0; x < size[0]; x++) {
        if (x == 0) {
            numy = document.createElement("div")
            numy.classList.add("numy")
            numy.id = y + 1
            numy.innerHTML = y + 1
            nums.appendChild(numy)
        }
        letr = document.createElement("div")
        letr.classList.add("letr")
        letr.id = alphabet[x].toUpperCase()
        letr.innerHTML = alphabet[x].toUpperCase()
        lets.appendChild(letr)

        createCell(x, y)
    }
}
excel(allCells)