const {
  getHost,
  getDatetime,
  getRequest,
  getResCode,
  getByteLength,
} = require('../log2json');

const inputData = [
  '141.243.1.172 [29:23:53:25] "GET /Software.html HTTP/1.0" 200 1497',
  'query2.lycos.cs.cmu.edu [29:23:53:36] "/Consumer.html HTTP/1.0" 200 1325',
  'tanuki.twics.com [29:23:53:53] "GET /News.html" 200 1014',
  'wpbfl2-45.gate.net [29:23:54:15] "GET / HTTP/1.0" 200 4889',
  'wpbfl2-45.gate.net [29:23:54:16] "GET /icons/circle_ logo_small.gif HTTP/1.0" - 2624',
  'wpbfl2-45.gate.net [29:23:54:18] "GET /logos/small_gopher.gif HTTP/1.0" 200 -',
  '140.112.68.165 [29:23:54:19] "GET /logos/us-flag.gif HTTP/1.0="=""" 200 2788',
  'wpbfl2-45.gate.net [29:23:54:19] "GET /logos/small_ftp.gif HTTP/1.0"  -',
];

describe('log2json', () => {
  test('gethost input arr', () => {
    const hosts = inputData.map((ln) => getHost(ln.split(' ')));
    expect(hosts).toEqual([
      '141.243.1.172',
      'query2.lycos.cs.cmu.edu',
      'tanuki.twics.com',
      'wpbfl2-45.gate.net',
      'wpbfl2-45.gate.net',
      'wpbfl2-45.gate.net',
      '140.112.68.165',
      'wpbfl2-45.gate.net',
    ]);
  });
  test('getDateTime input arr', () => {
    const dates = inputData.map((ln) => getDatetime(ln.split(' ')));
    expect(dates).toEqual([
      { day: '29', hour: '23', minute: '53', second: '25' },
      { day: '29', hour: '23', minute: '53', second: '36' },
      { day: '29', hour: '23', minute: '53', second: '53' },
      { day: '29', hour: '23', minute: '54', second: '15' },
      { day: '29', hour: '23', minute: '54', second: '16' },
      { day: '29', hour: '23', minute: '54', second: '18' },
      { day: '29', hour: '23', minute: '54', second: '19' },
      { day: '29', hour: '23', minute: '54', second: '19' },
    ]);
  });
  test('getRequest input arr', () => {
    const requests = inputData.map((ln) => getRequest(ln.split(' ')));
    expect(requests).toEqual([
      {
        method: 'GET',
        url: '/Software.html',
        protocol: 'HTTP',
        protocol_version: '1.0',
      },
      {
        method: '-',
        url: '"/Consumer.html',
        protocol: 'HTTP',
        protocol_version: '1.0',
      },
      {
        method: 'GET',
        url: '/News.html"',
        protocol: '-',
        protocol_version: '-',
      },
      {
        method: 'GET',
        url: '/',
        protocol: 'HTTP',
        protocol_version: '1.0',
      },
      {
        method: 'GET',
        url: '/icons/circle_ logo_small.gif',
        protocol: 'HTTP',
        protocol_version: '1.0',
      },
      {
        method: 'GET',
        url: '/logos/small_gopher.gif',
        protocol: 'HTTP',
        protocol_version: '1.0',
      },
      {
        method: 'GET',
        url: '/logos/us-flag.gif',
        protocol: 'HTTP',
        protocol_version: '1.0',
      },
      {
        method: 'GET',
        url: '/logos/small_ftp.gif',
        protocol: 'HTTP',
        protocol_version: '1.0',
      },
    ]);
  });
  test('getResCode input arr', () => {
    const resCode = inputData.map((ln) => getResCode(ln.split(' ')));
    expect(resCode).toEqual(['200', '200', '200', '200', '-', '200', '200', '']);
  });
  test('getByteLength input arr', () => {
    const byteLengths = inputData.map((ln) => getByteLength(ln.split(' ')));
    expect(byteLengths).toEqual(['1497', '1325', '1014', '4889', '2624', '-', '2788', '-']);
  });
});
