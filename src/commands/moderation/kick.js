const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("ban", "moderation", []);
  }

  async run(client, message, args) {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args[1];

    if (message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry, You don't have `KICK_MEMBERS` permission.");

    if (message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry, I don't have `KICK_MEMBERS` permission.");

    if (!user) return message.channel.send("Pls mention some one");

    user.kick().then(() => {

      let embed = new MessageEmbed()
        .setAuthor(`Kicked User`, message.guild.iconURL())
        .addField("User", `${user.tag} \`(${user.id})\` `)
        .addField("Moderator", `${message.author.tag} \`(${message.author.id})\``)
        .setColor("GREEN")
        .addField("Reason", `${reason || "A Moderator not gived reason"}`)
      message.channel.send(embed)
      user.send(`Hi, you are Kicked form ${message.guild.name}\nReason: ${reason || "A Moderator not gived reason"}`)

    })
  }
};