const TARGET = "LOCAL" // LOCAL or PRO

const DB = {
    database: "edge_femiga",
    username: "root",
    pwd: TARGET === "PRO" ? "<doesnt work yet>" : "MySQL@1538",
    host: TARGET === "PRO" ? "<doesnt work yet>" : "127.0.0.1",
    port: 3306,
    dialect: "mysql",
};
const server ={
    PORT:3000
}
const forceSync = false;
export default { DB,TARGET,server,forceSync };