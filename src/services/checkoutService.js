export default {
  makePayment: data => {
    return fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => data);
  }
};
