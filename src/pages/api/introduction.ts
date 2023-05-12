import { NextApiRequest, NextApiResponse } from 'next';
import prompt from '../../openai'


const basicChildPrompt = `Nachfolgend ein paar Informationen über Paul Klee. Fasse diese für {name}, 14 Jahre zusammen. {name} kennt keine Begriffe aus der Kunstgeschichte und keine Maltechniken. Erwähne keine Städtenamen. Jahreszahlen und Jahreszeiten sind für Sandra verwirrend. Erwähne, wie langweilig sonst Museen sind, aber im Zentrum «Zentrum Paul Klee» das vielleicht anders ist. Beschränke dich auf 2 Sätze. Der Text wird vom Audioguide «Lily» gesprochen. Sprich als «Lily». `

const basicAdultPrompt = ``

const paulKleeInformation = `
---

1879 – 1898 Kindheit und Jugend
Paul Klee wird 1879 in Münchenbuchsee bei Bern geboren: sein Vater ist Musiklehrer, die Mutter Sängerin. Der Vater ist deutscher Staatsbürger, weshalb auch Klee als Deutscher registriert wird. Seine Kinder- und Jugendjahre verbringt Klee in Bern. Ab 7 Jahren spielt er Geige und entwickelt sich zum begabten Musiker. Als Jugendlicher beginnt er, Skizzenbücher mit Zeichnungen zu füllen. Er kopiert nach Kalenderblättern und stellt geschickt seine Umgebung – Bern und das Berner Oberland – dar.

1898 – 1910 Ausbildung zum Künstler
1898 zieht Klee zum Kunststudium nach München. Doch der Unterricht an der Kunstakademie erweist sich als altmodisch. Klee ist zwar ein guter Zeichner, im Umgang mit Pinsel und Farbe fühlt er sich trotz der Ausbildung unsicher. 1901 bricht Klee das Studium ab, kehrt nach Bern zurück und begibt sich Ende Jahr auf eine 6-monatige Italienreise. Auch diese lässt ihn ratlos zurück. In den folgenden Jahren sucht Klee nach einer zeitgemässen und eigenen Bildsprache. Techniken wie Radierung, Hinterglasmalerei oder Schwarzaquarelle helfen ihm dabei. Von der Farbe hält er sich weitgehend fern. Satire wird zu einem wichtigen Thema, das er etwa in Radierungen umsetzt – Werke, die ihn erstmals zufriedenstellen. 1906 heiratet Klee die Pianistin Lily Stumpf und zieht zu ihr nach München. Im folgenden Jahr kommt ihr einziges Kind Felix zur Welt. Neben seiner künstlerischen Arbeit sorgt er für das Kind und den Haushalt, während Lily Klee durch Klavierunterricht den Lebensunterhalt verdient.

1911 – 1920 Vernetzung in der Kunstszene
Die ersten Jahre in München sind geprägt von zahlreichen Bekanntschaften in der Kunstszene. Klee lernt den Künstler und Schriftsteller Alfred Kubin kennen und schliesslich die Kunstschaffenden des Blauen Reiter. Während einer Parisreise studiert Klee den Kubismus und zieht daraus seine eigenen Schlüsse. Es entstehen erste abstrakte Werke und Klee tastet sich an die Farbe heran. 1914 reist er mit dem Jugendfreund Louis Moillet und August Macke nach Tunesien. Die Reise wird zur Offenbarung. Die Eindrücke des Lichts, der Farben und der Städtearchitektur setzt er in abstrakten Bildstrukturen mit gegenständlichen Motiven um. Er beginnt selbstsicher mit Farbe zu arbeiten. Ab 1916 ist Klee als Reservist im Kriegsdienst. Er kann seine künstlerische Arbeit dennoch weiterentwickeln. Neben bunten Aquarellen mit märchenhaft-erzählerischer Figurenwelt kommentiert er in Zeichnungen das Kriegsgeschehen kritisch. Die farbigen Bilder stossen in der Kunstwelt auf Interesse. 1920 erscheinen die ersten Bücher über Klee, und der Münchner Galerist Hans Goltz beginnt Verkaufsausstellungen zu organisieren.

1921 – 1931 Die Bauhausjahre
Klee beginnt im April 1921 eine Stelle am Bauhaus in Weimar. Im Formunterricht erklärt er den Studierenden die Entstehung geometrischer Formen. Ihn beschäftigen besonders Farbstufungen, Bewegungsvorgänge und natürliche Wachstumsprozesse. Das kreative Umfeld am Bauhaus wirkt sich auf sein Schaffen aus: Theater, Musik, Fotografie und Film sowie konstruktivistische Tendenzen regen ihn zu neuen Arbeiten an. Abstrakte Farbfeldmalereien entstehen neben gegenständlichen Zeichnungen. Klee wird sich nie ausschliesslich für Abstraktion oder Gegenständlichkeit entscheiden. Er schafft in Bezug auf die Bildsprache wie auch auf Technik und Material ein vielfältiges Werk. Ende der 1920er Jahre wird die zeitliche Belastung durch Vorlesungen am Bauhaus zu gross. Schliesslich nimmt er 1931 eine Stelle an der Kunstakademie in Düsseldorf an.

1932 – 1940 Das späte Schaffen
Die politischen Veränderungen in Deutschland prägen nicht nur Paul Klees Biografie, sondern auch sein künstlerisches Schaffen. 1933 setzt er sich intensiv mit der sich verändernden Situation und kommentiert in einer Reihe von Zeichnungen die Stimmung der Unterdrückung und Gewalt. Noch im selben Jahr wird Klee aus seiner Anstellung entlassen, da er den Obrigkeiten nicht mehr genehm ist und auch sein Schaffen später als entartet bezeichnet wird. Mit Lily Klee und seiner Katze Bimbo emigriert er nach Bern. Eine bescheidene Dreizimmerwohnung mit zum Atelier umfunktioniertem Wohnzimmer wird Klees letzte Lebensstation. Der Neuanfang in Bern wird auch künstlerisch zur Herausforderung. Er knüpft an sein bisheriges Werk an, versucht aber immer konzentrierter und zeichenhafter zu arbeiten. 1935 erkrankt Klee an Sklerodermie. Bis zu seinem Tod im Jahr 1940 kommentiert er in tausenden von Zeichnungen und Kleisterfarbearbeiten sowie in einigen grossformatigen Gemälden auf wenige Linien reduziert das menschliche Dasein.
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const name = req.query['name'] as string
    const isChild = Boolean(req.query['isChild'])

    let promptText = ''

    if (isChild) {
        promptText += basicChildPrompt
    } else {
        promptText += basicAdultPrompt
    }

    promptText += paulKleeInformation

    const output = await prompt(promptText.replaceAll('{name}', name))

    return res.status(200).json({ 'message': output })
}
