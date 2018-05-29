const spritepath = './src/assets/images/sprite'
const spritesheet = require('spritesheet-js')
const path = require('path');
const sprites = require(path.resolve(__dirname, spritepath, 'sprite.json'));

const makeSprite = (sprite) => {
  spritesheet(path.resolve(__dirname, spritepath, sprite, '*.png'), {
    trim: true,
    format: 'JSON',
    padding: 5,
    path: path.resolve(__dirname, spritepath, '.dist'),
    name: `sprite_${sprite}`
  }, function (err) {
    if (err) {
      console.log(err)
    }
  })
};

sprites.forEach((sprite) => {
  makeSprite(sprite)
});
