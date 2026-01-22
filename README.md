# 📱 Impostor Futbolero (Expo + React Native)

Juego de ronda **ultra simple** para jugar pasando el celu de mano en mano.  
Antes de cada ronda elegís **cantidad de jugadores**, **impostores** y **1 categoría**.  
Cada persona toca la pantalla para ver su rol: **IMPOSTOR** o la **palabra secreta** (según la categoría).  
Al terminar de repartir, aparece una pantalla final que **no revela** la palabra (sin spoilers) y arranca el juego.

---

## ✨ Features

- 🎛️ **Setup rápido**: jugadores, impostores y **categoría** (una por ronda).
- 🌙 **Modo oscuro** por defecto.
- 🕵️ **Impostor** ve “IMPOSTOR”; el resto ve la palabra/elemento.
- 🧠 **Categorías incluidas**:
  - **Jugadores** (fútbol; lista grande)
  - **Comida** (argenta)
  - **Lugares** (Argentina)
  - **Deportes**
  - **Países** (los más conocidos)
- 🧾 Pantalla final: muestra **categoría** y recuento, **sin revelar** la palabra.
- ✅ Flujo: **pantalla negra → revelar → volver a negro → siguiente**. La última persona termina en pantalla **“¡Roles repartidos!”** (sin spoilers).

---

## 🧩 Tecnología

- **Expo** + **React Native** + **Expo Router (TypeScript)**
- Estructura de rutas por archivos en `app/`

```
app/
  _layout.tsx   # estado global + categorías + generador de rondas
  index.tsx     # pantalla de setup (jugadores, impostores, categoría)
  reveal.tsx    # pantalla negra / revelar rol (según categoría)
  end.tsx       # fin de reparto (sin spoilers)
```

---

## ▶️ Probar en tu teléfono sin compilar (Expo Go)

1. Instalá **Expo Go** en tu Android/iOS.
2. En el proyecto:
   ```bash
   npm install
   npm run start     # o: npx expo start
   ```
3. Escaneá el **QR** con Expo Go (misma Wi‑Fi).  
   Si no conecta, en la consola presioná **s** y elegí **Tunnel**, o:
   ```bash
   npx expo start --tunnel
   ```

**Atajos**: `r` recarga, `R` reinicia bundler, `?` ayuda, `w` abre Web.  
Si algo quedó cacheado raro: `npx expo start -c`.

---

## ⚙️ Configuración / Personalización

- **Categorías e ítems**: editar en `app/_layout.tsx`
  - `BASE_JUGADORES`: lista de jugadores
  - `CATEGORY_ITEMS`: palabras por categoría
- **Textos y estilos**: en cada pantalla (`index.tsx`, `reveal.tsx`, `end.tsx`).
- **Lógica de ronda**: función `generateRound(...)` en `_layout.tsx`.
- **Revancha**: `rematch()` repite la última categoría y parámetros.

---

## 📦 APK opcional (instalable en Android con EAS Build)

> Solo si querés el **.apk** para abrir como app nativa (sin Expo Go).

1) Ajustá **app.json** (ejemplo mínimo):

```jsonc
{
  "expo": {
    "name": "Impostor Futbolero",
    "slug": "impostor-futbolero",
    "scheme": "impostorfutbolero",
    "userInterfaceStyle": "dark",
    "android": {
      "package": "com.tuusuario.impostorfutbolero", // único
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundColor": "#0B1220"
      }
    },
    "plugins": ["expo-router"]
  }
}
```

2) Instalá y logueate en **EAS**:
```bash
npm i -g eas-cli
eas login            # o: eas login --token TU_TOKEN
eas build:configure
```

3) **eas.json** con perfil APK:
```jsonc
{
  "cli": { "version": ">= 3.0.0", "appVersionSource": "remote" },
  "build": {
    "preview": { "android": { "buildType": "apk" }, "distribution": "internal" },
    "production": { "android": { "buildType": "app-bundle" }, "distribution": "store", "autoIncrement": true }
  }
}
```

4) Build del APK:
```bash
eas build -p android --profile preview
```
Abrí la **URL** de descarga en tu teléfono e instalá el `.apk`.  
(Si te lo pide, activá *instalar apps de orígenes desconocidos*).

---

## 🧪 Cómo se juega (propuesta)

1. **Setup**: definí jugadores, impostores y elegí la categoría.
2. **Reparto**: pasá el celu; cada uno toca → ve su rol → toca de nuevo y se lo pasa al siguiente.
3. **Listo**: al finalizar, aparece una pantalla que confirma la categoría y arranca la ronda real.
4. **Objetivo**:  
   - **Civiles**: describir la palabra (o jugador) sin decirla explícitamente.  
   - **Impostor**: disimular e intentar adivinar cuál es la palabra/categoría sin que lo descubran.

---

## 🧯 Troubleshooting

- **Expo Go no conecta** → usar **Tunnel** (`s` en la consola o `--tunnel`).
- **Cambios no aparecen** → `r` para recargar o `npx expo start -c` para limpiar caché.
- **Errores de navegación** → evitá `router.replace` durante el render (ya está resuelto con `useEffect` donde corresponde).

---

## 📄 Licencia

Uso personal / educativo. Podés adaptar y redistribuir libremente citando la fuente del proyecto original.
