import calcForm from "./main.js"

const valCells = []

function excel(allCells) {
    allCells.forEach((cell) => {
        cell.addEventListener("click", () => {
            valCells.forEach((cellObj) => {
                if (cellObj.id == cell.id) cell.value = cellObj.firstVal || ""
            })
        })
        cell.addEventListener("focusout", () => {
            if (cell.value === "") return blankCell(cell)
            if (valCells.some((cellObj) => cellObj.id == cell.id)) {
                for (const cellObj of valCells) {
                    if (cellObj.id == cell.id) valCells[valCells.indexOf(cellObj)] = getCell(cell)
                    window.valCells = valCells
                    localStorage.setItem("vals", JSON.stringify(valCells))
                }
            }
            else {
                valCells.push(getCell(cell))
                localStorage.setItem("vals", JSON.stringify(valCells))
            }
        })
    })
}

function blankCell(cell) {
    if (!(valCells.some((cellObj) => cellObj.id == cell.id))) return true
    valCells.splice(valCells.indexOf(getCell(cell)), 1)
    window.valCells = valCells
    localStorage.setItem("vals", JSON.stringify(valCells))
}
function getCell(cell) {
    let newObj = { id: cell.id, firstVal: cell.value }
    newObj.isEquation = isEquation(newObj, cell)
    return newObj
}
const isEquation = (cell, cellEl) => {
    if (cell.firstVal.split("")[0] == "=") {
        cell = calcForm(cell, cellEl)
        return true
    } else {
        cell.dependsOn = []
        cell.newVal = cell.firstVal
        return false
    }
}
export { excel }