<template>
    <div class="d-contents">
        <div class="d-flex align-center mb-3">
            <span>{{ $t (`${product.category}.name`) }}</span>
            <span class="text--disabled mx-1">/</span>
            <span class="me-2">{{ $t (`${product.category }.${ product.subCategory }`) }}</span>
            <v-divider></v-divider>
        </div>
        <v-card color="#e1ddd4" class="rounded-xl">
            <v-container class="pa-2">
                <v-row no-gutters>
                    <v-col cols="4">
                        <v-avatar size="90" rounded="xl">
                            <v-img :src="`http://api.fardacafe.ir/storage/images/jpg/${product.image}.jpg`"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col class="pt-1">
                        <div class="d-flex align-center">
                            <span class="font-weight-bold text-body-1 fardaGreen--text">{{ product.name }}</span>
                        </div>
                        <div class="mt-2 text-body-2">
                            <span class="text-caption text--secondary">محتویات:</span>
                            <v-chip v-for="(ing, j) in product.ingredients" :key="'ing-' + j"
                                color="fardaGreen darken-2" outlined class="mx-1 my-1" dark x-small>
                                {{ ing }}
                            </v-chip>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>

</template>
<script>
export default {
    props: {
        product: {
            type: Object,
            default: () => { },
        },
    },
}
</script>
<style>

</style>
