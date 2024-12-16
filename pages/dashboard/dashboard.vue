<script setup lang="ts">
import { useRequestTypeStore } from '@/stores/requestTypeStore'
import Dashboard from '~/components/dashboard/dashboard.vue';
const changeRequestTypeId = useRequestTypeStore();
changeRequestTypeId.showSwitchButton(false);
definePageMeta({
  layout: 'panel'
})
</script>

<template>
    <div class="row">
			<div class="col-md-12">
				<div class="card">
					<Dashboard/>
				</div>
			</div>
		</div>
</template>