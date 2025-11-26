// client.js
import { Client } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "MessageContent"
  ]
});
try {
  if (!client.isReady()) {
    client.login(process.env.token).then(() =>
      console.log("\x1b[32mDiscord bot online!\x1b[0m")
    );
  } else {
    console.log("\x1b[33mDiscord bot is already online!\x1b[0m");
  }
} catch (error) {
  console.error("\x1b[31m Error while starting bot:\x1b[0m", error);
  
}


export default client;
