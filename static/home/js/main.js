$(document).ready(function(){


	// slide the images 
	const imgs = document.querySelectorAll(".set-img");
	const img = document.querySelector(".set-img2");

	const store = [];

	let i = 0;
	imgs.forEach((img)=>{
		store[i] = img.src;
		i++;
	});


	// for (let j = 0; j < store.length; j++) {
	// 	img.src = store[j];
	// }



   let count = 0;
	setInterval(function(){
		
		
		delaySet(count);
		count++;
		if (count>=store.length) {
			count = 0;
		}
	},3000);

	function delaySet(count){
		img.src = store[count];
	}




// signup btn

$("#signupbtn").click(function(e){
	$(".SignIn").removeClass("active");
	$(".SignUp").toggleClass("active");

});

$("#signinbtn").click(function(e){
	$(".SignUp").removeClass("active");
	$(".SignIn").toggleClass("active");

});

});