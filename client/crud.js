export class crudObj {

    //(dataReader: data reader)
    constructor(dataReader) {
        this.dataReader = dataReader;
        this.trackURLs = {
            'Luigi Circuit': '08/1AE1A7D894960B38E09E7494373378D87305A163/00',
            'Moo Moo Meadows': '01/90720A7D57A7C76E2347782F6BDE5D22342FB7DD/00',
            'Mushroom Gorge': '02/0E380357AFFCFD8722329994885699D9927F8276/02',
            "Toad's Factory": '04/1896AEA49617A571C66FF778D8F2ABBE9E5D7479/02',
            'Mario Circuit': '00/7752BB51EDBC4A95377C0A05B0E0DA1503786625/00',
            'Coconut Mall': '05/E4BF364CB0C5899907585D731621CA930A4EF85C/02',
            'DK Summit': '06/B02ED72E00B400647BDA6845BE387C47D251F9D1/00',
            "Wario's Gold Mine": '07/D1A453B43D6920A78565E65A4597E353B177ABD0/00',
            'Daisy Circuit': '09/72D0241C75BE4A5EBD242B9D8D89B1D6FD56BE8F/00',
            'Koopa Cape': '0F/52F01AE3AED1E0FA4C7459A648494863E83A548C/00',
            'Maple Treeway': '0B/48EBD9D64413C2B98D2B92E5EFC9B15ECD76FEE6/00',
            'Grumble Volcano': '03/ACC0883AE0CE7879C6EFBA20CFE5B5909BF7841B/02',
            'Dry Dry Ruins': '0E/38486C4F706395772BD988C1AC5FA30D27CAE098/00',
            'Moonview Highway': '0A/B13C515475D7DA207DFD5BADD886986147B906FF/00',
            "Bowser's Castle": '0C/B9821B14A89381F9C015669353CB24D7DB1BB25D/02',
            'Rainbow Road': '0D/FFE518915E5FAAA889057C8A3D3E439868574508/00',
            'GCN Peach Beach': '10/8014488A60F4428EEF52D01F8C5861CA9565E1CA/00',
            'DS Yoshi Falls': '14/8C854B087417A92425110CC71E23C944D6997806/00',
            'SNES Ghost Valley 2': '19/071D697C4DDB66D3B210F36C7BF878502E79845B/00',
            'N64 Mario Raceway': '1A/49514E8F74FEA50E77273C0297086D67E58123E8/00',
            'N64 Sherbet Land': '1B/BA9BCFB3731A6CB17DBA219A8D37EA4D52332256/00',
            'GBA Shy Guy Beach': '1F/E8ED31605CC7D6660691998F024EED6BA8B4A33F/00',
            'DS Delfino Square': '17/BC038E163D21D9A1181B60CF90B4D03EFAD9E0C5/00',
            'GCN Waluigi Stadium': '12/418099824AF6BF1CD7F8BB44F61E3A9CC3007DAE/00',
            'DS Desert Hills': '15/4EC538065FDC8ACF49674300CBDEC5B80CC05A0D/02',
            'GBA Bowser Castle 3': '1E/A4BEA41BE83D816F793F3FAD97D268F71AD99BF9/02',
            "N64 DK's Jungle Parkway": '1D/692D566B05434D8C66A55BDFF486698E0FC96095/02',
            'GCN Mario Circuit': '11/1941A29AD2E7B7BBA8A29E6440C95EF5CF76B01D/00',
            'SNES Mario Circuit 3': '18/077111B996E5C4F47D20EC29C2938504B53A8E76/00',
            'DS Peach Gardens': '16/F9A62BEF04CC8F499633E4023ACC7675A92771F0/00',
            'GCN DK Mountain': '13/B036864CF0016BE0581449EF29FB52B2E58D78A4/02',
            "N64 Bowser's Castle": '1C/15B303B288F4707E5D0AF28367C8CE51CDEAB490/02'
        }
    }

    async saveTimeSheet(id) {
        const response = await fetch ('/createTimesheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, tracklist: this.dataReader.trackList})
        });
        const data = await response.json();
        return data;
    }

    async updateTimeSheet(id) {
        const response = await fetch ('/updateTimesheet', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, tracklist: this.dataReader.trackList})
        });
        const data = await response.json();
        return data;
    }

    async readTimeSheet(id) {
        const response = await fetch ('/bestTimes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        });
        const data = await response.json();
        return data;
    }

    async getStandards() {
        const response = await fetch('/getStandards', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        let standardsAbbr = {}
        for (let entry of data) {
            standardsAbbr[entry.track] = entry.time;
        }
        const converterArr = await this.getAbbrebiations();
        let standardsList = {};
        for (let entry of converterArr) {
            standardsList[entry.fullname] = standardsAbbr[entry.abbreviation];
        }
        for (let cup in this.dataReader.trackList){
            for (let trackKey in this.dataReader.trackList[cup]){
                this.dataReader.trackList[cup][trackKey].time = standardsList[trackKey];
            }
        }
    }

    async getAbbrebiations() {
        const response = await fetch('/getConversions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    }

    async getWRTimes() {
        let returnJSON = {};
        for (let key in this.trackURLs) {
            let url = `https://tt.chadsoft.co.uk/original-track-leaderboards.json`
            const response = await fetch(url);
            if (response.ok){
                let entries = await response.json();
                for (let key in entries.leaderboards) {
                    if (!entries.leaderboards[key].categoryId || entries.leaderboards[key].categoryId === 2 || entries.leaderboards[key].categoryId === 0) {
                        returnJSON[entries.leaderboards[key].name] = entries.leaderboards[key].fastestTimeSimple.substring(1);
                    }
                }
            }
        }
        for (let cup in this.dataReader.trackList) {
            for (let track in this.dataReader.trackList[cup]) {
                this.dataReader.trackList[cup][track].time = returnJSON[track];
            }
        }
    }
}