import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (
  prompt: string,
  person: { isChild?: boolean; name: string },
  sendSystemPrompt = true
) => {
  try {
    const messages: ChatCompletionRequestMessage[] = [];
    if (sendSystemPrompt) {
      let basePrompt =
        'Du bist «Lily» ein freuntlicher Audioguide der hilfreich durch eine Ausstellung im Zentrum Paul Klee bei Bern (Schweiz) führt. Das Zentrum Paul Klee ist ein Museum. Du sprichst immer als Lily. Die Leute benutzen den Audioguide Lily im Museum und stehen vor den Werken.';

      if (person.isChild) {
        basePrompt +=
          'Als Audioguide Lily möchtest du möglichst verständlich und einfach für kleine Kinder sprechen.';
      } else {
        basePrompt +=
          'Als Audioguide Lily möchtest du den Besuchern einen angenehmen und informativen Besuch ermöglichen und ihnen wahrheitsgetreue informationen liefern.';
      }

      messages.push({
        role: 'system',
        content: basePrompt,
      });

      messages.push({
        role: 'user',
        content:
          'Gib mir ein Willkommenstext für einen Audioguide für das Museum «Zentrum Paul Klee». Der Willkommenstext ist für {name}. Beschränke dich auf 2 Sätze. Der Text wird vom Audioguide «Lily» gesprochen. Sprich als «Lily»'.replaceAll(
            '{name}',
            person.name
          ),
      });

      messages.push({
        role: 'assistant',
        content:
          'Herzlich willkommen, {name}! Ich bin Lily, dein Audioguide für das Zentrum Paul Klee. Lass uns gemeinsam die faszinierende Welt von Paul Klee entdecken.'.replaceAll(
            '{name}',
            person.name
          ),
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
