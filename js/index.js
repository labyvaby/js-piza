const tl = gsap.timeline();
const pizzas = [
  {
    id: 0,
    name: "Сет жара",
    price: 2999,
    imgUrl:
      "https://sushivesla.kg/assets/images/products/75/small/thumb-114-goods-photo-big-removebg-preview.png",
    counter: 0,
    category: "Сет",
  },
  {
    id: 1,
    name: "Сет Хит запеченный 2.0",
    price: 1299,
    imgUrl:
      "https://sushivesla.kg/assets/images/products/21/small/5cdad0edaa6bd.png",
    counter: 0,
    category: "Сет",
  },
  {
    id: 2,
    name: "Сет Филадельфия",
    price: 1049,
    imgUrl:
      "https://sushivesla.kg/assets/images/products/22/small/thumb-234-goods-photo-big-removebg-preview.png",
    counter: 0,
    category: "сет",
  },
  {
    id: 3,
    name: "Сет Fish MIX",
    price: 1199,
    imgUrl:
      "https://sushivesla.kg/assets/images/products/23/1788065d8bec8185e3cac485a51f8f9b.png",
    counter: 0,
    category: "Сет",
  },
  {
    id: 4,
    name: "Сет SMILE",
    price: 700,
    imgUrl:
      "https://sushivesla.kg/assets/images/products/25/thumb-140-goods-photo-big.png",
    counter: 0,
    category: "Сет",
  },
  {
    id: 5,
    name: "Сет CITY",
    price: 1549,
    imgUrl:
      "https://sushivesla.kg/assets/images/products/28/76742c3da73b045b7543d9935eb6b8ff.png",
    counter: 0,
    category: "Сет",
  },
  {
    id: 6,
    name: "Африка",
    price: 1349,
    imgUrl:
      "https://sushivesla.kg/assets/images/products/72/thumb-232-goods-photo-big-removebg-preview.png",
    counter: 0,
    category: "Сет",
  },
  {
    id: 7,
    name: "L-Box",
    price: 649,
    imgUrl:
      "https://sushivesla.kg/assets/images/products/70/thumb-228-goods-photo-big-removebg-preview.png",
    counter: 0,
    category: "Сет",
  },
  {
    id: 8,
    name: "Лова-Лова",
    price: 445,
    imgUrl:
      "https://sushivesla.kg/assets/images/products/71/thumb-230-goods-photo-big-removebg-preview.png",
    counter: 0,
    category: "Сет",
  },
  {
    id: 9,
    name: "Лосось",
    price: 100,
    imgUrl:
      "https://sushivesla.kg/assets/images/products/32/sushislososem-570x570.png",
    counter: 0,
    category: "Суши",
  },
  {
    id: 10,
    name: "Калифорния с лососем",
    price: 399,
    imgUrl:
      "https://sushivesla.kg/assets/images/products/26/small/thumb-42-goods-photo-big-removebg-preview.png",
    counter: 0,
    category: "Роллы",
  },
  {
    id: 10,
    name: "Липтон",
    price: 120,
    imgUrl:
      "https://sushivesla.kg/assets/images/products/55/small/f55edc53968409a87a49b4e138cfbc81.png",
    counter: 0,
    category: "Напитки",
  },
];
const routeToCart = document.querySelector(".button.button--cart");
const content = document.querySelector(".content");
const categoriesArray = [
  "Все",
  "Напитки",
  "Роллы",
  "Суши",
  "Сет",
];

const localItems = JSON.parse(localStorage.getItem("cartPizzas"));
let cartPizzas = localItems ? localItems : [];
const headerCart = document.querySelector(".header__cart");

headerCart.addEventListener("click", () => {
  headerCart.style.display = "none";
});

const renderPrices = () => {
  const totalSum = document.querySelector(".totalSum");
  const totalPizzas = document.querySelector(".totalPizzas");

  totalPizzas.innerText = cartPizzas.reduce((a, b) => {
    return a + b.counter;
  }, 0);

  totalSum.innerText =
    cartPizzas.reduce((a, b) => {
      return a + b.counter * b.price;
    }, 0) + "сом";
};

renderPrices();

const goMain = (btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    headerCart.style.display = "block";
    renderMain();
  });
};

// let filteredPizzas = pizzas.slice();

