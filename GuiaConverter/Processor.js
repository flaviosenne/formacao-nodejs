class Processor {

    static Process(datas){
        var a = datas.split('\r\n')
        var rows = []
        a.forEach(row => {
            var array  =row.split(',')
            rows.push(array)
        })

        return rows
    }
}

module.exports = Processor