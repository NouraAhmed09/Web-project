

const RingSection = document.querySelector('#Ring');
const NecklaceSection = document.querySelector('#Necklace');
const EarringSection = document.querySelector('#Earring');
let products = {};

document.addEventListener('DOMContentLoaded', e => {
   console.log('ox')
   let respones = fetch('http://localhost:7000?getType=pasket').then(data => {
      return data.json();
   }).then((data) => {
      console.log(data);
      setProduct(data)
   }).catch((erroe) => {
      //  notification.firstElementChild.textContent = data;
      //  notification.classList.add('error-m');
      console.log(erroe);
   });
})

function setProduct(ele) {

   ele.forEach(element => {
      const id = element.ID;
      if (!products[id]) {
         products[id] = [element];
      } else {
         products[id].push(element);
      }
      console.log(id)
      console.log(products)
   });
   showProducts(products);
}

function showProducts(elemntObj) {

   console.log(elemntObj);
   let elements = Object.keys(elemntObj);
   console.log(elements);

   elements.forEach(element => {

      let elementArr = elemntObj[element];
      let ele = elementArr[0];
      const ImageUrl = dataURLtoBlob(ele.image);
      /* Your data image data here */;
      const blob = URL.createObjectURL(ImageUrl);
      const type = ele.type;
      const title = ele.Name;
      const price = ele.price;
      const id = ele.ID;
      let count = elementArr.length;

      if (type === 'Ring') {
         RingSection.innerHTML += `
            <div class="img" id="${id}">
            <img src="${blob}" id="imgring1" alt="ring1"></img>
               <div id="text">
                  <h4>${title}</h4>
                  <div class="details">
                     <span class="price">price: $${price}</span>
                     <span class="count">count: ${count}</span>
                  </div>
               </div>
            </div>
            `;
      } else if (type === 'Necklace') {
         NecklaceSection.innerHTML += `
            <div class="img" id="${id}">
            <img src="${blob}" id="imgring1" alt="necklace"></img>
               <div id="text">
                  <a href="#" class="add_shopping_cart"><img src="media/add_shopping_cart@4x.png" height="20" width="20"
                     alt="add_shopping_cart"></a>
                  <h4>${title}</h4>
                  <div class="details">
                  <span class="price">price: $${price}</span>
                  <span class="count">count: ${count}</span>
                  </div>
               </div>
            </div>
            `;
      } else {

         EarringSection.innerHTML += `
            <div class="img" id="${id}">
            <img src="${blob}" id="imgring1" alt="ring1"></img>
               <div id="text">
                  <h4>${title}</h4>
                  <div class="details">
                  <span class="price">price: $${price}</span>
                  <span class="count">count: ${count}</span>
                  </div>
               </div>
            </div>
            `;
      }
   })
}



function dataURLtoBlob(dataURL) {
   const parts = dataURL.split(';base64,');
   const contentType = parts[0].split(':')[1];
   const raw = window.atob(parts[1]);
   const array = new Uint8Array(raw.length);

   for (let i = 0; i < raw.length; i++) {
      array[i] = raw.charCodeAt(i);
   }

   return new Blob([array], { type: contentType });
}