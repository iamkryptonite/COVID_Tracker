// var fetch = require('node-fetch');
// var Chart = require('chart.js');

var url="https://api.covid19india.org/data.json";
let label=[];
let tlabels=[];
let active=[];
let deaths=[];
let recovered=[];
let dconfirmed=[];
async function getData(){
	const response = await fetch(url);
	const data = await response.json();
    let statewise = await data.statewise;
    let casesTseries = await data.cases_time_series;
	
	statewise.forEach(element => {
        if(element["state"]!=='Total' && element["active"]>40){
            label.push(element["state"]);
            active.push(element["active"]);
            deaths.push(element["deaths"]);
            recovered.push(element["recovered"]);
        }				
    });
    casesTseries.forEach(element =>{
        if(element["dailyconfirmed"]!=0){
            if(dconfirmed.length==40){                
                dconfirmed.shift();
                tlabels.shift();
            }
            dconfirmed.push(element["dailyconfirmed"]);
            tlabels.push(element["date"]);
        }        
    })	
}
chartIt();
async function chartIt(){
    await getData();
    var ctx1 = document.getElementById('mylineChart').getContext('2d');
    var mylineChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels:tlabels,
            datasets: [{
                label: 'Daily confirmed cases',
                data: dconfirmed,
                backgroundColor: 'rgba(42, 65, 140, 1)',
                barThickness: 46,            
                borderWidth: 1,
                display: false
            }]
        }   
    });
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: 'active cases',
                data: active,
                backgroundColor: 'rgba(107, 107, 107, 1)',
                barThickness: 15, 
                borderWidth: 0.8
            },
            {
                label: 'deaths',
                data: deaths,
                backgroundColor: 'rgba(214, 2, 2, 1)',
                barThickness: 15, 
                borderWidth: 0.8
            },
            {
                label: 'recovered',
                data: recovered,
                backgroundColor: 'rgba(42, 165, 40, 1)',
                barThickness: 15, 
                borderWidth: 0.8
            }]
        },
        options: {
            scales: {
              xAxes: [{ stacked: true }],
              yAxes: [{ stacked: true }]
            }
          }   
    });
    }