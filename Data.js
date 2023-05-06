
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
      let specificString = 'repair'


      // let minHeight = 5;
      let randomHeight = Math.random() * 54
      let randomWidth = Math.random() * 27
      let randomRotation = Math.floor(Math.random() * 151) - 75; // random angle between -75 and 75 degrees
      let randomZIndex = Math.floor(Math.random() * 10) + 1; // random number between 1 and 10
      
      newDiv.style.position = 'absolute' 
      newDiv.style.left = `${randomHeight}vw`
      newDiv.style.top = `${randomWidth}vw`
      newDiv.style.transform = `rotate(${randomRotation}deg)`;
      newDiv.style.zIndex = randomZIndex;


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
            
// Making the permits draggable + disappear on drop
$(newDiv).draggable({
  stack: ".permit",
  start: function(event, ui) {
    $(".permit").css("zIndex", "9999 * 50"); //high zIndex when dragging starts
  },
  stop: function(event, ui){
    $(".permit").css("height", "auto");
    $(".permit").css("zIndex", "9999 * 50"); //zIndex back to original value when dragging stops
    
    // Element is deleted once dropped on the right 1/6 of the page
    if (ui.position.left + $(this).width() > $(window).width() * 5 / 6) {
      $(this).css("opacity", "0%"); // Set opacity to 0%
    }
  },
  // Mobile Touch event handling
  touchAction: 'none'
});

    

      // FAIl Drag & Drop Disappear
      // $('.my-shape').on('drop', function(event, ui) {
      //   ui.draggable.remove();
      // });
      

      
// CARD FLIP FAIL :(
      // newDiv.addEventListener('mouseover', function() {
      //   // hide contents of newDiv
      //   newDiv.style.display = 'none';
      // });
      
      // newDiv.addEventListener('mouseout', function() {
      //   // show contents of newDiv
      //   newDiv.style.display = 'block';
      // });

      // newDiv.addEventListener('mouseover', function() {
      //   console.log('mouseover event triggered');
      //   // hide contents of newDiv
      //   this.querySelectorAll('.lines, #number, #date, #purpose, #type, #street, #permittee').forEach(element => {
      //     element.style.display = 'none';
      //   });
      // });
      
      // newDiv.addEventListener('mouseout', function() {
      //   // show contents of newDiv
      //   this.querySelectorAll('.lines, #number, #date, #purpose, #type, #street, #permittee').forEach(element => {
      //     element.style.display = 'block';
      //   });
      // });
      
      // PERMIT STAMPS - HOVER + AUDIO
      let chosenSvg;
      let chosenAudio;
      
      newDiv.addEventListener('mouseover', function() {
        if (newDiv.innerHTML.includes('p')) {
          if (!chosenSvg) { 
            let randomNum = Math.random(); // random number between 0 and 1 to show svg
            if (randomNum < 0.8) { // if the number is less than 0.8 or less than 80%, show svg1
              let svg1 = this.querySelector('.approved');
              if (!svg1) {
                svg1 = document.createElement('img');
                svg1.src = 'APPROVED.svg';
                svg1.style.position = 'absolute';
                svg1.style.bottom = '-1vw';
                svg1.style.right = '-1vw';
                svg1.style.width = '27vw';
                svg1.style.height = 'auto';
                // svg1.style.transform = 'rotate(-0deg)';
                this.appendChild(svg1);
              } else {
                svg1.style.display = 'block';
              }
              let audio1 = this.querySelector('.audio1');
              if (!audio1) {
                audio1 = document.createElement('audio');
                audio1.src = 'approved.mp3';
                audio1.addEventListener('canplaythrough', function() {
                  audio1.play();
                });
                this.appendChild(audio1);
              } else {
                audio1.currentTime = 0;
                audio1.play();
              }
              chosenSvg = svg1;
              chosenAudio = audio1;
            } else { // otherwise show as denied, denied svg
              let svg2 = this.querySelector('.denied');
              if (!svg2) {
                svg2 = document.createElement('img');
                svg2.src = 'DENIED.svg';
                svg2.style.position = 'absolute';
                svg2.style.bottom = '-3.5vw';
                svg2.style.right = '-2.5vw';
                svg2.style.width = '30vw';
                svg2.style.height = 'auto';
                svg2.style.transform = 'rotate(-110deg)';
                this.appendChild(svg2);
              } else {
                svg2.style.display = 'block';
              }
              let audio2 = this.querySelector('.audio2');
              if (!audio2) {
                audio2 = document.createElement('audio');
                audio2.src = 'denied.mp3'
                audio2.addEventListener('canplaythrough', function() {
                  audio2.play();
                  audio2.volume = 0.5;
                });
                this.appendChild(audio2);
              } else {
                audio2.currentTime = 0;
                audio2.play();
                audio2.volume = 0.5;
              }
              chosenSvg = svg2;
              chosenAudio = audio2;
            }
          } else { // show SVG as block when displayed
            chosenSvg.style.display = 'block';
            chosenAudio.play();
          }
        }
      });
      
      newDiv.addEventListener('mouseout', function() {
        if (chosenAudio) {
          chosenAudio.pause();
        }
      });
      
      // Mouseout audio eventlistener - plays only once
      newDiv.addEventListener('mouseout', function() {
        if (chosenSvg) {
          chosenSvg.style.display = 'none';
        }
        let audio1 = this.querySelector('.audio1');
        if (audio1) {
          audio1.pause();
          audio1.currentTime = 0;
        }
        let audio2 = this.querySelector('.audio2');
        if (audio2) {
          audio2.pause();
          audio2.currentTime = 0;
        }
      });
      
      
			if(data[i]) {
        newDiv.style.fontFamily = "Bando";
        newDiv.style.marginTop = "5vw";
        newDiv.style.marginRight = "1vw";
        newDiv.style.marginBottom = "6vw";
        newDiv.style.marginLeft = "2vw";
			}

				parentElement.append(newDiv) //parenting html to section
		}
	});


//Notes: generate random values for z-index, rotation, etc. + absolute positioning - be specific with ranges! bc it opens in different directions everytime