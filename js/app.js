'use strict';

var previous1;
var previous2;
var previous3;
var product1;
var product2;
var product3;
var img1 = document.getElementsByTagName('img')[0];
var img2 = document.getElementsByTagName('img')[1];
var img3 = document.getElementsByTagName('img')[2];
// constructor for products

function Product (filename) {
  this.filename=filename;
  this.votes = 0;
  this.displayed = 0;
  Product.allProducts.push(this);
}

Product.allProducts= [];

new Product ('img/bag.jpg');
new Product ('img/banana.jpg');
new Product ('img/breakfast.jpg');
new Product ('img/bathroom.jpg');
new Product ('img/boots.jpg');
new Product ('img/bubblegum.jpg');
new Product ('img/chair.jpg');
new Product ('img/cthulhu.jpg');
new Product ('img/dog-duck.jpg');
new Product ('img/dragon.jpg');
new Product ('img/pen.jpg');
new Product ('img/pet-sweep.jpg');
new Product ('img/scissors.jpg');
new Product ('img/shark.jpg');
new Product ('img/sweep.png');
new Product ('img/tauntaun.jpg');
new Product ('img/unicorn.jpg');
new Product ('img/usb.gif');
new Product ('img/water-can.jpg');
new Product ('img/wine-glass.jpg');



function displayThreeNewProducts() {
  //show new pictures to user
  //grab 3 pictures at random

  var randIndex = Math.floor(Math.random() * Product.allProducts.length);

  while (randIndex === previous1 || randIndex === previous2 || randIndex === previous3){
    randIndex = Math.floor(Math.random() * Product.allProducts.length);

  }
  product1 = Product.allProducts[randIndex];
  do {
    var secondProductIndex = Math.floor(Math.random() * Product.allProducts.length);
  } while (
    secondProductIndex === previous1 ||
    secondProductIndex === previous2 ||
    secondProductIndex === previous3 ||
    secondProductIndex === randIndex ||
    secondProductIndex === thirdProductIndex
  );
  product2 = Product.allProducts[secondProductIndex];

  do {
    var thirdProductIndex = Math.floor(Math.random() * Product.allProducts.length);
  } while (
    thirdProductIndex === previous1 ||
    thirdProductIndex === previous2 ||
    thirdProductIndex === previous3 ||
    thirdProductIndex === randIndex ||
    thirdProductIndex === secondProductIndex
  );
  product3 = Product.allProducts[thirdProductIndex];
  previous1 = randIndex;
  previous2 = secondProductIndex;
  previous3 = thirdProductIndex;


  console.log ('product 1' , product1);
  // change img src on the page to match the 3 new products
  img1.src = product1.filename;
  product1.displayed++;
  img2.src = product2.filename;
  product2.displayed++;
  img3.src = product3.filename;
  product3.displayed++;
}




// event listeners
// where are we listening? The images
// what are we listening for? click
img1.addEventListener('click', function() {
  // add to votes for that goat
  product1.votes++;
  // goat1.votes = goat1.votes + 1;
  displayThreeNewProducts();
});

img2.addEventListener('click', function() {
  // what should we do?
  // add to votes for that goat
  product2.votes++;
  // goat1.votes = goat1.votes + 1;
  displayThreeNewProducts();
});
img3.addEventListener('click', function() {
  // what should we do?
  // add to votes for that goat
  product3.votes++;
  // goat1.votes = goat1.votes + 1;
  displayThreeNewProducts();

});
displayThreeNewProducts();


//After 25 selections have been made, turn off the event listeners on the images
//add product votes
//Display a list of the products with votes received