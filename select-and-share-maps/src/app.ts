import axios from "axios"

const form = document.querySelector("form")! as HTMLFormElement
const addressInput = document.getElementById("address")! as HTMLInputElement

const GOOGLE_API_KEY = "TODO"

type GoogleGeocodingResponseCodes = "OK" | "ZERO_RESULTS" | "OVER_DAILY_LIMIT" | "OVER_QUERY_LIMIT" | "REQUEST_DENIED" | "INVALID_REQUEST" | "UNKNOWN_ERROR"

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number, lng: number } } }[],
    status: GoogleGeocodingResponseCodes
}

const searchAddressHandler = (event: Event) => {
    event.preventDefault()
    const enteredAddress = addressInput.value
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}+View,+CA&key=${GOOGLE_API_KEY}`

    axios.get<GoogleGeocodingResponse>(url)
        .then(response => {
            if (response.data.status !== "OK") {
                throw new Error("Could not fetch location")
            }
            const coordinates = response.data.results[0].geometry.location
            const map = new google.maps.Map(document.getElementById("map")!, {
                center: coordinates,
                zoom: 16
            });

            new google.maps.Marker({ position: coordinates, map: map })
        })
        .catch(error => {
            console.log(error)
        })

    console.log({ enteredAddress })
}

form.addEventListener("submit", searchAddressHandler)