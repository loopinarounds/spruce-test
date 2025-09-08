import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import Router from "koa-router";
import sqlite3 from "sqlite3";
import { open } from "sqlite"; 
import { v4 as uuidv4 } from 'uuid';

const app = new Koa();
const router = new Router();


const dbPromise = open({
  filename: "./database.db",
  driver: sqlite3.Database,
});


(async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS winners (
      uuid TEXT PRIMARY KEY,
      name_of_winner TEXT NOT NULL
    );
  `);
})();


app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(bodyParser());




router.post("/create-game", async (ctx) => {
 const { name_of_winner } = ctx.request.body as {
  name_of_winner: string
 };

  if (!name_of_winner) {
    ctx.status = 400;
    ctx.body = { error: "Winner name is required" };
    return;
  }

  const id = uuidv4();

  const db = await dbPromise;
  try {
    await db.run(
      "INSERT INTO winners (id, name_of_winner) VALUES (?, ?)",
      id,
      name_of_winner
    );
    ctx.status = 201;
    ctx.body = { message: "Winner added successfully", id };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Failed to add winner" };
  }
});

router.get("/winners", async (ctx) => {
  const db = await dbPromise;
  try {
    const winners = await db.all(`
      SELECT name_of_winner AS name, COUNT(*) AS count
      FROM winners
      GROUP BY name_of_winner
      ORDER BY count DESC;
    `);
    ctx.body = winners;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Failed to retrieve winners count" };
  }
});


app.use(router.routes()).use(router.allowedMethods());


app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});