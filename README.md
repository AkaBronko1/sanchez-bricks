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

## Dominio personalizado con Cloudflare (sanchezbricks.com)

### Archivos en el repositorio
Debe existir un archivo `CNAME` en la raíz (junto a `index.html`) con:
```
sanchezbricks.com
```

### Configuración en GitHub Pages
1. Ir a Settings > Pages.
2. En Custom domain escribir: `sanchezbricks.com` y guardar.
3. Activar "Enforce HTTPS" cuando el candado aparezca (puede tardar unos minutos tras la propagación DNS).

### DNS en Cloudflare (Zona: sanchezbricks.com)
Registros recomendados (proxy activado naranja SI quieres caché básica):
| Tipo | Nombre | Contenido | TTL | Proxy |
|------|--------|----------|-----|-------|
| A | @ | 185.199.108.153 | Auto | ON |
| A | @ | 185.199.109.153 | Auto | ON |
| A | @ | 185.199.110.153 | Auto | ON |
| A | @ | 185.199.111.153 | Auto | ON |
| CNAME | www | AkaBronko1.github.io | Auto | ON |

Cloudflare hace CNAME flattening automático para el apex (@). Si no quieres usar `www`, puedes dejarlo igual apuntando para redirigir.

### Redirección www -> raíz (opcional)
En Cloudflare > Rules > Redirect Rules:
Crear regla:
- Si Hostname equals `www.sanchezbricks.com`
- Forwarding URL (301) a `https://sanchezbricks.com/$1`

### SSL/TLS en Cloudflare
1. SSL/TLS > Overview: modo "Full" (no "Flexible").
2. Edge Certificates: asegurar que HTTP/2 y Always Use HTTPS estén habilitados.

### Limpieza de caché al cambiar
Si cambias el archivo `CNAME` o la configuración:
1. Hacer commit y push.
2. Purge Cache en Cloudflare (opcional: Purge Everything).
3. Esperar 2–10 minutos.
4. Probar en ventana incógnito.

### Verificación
Comprobar con:
```
nslookup sanchezbricks.com
nslookup www.sanchezbricks.com
```
Deberían resolver a las IP de GitHub Pages.

Si ves un redirect incorrecto, verificar que NO exista caché de un antiguo `CNAME` y que la regla de redirección esté bien.

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
