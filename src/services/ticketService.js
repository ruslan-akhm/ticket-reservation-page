let ticketService = {
  update: () => {
    return fetch("/api")
      .then(res => res.json())
      .then(data => data);
  },
  secure: seats => {
    return fetch("/api/secure", {
      method: "POST",
      body: JSON.stringify(seats),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => data);
  },
  unSecure: seat => {
    return fetch("/api/unsecure", {
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

export default ticketService
