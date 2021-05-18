var p=Math.floor(Math.random()*(10));

var data=[[1911.5,1911.5,1911.5,1911.5,1911.5,1911.5,1911.5,1911.5,1911.5,1911.5],
		  [2410,2426,2466,2453,2431,2443,2445,2458,2460,2463],
		  [106.00,89.00,82.00,103.00,78.00,86.00,75.00,110.00,93.00,72.00],
		  [21.26379137,17.29834791,14.78809739,19.0212373,15.01443696,16.18062088,14.05810684,20.12808783,16.95533273,13.05530372]];

var flag=true;
var itv = 0;
var qCount = 0;
var inferenceData = [["<10","10-20","20-30",">30"],
						["Exceptionally Strong","Strong","Satisfactory for road surfacing","Weak for road surfacing"]]
var inCount = 0;	
// Prompt questions during simulation using objects
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	setOptions:function(d1,d2,d3,d4,d5){
		questions.options = new Array(d1,d2,d3,d4,d5);
	},
	setOptions1:function(d1,d2,d3){
		questions.options = new Array(d1,d2,d3);
	},
	setAns:function(ans){
		if(simsubscreennum == 10){
			if(itv < 10){
				questions.ans1 = 1;
				inCount = 0;
			}
			else if(itv > 10 && itv < 20){
				questions.ans1 = 2;
				inCount = 1;
			}
			else if(itv > 20 && itv < 30){
				questions.ans1 = 3;
				inCount = 2;
			}
			else if(itv > 35){
				questions.ans1 = 4;
				inCount = 3;
			}
		}
		else{
			questions.ans1 = ans;
		}
		
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		// myDiv.style.visibility = "visible";
		myDiv.style.animation = "blinkingText 1s 1";
		myDiv.style.visibility = "visible";
		myDiv.classList.add("fadeIn");
			document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");
		
		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");
		button1.setAttribute("style","cursor:pointer");
	
		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.text = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);		
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right <span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong <span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.animation="";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}

function navNext()
{
	for(temp=0;temp<=10;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
     if (document.getElementById('arrow1').style.visibility=="hidden")
         document.getElementById('arrow1').style.visibility="visible";
     else
         document.getElementById('arrow1').style.visibility="hidden";
}

//stop blinking arrow
function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}

