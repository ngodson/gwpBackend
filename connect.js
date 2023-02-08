import mysql, { createConnection } from "mysql"
// import * as dotenv from "dotenv"
// dotenv.config()

export const db = createConnection({
    host:"gwp1.c4cp5bpc2qd2.us-east-1.rds.amazonaws.com",
    user:"admin",
    password: "password",
    PORT:3306,
    database:"gwpDB"
})

