<template>
    <div class="row">
			<div class="col-md-12">
				<div class="card">
					<DevelopResultYearInRFP_Chart :data="chartData.DevelopResultYearInRFP"/>
          <DevelopResultYearOutRFP_Chart :data="chartData.DevelopResultYearOutRFP"/>
          <SupportResultYear_Chart :data="chartData.SupportResultYear"/>
          <DeveloperResultYear_Chart :data="chartData.DeveloperResultYear"/>
				</div>
			</div>
		</div>
</template>

<script>
debugger;
export default {
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
</script>