function magic()
{
	if(simsubscreennum==1)
	{
		// setTimeout(function(){
			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:277.5px; top:490px; height: 30px; z-index: 10;";
			document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)"; 
		     // Code for IE9
			document.getElementById("arrow1").style.msTransform = "rotate(90deg)"; 
		     // Standard syntax
			document.getElementById("arrow1").style.transform = "rotate(90deg)";
			document.getElementById("1-1").onclick=function()
			{
				myStopFunction();
				document.getElementById("1-1").onclick="";
				document.getElementById("1-1").style.visibility="hidden";
				setTimeout(function()
				{
					document.getElementById("p1-1").innerHTML="00.01";
				},650);
				document.getElementById("1-0").style.backgroundColor="lightgrey";
				// setTimeout(function()
				// {
					// myInt = setInterval(function(){ animatearrow(); }, 500);
					// document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:387.5px; top:490px; height: 30px; z-index: 10;";
					// document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)"; 
					// // Code for IE9
					// document.getElementById("arrow1").style.msTransform = "rotate(90deg)"; 
					// // Standard syntax
					// document.getElementById("arrow1").style.transform = "rotate(90deg)";
					// document.getElementById("1-3").onclick=function(){
					// myStopFunction();
					// document.getElementById("1-3").onclick="";
					// document.getElementById("1-3").style.visibility="hidden";
					// document.getElementById("p1-1").innerHTML="00.00";
					// document.getElementById("1-2").style.visibility="visible";
					setTimeout(function(){
							document.getElementById("1-2").style.visibility="visible";
							myInt = setInterval(function(){ animatearrow(); }, 500);
							document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:300px; top:180px; height: 40px; z-index: 10;";
							document.getElementById("arrow1").style.WebkitTransform = "rotate(360deg)"; 
							// Code for IE9
							document.getElementById("arrow1").style.msTransform = "rotate(360deg)"; 
							// Standard syntax
							document.getElementById("arrow1").style.transform = "rotate(360deg)";
							document.getElementById("1-2").onclick=function()
							{
								myStopFunction();
								document.getElementById("1-2").onclick="";
								document.getElementById("1-2").style.animation="movePlate 1s forwards";
								setTimeout(function()
								{
									document.getElementById("p1-1").innerHTML="150.00";
									myInt = setInterval(function(){ animatearrow(); }, 500);
									document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:387.5px; top:490px; height: 30px; z-index: 10;";
									document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)"; 
									// Code for IE9
									document.getElementById("arrow1").style.msTransform = "rotate(90deg)"; 
									// Standard syntax
									document.getElementById("arrow1").style.transform = "rotate(90deg)";
									document.getElementById("1-3").onclick=function(){
									myStopFunction();
									document.getElementById("1-3").onclick="";
									document.getElementById("1-3").style.visibility="hidden";
									document.getElementById("p1-1").innerHTML="00.00";
									document.getElementById("1-2").style.visibility="visible";
									document.getElementById("1-4").style.visibility="visible";
									myInt = setInterval(function(){ animatearrow(); }, 500);
									document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:630px; top:190px; height: 40px; z-index: 10;";
									document.getElementById("arrow1").style.WebkitTransform = "rotate(360deg)"; 
									// Code for IE9
									document.getElementById("arrow1").style.msTransform = "rotate(360deg)"; 
									// Standard syntax
									document.getElementById("arrow1").style.transform = "rotate(360deg)";
									document.getElementById("1-4").onclick=function()
									{
										myStopFunction();
										document.getElementById("1-4").onclick="";
										document.getElementById('1-4').style.transformOrigin = "100% 80%";
										document.getElementById('1-4').style.animation = "shiftCa 1s forwards ";
										setTimeout(function(){
											document.getElementById('1-4').style.visibility="hidden";
											document.getElementById('1-2').style.visibility="hidden";
											document.getElementById('1-21').style.visibility="visible";
											setTimeout(function()
											{
											document.getElementById("p1-1").innerHTML=" 350.00";
											document.getElementById("nextButton").style.visibility="visible";
											},500);
										},1000);
									}	
									}
								},1000);
							
						}
						// }
				},750);
			}
		 
	}
	
	else if(simsubscreennum==2)
	{
		document.getElementById("1-21").style.visibility="hidden";
		document.getElementById("1-5").style.visibility="hidden";
		var q2 = Object.create(questions);																								
		generateQuestion(q2,"Sieves are arranged in the ascending order as: ","","10mm-12.5mm-PAN","12.5mm-10mm-PAN","PAN-10mm-12.5mm","10mm-PAN-12.5mm",3,screen2Proceed,250,150,250,150);
	}
	
	else if(simsubscreennum==3)
	{
	document.getElementById("2-1").style.visibility="hidden";
	document.getElementById("2-2").style.visibility="hidden";
	document.getElementById("2-3").style.visibility="hidden";
	document.getElementById("2-5").style.visibility="hidden";
	document.getElementById("2-6").style.visibility="hidden";
	document.getElementById("2-7").style.visibility="visible";
	document.getElementById("2-7l").style.visibility="visible";
	document.getElementById("2-7r").style.visibility="visible";
	document.getElementById("2-8").style.visibility="visible";
	myInt=setInterval(function(){animatearrow();},500);
	document.getElementById("arrow1").style="visibility:visible; position:absolute; left:250px; top:350px; height:40px; z-index:10;";
	document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
	document.getElementById("arrow1").style.msTransform="rotate(360deg)"
	document.getElementById("arrow1").style.transform="rotate(360deg)"
	document.getElementById("2-8").onclick=function()
	{
		myStopFunction();
		document.getElementById("2-8").onclick="";
		document.getElementById("2-8").style.animation="moveSieveSet 1s forwards";
		setTimeout(function()
		{
			document.getElementById("2-8").style.width="110px";
		},950);
		setTimeout(function()
		{
			document.getElementById("2-9").style.visibility="visible";
			myInt=setInterval(function(){animatearrow();},500);
			document.getElementById("arrow1").style="visibility:visible; position:absolute; left:205px; top:160px; height:40px; z-index:10;";
			document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)"
			document.getElementById("arrow1").style.msTransform="rotate(270deg)"
			document.getElementById("arrow1").style.transform="rotate(270deg)"
			document.getElementById("2-9").onclick=function()
			{
				myStopFunction();
				document.getElementById("2-9").onclick="";
				document.getElementById("2-9").style="position:absolute; left:437.5px; top:195px;";
				setTimeout(function()
				{
					myInt=setInterval(function(){animatearrow();},500);
					document.getElementById("arrow1").style="visibility:visible; position:absolute; left:435px; top:182.5px; height:30px; z-index:10;";
					document.getElementById("arrow1").style.WebkitTransform="rotate(180deg)"
					document.getElementById("arrow1").style.msTransform="rotate(180deg)"
					document.getElementById("arrow1").style.transform="rotate(180deg)"
					document.getElementById("2-7l").onclick=function()
					{
						myStopFunction();
						document.getElementById("2-7l").onclick="";
						document.getElementById("2-7l").style.top="176.5px";
						myInt=setInterval(function(){animatearrow();},500);
						document.getElementById("arrow1").style="visibility:visible; position:absolute; left:625px; top:190px; height:30px; z-index:10;";
						document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
						document.getElementById("arrow1").style.msTransform="rotate(360deg)"
						document.getElementById("arrow1").style.transform="rotate(360deg)"
						document.getElementById("2-7r").onclick=function()
						{
							myStopFunction();
							document.getElementById("2-7r").onclick="";
							document.getElementById("2-7r").style.top="183px";
							document.getElementById("2-7on").style.visibility="visible";
							setTimeout(function()
							{
								myInt=setInterval(function(){animatearrow();},500);
								document.getElementById("arrow1").style="visibility:visible; position:absolute; left:470px; top:455px; height:30px; z-index:10;";
								document.getElementById("arrow1").style.WebkitTransform="rotate(90deg)"
								document.getElementById("arrow1").style.msTransform="rotate(90deg)"
								document.getElementById("arrow1").style.transform="rotate(90deg)"
								document.getElementById("2-7on").onclick=function()
								{
									myStopFunction();
									document.getElementById("2-7on").onclick="";
									document.getElementById("2-7on").style.visibility="hidden";
									document.getElementById("2-7onon").style.visibility="visible";
									document.getElementById("2-8").style="position:absolute; left:450px; top:195px; width:110px;";
									document.getElementById("2-8").style.animation="shake 0.5s 8";
									// document.getElementById("2-8").style.animationIterationCount="infinite"; infinite or number or default is 1
									setTimeout(function()
									{
										document.getElementById("nextButton").style.visibility="visible";
									},4000);
								}
							},500);
						}
					}
				},1000);
			}
		},1000);
	}
  }
  
  else if(simsubscreennum==4)
  {
	  document.getElementById("2-7").style.visibility="hidden";
	  document.getElementById("2-7l").style.visibility="hidden";
	  document.getElementById("2-7r").style.visibility="hidden";
	  document.getElementById("2-7onon").style.visibility="hidden";
	  document.getElementById("2-8").style.visibility="hidden";
	  myInt=setInterval(function(){animatearrow();},500);
	  document.getElementById("arrow1").style="visibility:visible; position:absolute; left:630px; top:227.5px; height:30px; z-index:10;";
      document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
	  document.getElementById("arrow1").style.msTransform="rotate(360deg)"
	  document.getElementById("arrow1").style.transform="rotate(360deg)"
	  document.getElementById("4-3r").onclick=function()
	  {
		myStopFunction();
		document.getElementById("4-3r").onclick="";
		document.getElementById("4-3r").style.top="145px";
		myInt=setInterval(function(){animatearrow();},500);
		document.getElementById("arrow1").style="visibility:visible; position:absolute; left:440px; top:227px; height:30px; z-index:10;";
		document.getElementById("arrow1").style.WebkitTransform="rotate(180deg)"
		document.getElementById("arrow1").style.msTransform="rotate(180deg)"
		document.getElementById("arrow1").style.transform="rotate(180deg)"
		document.getElementById("4-3l").onclick=function()
		{
			myStopFunction();
			document.getElementById("4-3l").onclick="";
			document.getElementById("4-3l").style.top="140px";
			myInt=setInterval(function(){animatearrow();},500);
			document.getElementById("arrow1").style="visibility:visible; position:absolute; left:525px; top:200px; height:30px; z-index:10;";
			document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)"
			document.getElementById("arrow1").style.msTransform="rotate(270deg)"
			document.getElementById("arrow1").style.transform="rotate(270deg)"
			document.getElementById("4-3").onclick=function()
			{
				myStopFunction();
				document.getElementById("4-3").onclick="";		
				document.getElementById("4-3").style.visibility="hidden";
				myInt=setInterval(function(){animatearrow();},500);
				document.getElementById("arrow1").style="visibility:visible; position:absolute; left:525px; top:220px; height:30px; z-index:10;";
				document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)"
				document.getElementById("arrow1").style.msTransform="rotate(270deg)"
				document.getElementById("arrow1").style.transform="rotate(270deg)"
				document.getElementById("4-2").onclick=function()
				{
					myStopFunction();
					document.getElementById("4-2").onclick="";		
					document.getElementById("4-2").style.visibility="hidden";
					document.getElementById("4-4").style.visibility="visible";
					document.getElementById("4-5").style.visibility="visible";
					document.getElementById("4-6").style.visibility="visible";
					document.getElementById("4-7").style.visibility="visible";
					setTimeout(function()
					{
					  document.getElementById("4-1").style.visibility="hidden";
					  document.getElementById("4-3l").style.visibility="hidden";
					  document.getElementById("4-3r").style.visibility="hidden";
					  myInt=setInterval(function(){animatearrow();},500);
					  document.getElementById("arrow1").style="visibility:visible; position:absolute; left:125px; top:255px; height:30px; z-index:10;";
					  document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)"
					  document.getElementById("arrow1").style.msTransform="rotate(270deg)"
					  document.getElementById("arrow1").style.transform="rotate(270deg)"
					  document.getElementById("4-7").onclick=function()
					  {
						myStopFunction();
						document.getElementById("4-7").onclick="";		
						document.getElementById("4-7").style.visibility="hidden";
						myInt=setInterval(function(){animatearrow();},500);
					    document.getElementById("arrow1").style="visibility:visible; position:absolute; left:220px; top:320px; height:30px; z-index:10;";
					    document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
					    document.getElementById("arrow1").style.msTransform="rotate(360deg)"
					    document.getElementById("arrow1").style.transform="rotate(360deg)"
					    document.getElementById("4-6").onclick=function()
					    {
						  myStopFunction();
						  document.getElementById("4-6").onclick="";		
						  document.getElementById("4-6").style="position:absolute; left:230px; top:335px;";
						  document.getElementById("4-8").style.visibility="visible";
						  myInt=setInterval(function(){animatearrow();},500);
						  document.getElementById("arrow1").style="visibility:visible; position:absolute; left:220px; top:365px; height:30px; z-index:10;";
					      document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
					      document.getElementById("arrow1").style.msTransform="rotate(360deg)"
					      document.getElementById("arrow1").style.transform="rotate(360deg)"
					      document.getElementById("4-5").onclick=function()
					      {
						    myStopFunction();
						    document.getElementById("4-5").onclick="";		
						    document.getElementById("4-5").style="position:absolute; left:440px; top:335px;";
						    document.getElementById("4-8").style="position:absolute; left:467.5px; top:360px;";
							setTimeout(function()
							{
								document.getElementById("4-6").style.visibility="hidden";
								document.getElementById("4-4").style.visibility="hidden";
								document.getElementById("4-9").style.visibility="visible";
								setTimeout(function()
								{
								  myInt=setInterval(function(){animatearrow();},500);
								  document.getElementById("arrow1").style="visibility:visible; position:absolute; left:410px; top:400px; height:40px; z-index:10;";
								  document.getElementById("arrow1").style.WebkitTransform="rotate(180deg)"
								  document.getElementById("arrow1").style.msTransform="rotate(180deg)"
								  document.getElementById("arrow1").style.transform="rotate(180deg)"
								  document.getElementById("4-5").onclick=function()
								  {
									myStopFunction();
									document.getElementById("4-5").onclick="";	
									document.getElementById("4-5").style.visibility="hidden";
									document.getElementById("4-8").style.visibility="hidden";									
									document.getElementById("4-10").style.visibility="visible";	
									setTimeout(function()
									{
										document.getElementById("4-10").style.animation="moveSeive10-1 1s forwards";
										setTimeout(function()
										{
											document.getElementById("4-10").style="position:absolute; left:115px; top:150px;";
											document.getElementById("4-10").style.transformOrigin="80% 100%";
											document.getElementById("4-10").style.animation="shiftCa3 1s forwards";
											setTimeout(function()
											{
												document.getElementById("4-10").style.visibility="hidden";
												document.getElementById("4-11").style.visibility="visible";
												document.getElementById("4-112").style.visibility="visible";
												document.getElementById("4-113").style.visibility="visible";
												document.getElementById("4-114").style.visibility="visible";
												document.getElementById("nextButton").style.visibility="visible";
											},1000);
										},1000);
									},400);
								  }
								},700);
							},500);
					      }
					    }
					  }
					},250);
				}
			}
		}
	  }							
  }
  
  else if(simsubscreennum==5)
  {
	document.getElementById("4-9").style.visibility="hidden";
	document.getElementById("4-11").style.visibility="hidden";
	document.getElementById("4-112").style.visibility="hidden";
	document.getElementById("4-113").style.visibility="hidden";
	document.getElementById("4-114").style.visibility="hidden";
	myInt = setInterval(function(){ animatearrow(); }, 500);
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:437.5px; top:470px; height: 30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)"; 
	 // Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate(90deg)"; 
	 // Standard syntax
	document.getElementById("arrow1").style.transform = "rotate(90deg)";
	document.getElementById("5-1a").onclick=function()
	{
		myStopFunction();
		document.getElementById("5-1a").onclick="";
		document.getElementById("5-1a").style.visibility="hidden";
		setTimeout(function()
		{
			document.getElementById("p5-2").innerHTML="00.01";
		},650);
		document.getElementById("5-1").style.backgroundColor="lightgrey";
		setTimeout(function()
		{
			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:542.5px; top:470px; height: 30px; z-index: 10;";
			document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)"; 
			// Code for IE9
			document.getElementById("arrow1").style.msTransform = "rotate(90deg)"; 
			// Standard syntax
			document.getElementById("arrow1").style.transform = "rotate(90deg)";
			document.getElementById("5-1b").onclick=function(){
			myStopFunction();
			document.getElementById("5-1b").onclick="";
			document.getElementById("5-1b").style.visibility="hidden";
			document.getElementById("p5-2").innerHTML="00.00";
			myInt=setInterval(function(){animatearrow();},500);
			document.getElementById("arrow1").style="visibility:visible; position:absolute; left:220px; top:345px; height:40px; z-index:10;";
			document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)";
			document.getElementById("arrow1").style.msTransform="rotate(360deg)";
			document.getElementById("arrow1").style.transform="rotate(360deg)";
			document.getElementById("5-2").onclick=function()
			{
				myStopFunction();
				document.getElementById("5-2").onclick="";
				document.getElementById("5-2").style.animation="moveCylinder 1s forwards";
				setTimeout(function()
				{
					document.getElementById("p5-1").innerHTML="Weight of empty cylinder (W<sub>1</sub>) = <span style='border-bottom-style:double'> "+data[0][p] + "0</span>g";
					document.getElementById("p5-2").innerHTML=data[0][p]+"0";
					setTimeout(function()
					{
						document.getElementById("5-1").style.visibility="hidden";
						document.getElementById("p5-1").style.visibility="hidden";
						document.getElementById("p5-2").style.visibility="hidden";
						document.getElementById("5-31").style.visibility="visible";
						document.getElementById("5-32").style.visibility="visible";
						document.getElementById("5-33").style.visibility="visible";
						document.getElementById("5-34").style.visibility="visible";
						document.getElementById("5-4").style.visibility="visible";
						setTimeout(function()
						{
						  fillCylinder();
						},1450);
					},1150);
				},1000);
			}
			}
		},800);
	}
	
	
  }
  
  else if(simsubscreennum==6)
  {
	document.getElementById("5-9").style.visibility="hidden";
	document.getElementById("5-31").style.visibility="hidden";
	document.getElementById("5-32").style.visibility="hidden";
	document.getElementById("5-33").style.visibility="hidden";
	document.getElementById("5-34").style.visibility="hidden";
	document.getElementById("5-4").style.visibility="hidden";
	
	myInt = setInterval(function(){ animatearrow(); }, 500);
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:115.5px; top:480px; height: 30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)"; 
	 // Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate(90deg)"; 
	 // Standard syntax
	document.getElementById("arrow1").style.transform = "rotate(90deg)";
	document.getElementById("6-1a").onclick=function()
	{
		myStopFunction();
		document.getElementById("6-1a").onclick="";
		document.getElementById("6-1a").style.visibility="hidden";
		setTimeout(function()
		{
			document.getElementById("p6-2").innerHTML="00.01";
		},650);
		document.getElementById("6-1").style.backgroundColor="lightgrey";
		setTimeout(function()
		{
			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:217.5px; top:480px; height: 30px; z-index: 10;";
			document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)"; 
			// Code for IE9
			document.getElementById("arrow1").style.msTransform = "rotate(90deg)"; 
			// Standard syntax
			document.getElementById("arrow1").style.transform = "rotate(90deg)";
			document.getElementById("6-1b").onclick=function(){
			myStopFunction();
			document.getElementById("6-1b").onclick="";
			document.getElementById("6-1b").style.visibility="hidden";
			document.getElementById("p6-2").innerHTML="00.00";
			myInt=setInterval(function(){animatearrow();},500);
			document.getElementById("arrow1").style="visibility:visible; position:absolute; left:420px; top:300px; height:40px; z-index:10;";
			document.getElementById("arrow1").style.WebkitTransform="rotate(180deg)";
			document.getElementById("arrow1").style.msTransform="rotate(180deg)";
			document.getElementById("arrow1").style.transform="rotate(180deg)";
			document.getElementById("6-2").onclick=function()
			{
				myStopFunction();
				document.getElementById("6-2").onclick="";
				document.getElementById("6-2").style.animation="shiftCyl 1s forwards";
				setTimeout(function()
				{
					document.getElementById("p6-1").innerHTML="Weight of cylinder with the aggregates(W<sub>2</sub>) =<span style='border-bottom-style:double'> "+data[1][p]+".00</span> g";
					document.getElementById("p6-2").innerHTML="   " +data[1][p]+".00";
					document.getElementById("nextButton").style.visibility="visible";
				},1200);
			}	
			}
		},800);
	}
	
	
	
  }
  else if(simsubscreennum==7)
  {
	  myInt=setInterval(function(){animatearrow();},500);
	  document.getElementById("arrow1").style="visibility:visible; position:absolute; left:620px; top:400px; height:30px; z-index:10";
	  document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)";
	  document.getElementById("arrow1").style.msTransform="rotate(270deg)";
	  document.getElementById("arrow1").style.transform="rotate(270deg)";
	  document.getElementById("7-6").onclick=function()
	  {
		myStopFunction();
		document.getElementById("7-6").onclick="";
		document.getElementById("7-6").style.visibility="hidden";
		document.getElementById("7-62").style.visibility="visible";
		document.getElementById("7-62").style.animation="moveCylinder2 1s forwards";
		setTimeout(function(){
			document.getElementById("7-62").style="position:absolute; left:360px; top:300px; width:110px;";
			document.getElementById("7-62").style.transformOrigin="100% 80%";
			document.getElementById("7-62").style.animation="rotCylinder2 1s forwards";
			setTimeout(function(){
				document.getElementById("7-62").style.visibility="hidden";
				document.getElementById("7-3").style.visibility="visible";
				setTimeout(function()
				{
					myInt=setInterval(function(){animatearrow();},500);
					document.getElementById("arrow1").style="visibility:visible; position:absolute; left:441px; top:243px; height:30px; z-index:10";
					document.getElementById("arrow1").style.WebkitTransform="rotate(45deg)";
					document.getElementById("arrow1").style.msTransform="rotate(45deg)";
					document.getElementById("arrow1").style.transform="rotate(45deg)";
					document.getElementById("7-5").onclick=function()
					{
						myStopFunction();
						document.getElementById("7-5").onclick="";
						document.getElementById("7-5").style.visibility="hidden";
						setTimeout(function(){
							document.getElementById("7-2").style.visibility="hidden";
							document.getElementById("7-2h").style.visibility="visible";
							setTimeout(function()
							{
								relaeseHammer();
							},250);
						},500);
					}
				},250);
			},1000);
		},1000);
	  }
  }
  else if(simsubscreennum==8)
  {
	document.getElementById("7-2").style.visibility="hidden";
	document.getElementById("7-3").style.visibility="hidden";
	document.getElementById("7-5").style.visibility="hidden";
	  // document.getElementById("nextButton").style.visibility="visible";
	myInt=setInterval(function(){ animatearrow(); }, 500);
	document.getElementById("arrow1").style="visibility:visible; position:absolute; left:330px; top:335px; height:40px; z-index:10; ";
	document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)";
	document.getElementById("arrow1").style.msTransform="rotate(270deg)";
	document.getElementById("arrow1").style.transform="rotate(270deg)";
	document.getElementById("8-2").onclick=function()
	{
		myStopFunction();
		document.getElementById("8-2").onclick="";
		document.getElementById("8-2").style.animation="moveSeive10 1s forwards";
		setTimeout(function()
		{
			document.getElementById("8-3").style.visibility="visible";
			myInt=setInterval(function(){animatearrow(); },500);
			document.getElementById("arrow1").style="visibility:visible; position:absolute; left:300px; top:245px;height:40px; z-index:10;";
			document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
			document.getElementById("arrow1").style.msTransform="rotate(360deg)"
			document.getElementById("arrow1").style.transform="rotate(360deg)"
			document.getElementById("8-3").onclick=function()
			{
				myStopFunction();
				document.getElementById("8-3").onclick="";
				document.getElementById("8-3").style.transformOrigin="100% 80%";
				document.getElementById("8-3").style.animation="shiftCa2 1s forwards";
				setTimeout(function()
				{
					document.getElementById("8-2").src = "images/filled236.png";
					document.getElementById("8-3").style.visibility="hidden";
					document.getElementById("8-4").style.visibility="visible";
					setTimeout(function()
					{
						document.getElementById("8-5").style.visibility="visible";
						myInt=setInterval(function(){animatearrow();},500);
						document.getElementById("arrow1").style="visibility:visible; position:absolute; left:450px; top:200px; height:40px; z-index:10;";
						document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
						document.getElementById("arrow1").style.msTransform="rotate(360deg)"
						document.getElementById("arrow1").style.transform="rotate(360deg)"
						document.getElementById("8-5").onclick=function()
						{
							myStopFunction();
							document.getElementById("8-5").onclick="";
							document.getElementById("8-5").style.animation="shiftCap2 1s forwards";
							setTimeout(function(){
								document.getElementById("8-6").style.visibility="visible";
								document.getElementById("8-7").style.visibility="visible";
								document.getElementById("8-1").style.visibility="hidden";
								document.getElementById("8-2").style.visibility="hidden";
								document.getElementById("8-3").style.visibility="hidden";
								document.getElementById("8-4").style.visibility="hidden";
								document.getElementById("8-5").style.visibility="hidden";
								
								myInt=setInterval(function(){animatearrow();},500);
								document.getElementById("arrow1").style="visibility:visible; position:absolute; left:230px; top:360px; height:40px; z-index:10;";
								document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
								document.getElementById("arrow1").style.msTransform="rotate(360deg)"
								document.getElementById("arrow1").style.transform="rotate(360deg)"
								document.getElementById("8-6").onclick=function()
								{
									myStopFunction();
									document.getElementById("8-6").onclick="";
									document.getElementById("8-6").style.animation="moveSieveSet 1s forwards";
									setTimeout(function()
									{
										document.getElementById("8-6").style.width="110px";
									},1150);

		setTimeout(function()
		{
			document.getElementById("8-8").style.visibility="visible";
			myInt=setInterval(function(){animatearrow();},500);
			document.getElementById("arrow1").style="visibility:visible; position:absolute; left:205px; top:160px; height:40px; z-index:10;";
			document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)"
			document.getElementById("arrow1").style.msTransform="rotate(270deg)"
			document.getElementById("arrow1").style.transform="rotate(270deg)"
			document.getElementById("8-8").onclick=function()
			{
				myStopFunction();
				document.getElementById("8-8").onclick="";
				document.getElementById("8-8").style="position:absolute; left:437.5px; top:195px;";
				setTimeout(function()
				{
					document.getElementById("8-7l").style.visibility="visible";
					myInt=setInterval(function(){animatearrow();},500);
					document.getElementById("arrow1").style="visibility:visible; position:absolute; left:435px; top:182.5px; height:30px; z-index:10;";
					document.getElementById("arrow1").style.WebkitTransform="rotate(180deg)"
					document.getElementById("arrow1").style.msTransform="rotate(180deg)"
					document.getElementById("arrow1").style.transform="rotate(180deg)"
					document.getElementById("8-7l").onclick=function()
					{
						myStopFunction();
						document.getElementById("8-7l").onclick="";
						document.getElementById("8-7l").style.top="176.5px";
						
						document.getElementById("8-7r").style.visibility="visible";
						myInt=setInterval(function(){animatearrow();},500);
						document.getElementById("arrow1").style="visibility:visible; position:absolute; left:625px; top:190px; height:30px; z-index:10;";
						document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
						document.getElementById("arrow1").style.msTransform="rotate(360deg)"
						document.getElementById("arrow1").style.transform="rotate(360deg)"
						document.getElementById("8-7r").onclick=function()
						{
							myStopFunction();
							document.getElementById("8-7r").onclick="";
							document.getElementById("8-7r").style.top="183px";
							document.getElementById("8-7on").style.visibility="visible";
							setTimeout(function()
							{
								myInt=setInterval(function(){animatearrow();},500);
								document.getElementById("arrow1").style="visibility:visible; position:absolute; left:470px; top:435px; height:30px; z-index:10;";
								document.getElementById("arrow1").style.WebkitTransform="rotate(90deg)"
								document.getElementById("arrow1").style.msTransform="rotate(90deg)"
								document.getElementById("arrow1").style.transform="rotate(90deg)"
								document.getElementById("8-7on").onclick=function()
								{
									myStopFunction();
									document.getElementById("8-7on").onclick="";
									document.getElementById("8-7on").style.visibility="hidden";
									document.getElementById("8-7onon").style.visibility="visible";
									document.getElementById("8-6").style="position:absolute; left:450px; top:195px; width:110px;";
									document.getElementById("8-6").style.animation="shake 0.5s 8";
									// document.getElementById("2-8").style.animationIterationCount="infinite"; infinite or number or default is 1
									setTimeout(function()
									{
										document.getElementById("nextButton").style.visibility="visible";
									},4000);
								}
							},500);
						}
					}
				},1000);
			}
		},1000);				
							}
							},1000);
						}
					},500);
				},1000);
			}				
		},1000);
	}	
  }
  else if(simsubscreennum==9)
  {
	  document.getElementById("8-6").style.visibility="hidden";
	  document.getElementById("8-7").style.visibility="hidden";
	  document.getElementById("8-7onon").style.visibility="hidden";
	  document.getElementById("8-7l").style.visibility="hidden";
	  document.getElementById("8-7r").style.visibility="hidden";
	  document.getElementById("8-8").style.visibility="hidden";
	  myInt=setInterval(function(){animatearrow();},500);
	  document.getElementById("arrow1").style="visibility:visible; position:absolute; left:630px; top:227.5px; height:30px; z-index:10;";
      document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
	  document.getElementById("arrow1").style.msTransform="rotate(360deg)"
	  document.getElementById("arrow1").style.transform="rotate(360deg)"
	  document.getElementById("9-3r").onclick=function()
	  {
		myStopFunction();
		document.getElementById("9-3r").onclick="";
		document.getElementById("9-3r").style.top="145px";
		myInt=setInterval(function(){animatearrow();},500);
		document.getElementById("arrow1").style="visibility:visible; position:absolute; left:440px; top:227px; height:30px; z-index:10;";
		document.getElementById("arrow1").style.WebkitTransform="rotate(180deg)"
		document.getElementById("arrow1").style.msTransform="rotate(180deg)"
		document.getElementById("arrow1").style.transform="rotate(180deg)"
		document.getElementById("9-3l").onclick=function()
		{
			myStopFunction();
			document.getElementById("9-3l").onclick="";
			document.getElementById("9-3l").style.top="140px";
			myInt=setInterval(function(){animatearrow();},500);
			document.getElementById("arrow1").style="visibility:visible; position:absolute; left:525px; top:200px; height:30px; z-index:10;";
			document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)"
			document.getElementById("arrow1").style.msTransform="rotate(270deg)"
			document.getElementById("arrow1").style.transform="rotate(270deg)"
			document.getElementById("9-3").onclick=function()
			{
				myStopFunction();
				document.getElementById("9-3").onclick="";		
				document.getElementById("9-3").style.visibility="hidden";
				myInt=setInterval(function(){animatearrow();},500);
				document.getElementById("arrow1").style="visibility:visible; position:absolute; left:525px; top:220px; height:30px; z-index:10;";
				document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)"
				document.getElementById("arrow1").style.msTransform="rotate(270deg)"
				document.getElementById("arrow1").style.transform="rotate(270deg)"
				document.getElementById("9-2").onclick=function()
				{
					myStopFunction();
					document.getElementById("9-2").onclick="";		
					document.getElementById("9-2").style.visibility="hidden";
					document.getElementById("9-4").style.visibility="visible";
					document.getElementById("9-5").style.visibility="visible";
					document.getElementById("9-6").style.visibility="visible";
					document.getElementById("9-7").style.visibility="visible";
					setTimeout(function()
					{
					  document.getElementById("9-1").style.visibility="hidden";
					  document.getElementById("9-3l").style.visibility="hidden";
					  document.getElementById("9-3r").style.visibility="hidden";
					  myInt=setInterval(function(){animatearrow();},500);
					  document.getElementById("arrow1").style="visibility:visible; position:absolute; left:117px; top:280px; height:30px; z-index:10;";
					  document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)"
					  document.getElementById("arrow1").style.msTransform="rotate(270deg)"
					  document.getElementById("arrow1").style.transform="rotate(270deg)"
					  document.getElementById("9-7").onclick=function()
					  {
						myStopFunction();
						document.getElementById("9-7").onclick="";		
						document.getElementById("9-7").style.visibility="hidden";
						document.getElementById("9-6").style.visibility="visible";
						myInt=setInterval(function(){animatearrow();},500);
					    document.getElementById("arrow1").style="visibility:visible; position:absolute; left:220px; top:360px; height:30px; z-index:10;";
					    document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
					    document.getElementById("arrow1").style.msTransform="rotate(360deg)"
					    document.getElementById("arrow1").style.transform="rotate(360deg)"
					    document.getElementById("9-5").onclick=function()
					    {
						  myStopFunction();
						  document.getElementById("9-5").onclick="";		
						  document.getElementById("9-5").style="position:absolute; left:230px; top:335px; width:140px;";
						  document.getElementById("9-6").style="position:absolute; left:245px; top:357.5px;";
						  document.getElementById("9-8").style.visibility="visible";
						  setTimeout(function()
						  {
							  document.getElementById("9-5").style.visibility="hidden";
							  document.getElementById("9-6").style.visibility="hidden";
							  document.getElementById("9-9").style.visibility="visible";
							  document.getElementById("9-9a").style.visibility="visible";
							  document.getElementById("9-9b").style.visibility="visible";
							  document.getElementById("9-4").style.visibility="hidden";
							  document.getElementById("9-8").style.visibility="hidden";
							  document.getElementById("9-41").style.visibility="visible";
							  setTimeout(function(){
								var q4 = Object.create(questions);
								generateQuestion(q4,"Original Weight of Aggregate: ","","100g","350g","500g","1000g",2,screen9Proceed,250,150,250,150);
							},500);
					    },750);
					  }
					}
				},250);
			}
		}
	  }							
  
  }
  }
  else if(simsubscreennum==10)
  {
	  document.getElementById("9-10a").style.visibility="hidden";
	  document.getElementById("p9-1").style.visibility="hidden";
	  document.getElementById("9-9").style.visibility="hidden";
	  document.getElementById("9-41").style.visibility="hidden";
	  document.getElementById("p9-2").style.visibility="hidden";
	  // document.getElementById("t").innerHTML="1";
	  document.getElementById("w1").innerHTML=data[0][p];
	  document.getElementById("w2").innerHTML=data[1][p];
	  document.getElementById("w3").innerHTML=data[2][p];
	  setTimeout(function()
	  {
		  document.getElementById("form").style.visibility="visible";
		  itv=(data[2][p]/(data[1][p]-data[0][p]))*100;
		  document.getElementById("iv").style.visibility="visible";
		  // document.getElementById("itv").style.visibility="visible";
		  // document.getElementById("itv").innerHTML=itv.toFixed(2);
	  },500);
  }
}

