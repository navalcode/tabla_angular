# Student table design

The interface keeps Angular Material's semantic table and dialog behavior. A wide heading, a collapsible column selector and open rows leave room for names and actions. On small screens, columns scroll within the table rather than widening the document or silently changing the selection.

Paper `#faf8f3`, ink `#202421`, copper `#9b432f` and muted text `#5e625c` follow the shared portfolio direction. Outfit is served locally under OFL. Controls use a 12 px radius; form inputs and table action buttons are at least 48 px high. Language buttons and checkbox labels are at least 44 px high. The initial heading uses 32–48 px type, not a marketing hero.

The editor uses two name columns when space permits, then age and course. On small screens the fields stack. The dialog is a constrained flex column: only the content scrolls; heading and actions remain available at 360×800 and 800×360. The reload notice belongs to the scrollable content. Error links focus the corresponding input. Cancel and Escape discard the draft; a valid save preserves the row ID.

Removal requires confirmation with Cancel initially focused. The original trigger regains focus on cancel or edit; deleting that row returns focus to the table heading. Resetting recreates the six fixture records and retains column selection. All stored state is in memory.

Copy names actions and explains consequences. The reset explanation includes the loss of edits. Spanish is the initial language, with English fallback. Status messages are translated from keys so they follow later language changes. Fictional data is explained once at table level and where it helps with editing, rather than repeated on every row.

Two independently generated table/editor references informed the layout before implementation. Their extra add button and invented records were rejected. They are private design references, not screenshots or runtime assets. The public images are captures of the built application.

Angular animations read the reduced-motion preference at bootstrap; CSS transitions and ripples also honor the media query. The review checked source guards, not an emulated operating-system preference. This is not a formal accessibility certification. See docs/verification.json for the executed checks.

## Español

Se conserva la tabla semántica de Angular Material, con filas abiertas y un selector de columnas plegable. En móvil, el desplazamiento queda dentro de la tabla sin alterar la selección. El editor adapta sus campos al ancho disponible y desplaza solo el contenido: título y acciones permanecen al alcance en vertical y horizontal.

La paleta marfil, carbón y cobre, Outfit local y radios de 12 px mantienen la dirección común. Los campos y acciones de fila miden al menos 48 px; idioma y etiquetas de checkbox, 44 px. Los textos explican acciones y consecuencias, incluida la pérdida de ediciones al restablecer. Los errores enlazan con los campos y el foco se recupera al cerrar diálogos.

Las referencias generadas se analizaron antes de implementar y no se presentan como ejecución. Las capturas públicas proceden del bundle construido. La preferencia de movimiento reducido se contempla en código; no se acredita una emulación del sistema ni una auditoría formal de accesibilidad.
