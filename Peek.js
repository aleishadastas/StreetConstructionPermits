
// The reference to the section in our HTML
let parentElement = document.getElementById('container')

$.ajax({
    url: "https://data.cityofnewyork.us/resource/tqtj-sjs8.json",
    type: "GET",
    data: {
      "$limit" : 50,
      "$$app_token" : "VQYOxWMyTXFdeYzoFWdIBFATz"
    }
}).done(function(data) {
  // alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
  
		for(let i =0; i < data.length; i++){

      console.log(data[0]) //console logging data .keyvalue [0] = first item in the data
			let newDiv = document.createElement('div')

      // let minHeight = 5;
      let randomHeight = Math.random() * 54
      let randomWidth = Math.random() * 27
      let randomRotation = Math.floor(Math.random() * 151) - 75; // random angle between -75 and 75 degrees
      let randomZIndex = Math.floor(Math.random() * 10) + 1; // random number between 1 and 50
      
      newDiv.style.position = 'absolute' 
      newDiv.style.left = `${randomHeight}vw`
      newDiv.style.top = `${randomWidth}vw`
      newDiv.style.transform = `rotate(${randomRotation}deg)`;
      newDiv.style.zIndex = '-3'


			newDiv.innerHTML =
			`<div class="permit">
      <div class="lines">
       <div id="line1"></div>
       <div id="line2"></div>
       <div id="line3"></div>
       </div>
            <div id="number"><h1>Permit Number:</h1><p>${data[i].permitnumber}</p> </div>
            <div id="date"> <h1>Issue Date:</h1><p>${moment(data[i].permitissuedate).subtract(10, 'days').calendar()}</p></div>
            <div id="purpose"> <h1>Permit Purpose:</h1><p>${data[i].permittypedesc ? data[i].permittypedesc : "N/A"}</p></div>
            <div id="type"> <h1>Permit Type:</h1><p>${data[i].applicationtypeshortdesc}</p></div>
            <div id="street"> <h1>Street Name:</h1><p>${data[i].onstreetname}</p></div>
            <div id="permittee"> <h1>Permittee:</h1><p>${data[i].permitteename}</p></div>
            </div>
            `

			if(data[i]) {
        newDiv.style.fontFamily = "Bando";
        newDiv.style.marginTop = "5vw";
        newDiv.style.marginRight = "2vw";
        newDiv.style.marginBottom = "5vw";
        newDiv.style.marginLeft = "2vw";
			}

				parentElement.append(newDiv) //parenting html to section
		}
	});
