const getRSSfeeds = (type) => {
  const feeds = {
    top: 'http://feeds.bbci.co.uk/news/rss.xml',
    world: 'http://feeds.bbci.co.uk/news/world/rss.xml',
    uk: 'http://feeds.bbci.co.uk/news/uk/rss.xml',
  };
  return feeds[type];
};

module.exports = { getRSSfeeds };