const renderCatalog = (array) => {
  const contentItems = document.querySelector(".content__items");
  contentItems.innerHTML = "";

  array.forEach((pizza) => {
    contentItems.innerHTML += `
          <div class="pizza-block">
              <img class="pizza-block__image"
                  src="${pizza.imgUrl}"
                  alt="Pizza" />
              <h4 class="pizza-block__title">${pizza.name}</h4>

              <div class="pizza-block__bottom">
                  <div class="pizza-block__price">от ${pizza.price} сом</div>
                  <div data-id="${pizza.id}" class="button button--outline button--add">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                          d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                          fill="white" />
                      </svg>
                      <span>Добавить</span>
                  </div>
              </div>
          </div>
      `;

    const pizzaBlock = document.querySelectorAll(".pizza-block");

    pizzaBlock.forEach((item) => {
      const pizzaTypes = item.querySelectorAll(".type li");
      const pizzaSizes = item.querySelectorAll(".size li");
      const addBtn = item.querySelector(".button.button--outline.button--add");

      const newPizza = {
        type: "тонкое",
        size: "26 см.",
        id: "",
      };

      pizzaTypes.forEach((pizzaType) => {
        pizzaType.addEventListener("click", () => {
          pizzaTypes.forEach((element) => {
            element.classList.remove("active");
          });

          pizzaType.classList.add("active");
          newPizza.type = pizzaType.innerText;
        });
      });

      pizzaSizes.forEach((pizzaSize) => {
        pizzaSize.addEventListener("click", () => {
          pizzaSizes.forEach((element) => {
            element.classList.remove("active");
          });

          pizzaSize.classList.add("active");
          newPizza.size = pizzaSize.innerText;
        });
      });

      addBtn.addEventListener("click", () => {
        newPizza.id =
          pizzas[addBtn.dataset.id].name + newPizza.type + newPizza.size;

        if (cartPizzas.some((item) => item.id === newPizza.id)) {
          cartPizzas.find((item) => item.id === newPizza.id).counter++;
        } else {
          cartPizzas.push({
            id: pizzas[addBtn.dataset.id].name + newPizza.type + newPizza.size,
            type: newPizza.type,
            size: newPizza.size,
            name: pizzas[addBtn.dataset.id].name,
            price: pizzas[addBtn.dataset.id].price,
            imgUrl: pizzas[addBtn.dataset.id].imgUrl,
            counter: 1,
            category: pizzas[addBtn.dataset.id].category,
          });
        }

        localStorage.setItem("cartPizzas", JSON.stringify(cartPizzas));
        renderPrices();
      });
    });
  });

  gsap.from(".pizza-block", {
    opacity: 0, 
    y: 100, 
    duration: 1,
    stagger: 0.2
  });
};

const renderMain = () => {
  content.innerHTML = `
    <div class="container">
    <div class="content__top">
      <div class="categories">
        <ul></ul>
      </div>
      <div class="sort">
        <div class="sort__label">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C" />
          </svg>
          <b>Сортировка по:</b>
          <span>популярности</span>
        </div>
        <div class="sort__popup">
          <ul>
            <li class="active">популярности</li>
            <li>цене</li>
            <li>алфавиту</li>
          </ul>
        </div>
      </div>
    </div>
    <h2 class="content__title">Все</h2>
    <div class="content__items"></div>
  </div>
  `;

  const sortWrapper = document.querySelector(".sort");
  const sortLabel = document.querySelector(".sort__label");
  const sortSvg = sortLabel.querySelector("svg");
  const sortActive = sortLabel.querySelector("span");
  const sortValues = sortWrapper.querySelectorAll(".sort__popup ul li");
  sortValues.forEach((item) => {
    item.addEventListener("click", () => {
      sortValues.forEach((el) => {
        el.classList.remove("active");
      });

      item.classList.add("active");
      sortActive.innerText = item.innerText;

      let sortsDepend = null;

      switch (sortActive.innerText) {
        case "цене":
          sortsDepend = "price";
          break;
        case "алфавиту":
          sortsDepend = "name";
          break;

        default:
          sortsDepend = null;
          break;
      }

      const sortedPizzas = pizzas.slice().sort((a, b) => {
        if (!sortsDepend) {
          return 0;
        }

        if (a[sortsDepend] > b[sortsDepend]) {
          return 1;
        } else {
          return -1;
        }
      });

      renderCatalog(sortedPizzas);
    });
  });
  sortLabel.addEventListener("click", () => {
    sortWrapper.classList.toggle("active");
    sortSvg.classList.toggle("active");
  });

  const categoriesList = document.querySelector(".categories ul");
  categoriesArray.forEach((item) => {
    categoriesList.innerHTML += `<li> ${item} </li>`;
  });
  categoriesList.querySelectorAll("li")[0].classList.add("active");
  const categories = document.querySelectorAll(".categories ul li");
  categories.forEach((category) => {
    category.addEventListener("click", () => {
      categories.forEach((item) => {
        item.classList.remove("active");
      });

      category.classList.add("active");

      const filteredPizzas = pizzas.filter((pizza) => {
        if (category.innerText !== "Все") {
          return pizza.category === category.innerText;
        } else {
          return true;
        }
      });

      renderCatalog(filteredPizzas);
    });
  });

  renderCatalog(pizzas);
  const storageItems = JSON.parse(localStorage.getItem("cartPizzas"));
};

