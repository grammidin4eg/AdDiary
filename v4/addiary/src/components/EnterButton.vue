<template>
    <div class="landing-button">
        <v-btn v-if="userName" class="blue lighten-2" dark large href="/diary">
            {{$lang.messages.gotoDiary}}
        </v-btn>
        <v-btn v-if="!userName" class="blue lighten-2" dark large href="/login">
            {{$lang.messages.gotoDiary}}
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "EnterButton",
        computed: {
            userName() {
                return this.$store.getters.userName;
            }
        }
    }
</script>

<style scoped>
    .landing-button {
        margin: auto;
        width: 197px;
    }
</style>