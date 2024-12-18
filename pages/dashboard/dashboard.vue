<template>
    <div class="row">
			<div class="col-md-12">
				<div class="card">
					<Dashboard :data="chartData"/>
				</div>
			</div>
		</div>
</template>

<script>
export default {
  components: { AmChart },
  data() {
    return {
      chartData: {},
    };
  },
  async mounted() {
    // Fetch data from backend
    const response = await fetch(`${ticketingUrl}/api/dashboard/chartdata`);
    const data = await response.json();

    // Map data for each chart
    this.chartData = {
      "DevelopResultYearInRFP": data.DevelopResultYearInRFP,
      "DevelopResultYearOutRFP": data.DevelopResultYearOutRFP,
      "SupportResultYear": data.SupportResultYear,
      "DeveloperResultYear": this.mapDeveloperData(data.DeveloperResultYear),
    };
  },
  methods: {
    mapDeveloperData(data) {
      return data.map((item) => {
        const counts = Object.entries(item.DeveloperCounts).map(([key, value]) => ({
          Month: item.Month,
          Developer: key,
          Count: value,
        }));

        const times = Object.entries(item.DeveloperTimes).map(([key, value]) => ({
          Month: item.Month,
          Developer: key,
          Time: value,
        }));

        return { ...counts, ...times };
      });
    },
  },
};

const changeRequestTypeId = useRequestTypeStore();
changeRequestTypeId.showSwitchButton(false);
const { public: { ticketingUrl }} = useRuntimeConfig();	
definePageMeta({
  layout: 'panel'
})
</script>