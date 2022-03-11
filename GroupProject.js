/*Add Categories using AJAX 
Categories are All Items Pizzas, wings, sides, and drinks
*/
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