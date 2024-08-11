
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
let toys = _createToys()
const PAGE_SIZE = 4

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']


export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getToyLabels,
}


function query(filterBy = {}) {
    console.log(filterBy);
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.inStock) {
                console.log(filterBy.inStock);
                toys = toys.filter(toy => toy.inStock === filterBy.inStock)
            }
            if (filterBy.labels?.length) {
                toys = toys.filter(toy => filterBy.labels.every(label => toy.labels.includes(label)))
            }
            if (filterBy.sortBy) {
                if (filterBy.sortBy === 'name') {
                    toys = toys.sort((toy1, toy2) => toy1.name.localeCompare(toy2.name) * filterBy.sortDir)
                } else if (filterBy.sortBy === 'price' || 'createdAt') {
                    toys = toys.sort((toy1, toy2) => (toy1[filterBy.sortBy] - toy2[filterBy.sortBy]) * filterBy.sortDir)
                }
            }
            if (filterBy.pageIdx) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                toys = toys.slice(startIdx, startIdx + PAGE_SIZE)
            }
            return toys
        })
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

function getEmptyToy() {
    return {
        name: 'toy',
        price: 100,
        labels: [],
        createdAt: Date.now(),
        inStock: false,
        msgs: [],
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        labels: [],
        inStock: true,
        sortBy: '',
        sortDir: 1,
        pageIdx: 0,
    }
}

function getToyLabels() {
    return [...labels]
}

function _createToys() {
    var toys = utilService.loadFromStorage('toysDB')
    if (!toys || toys.length === 0) {
        toys = [
            _createToy('Talking Doll', 100, ['Doll', 'Battery Powered', 'Baby'], 1631031801011, 'true'),
            _createToy('Princess Puzzle', 150, ['Puzzle', 'Box game'], 'the-littel-prince'),
            _createToy('Balloons', 50, ['Art'], 1631031801011, 'true'),
            _createToy('Bicycle', 400, ['On wheels', 'Outdoor'], 1631031801011, 'true'),
            _createToy('Marker pens', 20, ['Art'], 1631031801011, 'false'),
            _createToy('Ball', 200, ['Outdoor'], 1631031801011, 'false'),
            _createToy('Stroller for doll', 200, ['Baby', 'Doll'], 1631031801011, 'true'),
            _createToy('teddy bear', 200, ['Baby', 'Doll'], 1631031801011, 'true'),
            _createToy('Robot', 200, ['Doll', 'Battery Powered'], 1631031801011, 'true'),
        ]
        _saveToys(toys)
    }
}


function _createToy(name, price, labels = [], createdAt, inStock) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        labels,
        createdAt,
        inStock,
        msgs: []
    }
}



function _saveToys(prop) {
    utilService.saveToStorage(STORAGE_KEY, prop)
}


// const toy = {
//     _id: 't101',
//     name: 'Talking Doll',
//     price: 123,
//     labels: ['Doll', 'Battery Powered', 'Baby'],
//     createdAt: 1631031801011,
//     inStock: true,
// msgs: []
// }