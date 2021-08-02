$(document).ready(function(){

// ============================================start dashbaord======================================================

	const counter1 = document.querySelectorAll(".counter1");
	const counter2 = document.querySelectorAll(".counter2");
	const counter3 = document.querySelectorAll(".counter3");
	const counter4 = document.querySelectorAll(".counter4");
	
	var holdID = [];
	var holdTITLE = [];
	var holdDES = [];
	var holdFIGURE = [];

	var c1=0;
	var c2=0;
	var c3=0;
	var c4=0;



	counter1.forEach((item)=>{

		holdID[c1++]=item.value;

	});
	counter2.forEach((item)=>{

		holdTITLE[c2++]=item.value;

	});
	counter3.forEach((item)=>{

		holdDES[c3++]=item.value;

	});
	counter4.forEach((item)=>{

		holdFIGURE[c4++]=item.value;

	});

	// console.log(holdID);
	// console.log(holdTITLE);
	// console.log(holdDES);
	// console.log(holdFIGURE);
	$("#show_dashboard_title").html(holdTITLE[0]);
	$("#show_dashboard_des").html(holdDES[0]);
	$("#show_dashboard_figure").html(holdFIGURE[0]);

	var countForMove = 0;
	$("body").delegate(".move_next","click",function(e){
	countForMove++;
	if(countForMove==c1){
		countForMove = 0;
	}
	$("#show_dashboard_title").html(holdTITLE[countForMove]);
	$("#show_dashboard_des").html(holdDES[countForMove]);
	$("#show_dashboard_figure").html(holdFIGURE[countForMove]);


	});


	$("body").delegate(".move_back","click",function(e){
		countForMove--;
		if(countForMove<0){
		 countForMove = 0;
	}
	$("#show_dashboard_title").html(holdTITLE[countForMove]);
	$("#show_dashboard_des").html(holdDES[countForMove]);
	$("#show_dashboard_figure").html(holdFIGURE[countForMove]);

	});


// /===============================================================Dashboard end===========================================
$("body").delegate("#Save_to_Database","click",function(e){
	e.preventDefault();
	var title = $("#chart_title").val();
	var des = $("#chart_des").val();
	var figure = $("#Preview_Container_view3").attr("figure");
	console.log('hello ');
	$.ajax({


		url:"save_to_data/",
		type:"POST",
		data:{
			title:title,
			des:des,
			figure:figure,
			csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()

		},
		success:function(response){
			if(response=="Success"){
				alert(response);
				window.location.href = "";
			}else{
				alert(response);
			}
		}





	});

});


// restriction for charts values......
// =============================================chart draw start==================================================


$("body").delegate("#draw_bar_chart_btn","click",function(e){

	const x_labels = document.querySelectorAll(".x_labels");
	const xlabels_custom = document.querySelectorAll(".x_labels_custom");
	
	var xlabels = [];
	var x_labels_customs = [];
	var i = 0;
	x_labels.forEach((item)=>{
		xlabels[i++] = item.value;
	});

	var j = 0;
	xlabels_custom.forEach((item)=>{
		x_labels_customs[j++] = item.value;
	});

	
	$.ajax({

		url:"draw_bar/",
		type:"POST",
		data:{
			'x_labels_customs[]':x_labels_customs,
			'xlabels[]':xlabels,
			'colors':$(".bar_color").val(),
			'widths':$(".bar_width").val(),
			csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
		},
		success:function(response){
			
			//alert(response);
			$("#Preview_Container_view3").html(response);
			$("#Preview_Container_view3").attr("figure",response);
		},
		complete:function(){
			$("#Save_to_Database").css("display","block");
			$("#chart_title").css("display","block");
			$("#chart_des").css("display","block");
		}


	});


});






$("#draw-pie-chart").click(function(e){
	
	const all_pie_labels = document.querySelectorAll(".pie-labels");
	const cols_pie = document.querySelectorAll(".cols");
	const all_pie_colors = document.querySelectorAll(".pie-color");
	const all_pie_explodes = document.querySelectorAll(".pie-explode");
	var pie_labels = [];
	
	var i=0;
	all_pie_labels.forEach((items)=>{
		pie_labels[i++] = items.value;
		
	});


	var pie_colors = [];
	var j=0;
	all_pie_colors.forEach((items)=>{
		pie_colors[j++] = items.value;
	});


	var pie_explodes = [];
	var k=0;
	all_pie_explodes.forEach((items)=>{
		pie_explodes[k++] = items.value;
	});

	var all_cols = [];
	var l=0;
	cols_pie.forEach((items)=>{
		all_cols[l++] = items.value;
	});

	var startangle = $(".startangle").val();
	var autopct = $(".autopct").val();
	var shadow = $(".shadow").val();

	// console.log(startangle);
	// console.log(autopct);
	// console.log(shadow);


	$.ajax({

		url:"draw/",
		type:"POST",
		data:{
			"cols[]":all_cols,
			"pie_labels[]":pie_labels,
			"pie_explodes[]":pie_explodes,
			"pie_colors[]":pie_colors,
			startangle:startangle,
			autopct:autopct,
			shadow:shadow,
			csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
		},
		success:function(response){
		
			$("#Preview_Container_view3").html(response);
			$("#Preview_Container_view3").attr("figure",response);
		},
		complete:function(){
			$("#Save_to_Database").css("display","block");
			$("#chart_title").css("display","block");
			$("#chart_des").css("display","block");
		}


	});



});










// =================================chart draw end===================================








all_values = []
chart_type="";
final_values = []
rest_count = 0;








  
$("#close_preview_container").click(function(e){
	$("#Preview_Container_view").removeClass("add_active_preview_view_container");
	window.location.href = "";
});
	

$("#Preview_Container").click(function(e){

	e.preventDefault();
	

	if($("#pie_chart").is(":checked")){
		chart_type=$("#pie_chart").val();
	}

	if($("#bar_chart").is(":checked")){
		chart_type=$("#bar_chart").val();
	}

	if($("#histogram").is(":checked")){
		chart_type=$("#histogram").val();
	}


  var fill_chart_type="";
	if(chart_type=="pie_chart"){
		fill_chart_type=chart_type;
	}
	if(chart_type=="bar_chart"){
		fill_chart_type=chart_type;

	}
	if(chart_type=="histogram"){
		fill_chart_type=chart_type;
	}
	
	if(all_values.length===0 || fill_chart_type==""){
		$("#warning-msg").addClass("active-warning-msg");
					$("#warning-msg-p").html("Please Choose Values First");

					$("#warning-msg-close").click(function(e){

						$("#warning-msg").removeClass("active-warning-msg");
						window.location.href = "";

					});
	}
	else{
		$.ajax({

			url:"preview/",
			type:"POST",
			data:{
				"all_values[]":all_values,
				chart_type:fill_chart_type,
				csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
			},
			success:function(response){
				if(response=="PieChartProblem"){
					$("#Preview_Container_view").removeClass("add_active_preview_view_container");
					$("#warning-msg").addClass("active-warning-msg");
					$("#warning-msg-p").html("You cant Choose the value Of Pie Chart More than 6");

					$("#warning-msg-close").click(function(e){

						$("#warning-msg").removeClass("active-warning-msg");
						window.location.href = "";

					});

				}else{
					$("#Preview_Container_view").addClass("add_active_preview_view_container");
					$("#Preview_Container_view2").html(response);
			     }
			}
			
			
		


		});
	}

});


$(".all_fields").change(function(e){
	var v = $(this).val();
	
	if($(this).prop("checked")){
		all_values.push(v);
		rest_count++;

	}
	else{
		var index = all_values.indexOf(v);
		all_values[index] = 0;
		rest_count--;
		
	}
   var cnt=0;
	for(var i=0;i<all_values.length;i++){
		if(all_values[i]===0){
			cnt++;
		}
	}
	if(cnt===all_values.length){
		all_values.splice(0,all_values.length);
	}


	
	
	
});


$(".view-open").click(function(e){
	e.preventDefault();
	
	//setTimeout(function(){$(".open-view-container").addClass("active-open-view");$(".loading-img").removeClass("active-loading"); }, 100);

	var pid = $(this).attr("pid");

	$.ajax({
		url:"",
		type:"POST",
		beforeSend:function(){
			$(".loading-img").addClass("active-loading");
		},
		data:{
			pid:pid,
			action:'view-open',
			csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
		},
		success:function(response){
			 $(".open-view-container").html(response);
			
		},
		complete:function(){
			
			$(".open-view-container").addClass("active-open-view");$(".loading-img").removeClass("active-loading");
			$(".close-view-container").css("display","block");
		}	
	});
		
$(".close-view-container").click(function(e){
	$(".close-view-container").css("display","none");
	$(".open-view-container").removeClass("active-open-view");


});

	
});

var ids_check = [];
var final_ids = [];
function call(){
	if($(".select_all_file").prop("checked")){
			$(".child_checkbox_selection").prop("checked",true);

			$("#Delete_Btn").css("display","block");

			const allcheck = document.querySelectorAll(".child_checkbox_selection");

			
			ids_check.splice(0,ids_check.length);
			allcheck.forEach((ids)=>{
				ids_check.push(ids.value);
			});	

			console.log(ids_check);
		
			
		}else{
			$(".child_checkbox_selection").prop("checked",false);
			ids_check.splice(0,ids_check.length);
			$(".select_all_file").prop("checked",false);
			$("#Delete_Btn").css("display","none");
		}
}

	$("body").delegate(".select_all_file","change",function(e){
		
		call();

	});

	$(".child_checkbox_selection").change(function(){

		var v = $(this).val();
		if($(this).prop("checked")){
			ids_check.push(v);
			$("#Delete_Btn").css("display","block");
			
		}
		else{
			var index = ids_check.indexOf(v);
			ids_check[index] = 0;
			$("#Delete_Btn").css("display","block");
			
		}

		console.log(ids_check);
		var count = 0;
		
		for(var i=0;i<ids_check.length;i++){
			if(ids_check[i]==0){
				count++;
			}
		}
		if(count==ids_check.length){
			$(".select_all_file").prop("checked",false);
			$("#Delete_Btn").css("display","none");
			count = 1;
		}
		

		
	});


    $("#Delete_Btn").click(function(){
    	 $.ajax({

				url:"",
				type:"POST",
				data:{
					'dels[]':ids_check,
					'action':'delete_file',
					csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
				},
				success:function(response){
					if(response=="empty"){

						alert('There is no file! Upload Files');
					}else{
						window.location.href='http://127.0.0.1:8000/Admincontrol/upload_all_file_page/';
					}
				}
				});
    });


});