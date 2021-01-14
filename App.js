import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  BackHandler,
  ImageBackground,
} from 'react-native';
import Sound from 'react-native-sound';
import {GameEngine} from 'react-native-game-engine';
import Objects from './Component/Objects';
import Movement from './Component/movement';
import {height, width} from './Component/Size';

Sound.setCategory('Playback');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audiopath: require('./Component/src/helicopter.mp3'),
      gamestart: false,
      score: 0,
      running: false,
      gameover: false,
      rule: false,
    };
    this.gameEngine = null;
  }

  componentDidMount() {
    this.sound = new Sound(this.state.audiopath, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }
    });
  }

  gamestart() {
    this.setState({score: 0, gamestart: true, running: true});
    this.sound.setVolume(0.4);
    this.sound.setNumberOfLoops(-1);
    this.sound.play((success) => {
      if (!success) {
        console.log('Sound did not play');
      }
    });
  }

  onEvent = (e) => {
    if (e.type === 'gameOver') {
      this.setState({running: false});
      this.collesion();
    } else if (e.type === 'score') {
      this.setState((prevState) => {
        return {score: prevState.score + 1};
      });
    }
  };

  collesion() {
    this.sound.stop();
    this.setState({gameover: true});
    setTimeout(() => {
      this.setState({gameover: false, gamestart: false});
    }, 2000);
  }

  exit() {
    BackHandler.exitApp();
    return true;
  }

  render() {
    if (this.state.gamestart == false) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'black',
          }}>
          <ImageBackground
            source={require('./Component/src/space.jpg')}
            resizeMode="cover"
            style={{flex: 1, alignItems: 'center'}}>
            <StatusBar hidden={true} />
            {/* welcome */}
            <View
              style={{
                margin: (height * 8) / 100,
                marginTop: (height * 12) / 100,
                padding: (width * 5) / 100,
                alignItems: 'center',
                width: (width * 90) / 100,
              }}>
              <Text
                style={{
                  color: '#5bbcfc',
                  textAlign: 'center',
                  fontSize: (width * 20) / 100,
                }}>
                Helicopter 2D
              </Text>
            </View>
            {/* start game */}
            <TouchableOpacity
              activeOpacity={0.6}
              delayPressIn={0}
              onPress={this.gamestart.bind(this)}
              style={{
                marginTop: (height * 2) / 100,
                padding: (width * 5) / 100,
                width: (width * 50) / 100,
                backgroundColor: '#fc5b5b',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  letterSpacing: 2,
                  fontSize: (width * 4) / 100,
                }}>
                Play Game
              </Text>
            </TouchableOpacity>
            {/* option */}
            <TouchableOpacity
              activeOpacity={0.6}
              delayPressIn={0}
              onPress={() => this.setState({rule: true})}
              style={{
                marginTop: (height * 2) / 100,
                padding: (width * 5) / 100,
                width: (width * 50) / 100,
                backgroundColor: '#fc5b5b',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  letterSpacing: 2,
                  fontSize: (width * 4) / 100,
                }}>
                How to Play
              </Text>
            </TouchableOpacity>
            {/* exit */}
            <TouchableOpacity
              activeOpacity={0.6}
              delayPressIn={0}
              onPress={() => this.exit()}
              style={{
                marginTop: (height * 2) / 100,
                padding: (width * 5) / 100,
                width: (width * 50) / 100,
                backgroundColor: '#fc5b5b',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  letterSpacing: 2,
                  fontSize: (width * 4) / 100,
                }}>
                Exit
              </Text>
            </TouchableOpacity>
            {this.state.rule == true ? (
              <TouchableWithoutFeedback
                onPress={() => this.setState({rule: false})}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: width,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    height: '100%',
                    position: 'absolute',
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => this.setState({rule: true})}>
                    <View
                      style={{
                        height: '50%',
                        width: '75%',
                        borderRadius: 20,
                        backgroundColor: '#ff7373',
                        padding: (width * 3) / 100,
                      }}>
                      <View
                        style={{
                          height: '20%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: '#204f5e',
                            fontWeight: 'bold',
                            fontSize: (width * 7) / 100,
                            letterSpacing: 1,
                          }}>
                          How to Play
                        </Text>
                      </View>
                      <View
                        style={{
                          height: '60%',
                          justifyContent: 'space-evenly',
                          padding: 10,
                          paddingTop: 0,
                        }}>
                        {/* 1 */}
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                          }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: '#204f5e',
                              textAlign: 'center',
                              fontSize: (width * 3) / 100,
                            }}>
                            {'\u2B24'}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: 'white',
                              textAlign: 'left',
                              fontSize: (width * 3) / 100,
                              marginLeft: 10,
                            }}>
                            You have to click on the screen repeatedly to fly
                            the helicopter.
                          </Text>
                        </View>
                        {/* 2 */}
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                          }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: '#204f5e',
                              textAlign: 'center',
                              fontSize: (width * 3) / 100,
                            }}>
                            {'\u2B24'}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: 'white',
                              textAlign: 'left',
                              fontSize: (width * 3) / 100,
                              marginLeft: 10,
                            }}>
                            Repeatedly clicking on the screen try to avoid the
                            column that comes in the way.
                          </Text>
                        </View>
                        {/* 3 */}
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                          }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: '#204f5e',
                              textAlign: 'center',
                              fontSize: (width * 3) / 100,
                            }}>
                            {'\u2B24'}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: 'white',
                              textAlign: 'left',
                              fontSize: (width * 3) / 100,
                              marginLeft: 10,
                            }}>
                            Do not fly too high or too low to avoid the crash.
                          </Text>
                        </View>
                        {/* 4 */}
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                          }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: '#204f5e',
                              textAlign: 'center',
                              fontSize: (width * 3) / 100,
                            }}>
                            {'\u2B24'}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: 'white',
                              textAlign: 'left',
                              fontSize: (width * 3) / 100,
                              marginLeft: 10,
                            }}>
                            Against the gravity try to fly the helicopter
                            smoothly.
                          </Text>
                        </View>
                        {/* 5 */}
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                          }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: '#204f5e',
                              textAlign: 'center',
                              fontSize: (width * 3) / 100,
                            }}>
                            {'\u2B24'}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: 'white',
                              textAlign: 'left',
                              fontSize: (width * 3) / 100,
                              marginLeft: 10,
                            }}>
                            Enjoy the game.
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          height: '20%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                          activeOpacity={0.6}
                          delayPressIn={0}
                          style={{
                            padding: 20,
                            paddingRight: 40,
                            paddingLeft: 40,
                            backgroundColor: '#204f5e',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                          }}
                          onPress={() => this.setState({rule: false})}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: 'white',
                              fontSize: (width * 4) / 100,
                              fontWeight: 'bold',
                              letterSpacing: 1,
                            }}>
                            Ok
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <View />
            )}
          </ImageBackground>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        <ImageBackground
          source={require('./Component/src/space.jpg')}
          resizeMode="cover"
          style={{flex: 1}}>
          <StatusBar hidden={true} />
          {/* score */}
          <Text
            style={{
              color: '#ffffff',
              fontSize: 50,
              fontWeight: 'bold',
              textAlign: 'center',
              top: 20,
            }}>
            {this.state.score}
          </Text>
          {/* game */}
          <GameEngine
            ref={(ref) => {
              this.gameEngine = ref;
            }}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            entities={Objects()}
            systems={Movement}
            onEvent={this.onEvent}
            running={this.state.running}
          />
          {this.state.gameover == true ? (
            <TouchableWithoutFeedback
              onPress={() => this.setState({gameover: true})}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: width,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  height: '100%',
                  position: 'absolute',
                }}>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({gameover: true})}>
                  <View
                    style={{
                      height: '30%',
                      width: '50%',
                      borderRadius: 20,
                      backgroundColor: '#ff7373',
                    }}>
                    <View
                      style={{
                        height: '33%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: '#204f5e',
                          fontWeight: 'bold',
                          fontSize: (width * 4) / 100,
                          letterSpacing: 1,
                        }}>
                        Game Over
                      </Text>
                    </View>

                    <View
                      style={{
                        height: '50%',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: 'white',
                          fontSize: (width * 3) / 100,
                          letterSpacing: 1,
                        }}>
                        Your Helicopter got crashed
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: 'white',
                          fontSize: (width * 3) / 100,
                          letterSpacing: 1,
                        }}>
                        Your Score is: {this.state.score}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <View />
          )}
        </ImageBackground>
      </View>
    );
  }
}
