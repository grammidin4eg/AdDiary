<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <section>
        <v-parallax src="https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2FNight-Club-Clubbing-Jobs-Abroad2.jpg?alt=media&token=82bbda7d-5df4-430b-9217-adaf1c8485c5" height="600">
          <v-layout column align-center justify-center class="white--text">
            <h1
              class="white--text mb-2 display-1 text-xs-center"
              style="font-weight: 900; text-shadow: 3px 2px #000000"
            >{{$lang.messages.AppName}}</h1>
            <div
              class="white--text subheading mb-3 text-xs-center"
              style="font-weight: 900; text-shadow: 2px 2px #000000"
            >Unlesh your creativity without limitations</div>
            <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">Get Started</v-btn>
          </v-layout>
        </v-parallax>
      </section>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>
