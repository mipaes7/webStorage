//VARIABLES
const itemsLista = document.getElementById('itemsLista');
const itemsAgregados = document.getElementById('itemsAgregados');
const clearButton = document.getElementById('clearButton');
const fragmento = document.createDocumentFragment();

const arrayItems = [
    {
        id: '1',
        item: 'Lechuga'
    },
    {
        id: '2',
        item: 'Arroz'
    },
    {
        id: '3',
        item: 'Chocolate'
    },
    {
        id: '4',
        item: 'Queso'
    },
    {
        id: '5',
        item: 'Carne'
    },
    {
        id: '6',
        item: 'Aceite'
    },
    {
        id: '7',
        item: 'Agua'
    },
    {
        id: '8',
        item: 'Tomato'
    }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    pintarListaItems();
    pintarCarrito();
    pintarBtnClear();
});

document.addEventListener('click', ({target}) => {
    if (target.matches('ul .agregar')) {
        let id = target.id;
        crearCarrito(id);
        guardar();
        pintarCarrito();

    }

    if (target.matches('ul .eliminar')) {
        let id = target.id;
        eliminarCarrito(id);
        guardar();
        pintarCarrito();
    }
    
    if (target.matches('div .clearBtn')) {
        console.log(target.id);
        clearLista();
    }
});

//FUNCIONES
const pintarListaItems = () => {
    arrayItems.forEach(({id, item}) => {
        const listElement = document.createElement('li');
        listElement.textContent = item;
        const btn = document.createElement('button');
        btn.id = id;
        btn.classList.add('agregar');
        btn.textContent = 'Agregar';
        listElement.append(btn);
        fragmento.append(listElement);
    });
    itemsLista.append(fragmento);
}

const pintarCarrito = () => {
    itemsAgregados.innerHTML = '';
    carrito.forEach((articulo) => {
        const listElement = document.createElement('li');
        listElement.textContent = `${articulo.cantidad}x ${articulo.item}`;
        listElement.id = articulo.id;
        const btn = document.createElement('button');
        btn.id = articulo.id;
        btn.textContent = 'Eliminar';
        btn.classList.add('eliminar');
        listElement.append(btn);
        fragmento.append(listElement);
    });
    itemsAgregados.append(fragmento);
}

const pintarBtnClear = () => {
    clearButton.innerHTML = '';
    const btn = document.createElement('button');
    btn.id = 'clearButton';
    btn.textContent = 'Vaciar lista de la compra';
    btn.classList.add('clearBtn');
    fragmento.append(btn);
    clearButton.append(fragmento);
}

const crearCarrito = (id) => {
    const encontrado = carrito.find((item) => item.id === id); // 

    if (!encontrado) {
        const producto = arrayItems.find((item) => item.id === id);  // cercioramos que este producto exista en arrayItems que es el equivalente a la BBDD
        const obj = {
            ...producto,
            cantidad: 1
        };
        obj.id = id;
        carrito.push(obj);
    } else {
        encontrado.cantidad += 1;
    }

}


const guardar = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const clearLista = () => {
    carrito.length = 0;
    localStorage.clear();
    pintarCarrito();
}

const eliminarCarrito = (id) => {
    const item = carrito.find(item => item.id === id);

    if (item) {
        item.cantidad -= 1;
        
        if (item.cantidad <= 0) {
            const index = carrito.indexOf(item);
            if (index !== -1) {
                carrito.splice(index, 1);
            }
        }
        guardar();
        pintarCarrito();
    }
}
