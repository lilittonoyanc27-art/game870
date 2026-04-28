export interface ColorTheory {
  color: string;
  spanish: string;
  hex: string;
  rules: string;
}

export interface ColorQuestion {
  id: string;
  prompt: string;
  choices: string[];
  target: string;
  translation: string;
}

export const COLOR_THEORY: ColorTheory[] = [
  { color: 'Red', spanish: 'Rojo / Roja', hex: '#ef4444', rules: 'Ends in -o, changes to -a for feminine. Plural: rojos / rojas.' },
  { color: 'Yellow', spanish: 'Amarillo / Amarilla', hex: '#eab308', rules: 'Ends in -o, changes to -a for feminine. Plural: amarillos / amarillas.' },
  { color: 'Orange', spanish: 'Naranja', hex: '#f97316', rules: 'Stays the same for masculine and feminine. Plural: naranjas.' },
  { color: 'Blue', spanish: 'Azul', hex: '#3b82f6', rules: 'Stays the same for masculine and feminine. Plural: azules.' },
  { color: 'Green', spanish: 'Verde', hex: '#22c55e', rules: 'Stays the same for masculine and feminine. Plural: verdes.' },
  { color: 'White', spanish: 'Blanco / Blanca', hex: '#ffffff', rules: 'Ends in -o, changes to -a for feminine. Plural: blancos / blancas.' },
  { color: 'Black', spanish: 'Negro / Negra', hex: '#000000', rules: 'Ends in -o, changes to -a for feminine. Plural: negros / negras.' },
];

export const COLOR_QUESTIONS: ColorQuestion[] = [
  { id: '1', prompt: 'La manzana es ___.', choices: ['rojo', 'roja', 'rojas'], target: 'roja', translation: 'Խնձորը կարմիր է:' },
  { id: '2', prompt: 'El sol es ___.', choices: ['amarillo', 'amarilla', 'amarillos'], target: 'amarillo', translation: 'Արևը դեղին է:' },
  { id: '3', prompt: 'Las nubes son ___.', choices: ['blanco', 'blanca', 'blancas'], target: 'blancas', translation: 'Ամպերը սպիտակ են:' },
  { id: '4', prompt: 'Los coches son ___.', choices: ['negro', 'negros', 'negra'], target: 'negros', translation: 'Մեքենաները սև են:' },
  { id: '5', prompt: 'La fresa es ___.', choices: ['rojo', 'roja', 'rojos'], target: 'roja', translation: 'Ելակը կարմիր է:' },
  { id: '6', prompt: 'El cielo es ___.', choices: ['azul', 'azules', 'azula'], target: 'azul', translation: 'Երկինքը կապույտ է:' },
  { id: '7', prompt: 'Las hojas son ___.', choices: ['verde', 'verdes', 'verda'], target: 'verdes', translation: 'Տերևները կանաչ են:' },
  { id: '8', prompt: 'La naranja es ___.', choices: ['naranja', 'naranjas', 'naranjo'], target: 'naranja', translation: 'Նարինջը նարնջագույն է:' },
  { id: '9', prompt: 'El gato es ___.', choices: ['blanco', 'blanca', 'blancos'], target: 'blanco', translation: 'Կատուն սպիտակ է:' },
  { id: '10', prompt: 'Las mochilas son ___.', choices: ['amarillo', 'amarilla', 'amarillas'], target: 'amarillas', translation: 'Ուսապարկերը դեղին են:' }
];
