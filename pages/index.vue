

<template>
    <Report />
    <div class="colors">
		<!-- To use theme colors with Javascript -->
		<div class="bg-primary"></div>
		<div class="bg-primary-bright"></div>
		<div class="bg-secondary"></div>
		<div class="bg-secondary-bright"></div>
		<div class="bg-info"></div>
		<div class="bg-info-bright"></div>
		<div class="bg-success"></div>
		<div class="bg-success-bright"></div>
		<div class="bg-danger"></div>
		<div class="bg-danger-bright"></div>
		<div class="bg-warning"></div>
		<div class="bg-warning-bright"></div>
	</div>
</template>

<script setup lang="ts">
import { useRequestTypeStore } from '@/stores/requestTypeStore'
const changeRequestTypeId = useRequestTypeStore();
changeRequestTypeId.showSwitchButton(true);
definePageMeta({
  layout: 'panel'
});

</script>