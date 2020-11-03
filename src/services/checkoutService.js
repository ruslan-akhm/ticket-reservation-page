export default {
  makePayment: seat => {
    return fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(seat),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => data);
  }
};
