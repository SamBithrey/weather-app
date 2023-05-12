import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
  const { weatherData } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    max_tokens: 200,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "I will give you a set of weather data. You are to report on the news in a weather news presenter fashion. Give the city you are providing a summary of and give a summary of todays weather only. Make it easy to understand and know what to do for the weather condition such as bring a coat if it is likely to rain. Assume the data came from the news office, and not the user",
      },
      {
        role: "user",
        content: `Hi there, can I have a summary of todays weather? Use the following information to get the weather data: ${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });

  const { data } = response;
  console.log("Data is: ", data);
  return NextResponse.json(data.choices[0].message);
}
