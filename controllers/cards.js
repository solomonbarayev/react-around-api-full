const path = require('path');

const getDataFromFile = require('../helpers/files');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  getDataFromFile(dataPath)
    .then((cards) => res.status(200).send(cards))
    .catch(() =>
      res.status(500).send({ message: 'Requested resource not found' })
    );
};

module.exports = getCards;
