<script setup lang="ts">
import { useRequestTypeStore } from '@/stores/requestTypeStore'
const route = useRoute();
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
					<TicketEdit :ticketId="route.query.id"/>
				</div>
			</div>
		</div>
</template>