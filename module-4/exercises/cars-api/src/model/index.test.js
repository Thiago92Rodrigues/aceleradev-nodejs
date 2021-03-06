// Unit Tests Scenarios for Model of Cars API

jest.mock('fs');
jest.mock(`../../data/database.test.json`, () => ({
  CAR1580214599567RD121: {
    created_at: '2020-01-28T12:29:59.567Z',
    updated_at: '2020-01-28T12:29:59.567Z',
    car_model: 'Relâmpago Marquinhos',
    description: 'O carro mais dahora do mundo.',
    company: 'Disney',
    price: 'US$ 99.000,00',
    year: '2008',
    color: 'Vermelho BOLADO',
    image_url: 'Sem tempo, irmão.'
  },
  CAR1580216220549RD493: {
    created_at: '2020-01-28T12:57:00.550Z',
    updated_at: '2020-01-28T12:57:00.550Z',
    car_model: 'Herbie',
    description: 'Herbie, o meu fusca TURBINADO',
    company: 'Volkswagen',
    price: 'US$ 25.000,00',
    year: '1974',
    color: 'Branco com umas listras top',
    image_url: 'Sem tempo, irmão.'
  }
}));

const {
  cars: { findAll, findById, update, create, destroy }
} = require('./index');

describe('Method findAll should...', () => {
  test('return all records on database', async () => {
    const res = await findAll();
    expect(res).toMatchObject({
      CAR1580214599567RD121: {
        created_at: '2020-01-28T12:29:59.567Z',
        updated_at: '2020-01-28T12:29:59.567Z',
        car_model: 'Relâmpago Marquinhos',
        description: 'O carro mais dahora do mundo.',
        company: 'Disney',
        price: 'US$ 99.000,00',
        year: '2008',
        color: 'Vermelho BOLADO',
        image_url: 'Sem tempo, irmão.'
      }
    });
  });
});

describe('Method findById should...', () => {
  test('return the properly record based on the id passed', async () => {
    const res = await findById('CAR1580214599567RD121');
    expect(res).toMatchObject({
      created_at: '2020-01-28T12:29:59.567Z',
      updated_at: '2020-01-28T12:29:59.567Z',
      car_model: 'Relâmpago Marquinhos',
      description: 'O carro mais dahora do mundo.',
      company: 'Disney',
      price: 'US$ 99.000,00',
      year: '2008',
      color: 'Vermelho BOLADO',
      image_url: 'Sem tempo, irmão.'
    });
  });

  test('return undefined if the passed id is invalid', async () => {
    const res = await findById('invalid');
    expect(res).toBe(undefined);
  });
});

describe('Method update should...', () => {
  test('update a record and return it', async () => {
    const res = await update(
      {
        price: 'US$ 88.888,00',
        image_url:
          'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi7rqDF8LDnAhWmKLkGHXPjBmsQjRx6BAgBEAQ&url=http%3A%2F%2Fdesciclopedia.org%2Fwiki%2FFusca_Azul&psig=AOvVaw23NVMn0fDV-xOFrT6sLvix&ust=1580664573422572'
      },
      'CAR1580214599567RD121'
    );

    expect(res).toMatchObject({
      car_model: 'Relâmpago Marquinhos',
      description: 'O carro mais dahora do mundo.',
      company: 'Disney',
      price: 'US$ 88.888,00',
      year: '2008',
      color: 'Vermelho BOLADO',
      image_url:
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi7rqDF8LDnAhWmKLkGHXPjBmsQjRx6BAgBEAQ&url=http%3A%2F%2Fdesciclopedia.org%2Fwiki%2FFusca_Azul&psig=AOvVaw23NVMn0fDV-xOFrT6sLvix&ust=1580664573422572'
    });
  });

  test('return null if the passed id is invalid', async () => {
    const res = await update(
      {
        price: 'US$ 88.888,00'
      },
      'invalid'
    );
    expect(res).toBe(null);
  });
});

describe('Method create should...', () => {
  test('create a new record in database and return it', async () => {
    const entry = {
      car_model: 'Fusca',
      description: 'Fusca maneiro pode comprar',
      company: 'Volkswagen',
      price: 'R$ 5.000,00 e 1 🍬',
      year: '1968',
      color: 'Azul',
      image_url:
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi7rqDF8LDnAhWmKLkGHXPjBmsQjRx6BAgBEAQ&url=http%3A%2F%2Fdesciclopedia.org%2Fwiki%2FFusca_Azul&psig=AOvVaw23NVMn0fDV-xOFrT6sLvix&ust=1580664573422572'
    };

    const response = await create(entry);

    expect(response).toMatchObject({
      car_model: 'Fusca',
      description: 'Fusca maneiro pode comprar',
      company: 'Volkswagen',
      price: 'R$ 5.000,00 e 1 🍬',
      year: '1968',
      color: 'Azul',
      image_url:
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi7rqDF8LDnAhWmKLkGHXPjBmsQjRx6BAgBEAQ&url=http%3A%2F%2Fdesciclopedia.org%2Fwiki%2FFusca_Azul&psig=AOvVaw23NVMn0fDV-xOFrT6sLvix&ust=1580664573422572'
    });
  });

  test('return an object with properly keys', async () => {
    const entry = {
      car_model: 'Fusca',
      description: 'Fusca maneiro pode comprar',
      company: 'Volkswagen',
      price: 'R$ 5.000,00 e 1 🍬',
      year: '1968',
      color: 'Azul',
      image_url:
        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi7rqDF8LDnAhWmKLkGHXPjBmsQjRx6BAgBEAQ&url=http%3A%2F%2Fdesciclopedia.org%2Fwiki%2FFusca_Azul&psig=AOvVaw23NVMn0fDV-xOFrT6sLvix&ust=1580664573422572'
    };

    const response = await create(entry);

    expect(Object.keys(response)).toStrictEqual([
      'created_at',
      'updated_at',
      'car_model',
      'description',
      'company',
      'price',
      'year',
      'color',
      'image_url'
    ]);
  });
});

describe('Method destroy should...', () => {
  test('return an empty object in case of record deleted with sucess', async () => {
    const res = await destroy('CAR1580216220549RD493');
    expect(res).toStrictEqual({});
  });

  test('return null in case of record not found', async () => {
    const res = await destroy('invalid');
    expect(res).toBe(null);
  });
});
