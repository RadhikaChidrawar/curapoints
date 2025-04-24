import twilio from "twilio";

const sendWhatsAppMessage = async (phone, message, sid, token, twilioNumber) => {
    const client = twilio(sid, token); // Make sure SID and Token are passed here
    return client.messages.create({
        from: `whatsapp:${twilioNumber}`,
        to: `whatsapp:${phone}`,
        body: message
    });
};

export default sendWhatsAppMessage;
