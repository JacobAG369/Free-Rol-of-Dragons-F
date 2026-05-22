# Free Rol of Dragons - Frontend Web

Este repositorio contiene la Capa de Presentación (Frontend) para el proyecto Free Rol of Dragons. Desarrollada como una Single Page Application (SPA), su objetivo es reemplazar la navegación de los documentos tradicionales, ofreciendo una experiencia interactiva y ágil para los jugadores y directores de juego.

## Propósito del Módulo
La interfaz está diseñada para consumir la API de nuestro backend y proporcionar tres espacios de trabajo principales:

1. Módulo de Compendio: Buscador principal con autocompletado y filtros múltiples para consultar razas, clases, hechizos y monstruos del SRD.
2. Módulo de Creación: Formularios interactivos paso a paso para la creación de personajes y contenido homebrew (reglas personalizadas) en tiempo real.
3. Módulo de Campaña: Un panel de control (dashboard) para que los Directores de Juego organicen sus mundos, notas y marcadores rápidos.

## Stack 
* Librería Principal: React
* Herramienta de Construcción: Vite
* Diseño UI: Figma

## Miembros del Equipo (AdaptiCode)
* Oscar Alberto Serna Morán
* Jesús Aviña Alcalá
* Jimmy Aviña Gómez
* Jennifer Evelyn Estrada Medina
* Samuel Osuna Medina
* José Fabián López Castillo

## Instalación y Configuración Local

Sigue estos pasos para levantar el entorno de desarrollo de React en tu máquina local:

### 1. Clonar el repositorio
```bash
git clone <url del repo>
cd free-rol-dragons-web
```

### 2. Instalar dependencias
Asegúrate de tener Node.js instalado y ejecuta:
```bash
npm install
```

### 3. Configurar Variables de Entorno (Opcional)
Si necesitas conectar el frontend a tu entorno local de Django, crea un archivo .env en la raíz del proyecto (este archivo está ignorado por Git) y define la URL de la API:
```bash
Code snippet
VITE_API_URL=http://localhost:8000/api
```


### 4. Levantar el servidor de desarrollo
```bash
npm run dev
```

