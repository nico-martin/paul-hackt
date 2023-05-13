import { NextApiRequest, NextApiResponse } from "next";
import prompt from "../../openai";

const works = [
  {
    id: "park-bei-lu",
    information: `
    ## Park bei Lu., 1938
Das Bild «Park bei Lu.» entstand - so lässt es der Titel vermuten - auf Anregung durch einen Natureindruck, den Klee in einem Park nahe Luzern hatte.

Parkbilder kennen wir vor allem von den Impressionisten, die immer wieder die baumbestandenen Wege mit ihren hellen Sonnenflecken malten, auf denen Spaziergänger flanierten und dabei ihre Kinder und ihre Garderobe ausführten. Klee ist weit von einer solchen Auffassung entfernt. Ihn interessierten nicht das bürgerliche Sonntagsvergnügen und die delikaten Licht- und Schattenspiele unter belaubten Baumkronen, sondern er nahm den Natureindruck zum Anlass für ein zeichenhaftes Bild, in dem sich seine damalige persönliche Verfassung spiegelte.

Park Bei Lu (oder „Park in der Nähe von lu“) ist ein Gemälde von Schweizer-Deutsch Künstler namens Paul Klee Er lebte von 1879 bis 1940 und hatte einen individuellen Stil, den Einfluss zog aus Surrealismus, Expressionismus und Kubismus. Er ist sehr für seine Erkundungen in Farbtheorie angesehen und seine Vorlesungen namens „Schriften über Form und Designtheorie“ als sehr wichtig für moderne Kunst. Er hat auch an gelehrt Bauhaus , die eine Deutsch Kunstschule berühmt für seine Methode des Designs war. Er lehrte neben seinem Kollegen russischen Maler Wassily Kandinsky. Sein Kunstwerk spiegelt oft seine Stimmung, trockenen Humor und Überzeugungen. Dieses besondere Kunstwerk gemalt wurde im Jahr 1938 mit Öl und Farbpaste auf Papier auf Jute gemalt. Die Abmessungen des Bildes sind 100cm hoch und 70 cm breit. Die ursprünglichen Rahmenleisten bleiben auf dem Gemälde. Das Gemälde zeigt schwarze Symbole, die Bäume und deren Äste sowie Pfade in einem Park darstellen. Die Bäume sind ohne Laub, als ob es noch Winter waren. Die umliegenden Zonen der Farbe erscheinen Laub zu sein. Es gibt einen starken Kontrast zwischen den dunkleren Bäumen und bunten Laub. Aus diesem Grunde ist eine Interpretation des Gemäldes, dass das Gemälde Frühling und Winter darstellt und sowohl Aufblühen und Tod innerhalb des gleichen Bildes. Es wird gesagt, dass „Park Bei Lu“ erstellt wurde, als Paul Klee durch einen Eindruck inspiriert wurde er in einem Park von der Natur hatte sich in der Nähe von Luzern. Oft benötigte seine Frau nach Luzern reisen aus gesundheitlichen Gründen eine sanitorium zu besuchen. Während seine Frau im sanitorium besuchen, würde er mit ihr durch den Park spazieren und ohne Zweifel von der Landschaft inspiriert worden wären. Das Kunstwerk ist zur Zeit auf dem Display im Zentrum Paul Klee in Bern, Schweiz. Der „Zentrum Paul Klee“ ist ein Museum für den Künstler Paul Klee selbst gewidmet, von dem italienischen Architekten Renzo Piano entworfen.
`,
    metadata: {
      date: 1938,
      text: "Natur",
      image: "https://www.kunstkopie.de/kunst/paul_klee_11025/park_bei_lu.jpg",
      name: "Park bei Lu",
    },
    adultPrompt:
      'Nachfolgend einige Informationen über das berühmte Bild "Park bei Lu" von "Paul Klee". {name} ist eine kunstinteressierte Erwachsene, die das "Zentrum Paul Klee" besucht. Sie hat einen allgemeinen Überblick über Kunst, aber keine spezifischen Kenntnisse von Kunstgeschichte oder Maltechniken. Beschreibe, wie dieses spezifische Werk Klees ihr eine tiefe und dennoch zugängliche Erfahrung bieten kann, ohne auf spezifische Kunstbegriffe oder Maltechniken einzugehen. Beschränke dich auf vier Sätze. Der Text wird vom Audioguide "Lily" gesprochen. Sprich als "Lily". Begrüsse {name} nicht. Gehe nicht auf Sachen ein, die {name} nicht kennt. {name} steht vor dem Kunstwerk "Park bei Lu"',
    childPrompt:
      "Nachfolgend ein paar Informationen über das bekannte Bild  «Park bei Lu» von «Paul Klee». Fasse diese für {name}, 14 Jahre zusammen. {name} kennt keine Begriffe aus der Kunstgeschichte und keine Maltechniken. Erwähne keine Städtenamen. Jahreszahlen und Jahreszeiten sind für {name} verwirrend. Beschränke dich auf 2 Sätze. Der Text wird vom Audioguide «Lily» gesprochen. Sprich als «Lily». {name} steht vor dem Kunstwerk «Park bei Lu».",
    question: "Magst du, wie die Natur im Bild verfremdet dargestellt wird?",
    questionAdult:
      "Die abstrakte Darstellung der Natur in diesem Bild war im 20. Jahrhundert sehr modern. Ist diese statische Form heute noch angebracht?",
    questionId: "1",
    options: [
      {
        text: "Nee Videos mag ich besser",
        adultText: "Im 21. Jahrhundert passt Video besser",
        value: "true",
        prompt: {
          text: "Du magst also VIDEO besser. Verstehe ich wirklich gut. …",
          prompt: `Nachfolgend ein paar Informationen über das schaffen von  «Paul Klee» als Musiker.
Ergänze den Satz: «Paul Klee hat auch mit Filmen Experimente gemacht und ». Schreibe danach noch einen weiterne satz. Der Text ist für ein Kind, 14 Jahre alt. Der Text wird vom Audioguide in einem Museum gesprochen. Sprich als Audioguide.

Hier die Information von Paul Klee als Musiker:

Musik ist fester Bestandteil in Paul Klees Leben: Als Jugendlicher spielt er im Orchester der Stadt Bern Geige, später musiziert er regelmässig mit seiner Frau Lily und probt mit befreundeten Musiker:innen die Streichquartetten der Klassik und der Romantik. Paul Klee ist auch ein begeisterter Konzert- und Operngänger und baut sich eine ansehnliche Sammlung an Langspielplatten mit klassischer Musik auf. Auch in seiner Kunst nimmt Klee häufig Bezug auf Musik und viele seiner Bilder tragen Titel mit musikalischen Begriffen wie Klang, Rhythmus, Polyphonie oder Harmonie.
`,
        },
      },
      {
        text: "Passt schon",
        adultText: "Bild ist noch immer super!",
        value: "false",
        prompt: {
          text: "Freut mich, dass dir die Bilder gefallen.",
          prompt: `Nachfolgend ein paar Informationen über das Schaffen von  «Paul Klee» als Sammler.
Ergänze den Satz: «Er hat viel Inspiration für die Bilder aus seiner Sammlung genommen. ». Schreibe danach noch einen weiteren Satz. Der Text ist für ein Kind, 14 Jahre alt. Der Text wird vom Audioguide in einem Museum gesprochen. Die Sammlung sieht man nicht. Sprich als Audioguide.

Hier die Information von Paul Klee als Sammler:

## Sammler
Die Natur fasziniert Paul Klee schon als Kind und Jugendlicher. Später bildet die Auseinandersetzung mit den Strukturen und Wachstumsprozessen der Natur die Grundlage seines künstlerischen Schaffens. Er sammelt Muscheln, Algen, Schneckenhäuser und Gesteine und legt ein grosses Herbarium an. Seine Naturaliensammlung bewahrt er jeweils im Atelier auf: Sie dient ihm als wichtige Inspirationsquelle und als Reflexionsraum kunsttheoretischer Überlegungen.
`,
        },
      },
    ],
    endPrompt: `---

Beginne die Antwort mit «Das Gemälde Park bei Lu. von Paul Klee zeigt   ...». Erwähne das Zentrum Paul Klee nicht.
`,
  },
  {
    id: "story",
    metadata: {
      date: 1920,
      text: "verschiedene Materialien",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Paul_Klee_Puppe_Ohne_Titel_%28Schwarzer_Geist%29.jpg/754px-Paul_Klee_Puppe_Ohne_Titel_%28Schwarzer_Geist%29.jpg?20191226183730",
      name: "Puppen",
    },
    information: `Paul Klee hat diese Handpuppen gemacht und damit auch Geschichten für seinen Sohn Felix erfunden.`,
    noPrompt: true,
    question:
      "Wähle 2 Handpuppen aus und ich erfinde eine Geschichte speziell für dich!",
    options: [
      {
        text: "Dichter & Der Geist",
        // @ts-ignore
        adultText: null,
        value: "Dichter",
        prompt: {
          text: "",
          prompt: `Bitte schreibe eine kinderfreundliche und humorvolle kurzgeschichte welche nicht länger als 400 zeichen ist, in der {name} ungewöhnliche Puppen in ihrem Garten entdeckt. Schreibe mit angemessenen Humor ohne störende oder unangemessene Inhalte. Verwende mit den Puppen unterhaltsame Dialoge. Am Ende sollten alle zusammen lachen,


Bitte schreibe im Stil von Astrid Lindgren und beachte, dass die Puppen "Dichter" und "Der Geist" heißen sollen. Bechreibe auf keinen fall die puppen, die Puppen zu genau zu beschreiben, um den Kindern zu ermöglichen, sie selbst zu imaginieren. Die Länge deines Textes sollte 400 Zeichen nicht überschreiten.
Wenn die puppen in irgendeiner art  beschrieben werden oder der text länger als 400 zeichen ist dann wird das resultat schlecht und inakzeptabel


Deine Antwort sollte eine amüsante Situation vermitteln, in der sie eine Rolle bei einem Missverständnis zwischen den Charakteren spielen. Du solltest auch auf ein zufriedenstellendes Ende hinarbeiten.
`,
        },
      },
      {
        text: "Klee & Clown",
        adultText: null,
        value: "Klee",
        prompt: {
          text: "",
          prompt: `Bitte schreibe eine kinderfreundliche und humorvolle kurzgeschichte welche nicht länger als 400 zeichen ist, in der {name} ungewöhnliche Puppen in ihrem Garten entdeckt. Schreibe mit angemessenen Humor ohne störende oder unangemessene Inhalte. Verwende mit den Puppen unterhaltsame Dialoge. Am Ende sollten alle zusammen lachen,


Bitte schreibe im Stil von Astrid Lindgren und beachte, dass die Puppen "Klee" und "Clown" heißen sollen. Bechreibe auf keinen fall die puppen, die Puppen zu genau zu beschreiben, um den Kindern zu ermöglichen, sie selbst zu imaginieren. Die Länge deines Textes sollte 400 Zeichen nicht überschreiten.
Wenn die puppen in irgendeiner art  beschrieben werden oder der text länger als 400 zeichen ist dann wird das resultat schlecht und inakzeptabel


Deine Antwort sollte eine amüsante Situation vermitteln, in der sie eine Rolle bei einem Missverständnis zwischen den Charakteren spielen. Du solltest auch auf ein zufriedenstellendes Ende hinarbeiten.
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
  const name = req.query["name"] as string;
  const isChild = req.query["isChild"] === "true";
  const id = req.query["id"] as string;
  const questionValue = req.query["questionValue"];

  let audioText = "";

  const information = works.find((work) => work.id === id);

  if (!information) {
    res.status(404).send({});
  }

  let promptText = "";
  let additionalText = "";

  if (questionValue === undefined) {
    if (information.information && !information.noPrompt) {
      promptText =
        (isChild
          ? information.childPrompt
          : information.adultPrompt
        ).replaceAll("{name}", name) +
        information.information +
        information.endPrompt;
    }
  } else {
    audioText += additionalText;
    let option = information.options.find(
      (option) => option.value === questionValue
    );
    promptText = option.prompt.prompt.replaceAll("{name}", name);
    additionalText = option.prompt.text;
  }

  let output = "";

  if (information.noPrompt && !questionValue) {
    output = information.information;
  } else if (information.information || questionValue) {
    output = await prompt(promptText, { name, isChild });
    audioText += output;
  }

  let question = undefined;
  if (questionValue === undefined) {
    question = {
      text: isChild ? information.question : information.questionAdult,
      options: information.options.map((option) => {
        return {
          text: isChild || !option.adultText ? option.text : option.adultText,
          value: option.value,
        };
      }),
    };
  }

  return res.status(200).json({
    additionalText,
    message: output,
    question,
    metadata: information.metadata,
  });
}
