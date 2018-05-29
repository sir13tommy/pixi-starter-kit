import * as PIXI from 'pixi.js/dist/pixi'
import 'pixi-tween'

function gameStart () {
  const app = new PIXI.Application({
    transparent: true,
    antialias: true
  });

  // append our game to body
  document.body.appendChild(app.view);

  // Add game resizing including device pixel ratio
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';
  setCanvasSize()

  window.addEventListener('resize', () => {
    setCanvasSize(true)
  })

  function setCanvasSize () {
    let windowWidth = window.innerWidth
    let windowHeight = window.innerHeight

    app.renderer.resize(windowWidth, windowHeight)
    resize(windowWidth, windowHeight)
  }

  // load an images
  PIXI.loader.add(['sprite_main.json']).load((loader, resources) => {
    let mainContainer = new PIXI.Container()

    let spaceShip = new PIXI.Sprite(PIXI.utils.TextureCache['spaceship.png'])
    spaceShip.x = 0
    spaceShip.y = 0
    mainContainer.addChild(spaceShip)

    let mushroom = new PIXI.Sprite(PIXI.utils.TextureCache['mushroom.png'])
    mushroom.anchor.x = 0.5
    mushroom.anchor.y = 0.5

    mushroom.position.set(app.renderer.width / 2, app.renderer.height / 2)
    mainContainer.addChild(mushroom)

    let mushroomRotation = PIXI.tweenManager.createTween(mushroom)
    mushroomRotation.to({
      rotation: Math.PI / 180 * 360
    })
    mushroomRotation.easing = PIXI.tween.Easing.linear()
    mushroomRotation.time = 400000
    mushroomRotation.loop = true
    mushroomRotation.start()

    app.stage.addChild(mainContainer)
    app.ticker.add(delta => {
      update(delta);
    })
  });

  function update (delta) {
    PIXI.tweenManager.update(delta)
  }

  function resize (viewWidth, viewHeight) {
    /*
    * This method is more valuable for size calculation. It overrides sizes and positions from function that created
    * sprites.
    * */
  }

  function spriteToButton (sprite, onclick, textureOver, textureDown, contentContainer) {
    let texture = sprite.texture

    sprite.buttonMode = true
    sprite.interactive = true

    sprite.on('pointerdown', onButtonDown)
      .on('pointerup', onButtonUp)
      .on('pointerupoutside', onButtonUp)
      .on('pointerover', onButtonOver)
      .on('pointerout', onButtonOut)
      .on('click', onclick)
      .on('tap', onclick)

    function onButtonDown () {
      this.isdown = true;

      if (contentContainer) {
        contentContainer.y = this.y - 6
      }

      this.texture = textureDown;
      this.alpha = 1;
    }

    function onButtonUp () {
      this.isdown = false;
      if (contentContainer) {
        contentContainer.y = this.y
      }

      if (this.isOver) {
        this.texture = textureOver;
      } else {
        this.texture = texture;
      }
    }

    function onButtonOver () {
      this.isOver = true;

      if (this.isdown) {
        return;
      }

      this.texture = textureOver;
    }

    function onButtonOut () {
      this.isOver = false;

      if (this.isdown) {
        return;
      }

      this.texture = texture;
    }
  }
}

gameStart()

if (__DEV__) {
  console.log(`Build hash: ${__webpack_hash__}`)
}
