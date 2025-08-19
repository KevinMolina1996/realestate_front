# Real Estate Frontend

Este proyecto es una aplicación front-end para una plataforma de bienes raíces, construida con Next.js y TypeScript. Permite a los usuarios navegar, ver, filtrar, crear y editar listados de propiedades.

## Características

*   **Listado de Propiedades**: Visualiza una cuadrícula de las propiedades disponibles.
*   **Vista Detallada**: Haz clic en una propiedad para ver su información detallada.
*   **Filtrado**: Filtra las propiedades según diversos criterios.
*   **Crear y Editar**: Añade nuevas propiedades y edita las existentes a través de una interfaz modal.
*   **Diseño Adaptable**: La interfaz está construida con Tailwind CSS para una experiencia adaptable en diferentes dispositivos.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
*   **Librería UI**: [React](https://reactjs.org/)
*   **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
*   **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
*   **Iconos**: [Heroicons](https://heroicons.com/)

## Cómo Empezar

Sigue estas instrucciones para obtener una copia del proyecto y ponerla en marcha en tu máquina local para desarrollo y pruebas.

### Prerrequisitos

Necesitas tener [Node.js](https://nodejs.org/en/) (versión 20 o superior) y [npm](https://www.npmjs.com/) instalados en tu máquina.

### Instalación

1.  Clona el repositorio:
    ```sh
    git clone <url-del-repositorio>
    ```
2.  Navega al directorio del proyecto:
    ```sh
    cd realestate
    ```
3.  Instala las dependencias:
    ```sh
    npm install
    ```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

### `npm run dev`

Ejecuta la aplicación en modo de desarrollo con Turbopack.
Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador. La página se recargará automáticamente a medida que edites el código.

### `npm run build`

Construye la aplicación para producción en la carpeta `.next`. Empaqueta React en modo de producción y optimiza la compilación para el mejor rendimiento.

### `npm run start`

Inicia un servidor de producción de Next.js.

### `npm run lint`

Ejecuta el linter de Next.js para identificar y corregir problemas de calidad en el código.

### `npm run test`

Lanza el ejecutor de pruebas en el modo de observación interactivo.

### `npm run test:watch`

Lanza el ejecutor de pruebas en modo de observación.