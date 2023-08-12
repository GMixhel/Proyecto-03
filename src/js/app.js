
const menu = document.querySelector(".nav__links");
const menuLinks = document.querySelectorAll('.nav__links a[href^="#"]');
const navOpen = document.querySelector('.nav__open');
const nav = document.querySelector('.nav');
const navContainer = document.querySelector('.nav__container');
const headerNav = document.querySelector('.header__nav');
const sliders = [...document.querySelectorAll('.installations__img')];
const buttonNext = document.querySelector('#next');
const buttonBefore = document.querySelector('#before');



//------------STATUS
const section = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        const menuLink = document.querySelector(`.nav__links a[href="#${id}"]`)     
        if (entry.isIntersecting) {
            menuLink.classList.add("selected");
        } else {
            menuLink.classList.remove("selected");
        }
    });
},{rootMargin: "-20% 0px -80% 0px" });


menuLinks.forEach(menuLink => {
    const hash = menuLink.getAttribute("href");
    const target = document.querySelector(hash);
    if (target) {
        section.observe(target);
    }

    menuLink.addEventListener('click', function () {
        nav.classList.remove('nav__items--show');
        navContainer.classList.remove('nav--background');
        
    })

});

navOpen.addEventListener('click', () => {
    nav.classList.toggle('nav__items--show');
    navContainer.classList.toggle('nav--background');
});

window.addEventListener('scroll', function () {
    headerNav.classList.toggle('sticky', window.scrollY > 0)
});


//-------------------SLIDER
let value;
buttonNext.addEventListener('click', () => {
    changePosition(1)
});
buttonBefore.addEventListener('click', () => {
    changePosition(-1)
});

const changePosition = (add) => {
    const currentImg = document.querySelector('.installations__img--show').dataset.id;
    value = Number(currentImg);
    value += add;

    sliders[Number(currentImg) - 1].classList.remove('installations__img--show');
    if (value === sliders.length + 1 || value === 0) {
        value = value === 0 ? sliders.length : 1;
    }

    sliders[value - 1].classList.add('installations__img--show');
};


//------------ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    
        if (entry.isIntersecting) {
            entry.target.classList.add('show__animation');
        }

    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

//-----------VENTANAS MODAL
const proposalContainer = document.querySelector('#proposal')


startEventListener();
function startEventListener(){
proposalContainer.addEventListener('click', openModal)

}

function openModal(e) {
    if (e.target.classList.contains('proposal__more')) {
        
        const modalId = e.target.getAttribute('data-id') 
        
        function crearHTML() {
            if (modalId === 'modal1') {
                const modal1 = document.createElement('div');
                modal1.classList.add('overlay__modal')
                modal1.innerHTML = `
            <div  class="proposal__modal">
            <img  width="300" height="300"class="modale1__img" src="./build/img/modal1.webp" alt="modale__img">
            <h2 class="modal__title">free consultation</h2>
            <p class="modalp">is simply dummy text of the printing and typesetting industry of the printing and typesetting industry. I</p>            
            </div>
            ` ;  
                const btnClose = document.createElement('img');
                btnClose.src = './build/img/bx-x-circle(3).svg';
                btnClose.classList.add('btn__cerrar');

                modal1.appendChild(btnClose);

                btnClose.addEventListener('click', () => {
                    modal1.remove();
                });         
                          
                const body = document.querySelector('html');
                body.appendChild(modal1);

            }
            
             if (modalId === 'modal2') {
                const modal2 = document.createElement('div');
                modal2.classList.add('overlay__modal')
                modal2.innerHTML = `           

         <div class="proposal__modal">
            <img width="300" height="300" class="modale1__img" src="./build/img/modal2.webp" alt="modale__img">
            <h2 class="modal__title">20% SALE</h2>
            <p class="modalp">is simply dummy text of the printing and typesetting industry of the printing and typesetting industry. I Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et accusantium a alias illum quia, laudantium re!</p>        
            </div>
            ` ;  
                const btnClose = document.createElement('img');
                btnClose.src = './build/img/bx-x-circle(3).svg';
                btnClose.classList.add('btn__cerrar');

                modal2.appendChild(btnClose);

                btnClose.addEventListener('click', () => {
                    modal2.remove();
                });


                const body = document.querySelector('html');
                body.appendChild(modal2);
            }
                
             if (modalId === 'modal3') {
                const modal3 = document.createElement('div');
                modal3.classList.add('overlay__modal')
                modal3.innerHTML = `
           <div class="proposal__modal">
            <img width="300" height="300" class="modale1__img" src="./build/img/modal3.webp" alt="modale__img">
            <h2 class="modal__title">free training</h2>
            <p class="modalp">is simply dummy text of the printing and typesetting industry of the printing and typesetting industry. I</p  
            </div>
            ` ;  
                const btnClose = document.createElement('img');
                btnClose.src = './build/img/bx-x-circle(3).svg';
                btnClose.classList.add('btn__cerrar');

                modal3.appendChild(btnClose);

                btnClose.addEventListener('click', () => {
                    modal3.remove();
                });

                const body = document.querySelector('html');
                body.appendChild(modal3);             

            };
                        
        };     
       
        crearHTML();
    };  
};


