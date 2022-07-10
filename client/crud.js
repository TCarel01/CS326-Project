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
}