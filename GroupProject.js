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
When an item is dragged over such as pizza give an alert
box that gives a choice for the size of the pizza or toppings 
if it is a custom pizza
add values to each size that adds up to a total price
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
function Drop( Takeout, Cart )
{
  //get id of element being dragged
    var ItemID = Takeout.dataTransfer.getData( "text/html" );

    //copy drag element and put it in the drop box
    Takeout.target.appendChild( document.getElementById( ItemID ).cloneNode( true ));

   //prevent browser from defaulting to not drops
    Takeout.preventDefault();

   // AddPrice();
}

function AddPrice( Price )
{
    // get price element and price value
    var SourcePrice = document.querySelector( "div[id=\"source\"] div[id=\"" + Price + "\" ]")
    var PriceValue = SourcePrice.getAttribute( "data-price-value" );

    // get existing price in calculator
    var DestinationPrice = document.querySelector( "div[id=\"destination\"] div[id=\"" + Price + "\" ]")

    // check for no price found
    if (null == DestinationPrice)
    {

        // add a new price
        DestinationPrice = document.createElement( "DIV" );

        // set the element attributes
        DestinationPrice.setAttribute("id", Price);
        DestinationPrice.setAttribute("class","price");
        DestinationPrice.setAttribute("data-price-value", PriceValue);
        DestinationPrice.setAttribute("data-count", 1);

        //add text for price in the calculator (not needed)
       // DestinationPrice.innerHTML = Price + "<br />(1)";

        // add the element to the destination div
        document.querySelector("div[id=\"destination\"]" ).appendChild( DestinationPrice );

    }
    else
    {
        //update existing price
        var Count = Number( DestinationPrice.getAttribute( "data-count")) + 1;
        DestinationPrice.setAttribute( "data-count", Count);
        //DestinationPrice.innerHTML = Price + "<br />(" + Count + ")";
    }

    ComputePrice();
}

function ComputePrice()
{
    //get the list of prices
    var PriceList = document.querySelectorAll("div[id=\"destination\"] div");

    // initialize price
    var Price = 0.0;
    var Count = 0;

    //total the point values
    for (var i =0; i<PriceList.length; i++ )
    {
    // add price values and count
    Price += PriceList[i].getAttribute( "data-price-value") *
             PriceList[i].getAttribute( "data-count");
    Count += Number( PriceList[i].getAttribute( "data-count"));
    }

    //divide by how many
   // Price /= Count;

    //get the output 
    document.querySelector("div[id=\"destination\"] + h2").innerHTML = "Your Total Price is: $" + Price;
}