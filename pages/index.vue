<template>
  <v-container>
    <div class="text-h5">Whatsapp #191516</div>
    <v-textarea
      class="mt-4"
      label="Starting text of the bot menu*"
      v-model="startText"
      auto-grow
    ></v-textarea>

    <div class="subtitle-1 mt-6">Command list</div>

    <v-row class="grey lighten-4 ma-2 mb-6 elevation-2" v-for="(command, i) in commands" :key="`command${i}`">
      <v-col cols="12" sm="6">
        <v-text-field label="Command*" v-model="command.command" />
      </v-col>

      <v-col cols="12" sm="6">
        <v-select label="Select command type*" v-model="command.type" :items="types" />
      </v-col>

      <v-col cols="12">
        <v-textarea
          label="Message text*"
          v-model="command.messageText"
          auto-grow
          rows='1'
        ></v-textarea>
      </v-col>

      <v-col class="d-flex justify-end">
        <v-btn text color="red" @click="deleteCommand(i)">
          <v-icon>delete</v-icon> DELETE COMMAND
        </v-btn>
      </v-col>
    </v-row>
    <div class="d-flex">
      <v-btn @click="addCommand" class="mt-6 mx-auto font-weight-bold" text>+ ADD MORE COMMAND</v-btn>
    </div>
    <div class="d-flex mt-12">
      <div style="width: fit-content" class="mx-auto">
        <v-btn class="blue darken-4 white--text" color="white">CANCEL</v-btn>
        <v-btn @click="postCommands" class="teal darken-1 ml-3 white--text" color="white">SAVE</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  methods: {
    deleteCommand(i) {
      this.commands = this.commands.filter((_, idx) => idx !== i)
    },
    addCommand(){
      this.commands.push({
        messageText: "",
        type: "Text message",
        command: null
      })
    },
    postCommands(){
      fetch('/api', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startText: this.startText,
          commands: this.commands})
      }).then(function(response) {
        console.log('asdsad')
      })
    }
  },
  data(){
    return {
      startText: "",
      types: ['Text message'],
      commands: [{
        messageText: "default message",
        type: "Text message",
        command: "1"
      }],
    }
  }
}
</script>
