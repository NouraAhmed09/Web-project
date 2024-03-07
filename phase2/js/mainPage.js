
const RingSection = document.querySelector('#Ring .section');
const NecklaceSection = document.querySelector('#Necklace .section');
const EarringSection = document.querySelector('#Earring .section');
const notification = document.querySelector('.notification');
const closeNot = document.querySelector('.close-not');
let cartBtnnecklace;

document.addEventListener('DOMContentLoaded', e => {
   console.log('ox')
   let respones = fetch('http://localhost:7000?getType=product').then(data => {
      return data.json();
   }).then((data) => {
      setProduct(data)
   }).catch((erroe) => {
      //  notification.firstElementChild.textContent = data;
      //  notification.classList.add('error-m');
      console.log(erroe)
   });
})

function setProduct(ele) {

   ele.forEach(element => {
      const ImageUrl = dataURLtoBlob(element.image);
      /* Your binary image data here */;

      const blob = URL.createObjectURL(ImageUrl);
      const type = element.type;
      const title = element.Name;
      const price = element.price;
      const id = element.ID;

      if (type === 'Ring') {
         RingSection.innerHTML += `
         <div class="img" id="${id}">
         <img src="${blob}" id="imgring1" alt="ring1"></img>
            <div id="text">
            <div>
            <h4>${title}</h4>
            <p class="price">$${price}</p>
            </div>
            <button class="cart-btnnecklace" id="${id}">add to cart
               <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M5.792 2H1v2h3.218l2.77 12.678H7V17h13v-.248l2.193-9.661L22.531 6H6.655l-.57-2.611L5.792 2Zm14.195 6H7.092l1.529 7h9.777l1.589-7Z" clip-rule="evenodd"></path>
                  <path d="M10 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  <path d="M19 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
               </svg>
            </button>
            </div>
         </div>
         `;
      } else if (type === 'Necklace') {
         NecklaceSection.innerHTML += `
         <div class="img" id="${id}">
         <img src="${blob}" id="imgring1" alt="necklace"></img>
            <div id="text">
            <div>
            <h4>${title}</h4>
            <p class="price">$${price}</p>
            </div>
            <button class="cart-btnnecklace" id="${id}">add to cart
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M5.792 2H1v2h3.218l2.77 12.678H7V17h13v-.248l2.193-9.661L22.531 6H6.655l-.57-2.611L5.792 2Zm14.195 6H7.092l1.529 7h9.777l1.589-7Z" clip-rule="evenodd"></path>
            <path d="M10 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
            <path d="M19 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
            </svg>
            </button>
            </div>
         </div>
         `;
      } else {
         EarringSection.innerHTML += `
         <div class="img" id="${id}">
         <img src="${blob}" id="imgring1" alt="ring1"></img>
            <div id="text">
            <div>
            <h4>${title}</h4>
            <p class="price">$${price}</p>
            </div>
            <button class="cart-btnnecklace" id="${id}">add to cart
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M5.792 2H1v2h3.218l2.77 12.678H7V17h13v-.248l2.193-9.661L22.531 6H6.655l-.57-2.611L5.792 2Zm14.195 6H7.092l1.529 7h9.777l1.589-7Z" clip-rule="evenodd"></path>
            <path d="M10 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
            <path d="M19 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
            </svg>
            </button>
            </div>
         </div>
         `;
      }
   });
   cartBtnnecklace = Array.from(document.querySelectorAll('.cart-btnnecklace'));
   cartBtnnecklace.forEach(element => {
      element.addEventListener('click', e => {
         let id = e.target.id;
         addToPasket(e, id);
      });
   });
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

function addToPasket(e, id) {
   let respones = fetch(`http://localhost:7000?getType=pas&productId=${id}`).then(data => {
      return data.text();
   }).then((data) => {
      notification.firstElementChild.textContent = data;
      notification.classList.add('success');
   }).catch((erroe) => {
      notification.firstElementChild.textContent = erroe;
      notification.classList.add('error-m');
      console.log(erroe)
   });
}

closeNot.addEventListener('click', e => {
   notification.classList.remove('success', 'error-m');
})