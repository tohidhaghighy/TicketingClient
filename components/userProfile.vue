<template>

<div class="sidebar" id="userProfile">
    <div class="text-center p-4">
        <figure class="avatar avatar-state-success avatar-lg mb-4">
            <img src="/files/media/image/logo.png" class="rounded-circle" alt="image">
        </figure>
        <h4 class="text-primary m-b-10"> {{user.username}} </h4>
        
    </div>
    <hr class="m-0">
</div>
</template>
<script setup lang="ts">
interface UserInfo{
		userId:number,
        name:string,
        family:string,
        username:string,
        mobile:string,
        userRole:number
	}
	
	var user = useCookie<UserInfo>("UserInfo");
</script>
