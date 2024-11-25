<script setup lang="ts">
import { useRequestTypeStore } from '@/stores/requestTypeStore'
const changeRequestTypeId = useRequestTypeStore();
changeRequestTypeId.isShowButton=false;
definePageMeta({
  layout: 'panel'
})
</script>

<template>
    <div class="row">
			<div class="col-md-12">
				<div class="card">
					<ChartSearchSearching/>
				</div>
			</div>
		</div>
</template>