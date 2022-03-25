/*Add Categories using AJAX 
Categories are All Items Pizzas, wings, sides, and drinks
*/
debugger;
function GetCategory(CategoryFileName)
{
    //local variable
    var xmlhttp;

    //create request depending on browser type
    if ( window.XMLHttpRequest )
    {
        //IE7+, Firefox, Chrome, anything made after 2006 etc.
        xmlhttp = new XMLHttpRequest;
    }
    else
    {
        //IE6 and earlier ActiveX object
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP" );
    }
    // set callback function to change html in the section id menucategory

    xmlhttp.onreadystatechange = function ()
    {
        // check for good return
        if ((xmlhttp.readyState == 4) &&
        ( xmlhttp.status == 200))
        {
            // add recieved html into the menucategory section
            document.getElementById( "menucategory").innerHTML = xmlhttp.responseText;
        }
    }   

    //HTTP GET request
    xmlhttp.open("GET", CategoryFileName, true);

    //send request to server
    xmlhttp.send();
    //End of AJAX function
}

/* Add takeout menu drag and drop functionality
Drag item name to add to cart double click to remove
*/

// drag the item 
function Drag( Takeout )
{
    Takeout.dataTransfer.setData( "text/html", Takeout.target.id );

}
// allow a drop into the element
function AllowDrop( Takeout )
{
    // prevent the browser from defaulting to not drag
    Takeout.preventDefault();
}
// handle dropping here
function Drop( Takeout, DestinationID )
{
  //get id of element being dragged
    var ItemID = Takeout.dataTransfer.getData( "text/html" );
  //  document.getElementById( DestinationID ).innerHTML( document.getElementById( ItemID ));


   //prevent browser from defaulting to not drops
    Takeout.preventDefault();
// Call function after Item is dropped call by ID
    AddPrice(ItemID);
}

function AddPrice( Price)
{
    // get price element and price value
    
    var SourcePrice = document.querySelector( "div[id=\"source\"] div[id=\""+Price+"\"]")
    var PriceValue = SourcePrice.getAttribute( "data-price-value" );

    // get existing price in calculator
    var DestinationTakeout = document.querySelector("div[id=\"TakeoutBox\"] div[id=\"" + Price + "\"]")
    // check for no price found
   if (null == DestinationTakeout)
    {

        // add a new price
        DestinationTakeout = document.createElement( "DIV" );

        // set the element attributes
        DestinationTakeout.setAttribute("id", Price);
        DestinationTakeout.setAttribute("class","price");
        DestinationTakeout.setAttribute("data-price-value", PriceValue);
        DestinationTakeout.setAttribute("data-count", 1);

       

        // add a handler for double clicks
        DestinationTakeout.addEventListener( "dblclick", function () { RemovePrice( Price ); } );        

        //add text for price in the calculator ( used ID from Price Variable)
       DestinationTakeout.innerHTML = document.getElementById(Price).innerHTML + "<p class ='menuitem' >(1)</p>" ;

        // add the element to the destination div
        document.querySelector("div[id=\"TakeoutBox\"]" ).appendChild( DestinationTakeout );

    }
    else
    {
        //update existing price
        var Count = Number( DestinationTakeout.getAttribute( "data-count")) + 1;
        DestinationTakeout.setAttribute( "data-count", Count);
       DestinationTakeout.innerHTML = document.getElementById(Price).innerHTML + "<p class ='menuitem' >("+Count+")</p>" ;
    } 
    
    ComputePrice();
}

function ComputePrice()
{
    //get the list of prices
    var PriceList = document.querySelectorAll("div[id=\"TakeoutBox\"] div");

    // initialize price
    var Total = 0.0;
    var Count = 0;

    //total the point values
    for (var i =0; i<PriceList.length; i++ )
    {
    // add price values and count
    Total += PriceList[i].getAttribute( "data-price-value") *
             PriceList[i].getAttribute( "data-count");
    Count += Number( PriceList[i].getAttribute( "data-count"));
    }


    //get the output 
    document.querySelector("div[id=\"destination\"] + h2").innerHTML = "Your Total Price is: $" + Total;
}


// remove price function
function RemovePrice( Price )
{
  
  // prompt the user
  var Result = window.confirm( "Remove the Item?" );  
  
  // process based on the result
  if ( Result == true )
  {
      // get the existing grade in the calculator
      var DestinationTakeout= document.querySelector("div[id=\"TakeoutBox\"] div[id=\"" + Price + "\"]")

      // drop the count down by one
      var Count = Number( DestinationTakeout.getAttribute( "data-count" )) - 1;
          

  } 


   
  
  // see if it is the last
    if ( 0 == Count )
  {
    
      // remove the node
       DestinationTakeout.parentNode.removeChild( DestinationTakeout);

  }
  else
  {
    
      // update the count
      DestinationTakeout.setAttribute( "data-count", Count );
      DestinationTakeout.innerHTML = document.getElementById(Price).innerHTML + "<p class ='menuitem' >("+Count+")</p>" ;      
  }  
  
    ComputePrice();

}

