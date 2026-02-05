import Repository from './repository';

describe('repository', () => {
  it('should correctly add users to the database', () => {
    const repository = new Repository();

    repository.addUser('allan');

    expect(repository.getOrders('allan')).toBeDefined();
  });

  it('should correctly delete users to the database', () => {
    const repository = new Repository();
    repository.addUser('allan');

    repository.deleteUser('allan');

    expect(repository.getOrders('allan')).toBeUndefined();
  });

  it('should not throw an error when deleting an undefined user', () => {
    const repository = new Repository();

    repository.deleteUser('allan');
  });

  it('should correctly add todos', () => {
    const repository = new Repository();
    repository.addUser('allan');

    repository.orderItem('allan', 'hello world', 'text content');

    expect(repository.getOrders('allan')).toEqual({
      'hello world': 'text content',
    });
  });
});
