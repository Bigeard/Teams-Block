const express = require('express');
const cors = require('cors');
const app = express();


// db.get(`SELECT data FROM bloc WHERE id='${range}';`, (err, result) => {
// 	if (err) {
// 		console.log(err);
// 	}
// 	else {
// 		//result
// 	}
// })



const date = '12 Février 2020';
const data = [
	{
		nbpage: 1,
		text: 'Bel-Ami <br> Édition de référence : <br> Éditions Rencontre, Lausanne. <br> Texte établi et présenté par Gilbert Sigaux.'
	},
	{
		nbpage: 2,
		text: 'Première partie'
	},
	{
		nbpage: 3,
		text: 'Quand la caissière lui eut rendu la monnaie de sa pièce de cent sous, Georges Duroy sortit du restaurant. Comme il portait beau, par nature et par pose d\’ancien sous-officier, il cambra sa taille, frisa sa moustache d\’un geste militaire et familier, et jeta sur les dîneurs attardés un regard rapide et circulaire, un de ces regards de joli garçon, qui s\’étendent comme des coups d\’épervier. Les femmes avaient levé la tête vers lui, trois petites ouvrières, une maîtresse de musique entre deux âges, mal peignée, négligée, coiffée d\’un chapeau toujours poussiéreux et vêtue toujours d\’une robe de travers, et deux bourgeoises avec leurs maris, habituées de cette gargote à prix fixe. Lorsqu\’il fut sur le trottoir, il demeura un instant immobile, se demandant ce qu\’il allait faire. On était au 28 juin, et il lui restait juste en'
	},
		{
		nbpage: 4,
		text: 'poche trois francs quarante pour finir le mois. Cela représentait deux dîners sans déjeuners, ou deux déjeuners sans dîners, au choix. Il réfléchit que les repas du matin étant de vingt-deux sous, au lieu de trente que coûtaient ceux du soir, il lui resterait, en se contentant des déjeuners, un franc vingt centimes de boni, ce qui représentait encore deux collations au pain et au saucisson, plus deux bocks sur le boulevard. C\’était là sa grande dépense et son grand plaisir des nuits ; et il se mit à descendre la rue Notre-Dame-de-Lorette. Il marchait ainsi qu\’au temps où il portait l\’uniforme des hussards, la poitrine bombée, les jambes un peu entrouvertes comme s\’il venait de descendre de cheval ; et il avançait brutalement dans la rue pleine de monde, heurtant les épaules, poussant les gens pour ne point se déranger de sa route. Il inclinait légèrement sur l\’oreille son chapeau à haute forme assez défraîchi, et battait le pavé de son talon. Il avait l\’air de toujours défier quelqu\’un, les passants, les maisons, la ville entière, par chic de beau soldat tombé dans le civil.'
	},
	{
		nbpage: 5,
		text: 'Quoique habillé d\’un complet de soixante francs, il gardait une certaine élégance tapageuse, un peu commune, réelle cependant. Grand, bien fait, blond, d\’un blond châtain vaguement roussi, avec une moustache retroussée, qui semblait mousser sur sa lèvre, des yeux bleus, clairs, troués d\’une pupille toute petite, des cheveux frisés naturellement, séparés par une raie au milieu du crâne, il ressemblait bien au mauvais sujet des romans populaires. C\’était une de ces soirées d\’été où l\’air manque dans Paris. La ville, chaude comme une étuve, paraissait suer dans la nuit étouffante. Les égouts soufflaient par leurs bouches de granit leurs haleines empestées, et les cuisines souterraines jetaient à la rue, par leurs fenêtres basses, les miasmes infâmes des eaux de vaisselle et des vieilles sauces. Les concierges, en manches de chemise, à cheval sur des chaises en paille, fumaient la pipe sous des portes cochères, et les passants allaient d\’un pas accablé, le front nu, le chapeau à la main'
	}
];



app.use(cors());
app.use(express.json());




//Envoi d'une page selon son numéro demandé
app.get('/page/:id', (req, res) =>{
	const page = data.find(a => a.nbpage == req.params.id);
	page.date = date;
	res.json(page);
})


app.listen(3000, ()=> console.log('Server started! 🎉'));
