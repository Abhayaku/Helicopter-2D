import React from 'react';
import {View} from 'react-native';
import {array, object, string} from 'prop-types';
import Matter from 'matter-js';

const Upper = (props) => {
  const width = props.size[0];
  const height = props.size[1];
  return (
    <View
      style={[
        {
          position: 'absolute',
          width: width,
          height: height,
          backgroundColor: 'transparent',
        },
      ]}></View>
  );
};

export default (world, color, pos, size) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {isStatic: true, friction: 1},
  );
  Matter.World.add(world, [initialFloor]);

  return {
    body: initialFloor,
    size: [size.width, size.height],
    color: color,
    renderer: <Upper />,
  };
};

Upper.propTypes = {
  size: array,
  body: object,
  color: string,
};
