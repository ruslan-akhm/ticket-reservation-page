export default {
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
  unSecure: ticket => {
    console.log(ticket, typeof ticket);
    return fetch("/api/unsecure", {
      method: "POST",
      body: ticket,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => data);
  },
  reserve: seats => {
    return fetch("/api/reserve", {
      method: "POST",
      body: JSON.stringify(seats),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => data);
  },
  modify: params => {
    return fetch("/api/modify", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => data);
  }
};
