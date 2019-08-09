logic.retrieveFavs = function (id, token, trackId)  {
    //let favorites

    validate.string(id, 'id')
    validate.string(token, 'token')
    validate.string(trackId, 'track id')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            const favorites = response.data.favorites

            if (!favorites.length) return []

            const calls = favorites.map(id =>
                call(`http://skylabcoders.herokuapp.com/proxy?url=https://api.musixmatch.com/ws/1.1/track.get?apikey=e492562d27469098b0922d5d580837eb&commontrack_id=${trackId}`, undefined, undefined, undefined)
                    .then(track => (track.favorite = true) && track)
            )

            return Promise.all(calls)
        })
}