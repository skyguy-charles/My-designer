const API_URL = 'http://localhost:3000/clothes';

const itemsContainer = document.getElementById('items-container');
const form = document.getElementById('add-form');

function fetchClothes() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      itemsContainer.innerHTML = '';
      data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${item.name}</h3>
          <p>Size: ${item.size}</p>
          <p>Price: $${item.price.toFixed(2)}</p>
        `;
        itemsContainer.appendChild(card);
      });
    });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const size = document.getElementById('size').value;
  const price = parseFloat(document.getElementById('price').value);

  const newItem = { name, size, price };

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem)
  })
    .then(res => res.json())
    .then(() => {
      form.reset();
      fetchClothes();
    });
});
fetchClothes();


