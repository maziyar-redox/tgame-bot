import { createBot, filters, Keyboard, ButtonStyle } from "@puregram/serverless";
import { markup, format, bold, italic, code } from "@puregram/markup"

/* Creating a bot instance from serverless util */
const tg = createBot()
	.extend(markup());

/* Defining admin id */
const ADMIN_ID: number = 5177930726;

/* Authentication middleware */
tg.use(filters.chat.private, async (update, next) => {
	if (update.chat.id !== ADMIN_ID) {
		return await tg.send(update.chat.id, "دسترسی به این ربات درحال حاضر محدود میباشد");
	};
	return await next();
});

tg.command(
	"start", 
	async (message) => {
		const startKeyboardStyle = Keyboard.keyboard([
			[
				Keyboard.textButton("کانال فعلی🗣", {
					style: ButtonStyle.Primary
				}),
				Keyboard.textButton("ست کردن کانال🧞‍♂️", {
					style: ButtonStyle.Primary
				}),
			],
			[
				Keyboard.textButton("اطلاعات من🙍‍♂️", {
					style: ButtonStyle.Primary
				}),
				Keyboard.textButton("اطلاعات کاربر🥷", {
					style: ButtonStyle.Primary
				}),
			],
		])
			.resize(true)
			.oneTime(false)
			.selective(true)
			.persistent(false)
			.forceReply(true);
		
		return await message.send("به ناحیه مدیریت ربات فروشگاه تی گیم خوش آمدید.", {
			reply_markup: startKeyboardStyle,
			reply_parameters: {
				message_id: message.id
			},
		});
	}
);

tg.onMessage(
	filters.text("اطلاعات من🙍‍♂️"),
	async (message) => {
		return await message.send(
			format` ▪️ ${bold("ID")}: ${code(`${message.from.id}`)}\n ▪️ ${bold("First Name")}: ${bold(`${message.from.firstName}`)}\n ▪️ ${bold("Language")}: ${bold(`${message.from.langugeCode}`)}`
		);
	}
);

export default tg;