$(document).ready(function() {

  // AJAX loader
  function loadData(element){
    $.ajax({
          type: "GET",
          url: "data.xml",
          dataType: "xml",
          success: function(xml){
            var ids = xml.getElementsByTagName("id");
            var found = false;
            var itemName, itemPrice, stock,
                sellerInfo, desc;

            // Match item
            for(var i = 0; i < ids.length; i++){
              if(ids[i].childNodes[0].nodeValue == element.id){
                itemName = xml.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                itemPrice = xml.getElementsByTagName("price")[i].childNodes[0].nodeValue;
                stock = xml.getElementsByTagName("in-stock")[i].childNodes[0].nodeValue;
                sellerInfo = xml.getElementsByTagName("seller-info")[i].childNodes[0].nodeValue;
                desc = xml.getElementsByTagName("desc")[i].childNodes[0].nodeValue;
                found = true;
                break;
              }
            }

            if(found){
              // Update HTML
              $("#item-name").text(itemName);
              $("#item-price").text(itemPrice);
              $("#in-stock").text(stock);
              $("#seller-info").text(sellerInfo);
              $("#item-desc").text(desc);
            }else{
              $("#item-name").text("Item Not Found");
              $("#item-price").text("-");
              $("#in-stock").text("-");
              $("#seller-info").text("-");
              $("#item-desc").text("-");
            }
          }
        });
  }

  var moveLeft = 20;
  var moveDown = 10;

  // Hover/mouseover function
  $('.trigger').hover(
  	function(e) {
      // Call a function to load data
      loadData(this);

      // Toggle pop up
      $('#pop-up').toggle();
    });

  $('.trigger').mousemove(function(e) {
    $("#pop-up").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
  });
});