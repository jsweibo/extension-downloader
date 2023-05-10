const { src, dest, series, watch } = require('gulp');
const rename = require('gulp-rename');
const del = require('delete');
const browserSync = require('browser-sync').create();

function clean() {
  return del.promise('dist');
}

function cleanForPages() {
  return del.promise('docs');
}

function cleanForExtension() {
  return del.promise('extension');
}

function copyFiles() {
  return src('src/**', {
    ignore: [
      'src/js/index.extension.js',
      'src/index.extension.html',
      'src/result.extension.html',
    ],
  }).pipe(dest('dist'));
}

function copyFilesForPages() {
  return src('src/**', {
    ignore: [
      'src/js/index.extension.js',
      'src/index.extension.html',
      'src/result.extension.html',
    ],
  }).pipe(dest('docs'));
}

function copyFilesForExtension() {
  return src('src/*.extension.html')
    .pipe(src('src/js/*.extension.js', { base: 'src' }))
    .pipe(
      rename(function (path) {
        path.basename = path.basename.replace('.extension', '');
      })
    )
    .pipe(
      src('src/**', {
        ignore: [
          'src/js/index.extension.js',
          'src/js/index.js',
          'src/index.extension.html',
          'src/index.html',
          'src/manifest.json',
          'src/result.extension.html',
          'src/result.html',
          'src/sw.js',
        ],
      })
    )
    .pipe(dest('extension'));
}

function copyLibs() {
  return src('node_modules/clipboard/dist/clipboard.min.js').pipe(
    dest('dist/js')
  );
}

function copyLibsForPages() {
  return src('node_modules/clipboard/dist/clipboard.min.js').pipe(
    dest('docs/js')
  );
}

function copyLibsForExtension() {
  return src('node_modules/clipboard/dist/clipboard.min.js').pipe(
    dest('extension/js')
  );
}

const copy = series(copyFiles, copyLibs);
const copyForPages = series(copyFilesForPages, copyLibsForPages);
const copyForExtension = series(copyFilesForExtension, copyLibsForExtension);

function server(cb) {
  browserSync.init(
    {
      server: {
        baseDir: './dist',
      },
      notify: false,
    },
    cb
  );
}

function reload(cb) {
  browserSync.reload();
  cb();
}

function watchChange() {
  watch('src/**', series(copy, reload));
}

const build = series(clean, copy);
const buildForPages = series(cleanForPages, copyForPages);
const buildForExtension = series(cleanForExtension, copyForExtension);

const dev = series(clean, copy, server, watchChange);

exports.build = build;
exports.buildForPages = buildForPages;
exports.buildForExtension = buildForExtension;
exports.dev = dev;
exports.default = build;
