import { createBot } from "@puregram/serverless";

const tg = createBot();

tg.onMessage(async (message) => {
    await message.send(`you said: ${message.text ?? '(no text)'}`)
});

tg.onCallbackQuery(async (query) => {
    await query.answer({ text: "got it!" })
});

export default tg;