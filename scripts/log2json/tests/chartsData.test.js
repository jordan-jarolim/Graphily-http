import {
  requestPerMinute,
  methodDistribution,
  codeDistribution,
  sizeDistribution,
} from '../chartsData';

const data = [{
  host: '141.243.1.172',
  datetime: {
    day: '29',
    hour: '23',
    minute: '53',
    second: '25',
  },
  request: {
    method: 'GET',
    url: '/Software.html',
    protocol: 'HTTP',
    protocol_version: '1.0',
  },
  response_code: '200',
  document_size: '1497',
}, {
  host: 'query2.lycos.cs.cmu.edu',
  datetime: {
    day: '29',
    hour: '23',
    minute: '53',
    second: '36',
  },
  request: {
    method: '-',
    url: '"/Consumer.html',
    protocol: 'HTTP',
    protocol_version: '1.0',
  },
  response_code: '200',
  document_size: '1325',
}, {
  host: 'tanuki.twics.com',
  datetime: {
    day: '29',
    hour: '23',
    minute: '53',
    second: '53',
  },
  request: {
    method: 'GET',
    url: '/News.html"',
    protocol: '-',
    protocol_version: '-',
  },
  response_code: '200',
  document_size: '1014',
}, {
  host: 'wpbfl2-45.gate.net',
  datetime: {
    day: '29',
    hour: '23',
    minute: '54',
    second: '15',
  },
  request: {
    method: 'GET',
    url: '/',
    protocol: 'HTTP',
    protocol_version: '1.0',
  },
  response_code: '200',
  document_size: '500',
}, {
  host: 'wpbfl2-45.gate.net',
  datetime: {
    day: '29',
    hour: '23',
    minute: '54',
    second: '16',
  },
  request: {
    method: 'GET',
    url: '/icons/circle_ logo_small.gif',
    protocol: 'HTTP',
    protocol_version: '1.0',
  },
  response_code: '-',
  document_size: '600',
}, {
  host: 'wpbfl2-45.gate.net',
  datetime: {
    day: '29',
    hour: '23',
    minute: '54',
    second: '18',
  },
  request: {
    method: 'GET',
    url: '/logos/small_gopher.gif',
    protocol: 'HTTP',
    protocol_version: '1.0',
  },
  response_code: '200',
  document_size: '600',
}, {
  host: '140.112.68.165',
  datetime: {
    day: '29',
    hour: '23',
    minute: '54',
    second: '19',
  },
  request: {
    method: 'GET',
    url: '/logos/us-flag.gif',
    protocol: 'HTTP',
    protocol_version: '1.0',
  },
  response_code: '200',
  document_size: '600',
}, {
  host: 'wpbfl2-45.gate.net',
  datetime: {
    day: '29',
    hour: '23',
    minute: '54',
    second: '19',
  },
  request: {
    method: 'GET',
    url: '/logos/small_ftp.gif',
    protocol: 'HTTP',
    protocol_version: '1.0',
  },
  response_code: '',
  document_size: '-',
}];

describe('chartsData', () => {
  test('rpm', async () => {
    const result = await requestPerMinute(data);
    expect(result).toEqual([{ min: '29-23:53', rpm: 3 }, { min: '29-23:54', rpm: 5 }]);
  });
  test('method', async () => {
    const result = await methodDistribution(data);
    expect(result).toEqual({ get: 7, head: 0, other: 1, post: 0 });
  });
  test('code', async () => {
    const result = await codeDistribution(data);
    expect(result).toEqual({ '': 1, '-': 1, 200: 6 });
  });
  test('size', async () => {
    const result = await sizeDistribution(data);
    expect(result).toEqual({ 500: 1, 600: 2 });
  });
});
