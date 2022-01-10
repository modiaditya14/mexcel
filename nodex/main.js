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
    }
    return cell
}
function calcNums(equation) {
    const good = (eq) => new Function('return ' + eq)()
    return good(equation)
}