var count=0;
function fillCylinder()
{
	refresh();
	count++;
	document.getElementById("5-5").style.visibility="visible";
	myInt=setInterval(function(){animatearrow();},500);
	document.getElementById("arrow1").style="visibility:visible; position:absolute; left:220px; top:225px; height:40px; z-index:10;";
	document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)";
	document.getElementById("arrow1").style.msTransform="rotate(360deg)";
	document.getElementById("arrow1").style.transform="rotate(360deg)";
	document.getElementById("5-5").onclick=function()
	{
	  myStopFunction();
	  document.getElementById("5-5").onclick="";
	  document.getElementById("5-5").style.animation="moveTrowel 1s forwards";
	  setTimeout(function()
	  {
		document.getElementById("5-5").style.visibility="hidden";
		document.getElementById("5-6").style.visibility="visible";
		document.getElementById("5-6").style.animation="moveTrowel2 1.5s forwards";
		setTimeout(function()
		{
			if(count==1)
				document.getElementById("5-31").style.visibility="hidden";
			if(count==2)
				document.getElementById("5-32").style.visibility="hidden";
			if(count==3)
				document.getElementById("5-34").style.visibility="hidden";
			if(count==4)
				document.getElementById("5-33").style.visibility="hidden";

		},50);
		setTimeout(function()
		{
			document.getElementById("5-6").style.visibility="hidden";
			document.getElementById("5-6t").style.visibility="visible";
			document.getElementById("5-6t").style.transformOrigin="80% 100%";
			document.getElementById("5-6t").style.animation="rotTrowel 1s forwards";
			setTimeout(function()
			{
			  document.getElementById("5-6t").style.visibility="hidden";
			  if(count==1)
				  document.getElementById("5-35").style.visibility="visible";
			  if(count==2)
				  document.getElementById("5-37").style.visibility="visible";
			  if(count==3)
				  document.getElementById("5-38").style.visibility="visible";
			  if(count==4)
				  document.getElementById("5-39").style.visibility="visible";
			  setTimeout(function()
			  {
				  tamp();
			  },500);
			},1000);
	    },1500);
	  },1000);
	}
}

