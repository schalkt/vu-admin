// Built-in translations and UI language handling.
// Language order: user choice (localStorage) → browser language (navigator.languages) → first available language.

export const LANGUAGE_STORAGE_KEY = 'vu-language';
export const LANGUAGE_CHANGE_EVENT = 'vu-language-change';

// languages offered in the user menu; override with window.VuSettings.languages
export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'hu', label: 'Magyar' },
];

// keys are the English texts, so 'en' needs no dictionary
export const translations = {
  hu: {
    // common actions (also used as button titles in entity configs)
    All: "Mind",
    Active: "Aktív",
    Actions: "Műveletek",
    Apply: "Alkalmaz",
    Cancel: "Mégse",
    Close: "Bezárás",
    Columns: "Oszlopok",
    Copy: "Másolás",
    Default: "Alapértelmezett",
    Delete: "Törlés",
    Deleted: "Törölt",
    Details: "Részletek",
    Edit: "Szerkesztés",
    Export: "Exportálás",
    Insert: "Beszúrás",
    "Loading...": "Betöltés...",
    More: "Továbbiak",
    New: "Új",
    Reload: "Újratöltés",
    Reset: "Alaphelyzet",
    Save: "Mentés",
    "Save and close": "Mentés és bezárás",
    Send: "Küldés",
    Title: "Cím",

    // table
    hidden: "rejtett",
    "Select all": "Mind kiválaszt",
    "Unselect all": "Mind töröl",
    "Invert all": "Kijelölések megfordítása",
    "Visible all": "Mind látható",
    "Hidden all": "Mind rejtett",
    "Collapse column": "Oszlop összecsukása",
    "Expand column": "Oszlop kinyitása",
    "Expand all": "Mind kinyit",
    "Filter / Sort": "Szűrés / Rendezés",
    Sort: "Rendezés",
    Filters: "Szűrők",
    "=": "Egyenlő",
    ">": "Nagyobb",
    ">=": "Nagyobb vagy egyenlő",
    "<": "Kisebb",
    "<=": "Kisebb vagy egyenlő",

    // pagination
    First: "Első",
    Prev: "Előző",
    Next: "Következő",
    Last: "Utolsó",
    page: "oldal",
    row: "sor",
    "Rows per page": "Sor / oldal",
    "Page navigation": "Lapozás",

    // messages, confirmations
    message: "üzenet",
    messages: "üzenet",
    Saved: "Mentve",
    "Saved all selected items": "Minden kijelölt elem mentve",
    "Saving...": "Mentés...",
    "Saving uploaded files...": "Feltöltött fájlok mentése...",
    "Empty response": "Üres válasz",
    "Network error": "Hálózati hiba",
    "Fill in every field before adding a row.": "Új sor hozzáadása előtt tölts ki minden mezőt.",
    "Are you sure you want to delete this item?": "Biztosan törölni szeretnéd ezt az elemet?",
    "Are you sure you want to delete all selected items?":
      "Biztosan törölni szeretnéd az összes kijelölt elemet?",
    "File upload is in progress. Are you sure you want to close?":
      "Fájlfeltöltés van folyamatban. Biztosan bezárod?",

    // file upload
    "To paste from clipboard, click here and press Ctrl+V": "Vágólapról beillesztéshez kattints ide, és nyomd meg a Ctrl+V-t",
    "You've reached the upload limit": "Elérted a feltöltési korlátot",
    "accept only": "csak ezek engedettek:",
    "Drag to reorder": "Húzd az átrendezéshez",
    "Delete the image": "Kép törlése",
    "Download the image": "Kép letöltése",
    "Open in new tab": "Megnyitás új lapon",
    resized: "átméretezve",
    uploaded: "feltöltve",
    uploading: "feltöltés alatt",
    Uploading: "Feltöltés",
    "original filename": "eredeti fájlnév",
    "uploaded filename": "feltöltött fájlnév",
    "uploading filename": "feltöltés alatti fájlnév",
    "uploaded at": "feltöltve ekkor",
    "Are you sure you want to remove?": "Biztosan eltávolítod?",
    "Are you sure you want to remove all?": "Biztosan eltávolítod az összeset?",
    "Switch language": "Nyelv váltása",
    "Processing files...": "Fájlok feldolgozása...",
    "Loading file: {name}": "Fájl betöltése: {name}",
    "Loading image: {name}": "Kép betöltése: {name}",
    "Processing video: {name}": "Videó feldolgozása: {name}",
    "Resizing image: {name} ({preset})": "Kép átméretezése: {name} ({preset})",
    "Applying image edits...": "Képszerkesztések alkalmazása...",
    "File \"{name}\" has a disallowed extension. Allowed extensions: {ext}":
      "A(z) \"{name}\" fájl kiterjesztése nem engedélyezett. Engedélyezett kiterjesztések: {ext}",
    "Could not process file \"{name}\": it appears to be corrupted or is not a valid file of its type.":
      "A(z) \"{name}\" fájl nem dolgozható fel: sérültnek tűnik, vagy nem érvényes ilyen típusú fájl.",
    "Add watermark on upload": "Vízjel hozzáadása feltöltéskor",
    "Add watermark on save": "Vízjel hozzáadása mentéskor",
    "This image has a watermark applied. Rotating or cropping may distort or cut off the watermark.":
      "A képen vízjel van. Forgatáskor vagy vágáskor a vízjel torzulhat vagy levágódhat.",

    // image editor
    "Rotate left 90°": "Forgatás balra 90°",
    "Rotate right 90°": "Forgatás jobbra 90°",
    "Flip horizontal": "Vízszintes tükrözés",
    "Flip vertical": "Függőleges tükrözés",
    Crop: "Vágás",
    "Clear crop": "Vágás törlése",
    "Blur (B)": "Elmosás (B)",
    "Blur strength (source px)": "Elmosás erőssége (forráskép px)",
    "Draw a rectangle": "Rajzolj egy téglalapot",

    // HTML editor
    Bold: "Félkövér",
    Italic: "Dőlt",
    Underline: "Aláhúzott",
    Strikethrough: "Áthúzott",
    "Normal text": "Normál szöveg",
    Paragraph: "Bekezdés",
    Quote: "Idézet",
    List: "Lista",
    "Bullet list": "Felsorolás",
    "Numbered list": "Számozott lista",
    Alignment: "Igazítás",
    "Align left": "Balra igazítás",
    "Align center": "Középre igazítás",
    "Align right": "Jobbra igazítás",
    "Align justify": "Sorkizárt",
    "Text color": "Szövegszín",
    Background: "Háttér",
    "Alert style": "Figyelmeztetés stílus",
    Float: "Úsztatás",
    Margin: "Külső margó",
    Padding: "Belső margó",
    Link: "Hivatkozás",
    "Link URL:": "Hivatkozás URL:",
    "Link style": "Hivatkozás stílusa",
    "Remove link": "Hivatkozás eltávolítása",
    Undo: "Visszavonás",
    Redo: "Ismétlés",
    "HTML source": "HTML forrás",
    "Insert image": "Kép beszúrása",
    "Edit image": "Kép szerkesztése",
    "Delete image": "Kép törlése",
    "Image URL": "Kép URL",
    "https:// or data: URL": "https:// vagy data: URL",
    "Alt text": "Alternatív szöveg",
    "Description for the image": "A kép leírása",
    "Image Bootstrap classes": "Kép Bootstrap osztályai",
    "Preset (size / format)": "Előbeállítás (méret / formátum)",
    "URL only": "Csak URL",
    "No images in form fields yet. Upload an image or enter an image URL below.":
      "Még nincs kép az űrlap mezőiben. Tölts fel egy képet, vagy add meg a kép URL-jét lent.",
    "No images in form. You can edit the source in the URL field.":
      "Nincs kép az űrlapon. A forrást az URL mezőben szerkesztheted.",

    // video embed
    "Insert video": "Videó beszúrása",
    "Edit video": "Videó szerkesztése",
    "Delete video": "Videó törlése",
    "Video URL or embed code": "Videó URL vagy beágyazó kód",
    "Supported: YouTube, Vimeo, Facebook": "Támogatott: YouTube, Vimeo, Facebook",
    "Unsupported or untrusted video URL.": "Nem támogatott vagy nem megbízható videó URL.",
    "Accessible title of the video": "A videó akadálymentes címe",
    "Allow fullscreen": "Teljes képernyő engedélyezése",
    "Aspect ratio": "Képarány",
    Auto: "Automatikus",
    auto: "automatikus",
    Landscape: "Fekvő",
    Square: "Négyzet",
    Portrait: "Álló",
    landscape: "fekvő",
    square: "négyzet",
    portrait: "álló",
    "portrait phone": "álló (telefon)",
    "Fixed size (no ratio)": "Fix méret (arány nélkül)",
    "Fixed size: the iframe gets exactly the given width and height (never wider than the content).":
      "Fix méret: az iframe pontosan a megadott szélességet és magasságot kapja (sosem szélesebb a tartalomnál).",
    "Size presets": "Méret előbeállítások",
    "Full width": "Teljes szélesség",
    "Fit screen": "Képernyőhöz igazítás",
    "Full width, but at most 85% of the screen height (landscape phone, laptop)":
      "Teljes szélesség, de legfeljebb a képernyő magasságának 85%-a (fekvő telefon, laptop)",
    "Half width": "Fél szélesség",
    "No size": "Nincs méret",
    Width: "Szélesség",
    Height: "Magasság",
    "Width (px)": "Szélesség (px)",
    "Height (px)": "Magasság (px)",
    "Max. width": "Max. szélesség",
    "Max. height": "Max. magasság",
    "px = fixed, % = of content width, vw / vh = of screen width / height. With both set, the smaller one wins, the ratio is kept and the video never overflows the content.":
      "px = fix, % = a tartalom szélességéhez, vw / vh = a képernyő szélességéhez / magasságához. Ha mindkettő meg van adva, a kisebb érvényes, az arány megmarad, és a videó sosem lóg ki a tartalomból.",

    // user menu
    Language: "Nyelv",
    "Sign in": "Bejelentkezés",
    Register: "Regisztráció",
    "Sign out": "Kijelentkezés",
    Profile: "Profil",
    "Switch role": "Szerepkör váltás",
    "No role assigned": "Nincs szerepkör beállítva",
    "A role is required to view and edit data.": "Az adatok megtekintéséhez és szerkesztéséhez szerepkör szükséges.",
  },
};

export function availableLanguages() {
  const custom = typeof window !== 'undefined' && window.VuSettings && window.VuSettings.languages;
  return Array.isArray(custom) && custom.length ? custom : LANGUAGES;
}

function isAvailable(language) {
  return availableLanguages().some((item) => item.value === language);
}

function readStoredLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

export function getBrowserLanguage() {
  if (typeof navigator === 'undefined') {
    return null;
  }
  const candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }
    const code = String(candidate).toLowerCase();
    if (isAvailable(code)) {
      return code;
    }
    const primary = code.split('-')[0];
    if (isAvailable(primary)) {
      return primary;
    }
  }
  return null;
}

export function getLanguage() {
  const stored = readStoredLanguage();
  if (stored && isAvailable(stored)) {
    return stored;
  }
  return getBrowserLanguage() || availableLanguages()[0].value;
}

// store the user's choice and notify every vu-admin component on the page
export function setLanguage(language) {
  if (!isAvailable(language)) {
    return;
  }
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (e) {
    // localStorage unavailable (e.g. private mode) - the choice lasts until reload
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: { language } }));
  }
}
