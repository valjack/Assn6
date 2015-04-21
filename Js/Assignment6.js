function MenuChoice()
 {
    if (document.getElementById("menu").value=="Create Customer")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value =="Change Ship-To Address")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value =="Delete Customer")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
    }
    
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        
    }
 }

function CreateCustomer()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";

    // Collect Customer data from web page
    var custid = document.getElementById("customerid").value;
    var custname = document.getElementById("customernm").vaue;
    var custcity = document.getElementById("customercity").value;
    
    //Create the parameer string
    var newcustomer = '{"CustomerID":"'+ custid +'","CompanyName":"'+custname+'","City":"'+custcity+'"}';
    
    
    //Checking for AJAX operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
    
}

function OperationResult(output)
{
    if (output.WasSuccessful==1)
    {
        document.getElementById("result").innerHTML = "The operation completed successfully!"
    }
    else
    {
        document.getElementById("result").innerHTML = "The operation was not successful!"
        + "<br>" + output.Exception;
    }
}

function ChangeShipToAddress()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";

    // Collect Customer data from web page
    var orderid = document.getElementById("ordernumber").value;
    var shippingname = document.getElementById("shiptoname").value;
    var shipaddress = document.getElementById("shiptoaddr").value;
    var shipcty = document.getElementById("shiptocity").value;
    var shippostcode = document.getElementById("shiptopostal").value; 
    
    
    //Create the parameer string
    var newshipaddr = '{"OrderID":"'+ orderid +'","ShipName":"'+shippingname +'","ShipAddress":"'+shipaddress
    +'","ShipCity":"'+shipcty +'","ShipPostcode":"'+shippostcode+'"}';
    
    
    //Checking for AJAX operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var results = JSON.parse(objRequest.responseText);
            ShipOpResult(results);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newshipaddr);
    
}

function ShipOpResult(outpt)
{
    
    if (outpt == 1)
    {
        document.getElementById("results").innerHTML = "The operation completed successful!"
    }
    else if (outpt== (-2))
    {
      document.getElementById("results").innerHTML = "The operation was not successful!"
      + "<br>" + "Operation failed because the data string supplied could not be deserialized into the sevice object";
    }
    else if (outpt == (-3))
    {
      document.getElementById("results").innerHTML = "The operation was not successful!"
      + "<br>" + "Operation failed because a record with the supplied Order ID could not be found.";
    }
    else
    {
        document.getElementById("results").innerHTML = "The operation was not successful!"
        + "<br>" +"Operation failed with an unspecified error.";
    }
}

function DeleteCustomer()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object

    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    url+= document.getElementById("custid").value;
    document.getElementById("delcustresult").innerHTML = objRequest;
     
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4&& objRequest.status == 200)
        {
            var custid = JSON.parse(objRequest.responseText);
            DeleteResult(result);
        }
    }
    //Initiate the server request
    objRequest.open("GET",url,true);
    objRequest.send();
}

function DeleteResult(deloutput)
{
   var count = 0;
    for (count=0; count < custid;count++);
    var displaytext = "";
    
    //Loop to extract data from the response object
    for(count=0;count<deloutput.DeleteCustomersResult.length;count++);
    {
      var r=confirm("Are you sure you want to delete?");
    }
    if (r==true)
   {
      deloutput.DeleteCustomerResult.customerID;
   }
   else 
   {
      return false
   }
   if (deloutput.WasSuccessful==1)
    {
      document.getElementById("result").innerHTML = "The operation completed successfully!"
    }
    else
    {
      document.getElementById("result").innerHTML = "The operation was not successful!"
      + "<br>" + deloutput.Exception;
    }
}



