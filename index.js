const sqlite3 = require("sqlite3").verbose();

// open database in memory
let db = new sqlite3.Database("./database.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

let jour = Date.now();
let hash = db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run(`
    CREATE TABLE IF NOT EXISTS Bloc(
      id int NOT NULL,
      hash text NOT NULL,
      previous_hash text, 
      timestamp date NOT NULL, 
      contributing_node int NOT NULL, 
      data text NOT NULL
    )`);

  const stmt = db.prepare(
    `INSERT INTO Bloc (id, hash, previous_hash, timestamp, contributing_node, data) VALUES (?,?,?,?,?,?)`
  );
  console.log(jour);

  stmt.run(
    2,
    "f7ef4470baab892cba081c0f446b07e062990eb7595a7bd3d651c9d9a26ca555",
    "e8f565a686d2ce0136e02214d83cf897a5aea60a415dd8f44fb5d8e31f666db5",
    jour,
    1,
    "{ text:      'poche  trois  francs  quarante  pour  finir  le  mois.  Cela  représentait  deux  dîners  sans  déjeuners,  ou  deux  déjeuners  sans  dîners,  au  choix.  Il  réfléchit  que  les  repas  du  matin  étant  de  vingt-deux  sous,  au lieu de trente que coûtaient ceux du soir, il lui resterait, en se contentant des déjeuners, un franc vingt centimes de boni, ce qui représentait encore deux collations au pain et au saucisson, plus deux bocks   sur   le   boulevard.   C’était   là   sa   grande   dépense et son grand plaisir des nuits ; et il se mit à descendre la rue Notre-Dame-de-Lorette. Il  marchait  ainsi  qu’au  temps  où  il  portait  l’uniforme  des  hussards,  la  poitrine  bombée,  les  jambes un peu entrouvertes comme s’il venait de descendre  de  cheval     ;  et  il  avançait  brutalement  dans la rue pleine de monde, heurtant les épaules, poussant les gens pour ne point se déranger de sa route.  Il  inclinait  légèrement  sur  l’oreille  son  chapeau  à  haute  forme  assez  défraîchi,  et  battait  le  pavé  de  son  talon.  Il  avait  l’air  de  toujours  défier  quelqu’un,  les  passants,  les  maisons,  la  ville  entière,  par  chic  de  beau  soldat  tombé  dans  le civil.  ',     number: 7,     hash:      '3bf5235fc37d19eb2bb9d84512dfc0f9a618aa87f00507bbaf16e02e9c8be6d3' }   { text:      'Quoique   habillé   d’un   complet   de   soixante   francs, il gardait une certaine élégance tapageuse, un  peu  commune,  réelle  cependant.  Grand,     bien  fait, blond, d’un blond châtain vaguement roussi, avec   une   moustache   retroussée,   qui   semblait   mousser  sur  sa  lèvre,  des  yeux  bleus,  clairs,  troués  d’une  pupille  toute  petite,  des  cheveux  frisés   naturellement,   séparés   par   une   raie   au   milieu  du  crâne,  il  ressemblait  bien  au  mauvais  sujet des romans populaires. C’était   une   de   ces   soirées   d’été   où   l’air   manque  dans  Paris.  La  ville,  chaude     comme  une  étuve,  paraissait  suer  dans  la  nuit  étouffante.  Les  égouts  soufflaient  par  leurs  bouches  de  granit  leurs    haleines    empestées,    et    les    cuisines    souterraines  jetaient  à  la  rue,  par  leurs  fenêtres  basses, les miasmes infâmes des eaux de vaisselle et des vieilles sauces. Les  concierges,  en  manches  de  chemise,  à  cheval sur des chaises en paille, fumaient la pipe sous  des  portes  cochères,  et  les  passants  allaient  d’un  pas  accablé,  le  front  nu,  le  chapeau  à  la  main.  ',     number: 8,     hash:      'edac97806bbbfab289dbb9a4121fd6246d184fec8d0c9bbf4b426cfd84f7833c' }   { text:      'Quand Georges Duroy parvint au boulevard, il s’arrêta encore, indécis sur ce qu’il allait faire. Il avait  envie  maintenant  de  gagner  les  Champs-Élysées  et  l’avenue  du  bois  de  Boulogne  pour  trouver un peu d’air frais sous les arbres ; mais un désir  aussi  le  travaillait,  celui  d’une  rencontre  amoureuse. Comment  se  présenterait-elle  ?  Il  n’en  savait  rien, mais il l’attendait depuis trois mois, tous les jours,   tous   les   soirs.      Quelquefois   cependant,   grâce  à  sa  belle  mine  et  à  sa  tournure  galante,  il  volait,  par-ci,  par-là,  un  peu  d’amour,  mais  il  espérait    toujours plus et mieux. La   poche   vide   et   le   sang   bouillant,   il   s’allumait     au     contact     des     rôdeuses     qui     murmurent,  à  l’angle  des  rues  :  «  Venez-vous  chez   moi,   joli   garçon   ?   »   mais   il   n’osait   les   suivre, ne les pouvant payer ; et il attendait aussi autre chose, d’autres baisers, moins vulgaires. Il  aimait  cependant  les  lieux  où  grouillent  les  filles   publiques,   leurs   bals,   leurs   cafés,   leurs   rues   ;   il   aimait   les   coudoyer,   leur   parler,   les   tutoyer,  flairer  leurs  parfums  violents,  se  sentir   ',     number: 9,     hash:      'c6a14f0b8ac85805a383608825f3c60bfa463cb0c60e22b84494c63563c552e6' }   { text:    'près  d’elles.  C’étaient  des  femmes  enfin,  des  femmes  d’amour.  Il  ne  les  méprisait  point  du  mépris inné des hommes de famille. Il  tourna  vers  la  Madeleine  et  suivit  le  flot  de  foule  qui  coulait  accablé  par  la  chaleur.  Les  grands cafés, pleins de monde, débordaient sur le trottoir,  étalant  leur  public  de  buveurs  sous  la  lumière   éclatante   et   crue   de   leur   devanture   illuminée.   Devant   eux,   sur   de   petites   tables   carrées   ou   rondes,   les   verres   contenaient   des   liquides rouges, jaunes, verts, bruns, de toutes les nuances ; et dans l’intérieur des carafes on voyait briller les gros cylindres transparents de glace qui refroidissaient la belle eau claire. Duroy  avait  ralenti  sa  marche,  et  l’envie  de  boire lui séchait la gorge. Une  soif  chaude,  une  soif  de  soir  d’été  le  tenait,  et  il  pensait  à  la  sensation  délicieuse  des     boissons froides coulant dans la bouche. Mais s’il buvait seulement deux bocks dans la soirée, adieu le   maigre   souper   du   lendemain,   et   il   les   connaissait trop, les heures affamées de la fin du mois.  ',     number: 10,     hash:      '65ff4f7a0de5dc6483b58e8de40610321798b06aa25e077e876cb7426119fef6' }   { text:      'Il se dit : « Il faut que je gagne dix heures et je prendrai  mon  bock  à  l’Américain.  Nom  d’un  chien   !   que   j’ai   soif   tout   de   même      !   »   Et   il   regardait  tous  ces  hommes  attablés  et  buvant,  tous ces hommes qui pouvaient se désaltérer tant qu’il  leur  plaisait.  Il  allait,  passant  devant  les  cafés  d’un  air  crâne  et  gaillard,  et  il  jugeait  d’un  coup  d’œil,  à  la  mine,  à  l’habit,  ce  que  chaque  consommateur  devait  porter  d’argent  sur  lui.  Et  une  colère  l’envahissait  contre  ces  gens  assis  et  tranquilles.    En    fouillant    leurs    poches,    on    trouverait  de  l’or,  de  la  monnaie  blanche  et  des  sous. En moyenne, chacun devait avoir au moins deux louis ; ils étaient bien une centaine au café ; cent  fois  deux  louis  font  quatre  mille  francs  !  Il  murmurait    :    «    Les    cochons    !    »    tout    en    se    dandinant    avec grâce. S’il avait pu en tenir un au coin  d’une  rue,  dans  l’ombre  bien  noire,  il  lui  aurait tordu le cou, ma foi, sans scrupule, comme il  faisait  aux  volailles  des  paysans,  aux  jours  de  grandes manœuvres. Et il se rappelait ses deux années d’Afrique, la façon dont il rançonnait les Arabes dans les petits postes du Sud. Et un sourire cruel et gai passa sur  ',     number: 11,     hash:      '010097da639ab187a2c56e966f42afc37437ce42e85f65f04509da4c24bc6e32' }"
  );
  console.log(`A row has been inserted`);
});

// close the database connection
db.close(err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
