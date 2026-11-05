# Compatibilidad con Foundry VTT 14

El sistema requiere Foundry VTT 14. Las fichas conservan el diseño y los
formularios existentes mediante `foundry.appv1.sheets`, todavía disponible en
v14, aunque obsoleto desde v13. No se ha realizado una conversión a ApplicationV2;
las ventanas independientes de esa API no forman parte de esta actualización.

## Cambios de API

- Registro de fichas mediante `foundry.applications.apps.DocumentSheetConfig`,
  sustituyendo las fichas base V2 de Foundry y marcando las del sistema como
  predeterminadas para sus tipos.
- Acceso a utilidades, plantillas, documentos y dados por sus espacios de nombres.
- Contextos de ficha que esperan `super.getData(options)` y usan `CONFIG.masacre`.
- Mensajes con `style: CONST.CHAT_MESSAGE_STYLES.OTHER` y tiradas en `rolls: [roll]`.
  El emisor se obtiene con `ChatMessage.getSpeaker({ actor })`.
- Preparación síncrona de todos los valores máximos de las armas.

No se cambia el esquema de datos persistidos ni se reescriben los compendios.

## Comprobaciones automáticas

Con Node.js 22 o posterior y las dependencias del proyecto instaladas:

```bash
node --test tests/foundry-v14.test.mjs
```

Estas pruebas utilizan dobles de las API de Foundry; no sustituyen las pruebas
de integración en un mundo real.

## Comprobación manual en Foundry

Antes de abrir un mundo de v13 en v14, haz una copia de seguridad. Prueba primero
en una copia del mundo, sin módulos activos.

1. Inicia el mundo y comprueba la consola del navegador: no debe haber errores
   de referencias a las API globales antiguas.
2. Abre y edita fichas de personaje y alienígena, y cada tipo de objeto:
   arma, rango, habilidad alienígena, equipo, recurso y medalla.
3. Cambia nombres, imágenes, casillas, campos numéricos y texto enriquecido;
   cierra y vuelve a abrir para comprobar que se guardan.
4. Arrastra objetos desde el compendio a un personaje. Comprueba el cambio de
   rango y la asignación de equipo y recursos.
5. Realiza tiradas de habilidad y bajas; comprueba el resultado, la fórmula,
   el emisor y los dados adjuntos en el chat. Usa el botón de añadir bajas y
   verifica tanto el contador actual como el total.
6. Inicia un combate, tira iniciativa y avanza de ronda. Comprueba que se
   reinician las iniciativas. Repite con un token no vinculado y con un jugador.
7. Comprueba las fichas y mensajes con los idiomas español e inglés.

## Referencias

- [API de Foundry VTT 14](https://foundryvtt.com/api/)
- [Fichas clásicas](https://foundryvtt.com/api/modules/foundry.appv1.sheets.html)
- [DocumentSheetConfig](https://foundryvtt.com/api/classes/foundry.applications.apps.DocumentSheetConfig.html)
- [Datos de ChatMessage](https://foundryvtt.com/api/interfaces/foundry.documents.types.ChatMessageData.html)
