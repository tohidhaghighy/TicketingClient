<template>
<div class="header">

<!-- begin::header logo -->
<div class="header-logo">
    <a href="/">
        <img class="large-logo" src="/files/media/image/logo.png" alt="سامانه تیکتینگ ویرا">
        <img class="small-logo" src="/files/media/image/logo.png" alt="سامانه تیکتینگ ویرا">
        <img class="dark-logo" src="/files/media/image/logo.png" alt="سامانه تیکتینگ ویرا">
    </a>
</div>
<!-- end::header logo -->

<!-- begin::header body -->
<div class="header-body">

    <div class="header-body-left">

        <h3 class="page-title">داشبورد پشتیبانی {{user.username}}</h3>

        <!-- begin::breadcrumb -->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><NuxtLink to="/">داشبورد</NuxtLink></li>
                <li class="breadcrumb-item active" aria-current="page">داشبورد پشتیبانی</li>
            </ol>
        </nav>
        <!-- end::breadcrumb -->

    </div>

    <div class="header-body-right">
        <!-- begin::navbar main body -->
        <ul class="navbar-nav">
            <li class="nav-item">
            </li>
            <li class="nav-item dropdown">
                <label class="switch">
                    <input type="checkbox" :checked="isChecked" @change="updateChange">
                    <span class="slider round"></span>
                </label>
            </li>
            <li class="nav-item dropdown">
                <a href="/ticket/add" class="nav-link" data-toggle="tooltip" title="ثبت تیکت جدید">
                    <i class="ti-plus"></i>
                </a>
            </li>
            <li class="nav-item dropdown">
                <a href="#" class="nav-link bg-none">
                    <div>
                        <figure class="avatar avatar-state-success avatar-sm">
                            <img src="/files/media/image/logo.png" class="rounded-circle" alt="تصویر کاربر">
                        </figure>
                    </div>
                </a>
            </li>
        </ul>
        <!-- end::navbar main body -->

        <div class="d-flex align-items-center">
            <!-- begin::navbar navigation toggler -->
            <div class="d-xl-none d-lg-none d-sm-block navigation-toggler">
                <a href="#">
                    <i class="ti-menu"></i>
                </a>
            </div>
            <!-- end::navbar navigation toggler -->

            <!-- begin::navbar toggler -->
            <div class="d-xl-none d-lg-none d-sm-block navbar-toggler">
                <a href="#">
                    <i class="ti-arrow-down"></i>
                </a>
            </div>
            <!-- end::navbar toggler -->
        </div>
    </div>

</div>
<!-- end::header body -->

</div>
</template>

<script setup>
    import { useRequestTypeStore } from '@/stores/requestTypeStore'
    const changeRequestTypeId = useRequestTypeStore();
    const isChecked = ref(false);

    const updateChange = (event) =>{
        changeRequestTypeId.requestTypeId=event.target.checked;
    }
   
    
    var user = useCookie("UserInfo");
    const { public: { loginUrl }} = useRuntimeConfig();	
    if(user.value==null){
        window.location.href = loginUrl + "/Login?key=1234";
    }
</script>