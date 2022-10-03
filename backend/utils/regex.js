// eslint-disable-next-line operator-linebreak
const urlRegex =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%+.~#?&//=]*)/i;

module.exports = urlRegex;
