import Matter from 'matter-js';

var UpdateHelicopter = (entities, {touches, time}) => {
  var engine = entities.physics.engine;
  touches
    .filter((t) => t.type === 'press')
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Helicopter.body, {
        x: entities.Helicopter.body.velocity.x,
        y: -3,
      });
    });
  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default UpdateHelicopter;
