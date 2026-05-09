// import dns from "dns";
import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    try {
        // if (process.env.NODE_ENV !== "production") dns.setServers(["8.8.8.8", "8.8.4.4"]);
        
        await mongoose.connect(process.env.DB as string);
        app.listen(5000, () => {
            console.log(`Example app listening on port 5000`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();