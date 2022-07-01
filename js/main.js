$(window).on('load', function () {
    $("#coverScreen").hide();});
    
    $(function () {
      $(document).scroll(function () {
        var $nav = $(".fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop () > $nav.height());
      });
    });
    
    $(window).scroll(function() {
      $('.fadedfx').each(function(){
      var imagePos = $(this).offset().top;
    
      var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow+500) {
          $(this).addClass("fadeIn");
        }
      });
    });



$(function() {
  var availableTags = ["Ortel","A32","A03","Poco","A12","Samsung","Polaris","Cleaner",];  
  var NoResultsLabel = "No Results";

  $("#tags").autocomplete({
      source: function(request, response) {
          var results = $.ui.autocomplete.filter(availableTags, request.term);

          if (!results.length) {
              results = [NoResultsLabel];
          }

          response(results);
      },
      select: function (event, ui) {
          if (ui.item.label === NoResultsLabel) {
              event.preventDefault();
          }
      },
      focus: function (event, ui) {
          if (ui.item.label === NoResultsLabel) {
              event.preventDefault();
          }
      }
  });
});



$(function(){
  $(".cart_add").click(function(){
    $(".successfully-saved")
    .css("display", "block")
    .delay(3000).fadeOut(500);
  });
});

$(function(){
  $(".cart_rem").click(function(){
    $(".successfully-removed")
    .css("display", "block")
    .delay(3000).fadeOut(500);
  });
});



var shoppingCart = (function() {

  cart = [];
  
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  var obj = {};
  
  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  return obj;
})();


$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for(var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = " 
      + "<td>" + cartArray[i].total + "</td>" 
      +  "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})

$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();



function handleAdd(event) {
  const card = event.target.closest('.card')
  card.classList.add('add-active')
  console.log(card)
}

function plusLess(event, type) {
  const card = event.target.closest('.card')
  const input = card.querySelector('input')
  let oldVal = Number(input.value)
  if (type == 'less') {
      if (oldVal == 1) {
          card.classList.remove('add-active')
          return
      }
      input.value = oldVal -= 1
  } else {
      input.value = oldVal += 1
  }
};



const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);






$(document).ready(function(){
  
  // OWL CAROUSEL - https://owlcarousel2.github.io/OwlCarousel2/
  $('#main-slider .owl-carousel').owlCarousel(
    {
      items: 1,
      margin: 0,
      loop: true,
      nav: false,
      navText: ['Back','Next'],
      dots: false,
      dotsEach: true,
      autoplay: true,
      autoplaySpeed: 500,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
    }
  );
  $('#owl-1 .owl-carousel').owlCarousel(
    {
      items: 4,
      margin: 16,
      loop: true,
      stagePadding: 64,
      nav: true,
      // navText: ['Back','Next'],
      navText: ['',''],
      // navText: ["<img src='myprevimage.png'>","<img src='mynextimage.png'>"],
      dots: false,
      dotsEach: true,
      lazyLoad: false,
      autoplay: true,
      autoplaySpeed: 500,
      navSpeed: 500,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
    }
  );
  
  $('#owl-2 .owl-carousel').owlCarousel(
    {
      items: 5,
      margin: 16,
      stagePadding: 32,
      loop: true,
      autoplay: true,
      autoplaySpeed: 500,
      navSpeed: 500,
      dots: false,
      dotsEach: true,
      nav: true,
      // navText: ['Back','Next'],
      navText: ['',''],
      autoplayTimeout: 2000,
      autoplayHoverPause: false,
      animateOut: 'slideOutDown',
      animateIn: 'flipInX',
    }
  );
});