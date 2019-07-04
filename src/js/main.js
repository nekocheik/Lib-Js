


//Color generation:
function colorize() {
  return Math.floor(Math.random() * 200 + 20);
}

function colorSet() {
  var html = "rgb(";
  var blue = colorize();
  var green = colorize();
  var red = colorize();
  if (blue + green + red < 100 || blue + green + red > 700) {
    colorSet();
  } else {
    return (html += red + "," + green + "," + blue + ")");
  }
}

const body = document.querySelector('main');

for (let i = 0; i < 100 ; i++) {
  let div = document.createElement('div');
  div.style.backgroundColor = `${colorSet()}`;
  body.append(div)
}


//typical import
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";

// //or get to the parts that aren't included inside TweenMax:
import ScrollToPlugin from "gsap/ScrollToPlugin";

class scrollControlled {

  constructor( scrollSpeed , page , sensibility = 1.5  ){

      this.scrollSpeed = scrollSpeed;
      this.canWheel = false;
      this.index = 1;
      this.element = page;
      this.pageLength = window.innerHeight ;
      this.newPosition  = window.innerHeight ;
      this.sensibility = sensibility ;
      this.maxPageLength = this.getMaxLength();
      this.halfLength =  this.getHalfLength();
      TweenMax.set( window ,{scrollTo: 0});
      this.view();
      console.log(this)

  }
  
  view(){
  
    // window.onresize = (e)=> { 
    //   this.resize();
    //  };

    window.fullscreenchange = (e)=> { 
      this.resize();
     };

    document.querySelector('main').addEventListener('wheel' , (e)=>{
      if ( this.canWheel ) {
        e.preventDefault();
      }
      if ( !this.canWheel ) {
        this.scroll();
      }
    });
   }
  
  scroll( ){
    console.log(  this.newPosition + this.halfLength <=  window.scrollY  + window.innerHeight )
    if (  this.newPosition + this.halfLength <=  window.scrollY  + window.innerHeight ) {
      this.canWheel = true,
      this.index++;
      this.newPosition =  this.pageLength  * this.index ;
      TweenMax.set( window ,{scrollTo: this.newPosition });
      // TweenMax.to( window , 0.1 ,{ scrollTo : this.newPosition - this.halfLength , ease: Power3.easeOut });
      setTimeout(() => {
        this.canWheel = false;
      }, 1000 );
    }

    // if( this.newPosition >= this.halfLength ){
    //   this.index--;
    //   this.newPosition -= this.pageLength ; 
    //   this.render()
    // }
  
  }

  render(){
    TweenMax.to( window , this.scrollSpeed ,{ scrollTo : this.newPosition , ease: Power3.easeOut });
  }



  // resize(){
  //   this.pageLength =  this.element.innerHeight ;
  //   this.newPosition =  this.pageLength * this.index ;
  //   this.maxPageLength = this.getMaxLength();
  //   TweenMax.to( window , this.scrollSpeed ,{ scrollTo :  this.newPosition , ease: Power3.easeOut });
  //  }


   getMaxLength(){
     let body = document.querySelector('body')
     return body.clientHeight;
   }

   getHalfLength(){
    return window.innerHeight / this.sensibility ;
   }

   scrollDown(){
    this.index++;
    this.newPosition += this.pageLength ;
    TweenMax.to( window , this.scrollSpeed ,{ scrollTo : this.newPosition , ease: Power3.easeOut });
   }
    
}

new scrollControlled( 1.2  , document.querySelector('body') , 9  )

export {  scrollControlled }