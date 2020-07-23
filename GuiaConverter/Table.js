module.exports = class Table {

    constructor(array){
        this.header = array[0]
        array.shift()
        this.rows = array
    }

    get RowCount(){
        return this.rows.length
    }

    get ColumnCount(){
        return this.header.length
    }
}