// Site-related variables (example site: https://wpdev.local)
var site = 'wpdev.local';
var protocol = 'https';
var secret_code = 'CHANGEME'; //Secret SASS Workflow code found in OxyPowerPack settings


const { src, dest, task, series } = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var styleFileName = 'style';
var styleSRC = './src/' + styleFileName + '.scss';
var styleURL = './dist/';
var mapURL = './';

function css(done) {
	src([styleSRC])
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.on('error', console.error.bind(console))
		.pipe(autoprefixer())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write(mapURL))
		.pipe(dest(styleURL))
	done();
};

var adapterFor = (function() {
	var url = require('url'),
	  adapters = {
		'http': require('http'),
		'https': require('https'),
	  };
  
	return function(prot) {
	  return adapters[prot]
	}
  }());

function upload(done) {
	setTimeout(function(){
		var formurlencoded = require( 'form-urlencoded').default;
		var fs = require("fs");
	
		var generatedFilePath = styleURL + styleFileName + '.min.css';
		const data = formurlencoded({
			style: fs.readFileSync( generatedFilePath, 'utf8' ),
			secret: secret_code
		});
	
		const options = {
			hostname: site,
			path: '/index.php?oxypowerpack-upload-styles',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': data.length
			}
		}
		process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
		const req = adapterFor(protocol).request(options, (res) => {
			console.log(`statusCode: ${res.statusCode}`)
			res.on('data', (d) => {
				process.stdout.write(d);
				done();
			})
		})
	
		req.on('error', (error) => {
			console.error(error);
			done();
		})
	
		req.write(data)
		req.end()
	}, 3000);
}

task("css", css);
task("upload", upload);
task("default", series(css, upload));