//---------------- FORM VALIDATION

const email = {
    name: '',
    email: '',
    message: ''
}

console.log(email)

// seleccionar los elementos del form
const inputEmail = document.querySelector('#email');
const inputName = document.querySelector('#name');
const inputMessage = document.querySelector('#message');
const formContainer = document.querySelector('#form');
const formBtn = document.querySelector('.form__btn');
const formLoading = document.querySelector('#form__loading')
const notificacionSuccess = document.querySelector('.form__success')


inputEmail.addEventListener('input', valid);
inputName.addEventListener('input', valid);
inputMessage.addEventListener('input', valid);

formContainer.addEventListener('submit', sendEmail)


function valid(e) {
  

    if (e.target.value.trim() === '') {
        showAlert(`the ${e.target.id} field is empty`, e.target.parentElement);
        email[e.target.id] = "";
        verifyEmail();
        return;
    }

    if (e.target.id === 'email' && !validEmail(e.target.value)) {
        showAlert('the email is not valid', e.target.parentElement);
        email[e.target.id] = "";
        validEmail();
        return;
    }

    cleanAlert(e.target.parentElement);

    email[e.target.id] = e.target.value.trim().toLowerCase();

    verifyEmail()

    console.log(email)

}

function showAlert(message, refer) {
   cleanAlert(refer)

    const error = document.createElement('P');
    error.textContent = message
    error.className = "form__alert"
    
    refer.appendChild(error)


}

function cleanAlert(refer) {
    const alert = refer.querySelector('.form__alert')
    if (alert) {
        alert.remove()
    }
}


function validEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email)
    return result;
}


function verifyEmail() {
    console.log(Object.values(email).includes(''))

    if (Object.values(email).includes('')) {
        formBtn.classList.remove('form__btn--active')
        formBtn.disabled = true;
       
    } else {
        formBtn.classList.add('form__btn--active');
        formBtn.disabled = false;
    }
       
}

function sendEmail(e) {
    e.preventDefault();

    formLoading.classList.add('loading__animation--active');

    setTimeout(() => {
        formLoading.classList.remove('loading__animation--active');
        
        resetForm();

        notificacionSuccess.classList.add('form__success--active')

        setTimeout(() => {
            notificacionSuccess.classList.remove('form__success--active')
        }, 2000);
        

    }, 3000);
    
}

function resetForm() {
    email.email = '';
    email.name = '';
    email.message = '';

    formContainer.reset();
    verifyEmail();
}



//-----------CARSHOP

const carshop = document.querySelector('#submenu__carshop');
const carshopContainer = document.querySelector('#submenu__items tbody');
const offers = document.querySelector('#offers');
const btnReset = document.querySelector('#submenu__reset');
let itemCarshop = [];


loadEventlisteners();
function loadEventlisteners() {
    //presionar boton buy
    offers.addEventListener('click', buyCourse)

    carshop.addEventListener('click', removCourse)

    document.addEventListener('DOMContentLoaded', () => {
        itemCarshop = JSON.parse(localStorage.getItem('carshop')) || [];

        CarshopHTML();
    })

    btnReset.addEventListener('click', () => {
        itemCarshop = [];

        cleanHTML();
    })
};


function buyCourse(e) {
    if (e.target.classList.contains('offers__ctn')) {
        const selectedPlan = e.target.parentElement;
        readOffers(selectedPlan)       
    };    
    
};

//Eliminar Offers
function removCourse(e) {
    if (e.target.classList.contains('close__offers')) {
        const courseId = e.target.getAttribute('data-id');

        itemCarshop = itemCarshop.filter(course => course.id !== courseId);

        CarshopHTML();
    }
}

function readOffers(course) {

    //creacionde objeto con contenido del curso actual
    const infoOfers = {
        month: course.querySelector('.pulse__animation').textContent,
        price: course.querySelector('h3').textContent,
        id: course.querySelector('button').getAttribute('data-id'),
        Qty: 1
    }

    //revisar si ya un elemento ya existe en el carshop
    const existe = itemCarshop.some(course => course.id === infoOfers.id);
    if (existe) {
        //actualizar cantidad
        const course = itemCarshop.map(course => {
            if (course.id === infoOfers.id) {
                course.Qty++;
                return course;
            } else {
                return course;
            }
        });
        itemCarshop = [...course];

    } else {
        //Agragar elementos al arreglo carrito
        itemCarshop = [...itemCarshop, infoOfers];
    }

    
     CarshopHTML()
};


//mostrar elemento en el HTML

function CarshopHTML() {
    cleanHTML()
    

    itemCarshop.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            ${course.month}
        </td>
        <td>
            ${course.price}
        </td>
        <td>
            ${course.Qty}
        </td>
        <td>
           <button href="#" data-id="${course.id}" class="close__offers">X</button>
        </td>
    `;
        carshopContainer.appendChild(row)        
    });    
    

    syncroStorege();
}

function syncroStorege() {
    localStorage.setItem('carshop', JSON.stringify(itemCarshop));
}

function cleanHTML(){
    while (carshopContainer.firstChild) {
        carshopContainer.removeChild(carshopContainer.firstChild)
    }
}