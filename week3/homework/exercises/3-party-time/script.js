/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */
const fetch = require('node-fetch');

async function makeReservation() {
  const reservation = {
    name: 'Sayed Mahmood Ghaem Maghami',
    numberOfPeople: 4,
  };

  try {
    const res = await fetch(
      'https://reservation100-sandbox.mxapps.io/api/reservations',
      {
        method: 'post',
        body: JSON.stringify(reservation),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

makeReservation();
