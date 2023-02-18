<template>
    <div class="d-contents mb-4">
        <!-- <div class="d-flex align-center mb-3">
            <span>{{ $t (`${product.category}.name`) }}</span>
            <span class="text--disabled mx-1">/</span>
            <span class="me-2">{{ $t (`${product.category }.${ product.subCategory }`) }}</span>
            <v-divider></v-divider>
        </div> -->
        <v-card color="#e1ddd4" class="rounded-xl">
            <v-container class="pa-2">
                <v-row no-gutters>
                    <v-col cols="4">
                        <v-avatar size="90" rounded="xl">
                            <v-img :src="`http://api.fardacafe.ir/storage/images/jpg/${product.image}.jpg`"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col cols="8" class="pt-1">
                        <div class="d-flex align-center">
                            <span class="font-weight-bold text-body-1 fardaGreen--text">{{ product.name }}</span>
                            <v-spacer></v-spacer>
                            <p class="text-body-1 mb-0 d-flex">
                                <span class="fardaGreen--text price faNum me-1">{{ product.price }}</span>
                                <span class="fardaGreen--text price-unit faNum">هــزار تومان</span>
                            </p>
                        </div>
                        <div class="mt-2">
                            <span class="text-caption text-body-2 text--secondary me-1">محتویات:</span>
                            <span v-for="(ing, j) in product.ingredients" :key="'ing-' + j"
                                :class="ing.includes(query) ? 'includes-query' : ''" class="text-caption me-1">
                                {{ ing }}
                            </span>
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
        query: {
            type: String,
            default: ''
        }
    },
}
</script>
<style>
.includes-query {
    font-weight: bold;
}
</style>
