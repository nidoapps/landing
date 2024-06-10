// const fetch = require("node-fetch");

const sendEmail = async (email, name, message) => {
  const apiKey = " NjkwN2M3YjItMmQ0OC00ZTJkLWJmZjctZWYxMzA0OTkzOWYy"; // Reemplaza con tu API Key de OneSignal
  const appId = "738993bd-0285-41fe-9eff-33ac439c213e"; // Reemplaza con tu ID de aplicación de OneSignal
  const url = `https://onesignal.com/api/v1/notifications`;

  const body = {
    app_id: appId,
    included_segments: ["Contact"],
    email_subject: "Nuevo Mensaje de Contacto",
    email_body: `Nombre: ${name}<br>Email: ${email}<br>Mensaje: ${message}`,
    email_from_name: `${name}`,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const userType = document.getElementById("userType").value;
    try {
      const isSubscribed = await subscribeUser(email, userType);

      if (!isSubscribed) {
        alert("No se pudo suscribir el usuario. Inténtalo de nuevo.");
      }
      await sendEmail(email, name, message);
    } catch (error) {
      console.error("Error:", error);
    }
  });

async function subscribeUser(email, userType) {
  const response = await fetch("https://onesignal.com/api/v1/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic NjkwN2M3YjItMmQ0OC00ZTJkLWJmZjctZWYxMzA0OTkzOWYy",
    },
    body: JSON.stringify({
      app_id: "738993bd-0285-41fe-9eff-33ac439c213e",
      identifier: email,
      tags: { userType: userType },
      device_type: 11,
    }),
  });

  const data = await response.json();

  if (data.errors) {
    throw new Error("Error al suscribir el usuario: " + data.errors);
  } else {
    return true;
  }
}
