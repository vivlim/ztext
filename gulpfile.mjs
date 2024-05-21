// Plugins =============================================================
import gulp from "gulp";
//const { task, src, dest, watch } = gulp
import debug from 'gulp-debug';
// import pump from "pump";
import rename from "gulp-rename";

// Sync
import browserSync, { reload } from "browser-sync";

// HTML
import pug from "gulp-pug";
import htmlmin from "gulp-htmlmin";

// CSS
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

// broken
  import autoprefixer from "gulp-autoprefixer";
  import browserslist from "browserslist";

// causing problems
//import cssmin from "gulp-cssmin";

// // JS
import terser from "gulp-terser";
// broken
import size from "gulp-size";
const sass = gulpSass(dartSass);

// Browser Sync ========================================================
gulp.task("sync", function () {
	return browserSync({
		server: "dist",
	});
});

// Refresh =============================================================
gulp.task("refresh", function () {
	return gulp.src("*").pipe(
		reload({
			stream: true,
		})
	);
});

// Compile HTML ========================================================
gulp.task("html", function() {
	return gulp.src("./src/*.pug")
		.pipe(
			pug({
				verbose: true,
			})
		)
		.pipe(gulp.dest("./dist"))
		.pipe(reload({ stream: true, }))
});

// Compile CSS =========================================================
gulp.task("css", function() {
	return gulp.src("./src/css/*.scss")
		.pipe(debug())
		.pipe(sass())
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		//.pipe(cssmin())
		.pipe(
			rename(function (path) {
				path.basename += ".min";
				path.extname = ".css";
			})
		)
		.pipe(gulp.dest("./dist/css"))
		.pipe(reload({ stream: true, }));
});

// JS ==================================================================
gulp.task("js", function() {
	return gulp.src("./src/js/*.js", {allowEmpty: false})
	.pipe(debug())
	.pipe(terser())
	.pipe(
		rename(function (path) {
			path.basename += ".min";
			path.extname = ".js";
		})
	)
	.pipe(gulp.dest("./dist/js"))
	.pipe(reload({ stream: true, }));
	// .pipe(
	// 	size({
	// 		showFiles: true,
	// 	})
	// );
});

gulp.task("img", () => gulp.src("./img/**/*", { buffer: false }).pipe(gulp.dest("./dist/img"))) // todo: this corrupts some images

gulp.task("build", gulp.series("html", "js", "css", "img"))

gulp.task("watch-html", () => gulp.watch("./src/*.pug", gulp.series("html")));
gulp.task("watch-js", () => gulp.watch("./src/js/*.js", gulp.series("js")));
gulp.task("watch-css", () => gulp.watch("./src/css/*.scss", gulp.series("css")));
gulp.task("watch-img", () => gulp.watch("./img/**/*", gulp.series("img")));

// Watch ===============================================================
gulp.task("watch", gulp.series(
	"build",
	"sync",
	gulp.parallel(
		"watch-html",
		"watch-js",
		"watch-css",
		"watch-img",
	)));

// Default task ========================================================
gulp.task("default", gulp.series("build"));
