import Matter from 'matter-js';
import Helicopter from './Helicopter';
import Hill from './Hill';
import Ocean from './Ocean';
import {height, width, heightRatio, widthRatio} from './Size';
import {getRandom, topObstacleHeight, bottomObstacleHeight} from './GetRandom';
import Constants from './GetConstant';
import Upper from './Upper';

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

export default (restart) => {
  //-- Cleanup existing entities..
  if (restart) {
    Matter.Engine.clear(restart.physics.engine);
  }

  let engine = Matter.Engine.create({enableSleeping: false});
  let world = engine.world;
  world.gravity.y = 0.15;

  return {
    physics: {engine: engine, world: world},
    Upper: Upper(
      world,
      'white',
      {x: 0, y: -heightRatio * 60},
      {height: heightRatio * 5, width: width * 100},
    ),
    Helicopter: Helicopter(
      world,
      'pink',
      {x: width / 2 - 70, y: height / 2},
      {height: heightRatio * 30, width: widthRatio * 50},
    ),
    Ocean: Ocean(
      world,
      'white',
      {x: width / 2, y: height + heightRatio * 20},
      {height: heightRatio * 50, width: width},
    ),
    Obstacle1: Hill(
      world,
      'top',
      {
        x: width * 2 - Constants.TOP_PIPE_WIDTH / 2,
        y: getRandom(heightRatio * 100, heightRatio * 300),
      },
      {height: topObstacleHeight, width: Constants.TOP_PIPE_WIDTH},
    ),
    Obstacle2: Hill(
      world,
      'bottom',
      {
        x: width * 3 - Constants.BOTTOM_PIPE_WIDTH / 2,
        y: getRandom(heightRatio * 300, heightRatio * 500),
      },
      {height: bottomObstacleHeight, width: Constants.BOTTOM_PIPE_WIDTH},
    ),
  };
};