function tamp()
{
	refresh();
	document.getElementById("5-7l").style.visibility="visible";	
	myInt=setInterval(function(){animatearrow();},500);
	document.getElementById("arrow1").style="visibility:visible; position:absolute; left:550px; top:160px; height:40px; z-index:10;";
	document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)";
	document.getElementById("arrow1").style.msTransform="rotate(360deg)";
	document.getElementById("arrow1").style.transform="rotate(360deg)";
	document.getElementById("5-7l").onclick=function()
	{
		myStopFunction();
		document.getElementById("5-7l").onclick="";
		document.getElementById("5-7l").style.animation="tamp 2s forwards";
		setTimeout(function()
		{
			document.getElementById("5-7l").style.visibility="hidden";
			if(count==1)
			{
			document.getElementById("5-35").style.visibility="hidden";
			document.getElementById("5-36").style.visibility="visible";
			}
			if(count==2)
			{
			document.getElementById("5-37").style.visibility="hidden";
			document.getElementById("5-35").style.visibility="visible";
			}
			if(count==3)
			{
			document.getElementById("5-38").style.visibility="hidden";
			document.getElementById("5-37").style.visibility="visible";
			document.getElementById("5-310").style.visibility="visible";
			}
			if(count==4)
			{
			document.getElementById("5-39").style.visibility="hidden";
			document.getElementById("5-38").style.visibility="visible";
			if(count==4 && flag==true && document.getElementById("5-7l").style.visibility=="hidden") 
				levelCa();
			}
			
			// document.getElementById("nextButton").style.visibility="visible";
			if(count<4)
				fillCylinder();
			
		},2000);
	}
}

