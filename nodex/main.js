
export default function calcForm(cell, cellEl) {
    let strippedStr = cell.firstVal.split("").map(
        (ch, i) => { if (i > 0) return ch }
    ).join("")
    if (/^[^a-zA-Z]+$/.test(strippedStr)) {
        cell.newVal = calcNums(strippedStr)
        cell.dependsOn = []
        cellEl.value = cell.newVal
    } else {
        cell.dependsOn = strippedStr.split(/[-+*/]/).map((ref) => ref.toUpperCase())
        let noErrors = cell.dependsOn.every((val) =>
            (val.match(/^[0-9]+$/g)) ? true
                : (val.match(/^[A-Z]+[0-9]+$/g)
                    ? (cellVal(val) ? true : false) : false)
        )
        if (!noErrors) {
            cell.newVal = "!ERR"
            cell.dependsOn = []
        }
    }
    return cell
}
function calcNums(equation) {
    const good = (eq) => new Function('return ' + eq)()
    return good(equation)
}
const cellVal = (cellid) => valCells.find(cell => cell.id == cellid)
