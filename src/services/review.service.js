import { httpService } from '../http.service'

export const reviewService = {
    add,
    query,
}

function query(filterBy) {
    var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
    return httpService.get(`review${queryStr}`)
}

async function add({ txt, userId }) {
    return await httpService.post(`review`, { txt, userId })
}