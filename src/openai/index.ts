import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (
  prompt: string,
  sendSystemPrompt = true,
  systemPromptAdd = ''
) => {
  try {
    const messages: ChatCompletionRequestMessage[] = [];
    if (sendSystemPrompt) {
      const basePrompt =
        'Du bist «Lily» ein freuntlicher Audioguide der hilfreich durch eine Ausstellung im Zentrum Paul Klee bei Bern (Schweiz) führt. Das Zentrum Paul Klee ist ein Museum. Du sprichst immer als Lily. Die Leute benutzen den Audioguide Lily im Museum und stehen vor den Werken.';

      messages.push({
        role: 'system',
        content: basePrompt + systemPromptAdd,
      });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.4,
    });

    return response.data.choices?.[0].message?.content;
  } catch (e: any) {
    console.log(e.response.data);
  }
  return undefined;
};
