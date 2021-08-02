$(document).ready(function(){


	const links = document.querySelectorAll(".links");

	atts = []
	at= 0;
	links.forEach((item)=>{

	  atts[at++] = item.getAttribute('att');

	});
var index = 0;
   $("body").delegate(".links","click",function(e){
   	 
   		// alert($(this).attr("att"));
   		
   		for(var i=0;i<atts.length;i++){
   			if(atts[i]==$(this).attr("att")){
   				index = i;
   			}
   		}

   });

   
});