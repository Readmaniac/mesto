const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/pages/index.js',
    output: {
      //filename: 'main[hash].js',
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, //очищает папку dist
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
        //new CleanWebpackPlugin(), // использовали плагин для очистки dist
        
    ],

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader, 
                }, 
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    },
                },
                {
                    loader: 'postcss-loader',
                }],
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                //use: 'babel-loader',
                loader: 'babel-loader',
                exclude: /node-modules/,
            },
        ],
    },

    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8088,
        open: true,
    },

    devtool: 'inline-source-map',
};

/* 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, "src", "pages","index.js"),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].[contenthash].js", 
    clean: true,
  },
  devtool: "inline-source-map", 
  module: {
    rules: [{
        test: /\.js$/,
        exclude: '/node_modules/',
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: "images/[name].[hash][ext]"
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash][ext]"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),

  ]
} */

/*
Installed packages:
npm init # в папке с проектом - Список нужных инструментов прописывают в файле package.json. У него есть строгие правила оформления. Чтобы о них не думать, можно создать package.json автоматически.

package.json:
{
  "name": "yandex.praktikum",
  "version": "0.0.1",
  "description": "Learning platform",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Stas Basov",
  "license": ""
} 

npm install jquery - но она мне не нужна, устанавливает JQuery
npm i webpack --save-dev - устанавливает вебпак для dev

package.json:
"dependencies": {
    // здесь будут зависимости
  },
  "devDependencies": {
    // а здесь зависимости для разработки
  }

npm i webpack-cli --save-dev - webpack command line interface - Устананавливает интерфейс

После определить точки входа и выхода так же прописать пути

webpack.config.js:
const path = require('path');
module.exports = {
entry: './src/pages/index.js',
    output: {
        filename: 'main[hash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    mode: 'development' // добавили режим разработчика
}


npm i webpack-dev-server --save-dev - установка локального сервера Локальный сервер — тоже утилита. Её можно получить из NPM командой npm i webpack-dev-server --save-dev. 
Выполните эту команду, и утилита добавится в devDependencies файла package.json

package.json:
"scripts": {
    "dev": "webpack serve",
    "build": "webpack --mode production"
  },

Далее настраиваем
webpack.config.js:
module.exports = {
  В принципе достаточно скопировать то что есть ниже
  Точка входа entry
  точка выхода output
  «Вебпак» не понимает относительный путь для точки выхода. Поэтому в свойство path нужно обязательно записывать абсолютный путь, то есть путь от корневой папки
  mode: 'development' // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
  },

}


Транспиляция JS: ставим Babel
npm i @babel/core --save-dev - новый синтаксис при сборке превращают в старый. Этот процесс называется транспиляцией. И чтобы её выполнить, нам нужен будет очередной NPM-пакет — Babel, или на жаргоне «бабель».
npm i @babel/preset-env --save-dev - набор правил, по которым переводить код. Чтобы не писать эти правила вручную, в Babel есть уже готовые наборы таких правил — пресеты.
npm i core-js --save - загрузить недостающую функциональность в браузер пользователя вместе с нашим проектом. Такие самодельные аналоги новой функциональности называются полифилы. Babel использует библиотеку полифилов core-js
npm i babel-loader --save-dev - установить пакет, который позволяет подключить Babel к Webpack
Настройка Babel
babel.config.js:
const presets = [
  ['@babel/preset-env', { // какой пресет использовать
    targets: { // какие версии браузеров поддерживать
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    },

    // использовать полифиллы для браузеров из свойства target
    // по умолчанию babel использует поллифиллы библиотеки core-js
    useBuiltIns: "entry"
  }]
];
module.exports = { presets }; 

webpack.config.js:
module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      }
      ]
  }

npm i html-webpack-plugin --save-dev - учит «Вебпак» работать с html-файлами
Настройка HtmlWebpackPlugin
webpack.config.js:
Вверху const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин 
plugins: [  // добавьте массив на одном уровне с module
  new HtmlWebpackPlugin({
    template: './src/index.html' // путь к файлу index.html
  }),
]  


npm i clean-webpack-plugin --save-dev - плагин, который будет каждый раз при сборке проекта удалять содержимое папки dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин 
new CleanWebpackPlugin(), // использовали плагин для очистки dist, поместили в plugins 


Настраиваем работу с картинками и шрифтами
  // добавили правило для обработки файлов
  {
    // регулярное выражение, которое ищет все файлы с такими расширениями
    test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
    type: 'asset/resource'
  },


Ссылки на картинки в JavaScript
Пусть в index.js есть ссылки на локальные картинки в виде строк:
const whoIsTheGoat = [
  { name: 'Michael Jordan', image: './images/jordan.jpg' },
  { name: 'Lebron James', link: './images/james.jpg' },
  { name: 'Kobe Bryant', link: './images/bryant.jpg' },
]; 
Мы используем этот массив объектов, чтобы создать DOM-элементы и затем добавить их на страницу.
Текущей записи недостаточно: «Вебпак» изменяет имена файлов при сборке, поэтому пути к картинкам будут неправильными. Об этом мы расскажем подробнее чуть позже. Проблему легко решить, если отдать работу с такими картинками «Вебпаку». Чтобы это сделать, импортируем каждое изображение в JS-файл:
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import jordanImage from './images/jordan.jpg';
import jamesImage from './images/james.jpg';
import bryantImage from './images/bryant.jpg';
const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', image: jordanImage },
  { name: 'Lebron James', link: jamesImage },
  { name: 'Kobe Bryant', link: bryantImage },
]; 
Сперва импорт картинок в JS может казаться странным. В чистом JS такое работать не будет, но теперь за все импорты в нашем проекте отвечает «Вебпак». Есть и второй способ работать с такими изображениями:
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const jordanImage = new URL('./images/jordan.jpg', import.meta.url);
const jamesImage = new URL('./images/james.jpg', import.meta.url);
const bryantImage = new URL('./images/bryant.jpg', import.meta.url)

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', image: jordanImage },
  { name: 'Lebron James', link: jamesImage },
  { name: 'Kobe Bryant', link: bryantImage },
]; 
Этот способ отличается от первого только тем, что работает и без запуска «Вебпака». Свойство import.meta.url — служебный параметр, указывающий на адрес файла. 

Научим «Вебпак» динамически заменять пути в HTML-файле. С этим поможет HtmlWebpackPlugin: он умеет корректно подставлять правильные пути файлов. Для этого потребуется изменить привычный путь до изображения на такой:
<img src="<%=require('./images/logo.png')%>" alt="Логотип"> 
Вставки вида <% %> — синтаксис шаблона lodash

Изначально «Вебпак» умеет работать с CSS динамически, заменяя путь до изображений или шрифтов на корректный. Другими словами, в CSS вы можете работать с изображениями или шрифтами по-старому: просто указывать относительный путь до шрифта или изображения


Настраиваем обработку CSS
npm i css-loader --save-dev - Пакет css-loader нужен для того, чтобы научить «Вебпак» работать с определённым типом файлов — с CSS
npm i mini-css-extract-plugin --save-dev - берёт много css-файлов и объединяет их в один
// подключите к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
rules: [
  // правила для обработки js, html и других файлов
  // добавьте ещё одно правило:
  {
    // применять это правило только к CSS-файлам
    test: /\.css$/,
    // при обработке этих файлов нужно использовать
    // MiniCssExtractPlugin.loader и css-loader
    use: [MiniCssExtractPlugin.loader, {
      loader: 'css-loader'
    }]
  }
] 

new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
Когда всё настроено, уберите из index.html тег link со ссылкой на стили
// в index.js
import './styles/index.css'; // добавьте импорт главного файла стилей 

Минификация CSS и добавление префиксов
npm i postcss-loader --save-dev - нужен, чтобы подключить PostCSS к «Вебпаку»
npm i autoprefixer --save-dev - научит PostCSS добавлять вендорные префиксы
npm i cssnano --save-dev - займётся минификацией css-кода
Настройка PostCSS
// postcss.config.js:
// подключите плагины в файл
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
module.exports = {
  // подключите плагины к PostCSS
  plugins: [
    // подключите autoprefixer
    autoprefixer,
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
};

webpack.config.js:
{
  // применять это правило только к CSS-файлам
  test: /\.css$/,
  // при обработке этих файлов нужно использовать
  // MiniCssExtractPlugin.loader и css-loader
  use: [MiniCssExtractPlugin.loader, {
    loader: 'css-loader',
    // добавьте объект options
    options: { importLoaders: 1 } //Если вы используете директиву @import в css-файлах, после подключения postcss-loader, нужно изменить то, как подключается css-loader.
В конце css-loader необходимо передать опцию importLoaders со значением 1
  },
    // Добавьте postcss-loader
  'postcss-loader']
}, 

npm install gh-pages --save-dev
package.json новый скрипт — deploy
 scripts: {
   ...
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
 }

npm install gh-pages --save-dev - 
package.json в разделе devDependencies появится новая строка:
 devDependencies: {
   ...
     "gh-pages": "^3.1.0"
   ...
 }
 package.json:
 scripts: {
   ...
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
 }
 if (Couldn't find remote ref refs/heads/gh-pages) {
   npx gh-pages-clean
  } else {
    npm run deploy
  }
*/