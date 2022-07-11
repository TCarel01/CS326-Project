import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

export class Database {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false }, 
    });

    this.client = await this.pool.connect();

    await this.init();
  }

  async init() {
    const queryText = `
    create table if not exists timesheets (
      id varchar(30) primary key,
      timesheet varchar
    );
  `;
    const res = await this.client.query(queryText);
  }

  async close() {
    this.client.release();
    await this.pool.end();
  }

  /*
    Saves the timesheet to the database
    saveTimesheet(id: string, timesheet: json): void
  */
  async saveTimesheet(id, timesheet) {
    let timesheetStr = JSON.stringify(timesheet);
    // const requestStr = 
    // 'INSERT INTO timesheets (id, timesheet) VALUES ($1, $2) RETURNING *';
    const requestStr = 'SELECT EXISTS(SELECT * from timesheets WHERE id=$1)';
    const res = await this.client.query(requestStr, [id]);
    const rows = res.rows;
    if (!rows[0].exists){
        const statement = 
        'INSERT INTO timesheets (id, timesheet) VALUES ($1, $2) RETURNING *';
        const responseObj = await this.client.query(statement, [id, timesheetStr]);
    }
  }

  /*
    Updates the timesheet associated with the player profile
    updateTimesheet(id: string, timesheet: json)
  */
 async updateTimesheet(id, timesheet) {
  let timesheetStr = JSON.stringify(timesheet);
  const requestStr = "UPDATE timesheets SET timesheet=$1 WHERE id=$2"
  const res = await this.client.query(requestStr, [timesheetStr, id]);
  const rows = res.rows;
 }
}

const database = new Database(process.env.DATABASE_URL);

export { database };
