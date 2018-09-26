var 	gulp           = require('gulp'),
        sass           = require('gulp-sass'),
        cleanCSS       = require('gulp-clean-css'),
        cssmin         = require('gulp-cssmin'),
        autoprefixer   = require('gulp-autoprefixer'),
        browserSync    = require('browser-sync'),
        sourcemaps 	   = require('gulp-sourcemaps'),
        multipipe      = require('multipipe'),
        babel          = require('gulp-babel'),
        rename         = require('gulp-rename'),
        pug            = require('gulp-pug'),
        notify         = require('gulp-notify'),
        svgSprite      = require('gulp-svg-sprite'),
        svgmin         = require('gulp-svgmin'),
        cheerio        = require('gulp-cheerio'),
        replace        = require('gulp-replace'),
        imagemin       = require('gulp-imagemin'),
        data           = require('gulp-data'),
        gcmq 		   = require('gulp-group-css-media-queries'),
        fs             = require('fs'),
        del 		   = require('del'),
        cache 		   = require('gulp-cache'),
        browserify     = require('gulp-browserify'),
        jsMinify       = require('gulp-js-minify');


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});


gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

gulp.task('clean', function(){
    return del.sync('dist');
});

gulp.task('sass', function() {
    return multipipe(
        gulp.src('app/sass/**/*.sass'),
        (sourcemaps.init()),
        (sass({outputStyle: 'expanded'})),
        // (rename({suffix: '.min', prefix : ''})),
        (autoprefixer(['last 15 versions'])),
        // (cleanCSS()),
        // (gcmq()),
        (sourcemaps.write()),
        (gulp.dest('app/css')),
        (browserSync.reload({stream: true}))
    ).on('error', notify.onError());
});

gulp.task('sprite', function () {
    return multipipe(
        gulp.src('./app/img/svg/sprites/sprite_elems/*.svg'),
        (svgmin({
            js2svg: {
                pretty: true
            }
        })),
        (cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[style]').removeAttr('style');
                $('[data-name]').removeAttr('data-name');
                $('style').remove();
                $('title').remove();
            },
            parserOptions: {xmlMode: true}
        })),
        (replace('&gt;', '>')),
        (svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg",
                    render: {
                        scss: {
                            dest:'../sprite'
                        }
                    }
                }
            }
        })),
        (gulp.dest('./app/img/svg/sprites/sprite')))
});



gulp.task('babel', function() {
    return multipipe(
        gulp.src('app/js/common.js'),
        (sourcemaps.init()),
        (babel({
            presets: ['es2015']
        })),
        (browserify()),
        (sourcemaps.write()),
        (rename('bundle.js')),
        (gulp.dest('app/js'))
    ).on('error', notify.onError());
});


gulp.task('gulp-pug', function gulpPug() {
    return multipipe(
        gulp.src(['app/pug/*.pug'])
        .pipe(data(function(file) {
            // return JSON.parse(fs.readFileSync('app/pug/data/data.json'))
        })),
        (pug({
            pretty: '  '
        })),
        (gulp.dest('app/')))
        .on('error', notify.onError());
});

gulp.task('imagemin', function () {
    gulp.src('app/img/**/*.+(jpg|png)')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}]
        }))


        .pipe(gulp.dest('dist/img/'))
});

gulp.task('sass-build', function() {
    return multipipe(
        gulp.src('app/sass/**/*.sass'),
        // (sourcemaps.init()),
        (sass({outputStyle: 'expanded'})),
        (rename({suffix: '.min', prefix : ''})),
        (autoprefixer(['last 15 versions'])),
        // (cleanCSS()),
        // (gcmq()),
        (sourcemaps.write()),
        (gulp.dest('app/css')),
        (browserSync.reload({stream: true}))
    ).on('error', notify.onError());
});

gulp.task('watch', ['sass', 'babel', 'gulp-pug', 'browser-sync'], function() {
    // gulp.watch('app/pug/**/*.pug', ['gulp-pug']);
    gulp.watch('app/pug/**/*.sass', ['sass']);
    gulp.watch('app/sass/**/*.+(sass|scss)', ['sass']);
    gulp.watch('app/index.html').on('change', browserSync.reload);
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('app/js/common.js', ['babel']);
});





gulp.task('build',['clean', 'imagemin', 'sass'], function(){

    var buildCss = gulp.src([
        'app/css/**/*.css'
    ])
        .pipe(cleanCSS())
        .pipe(gcmq())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));

    var buildSvg = gulp.src('app/img/**/*.svg')
        .pipe(gulp.dest('dist/img/'));

    var buildFavicon = gulp.src('app/*.ico')
        .pipe(gulp.dest('dist/'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));


    var buildJs = gulp.src('app/js/**/*')
        // .pipe(jsMinify())
        .pipe(gulp.dest('dist/js'));


    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

    var buildPhp = gulp.src('app/*.php')
        .pipe(gulp.dest('dist'));

    var buildJs = gulp.src('app/libs/**/*')
        .pipe(gulp.dest('dist/libs'));
});


gulp.task('default', ['watch']);