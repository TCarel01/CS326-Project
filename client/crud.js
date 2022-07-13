export class crudObj {

    //(dataReader: data reader)
    constructor(dataReader) {
        this.dataReader = dataReader;
        }

    async saveTimeSheet(id, password) {
        const response = await fetch ('/createTimesheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, tracklist: this.dataReader.trackList, password: password})
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
        let url = `https://tt.chadsoft.co.uk/original-track-leaderboards.json`
        const response = await fetch(url);
        if (response.ok){
            let entries = await response.json();
            if (entries){
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

    async deleteTimesheet(id) {
        const response = await fetch('/removeTimesheet', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        });
        const data = await response.json();
        return data;
    }
}