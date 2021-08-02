$(document).ready(function(){


	const counter12 = document.querySelectorAll(".counter12");
	const counter22 = document.querySelectorAll(".counter22");
	const counter32 = document.querySelectorAll(".counter32");
	const counter42 = document.querySelectorAll(".counter42");
	
	var holdID2 = [];
	var holdTITLE2 = [];
	var holdDES2 = [];
	var holdFIGURE2 = [];

	var c12=0;
	var c22=0;
	var c32=0;
	var c42=0;



	counter12.forEach((item)=>{

		holdID2[c12++]=item.value;

	});
	counter22.forEach((item)=>{

		holdTITLE2[c22++]=item.value;

	});
	counter32.forEach((item)=>{

		holdDES2[c32++]=item.value;

	});
	counter42.forEach((item)=>{

		holdFIGURE2[c42++]=item.value;

	});

	// console.log(holdID);
	// console.log(holdTITLE);
	// console.log(holdDES);
	// console.log(holdFIGURE);
	$("#show_dashboard_title2").html(holdTITLE2[0]);
	$("#show_dashboard_des2").html(holdDES2[0]);
	$("#show_dashboard_figure2").html(holdFIGURE2[0]);

	var countForMove2 = 1;
	$("body").delegate(".move_next2","click",function(e){
	++countForMove2;
	$("#show_dashboard_title2").html(holdTITLE2[countForMove2]);
	$("#show_dashboard_des2").html(holdDES2[countForMove2]);
	$("#show_dashboard_figure2").html(holdFIGURE2[countForMove2]);

	if(countForMove2>=c12){
		countForMove2 = 0;
	}
	

	});


	$("body").delegate(".move_back2","click",function(e){
		countForMove2--;
		if(countForMove2<=0){
		 countForMove2 = 0;
	}
	$("#show_dashboard_title2").html(holdTITLE2[countForMove2]);
	$("#show_dashboard_des2").html(holdDES2[countForMove2]);
	$("#show_dashboard_figure2").html(holdFIGURE2[countForMove2]);

	});


// =========================================================



    const counter123 = document.querySelectorAll(".counter123");
	const counter223 = document.querySelectorAll(".counter223");
	const counter323 = document.querySelectorAll(".counter323");
	const counter423 = document.querySelectorAll(".counter423");
	
	var holdID23 = [];
	var holdTITLE23 = [];
	var holdDES23 = [];
	var holdFIGURE23 = [];

	var c123=0;
	var c223=0;
	var c323=0;
	var c423=0;



	counter123.forEach((item)=>{

		holdID23[c123++]=item.value;

	});
	counter223.forEach((item)=>{

		holdTITLE23[c223++]=item.value;

	});
	counter323.forEach((item)=>{

		holdDES23[c323++]=item.value;

	});
	counter423.forEach((item)=>{

		holdFIGURE23[c423++]=item.value;

	});

	// console.log(holdID);
	// console.log(holdTITLE);
	// console.log(holdDES);
	// console.log(holdFIGURE);
	$("#show_dashboard_title23").html(holdTITLE23[0]);
	$("#show_dashboard_des23").html(holdDES23[0]);
	$("#show_dashboard_figure23").html(holdFIGURE23[0]);

	var countForMove23 = 1;
	$("body").delegate(".move_next23","click",function(e){
	++countForMove23;
	$("#show_dashboard_title23").html(holdTITLE23[countForMove23]);
	$("#show_dashboard_des23").html(holdDES23[countForMove23]);
	$("#show_dashboard_figure23").html(holdFIGURE23[countForMove23]);

	if(countForMove23>=c123){
		countForMove23 = 0;
	}
	

	});


	$("body").delegate(".move_back23","click",function(e){
		countForMove23--;
		if(countForMove23<=0){
		 countForMove23 = 0;
	}
	$("#show_dashboard_title23").html(holdTITLE23[countForMove23]);
	$("#show_dashboard_des23").html(holdDES23[countForMove23]);
	$("#show_dashboard_figure23").html(holdFIGURE23[countForMove23]);

	});


	// ===================================health===================================================


	 const counter1234 = document.querySelectorAll(".counter1234");
	const counter2234 = document.querySelectorAll(".counter2234");
	const counter3234 = document.querySelectorAll(".counter3234");
	const counter4234 = document.querySelectorAll(".counter4234");
	
	var holdID234 = [];
	var holdTITLE234 = [];
	var holdDES234 = [];
	var holdFIGURE234 = [];

	var c1234=0;
	var c2234=0;
	var c3234=0;
	var c4234=0;



	counter1234.forEach((item)=>{

		holdID234[c1234++]=item.value;

	});
	counter2234.forEach((item)=>{

		holdTITLE234[c2234++]=item.value;

	});
	counter3234.forEach((item)=>{

		holdDES234[c3234++]=item.value;

	});
	counter4234.forEach((item)=>{

		holdFIGURE234[c4234++]=item.value;

	});

	// console.log(holdID);
	// console.log(holdTITLE);
	// console.log(holdDES);
	// console.log(holdFIGURE);
	$("#show_dashboard_title234").html(holdTITLE234[0]);
	$("#show_dashboard_des234").html(holdDES234[0]);
	$("#show_dashboard_figure234").html(holdFIGURE234[0]);

	var countForMove234 = 1;
	$("body").delegate(".move_next234","click",function(e){
	++countForMove234;
	$("#show_dashboard_title234").html(holdTITLE234[countForMove234]);
	$("#show_dashboard_des234").html(holdDES234[countForMove234]);
	$("#show_dashboard_figure234").html(holdFIGURE234[countForMove234]);

	if(countForMove234>=c1234){
		countForMove234 = 0;
	}
	

	});


	$("body").delegate(".move_back234","click",function(e){
		countForMove234--;
		if(countForMove234<=0){
		 countForMove234 = 0;
	}
	$("#show_dashboard_title234").html(holdTITLE234[countForMove234]);
	$("#show_dashboard_des234").html(holdDES234[countForMove234]);
	$("#show_dashboard_figure234").html(holdFIGURE234[countForMove234]);

	});



});