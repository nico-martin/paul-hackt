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
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req.query['name'] as string;
  const isChild = Boolean(req.query['isChild']);
  const id = req.query['id'] as string;

  const information = works.find((work) => work.id === id);

  if (!information) {
    res.status(404).send({});
  }

  const output = await prompt(
    (isChild ? information.childPrompt : information.adultPrompt).replaceAll(
      '{name}',
      name
    ) + information.information
  );

  return res.status(200).json({ message: output });
}
