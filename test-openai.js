import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-..." // Buraya OpenAI'dan aldığınız API anahtarını yazın
});

async function testOpenAI() {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        {
          role: "user",
          content: "Write a one-sentence bedtime story about a unicorn.",
        },
      ],
    });

    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error("Hata:", error);
  }
}

testOpenAI();
