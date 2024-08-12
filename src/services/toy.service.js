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
    getToyLabelCounts,
    getToyLabelsRoute,
    getEmptyToyMsg,
    addToyMsg
}

function query(filterBy = {}) {
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

function getToyLabelsRoute() {
    return httpService.get(BASE_URL + 'labels')
}

function getToyLabelCounts(toys) {
    console.log(toys);
    
    // labels.map(label => toys.reduce((acc, toy) => {
    //     if (toy.labels.includes(label) && toy.price > acc) acc = toy.price
    //     return acc
    const labelCounts = {}
        toys.forEach(toy => {
            console.log(toy.labels);
            toy.labels.forEach(label => {
                if (!labelCounts[label]) labelCounts[label] = { total: 0, inStock: 0 }
                labelCounts[label].total++
                if (toy.inStock) labelCounts[label].inStock++
            })
        })
        return labelCounts
    // return httpService.get(BASE_URL + 'labels/count')
}

function getEmptyToy() {
    return {
        name: 'toy',
        price: 100,
        labels: _getRandomLabels(),
        createdAt: Date.now(),
        inStock: true,
        msgs: [],
        reviews:[]
    }
}

function getEmptyToyMsg() {
    return {
        txt: '',
        by: {
            fullname: ''
        }
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        labels: [],
        inStock: null,
        sortBy: '',
        sortDir: 1,
        pageIdx: 0,
    }
}


function getToyLabels() {
    return [...labels]
}


function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const randomIdx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
    }
    return randomLabels
}

async function addToyMsg(toyId, txt) {
    const savedMsg = await httpService.post(`toy/${toyId}/msg`, { txt })
    return savedMsg
}
