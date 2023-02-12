<template>
    <v-dialog :value="open" fullscreen transition="dialog-bottom-transition">
        <v-card>
            <v-card-title class="text-h5 pa-2 pt-0">
                <v-text-field v-model="query" clearable label="جستجو در منو" single-line hide-details="auto"
                    color="fardaGreen" :loading="loading">
                    <template #prepend-inner>
                        <v-icon class="me-2">mdi-arrow-right</v-icon>
                    </template>
                </v-text-field>
            </v-card-title>

            <v-card-text class="px-1">
                <v-container fluid>
                    <v-row>
                        <v-col v-for="(result, i) in results" :key="`result-${i}`" cols="12" md="6" xl="4">
                            <SearchResultCard  :product="result"></SearchResultCard>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import SearchResultCard from './searchResultCard.vue';

export default {
    components: { SearchResultCard },
    props: {
        open: {
            type: Boolean,
            default: false,
        },
        results: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            loading: false,
            query: ""
        };
    },
    watch: {
        query(newValue) {
            this.$emit("search", this.query);
        }
    },
    methods: {
        closeDialog() {
            this.$emit("closeDialog");
        }
    }
}
</script>
<style>

</style>
