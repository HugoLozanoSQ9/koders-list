const API_URL = "https://koders-list-api.vercel.app"

export function getKoders() {

    return fetch(`${API_URL}/koders`)
        .then((response) => response.json())
        .then((data) => data.koders)

}

export function createKoder(koder) {
    return fetch(`${API_URL}/koders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstName: koder.firstName,
            lastName: koder.lastName,
            email: koder.email
        })
    })

}
export function deleteKoder(id) {
    return fetch(`${API_URL}/koders/${id}/delete`, {
        method: "POST"
    })
}

// La misma función pero en async
// export async function getKodersAsync(){
//     const res = await fetch(`${API_URL}/koders`)
//     const data = res.json()
//     return data-koders
// }