function levelCa()
{
	flag=false;
	setTimeout(function()
	{
	document.getElementById("5-8").style.visibility="visible";
	myInt=setInterval(function(){animatearrow();},500);
	document.getElementById("arrow1").style="visibility:visible; position:absolute; left:480px; top:120px; height:40px; z-index:10;";
	document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)";
	document.getElementById("arrow1").style.msTransform="rotate(270deg)";
	document.getElementById("arrow1").style.transform="rotate(270deg)";
	document.getElementById("5-8").onclick=function()
	{
		myStopFunction();
		document.getElementById("5-8").onclick="";
		document.getElementById("5-8").style.animation="leveling 1.5s 2 forwards";
		setTimeout(function(){
			document.getElementById("5-8").style.visibility="hidden";	
			document.getElementById("5-2").style.visibility="hidden";	
			document.getElementById("5-35").style.visibility="hidden";	
			document.getElementById("5-36").style.visibility="hidden";	
			document.getElementById("5-37").style.visibility="hidden";	
			document.getElementById("5-38").style.visibility="hidden";	
			document.getElementById("5-310").style.visibility="hidden";	
			document.getElementById("5-9").style.visibility="visible";
			var q3 = Object.create(questions);																								
			generateQuestion1(q3,"Tamping process is done to obtain<br> uniform compaction and to avoid air voids. Say True/False?","","True","False",1,screen5Proceed,150,150,250,150);
			// document.getElementById("nextButton").style.visibility="visible";
		},3000);
	}
	},1000);
}
var released=1,flag2=true;
function relaeseHammer()
{

	myInt=setInterval(function(){animatearrow();},500);
	document.getElementById("arrow1").style="visibility:visible; position:absolute; left:600px; top:120px; height:40px; z-index:10;";
	document.getElementById("arrow1").style.WebkitTransform="rotate(0deg)";
	document.getElementById("arrow1").style.msTransform="rotate(0deg)";
	document.getElementById("arrow1").style.transform="rotate(0deg)";
	document.getElementById("7-2h").onclick=function()
	{
		myStopFunction();
		document.getElementById("sound").play();
		document.getElementById("sound").loop = true;
		document.getElementById("7-2h").style.animation="hamUp1 0.3s forwards";
		document.getElementById("7-4").style.animation="hamDown1 0.3s forwards";
		document.getElementById("p7-1").style.visibility="visible";
		document.getElementById("grey1").style.visibility="visible";
		document.getElementById("p7-1").style.animation="rollNum 0.3s forwards";
		document.getElementById("p7-1").innerHTML=released;
		setTimeout(function()
		{
			relaeseHammer2();
		},300);
	}
}

