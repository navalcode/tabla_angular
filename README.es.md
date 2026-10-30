# Tabla de alumnos · Angular

[English](README.md)

Práctica de Angular Material para mostrar y ocultar columnas, editar alumnos y eliminar filas. Empieza con seis alumnos ficticios y funciona en memoria. Al recargar se vuelve al estado inicial. **Restablecer ejemplos** recupera los seis alumnos y descarta las ediciones, pero conserva las columnas elegidas.

![Tabla en inglés ejecutada localmente](docs/images/table-en-desktop.jpg)

## Cómo ejecutarla

El entorno comprobado usa **Node 14.21.3 y npm 6.14.18**, instalados de forma aislada. Se conservan Angular CLI 12.2.9 y el lock de dependencias original. Son herramientas históricas; no se recomiendan como base de una aplicación nueva. Consulta la [compatibilidad de Angular](https://angular.dev/reference/versions) y el [estado de las versiones de Node](https://nodejs.org/en/about/previous-releases).

```sh
npm ci
npm start -- --host 127.0.0.1
```

Abre `http://127.0.0.1:4200/`. La interfaz empieza en español; **EN** cambia a inglés. El cambio conserva el borrador, los errores y las columnas elegidas. No necesitas una cuenta ni una clave de API.

Para servir el bundle de producción:

```sh
npm run build -- --configuration production --progress=false
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist/my-app
```

Abre `http://127.0.0.1:8080/`. Los archivos generados no se incluyen en Git.

## Recorrido para probarla

1. Abre **Columnas visibles**. Oculta varias y vuelve a activarlas en otro orden: la tabla mantiene el orden original. La última columna de datos visible queda protegida. Las columnas de edición y eliminación se pueden ocultar por separado.
2. Edita a Ada. El nombre, los apellidos y el curso son obligatorios y tienen límites de longitud. La edad debe ser un entero entre 0 y 120. Un intento inválido no cambia la fila; el resumen de errores enlaza con los campos que debes corregir.
3. Cambia de idioma sin cerrar el editor. Guarda para actualizar la fila o pulsa Cancelar/Escape para descartar el borrador.
4. Elimina un alumno. La confirmación sitúa el foco en Cancelar. Tras eliminarlo, el foco pasa al título de la tabla porque el botón de origen ya no existe.
5. Elimina los seis alumnos y restablece los ejemplos. Esta acción también descarta las ediciones. Recargar restablece datos, columnas e idioma.

En pantallas estrechas, la tabla se desplaza horizontalmente dentro de su contenedor. El contenido del editor tiene su propio desplazamiento y mantiene las acciones al alcance, también en horizontal.

<p>
<img src="docs/images/table-es-mobile.jpg" alt="Tabla en español a 360 píxeles de ancho" width="260">
<img src="docs/images/editor-es-mobile.jpg" alt="Editor con errores de edad y curso y acciones visibles" width="260">
</p>

## Pruebas y código

```sh
npm test -- --watch=false --browsers=ChromeHeadless
```

Este comando necesita Chrome instalado. También puedes ejecutar la misma suite Jasmine abriendo el navegador manualmente:

```sh
npm run test:manual
```

Abre `http://127.0.0.1:9876/` y mantén la pestaña abierta hasta que termine Karma. Si el puerto está ocupado, configura `TABLE_TEST_PORT`. La revisión registrada usó este runner manual: **24 pruebas correctas**, más recorridos sobre el bundle de producción. Son resultados locales, sin CI alojada. Alcance y límites en [verification.json](docs/verification.json).

- [Estado de la tabla](src/app/tabla/tabla.component.ts): selección ordenada de columnas, IDs estables, edición, eliminación y restablecimiento.
- [Editor](src/app/editor/student-editor.component.ts): borrador separado con formulario reactivo; solo guarda si los datos son válidos.
- [Validadores y ejemplos](src/app/student.ts): límites de texto, edad entera y objetos nuevos al restablecer.
- [Traducciones](src/app/i18n.service.ts): recursos españoles con inglés de respaldo; el cambio de idioma no recrea tabla ni editor.
- [Decisiones de diseño](DESIGN.md) y [avisos de terceros](THIRD_PARTY.md).

No hay backend, autenticación ni almacenamiento persistente. Es una práctica, no un sistema de gestión académica. Esta revisión no acredita la seguridad actual de las dependencias, el uso con lector de pantalla ni la preparación para producción. No se ha añadido CI alojada. Las notas originales del CLI se conservan debajo como documentación histórica; no indican que haya un paquete de pruebas end-to-end instalado.

<details>
<summary>Original documentation and credits · Documentación y créditos originales</summary>

# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

</details>

[More of my work · Más proyectos](https://github.com/navalcode)
