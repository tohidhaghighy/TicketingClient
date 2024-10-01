export const Chartdata = {
    labels: [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند'
    ],
    datasets: [
      {
        label: 'تیکت انجام شده',
        backgroundColor: '#7EACB5',
        data: [0,0,0,0,0,0,0,0,0,0,0,0]
      },
      {
        label: 'تیکت رد شده',
        backgroundColor: '#C96868',
        data: [0,0,0,0,0,0,0,0,0,0,0,0]
      },
      {
        label: 'تیکت در حال انجام',
        backgroundColor: '#FADFA1',
        data: [0,0,0,0,0,0,0,0,0,0,0,0]
      }
    ]
  }
  
  export const options = {
    responsive: true,
    maintainAspectRatio: false
  }


  export interface ChartInfo{
    doneList:[],
    rejectList:[],
    doingList:[],
}