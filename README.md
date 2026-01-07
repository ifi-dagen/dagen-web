# Dagen Web

Next.js-nettside for **Dagen @ IFI**.  
Bygget med **TypeScript** og **Tailwind CSS**.  
Prosjektet kjører uten backend, men krever at `content/` og `public/` eksisterer lokalt.

---

## Kom i gang

### 1 Klon prosjektet
```bash
git clone <repo-url>
cd dagen-web
```

### 2 Installer npm
```bash
npm install
```

### 3 Lag nødvendige mapper
Disse mappen må eksistere for at siden skal fungere.  
*Det er lagt opp til at disse vanligvis hentes fra privat content repo*
```bash
mkdir -p content/hjem
mkdir -p content/bedrift/FAQ/answers
mkdir -p content/bli-med/interngrupper
mkdir -p public/logos
mkdir -p public/members
mkdir -p public/web-design
```

### (Optional) Kontaktform
Opprett `.env.local` hvis Formspree skal brukes
```bash
NEXT_PUBLIC_FORMSPREE_ID=...
```

### Kjør lokalt
```bash
npm run dev
```
Åpne:
[http://localhost:300](http://localhost:3000)

### Minimum filstruktur for content
For at siden skal fungere
```markdown
content/
├── hjem/
│   ├── hjemside.csv
│   ├── members.csv
│   └── *.md
│
├── bedrift/
│   ├── bedriftside.csv
│   ├── stillingsannonser.csv
│   └── FAQ/
│       ├── faq.csv
│       └── answers/*.md
│
└── bli-med/
    ├── bli_med.csv
    └── interngrupper/*.md
```

### CSV-formater
CSV-filen brukes til å sette opp sider eller deler av sider.

**Sideoppsett**, hjem, bedrift og bli med:  
`hjemside.csv`, `bedriftside.csv`,`bli_med.csv`  
Header | Beskrivelse
-|-
Index | Hvilken rad elementet tilhører
File | Markdown-fil eller bilde
ButtonHref | (optional) lenke til knapp
ButtonLabel | (optional) tekst på knapp
Size | (optional) prosentvis størrelse relativ til andre elementer

Oversikt over medlemmer: `members.csv`:  
```csv
Name,Title,Email,Picture
```

`stillingsannonser.csv`:
```csv
Tittel,Firma,Frist,URL,Logo
```

`faq.csv`:
```csv
Question,Answer
```
`Answer` referer til en markdown-fil i `FAQ/answers/`.  

### Minimum filstruktur for public
```markdown
public/
├── logos/
├── members/
└── web-design/
```