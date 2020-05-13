# OXY SASS

Gulpfile setup for SCSS compiling and uploading to Oxygen Builder with OxyPowerPack (External SASS Workflow)

## Getting Started

1. Install the prerequisites (Node.js and Gulp)
2. Clone or download this repository and unzip it in a nice place.
3. From the command line, run `npm install` in the selected directory to grab automatically all the needed packages.
4. Enable the SASS Workflow inside OxyPowerPack settings and copy the SASS Workflow secret code.
5. Open the `gulpfile.js` file in your favorite text editor and change the first three variables to match your site (site, protocol and secret_code - paste yours there).
6. Edit your styles using the `src` folder. You can delete everything and set up your own directory structure inside `src` as long as the base file is called `style.scss`.
7. Use the command line `gulp` command to compile the SASS files and upload the result to your Oxygen site. Check the command output, if there is any error in the styles, the compilation will fail and nothing will be uploaded.

Play with the styles, repeat 6 & 7 until the work is done.

The compiled result will be stored in an Oxygen stylesheet called 'OxyPowerPack-Styles', you can view it inside Oxygen Builder > Manage > Stylesheets > Uncategorized. Don't edit it manually, all manual changes will be overwritten the next time you run the `gulp` command.

If you want to stop using this workflow, just disable it inside OxyPowerPack settings and manually delete the 'OxyPowerPack-Styles' stylesheet.

### Prerequisites

1. [Node.js](https://nodejs.org/)
2. [Gulp](https://gulpjs.com/)
3. An Oxygen Builder site with OxyPowerPack 1.1 installed
