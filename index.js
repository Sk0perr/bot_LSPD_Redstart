const { Client, Intents, NewsChannel } = require('discord.js');
const { token, prefix, } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
let channel_id;
let categorie = 'here'; // mettre l'id de la catégorie ou se trrouve le channel vocal
let channel_dispatch_ecrit = 'here'; // id channel écrit ou doit être écrit la commande 
let channel_dispatch_vocal = 'here'; // id channel vocal où doit etre tout les utilisateur mentionné dans le message
var temporaryChannels = [];
const welcome = "here"; // id channel discord channel bienvenue


function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setStatus('CENTRAL');
	client.user.setActivity("Redstart RP", { type: "PLAYING" });
});



client.on("messageCreate", async message => {

	const withoutPrefix = message.content.slice(prefix.length);
	const split = withoutPrefix.split(/ +/);
	const command = split[0];
	const args = split.slice(1);

	if (message.channel.id === welcome) {
		message.author.createDM().then(channel => {
			return channel.send(
				"Bienvenue sur le discord LSPD  !\r\
			 Merci de venir dans le channel <En Attente> pour continuer la suite de votre recrutement \n \
			 En attendant nous vous recommandons de lire : \n \
			 Le Règlement générale: http://wiki.redstartrp.fr \n \ "
			);
		}).catch(console.error);
	}

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	if (command === 'central') {
		if (message.channel.id === channel_dispatch_ecrit) {

			if (message.mentions.members.first()) {
				const new_channel = await message.guild.channels
					.create(args[0],
						{
							type: 'GUILD_VOICE',
						})
					.then((new_channel) => {
						channel_id = new_channel.id
						new_channel.setParent(categorie)
						new_channel.setUserLimit(4)
					});
				temporaryChannels.push(channel_id);
			}
			if (args[1]) {
				var member1 = message.channel.guild.members.cache.find(member => member.user == getUserFromMention(args[1]));
				if (member1) {
					member1.voice.setChannel(channel_id).then(() => console.log(`réussi`))
						.catch((error) => console.log("pas co"));
				}
				else {
					message.reply(args[1] + " : N'est pas un agent");
				}

			}
			if (args[2]) {

				var member2 = message.channel.guild.members.cache.find(member => member.user == getUserFromMention(args[2]));
				if (member2) {
					member2.voice.setChannel(channel_id).then(() => console.log(`réussi`))
						.catch((error) => console.log("pas co"));
				}
				else {
					message.reply(args[2] + " : N'est pas un agent");
				}

			}
			if (args[3]) {

				var member3 = message.channel.guild.members.cache.find(member => member.user == getUserFromMention(args[3]));
				if (member3) {
					member3.voice.setChannel(channel_id).then(() => console.log(`réussi`))
						.catch((error) => console.log("pas co"));
				}
				else {
					message.reply(args[3] + " : N'est pas un agent");
				}

			}

			if (args[4]) {

				var member4 = message.channel.guild.members.cache.find(member => member.user == getUserFromMention(args[4]));
				if (member4) {
					member4.voice.setChannel(channel_id).then(() => console.log(`réussi`))
						.catch((error) => console.log("pas co"));
				}
				else {
					message.reply(args[4] + " : N'est pas un agent");
				}

			}

		} else { message.reply("Ca se passe dans ==> <#" + channel_dispatch_ecrit + ">"); }

	}

});

client.on('voiceStateUpdate', async (oldVoiceState, newVoiceState) => {

	let ancien = oldVoiceState.channel.id;
	if (!oldVoiceState.channel.members.size) {
		for (let i = 0; i <= temporaryChannels.length; i++) {
			if (ancien === temporaryChannels[i]) {
				oldVoiceState.channel.delete();
				delete temporaryChannels[i];
			}
		}
	}

});

client.on('guildMemberAdd', async newMember => {

});

client.login(token);