renderMain();

const clearCart = () => {
  localStorage.clear();
  content.innerHTML = `
      <div class="container container--cart">
      <div class="cart cart--empty">
        <h2>Корзина пустая <icon>😕</icon></h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.<br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src="/img/empty-cart.png" alt="Empty cart" />
        <a href="/" class="button button--black">
          <span>Вернуться назад</span>
        </a>
      </div>
    </div>
  `;

  const goToMainBtn = document.querySelector(".button.button--black");
  goMain(goToMainBtn);
};

const renderCart = () => {
  if (cartPizzas.length) {
    const contentItems = document.querySelector(".content__items");
    contentItems.innerHTML = "";

    cartPizzas.forEach((items) => {
      contentItems.innerHTML += `
      <div class="cart__item">
        <div class="cart__item-img">
          <img class="pizza-block__image"
            src="${items.imgUrl}"
            alt="Pizza" />
        </div>
        <div class="cart__item-count">
          <div data-id="${
            items.id
          }" class="button button--outline button--circle cart__item-count-minus">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E" />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E" />
            </svg>

          </div>
          <b>${items.counter}</b>
          <div data-id="${
            items.id
          }" class="button button--outline button--circle cart__item-count-plus">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E" />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E" />
            </svg>

          </div>
        </div>
        <div class="cart__item-price">
          <b>${items.counter * items.price} сом</b>
        </div>
        <div class="cart__item-remove">
          <div class="button button--outline button--circle">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E" />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E" />
            </svg>

          </div>
        </div>
      </div>
    `;
    });

    const cartItems = document.querySelectorAll(".cart__item");
    cartItems.forEach((item) => {
      const plusBtn = item.querySelector(".cart__item-count-plus");
      const minusBtn = item.querySelector(".cart__item-count-minus");
      const deletePizzaBtn = item.querySelector(".cart__item-remove");

      plusBtn.addEventListener("click", () => {
        cartPizzas = cartPizzas.map((pizza) => {
          if (pizza.id === plusBtn.dataset.id) {
            pizza.counter += 1;
            localStorage.setItem("cartPizzas", JSON.stringify(cartPizzas));
            renderCart();
            return pizza;
          } else {
            return pizza;
          }
        });
      });

      minusBtn.addEventListener("click", () => {
        cartPizzas = cartPizzas.map((pizza) => {
          if (pizza.id === minusBtn.dataset.id && pizza.counter !== 1) {
            pizza.counter -= 1;
            localStorage.setItem("cartPizzas", JSON.stringify(cartPizzas));
            renderCart();
            return pizza;
          } else {
            return pizza;
          }
        });
      });

      deletePizzaBtn.addEventListener("click", () => {
        cartPizzas = cartPizzas.filter((pizza) => pizza.id !== minusBtn.dataset.id)
        renderCart();
      });
    });
  } else {
    clearCart();
  }
};

routeToCart.addEventListener("click", async (e) => {
  e.preventDefault();

  await tl.to(".content", {
    scale: 0.9,
    duration: 1
  })

  await tl.to(".content", {
    x: "-100vw",
    duration: 1
  })

  await tl.to(".content", {
    x: "100vw",
    duration: 0
  })

  if (localStorage.getItem("cartPizzas")) {
    const totalSum = document.querySelector(".totalSum");
    const totalPizzas = document.querySelector(".totalPizzas");
    content.innerHTML = `
    <div class="container container--cart">
    <div class="cart">
      <div class="cart__top">
        <h2 class="content__title"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
              stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
              stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
              stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Корзина</h2>
        <div class="cart__clear">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 5H4.16667H17.5" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
              stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.33337 9.16667V14.1667" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M11.6666 9.16667V14.1667" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>

          <span>Очистить корзину</span>
        </div>
      </div>

      <div class="content__items"></div>

      <div class="cart__bottom">
        <div class="cart__bottom-details">
          <span> Сумма заказа: <b>${totalSum.innerText}</b> </span>
        </div>
        <div class="cart__bottom-buttons">
          <a href="/" class="button button--outline button--add go-back-btn">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>

            <span>Вернуться назад</span>
          </a>
          <div class="button pay-btn">
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;

    const goBackBtn = document.querySelector(
      ".button.button--outline.button--add.go-back-btn"
    );
    goMain(goBackBtn);

    renderCart();

    const clearCartBtn = document.querySelector(".cart__clear");
    clearCartBtn.addEventListener("click", clearCart);
  } else {
    clearCart();
  }

  tl.to(".content", {
    x: "0",
    duration: 1
  })

  tl.to(".content", {
    scale: 1,
    duration: 1
  })
});

// opacity: 1, 
// y: 0, 

