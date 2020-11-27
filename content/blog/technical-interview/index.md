---
title: La entrevista técnica
description: Qué tipos de entrevistas técnicas podemos encontrar y consejos sobre como hacer una entrevista técnica.
date: '2020-11-27T15:00:00.000Z'
categories:
  - JavaScript
  - Interview
keywords:
  - JavaScript
  - Interview
  - Cómo hacer una entrevista técnica
published: true
cover: ./interview.webp
---

La entrevista técnica es una de las partes que más miedo puede dar a la hora de buscar nuevos trabajos cómo programador. Los que nos dedicamos a esto tendemos a subestimarnos con respecto a nuestras capacidades técnicas y sufrir el llamado “síndrome del impostor”. 

En este post me gustaría recoger un poco la información que he podido reunir según mi propia experiencia en el sector y lo que he aprendido sobre como prepararse y cómo actuar en la tan temida entrevista técnica. 

## La entrevista técnica

Primero de todo decir que no existe un sólo tipo de entrevista técnica. Existen varios tipos que podríamos dividir por contenido y por forma. Si hablamos en la forma de la entrevista, esta puede ser:

### Conversación técnica

![Conversación técnica](./conversations.webp)

Esto es una conversación que puede ser tanto presencial como telemática, en la que el entrevistador te irá preguntando, muchas veces apoyándose en tus experiencias previas, sobre tus conocimientos en distintos ámbitos del trabajo como desarrollador. 

Es común que te pregunte por las tecnologías con las que has trabajado, con qué te encuentras más cómodo, si haces testing, cómo resuelves problemas recurrentes relacionados con estas tecnologías, metodología de trabajo, etc… Este tipo de entrevistas son ideales para demostrar tu personalidad, cómo trabajas en equipo, tus capacidades de liderazgo y tus conocimientos técnicos de forma genérica. 

Una buena forma de prepararse para ello es, por cada una de las experiencias de tu currículo, intentar hacerse una tabla en la que desarrolles:

- Cuáles han sido las dificultades a las que te has enfrentado. 
- Los errores que has cometido, cosas que te hayan gustado y hayas aprendido. 
- Momentos en los que hayas demostrado capacidad de liderazgo y hayas adquirido un rol de responsabilidad. 
- Conflictos que te hayas encontrado y como los superaste. 
- Un pequeño resumen de tu aprendizaje y que cambiarías después de todo esto.

