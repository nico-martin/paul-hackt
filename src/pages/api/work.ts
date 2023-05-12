import { NextApiRequest, NextApiResponse } from 'next';
import prompt from '../../openai';

const works = [
  {
    id: 'park-bei-lu',
    information: `
    ## Park bei Lu., 1938
Das Bild «Park bei Lu.» entstand - so lässt es der Titel vermuten - auf Anregung durch einen Natureindruck, den Klee in einem Park nahe Luzern hatte.

Parkbilder kennen wir vor allem von den Impressionisten, die immer wieder die baumbestandenen Wege mit ihren hellen Sonnenflecken malten, auf denen Spaziergänger flanierten und dabei ihre Kinder und ihre Garderobe ausführten. Klee ist weit von einer solchen Auffassung entfernt. Ihn interessierten nicht das bürgerliche Sonntagsvergnügen und die delikaten Licht- und Schattenspiele unter belaubten Baumkronen, sondern er nahm den Natureindruck zum Anlass für ein zeichenhaftes Bild, in dem sich seine damalige persönliche Verfassung spiegelte.

Park Bei Lu (oder „Park in der Nähe von lu“) ist ein Gemälde von Schweizer-Deutsch Künstler namens Paul Klee Er lebte von 1879 bis 1940 und hatte einen individuellen Stil, den Einfluss zog aus Surrealismus, Expressionismus und Kubismus. Er ist sehr für seine Erkundungen in Farbtheorie angesehen und seine Vorlesungen namens „Schriften über Form und Designtheorie“ als sehr wichtig für moderne Kunst. Er hat auch an gelehrt Bauhaus , die eine Deutsch Kunstschule berühmt für seine Methode des Designs war. Er lehrte neben seinem Kollegen russischen Maler Wassily Kandinsky. Sein Kunstwerk spiegelt oft seine Stimmung, trockenen Humor und Überzeugungen. Dieses besondere Kunstwerk gemalt wurde im Jahr 1938 mit Öl und Farbpaste auf Papier auf Jute gemalt. Die Abmessungen des Bildes sind 100cm hoch und 70 cm breit. Die ursprünglichen Rahmenleisten bleiben auf dem Gemälde. Das Gemälde zeigt schwarze Symbole, die Bäume und deren Äste sowie Pfade in einem Park darstellen. Die Bäume sind ohne Laub, als ob es noch Winter waren. Die umliegenden Zonen der Farbe erscheinen Laub zu sein. Es gibt einen starken Kontrast zwischen den dunkleren Bäumen und bunten Laub. Aus diesem Grunde ist eine Interpretation des Gemäldes, dass das Gemälde Frühling und Winter darstellt und sowohl Aufblühen und Tod innerhalb des gleichen Bildes. Es wird gesagt, dass „Park Bei Lu“ erstellt wurde, als Paul Klee durch einen Eindruck inspiriert wurde er in einem Park von der Natur hatte sich in der Nähe von Luzern. Oft benötigte seine Frau nach Luzern reisen aus gesundheitlichen Gründen eine sanitorium zu besuchen. Während seine Frau im sanitorium besuchen, würde er mit ihr durch den Park spazieren und ohne Zweifel von der Landschaft inspiriert worden wären. Das Kunstwerk ist zur Zeit auf dem Display im Zentrum Paul Klee in Bern, Schweiz. Der „Zentrum Paul Klee“ ist ein Museum für den Künstler Paul Klee selbst gewidmet, von dem italienischen Architekten Renzo Piano entworfen.
`,
    adultPrompt: '',
    childPrompt:
      'Nachfolgend ein paar Informationen über das bekannte Bild  «Park bei Lu» von «Paul Klee». Fasse diese für {name}, 14 Jahre zusammen. {name} kennt keine Begriffe aus der Kunstgeschichte und keine Maltechniken. Erwähne keine Städtenamen. Jahreszahlen und Jahreszeiten sind für Sandra verwirrend. Beschränke dich auf 2 Sätze. Der Text wird vom Audioguide «Lily» gesprochen. Sprich als «Lily». {name} steht vor dem Kunstwerk «Park bei Lu».',
    question: 'Magst du, wie die Natur im Bild verfremdet dargestellt wird?',
    questionId: '1',
    options: [
      {
        text: 'Nee Videos mag ich besser',
        value: true,
        prompt: {
          text: 'Du magst also VIDEO besser. Verstehe ich wirklich gut. …',
          prompt: `Nachfolgend ein paar Informationen über das schaffen von  «Paul Klee» als Musiker.
Ergänze den Satz: «Paul Klee hat auch mit Filmen Experimente gemacht und ». Schreibe danach noch einen weiterne satz. Der Text ist für ein Kind, 14 Jahre alt. Der Text wird vom Audioguide in einem Museum gesprochen. Sprich als Audioguide.

Hier die Information von Paul Klee als Musiker:

Musik ist fester Bestandteil in Paul Klees Leben: Als Jugendlicher spielt er im Orchester der Stadt Bern Geige, später musiziert er regelmässig mit seiner Frau Lily und probt mit befreundeten Musiker:innen die Streichquartetten der Klassik und der Romantik. Paul Klee ist auch ein begeisterter Konzert- und Operngänger und baut sich eine ansehnliche Sammlung an Langspielplatten mit klassischer Musik auf. Auch in seiner Kunst nimmt Klee häufig Bezug auf Musik und viele seiner Bilder tragen Titel mit musikalischen Begriffen wie Klang, Rhythmus, Polyphonie oder Harmonie.
`,
        },
      },
      {
        text: 'Passt schon',
        value: false,
        prompt: {
          text: 'Freut mich, dass dir die Bilder gefallen.',
          prompt: `Nachfolgend ein paar Informationen über das Schaffen von  «Paul Klee» als Sammler.
Ergänze den Satz: «Er hat viel Inspiration für die Bilder aus seiner Sammlung genommen. ». Schreibe danach noch einen weiteren Satz. Der Text ist für ein Kind, 14 Jahre alt. Der Text wird vom Audioguide in einem Museum gesprochen. Die Sammlung sieht man nicht. Sprich als Audioguide.

Hier die Information von Paul Klee als Sammler:

## Sammler
Die Natur fasziniert Paul Klee schon als Kind und Jugendlicher. Später bildet die Auseinandersetzung mit den Strukturen und Wachstumsprozessen der Natur die Grundlage seines künstlerischen Schaffens. Er sammelt Muscheln, Algen, Schneckenhäuser und Gesteine und legt ein grosses Herbarium an. Seine Naturaliensammlung bewahrt er jeweils im Atelier auf: Sie dient ihm als wichtige Inspirationsquelle und als Reflexionsraum kunsttheoretischer Überlegungen.
`,
        },
      },
    ],
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req.query['name'] as string;
  const isChild = req.query['isChild'] === 'true';
  const id = req.query['id'] as string;
  const questionValue = req.query['questionValue'];

  const information = works.find((work) => work.id === id);

  if (!information) {
    res.status(404).send({});
  }

  let promptText = '';
  let additionalText = '';

  if (questionValue === undefined) {
    promptText =
      (isChild ? information.childPrompt : information.adultPrompt).replaceAll(
        '{name}',
        name
      ) + information.information;
  } else {
    let option = information.options.find(
      (option) => option.value === (questionValue === 'true')
    );
    promptText = option.prompt.prompt;
    additionalText = option.prompt.text;
  }

  const output = await prompt(promptText, { name, isChild });

  let question = undefined;
  if (questionValue === undefined) {
    question = {
      text: information.question,
      options: information.options.map((option) => {
        return { text: option.text, value: option.value };
      }),
    };
  }

  return res.status(200).json({
    additionalText,
    message: output,
    question,
  });
}
