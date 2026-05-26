const { Mistral } = require('@mistralai/mistralai');
require('dotenv').config();

async function testMistral() {
  const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
  console.log("Testing Mistral connection...");
  try {
    const chatResponse = await client.chat.complete({
      model: 'mistral-tiny',
      messages: [{ role: 'user', content: 'Hello' }],
    });
    console.log("Success:", chatResponse.choices[0].message.content);
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

testMistral();
