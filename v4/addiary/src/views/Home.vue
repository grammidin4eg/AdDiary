<template>
    <v-container>
        <div class="landing-body">
            <h1>{{$lang.messages.landingTitle}}</h1>
            <p>{{$lang.messages.landingWhy}}</p>
            <p>{{$lang.messages.landingWhy2}}</p>

            <p>{{$lang.messages.landingRegularTitle}}</p>
            <ul>
                <li>{{$lang.messages.landingRegular1}}</li>
                <li>{{$lang.messages.landingRegular2}}</li>
                <li>{{$lang.messages.landingRegular3}}</li>
                <li>{{$lang.messages.landingRegular4}}</li>
            </ul>

            <h1>{{$lang.messages.landingHowTitle}}</h1>
            <p>{{$lang.messages.landingHow}}</p>
            <p>{{$lang.messages.landingHow2}}</p>
            <p>{{$lang.messages.landingHow3}}</p>
            <EnterButton />
        </div>
        <div class="bottom-spacer"></div>
    </v-container>
</template>

<script>
    import EnterButton from '../components/EnterButton';
    export default {
        components: {
            EnterButton
        }
    };
</script>

<style scoped>
    .home-backgroung {
        background-image: url('https://firebasestorage.googleapis.com/v0/b/addiary-f4f05.appspot.com/o/bright-light-textures2.jpg?alt=media&token=6f5d2c92-848c-43cc-9674-6d8ef7bfebaa');
        background-repeat: repeat;
    }

    .bottom-spacer {
        height: 4rem;
        width: 100%;
    }

    .landing-body {
        margin: auto;
        width: 90%;
    }

    h1 {
        margin: 12px 0;
        font-size: 1.5rem;
        color: cornflowerblue;
    }
</style>
