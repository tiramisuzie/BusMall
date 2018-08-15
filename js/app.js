'use strict';
var NUMBER_OF_IMAGE_DISPLAY = 3; //don't set higher than 8
var MAXIMUM_VOTES = 5;

var previouslyDisplayedIndexs = [];
var imgUrls = [
  'img/bag.jpg',
  'img/banana.jpg',
  'img/breakfast.jpg',
  'img/bathroom.jpg',
  'img/boots.jpg',
  'img/bubblegum.jpg',
  'img/chair.jpg',
  'img/cthulhu.jpg',
  'img/dog-duck.jpg',
  'img/dragon.jpg',
  'img/pen.jpg',
  'img/pet-sweep.jpg',
  'img/scissors.jpg',
  'img/shark.jpg',
  'img/sweep.png',
  'img/tauntaun.jpg',
  'img/unicorn.jpg',
  'img/usb.gif',
  'img/water-can.jpg',
  'img/wine-glass.jpg'
];
var products = [];
var totalVotes = 0;

// constructor for products
function Product (filename) {
  this.filename = filename;
  this.name = filename.substring(4, filename.length-4);
  this.votes = 0;
  this.displayed = 0;
}

// create a product object for each img url
function initializeProductCreation() {
  for(var i = 0; i < imgUrls.length; i++) {
    var product = new Product(imgUrls[i]);
    products.push(product);
  }
}


// return array of imgs to be display
function selectProductsToBeDisplay() {

  var productsToBeDisplay = [];
  var imgIndexSelected = [];
  for( var i = 0; i < NUMBER_OF_IMAGE_DISPLAY; i++) {
    var randIndex = generateRandomIndex(imgIndexSelected);

    imgIndexSelected.push(randIndex);

    var product = products[randIndex];
    product.displayed++;
    productsToBeDisplay.push(product);
  }

  // replace previously used index with current index
  previouslyDisplayedIndexs = imgIndexSelected;

  return productsToBeDisplay;
}

// generate a random index that has not been selected on previous display
function generateRandomIndex(imgIndexSelected) {
  var randIndex = Math.floor(Math.random() * products.length);
  while (previouslyDisplayedIndexs.includes(randIndex) || imgIndexSelected.includes(randIndex) ) {
    randIndex = Math.floor(Math.random() * products.length);
  }

  return randIndex;

}

function attachProductsToDom(productsToDisplay) {
  var container = document.getElementById('container');
  clearChild(container);

  var ul = document.createElement('ul');
  for (var i = 0; i < productsToDisplay.length; i++) {
    var li = document.createElement('li');
    var img = createImg(productsToDisplay[i]);
    li.appendChild(img);
    ul.appendChild(li);
  }
  container.appendChild(ul);
}

// delete all the child in the element
function clearChild(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}


// create img and assign url to img src
function createImg(productToBeDisplay) {
  var img = document.createElement('img');
  img.src = productToBeDisplay.filename;
  img.addEventListener('click', function() {
  // add to votes for that goat
    productToBeDisplay.votes++;
    totalVotes++;
    console.log(this);
    var productsToBeDisplay = selectProductsToBeDisplay();
    attachProductsToDom(productsToBeDisplay);

    if (totalVotes === MAXIMUM_VOTES) {
      var container = document.getElementById('container');
      clearChild(container);
      displayListProducts();
    }
  }.bind(productToBeDisplay));
  return img;
}



function displayListProducts(){
  // var ul = document.getElementById ('showlist');
  var names = [];
  var votes = [];
  for (var i = 0; i < products.length; i++) {
    names.push(products[i].name);
    votes.push(products[i].votes);


    // var li = document.createElement('li');
    // var img = document.createElement('img');
    // img.src = products[i].filename;
    // li.appendChild(img);
    // ul.appendChild(li);
    // var div = document.createElement('div');
    // div.textContent = products[i].name + ' votes:' + products[i].votes;
    // li.appendChild(div);

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: names,
        datasets: [{
          label: '# of Votes',
          data: votes, // these numbers seem important
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: 'rgb(0,0,0)',
          borderWidth: 1
        }]
      },
      options: {

        scales: {
          xAxes: [{
            ticks: {
              beginAtZero:true,
              suggestedMax: 6,
              autoSkip: false,
              step: 1,
            }
          }]
        }
      }
    });
  }
}




// step 1 create products
initializeProductCreation();

// step 2 calculate products to be display
var productsToBeDisplay = selectProductsToBeDisplay();

// step 3 render on display
attachProductsToDom(productsToBeDisplay);


