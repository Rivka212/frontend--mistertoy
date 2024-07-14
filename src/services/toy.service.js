
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
_createToys()


export const toyService = {
    query,
    getById,
    save,
    remove,
}


function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}



// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
//     'Outdoor', 'Battery Powered']


// const toy = {
//     _id: 't101',
//     name: 'Talking Doll',
//     price: 123,
//     labels: ['Doll', 'Battery Powered', 'Baby'],
//     createdAt: 1631031801011,
//     inStock: true,
// }


function _createToys() {
    const toys = loadFromStorage('toysDB')
    if (!toys || toys.length === 0) {
        toys = [
            _createToy('Talking Doll', 100, ['Doll', 'Battery Powered', 'Baby'], 1631031801011, true),
            _createToy('Puzzle The Little Prince', 150, ['Puzzle', 'Box game'], 'the-littel-prince'),
            _createToy('Balloons', 50, ['Art'], 1631031801011, true),
            _createToy('Bicycle', 400, ['On wheels', 'Outdoor'], 1631031801011, true),
            _createToy('Marker penד', 20, ['Art'], 1631031801011, false),
            _createToy('Ball', 200, ['Outdoor'], 1631031801011, false),
            _createToy('Stroller for doll', 200, ['Baby', 'Doll'], 1631031801011, true),
            _createToy('teddy bear', 200, ['Baby', 'Doll'], 1631031801011, true),
            _createToy('Robot', 200, ['Doll', 'Battery Powered'], 1631031801011, true),
        ]
        _saveToys()
    }
}


function _createToy(name, price, labels = [], createdAt, inStock) {
    return {
        _id: makeId(),
        name,
        price,
        labels,
        createdAt,
        inStock
    }
}



function _saveToys() {
    storageService.post(STORAGE_KEY, 'toyDB')
    // saveToStorage(STORAGE_KEY, 'toyDB')
}