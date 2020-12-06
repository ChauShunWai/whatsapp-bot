const express = require('express')
const mongoose = require('mongoose');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();
const app = express()
app.use(express.json())

const commandSchema = new mongoose.Schema({
    startText: String,
    commands: [],
    date: Date
});

const Command = mongoose.model('Command', commandSchema);

app.post('/', async (req, res) => {
    try {
        await Command.create({...req.body, date: Date.now()})
        console.log('saved')
    } catch (error) {
        console.log(error)
    }
})

mongoose.connect(
    'INSERT MONGO ATLAS',
    {useNewUrlParser: true, useUnifiedTopology: true}
)

client.on('qr', (qr) => {
  qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
  const res = await Command.find().sort({date: -1}).limit(1)
  const {commands, startText} = res[0]
  if (msg.body == '#') {
    msg.reply(startText);
  }
  const command = commands.find(command => command.command === msg.body)
  if (command) {
    msg.reply(command.messageText);
  }
});

client.initialize();

module.exports = app