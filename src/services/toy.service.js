import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

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
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}


function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: 'toy',
        price: 100,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
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