function relaeseHammer2()
{
	if(released < 4 || released >13)
		released++;
	else if(released == 4)
		released = 14;
	
	// myInt=setInterval(function(){animatearrow();},500);
	// document.getElementById("arrow1").style="visibility:visible; position:absolute; left:600px; top:120px; height:40px; z-index:10;";
	// document.getElementById("arrow1").style.WebkitTransform="rotate(0deg)";
	// document.getElementById("arrow1").style.msTransform="rotate(0deg)";
	// document.getElementById("arrow1").style.transform="rotate(0deg)";
	// document.getElementById("7-2h").onclick=function()
	// {
		if(released>9)
		{
			document.getElementById("grey1").style.visibility="hidden";
			document.getElementById("grey2").style.visibility="visible";
		}
		myStopFunction();
		document.getElementById("7-2h").onclick="";
		document.getElementById("7-2h").style.animation="hangerDown2 0.6s forwards";
		setTimeout(function()
		{	
			document.getElementById("7-4").style.animation="hamUp2 0.6s forwards";
			document.getElementById("7-2h").style.animation="hangerUp3 0.6s forwards";
			refresh();
			document.getElementById("p7-2").style.visibility="visible";
			document.getElementById("p7-2").innerHTML=released-1;
			setTimeout(function()
			{
				document.getElementById("p7-2").style.animation="rollNum2 0.3s forwards";
				document.getElementById("7-4").style.animation="hamDown1 0.3s forwards";
				document.getElementById("p7-1").innerHTML=released;
				document.getElementById("p7-1").style.animation="rollNum 0.3s forwards";
				if(released<15)
				{
					setTimeout(function()
					{
						relaeseHammer2();
					},200);
				}
				else if(released>=15 && flag2==true)
				{
					flag2=false;
					setTimeout(function()
					{
						document.getElementById("sound").mute= true;
						document.getElementById("7-2h").style.animation="hangerDown2 0.6s forwards";
						setTimeout(function()
						{
							document.getElementById("7-4").style.animation="hamUp2 0.6s forwards";
							document.getElementById("7-2h").style.animation="hangerUp3 0.6s forwards";
							setTimeout(function()
							{
								document.getElementById("sound").pause();
								document.getElementById("ball").style.visibility="visible";
								myInt=setInterval(function(){animatearrow();},500);
								document.getElementById("arrow1").style="visibility:visible; position:absolute; left:640px; top:187px; height:30px; z-index:10;";
								document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)";
								document.getElementById("arrow1").style.msTransform="rotate(270deg)";
								document.getElementById("arrow1").style.transform="rotate(270deg)";
								
									// document.getElementById("7-52").style.visibility="hidden";
									// document.getElementById("7-2").style.visibility="visible";
									document.getElementById("gate").style.visibility="visible";
									// document.getElementById("p7-3").style.visibility="visible";
									document.getElementById("ball").style.visibility="visible";
									document.getElementById("ball").onclick = function()
									{
										myStopFunction();
										document.getElementById("ball").onclick = "";
										document.getElementById("ball").style.animation = "screwPlace 0.6s forwards";
										setTimeout(function()
										{
											document.getElementById("ball").style.visibility="hidden";
											document.getElementById("gate").style.visibility="hidden";
											document.getElementById("7-2").style.visibility="visible";
											document.getElementById("7-5").style.visibility="visible";
											document.getElementById("nextButton").style.visibility="visible";
											document.getElementById("7-2h").style.visibility="hidden";
											document.getElementById("p7-1").style.visibility="hidden";
											document.getElementById("p7-2").style.visibility="hidden";
											document.getElementById("grey1").style.visibility="hidden";
											document.getElementById("grey2").style.visibility="hidden";										
										},600);
									}
								},600);
							},600);
						// }
					},500);
				}
			},600);
		},600);
		// document.getElementById("7-4").style.animation="hamDown1 0.5s forwards";
	// }
}

