/* eslint-disable */
const ghpages = require('gh-pages');

const options = {
    branch: 'gh-pages',
};

ghpages.publish('./build', options, err => {
    console.log(err);
});
