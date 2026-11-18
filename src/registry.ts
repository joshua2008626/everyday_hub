export type Cat='Utilities'|'Productivity'|'Media'|'Education'|'Health'|'Games'|'Advanced'
export interface AppDef{id:string;name:string;desc:string;cat:Cat;offline:boolean;needs?:string}
const C:Record<string,Cat>={u:'Utilities',p:'Productivity',m:'Media',e:'Education',h:'Health',g:'Games',a:'Advanced'}
// c|id|name|description|needs-permission (optional)
const raw=`u|calc|Standard Calculator|Arithmetic with history
u|sci|Scientific Calculator|Trig, logs, powers
u|alarm|Alarm Clock|Alarms (tab must stay open)|Browser can't ring when closed
u|stopwatch|Stopwatch|Laps and timing
u|timer|Countdown Timer|Presets and custom timers
u|compass|Compass|Device heading|Orientation sensor
u|torch|Flashlight|Camera torch|Camera
u|calendar|Calendar|Events and reminders
u|units|Unit Converter|Length, weight, temp and more
u|qr|QR Generator & Scanner|Create and scan codes|Camera for scanning
u|level|Spirit Level|Tilt measurement|Motion sensor
u|ruler|Ruler|Approximate on-screen ruler
u|random|Random Number Generator|Custom ranges
u|color|Color Picker|HEX, RGB, HSL
u|dates|Date Calculator|Differences and age
p|notes|Notes|Pinned, searchable notes
p|todo|To-Do Manager|Tasks with priorities
p|voice|Voice Recorder|Record and download|Microphone
p|diary|Personal Diary|Daily entries and moods
p|habits|Habit Tracker|Streaks and check-ins
p|docscan|Document Scanner|Camera to PDF|Camera
p|vault|Password Manager|Local encrypted vault
p|expenses|Expense Tracker|Income, expenses, CSV
p|pomodoro|Pomodoro Timer|Focus and breaks
p|journal|Personal Journal|Tagged free writing
p|planner|Daily Planner|Timeline view
p|shopping|Shopping List|Quantities and categories
m|music|Music Player|Local audio playlists
m|video|Video Player|Local video, speed control
m|gallery|Photo Gallery|Local images and albums
m|ebook|E-book Reader|EPUB reading
m|pdf|PDF Reader|Zoom and search
m|podcast|Podcast Player|Speed and bookmarks
m|audioedit|Audio Recorder & Editor|Record and trim|Microphone
m|photoedit|Photo Editor|Crop, filters, export
m|draw|Sketchpad|Brushes, undo, export
m|tts|Text-to-Speech|Read text aloud
e|dict|Offline Dictionary|Local definitions
e|periodic|Periodic Table|All 118 elements
e|flash|Flashcards|Spaced repetition
e|typing|Typing Practice|WPM and accuracy
e|mathprac|Math Practice|Arithmetic to geometry
e|lang|Language Learning|Vocab decks and phrases
e|atlas|World Atlas|Countries and capitals
e|codeprac|Coding Practice|HTML/CSS/JS exercises
e|sciref|Scientific Reference|Formulas and constants
e|grammar|Grammar Checker|Basic offline rules
e|study|Study Timer|Sessions and stats
e|quiz|Quiz Maker|Build and score quizzes
h|steps|Step Counter|Motion or manual log|Motion sensor
h|water|Water Tracker|Daily target
h|breathe|Breathing Exercise|Guided breathing
h|sleep|Sleep Log|Manual sleep records
h|workout|Workout Log|Sets and reps
h|measure|Measurement Journal|Private measurements
h|firstaid|First Aid Reference|Call emergency services first
h|recipes|Recipe Book|Saved recipes
h|routine|Daily Routines|Morning and evening lists
h|meals|Meal Planner|Weekly planning
h|goals|Goals Tracker|Milestones and progress
h|fitness|Fitness Journal|Activity history
g|sudoku|Sudoku|Classic puzzle
g|chess|Chess|Play a local AI
g|mines|Minesweeper|Clear the field
g|2048|2048|Merge tiles
g|solitaire|Solitaire|Klondike
g|crossword|Crossword|Word puzzle
g|ttt|Tic-Tac-Toe|Vs computer
g|memory|Memory Match|Find pairs
g|wordsearch|Word Search|Find hidden words
g|sliding|Sliding Puzzle|Order the tiles
a|files|File Manager|Imported files
a|texted|Text Editor|Edit and download
a|zip|ZIP Extractor|Open local archives
a|json|JSON Formatter|Validate and format
a|md|Markdown Editor|Live preview
a|html|HTML Playground|Sandboxed preview
a|b64|Base64 Tool|Encode and decode
a|hash|Hash Generator|Web Crypto SHA
a|uuid|UUID Generator|Copy and export
a|barcode|Barcode Generator|Export images
a|text|Text Utilities|Counts, case, diff
a|backup|Backup & Restore|JSON export/import`
export const APPS:AppDef[]=raw.split('\n').map(l=>{const[c,id,name,desc,needs]=l.split('|');return{id,name,desc,cat:C[c],offline:true,needs}})
export const CATS=Array.from(new Set(APPS.map(a=>a.cat)))
export const COLLECTIONS:{name:string;desc:string;ids:string[]}[]=[
{name:'Student Toolkit',desc:'Study, practise and revise',ids:['sci','flash','quiz','study','pomodoro','periodic','dict','mathprac','typing','notes']},
{name:'Productivity Toolkit',desc:'Plan, focus and follow through',ids:['todo','notes','planner','pomodoro','habits','calendar','timer','goals']},
{name:'Daily Essentials',desc:'Everyday quick tools',ids:['calc','alarm','timer','notes','todo','calendar','torch','units','water']},
{name:'Travel Toolkit',desc:'On the move',ids:['units','compass','atlas','lang','qr','torch','expenses','firstaid','calendar']},
{name:'Developer Toolkit',desc:'Code, convert and inspect',ids:['json','b64','hash','uuid','html','md','texted','text','color','barcode']},
{name:'Personal Finance Toolkit',desc:'Money, lists and goals',ids:['expenses','calc','vault','shopping','dates','goals']}]
