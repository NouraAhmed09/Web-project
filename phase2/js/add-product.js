
const image = document.querySelector('#image');
const myform = document.querySelector('#form-add');
const notification = document.querySelector('.notification');
const closeNot = document.querySelector('.close-not');
const formGroup = Array.from(document.querySelectorAll(".form-group input"));
let error = Array.from(document.querySelectorAll(".close"));
let close = Array.from(document.querySelectorAll(".close"));

function addEventClose(closeElements) {
  closeElements.forEach(element => {
    element.addEventListener('click', e => {
      e.currentTarget.parentElement.remove();
    });
  });
}

console.log(image)

function validation(e) {
  let validObj = e.target.validity;
  if (!validObj.valid) {
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.firstElementChild.innerHTML = e.target.validationMessage;
      console.log()
    } else {
      e.target.parentElement.innerHTML += `
      <div class="error">
        <span>${e.target.validationMessage}</span>
        <span class="close">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
        </span>
      </div>
      `;
    }
    close = Array.from(document.querySelectorAll(".close"));
    addEventClose(close);
    e.target.classList.add('invalid');
    console.log(e.target.classList);
  } else {
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.remove();
      e.target.classList.remove('invalid');
    }
  }
}


document.addEventListener('blur', e => {
  validation(e);
}, true);


let blob;
const imgElement = document.createElement('img');
image.addEventListener('change', handleImageChange)


function handleImageChange() {
  // Get the selected file
  const file = image.files[0];

  if (file) {
    // Use FileReader to read the file and convert it to a Blob
    const reader = new FileReader();

    reader.onload = function (event) {
      // `event.target.result` contains the data URL representing the file
      const dataURL = event.target.result;

      // Convert the data URL to a Blob
      blob = dataURL;
    };

    reader.readAsDataURL(file);
  }

}


myform.addEventListener('submit', e => {
  console.log('dsfvijf');
  e.preventDefault();

  console.log(blob);
  // validation(e);
  const formData = new FormData(e.target);
  formData.set("image", blob);
  imgElement.src = blob;
  console.log(imgElement);

  const data = new URLSearchParams(formData);
  let respones = fetch('http://localhost:7000', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: "POST",
    body: data,
  }
  ).then(data => {
    return data.text();
  }).then((data) => {
    console.log(data);
    notification.firstElementChild.textContent = data;
    notification.classList.add('success');
    formGroup.forEach(ele => {
      ele.value = '';
    })
  }).catch((erroe) => {
    notification.firstElementChild.textContent = data;
    notification.classList.add('error-m');
  });
});

closeNot.addEventListener('click', e => {
  notification.classList.remove('success', 'error-m');
})