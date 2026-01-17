const baseUrl = 'http://localhost:3002/anecdotes'

export const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('Failed to fetch notes')
    }

    const data = await response.json()
    return data
}


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

export const createAnecdote = async (content) => {

    const payload = asObject(content);
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }
    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error('Failed to create anecdote')
    }

    return await response.json()
}


export const updateAnecdote = async (payload) => {

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }
    const response = await fetch(`${baseUrl}/${payload.id}`, options)

    if (!response.ok) {
        throw new Error('Failed to create anecdote')
    }

    return await response.json()
}
export default { getAll, createAnecdote, updateAnecdote }


