export const feedsConst = {
    feeds: [
    ],
    apiUrl: 'https://api.rss2json.com/v1/api.json?rss_url=',
    apiKey: '4icebxnoipdjztcrzinipyvhiy4yppc739oa1kef',
    errorCodes: {
      client: {
        feedExists: {
          message: 'Feed already exists',
          code: 1000
        }
      },
      server: {
        internalServer: 500
      }
    }
  };
  