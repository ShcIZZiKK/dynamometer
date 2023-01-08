<template>
  <div class="dynamo-meter-scores">
    <ul class="dynamo-meter-scores__list" v-if="prizes.length">
      <li
        class="dynamo-meter-scores__list-item"
        v-for="prize in prizes"
        :key="prize.id"
      >
        <span class="dynamo-meter-scores__list-item-image">
          <img
            :src="require(`@/assets/images/prizes/${prize.image}.png`)"
            :alt="prize.name"
          />
        </span>
        <span class="dynamo-meter-scores__list-item-count">
          {{ prize.count }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useDynamoMeterStore } from "@/stores";

export default defineComponent({
  name: "DynamoMeterScores",

  setup() {
    const dynamoMeterStore = useDynamoMeterStore();
    const prizes = computed(() => {
      return dynamoMeterStore.getAllPrizes;
    });

    return {
      prizes,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "DynamoMeterScores";
</style>
