export type Question = {
  id: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const QUIZ_TITLE = "Calidad de software y pruebas automatizadas";

export const questions: Question[] = [
  {
    id: 1,
    prompt:
      "¿Qué norma internacional define formalmente la calidad de software como el grado en que un producto satisface las necesidades explícitas e implícitas de sus usuarios?",
    options: [
      "ISO/IEC 25010",
      "ISO 9001",
      "IEEE 829",
      "CMMI Nivel 3",
    ],
    correctIndex: 0,
    explanation:
      "La ISO/IEC 25010 es el estándar citado para la definición formal de calidad de software y sus ocho dimensiones.",
  },
  {
    id: 2,
    prompt:
      "De las ocho dimensiones de calidad de la ISO/IEC 25010, ¿cuál responde a la pregunta \"¿es fácil de aprender y usar?\"?",
    options: ["Portabilidad", "Usabilidad", "Compatibilidad", "Eficiencia de desempeño"],
    correctIndex: 1,
    explanation:
      "La usabilidad evalúa qué tan fácil es aprender y usar el software.",
  },
  {
    id: 3,
    prompt:
      "En el caso de Knight Capital (1 de agosto de 2012), ¿cuánto dinero perdió la firma y en cuánto tiempo?",
    options: [
      "$7,000 millones en un día",
      "$44 millones en 24 horas",
      "$440 millones en 45 minutos",
      "$2.41 billones en un año",
    ],
    correctIndex: 2,
    explanation:
      "Knight Capital perdió $440 millones de dólares en 45 minutos debido a un código obsoleto ('Power Peg') que quedó activo por error en uno de sus servidores.",
  },
  {
    id: 4,
    prompt:
      "¿Cuál fue una de las causas raíz identificadas en la falla de Knight Capital?",
    options: [
      "Un ataque de hackers externos",
      "Falta de controles de despliegue consistentes entre servidores y ausencia de kill switches",
      "Un corte de energía en el centro de datos",
      "Un error de un usuario final al llenar un formulario",
    ],
    correctIndex: 1,
    explanation:
      "La causa raíz fue la falta de controles de despliegue consistentes entre servidores, la ausencia de interruptores de emergencia (kill switches) y pruebas de aceptación insuficientes antes de producción.",
  },
  {
    id: 5,
    prompt:
      "Según la curva de costo de Boehm, ¿en qué fase es más barato corregir un defecto?",
    options: [
      "En producción, una vez que el cliente lo reporta",
      "Durante las pruebas finales",
      "Durante la codificación",
      "Durante los requisitos o el diseño",
    ],
    correctIndex: 3,
    explanation:
      "Corregir un defecto durante los requisitos o el diseño es la opción más barata; el costo crece mientras más tarde se detecta el error.",
  },
  {
    id: 6,
    prompt:
      "En la pirámide de pruebas de Mike Cohn, ¿qué porcentaje aproximado de la suite debería corresponder a pruebas unitarias?",
    options: ["~10%", "~20%", "~70%", "~50%"],
    correctIndex: 2,
    explanation:
      "Las pruebas unitarias forman la base de la pirámide y deberían representar alrededor del 70% de la suite, ya que son rápidas y baratas.",
  },
  {
    id: 7,
    prompt:
      "¿Cómo se llama el antipatrón en el que un equipo tiene muchas pruebas E2E/UI y muy pocas pruebas unitarias?",
    options: [
      "Pirámide invertida de Cohn",
      "Cono de helado (ice-cream cone)",
      "Diamante de pruebas",
      "Caja gris",
    ],
    correctIndex: 1,
    explanation:
      "El patrón opuesto a la pirámide (muchas pruebas E2E y pocas unitarias) se llama 'cono de helado' y produce suites lentas, frágiles y difíciles de mantener.",
  },
  {
    id: 8,
    prompt:
      "En el patrón Arrange-Act-Assert usado para probar la calculadora, ¿qué ocurre en el paso 'Act'?",
    options: [
      "Se comprueba que el resultado obtenido sea el esperado",
      "Se prepara la función o el componente que se va a probar",
      "Se ejecuta la operación con valores conocidos, por ejemplo sumar(5, 3)",
      "Se reporta el error a producción",
    ],
    correctIndex: 2,
    explanation:
      "'Act' es el paso donde se ejecuta la operación con valores conocidos; 'Arrange' prepara el escenario y 'Assert' verifica el resultado.",
  },
  {
    id: 9,
    prompt:
      "Según el World Quality Report 2023 (Capgemini, Sogeti y OpenText), ¿qué porcentaje de organizaciones automatizó más de la mitad de su suite de pruebas de regresión?",
    options: ["26%", "58%", "72%", "89%"],
    correctIndex: 1,
    explanation:
      "El 58% de las organizaciones automatizó más de la mitad de su suite de regresión, aunque solo el 26% superó el 75% de cobertura automatizada.",
  },
  {
    id: 10,
    prompt:
      "De las herramientas mencionadas, ¿cuál se usa principalmente para probar APIs de forma manual y automatizada?",
    options: ["Selenium", "Cypress", "JUnit / pytest", "Postman"],
    correctIndex: 3,
    explanation:
      "Postman se utiliza para probar APIs de forma manual y automatizada, mientras que Selenium y Cypress se enfocan en pruebas web/E2E y JUnit/pytest en pruebas unitarias.",
  },
];
