<template>
 <div style="text-align: center;">
    <img src="/loading-loader.gif" class="center" style="width: 200px;height: 200px;"/>
  </div>
</template>
<script setup lang="ts">

    interface BaseResponse {
      success: boolean;
      data: object;
      error: string;
    }
    const token = useRoute().params.token;
    const userid = useRoute().params.userid;
    const { public: { ssoUrl }} = useRuntimeConfig();
    const api = $fetch.create({ baseURL: ssoUrl });

    try{
            const result = await api<BaseResponse>("/Token",{
			    method:'POST',
                headers: {
                        "Content-Type":"application/json"
                },
			    body : JSON.stringify({
                    accesstoken:token,
                    userid:userid
                })
		    });
            if(result.success){
                let now = new Date();
                let time = now.getTime();
                let expireTime = time + 5_000 * 36_000;
                now.setTime(expireTime);
                localStorage.clear();
                document.cookie =
                  "UserInfo=" +
                   JSON.stringify(result.data) +
                  ";path=/" +
                  ";expires=" +
                  now.toISOString();
                  navigateTo("/")
            }else{
              console.log(result.error);
            }
            
       }catch(error){
        console.log(error);
    }
    
</script>