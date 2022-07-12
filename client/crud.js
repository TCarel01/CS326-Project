export class crudObj {

    //(dataReader: data reader)
    constructor(dataReader) {
        this.dataReader = dataReader;
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
        return data;
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
}