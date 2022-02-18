<template>
  <v-dialog
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    :value="open"
  >
    <v-card color="grey lighten-3">
      <v-form ref="avatarForm" @submit.prevent="saveAvatar">
        <v-toolbar dark color="brown">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>ساخت آواتار</v-toolbar-title>
        </v-toolbar>
        <v-card-title class="justify-center">
          <v-avatar color="brown" size="150px" class="mb-4">
            <v-img v-if="newAvatar" :src="newAvatar"></v-img>
            <v-icon v-else dark size="128"> mdi-account-circle </v-icon>
          </v-avatar>
        </v-card-title>
        <v-card-text>
          <div class="text-center">
            <v-select
              v-model="form.top"
              rounded
              :items="top"
              label="مدل مو"
              solo
            >
              <template #selection="{ item }">
                {{ $t(`avatarOptions.top.${item}`) }}
              </template>
              <template #item="{ item }">
                {{ $t(`avatarOptions.top.${item}`) }}
              </template>
            </v-select>
            <v-select
              v-model="form.hairColor"
              rounded
              :items="hairColor"
              label="رنگ مو"
              solo
            >
              <template #selection="{ item }">
                {{ $t(`avatarOptions.hairColor.${item}`) }}
              </template>
              <template #item="{ item }">
                {{ $t(`avatarOptions.hairColor.${item}`) }}
              </template>
            </v-select>
            <v-select
              v-model="form.accessories"
              rounded
              :items="accessories"
              label="عینک"
              solo
            >
              <template #selection="{ item }">
                {{ $t(`avatarOptions.accessories.${item}`) }}
              </template>
              <template #item="{ item }">
                {{ $t(`avatarOptions.accessories.${item}`) }}
              </template>
            </v-select>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            color="brown darken-2"
            dark
            x-large
            rounded
            type="submit"
          >
            <span class="text-h5 font-weight-bold"> آواتار منو بساز! </span>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      top: [
        'NoHair',
        'Eyepatch',
        'Hat',
        'Hijab',
        'Turban',
        'WinterHat1',
        'WinterHat2',
        'WinterHat3',
        'WinterHat4',
        'LongHairBigHair',
        'LongHairBob',
        'LongHairBun',
        'LongHairCurly',
        'LongHairCurvy',
        'LongHairDreads',
        'LongHairFrida',
        'LongHairFro',
        'LongHairFroBand',
        'LongHairNotTooLong',
        'LongHairShavedSides',
        'LongHairMiaWallace',
        'LongHairStraight',
        'LongHairStraight2',
        'LongHairStraightStrand',
        'ShortHairDreads01',
        'ShortHairDreads02',
        'ShortHairFrizzle',
        'ShortHairShaggyMullet',
        'ShortHairShortCurly',
        'ShortHairShortFlat',
        'ShortHairShortRound',
        'ShortHairShortWaved',
        'ShortHairSides',
        'ShortHairTheCaesar',
        'ShortHairTheCaesarSidePart',
      ],
      accessories: [
        'Blank',
        'Kurt',
        'Prescription01',
        'Prescription02',
        'Round',
        'Sunglasses',
        'Wayfarers',
      ],
      hairColor: [
        'Auburn',
        'Black',
        'Blonde',
        'BlondeGolden',
        'Brown',
        'BrownDark',
        'PastelPink',
        'Platinum',
        'Red',
        'SilverGray',
      ],
      form: {
        top: '',
        accessories: '',
        hairColor: '',
      },
    }
  },
  computed: {
    newAvatar() {
      return `https://avataaars.io/?accessoriesType=${this.form.accessories}&avatarStyle=Transparent&hairColor=${this.form.hairColor}&topType=${this.form.top}`
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    saveAvatar() {
      this.$emit('saveAvatar', this.newAvatar)
      this.$emit('close')
    },
  },
}
</script>

<style></style>