Para resolver este tipo de preguntas existen muchas estrategias, una que me parece realmente útil es la llamada [S.T.A.R](https://en.wikipedia.org/wiki/Situation,_task,_action,_result) (Situation, Task, Action, Result.) 

Esta técnica consiste en que en un primer momento describes **la situación** y el origen de ella. A partir de esta situación fijas **un objetivo** a cumplir. Después explicas **la forma en la que lo resolviste**, intentando mostrar de forma indirecta tus cualidades, por ejemplo si había un problema con un compañero, puedes mostrar tu empatía explicando como ayudaste a ese compañero, si había un problema de desorganización con las tareas puedes mostrar tu capacidad de gestión diciendo como organizaste para que el trabajo saliese adelante, etc…
Por último expones **el resultado de tus acciones** y el aprendizaje que has tenido de ello.

Recuerda que **tu objetivo es venderte**, pero no puede ser algo muy evidente porque corres el riesgo de sonar arrogante. Intenta siempre ser **específico en los datos**, de esta forma puedes remarcar tus cualidades sin sonar demasiado pedante.

Antes de esta entrevista, repasa técnicamente todos los proyectos en los que has trabajado, es probable que te pregunten detalles técnicos de alguno de ellos y es importante ser capaz de dar una explicación detallada de tu rol en el proyecto y de las tenologías que se usaron. Es común que te pregunten por tus **debilidades y fortalezas**. Por favor, no contestes la típica respuesta de: “mi mayor debilidad es que trabajo mucho”. Sé sincero, todos tenemos debilidades y no hay problema en encararlas, simplemente explica **cómo gestionas esa debilidad** y qué haces en tu día a día para minimizarla. 

Otra pregunta muy común con la que empezar la entrevista suele ser el típico: **_"Bueno, cuéntame sobre ti."_** 

Para esta pregunta lo más importante es **seguir una estructura**. Lo más común es empezar por tu puesto y situación actual. Después hablar sobre tus orígenes, como empezaste en esto, estudios, etc… Hacer un breve resumen de tus pasadas experiencias en orden cronológico para volver a tu situación actual donde puedes dar un poco más de contexto y detalle. Por último, comentar tus aficiones fuera del trabajo, sobre todo si están relacionadas con el puesto y un breve resumen de todo.

Para terminar, es común que el entrevistador deje unos minutos para que **tú hagas preguntas**. 

Podemos pensar en tres tipos de preguntas: 

- Preguntas para demostrar **tus conocimientos técnicos**. Si conoces las tecnologías que la empresa usa, puedes aprovechar para preguntar sobre posibles dificultades que conozcas de ellas. Por ejemplo, si usan Redux, puedes preguntar como hacen para organizar el estado cuándo la aplicación crece. O por qué eligieron redux frente a la ApiContext de react. 
- También puedes mostrar **tu pasión por ciertas tecnologías**, por ejemplo si es una empresa que trate con un gran volumen de clientes puedes decir que te interesa mucho aprender sobre escalabilidad y preguntar si existe la oportunidad de aprender sobre ello en el puesto.
- Por último aprovecha para preguntar **cosas que realmente te interesen**. Pregunta sobre la formación que ofrece la empresa, plan de carrera, cuáles son las mayores dificultades del puesto, que se espera de tu rol, etc…

### Prueba técnica

Otro tipo de entrevista es la prueba técnica pura y dura. Este tipo de entrevistas también tienen varios formatos. Puede ser una **prueba a realizar en casa** y que les tengas que enviar pasados unos días. Puede ser un **pair programming** en directo o telemático o incluso una de las llamadas **white boards**, en las que te enfrentes a un problema que resolver en una pizarra.

#### Ejercicio para resolver desde casa

![Prueba desde casa](./home-develop.webp)

Si la prueba es un ejercicio que tengas que resolver en casa. En primer lugar te recomendaría conocer bien las tenologías que utilizan en la empresa y cómo va a ser tu rol. Si sabes que vas a trabajar haciendo una API rest con Django, utiliza este framework, si sabes que la empresa utiliza mongoDb como base de datos, no hagas tu proyecto en PostgreSQL. En el caso de tener dudas, pregunta a tu entrevistador. 
**No reinventes la rueda**, si existe un generador, no intentes crear tú todo de cero a no ser que sepas que en el puesto vas a tener que realizar estas tareas. Por ejemplo si vas a montar un react, por regla general usa create-react-app. 

Siempre **testea todo el código que hagas**. Tanto en test unitarios como con e2e. Intenta lucirte, usa patrones si los conoces y son aplicables. Obviamente tenemos un tiempo limitado y no puede estar perfecta, pero si hay algo que con más tiempo harías de otra forma, intenta explicarlo a través de un comentario en el código. 
**Se ordenado con git**. Utiliza gitflow en la medida de lo posible y haz comentarios coherentes en los commits. 

Añade un README.md al repositorio haciendo una breve descripción de que has hecho, cómo lo has hecho y los motivos por los que has tomado estas decisiones. Si la aplicación tiene un layout complicado, puedes añadir wireframes de figma o sketch explicando como es el user flow de la aplicación.


#### Pair programming

![Pair programming](./pair-programming.webp)

Otro caso muy común de entrevista técnica es el pair programming. Este como hemos dicho, puede ser presencial o telemático. En ambos casos es parecido. Pueden ponerte un problema que resolver mediante un algoritmo o una situación “semi-real” en la que tengas que resolver una situación del día a día. 

Para este tipo de pruebas, lo primero que debes hacer es **acotar el problema**. Pregunta a tu entrevistador todo lo que necesites, define los casos límite, resuelve tus dudas y asegúrate de haber entendido bien los requerimientos. 
Una vez tengas todo claro, repite en voz alta el problema con tus propias palabras y tu interpretación, para asegurarte de que has comprendido correctamente.
En este tipo de prueba diría que lo más importante es **ser comunicativo**. Ve explicando en voz alta tu proceso de razonamiento. Si en un principio no tienes una solución ideal y elegante, no te preocupes, **comienza con la fuerza bruta** y poco a poco ve refinando. 

Haz caso de las pistas que te vaya dando el entrevistador. Recuerda que está ahí para ayudarte y **comparte tus opiniones con él**. Estáis en el mismo equipo así que intenta actuar como lo harías en tu día a día con un compañero.

Por último, si te bloqueas háblalo con naturalidad, es normal ponerse nervioso sobre todo si tienes poca experiencia. Si ves que estás en blanco, dilo. Relájate e incluso propón pasar la entrevista a otro día. Puede sonar a que lo has perdido, pero siempre se puede resurgir y es mejor optar a otra oportunidad en la que puedas deslumbrar que darte por vencido y tirar la toalla.


#### White boards

![white Board](./white-board.webp)

Los consejos y comentarios del punto anterior aplican exactamente igual en los ejercicios de white board. Sobre todo en el caso de que sea una prueba de resolución algoritmos. Solamente añadir que, al no tener en este caso un IDE que nos autocomplete el código o nos avise de los errores, es más aceptable cometer pequeños bugs o errores gramaticales. Puedes ser un poco más abstracto, pero **sin caer en pseudocódigo**. 

Una buena técnica para estos casos, puede ser utilizar la llamada Notación Húngara, que consiste en añadir un pequeño “tip” al principio de las variables para indicarnos que tipo de variable es, por ejemplo un IUser, nos diría que es una interface, un sNames nos puede indicar que se trata de un string, etc… Eso nos ayudará a saber que variable vamos a utilizar y no mezclarlas. Explica antes de hacerlo porqué lo estás haciendo para no llevar a confusión a tu entrevistador y piense que es algo que haces siempre ya que esta no es una buena práctica en el código real.

Dentro de los whiteboards, otro tipo muy común de pruebas son las de **diseño de un sistema**. En este tipo de prueba te pedirán que diseñes la estructura de una aplicación tipo. Por ejemplo, *"¿Sabrías como diseñar twitter?"*

Este tipo de preguntas son bastante complejas y se entrenan poco. Para ello lo más importante es **definir los requerimientos y acotar al máximo**. Por ejemplo en twitter, puedes definir que vas a necesitar un timeline de un usuario, los contactos, etc.. y obviar la parte de chat, para así quitar complejidad a la pregunta. 

Pregunta sobre **detalles de producto**, ¿cuántos usuarios se esperan? Esta vista, ¿va a interactuar en tiempo real? El contenido multimedia, ¿van a ser sólo imágenes o también trataremos vídeos y audios?
Lo cierto es que este tipo de prueba es muy abierta, no existe una única solución posible y necesita de muchos conocimientos por tu parte. Si quieres prepararla bien el mejor recurso que he encontrado por internet es este curso: 

[Grokking the System Design Interview](https://www.educative.io/courses/grokking-the-system-design-interview)

Esto es todo, espero que haya servido de ayuda. 😄