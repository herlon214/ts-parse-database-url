declare var jest, describe, it, expect;
import pdu, { DatabaseConfig } from '../index';

describe('Parse Database Url', () => {
  it('should parse PostgreSQL url', () => {
    const url = 'postgres://pwnall:sekret@localhost/pwnbase';
    const expected: DatabaseConfig = {
      driver: 'postgres',
      user: 'pwnall',
      password: 'sekret',
      host: 'localhost',
      database: 'pwnbase',
    };

    expect(pdu(url)).toEqual(expected);
  });

  it('should parse MySQL url', () => {
    const url = 'mysql://someuser@server.heroku.com:1337/herokudb';
    const expected: DatabaseConfig = {
      driver: 'mysql',
      user: 'someuser',
      host: 'server.heroku.com',
      port: '1337',
      database: 'herokudb',
    };

    expect(pdu(url)).toEqual(expected);
  });

  it('should parse SQLite url with file name', () => {
    const url = 'sqlite3://development.sqlite';
    const expected: DatabaseConfig = {
      driver: 'sqlite3',
      filename: 'development.sqlite',
    };

    expect(pdu(url)).toEqual(expected);
  });

  it('should parse SQLite url with relative path', () => {
    const url = 'sqlite3://path/to/test.sqlite';
    const expected: DatabaseConfig = {
      driver: 'sqlite3',
      filename: 'path/to/test.sqlite',
    };

    expect(pdu(url)).toEqual(expected);
  });

  it('should parse SQLite url with absolute path', () => {
    const url = 'sqlite3:///path/to/test.sqlite';
    const expected: DatabaseConfig = {
      driver: 'sqlite3',
      filename: '/path/to/test.sqlite',
    };

    expect(pdu(url)).toEqual(expected);
  });

  it('should parse MongoDB url with multiples hosts', () => {
    const url =
      'mongodb://user:pass@server1.heroku.com:1337,server2.heroku.com:1338,server3.heroku.com:1339/herokudb';
    const expected: DatabaseConfig = {
      driver: 'mongodb',
      user: 'user',
      password: 'pass',
      hosts: [
        {
          host: 'server1.heroku.com',
          port: '1337',
        },
        {
          host: 'server2.heroku.com',
          port: '1338',
        },
        {
          host: 'server3.heroku.com',
          port: '1339',
        },
      ],
      database: 'herokudb',
    };

    expect(pdu(url)).toEqual(expected);
  });
});