var runOnce=true;
function placeScrew()
{
	let currentDroppable = null;
    
	
    ball.onmousedown = function(event) {
	if(runOnce)
	{
		myStopFunction();
	  myInt=setInterval(function(){animatearrow();},500);
	  document.getElementById("arrow1").style="visibility:visible; position:absolute; left:443px; top:241px; height:30px; z-index:10;";
	  document.getElementById("arrow1").style.WebkitTransform="rotate(36deg)";
	  document.getElementById("arrow1").style.msTransform="rotate(36deg)";
	  document.getElementById("arrow1").style.transform="rotate(36deg)";
	  
	  document.getElementById("p7-3").style="position:absolute; left:441px; top:230px; font-size:13px;";
	  document.getElementById("p7-3").innerHTML="Drop the screw here";
	}								
      let shiftX = event.clientX - ball.getBoundingClientRect().left;
      let shiftY = event.clientY - ball.getBoundingClientRect().top;

      ball.style.position = 'absolute';
      ball.style.zIndex = 1000;
      document.body.append(ball);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        ball.style.left = pageX - shiftX + 'px';
        ball.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        ball.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        ball.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable');
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) { // null when we were not over a droppable before this event
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) { // null if we're not coming over a droppable now
            // (maybe just left the droppable)
            enterDroppable(currentDroppable);
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      ball.onmouseup = function() {
		  myStopFunction();
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
      };

    };

    function enterDroppable(elem) {
		runOnce=false;
		myStopFunction();
		document.getElementById("p7-3").style.visibility="hidden";
		document.getElementById("ball").style.visibility="hidden";
		document.getElementById("gate").style.visibility="hidden";
		document.getElementById("7-2").style.visibility="visible";
		document.getElementById("7-5").style.visibility="visible";
		document.getElementById("nextButton").style.visibility="visible";
		document.getElementById("7-2h").style.visibility="hidden";
		document.getElementById("p7-1").style.visibility="hidden";
		document.getElementById("p7-2").style.visibility="hidden";
		document.getElementById("grey1").style.visibility="hidden";
		document.getElementById("grey2").style.visibility="hidden";
		
     // elem.style.background = 'black';
    }

    function leaveDroppable(elem) {
      elem.style.background = '';
	  myStopFunction();
		document.getElementById("p7-3").style.visibility="hidden";
		document.getElementById("ball").style.visibility="hidden";
		document.getElementById("gate").style.visibility="hidden";
		document.getElementById("7-2").style.visibility="visible";
		document.getElementById("7-5").style.visibility="visible";
		document.getElementById("7-2h").style.visibility="hidden";
		document.getElementById("nextButton").style.visibility="visible";
		document.getElementById("p7-1").style.visibility="hidden";
		document.getElementById("p7-2").style.visibility="hidden";
		document.getElementById("grey1").style.visibility="hidden";
		document.getElementById("grey2").style.visibility="hidden";
    }

    ball.ondragstart = function() {
      return false;
    };
}
function screen2Proceed()
{
	myInt=setInterval(function(){ animatearrow(); }, 500);
		document.getElementById("arrow1").style="visibility:visible; position:absolute; left:330px; top:335px; height:40px; z-index:10; ";
		document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)";
		document.getElementById("arrow1").style.msTransform="rotate(270deg)";
		document.getElementById("arrow1").style.transform="rotate(270deg)";
		document.getElementById("2-2").onclick=function()
		{
			myStopFunction();
			document.getElementById("2-2").onclick="";
			document.getElementById("2-2").style.animation="moveSeive10 1s forwards";
			setTimeout(function(){
				myInt=setInterval(function(){animatearrow();},500);
				document.getElementById("arrow1").style="visibility:visible; position:absolute; left:540px; top:335px; height:40px; z-index:10; ";
				document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)";
				document.getElementById("arrow1").style.msTransform="rotate(270deg)";
				document.getElementById("arrow1").style.transform="rotate(270deg)";
				document.getElementById("2-3").onclick=function()
				{
					myStopFunction();
					document.getElementById("2-3").onclick="";
					document.getElementById("2-3").style.animation="moveSeive12 1s forwards";
					setTimeout(function(){
						document.getElementById("2-4").style.visibility="visible";
					},1250);
					setTimeout(function(){
						myInt=setInterval(function(){animatearrow(); },500);
						document.getElementById("arrow1").style="visibility:visible; position:absolute; left:390px; top:225px;height:40px; z-index:10;";
						document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
						document.getElementById("arrow1").style.msTransform="rotate(360deg)"
						document.getElementById("arrow1").style.transform="rotate(360deg)"
						document.getElementById("2-4").onclick=function()
						{
							myStopFunction();
							document.getElementById("2-4").onclick="";
							document.getElementById("2-4").style.transformOrigin="100% 80%";
							document.getElementById("2-4").style.animation="shiftCa2 1s forwards";
							setTimeout(function()
							{
								document.getElementById("2-4").style.visibility="hidden";
								document.getElementById("2-5").style.visibility="visible";
								document.getElementById("2-3").src = "images/filled125.png";
								setTimeout(function()
								{
									document.getElementById("2-6").style.visibility="visible";
									myInt=setInterval(function(){animatearrow();},500);
									document.getElementById("arrow1").style="visibility:visible; position:absolute; left:450px; top:200px; height:40px; z-index:10;";
									document.getElementById("arrow1").style.WebkitTransform="rotate(360deg)"
									document.getElementById("arrow1").style.msTransform="rotate(360deg)"
									document.getElementById("arrow1").style.transform="rotate(360deg)"
									document.getElementById("2-6").onclick=function()
									{
										myStopFunction();
										document.getElementById("2-6").onclick="";
										document.getElementById("2-6").style.animation="shiftCap 1s forwards";
										setTimeout(function(){
											document.getElementById("nextButton").style.visibility="visible";
										},1000);
									}
								},500);
							},1000);
						}
					},1800);
				}
			},1000);
		}	
}
function screen5Proceed()
{
	document.getElementById("nextButton").style.visibility = "visible";
}
function screen9Proceed()
{
		document.getElementById("9-10").style.visibility = "visible";

	setTimeout(function(){
			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:437.5px; top:470px; height: 30px; z-index: 10;";
			document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)"; 
		     // Code for IE9
			document.getElementById("arrow1").style.msTransform = "rotate(90deg)"; 
		     // Standard syntax
			document.getElementById("arrow1").style.transform = "rotate(90deg)";
			document.getElementById("9-9a").onclick=function()
			{
				myStopFunction();
				document.getElementById("9-9a").onclick="";
				document.getElementById("9-9a").style.visibility="hidden";
				setTimeout(function()
				{
					document.getElementById("p9-2").style.visibility = "visible";
					document.getElementById("p9-2").innerHTML="150.00";
				},650);
				document.getElementById("9-9").style.backgroundColor="lightgrey";
				setTimeout(function()
				{
					myInt = setInterval(function(){ animatearrow(); }, 500);
					document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:542.5px; top:470px; height: 30px; z-index: 10;";
					document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)"; 
					// Code for IE9
					document.getElementById("arrow1").style.msTransform = "rotate(90deg)"; 
					// Standard syntax
					document.getElementById("arrow1").style.transform = "rotate(90deg)";
					document.getElementById("9-9b").onclick=function(){
					myStopFunction();
					document.getElementById("9-9b").onclick="";
					document.getElementById("9-9b").style.visibility="hidden";
					document.getElementById("p9-2").innerHTML="00.00";
					setTimeout(function(){
							myInt=setInterval(function(){animatearrow();},500);
							document.getElementById("arrow1").style="visibility:visible; position:absolute; left:110px; top:320px; height:40px; z-index:10;";
							document.getElementById("arrow1").style.WebkitTransform="rotate(270deg)"
							document.getElementById("arrow1").style.msTransform="rotate(270deg)"
							document.getElementById("arrow1").style.transform="rotate(270deg)"
							document.getElementById("9-41").onclick=function()
							{
							  myStopFunction();
							  document.getElementById("9-41").style.visibility = "hidden"
							  document.getElementById("9-41a").style.visibility = "visible";
							  document.getElementById("9-41a").style.animation="movePan 1.5s forwards";
							   document.getElementById("p9-1").style.visibility="visible";
							   setTimeout(function(){
								document.getElementById("9-41a").style.visibility = "hidden";
								document.getElementById("9-41b").style.visibility = "visible";
								document.getElementById("9-41b").style.animation="panRotate 1s forwards";
								setTimeout(function()
								{
									document.getElementById("9-41b").style.visibility = "hidden";
									document.getElementById("9-10").style.visibility = "hidden";
									document.getElementById("9-10a").style.visibility = "visible";
								   document.getElementById("p9-1").innerHTML="Weight of aggregate passing through 2.36mm sieve (W<sub>3</sub>)=<span style='border-bottom-style:double'> "+data[2][p]+".00</span> g";
								   document.getElementById("p9-2").innerHTML=" "+data[2][p]+".00";
								   document.getElementById("nextButton").style.visibility="visible";
								},1000);
							   },1600);
							}
						},1000);
						}
				},750);
			}
		},500);
	
}

