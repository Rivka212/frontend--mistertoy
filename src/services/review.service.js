import { httpService } from './http.service'

export const reviewService = {
    add,
    query,
}

// function query(filterBy = {}) {
//     var queryStr = !filterBy ? '' : `?name=${filterBy.txt}&sort=anaAref`
//     return httpService.get(`review${queryStr}`)
// }

function query(filterBy = {}) {
    return httpService.get('review', filterBy)
}

async function add({ txt, userId }) {
    return await httpService.post('review', { txt, userId })
}

