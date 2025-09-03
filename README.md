# Sitio Web Sanchez Bricks

Este repositorio contiene el sitio estático de **Sanchez Bricks**.

> Usuario GitHub actual: **AkaBronko1**

## Estructura
website/
  index.html
  productos.html
  producto.html
  proyectos.html
  proyecto.html
  calculadora.html
  cotizar.html
  soporte.html
  ubicacion.html
  acerca-de.html
  en/index.html (versión en inglés)
  assets/
    hero-bg.png
    brick-wall.png
    product-placeholder.png
  scripts.js
  styles.css
```

## Requisitos previos
- Cuenta en GitHub
- Git instalado (https://git-scm.com)
- (Opcional) Dominio propio

## Publicar en GitHub Pages (método rápido)
1. Crea un repositorio en GitHub (ej: `sanchez-bricks`) SIN README, SIN `.gitignore`.
2. Abre PowerShell y ve a la carpeta del sitio (la que tiene `index.html`):
   ```powershell
   cd d:\documentos\sanchez_bricks_website\website
   ```
3. Inicializa y primer commit:
   ```powershell
   git init
   git add .
   git commit -m "Publicación inicial"
   git branch -M main
   ```
4. Agrega el remoto (ya personalizado):
   ```powershell
   git remote add origin https://github.com/AkaBronko1/sanchez-bricks.git
   git push -u origin main
   ```
5. En GitHub: Settings > Pages > (Build and deployment) > Source: "Deploy from a branch" > Branch: `main` / folder: `/ (root)` > Save.
6. Espera 1-2 minutos y visita: `https://AkaBronko1.github.io/sanchez-bricks/`

### Actualizar cambios
```powershell
git add .
git commit -m "Actualiza contenido"
git push
```

## (Opcional futuro) Dominio personalizado
Cuando compres un dominio podrás:
1. Crear 4 registros A a 185.199.108.153 / 109.153 / 110.153 / 111.153.
2. CNAME `www` -> `AkaBronko1.github.io` (opcional).
3. Añadir archivo `CNAME` con el dominio (sin `www`).
4. Guardar en Settings > Pages y activar HTTPS.

## Script de despliegue rápido
Se incluye `deploy.ps1` para automatizar (ver sección siguiente) si prefieres.

## deploy.ps1
Variables clave dentro del script:
- `$RepoName` (nombre del repositorio)
- `$User` (tu usuario GitHub)

Puedes ejecutarlo así:
```powershell
./deploy.ps1 -User AkaBronko1 -Repo sanchez-bricks -MainBranch main
```

## Buenas prácticas
- Usar rutas relativas a assets (`./assets/imagen.png`).
- Comprimir imágenes (usar https://squoosh.app).
- Meta descripción y título único en cada página.
- Añadir `alt` descriptivo a imágenes.

## Próximos pasos sugeridos
- Añadir favicon (`favicon.ico`).
- Implementar analítica (por ejemplo Plausible o GA4) agregando el script en `index.html`.
- Optimizar imágenes a WebP.

## Licencia
Puedes elegir una licencia pública añadiendo un archivo `LICENSE` (MIT recomendado) según tus necesidades.