function checkResult()
{
	var idd = document.getElementById("res");
	var idd1 = document.getElementById("chk");
	var ansId = document.getElementById("rightAns");
	document.getElementById("alertId").style.visibility = "hidden";
	document.getElementById("alertId").style.animation = "";
	if(!idd.value  || !idd.value!=" ")
	{
		document.getElementById("alertId").style.visibility = "visible";
		document.getElementById("alertId").style.animation = "blink_effect 1s infinite";
	}
	else if(Math.round(idd.value) != Math.round(itv))
	{
		qCount++;
		blinkStop();
		idd.style.borderColor = "red";
		ansId.style.color = "red";
		ansId.innerHTML= "&#10008;";
		ansId.classList.remove("resultStyle");
		if(qCount == 2)
		{
			idd1.value = "RESULT";
		}
		if(qCount == 3)
		{
			idd1.style.visibility = "hidden";
			idd.parentNode.removeChild(idd);
			ansId.classList.add("resultStyle");
			ansId.style.color = "black";
			ansId.innerHTML= itv.toFixed(2)+"%";
			var q2 = Object.create(questions);																								
			generateQuestion(q2,"Classify the aggregate based on the impact test value : ","","Exceptionally Strong","Strong","Satisfactory for road surfacing","Weak for road surfacing",1,finalStatement,450,300,250,150);
		}
	}
	else
	{
		idd1.style.visibility = "hidden";
		idd.parentNode.removeChild(idd);
		ansId.classList.add("resultStyle");
		ansId.style.color = "black";
		ansId.innerHTML= itv.toFixed(2)+"%<span style='color:green'>&#10004;</span>";
		var q2 = Object.create(questions);																								
		generateQuestion(q2,"Classify the aggregate based on the impact test value : ","","Exceptionally Strong","Strong","Satisfactory for road surfacing","Weak for road surfacing",1,finalStatement,450,300,250,150);
	}
}
//To set the questions division
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}
function generateQuestion1(qObject,qn,op1,op2,op3,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions1(op1,op2,op3);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}
function finalStatement()
{
	// document.getElementById("hintspan").style.visibility = "hidden";
	//Source of inference: http://gnindia.dronacharya.info/CIVIL/Downloads/Labmanuals/transpo_lab_manual_VSem.pdf
	document.getElementById("p8-1").style.visibility = "visible";
	if(inCount == 1 || inCount == 2)
		document.getElementById("p8-1").innerHTML = "Since the impact value of aggregate is in the range of "+inferenceData[0][inCount]+"%, It is classified under toughness property: <span style='color:red'>"+inferenceData[1][inCount]+'</span>';
	else if(inCount == 0 || inCount == 4)
		document.getElementById("p8-1").innerHTML = "Since the impact value of aggregate is "+inferenceData[0][inCount]+"%, It is classified under toughness property: "+inferenceData[1][inCount];
	document.getElementById("p8-1").style.animation  ="slidePara 2s forwards";
}
function blinkStop()
{
	document.getElementById("alertId").style.visibility = "hidden";
	document.getElementById("alertId").style.animation = "";
}
function refresh()
{
	myStopFunction();
	document.getElementById("5-5").style.animation="";
	document.getElementById("5-6").style.animation="";
	document.getElementById("5-6t").style.transformOrigin="";
	document.getElementById("5-6t").style.animation="";
	document.getElementById("5-7l").style.animation="";
	document.getElementById("p7-1").style.animation="";
	document.getElementById("p7-2").style.animation="";
}