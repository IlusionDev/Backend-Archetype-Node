import {createConnection, Connection, getConnection} from "typeorm";



export default async function getConnectionOrCreate(): Promise<Connection> {
    const connection: Connection = await createConnection();

    return connection;
}

export function getManager() {
    return getConnection().manager;
}