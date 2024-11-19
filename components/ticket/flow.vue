<template>
    <div class="col-md-12">
        <div class="card-body" style="padding-top: 0%;">
            <table id="flowResult" class="table table-striped table-bordered" width="100%">
                <thead>
                    <tr>
                        <th>شماره ردیف تیکت</th>
			            <th>کاربر</th>
			            <th>وضعیت</th>
			            <th>زمان</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</template>

<script setup>

    const { public: { ticketingUrl }} = useRuntimeConfig();
    const flowResult = reactive([]);
    const props = defineProps(['ticketId'])

    onMounted(() => {
        dtatTable();
    })
    
    async function dtatTable() 
    {
        try {
            const { data, error: fetchError } = await useFetch
            (
                `${ticketingUrl}/api/v1/getWorkFlow?ticketId=${props.ticketId}`       
            );
            if (!fetchError.value) //fetchError.value == null or empty
            {
                flowResult.value = data.value;
                // Destroy existing DataTable instance
                $('#flowResult').DataTable().destroy();
                // Reinitialize DataTable with updated data
                $('#flowResult').DataTable({
                data: flowResult.value,
                responsive: true,
                pageLength: 100,
                order: [[0, 'desc']],
                columns: [
                    { data: 'flowId'},
                    { data: 'userId' ,
                    render: (data) => {
                        const developers = {
                        1: 'superuser',
                        2: 'admintaz',
                        3: 'adminvira',
                        4: 'admincms',
                        5: 'admin135',
                        6: 'adminemha',
                        7: 'admintabadol',
                        8: 'Ebrahimi',
                        11: 'ارغوان سرتیپ زاده',
                        14: 'mrnadaf',
                        18: 'mahmodkhani',
                        19: 'davoudi',
                        20: 'raeeisi',
                        21: 'naghibi',
                        22: 'ameneh',
                        23: 'adminbi',
                        24: 'admininfra'
                        };
                        return developers[data] || '';
                        }
                    },
                    { data: 'statusId',
                      render: (data, type, row) => {
                        let statusClass = '';
                        let statusText = '';
                        switch (data) 
                        {
                        case 1:
                            statusClass = 'text-done';
                            statusText = row.status;
                            break;
                        case 2:
                        case 3:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            statusClass = 'text-inserted';
                            statusText = row.status;
                            break;
                        case 4:
                            statusClass = 'text-danger';
                            statusText = row.status;
                            break;
                        case 9:
                            statusClass = 'text-awaitingConfirmation';
                            statusText = row.status;
                            break;
                        }
                        return `<a class="${statusClass}">${statusText}</a>`;
                        }
                    },
                    { data: 'insertedDate' },
                ],
                language: {
                    sEmptyTable: "هیچ داده ای در جدول وجود ندارد",
                    sInfo: "نمایش _START_ تا _END_ از _TOTAL_ رکورد",
                    sInfoEmpty: "نمایش 0 تا 0 از 0 رکورد",
                    sInfoFiltered: "(فیلتر شده از _MAX_ رکورد)",
                    sLoadingRecords: "در حال بارگزاری...",
                    sProcessing: "در حال پردازش...",
                    sSearch: "جستجو:",
                    sZeroRecords: "رکوردی با این مشخصات پیدا نشد",
                    oPaginate: {
                      sFirst: "ابتدا",
                      sLast: "انتها",
                      sNext: "بعدی",
                      sPrevious: "قبلی",
                    },
                },
                });
            } 
            else 
            {
                console.error("Fetch error:", fetchError.value);
                error.value = fetchError.value;
            }
        } 
        catch (err) {
            console.error("An unexpected error occurred:", err);
        }
    }

</script>