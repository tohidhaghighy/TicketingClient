<template>

<div class="navigation">
    <div class="navigation-icon-menu">
        <ul>
            <li class="active" data-toggle="tooltip" title="داشبورد">
                <a href="#navigationDashboards" title="داشبوردها">
                    <i class="icon ti-pie-chart"></i>
                    <span class="badge badge-navigatin">2</span>
                </a>
            </li>
        
        </ul>
        <ul>
            <li data-toggle="tooltip" title="خروج">
                <a class="go-to-page" @click="Logout">
                    <i class="icon ti-power-off"></i>
                </a>
            </li>
        </ul>
    </div>
    <div class="navigation-menu-body">
        <ul id="navigationDashboards" class="navigation-active">
            <li class="navigation-divider">داشبورد</li>
            <li>
                <NuxtLink class="active" to="/ticket/add">ثبت تیکت پشتیبانی <span class="badge badge-success">2</span></NuxtLink>
            </li>
            <li v-if="user.userRole==5">
                <NuxtLink class="active" to="/report/reporting">گزارش گیری<span class="badge badge-warning">2</span></NuxtLink>
            </li>
            <li v-if="user.userRole==5">
                <NuxtLink class="active" to="/search/searching">جستوجوی پیشرفته<span class="badge badge-danger">2</span></NuxtLink>
            </li>
        </ul>
    </div>
</div>
</template>

<script setup>
 var user = useCookie("UserInfo");
 const { public: { loginUrl }} = useRuntimeConfig();	
 async function Logout() {
    user.value=null;
    window.location.href = loginUrl + "/Login?key=1234";
 }
</script>
