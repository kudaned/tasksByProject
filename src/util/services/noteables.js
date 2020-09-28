export function fetch_2(payload) {
    const url = '/services/tasks/search/'
    return axios(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        responseType: 'json',
        data: payload
    })
    .then((response) => response )
}

export function download(payload) {
    const url = '/services/tasks/download'
    return axios(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer',
        data: payload
    })
    .then((response) => response )
}

export function search(payload) {
    const url = '/services/tasks/search/'
    return axios(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        responseType: 'json',
        data: payload
    })
    .then((response) => response )
}
