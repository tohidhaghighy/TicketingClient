<script setup lang="ts">
import Searching from '~/components/chart/search/searching.vue';

definePageMeta({
  layout: 'panel'
})
</script>

<template>
    <div class="row">
			<div class="col-md-12">
				<div class="card">
					<Searching/>
				</div>
			</div>
		</div>
</template>