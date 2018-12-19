
// indexedDB: Reforzamiento
let request  = window.indexedDB.open('mi-database', 1);

//Se actualiza cuando se crea o se sube de versión de la DB
request.onupgradeneeded = event => {
    console.log('Actualizacion de BD');

    let db = event.target.result;

    db.createObjectStore('heroes', {
        keyPath: 'id'
    });

};


//Manejo de erreres
request.onerror = event => {
  console.log('DB error: ',event.target.error);  
};

//Insertar datos
request.onsuccess = event => {
    let db = event.target.result;

    let heroesData = [
        {id: '1111', heroe: 'Spiderman', mensaje: 'Aquí su friend Spiderman'},
        {id: '2222', heroe: 'Ironman', mensaje: 'Aquí en mi nuevo Mark 50'}
    ];

    let heroesTransaction = db.transaction('heroes', 'readwrite');

    heroesTransaction.onerror = event => {

        console.log('Error guardando', event.target.error);
    };

    //Informa sobre el éxito de la transacción
    heroesTransaction.oncomplete = event => {
        console.log('Transaccion hecha', event);
    };

    let heroesStore = heroesTransaction.objectStore('heroes');

    for( let heroe of heroesData){
        heroesStore.add(heroe);
    }

    heroesStore.onsuccess = event => {
        console.log('Nuevo item agregado a la DB');
    };
};
