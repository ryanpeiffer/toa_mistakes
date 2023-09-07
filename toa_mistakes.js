function showData() {
    const file = document.getElementById("myFile").files[0]
    const reader = new FileReader()

    reader.addEventListener(
        "load",
        () => {
            //data reading and prep
            const toa_data = JSON.parse(reader.result)
            const tracked_raids = toa_data.allRaidsMistakeManager.trackedRaids
            const toa_filtered = Object.values(toa_data.allRaidsMistakeManager.trackingInfo).filter(player => player.raidCount == tracked_raids)[0]

            const username = toa_filtered.playerName
            
            const akkha_mistakes = Object.keys(toa_filtered.mistakes)
                .filter(mistake => mistake.includes('HET_') || mistake.includes('AKKHA_'))
                .reduce((obj, key) => {obj[key] = toa_filtered.mistakes[key]; return obj}, {})
            const baba_mistakes = Object.keys(toa_filtered.mistakes)
                .filter(mistake => mistake.includes('APMEKEN_') || mistake.includes('BABA_'))
                .reduce((obj, key) => {obj[key] = toa_filtered.mistakes[key]; return obj}, {})
            const kephri_mistakes = Object.keys(toa_filtered.mistakes)
                .filter(mistake => mistake.includes('SCABARAS_') || mistake.includes('KEPHRI_'))
                .reduce((obj, key) => {obj[key] = toa_filtered.mistakes[key]; return obj}, {})
            const zebak_mistakes = Object.keys(toa_filtered.mistakes)
                .filter(mistake => mistake.includes('CRONDIS_') || mistake.includes('ZEBAK_'))
                .reduce((obj, key) => {obj[key] = toa_filtered.mistakes[key]; return obj}, {})
            const wardens_mistakes = Object.keys(toa_filtered.mistakes)
                .filter(mistake => mistake.includes('WARDENS_'))
                .reduce((obj, key) => {obj[key] = toa_filtered.mistakes[key]; return obj}, {})
            const planks = Object.keys(toa_filtered.mistakes)
                .filter(mistake => mistake.includes('DEATH_'))
                .reduce((obj, key) => {obj[key] = toa_filtered.mistakes[key]; return obj}, {})
            
            //put tables on webpage
            const table_list = [akkha_mistakes, baba_mistakes, kephri_mistakes, zebak_mistakes, wardens_mistakes, planks]
            const table_names = ['akkha_mistakes', 'baba_mistakes', 'kephri_mistakes', 'zebak_mistakes', 'wardens_mistakes', 'planks']

            for(i = 0; i < table_list.length; i++) {
                //add data rows
                var table = document.createElement("table")
                for(j = 0; j < Object.keys(table_list[i]).length; j++) {
                    var row = table.insertRow(j)
                    row.insertCell(0).innerHTML = Object.keys(table_list[i])[j]
                    row.insertCell(1).innerHTML = (Object.values(table_list[i])[j] / tracked_raids).toFixed(1)
                }
                //headers
                var header = table.createTHead()
                var headerRow = header.insertRow(0)
                headerRow.insertCell(0).outerHTML = `<th>${table_names[i]}</th>`
                headerRow.insertCell(1).outerHTML = '<th>Avg Per Raid</th>'
        
                //footer
                var footer = table.createTFoot()
                var footerRow = footer.insertRow(0)
                footerRow.insertCell(0).innerHTML = `Based on ${tracked_raids} raids tracked for ${username}`
                footerRow.cells[0].colSpan = 2
        
                //add it to the html!
                document.body.append(table)
                document.body.append(document.createElement('br'))
            }

        },
        false,
    )

    if(file) {
        reader.readAsText(file)
    }
}