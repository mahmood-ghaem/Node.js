const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//homepage route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Blog App',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum laudantium unde deleniti quisquam nostrum aliquid cumque molestiae quas modi doloribus eveniet aperiam similique minus adipisci nihil temporibus, rem non sit! Quae cum omnis modi nesciunt perspiciatis saepe commodi porro alias, quos quisquam sunt odio exercitationem nobis ab tempora corporis expedita ullam hic? Enim tempore omnis magnam et dolorem! Laborum laudantium nesciunt amet accusantium aliquid. Facere voluptatum sequi commodi, asperiores laborum cupiditate repellendus ratione neque, numquam magnam reprehenderit sed officiis blanditiis fuga atque iste dicta dolore ab vitae? Nulla magni voluptate natus labore soluta perferendis consequatur, repellendus possimus quidem autem accusantium.',
  }),
);

// Blogs api routes
app.use('/api/blogs', require('./routes/api/blogs'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
