<template>
    <v-container fluid class="pa-0 h-100 fardaGreen-gr">
       <v-img src="/startup/7.jpg" position="center" class="h-100">
        <v-container class="h-100">
            <v-row align="end" justify="center" class="h-100">
                <v-col cols="12" md="6">
                   <h3 class="text-h3 font-weight-bold text-center mb-4 fardaGreenish">کافه فردا</h3>
                   <p class="fardaGreenish text-center mb-8">زندگی بعد از قهوه آغاز می‌شود</p>
                   <v-btn color="#00522e" rounded dark block x-large to="/startup/profileBuilder">شروع کنید!</v-btn>
                </v-col>
            </v-row>
        </v-container>
       </v-img>
    </v-container>
</template>
<script>
export default {
    layout: 'startup',
    transition: 'slide'
}
</script>
<style>
    
</style>