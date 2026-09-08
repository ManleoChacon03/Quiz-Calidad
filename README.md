# Cuestionario · Calidad y Pruebas de Software

Aplicación web (Next.js 14 + TypeScript + Tailwind) para el cuestionario de 10
preguntas del Seminario de Tecnologías de Información — UMG. Sin base de
datos: todo el estado vive en el navegador durante la sesión. Al finalizar,
genera y descarga una constancia en PDF con los datos del estudiante y el
resultado.

## Requisitos

- Node.js 18.18 o superior
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Compilar para producción

```bash
npm run build
npm run start
```

## Desplegar en Vercel

### Opción A — Vercel CLI (más rápido, no requiere GitHub)

1. Instala la CLI si no la tienes: `npm install -g vercel`
2. Desde la carpeta del proyecto, ejecuta:
   ```bash
   vercel
   ```
3. Sigue las instrucciones en pantalla (inicia sesión con tu cuenta de
   Vercel — puedes crear una gratis con tu cuenta de GitHub o con tu correo).
4. Cuando pregunte por la configuración, acepta los valores por defecto
   (framework detectado automáticamente: Next.js).
5. Para publicar la versión final:
   ```bash
   vercel --prod
   ```
6. Al terminar te entrega una URL pública (`https://...vercel.app`).

### Opción B — Conectar un repositorio de GitHub

1. Crea un repositorio nuevo en GitHub y sube este proyecto:
   ```bash
   git init
   git add .
   git commit -m "Cuestionario Calidad y Pruebas de Software"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
   git push -u origin main
   ```
2. En https://vercel.com, entra con tu cuenta → **Add New… → Project**.
3. Importa el repositorio recién creado. Vercel detecta Next.js
   automáticamente — no necesitas cambiar nada.
4. Haz clic en **Deploy**. Cada `git push` a `main` vuelve a desplegar solo.

## Estructura

```
app/                Rutas de Next.js (App Router)
components/          LoginScreen, QuizScreen, ResultsScreen, ProgressStrip
lib/questions.ts     Las 10 preguntas, opciones y explicaciones
lib/pdf.ts           Generación de la constancia en PDF (jsPDF, en el navegador)
lib/types.ts         Tipos compartidos
public/umg-logo.png  Logo de la universidad
```

## Editar las preguntas

Todo el contenido del cuestionario vive en `lib/questions.ts`. Cada pregunta
tiene `prompt`, `options`, `correctIndex` y `explanation`.
